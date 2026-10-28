"""Email syntax + DNS/MX classification. Never claims inbox existence."""

from __future__ import annotations

import re
from dataclasses import dataclass

ROLE_LOCAL_PARTS = {
    "info",
    "contact",
    "hello",
    "admin",
    "office",
    "support",
    "sales",
    "noreply",
    "no-reply",
    "donotreply",
    "do-not-reply",
    "marketing",
    "press",
    "booking",
    "reservations",
}

DISPOSABLE_DOMAINS = {
    "mailinator.com",
    "guerrillamail.com",
    "10minutemail.com",
    "tempmail.com",
    "yopmail.com",
    "trashmail.com",
    "sharklasers.com",
}

EMAIL_RE = re.compile(r"^[A-Za-z0-9._%+\-]+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}$")


@dataclass
class EmailClassification:
    normalized: str | None
    label: str
    reason: str
    mx_found: bool | None = None


def normalize_email(value: str | None) -> str | None:
    if value is None:
        return None
    cleaned = value.strip().lower().strip(".,;:<>\"'")
    if not cleaned:
        return None
    return cleaned


def classify_email(value: str | None, *, check_mx: bool = True) -> EmailClassification:
    normalized = normalize_email(value)
    if not normalized:
        return EmailClassification(
            normalized=None,
            label="incomplete",
            reason="Email address is missing.",
            mx_found=None,
        )

    if not EMAIL_RE.match(normalized) or normalized.count("@") != 1:
        return EmailClassification(
            normalized=normalized,
            label="invalid",
            reason="Email failed syntax checks.",
            mx_found=None,
        )

    local, domain = normalized.split("@", 1)
    if domain in DISPOSABLE_DOMAINS:
        return EmailClassification(
            normalized=normalized,
            label="risky",
            reason=f"Domain looks disposable ({domain}).",
            mx_found=None,
        )

    if local in ROLE_LOCAL_PARTS:
        # Role-based is usable for B2B but flagged for review.
        role_note = f"Role-based local part ({local}@)."
    else:
        role_note = ""

    mx_found: bool | None = None
    if check_mx:
        mx_found = _has_mx(domain)
        if mx_found is False:
            return EmailClassification(
                normalized=normalized,
                label="risky",
                reason=(
                    f"No MX/DNS mail signal found for domain {domain}. "
                    "This does not prove the mailbox is missing; treat as unverified/risky."
                    + (f" {role_note}" if role_note else "")
                ),
                mx_found=False,
            )
        if mx_found is None:
            reason = (
                f"Syntax OK; MX lookup unavailable/failed for {domain}. "
                "Mailbox existence is unverified."
            )
            if role_note:
                reason = f"{reason} {role_note}"
            return EmailClassification(
                normalized=normalized,
                label="unknown",
                reason=reason,
                mx_found=None,
            )

    reason = (
        "Syntax OK"
        + ("; MX present" if mx_found else "")
        + ". Mailbox existence is not proven."
    )
    if role_note:
        reason = f"{reason} {role_note}"
        return EmailClassification(
            normalized=normalized,
            label="risky",
            reason=reason,
            mx_found=mx_found,
        )

    return EmailClassification(
        normalized=normalized,
        label="eligible_looking",
        reason=reason,
        mx_found=mx_found,
    )


def _has_mx(domain: str) -> bool | None:
    try:
        import dns.resolver  # type: ignore
    except ImportError:
        return None

    try:
        answers = dns.resolver.resolve(domain, "MX")
        return len(list(answers)) > 0
    except dns.resolver.NXDOMAIN:  # type: ignore[attr-defined]
        return False
    except dns.resolver.NoAnswer:  # type: ignore[attr-defined]
        # Some domains receive via A/AAAA only; mark unknown rather than false certainty.
        try:
            a_answers = dns.resolver.resolve(domain, "A")
            return True if list(a_answers) else False
        except Exception:
            return False
    except Exception:
        return None
