"""Extract publicly listed emails from business websites (max-yield mode).

Honesty rules:
- Never invent or guess emails (no info@domain fabrication).
- Only keep addresses found on fetched public pages.
- Syntax + MX checks do NOT prove an inbox is active or monitored.
"""

from __future__ import annotations

import argparse
import csv
import json
import re
import time
from dataclasses import asdict, dataclass, field
from datetime import datetime, timezone
from pathlib import Path
from typing import Any, Iterable
from urllib.parse import urljoin, urlparse, unquote

import httpx
from bs4 import BeautifulSoup

from src.pipeline.classify_email import classify_email

EMAIL_RE = re.compile(
    r"(?:mailto:)?([A-Z0-9._%+\-]+@[A-Z0-9.\-]+\.[A-Z]{2,})",
    re.IGNORECASE,
)
# obfuscations: name [at] domain [dot] com
OBFUSCATED_RE = re.compile(
    r"([A-Z0-9._%+\-]+)\s*(?:\[at\]|\(at\)|\{at\}|\sat\s)\s*"
    r"([A-Z0-9.\-]+)\s*(?:\[dot\]|\(dot\)|\{dot\}|\sdot\s)\s*([A-Z]{2,})",
    re.IGNORECASE,
)

SKIP_DOMAINS = {
    "sentry.io",
    "example.com",
    "example.org",
    "domain.com",
    "email.com",
    "yourdomain.com",
    "wixpress.com",
    "squareup.com",
    "schema.org",
    "google.com",
    "gstatic.com",
    "googleapis.com",
    "w3.org",
    "cloudflare.com",
    "jquery.com",
    "github.com",
    "rebrand.ly",
    "rebrandly.com",
    "sentry-next.wixpress.com",
    "wix.com",
    "godaddy.com",
    "shopify.com",
    "squarespace.com",
    "facebook.com",
    "instagram.com",
    "linkedin.com",
    "twitter.com",
    "x.com",
    "yelp.com",
    "tripadvisor.com",
}

SKIP_LOCAL_PARTS = {
    "noreply",
    "no-reply",
    "donotreply",
    "do-not-reply",
    "mailer-daemon",
    "postmaster",
    "user",
    "username",
    "yourname",
    "name",
    "email",
    "mail",
}

JUNK_EMAILS = {
    "user@domain.com",
    "email@example.com",
    "name@email.com",
    "your@email.com",
    "info@example.com",
    "hello@example.com",
    "test@test.com",
    "admin@example.com",
}

CONTACT_PATHS = (
    "/",
    "/contact",
    "/contact/",
    "/contact-us",
    "/contact-us/",
    "/contactus",
    "/contacts",
    "/about",
    "/about/",
    "/about-us",
    "/about-us/",
    "/impressum",
    "/kontakt",
    "/kontakta-oss",
    "/om-oss",
    "/reservation",
    "/reservations",
    "/booking",
    "/book",
    "/get-in-touch",
    "/support",
    "/customer-service",
    "/en/contact",
    "/en/contact-us",
    "/pages/contact",
    "/pages/contact-us",
)


@dataclass
class EnrichResult:
    title: str
    website: str
    email: str | None
    email_class: str
    email_class_reason: str
    emails_found: list[str] = field(default_factory=list)
    pages_checked: list[str] = field(default_factory=list)
    status: str = "ok"
    error: str | None = None
    method: str = "httpx"


def utc_stamp() -> str:
    return datetime.now(timezone.utc).strftime("%Y%m%dT%H%M%SZ")


def site_root(url: str) -> str:
    parsed = urlparse(url)
    return f"{parsed.scheme}://{parsed.netloc}/"


def normalize_website(url: str) -> str | None:
    text = (url or "").strip()
    if not text:
        return None
    if text.startswith("//"):
        text = "https:" + text
    if not re.match(r"^https?://", text, re.I):
        text = "https://" + text
    parsed = urlparse(text)
    if not parsed.netloc:
        return None
    # Keep original landing path (useful), but enrichment also crawls site root.
    return f"{parsed.scheme}://{parsed.netloc}{parsed.path or '/'}"


def registrable_hint(host: str) -> str:
    host = (host or "").lower().removeprefix("www.")
    parts = host.split(".")
    if len(parts) >= 2:
        return ".".join(parts[-2:])
    return host


def is_plausible_email(addr: str, site_host: str | None = None) -> bool:
    addr = addr.strip().lower().rstrip(".,;:")
    if addr in JUNK_EMAILS:
        return False
    if not EMAIL_RE.fullmatch(addr):
        return False
    if addr.count("@") != 1:
        return False
    local, domain = addr.split("@", 1)
    if local in SKIP_LOCAL_PARTS:
        return False
    if domain in SKIP_DOMAINS or any(domain.endswith("." + d) for d in SKIP_DOMAINS):
        return False
    if domain.endswith((".png", ".jpg", ".jpeg", ".gif", ".svg", ".js", ".css")):
        return False
    if len(local) > 40 and re.fullmatch(r"[a-f0-9]+", local):
        return False
    # reject image/font false positives like something@2x.com style already covered
    return True


def decode_cloudflare_emails(html: str) -> list[str]:
    """Decode Cloudflare email protection CFEMAIL hex payloads when present."""
    found: list[str] = []
    for match in re.finditer(r"data-cfemail=[\"']([0-9a-fA-F]+)[\"']", html or ""):
        try:
            data = match.group(1)
            key = int(data[:2], 16)
            email = "".join(
                chr(int(data[i : i + 2], 16) ^ key) for i in range(2, len(data), 2)
            )
            found.append(email.lower())
        except Exception:  # noqa: BLE001
            continue
    return found


def extract_emails(text: str, site_host: str | None = None) -> list[str]:
    found: list[str] = []
    seen: set[str] = set()

    # mailto / plain
    for match in EMAIL_RE.findall(text or ""):
        addr = unquote(match).strip().lower().rstrip(".,;:")
        if addr in seen:
            continue
        if not is_plausible_email(addr, site_host):
            continue
        seen.add(addr)
        found.append(addr)

    # obfuscated
    for local, domain, tld in OBFUSCATED_RE.findall(text or ""):
        addr = f"{local}@{domain}.{tld}".lower().replace(" ", "")
        if addr in seen:
            continue
        if not is_plausible_email(addr, site_host):
            continue
        seen.add(addr)
        found.append(addr)

    # cloudflare
    for addr in decode_cloudflare_emails(text or ""):
        if addr in seen:
            continue
        if not is_plausible_email(addr, site_host):
            continue
        seen.add(addr)
        found.append(addr)

    return found


def rank_emails(emails: Iterable[str], site_host: str | None) -> list[str]:
    hint = registrable_hint(site_host or "")

    def score(addr: str) -> tuple[int, int, str]:
        local, domain = addr.split("@", 1)
        s = 0
        if hint and (domain == hint or domain.endswith("." + hint) or hint.endswith(domain)):
            s += 80
        if local in {"info", "contact", "hello", "booking", "reservations", "office", "mail"}:
            s += 25
        if local.startswith(("info", "contact", "hello", "book", "reserve")):
            s += 10
        if local in {"giftcards", "careers", "jobs", "press", "media", "privacy"}:
            s -= 30
        if domain in {"gmail.com", "yahoo.com", "outlook.com", "hotmail.com"}:
            # personal/business gmail on restaurant sites can still be useful
            s += 5
        return (-s, len(addr), addr)

    return sorted(set(emails), key=score)


def fetch_text(client: httpx.Client, url: str) -> tuple[str | None, str | None]:
    try:
        resp = client.get(url, follow_redirects=True)
        if resp.status_code >= 400:
            return None, f"HTTP {resp.status_code}"
        ctype = (resp.headers.get("content-type") or "").lower()
        body = resp.text
        if "text/html" not in ctype and "text/plain" not in ctype and ctype:
            if "<html" not in body[:2000].lower():
                return None, f"unsupported content-type {ctype}"
        return body, None
    except Exception as exc:  # noqa: BLE001
        return None, str(exc)


def discover_contact_links(base_url: str, html: str) -> list[str]:
    soup = BeautifulSoup(html, "html.parser")
    keys = (
        "contact",
        "kontakt",
        "kontakta",
        "about",
        "om-oss",
        "impressum",
        "booking",
        "reservation",
        "reserve",
        "get-in-touch",
        "support",
        "mail",
    )
    links: list[str] = []
    for a in soup.find_all("a", href=True):
        href = a.get("href", "")
        label = " ".join(a.stripped_strings).lower()
        href_l = href.lower()
        if href_l.startswith("mailto:"):
            continue
        if any(key in href_l or key in label for key in keys):
            full = urljoin(base_url, href)
            if urlparse(full).scheme in {"http", "https"}:
                links.append(full.split("#")[0])
    out: list[str] = []
    seen: set[str] = set()
    for u in links:
        if u not in seen:
            seen.add(u)
            out.append(u)
    return out[:8]


def playwright_fetch_pages(urls: list[str], timeout_ms: int = 25000) -> dict[str, str]:
    """Render pages with Playwright; return url->html for successes."""
    try:
        from playwright.sync_api import sync_playwright
    except ImportError:
        return {}

    html_by_url: dict[str, str] = {}
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            user_agent=(
                "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
                "AppleWebKit/537.36 (KHTML, like Gecko) "
                "Chrome/120.0.0.0 Safari/537.36"
            ),
            viewport={"width": 1280, "height": 900},
        )
        page = context.new_page()
        for url in urls:
            try:
                page.goto(url, wait_until="domcontentloaded", timeout=timeout_ms)
                page.wait_for_timeout(800)
                html_by_url[url] = page.content()
            except Exception:  # noqa: BLE001
                continue
        context.close()
        browser.close()
    return html_by_url


def collect_from_html_sources(
    *,
    client: httpx.Client,
    ordered_urls: list[str],
    host: str,
    max_pages: int,
    use_playwright: bool,
) -> tuple[list[str], list[str], list[str], str]:
    emails: list[str] = []
    pages: list[str] = []
    errors: list[str] = []
    method = "httpx"

    checked = 0
    html_cache: dict[str, str] = {}
    for url in ordered_urls:
        if checked >= max_pages:
            break
        html, err = fetch_text(client, url)
        pages.append(url)
        checked += 1
        if err or not html:
            errors.append(f"{url}: {err or 'empty'}")
            continue
        html_cache[url] = html
        emails.extend(extract_emails(html, host))
        if checked == 1:
            for extra in discover_contact_links(url, html):
                if extra not in ordered_urls:
                    ordered_urls.append(extra)

    # Playwright fallback if nothing found
    if not emails and use_playwright:
        method = "playwright"
        # Prioritize homepage/root + discovered contact-ish URLs
        pw_targets = []
        for u in ordered_urls:
            if u not in pw_targets:
                pw_targets.append(u)
        # Cap Playwright pages for runtime; prioritize root + contact-like URLs
        contactish = [
            u
            for u in ordered_urls
            if any(
                k in u.lower()
                for k in (
                    "contact",
                    "kontakt",
                    "about",
                    "impressum",
                    "booking",
                    "reservation",
                )
            )
        ]
        pw_targets = []
        for u in list(ordered_urls[:2]) + contactish + ordered_urls[2:]:
            if u not in pw_targets:
                pw_targets.append(u)
        pw_targets = pw_targets[:4]
        rendered = playwright_fetch_pages(pw_targets)
        for url, html in rendered.items():
            if url not in pages:
                pages.append(url)
            emails.extend(extract_emails(html, host))
            for extra in discover_contact_links(url, html):
                if (
                    extra not in ordered_urls
                    and extra not in pw_targets
                    and len(pw_targets) < 6
                ):
                    pw_targets.append(extra)
        # second pass for newly discovered contact links
        more = [u for u in pw_targets if u not in rendered]
        if more and not emails:
            rendered2 = playwright_fetch_pages(more[:2])
            for url, html in rendered2.items():
                if url not in pages:
                    pages.append(url)
                emails.extend(extract_emails(html, host))
        if emails:
            method = "playwright"
        elif html_cache:
            method = "httpx+playwright_empty"

    return emails, pages, errors, method


def enrich_website(
    client: httpx.Client,
    title: str,
    website: str,
    *,
    use_playwright: bool = True,
    max_pages: int = 10,
) -> EnrichResult:
    base = normalize_website(website)
    if not base:
        return EnrichResult(
            title=title,
            website=website,
            email=None,
            email_class="incomplete",
            email_class_reason="Website missing/invalid.",
            status="skipped",
            error="invalid_website",
        )

    host = urlparse(base).hostname or ""
    root = site_root(base)

    ordered: list[str] = []
    # Always include exact landing URL and site root
    for u in [base, root]:
        if u not in ordered:
            ordered.append(u)
    for path in CONTACT_PATHS:
        u = urljoin(root, path.lstrip("/"))
        # CONTACT_PATHS includes '/' already handled via root
        if path == "/":
            continue
        u = urljoin(root, path[1:] if path.startswith("/") else path)
        # urljoin with path starting / replaces path — use properly
        u = root.rstrip("/") + path if path.startswith("/") else urljoin(root, path)
        if u not in ordered:
            ordered.append(u)

    emails, pages, errors, method = collect_from_html_sources(
        client=client,
        ordered_urls=ordered,
        host=host,
        max_pages=max_pages,
        use_playwright=use_playwright,
    )

    ranked = rank_emails(emails, host)
    if not ranked:
        return EnrichResult(
            title=title,
            website=base,
            email=None,
            email_class="incomplete",
            email_class_reason=(
                "No public email found on checked pages. "
                "This does not prove the business has no email."
            ),
            emails_found=[],
            pages_checked=pages,
            status="no_email_found",
            error="; ".join(errors[:3]) if errors else None,
            method=method,
        )

    chosen = ranked[0]
    classification = classify_email(chosen, check_mx=True)
    return EnrichResult(
        title=title,
        website=base,
        email=classification.normalized,
        email_class=classification.label,
        email_class_reason=classification.reason
        + " Source: publicly listed on business website. Inbox activity is unverified.",
        emails_found=ranked,
        pages_checked=pages,
        status="found",
        method=method,
    )


def _write_csv(path: Path, fieldnames: list[str], rows: list[dict[str, Any]]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames, extrasaction="ignore")
        writer.writeheader()
        writer.writerows(rows)


def _load_existing_rows(path: Path) -> list[dict[str, Any]]:
    if not path.exists():
        return []
    with path.open(newline="", encoding="utf-8-sig", errors="replace") as f:
        return list(csv.DictReader(f))


def parse_enrich_log(log_path: Path) -> dict[int, dict[str, str]]:
    """Parse prior enrich log lines into 1-based index -> status/email/method."""
    text = log_path.read_text(encoding="utf-8", errors="replace")
    lines = text.splitlines()
    out: dict[int, dict[str, str]] = {}
    pending_idx: int | None = None
    for line in lines:
        start = re.match(r"^\[(\d+)/\d+\]\s+(.*?)\s+->\s+(.*)$", line)
        if start:
            pending_idx = int(start.group(1))
            continue
        done = re.match(
            r"^\s*->\s+(\S+)\s+\|\s+(\S+)\s+\|\s+method=(\S+)\s*$",
            line,
        )
        if done and pending_idx is not None:
            status, email, method = done.group(1), done.group(2), done.group(3)
            out[pending_idx] = {
                "status": status,
                "email": "" if email == "-" else email,
                "method": method,
            }
            pending_idx = None
    return out


def enrich_csv(
    *,
    input_csv: Path,
    output_csv: Path,
    report_json: Path,
    limit: int | None = None,
    sleep_seconds: float = 0.2,
    use_playwright: bool = True,
    max_pages: int = 10,
    start: int = 1,
    resume_log: Path | None = None,
) -> dict[str, Any]:
    with input_csv.open(newline="", encoding="utf-8-sig", errors="replace") as f:
        reader = csv.DictReader(f)
        fieldnames = list(reader.fieldnames or [])
        rows = list(reader)

    total = len(rows)
    if limit is not None:
        rows = rows[:limit]
        total = len(rows)

    out_fields = list(fieldnames)
    for col in (
        "email",
        "emails_found",
        "email_class",
        "email_class_reason",
        "email_enrich_status",
        "email_enrich_method",
        "email_pages_checked",
    ):
        if col not in out_fields:
            out_fields.append(col)

    # Seed from previous output CSV and/or parseable log
    enriched_rows: list[dict[str, Any]] = [{} for _ in rows]
    existing = _load_existing_rows(output_csv)
    for i, row in enumerate(existing[: len(rows)]):
        enriched_rows[i] = dict(row)

    log_map = parse_enrich_log(resume_log) if resume_log and resume_log.exists() else {}

    results_meta: list[dict[str, Any]] = []

    headers = {
        "User-Agent": (
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
            "AppleWebKit/537.36 (KHTML, like Gecko) "
            "Chrome/120.0.0.0 Safari/537.36"
        ),
        "Accept": "text/html,application/xhtml+xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
    }

    with httpx.Client(timeout=25.0, headers=headers) as client:
        for idx, row in enumerate(rows, start=1):
            title = (row.get("title") or row.get("business_name") or "").strip()
            website = (row.get("website") or row.get("website_url") or "").strip()

            # Reuse completed log rows before start, unless already in output
            already = (enriched_rows[idx - 1].get("email_enrich_status") or "").strip()
            if idx < start and already:
                results_meta.append(
                    {
                        "index": idx,
                        "title": title,
                        "status": already,
                        "email": enriched_rows[idx - 1].get("email") or "",
                        "method": enriched_rows[idx - 1].get("email_enrich_method") or "",
                        "reused": True,
                    }
                )
                continue

            if idx < start and idx in log_map and not already:
                lm = log_map[idx]
                email = lm["email"]
                status = lm["status"]
                method = lm["method"]
                if email:
                    classification = classify_email(email, check_mx=True)
                    email_class = classification.label
                    email_reason = (
                        classification.reason
                        + " Source: publicly listed on business website (resumed from log). "
                        "Inbox activity is unverified."
                    )
                    emails_found = email
                else:
                    email_class = "incomplete"
                    email_reason = "No public email found (resumed from prior log)."
                    emails_found = ""
                new_row = dict(row)
                new_row["email"] = email
                new_row["emails_found"] = emails_found
                new_row["email_class"] = email_class
                new_row["email_class_reason"] = email_reason
                new_row["email_enrich_status"] = status
                new_row["email_enrich_method"] = method
                new_row["email_pages_checked"] = "resumed_from_log"
                enriched_rows[idx - 1] = new_row
                results_meta.append(
                    {
                        "index": idx,
                        "title": title,
                        "status": status,
                        "email": email,
                        "method": method,
                        "reused": True,
                    }
                )
                _write_csv(
                    output_csv,
                    out_fields,
                    [r or dict(rows[i]) for i, r in enumerate(enriched_rows)],
                )
                continue

            print(
                f"[{idx}/{total}] {title or '(no name)'} -> {website or '(no website)'}",
                flush=True,
            )
            result = enrich_website(
                client,
                title,
                website,
                use_playwright=use_playwright,
                max_pages=max_pages,
            )
            print(
                f"    -> {result.status} | {result.email or '-'} | method={result.method}",
                flush=True,
            )

            new_row = dict(row)
            new_row["email"] = result.email or ""
            new_row["emails_found"] = ";".join(result.emails_found)
            new_row["email_class"] = result.email_class
            new_row["email_class_reason"] = result.email_class_reason
            new_row["email_enrich_status"] = result.status
            new_row["email_enrich_method"] = result.method
            new_row["email_pages_checked"] = " | ".join(result.pages_checked)
            enriched_rows[idx - 1] = new_row
            results_meta.append(
                {
                    "index": idx,
                    "title": title,
                    "status": result.status,
                    "email": result.email or "",
                    "method": result.method,
                    "reused": False,
                    **asdict(result),
                }
            )

            # Incremental save so stop/resume never loses progress
            _write_csv(output_csv, out_fields, [r or dict(rows[i]) for i, r in enumerate(enriched_rows)])
            time.sleep(sleep_seconds)

    # Fill any still-empty slots with original row stubs
    final_rows: list[dict[str, Any]] = []
    for i, row in enumerate(rows):
        if enriched_rows[i]:
            final_rows.append(enriched_rows[i])
        else:
            stub = dict(row)
            stub.setdefault("email", "")
            stub.setdefault("emails_found", "")
            stub.setdefault("email_class", "")
            stub.setdefault("email_class_reason", "")
            stub.setdefault("email_enrich_status", "pending")
            stub.setdefault("email_enrich_method", "")
            stub.setdefault("email_pages_checked", "")
            final_rows.append(stub)

    _write_csv(output_csv, out_fields, final_rows)

    found = sum(1 for r in final_rows if (r.get("email") or "").strip())
    report = {
        "input_csv": str(input_csv),
        "output_csv": str(output_csv),
        "processed": sum(
            1
            for r in final_rows
            if (r.get("email_enrich_status") or "") not in {"", "pending"}
        ),
        "emails_found": found,
        "eligible_looking": sum(
            1 for r in final_rows if r.get("email_class") == "eligible_looking"
        ),
        "risky": sum(1 for r in final_rows if r.get("email_class") == "risky"),
        "unknown": sum(1 for r in final_rows if r.get("email_class") == "unknown"),
        "no_email_found": sum(
            1 for r in final_rows if r.get("email_enrich_status") == "no_email_found"
        ),
        "start": start,
        "use_playwright": use_playwright,
        "note": (
            "Emails are publicly listed addresses found on websites. "
            "Syntax/MX checks do not prove an inbox is active. "
            "Max-yield mode uses deeper page crawl + Playwright fallback. "
            "CSV is saved after each lead for safe resume."
        ),
        "results": results_meta,
    }
    report_json.write_text(
        json.dumps(report, indent=2, ensure_ascii=False) + "\n", encoding="utf-8"
    )
    return report


def main(argv: list[str] | None = None) -> int:
    p = argparse.ArgumentParser(description="Enrich CSV with public website emails")
    p.add_argument("input_csv", type=Path)
    p.add_argument("--output", type=Path, default=None)
    p.add_argument("--report", type=Path, default=None)
    p.add_argument("--limit", type=int, default=None)
    p.add_argument("--sleep", type=float, default=0.15)
    p.add_argument(
        "--no-playwright",
        action="store_true",
        help="Disable Playwright fallback (faster, fewer emails)",
    )
    p.add_argument("--max-pages", type=int, default=10)
    p.add_argument(
        "--start",
        type=int,
        default=1,
        help="1-based lead index to start processing from (resume)",
    )
    p.add_argument(
        "--resume-log",
        type=Path,
        default=None,
        help="Prior enrich log to reuse completed rows before --start",
    )
    args = p.parse_args(argv)

    stamp = utc_stamp()
    output = args.output or Path("data/exports") / f"enriched_emails_{stamp}.csv"
    report = args.report or Path("data/exports") / f"enriched_emails_{stamp}_report.json"

    summary = enrich_csv(
        input_csv=args.input_csv.expanduser().resolve(),
        output_csv=output,
        report_json=report,
        limit=args.limit,
        sleep_seconds=args.sleep,
        use_playwright=not args.no_playwright,
        max_pages=args.max_pages,
        start=max(1, args.start),
        resume_log=args.resume_log,
    )
    print(
        json.dumps(
            {k: summary[k] for k in summary if k != "results"},
            indent=2,
            ensure_ascii=False,
        )
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
