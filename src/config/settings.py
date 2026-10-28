"""Load local configuration from environment / .env (no secrets in code)."""

from __future__ import annotations

import os
from dataclasses import dataclass
from pathlib import Path

from dotenv import load_dotenv

PROJECT_ROOT = Path(__file__).resolve().parents[2]


def _path(value: str) -> Path:
    p = Path(value)
    return p if p.is_absolute() else PROJECT_ROOT / p


@dataclass(frozen=True)
class Settings:
    project_root: Path
    db_path: Path
    incoming_csv_dir: Path
    exports_dir: Path
    originals_dir: Path
    logs_dir: Path
    default_niche: str
    default_location: str
    send_mode: str
    global_daily_send_cap: int
    account_daily_send_cap: int
    sender_policy: str
    sender_a_email: str
    sender_b_email: str


def load_settings() -> Settings:
    load_dotenv(PROJECT_ROOT / ".env", override=False)
    # Also allow example defaults when .env is missing
    load_dotenv(PROJECT_ROOT / "config.example.env", override=False)

    send_mode = os.getenv("SEND_MODE", "mock").strip().lower()
    if send_mode not in {"mock", "live"}:
        send_mode = "mock"

    return Settings(
        project_root=PROJECT_ROOT,
        db_path=_path(os.getenv("OUTREACH_DB_PATH", "storage/outreach.db")),
        incoming_csv_dir=_path(os.getenv("INCOMING_CSV_DIR", "data/incoming")),
        exports_dir=_path(os.getenv("EXPORTS_DIR", "data/exports")),
        originals_dir=_path(os.getenv("ORIGINALS_DIR", "data/originals")),
        logs_dir=_path(os.getenv("LOGS_DIR", "logs")),
        default_niche=os.getenv("DEFAULT_NICHE", "restaurants"),
        default_location=os.getenv("DEFAULT_LOCATION", "Sweden"),
        send_mode=send_mode,
        global_daily_send_cap=int(os.getenv("GLOBAL_DAILY_SEND_CAP", "30")),
        account_daily_send_cap=int(os.getenv("ACCOUNT_DAILY_SEND_CAP", "15")),
        sender_policy=os.getenv("SENDER_POLICY", "round_robin"),
        sender_a_email=os.getenv("SENDER_A_EMAIL", "hassansfida@gmail.com"),
        sender_b_email=os.getenv("SENDER_B_EMAIL", "hassans.official1@gmail.com"),
    )


def ensure_runtime_dirs(settings: Settings) -> None:
    for path in (
        settings.db_path.parent,
        settings.incoming_csv_dir,
        settings.exports_dir,
        settings.originals_dir,
        settings.logs_dir,
    ):
        path.mkdir(parents=True, exist_ok=True)
