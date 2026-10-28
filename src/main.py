"""CLI entrypoint for local outreach system."""

from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path

from src.config.settings import ensure_runtime_dirs, load_settings
from src.pipeline.import_csv import import_csv
from src.pipeline.research import research_campaign


def build_parser() -> argparse.ArgumentParser:
    p = argparse.ArgumentParser(
        description="Cold outreach local system",
    )
    sub = p.add_subparsers(dest="command", required=True)

    imp = sub.add_parser("import-csv", help="Import, clean, classify a CSV into SQLite")
    imp.add_argument("csv_path", type=Path, help="Path to CSV file")
    imp.add_argument("--niche", default=None, help="Campaign niche (default from config)")
    imp.add_argument(
        "--location", default=None, help="Campaign location (default from config)"
    )
    imp.add_argument(
        "--no-mx",
        action="store_true",
        help="Skip DNS/MX lookups (faster offline tests)",
    )
    imp.add_argument(
        "--source-label",
        default=None,
        help="Provenance label stored on leads",
    )

    res = sub.add_parser(
        "research-campaign",
        help="Playwright website research for retained leads in a campaign",
    )
    res.add_argument("--campaign-id", type=int, required=True)
    res.add_argument("--limit", type=int, default=None)
    res.add_argument("--start-lead-id", type=int, default=None)
    res.add_argument("--timeout-ms", type=int, default=30000)
    return p


def main(argv: list[str] | None = None) -> int:
    args = build_parser().parse_args(argv)
    settings = load_settings()
    ensure_runtime_dirs(settings)

    if args.command == "import-csv":
        csv_path = args.csv_path.expanduser().resolve()
        stats = import_csv(
            csv_path=csv_path,
            db_path=settings.db_path,
            originals_dir=settings.originals_dir,
            exports_dir=settings.exports_dir,
            niche=args.niche or settings.default_niche,
            location=args.location or settings.default_location,
            check_mx=not args.no_mx,
            source_label=args.source_label,
        )
        print(json.dumps(stats.to_dict(), indent=2, ensure_ascii=False))
        print(
            f"\nDB: {settings.db_path}\n"
            f"Exports: {settings.exports_dir}/campaign_{stats.campaign_id}_*",
            file=sys.stderr,
        )
        if stats.retained == 0:
            print(
                "WARNING: 0 leads retained. This CSV likely lacks usable email addresses.",
                file=sys.stderr,
            )
            return 2
        return 0

    if args.command == "research-campaign":
        stats = research_campaign(
            db_path=settings.db_path,
            campaign_id=args.campaign_id,
            limit=args.limit,
            start_lead_id=args.start_lead_id,
            timeout_ms=args.timeout_ms,
            export_dir=settings.exports_dir,
        )
        print(json.dumps(stats, indent=2, ensure_ascii=False))
        return 0 if stats.get("completed", 0) > 0 or stats.get("todo", 0) == 0 else 1

    return 1


if __name__ == "__main__":
    raise SystemExit(main())
