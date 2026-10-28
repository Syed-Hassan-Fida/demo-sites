from src.pipeline.clean import build_header_map, normalize_row, normalize_website


def test_maps_scrape_header_mapping():
    headers = [
        "OSrXXb",
        "rllt__details",
        "yi40Hd",
        "RDApEe",
        "rllt__details 2",
        "rllt__details 3",
        "uDyWh",
        "wA1Bge src",
    ]
    mapping = build_header_map(headers)
    assert mapping["business_name"] == "OSrXXb"
    assert mapping["location"] == "rllt__details 3"
    assert "email" not in mapping
    assert "website_url" not in mapping


def test_normalize_maps_row_marks_missing_email_and_website():
    headers = ["OSrXXb", "rllt__details", "rllt__details 3", "uDyWh", "wA1Bge src"]
    mapping = build_header_map(headers)
    lead = normalize_row(
        {
            "OSrXXb": "Stockholms Gästabud",
            "rllt__details": "·  · Swedish",
            "rllt__details 3": "Stockholm, Sweden",
            "uDyWh": '"Good food"',
            "wA1Bge src": "https://lh3.googleusercontent.com/grass-cs/example",
        },
        mapping,
        default_source="test",
    )
    assert lead.business_name == "Stockholms Gästabud"
    assert lead.niche == "Swedish"
    assert lead.location == "Stockholm, Sweden"
    assert lead.website_url is None  # image CDN rejected
    assert "missing_email" in lead.issues
    assert "missing_website" in lead.issues


def test_normalize_website_rejects_google_image_cdn():
    assert normalize_website("https://lh3.googleusercontent.com/abc") is None
    assert normalize_website("https://northern-broth.example") == "https://northern-broth.example"
