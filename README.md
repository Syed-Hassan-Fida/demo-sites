# Cold Email Outreach (local-first)

AI-assisted research + human-approved outreach. **Infrastructure budget: USD $0.**

Authoritative spec: `PROJECT_REQUIREMENTS.md`  
Feasibility: `FEASIBILITY_REPORT.md`  
Architecture: `ARCHITECTURE.md`

## Phase 1 status (implemented)

- Project layout, `.gitignore`, `config.example.env`
- SQLite schema + lead state machine helpers
- CSV import → clean → dedupe → email classify (syntax + optional MX)
- Google Maps scrape column aliases (e.g. `OSrXXb` → business name)
- Fictional sample CSV + pytest suite
- Mock sender only (no live Gmail send yet)

Not in Phase 1: Playwright research, Ollama drafting, Streamlit approval UI, Gmail OAuth.

## Setup

```bash
cd /Users/mac/Desktop/COLD-EMAIL-OUTREACH
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp config.example.env .env
```

## Import a CSV

```bash
source .venv/bin/activate
python -m src.main import-csv data/samples/fictional_restaurants_sweden.csv --niche restaurants --location Sweden --no-mx
```

Real file example:

```bash
python -m src.main import-csv data/incoming/restaurants-shops-in-sweden.csv --niche restaurants --location Sweden
```

Outputs:

- `storage/outreach.db`
- `data/originals/` preserved copy of the CSV
- `data/exports/campaign_<id>_cleaned.csv`
- `data/exports/campaign_<id>_excluded.csv`
- `data/exports/campaign_<id>_import_report.json`

## Tests

```bash
source .venv/bin/activate
pytest -q
```

## Sending accounts (configured, not connected yet)

- `hassansfida@gmail.com`
- `hassans.official1@gmail.com`
- Policy: round-robin, **15/account**, **30/day** global
- `SEND_MODE=mock` until you explicitly enable live send after OAuth

## Honest note on Maps scrapes

Many Google Maps scrapes include name/rating/location/images but **no business email or website**. Phase 1 will import them and classify almost all as incomplete/excluded until email (and ideally website) columns are present.
