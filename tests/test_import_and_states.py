from pathlib import Path

from src.db.schema import connect
from src.db.states import can_transition
from src.pipeline.import_csv import import_csv
from src.senders.mock import mock_send

ROOT = Path(__file__).resolve().parents[1]
SAMPLE = ROOT / "data" / "samples" / "fictional_restaurants_sweden.csv"


def test_state_machine_blocks_research_to_sent():
    assert not can_transition("RESEARCH_COMPLETE", "SENT")
    assert can_transition("APPROVED", "SENDING")
    assert can_transition("AWAITING_APPROVAL", "APPROVED")


def test_import_sample_csv(tmp_path: Path):
    stats = import_csv(
        csv_path=SAMPLE,
        db_path=tmp_path / "test.db",
        originals_dir=tmp_path / "originals",
        exports_dir=tmp_path / "exports",
        niche="restaurants",
        location="Sweden",
        check_mx=False,
        source_label="sample",
    )
    assert stats.imported == 6
    assert stats.duplicates >= 1
    assert stats.invalid >= 1
    assert stats.incomplete >= 1
    assert stats.retained >= 2

    conn = connect(tmp_path / "test.db")
    retained = conn.execute(
        "SELECT COUNT(*) AS c FROM leads WHERE state = 'VALIDATION_COMPLETE'"
    ).fetchone()["c"]
    excluded = conn.execute(
        "SELECT COUNT(*) AS c FROM leads WHERE state = 'EXCLUDED'"
    ).fetchone()["c"]
    assert retained == stats.retained
    assert excluded == stats.excluded
    assert (tmp_path / "exports" / f"campaign_{stats.campaign_id}_import_report.json").exists()


def test_mock_sender_never_claims_live_delivery():
    result = mock_send(
        sender="hassansfida@gmail.com",
        recipient="hello@fictional-fika-house.example",
        subject="Quick note",
        body="Hello",
    )
    assert result.ok
    assert result.provider == "mock"
    assert "No real email was sent" in result.detail
