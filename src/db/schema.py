"""SQLite schema for persistent campaign state (Phase 1)."""

from __future__ import annotations

import sqlite3
from pathlib import Path

SCHEMA_SQL = """
PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS campaigns (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    niche TEXT NOT NULL,
    location TEXT NOT NULL,
    source_csv TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'created',
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS leads (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    campaign_id INTEGER NOT NULL REFERENCES campaigns(id),
    business_name TEXT,
    niche TEXT,
    email TEXT,
    website_url TEXT,
    location TEXT,
    service_area TEXT,
    phone TEXT,
    public_description TEXT,
    source TEXT,
    retrieved_date TEXT,
    rating TEXT,
    review_count TEXT,
    price_range TEXT,
    image_url TEXT,
    review_snippet TEXT,
    extra_json TEXT,
    email_class TEXT,
    email_class_reason TEXT,
    state TEXT NOT NULL,
    exclusion_reason TEXT,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_leads_campaign ON leads(campaign_id);
CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);
CREATE INDEX IF NOT EXISTS idx_leads_state ON leads(state);

CREATE TABLE IF NOT EXISTS audit_log (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    campaign_id INTEGER,
    lead_id INTEGER,
    event_type TEXT NOT NULL,
    message TEXT NOT NULL,
    details_json TEXT,
    created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS daily_send_counters (
    day TEXT NOT NULL,
    account_email TEXT NOT NULL,
    sent_count INTEGER NOT NULL DEFAULT 0,
    PRIMARY KEY (day, account_email)
);

CREATE TABLE IF NOT EXISTS suppression (
    email TEXT PRIMARY KEY,
    reason TEXT NOT NULL,
    created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS research_reports (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    lead_id INTEGER NOT NULL UNIQUE REFERENCES leads(id),
    campaign_id INTEGER NOT NULL REFERENCES campaigns(id),
    status TEXT NOT NULL,
    confidence TEXT,
    what_they_do TEXT,
    customer_process TEXT,
    strengths_json TEXT,
    problems_json TEXT,
    opportunities_json TEXT,
    app_justified INTEGER NOT NULL DEFAULT 0,
    app_notes TEXT,
    evidence_json TEXT,
    gaps_json TEXT,
    sources_json TEXT,
    signals_json TEXT,
    error TEXT,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_research_campaign ON research_reports(campaign_id);
"""


def connect(db_path: Path) -> sqlite3.Connection:
    db_path.parent.mkdir(parents=True, exist_ok=True)
    conn = sqlite3.connect(str(db_path))
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA foreign_keys = ON")
    return conn


def init_db(db_path: Path) -> sqlite3.Connection:
    conn = connect(db_path)
    conn.executescript(SCHEMA_SQL)
    conn.commit()
    return conn
