from src.pipeline.classify_email import classify_email


def test_missing_email():
    result = classify_email(None, check_mx=False)
    assert result.label == "incomplete"


def test_invalid_syntax():
    result = classify_email("not-an-email", check_mx=False)
    assert result.label == "invalid"


def test_eligible_looking_without_claiming_inbox():
    result = classify_email("anna@fictional-fika-house.example", check_mx=False)
    assert result.label == "eligible_looking"
    assert "not proven" in result.reason.lower()


def test_role_based_flagged_risky():
    result = classify_email("info@role-inbox-grill.example", check_mx=False)
    assert result.label == "risky"
    assert "Role-based" in result.reason


def test_disposable_flagged():
    result = classify_email("a@mailinator.com", check_mx=False)
    assert result.label == "risky"
