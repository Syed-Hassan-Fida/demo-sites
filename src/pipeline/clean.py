"""Normalize rows and map varied CSV headers to the internal lead schema."""

from __future__ import annotations

import json
import re
from dataclasses import dataclass, field
from typing import Any
from urllib.parse import urlparse

# Known Google Maps scrape export headers (Instant Data Scraper / similar)
MAPS_SCRAPE_ALIASES = {
    "business_name": ["osrxxb", "title", "name", "business", "business_name", "company", "restaurant"],
    "niche": ["rllt__details", "category", "type", "niche", "cuisine"],
    "rating": ["yi40hd", "rating", "stars", "score"],
    "review_count": ["rdapee", "reviews", "review_count", "review count"],
    "price_range": ["rllt__details 2", "price", "price_range", "price range"],
    "location": ["rllt__details 3", "address", "location", "city", "area"],
    "review_snippet": ["udywh", "review", "snippet", "quote", "public_description", "description"],
    "image_url": ["wa1bge src", "image", "thumbnail", "photo", "img"],
    "email": ["email", "e-mail", "mail", "email_address", "email address", "contact_email"],
    "website_url": ["website", "website_url", "url", "site", "web", "homepage", "website url"],
    "phone": ["phone", "tel", "telephone", "mobile", "phone_number"],
    "source": ["source", "provenance"],
    "retrieved_date": ["retrieved_date", "retrieved", "scraped_at", "date"],
}


@dataclass
class NormalizedLead:
    business_name: str | None = None
    niche: str | None = None
    email: str | None = None
    website_url: str | None = None
    location: str | None = None
    service_area: str | None = None
    phone: str | None = None
    public_description: str | None = None
    source: str | None = None
    retrieved_date: str | None = None
    rating: str | None = None
    review_count: str | None = None
    price_range: str | None = None
    image_url: str | None = None
    review_snippet: str | None = None
    extra: dict[str, Any] = field(default_factory=dict)
    issues: list[str] = field(default_factory=list)

    def to_extra_json(self) -> str:
        return json.dumps(self.extra, ensure_ascii=False)


def _norm_header(value: str) -> str:
    return re.sub(r"\s+", " ", value.strip().lower())


def build_header_map(fieldnames: list[str] | None) -> dict[str, str]:
    """Map internal field -> original CSV header."""
    if not fieldnames:
        return {}
    normalized = {_norm_header(h): h for h in fieldnames}
    mapping: dict[str, str] = {}
    for internal, aliases in MAPS_SCRAPE_ALIASES.items():
        for alias in aliases:
            key = _norm_header(alias)
            if key in normalized:
                mapping[internal] = normalized[key]
                break
    return mapping


def _clean_text(value: Any) -> str | None:
    if value is None:
        return None
    text = str(value).strip()
    if not text:
        return None
    # Strip common Maps decoration
    text = text.strip().strip('"').strip()
    text = re.sub(r"^·\s*", "", text)
    text = re.sub(r"\s+", " ", text)
    return text or None


def _clean_niche(value: str | None) -> str | None:
    text = _clean_text(value)
    if not text:
        return None
    # "·  · Swedish" / "· Shopping mall"
    parts = [p.strip() for p in re.split(r"·+", text) if p.strip()]
    return parts[-1] if parts else text


def normalize_website(value: str | None) -> str | None:
    text = _clean_text(value)
    if not text:
        return None
    if text.startswith("//"):
        text = "https:" + text
    if not re.match(r"^https?://", text, re.I):
        text = "https://" + text
    parsed = urlparse(text)
    if not parsed.netloc or "googleusercontent.com" in parsed.netloc:
        # Image CDN URLs are not business websites
        return None
    if "google.com" in parsed.netloc and "/maps" in (parsed.path or ""):
        return None
    return text.rstrip("/")


def normalize_row(
    raw: dict[str, Any],
    header_map: dict[str, str],
    *,
    default_source: str | None = None,
) -> NormalizedLead:
    def get(internal: str) -> str | None:
        header = header_map.get(internal)
        if not header:
            return None
        return _clean_text(raw.get(header))

    lead = NormalizedLead(
        business_name=get("business_name"),
        niche=_clean_niche(get("niche")),
        email=get("email"),
        website_url=normalize_website(get("website_url")),
        location=get("location"),
        phone=get("phone"),
        public_description=get("review_snippet"),
        source=get("source") or default_source,
        retrieved_date=get("retrieved_date"),
        rating=get("rating"),
        review_count=get("review_count"),
        price_range=get("price_range"),
        image_url=get("image_url"),
        review_snippet=get("review_snippet"),
    )

    known_headers = set(header_map.values())
    for k, v in raw.items():
        if k not in known_headers:
            cleaned = _clean_text(v)
            if cleaned:
                lead.extra[k] = cleaned

    if not lead.business_name:
        lead.issues.append("missing_business_name")
    if not lead.email:
        lead.issues.append("missing_email")
    if not lead.website_url:
        lead.issues.append("missing_website")

    return lead


def business_dedupe_key(lead: NormalizedLead) -> str:
    name = (lead.business_name or "").strip().lower()
    loc = (lead.location or "").strip().lower()
    return f"{name}|{loc}"
