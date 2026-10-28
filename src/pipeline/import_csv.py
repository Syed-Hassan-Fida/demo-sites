"""CSV import → clean → classify → persist. Preserves originals and exports reports."""

from __future__ import annotations

import csv
import json
import shutil
import sqlite3
from dataclasses import dataclass, field
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

from src.db.schema import init_db
from src.db.states import assert_transition
from src.pipeline.classify_email import classify_email
from src.pipeline.clean import (
    build_header_map,
    business_dedupe_key,
    normalize_row,
)


def utc_now() -> str:
    return datetime.now(timezone.utc).replace(microsecond=0).isoformat()


@dataclass
class ImportStats:
    source_csv: str
    campaign_id: int
    imported: int = 0
    retained: int = 0
    excluded: int = 0
    duplicates: int = 0
    invalid: int = 0
    unknown: int = 0
    risky: int = 0
    eligible_looking: int = 0
    incomplete: int = 0
    missing_email: int = 0
    missing_website: int = 0
    mapped_headers: dict[str, str] = field(default_factory=dict)
    unmapped_headers: list[str] = field(default_factory=list)
    exclusion_reasons: dict[str, int] = field(default_factory=dict)

    def bump_reason(self, reason: str) -> None:
        self.exclusion_reasons[reason] = self.exclusion_reasons.get(reason, 0) + 1

    def to_dict(self) -> dict[str, Any]:
        return {
            "source_csv": self.source_csv,
            "campaign_id": self.campaign_id,
            "imported": self.imported,
            "retained": self.retained,
            "excluded": self.excluded,
            "duplicates": self.duplicates,
            "invalid": self.invalid,
            "unknown": self.unknown,
            "risky": self.risky,
            "eligible_looking": self.eligible_looking,
            "incomplete": self.incomplete,
            "missing_email": self.missing_email,
            "missing_website": self.missing_website,
            "mapped_headers": self.mapped_headers,
            "unmapped_headers": self.unmapped_headers,
            "exclusion_reasons": self.exclusion_reasons,
        }


def _audit(
    conn: sqlite3.Connection,
    *,
    campaign_id: int | None,
    lead_id: int | None,
    event_type: str,
    message: str,
    details: dict[str, Any] | None = None,
) -> None:
    conn.execute(
        """
        INSERT INTO audit_log (campaign_id, lead_id, event_type, message, details_json, created_at)
        VALUES (?, ?, ?, ?, ?, ?)
        """,
        (
            campaign_id,
            lead_id,
            event_type,
            message,
            json.dumps(details or {}, ensure_ascii=False),
            utc_now(),
        ),
    )


def import_csv(
    *,
    csv_path: Path,
    db_path: Path,
    originals_dir: Path,
    exports_dir: Path,
    niche: str,
    location: str,
    check_mx: bool = True,
    source_label: str | None = None,
) -> ImportStats:
    if not csv_path.exists():
        raise FileNotFoundError(f"CSV not found: {csv_path}")

    originals_dir.mkdir(parents=True, exist_ok=True)
    exports_dir.mkdir(parents=True, exist_ok=True)

    stamp = datetime.now(timezone.utc).strftime("%Y%m%dT%H%M%SZ")
    preserved = originals_dir / f"{stamp}_{csv_path.name}"
    shutil.copy2(csv_path, preserved)

    conn = init_db(db_path)
    now = utc_now()
    cur = conn.execute(
        """
        INSERT INTO campaigns (niche, location, source_csv, status, created_at, updated_at)
        VALUES (?, ?, ?, 'importing', ?, ?)
        """,
        (niche, location, str(csv_path), now, now),
    )
    campaign_id = int(cur.lastrowid)
    stats = ImportStats(source_csv=str(csv_path), campaign_id=campaign_id)
    _audit(
        conn,
        campaign_id=campaign_id,
        lead_id=None,
        event_type="import_started",
        message=f"Importing CSV {csv_path.name}",
        details={"preserved_original": str(preserved)},
    )

    with csv_path.open(newline="", encoding="utf-8-sig", errors="replace") as f:
        reader = csv.DictReader(f)
        fieldnames = reader.fieldnames or []
        header_map = build_header_map(list(fieldnames))
        stats.mapped_headers = header_map
        stats.unmapped_headers = [
            h for h in fieldnames if h not in set(header_map.values())
        ]

        seen_emails: set[str] = set()
        seen_businesses: set[str] = set()
        cleaned_rows: list[dict[str, Any]] = []
        excluded_rows: list[dict[str, Any]] = []

        default_source = source_label or f"user_csv:{csv_path.name}"

        for raw in reader:
            stats.imported += 1
            lead = normalize_row(raw, header_map, default_source=default_source)
            if "missing_email" in lead.issues:
                stats.missing_email += 1
            if "missing_website" in lead.issues:
                stats.missing_website += 1

            email_result = classify_email(lead.email, check_mx=check_mx)
            lead.email = email_result.normalized

            state = "VALIDATION_COMPLETE"
            exclusion_reason: str | None = None
            email_class = email_result.label
            email_reason = email_result.reason

            # Dedup
            biz_key = business_dedupe_key(lead)
            if lead.email and lead.email in seen_emails:
                state = "EXCLUDED"
                exclusion_reason = "duplicate_email"
                email_class = "duplicate"
                email_reason = "Duplicate email in this import."
                stats.duplicates += 1
            elif biz_key != "|" and biz_key in seen_businesses:
                state = "EXCLUDED"
                exclusion_reason = "duplicate_business"
                email_class = "duplicate"
                email_reason = "Duplicate business name + location in this import."
                stats.duplicates += 1
            elif not lead.business_name:
                state = "EXCLUDED"
                exclusion_reason = "missing_business_name"
                stats.incomplete += 1
            elif email_class == "incomplete":
                state = "EXCLUDED"
                exclusion_reason = "missing_email"
                stats.incomplete += 1
            elif email_class == "invalid":
                state = "EXCLUDED"
                exclusion_reason = "invalid_email"
                stats.invalid += 1
            else:
                # Retained for further work even if website missing —
                # but website-less leads are incomplete for research.
                if email_class == "eligible_looking":
                    stats.eligible_looking += 1
                elif email_class == "risky":
                    stats.risky += 1
                elif email_class == "unknown":
                    stats.unknown += 1
                stats.retained += 1
                if lead.email:
                    seen_emails.add(lead.email)

            if biz_key != "|":
                seen_businesses.add(biz_key)

            if state == "EXCLUDED":
                stats.excluded += 1
                if exclusion_reason:
                    stats.bump_reason(exclusion_reason)

            assert_transition("IMPORTED", "CLEANING")
            assert_transition("CLEANING", "CLEANED")
            # Direct write of final phase-1 state after clean+validate
            final_state = state
            if final_state not in {"VALIDATION_COMPLETE", "EXCLUDED"}:
                raise RuntimeError(f"Unexpected state {final_state}")

            row_out = {
                "business_name": lead.business_name,
                "niche": lead.niche or niche,
                "email": lead.email,
                "website_url": lead.website_url,
                "location": lead.location or location,
                "phone": lead.phone,
                "public_description": lead.public_description,
                "source": lead.source,
                "rating": lead.rating,
                "review_count": lead.review_count,
                "price_range": lead.price_range,
                "image_url": lead.image_url,
                "review_snippet": lead.review_snippet,
                "email_class": email_class,
                "email_class_reason": email_reason,
                "state": final_state,
                "exclusion_reason": exclusion_reason,
                "issues": ",".join(lead.issues),
            }

            cur = conn.execute(
                """
                INSERT INTO leads (
                    campaign_id, business_name, niche, email, website_url, location,
                    service_area, phone, public_description, source, retrieved_date,
                    rating, review_count, price_range, image_url, review_snippet,
                    extra_json, email_class, email_class_reason, state, exclusion_reason,
                    created_at, updated_at
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                """,
                (
                    campaign_id,
                    lead.business_name,
                    lead.niche or niche,
                    lead.email,
                    lead.website_url,
                    lead.location or location,
                    lead.service_area,
                    lead.phone,
                    lead.public_description,
                    lead.source,
                    lead.retrieved_date,
                    lead.rating,
                    lead.review_count,
                    lead.price_range,
                    lead.image_url,
                    lead.review_snippet,
                    lead.to_extra_json(),
                    email_class,
                    email_reason,
                    final_state,
                    exclusion_reason,
                    now,
                    now,
                ),
            )
            lead_id = int(cur.lastrowid)
            if final_state == "EXCLUDED":
                excluded_rows.append(row_out)
            else:
                cleaned_rows.append(row_out)

            _audit(
                conn,
                campaign_id=campaign_id,
                lead_id=lead_id,
                event_type="lead_classified",
                message=f"{lead.business_name or '(unnamed)'} → {final_state}/{email_class}",
                details={
                    "exclusion_reason": exclusion_reason,
                    "issues": lead.issues,
                },
            )

    cleaned_path = exports_dir / f"campaign_{campaign_id}_cleaned.csv"
    excluded_path = exports_dir / f"campaign_{campaign_id}_excluded.csv"
    report_path = exports_dir / f"campaign_{campaign_id}_import_report.json"

    _write_csv(cleaned_path, cleaned_rows)
    _write_csv(excluded_path, excluded_rows)
    report_path.write_text(
        json.dumps(stats.to_dict(), indent=2, ensure_ascii=False) + "\n",
        encoding="utf-8",
    )

    conn.execute(
        "UPDATE campaigns SET status = ?, updated_at = ? WHERE id = ?",
        ("import_complete", utc_now(), campaign_id),
    )
    _audit(
        conn,
        campaign_id=campaign_id,
        lead_id=None,
        event_type="import_complete",
        message="CSV import/clean/classify finished",
        details=stats.to_dict(),
    )
    conn.commit()
    conn.close()
    return stats


def _write_csv(path: Path, rows: list[dict[str, Any]]) -> None:
    if not rows:
        path.write_text("", encoding="utf-8")
        return
    fieldnames = list(rows[0].keys())
    with path.open("w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(rows)
