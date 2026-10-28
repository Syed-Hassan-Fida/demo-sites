"""Playwright website research — evidence-only, no invented problems."""

from __future__ import annotations

import json
import re
import sqlite3
from dataclasses import asdict, dataclass, field
from datetime import datetime, timezone
from pathlib import Path
from typing import Any
from urllib.parse import urljoin, urlparse

from src.db.schema import init_db
from src.db.states import assert_transition


CONTACT_KEYS = (
    "contact",
    "kontakt",
    "book",
    "boka",
    "reserv",
    "menu",
    "meny",
    "order",
    "beställ",
)


@dataclass
class EvidenceItem:
    id: str
    claim: str
    source_url: str
    detail: str = ""


@dataclass
class ResearchReport:
    lead_id: int
    campaign_id: int
    status: str
    confidence: str
    what_they_do: str
    customer_process: str
    strengths: list[str] = field(default_factory=list)
    problems: list[str] = field(default_factory=list)
    opportunities: list[str] = field(default_factory=list)
    app_justified: bool = False
    app_notes: str = ""
    evidence: list[EvidenceItem] = field(default_factory=list)
    gaps: list[str] = field(default_factory=list)
    sources: list[str] = field(default_factory=list)
    signals: dict[str, Any] = field(default_factory=dict)
    error: str | None = None


def utc_now() -> str:
    return datetime.now(timezone.utc).replace(microsecond=0).isoformat()


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


def _set_lead_state(conn: sqlite3.Connection, lead_id: int, current: str, new_state: str) -> None:
    assert_transition(current, new_state)
    conn.execute(
        "UPDATE leads SET state = ?, updated_at = ? WHERE id = ?",
        (new_state, utc_now(), lead_id),
    )


def _normalize_url(url: str) -> str | None:
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
    return text


def _visible_text(page) -> str:
    try:
        return page.inner_text("body", timeout=5000)
    except Exception:  # noqa: BLE001
        return ""


def _collect_links(page, base_url: str) -> list[dict[str, str]]:
    try:
        raw = page.eval_on_selector_all(
            "a[href]",
            """els => els.slice(0, 120).map(a => ({
                href: a.href || '',
                text: (a.innerText || '').trim().slice(0, 80)
            }))""",
        )
    except Exception:  # noqa: BLE001
        return []
    out: list[dict[str, str]] = []
    seen: set[str] = set()
    for item in raw or []:
        href = (item.get("href") or "").strip()
        if not href or href.startswith("javascript:"):
            continue
        full = urljoin(base_url, href).split("#")[0]
        if full in seen:
            continue
        seen.add(full)
        out.append({"href": full, "text": (item.get("text") or "").strip()})
    return out


def _has_viewport_meta(page) -> bool | None:
    try:
        content = page.locator("meta[name='viewport']").first.get_attribute("content")
        return bool(content and content.strip())
    except Exception:  # noqa: BLE001
        return None


def _count_forms_and_inputs(page) -> dict[str, int]:
    try:
        return page.evaluate(
            """() => ({
              forms: document.querySelectorAll('form').length,
              inputs: document.querySelectorAll('input, textarea, select').length,
              mailto: document.querySelectorAll('a[href^="mailto:"]').length,
              tel: document.querySelectorAll('a[href^="tel:"]').length
            })"""
        )
    except Exception:  # noqa: BLE001
        return {"forms": 0, "inputs": 0, "mailto": 0, "tel": 0}


def _find_cta_signals(links: list[dict[str, str]], text: str) -> dict[str, bool]:
    blob = " ".join(
        [(l.get("text") or "") + " " + (l.get("href") or "") for l in links]
    ).lower()
    text_l = (text or "").lower()
    hay = blob + " " + text_l
    return {
        "booking": any(k in hay for k in ("book", "boka", "reserv", "table")),
        "menu": any(k in hay for k in ("menu", "meny", "carta")),
        "order_online": any(k in hay for k in ("order", "beställ", "delivery", "takeaway", "take away")),
        "contact": any(k in hay for k in ("contact", "kontakt", "get in touch")),
    }


def _title_and_meta(page) -> dict[str, str]:
    data = {"title": "", "description": "", "h1": ""}
    try:
        data["title"] = (page.title() or "").strip()
    except Exception:  # noqa: BLE001
        pass
    try:
        desc = page.locator("meta[name='description']").first.get_attribute("content")
        data["description"] = (desc or "").strip()
    except Exception:  # noqa: BLE001
        pass
    try:
        h1 = page.locator("h1").first.inner_text(timeout=2000)
        data["h1"] = (h1 or "").strip()[:200]
    except Exception:  # noqa: BLE001
        pass
    return data


def research_website(
    *,
    lead_id: int,
    campaign_id: int,
    business_name: str,
    website_url: str,
    niche: str | None,
    location: str | None,
    timeout_ms: int = 30000,
) -> ResearchReport:
    url = _normalize_url(website_url)
    if not url:
        return ResearchReport(
            lead_id=lead_id,
            campaign_id=campaign_id,
            status="failed",
            confidence="low",
            what_they_do="Unknown — no valid website URL.",
            customer_process="Insufficient evidence.",
            gaps=["No valid website URL provided."],
            error="invalid_website",
        )

    from playwright.sync_api import sync_playwright

    evidence: list[EvidenceItem] = []
    sources: list[str] = []
    strengths: list[str] = []
    problems: list[str] = []
    opportunities: list[str] = []
    gaps: list[str] = []
    signals: dict[str, Any] = {
        "business_name": business_name,
        "niche": niche,
        "location": location,
        "website_url": url,
    }

    eid = 0

    def add_evidence(claim: str, source: str, detail: str = "") -> str:
        nonlocal eid
        eid += 1
        item_id = f"E{eid}"
        evidence.append(
            EvidenceItem(id=item_id, claim=claim, source_url=source, detail=detail)
        )
        if source not in sources:
            sources.append(source)
        return item_id

    try:
        with sync_playwright() as p:
            browser = p.chromium.launch(headless=True)
            context = browser.new_context(
                user_agent=(
                    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
                    "AppleWebKit/537.36 (KHTML, like Gecko) "
                    "Chrome/120.0.0.0 Safari/537.36"
                ),
                viewport={"width": 1280, "height": 900},
                locale="sv-SE",
            )
            page = context.new_page()

            # Desktop pass
            try:
                resp = page.goto(url, wait_until="domcontentloaded", timeout=timeout_ms)
                page.wait_for_timeout(900)
                final_url = page.url
                status_code = resp.status if resp else None
                sources.append(final_url)
                signals["desktop_status"] = status_code
                signals["final_url"] = final_url

                if status_code and status_code >= 400:
                    gaps.append(f"Homepage returned HTTP {status_code} on first load.")
                    add_evidence(
                        f"Homepage HTTP status {status_code}",
                        final_url,
                        "Temporary failures are possible; not treated as proof of no website.",
                    )
                else:
                    add_evidence("Homepage loaded successfully", final_url, f"HTTP {status_code}")

                meta = _title_and_meta(page)
                signals["meta"] = meta
                text = _visible_text(page)
                signals["text_length"] = len(text)
                links = _collect_links(page, final_url)
                signals["link_count"] = len(links)
                counts = _count_forms_and_inputs(page)
                signals["counts"] = counts
                viewport_ok = _has_viewport_meta(page)
                signals["viewport_meta"] = viewport_ok
                ctas = _find_cta_signals(links, text)
                signals["ctas"] = ctas

                if meta.get("title") or meta.get("h1") or meta.get("description"):
                    snippet = meta.get("h1") or meta.get("title") or meta.get("description")
                    add_evidence(
                        "Site presents a business title/heading",
                        final_url,
                        snippet[:180],
                    )

                if viewport_ok is True:
                    strengths.append("Viewport meta tag present (mobile-oriented markup).")
                    add_evidence("Viewport meta present", final_url)
                elif viewport_ok is False:
                    problems.append("No viewport meta tag observed on homepage.")
                    opportunities.append(
                        "Improve mobile presentation basics (viewport / responsive layout)."
                    )
                    add_evidence("Viewport meta missing", final_url)

                if ctas["menu"]:
                    strengths.append("Menu-related navigation or wording was observed.")
                    add_evidence("Menu signal present", final_url)
                else:
                    gaps.append("No clear menu link/text observed on checked pages.")

                if ctas["booking"]:
                    strengths.append("Booking/reservation signal was observed.")
                    add_evidence("Booking/reservation signal present", final_url)
                else:
                    problems.append("No clear booking/reservation CTA observed on checked pages.")
                    opportunities.append(
                        "Make table booking / reservation path clearer on mobile and desktop."
                    )
                    add_evidence("No booking CTA observed", final_url)

                if ctas["contact"] or counts.get("mailto", 0) > 0 or counts.get("tel", 0) > 0:
                    strengths.append("Contact path (page, mailto, or tel) was observed.")
                    add_evidence(
                        "Contact channel signal present",
                        final_url,
                        json.dumps(
                            {
                                "contact_cta": ctas["contact"],
                                "mailto": counts.get("mailto"),
                                "tel": counts.get("tel"),
                            }
                        ),
                    )
                else:
                    problems.append("No clear contact/mailto/tel signal observed on homepage.")
                    opportunities.append(
                        "Add an obvious contact or inquiry path for customers."
                    )
                    add_evidence("Weak contact signals on homepage", final_url)

                if counts.get("forms", 0) == 0 and not ctas["booking"]:
                    problems.append("No form and no booking CTA observed on homepage.")
                    add_evidence("No homepage form observed", final_url)

                # Follow up to 2 contact/booking-like internal links
                follow: list[str] = []
                host = urlparse(final_url).netloc
                for link in links:
                    href = link["href"]
                    if urlparse(href).netloc != host:
                        continue
                    blob = (link.get("text") + " " + href).lower()
                    if any(k in blob for k in CONTACT_KEYS):
                        if href not in follow and href != final_url:
                            follow.append(href)
                    if len(follow) >= 2:
                        break

                signals["followed_urls"] = follow
                for furl in follow:
                    try:
                        page.goto(furl, wait_until="domcontentloaded", timeout=timeout_ms)
                        page.wait_for_timeout(600)
                        ftext = _visible_text(page)
                        fcounts = _count_forms_and_inputs(page)
                        flinks = _collect_links(page, furl)
                        fctas = _find_cta_signals(flinks, ftext)
                        sources.append(page.url)
                        add_evidence(
                            "Secondary page checked",
                            page.url,
                            json.dumps({"forms": fcounts.get("forms"), "ctas": fctas}),
                        )
                        if fctas["booking"] or fcounts.get("forms", 0) > 0:
                            strengths.append(
                                f"Booking/contact interaction found on secondary page: {page.url}"
                            )
                            # soften earlier booking problem if now found
                            problems = [
                                p
                                for p in problems
                                if "booking/reservation CTA" not in p.lower()
                            ]
                    except Exception as exc:  # noqa: BLE001
                        gaps.append(f"Could not fully load secondary page {furl}: {exc}")

                # Mobile viewport pass on homepage
                page.set_viewport_size({"width": 390, "height": 844})
                page.goto(final_url, wait_until="domcontentloaded", timeout=timeout_ms)
                page.wait_for_timeout(700)
                mobile_width = page.evaluate("() => document.documentElement.scrollWidth")
                signals["mobile_scroll_width"] = mobile_width
                if isinstance(mobile_width, (int, float)) and mobile_width > 450:
                    problems.append(
                        f"On a 390px viewport, page scroll width was {int(mobile_width)}px "
                        "(possible horizontal overflow / weak mobile layout)."
                    )
                    opportunities.append(
                        "Improve mobile layout so customers can browse/book without horizontal scrolling."
                    )
                    add_evidence(
                        "Possible mobile overflow",
                        page.url,
                        f"scrollWidth={mobile_width}",
                    )
                else:
                    strengths.append("No obvious mobile horizontal overflow detected at 390px.")
                    add_evidence(
                        "Mobile scroll width looks constrained",
                        page.url,
                        f"scrollWidth={mobile_width}",
                    )

            finally:
                context.close()
                browser.close()

    except Exception as exc:  # noqa: BLE001
        return ResearchReport(
            lead_id=lead_id,
            campaign_id=campaign_id,
            status="failed",
            confidence="low",
            what_they_do="Unknown — website research failed.",
            customer_process="Insufficient evidence due to fetch/render failure.",
            gaps=[
                "Website could not be researched successfully.",
                "A temporary outage is possible; this is not proof the business has no website.",
            ],
            sources=[url],
            signals=signals,
            error=str(exc),
        )

    # Compose narrative from evidence only
    niche_l = (niche or "business").strip() or "business"
    loc = (location or "").strip()
    what = f"{business_name} appears to be a {niche_l}"
    if loc:
        what += f" associated with {loc}"
    what += "."
    if signals.get("meta", {}).get("description"):
        what += f" Site description observed: {signals['meta']['description'][:220]}"
    elif signals.get("meta", {}).get("h1"):
        what += f" Homepage heading observed: {signals['meta']['h1'][:160]}"
    else:
        gaps.append("Limited on-page description/heading text to summarize services.")

    process_bits = []
    ctas = signals.get("ctas") or {}
    if ctas.get("menu"):
        process_bits.append("customers can likely browse a menu")
    if ctas.get("booking"):
        process_bits.append("a booking/reservation path appears available")
    if ctas.get("order_online"):
        process_bits.append("online ordering/takeaway signals were observed")
    if ctas.get("contact") or (signals.get("counts") or {}).get("mailto"):
        process_bits.append("a contact path exists")
    if process_bits:
        customer_process = "Based on observed site signals, " + "; ".join(process_bits) + "."
    else:
        customer_process = (
            "Customer acquisition/service process is unclear from checked pages; "
            "evidence was insufficient for a confident description."
        )
        gaps.append("Customer journey not clearly evidenced on checked pages.")

    # App recommendation: conservative
    app_justified = False
    app_notes = (
        "A dedicated Android app is not clearly justified from current evidence. "
        "A stronger mobile website and/or booking flow is usually more cost-effective first."
    )
    if ctas.get("order_online") and ctas.get("booking"):
        app_notes = (
            "Ordering + booking signals exist, but a responsive website/PWA is still likely "
            "more appropriate than a custom Android app at a $500 scope."
        )

    # Confidence
    status_code = signals.get("desktop_status")
    if evidence and (status_code is None or int(status_code) < 400):
        confidence = "medium" if len(problems) + len(strengths) >= 2 else "low"
        if len(gaps) >= 4:
            confidence = "low"
    else:
        confidence = "low"

    # Deduplicate lists while preserving order
    def uniq(items: list[str]) -> list[str]:
        out: list[str] = []
        seen: set[str] = set()
        for i in items:
            if i not in seen:
                seen.add(i)
                out.append(i)
        return out

    return ResearchReport(
        lead_id=lead_id,
        campaign_id=campaign_id,
        status="complete",
        confidence=confidence,
        what_they_do=what,
        customer_process=customer_process,
        strengths=uniq(strengths),
        problems=uniq(problems),
        opportunities=uniq(opportunities)[:4],
        app_justified=app_justified,
        app_notes=app_notes,
        evidence=evidence,
        gaps=uniq(gaps),
        sources=sources,
        signals=signals,
        error=None,
    )


def save_research_report(conn: sqlite3.Connection, report: ResearchReport) -> None:
    now = utc_now()
    conn.execute(
        """
        INSERT INTO research_reports (
            lead_id, campaign_id, status, confidence, what_they_do, customer_process,
            strengths_json, problems_json, opportunities_json, app_justified, app_notes,
            evidence_json, gaps_json, sources_json, signals_json, error, created_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON CONFLICT(lead_id) DO UPDATE SET
            campaign_id=excluded.campaign_id,
            status=excluded.status,
            confidence=excluded.confidence,
            what_they_do=excluded.what_they_do,
            customer_process=excluded.customer_process,
            strengths_json=excluded.strengths_json,
            problems_json=excluded.problems_json,
            opportunities_json=excluded.opportunities_json,
            app_justified=excluded.app_justified,
            app_notes=excluded.app_notes,
            evidence_json=excluded.evidence_json,
            gaps_json=excluded.gaps_json,
            sources_json=excluded.sources_json,
            signals_json=excluded.signals_json,
            error=excluded.error,
            updated_at=excluded.updated_at
        """,
        (
            report.lead_id,
            report.campaign_id,
            report.status,
            report.confidence,
            report.what_they_do,
            report.customer_process,
            json.dumps(report.strengths, ensure_ascii=False),
            json.dumps(report.problems, ensure_ascii=False),
            json.dumps(report.opportunities, ensure_ascii=False),
            1 if report.app_justified else 0,
            report.app_notes,
            json.dumps([asdict(e) for e in report.evidence], ensure_ascii=False),
            json.dumps(report.gaps, ensure_ascii=False),
            json.dumps(report.sources, ensure_ascii=False),
            json.dumps(report.signals, ensure_ascii=False),
            report.error,
            now,
            now,
        ),
    )


def research_campaign(
    *,
    db_path: Path,
    campaign_id: int,
    limit: int | None = None,
    start_lead_id: int | None = None,
    timeout_ms: int = 30000,
    export_dir: Path | None = None,
) -> dict[str, Any]:
    conn = init_db(db_path)
    query = """
        SELECT id, campaign_id, business_name, website_url, niche, location, state
        FROM leads
        WHERE campaign_id = ?
          AND state IN ('VALIDATION_COMPLETE', 'RESEARCH_PENDING', 'RESEARCHING', 'RESEARCH_COMPLETE')
          AND website_url IS NOT NULL
          AND TRIM(website_url) != ''
    """
    params: list[Any] = [campaign_id]
    if start_lead_id is not None:
        query += " AND id >= ?"
        params.append(start_lead_id)
    query += " ORDER BY id"
    if limit is not None:
        query += " LIMIT ?"
        params.append(limit)

    leads = conn.execute(query, params).fetchall()
    # Skip leads that already have a complete research report unless still RESEARCHING
    todo = []
    for lead in leads:
        existing = conn.execute(
            "SELECT status FROM research_reports WHERE lead_id = ?",
            (lead["id"],),
        ).fetchone()
        if existing and existing["status"] == "complete" and lead["state"] in {
            "RESEARCH_COMPLETE",
            "ANALYSIS_COMPLETE",
        }:
            continue
        todo.append(lead)

    stats = {
        "campaign_id": campaign_id,
        "candidates": len(leads),
        "todo": len(todo),
        "completed": 0,
        "failed": 0,
        "skipped": 0,
    }

    reports_out: list[dict[str, Any]] = []

    for idx, lead in enumerate(todo, start=1):
        lead_id = int(lead["id"])
        state = lead["state"]
        print(
            f"[{idx}/{len(todo)}] lead={lead_id} {lead['business_name']} -> {lead['website_url']}",
            flush=True,
        )

        try:
            if state == "VALIDATION_COMPLETE":
                _set_lead_state(conn, lead_id, state, "RESEARCH_PENDING")
                state = "RESEARCH_PENDING"
            if state == "RESEARCH_PENDING":
                _set_lead_state(conn, lead_id, state, "RESEARCHING")
                state = "RESEARCHING"
            conn.commit()

            report = research_website(
                lead_id=lead_id,
                campaign_id=int(lead["campaign_id"]),
                business_name=lead["business_name"] or "",
                website_url=lead["website_url"] or "",
                niche=lead["niche"],
                location=lead["location"],
                timeout_ms=timeout_ms,
            )
            save_research_report(conn, report)

            if report.status == "complete":
                if state == "RESEARCHING":
                    _set_lead_state(conn, lead_id, "RESEARCHING", "RESEARCH_COMPLETE")
                    _set_lead_state(conn, lead_id, "RESEARCH_COMPLETE", "ANALYSIS_COMPLETE")
                elif state == "RESEARCH_COMPLETE":
                    _set_lead_state(conn, lead_id, "RESEARCH_COMPLETE", "ANALYSIS_COMPLETE")
                stats["completed"] += 1
                print(
                    f"    -> complete | confidence={report.confidence} | "
                    f"problems={len(report.problems)} opportunities={len(report.opportunities)}",
                    flush=True,
                )
            else:
                # Keep lead researchable; do not invent success
                if state == "RESEARCHING":
                    # Move back is not allowed; mark RESEARCH_COMPLETE with failed report?
                    # Spec: preserve work, show failure. Use RESEARCH_COMPLETE only if we have a report.
                    # Better leave as RESEARCHING failed -> set to RESEARCH_PENDING via?
                    # Allowed from RESEARCHING: RESEARCH_COMPLETE, SKIPPED, EXCLUDED
                    _set_lead_state(conn, lead_id, "RESEARCHING", "RESEARCH_COMPLETE")
                stats["failed"] += 1
                print(f"    -> failed | {report.error}", flush=True)

            _audit(
                conn,
                campaign_id=campaign_id,
                lead_id=lead_id,
                event_type="research_finished",
                message=f"Research {report.status} for {lead['business_name']}",
                details={
                    "confidence": report.confidence,
                    "problems": report.problems,
                    "opportunities": report.opportunities,
                    "error": report.error,
                },
            )
            conn.commit()
            reports_out.append(
                {
                    "lead_id": lead_id,
                    "business_name": lead["business_name"],
                    "status": report.status,
                    "confidence": report.confidence,
                    "opportunities": report.opportunities,
                    "problems": report.problems,
                }
            )
        except Exception as exc:  # noqa: BLE001
            stats["failed"] += 1
            conn.rollback()
            print(f"    -> error | {exc}", flush=True)
            _audit(
                conn,
                campaign_id=campaign_id,
                lead_id=lead_id,
                event_type="research_error",
                message=str(exc),
            )
            conn.commit()

    if export_dir is not None:
        export_dir.mkdir(parents=True, exist_ok=True)
        out = export_dir / f"campaign_{campaign_id}_research_summary.json"
        # Full dump of reports for campaign
        rows = conn.execute(
            """
            SELECT r.*, l.business_name, l.email, l.website_url
            FROM research_reports r
            JOIN leads l ON l.id = r.lead_id
            WHERE r.campaign_id = ?
            ORDER BY r.lead_id
            """,
            (campaign_id,),
        ).fetchall()
        payload = {
            "stats": stats,
            "reports": [dict(r) for r in rows],
        }
        out.write_text(json.dumps(payload, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
        stats["export"] = str(out)

    conn.execute(
        "UPDATE campaigns SET status = ?, updated_at = ? WHERE id = ?",
        ("research_complete" if stats["todo"] and stats["failed"] < stats["todo"] else "research_finished", utc_now(), campaign_id),
    )
    conn.commit()
    conn.close()
    return stats
