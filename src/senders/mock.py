"""Mock sender for tests and Phase 1 — never opens a network connection."""

from __future__ import annotations

from dataclasses import dataclass
from datetime import datetime, timezone


@dataclass
class MockSendResult:
    ok: bool
    provider: str
    message_id: str
    detail: str


def mock_send(*, sender: str, recipient: str, subject: str, body: str) -> MockSendResult:
    if not recipient or "@" not in recipient:
        return MockSendResult(
            ok=False,
            provider="mock",
            message_id="",
            detail="Refused: invalid recipient for mock send.",
        )
    stamp = datetime.now(timezone.utc).strftime("%Y%m%dT%H%M%SZ")
    return MockSendResult(
        ok=True,
        provider="mock",
        message_id=f"mock-{stamp}-{abs(hash((sender, recipient, subject))) % 10_000_000}",
        detail=(
            f"Mock accepted message from {sender} to {recipient}. "
            "No real email was sent."
        ),
    )
