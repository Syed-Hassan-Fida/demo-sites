"""Lead state machine — only valid transitions are allowed."""

from __future__ import annotations

ALLOWED_TRANSITIONS: dict[str, set[str]] = {
    "IMPORTED": {"CLEANING", "EXCLUDED"},
    "CLEANING": {"CLEANED", "EXCLUDED"},
    "CLEANED": {"VALIDATION_PENDING", "EXCLUDED", "SKIPPED"},
    "VALIDATION_PENDING": {"VALIDATION_COMPLETE", "EXCLUDED"},
    "VALIDATION_COMPLETE": {"RESEARCH_PENDING", "EXCLUDED", "SKIPPED"},
    "RESEARCH_PENDING": {"RESEARCHING", "SKIPPED", "EXCLUDED"},
    "RESEARCHING": {"RESEARCH_COMPLETE", "SKIPPED", "EXCLUDED"},
    "RESEARCH_COMPLETE": {"ANALYSIS_COMPLETE", "SKIPPED", "EXCLUDED"},
    "ANALYSIS_COMPLETE": {"DRAFTING", "SKIPPED", "EXCLUDED"},
    "DRAFTING": {"DRAFT_READY", "SKIPPED", "EXCLUDED"},
    "DRAFT_READY": {"AWAITING_APPROVAL", "SKIPPED", "EXCLUDED"},
    "AWAITING_APPROVAL": {"APPROVED", "REJECTED", "SKIPPED", "EXCLUDED", "DRAFTING"},
    "REJECTED": {"DRAFTING", "SKIPPED", "EXCLUDED"},
    "APPROVED": {"SENDING", "AWAITING_APPROVAL", "EXCLUDED"},
    "SENDING": {"SENT", "SEND_FAILED", "SEND_STATUS_UNKNOWN"},
    "SENT": set(),
    "SEND_FAILED": {"SENDING", "SKIPPED", "EXCLUDED"},
    "SEND_STATUS_UNKNOWN": {"SENT", "SEND_FAILED", "SKIPPED"},
    "SKIPPED": set(),
    "EXCLUDED": set(),
}


def can_transition(current: str, new_state: str) -> bool:
    if current == new_state:
        return True
    return new_state in ALLOWED_TRANSITIONS.get(current, set())


def assert_transition(current: str, new_state: str) -> None:
    if not can_transition(current, new_state):
        raise ValueError(f"Illegal lead state transition: {current} -> {new_state}")
