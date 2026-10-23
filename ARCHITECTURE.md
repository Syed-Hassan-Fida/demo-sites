# ARCHITECTURE.md

**Document status:** Proposed architecture (pre-implementation)  
**Authority:** Subordinate to `PROJECT_REQUIREMENTS.md`; aligned with `FEASIBILITY_REPORT.md`  
**Date:** 2026-10-23  
**Budget:** USD $0 infrastructure  
**Build status:** Design only — no full implementation yet  

---

## 1. Purpose

Define a local-first architecture for an AI-assisted business research, lead qualification, and human-approved cold outreach system that:

- Runs on the user’s Mac  
- Costs USD $0 to operate within the chosen tool set  
- Accepts **user-supplied CSV leads** (manual Google Maps / other public research)  
- Drafts **professional, human-sounding** emails (must not feel AI-generated)  
- Sends only after **per-message human approval**  
- Uses two authorized Gmail accounts as senders in **round-robin**  
- Caps sending at **30 emails/day globally** (15 per account), user-approved override of the spec’s 25 default  
- Uses **Playwright from day one** for website research  
- Uses **Streamlit** for the approval / campaign UI  
- Owns professional, human-sounding draft composition (deliverability-oriented; no inbox guarantee)

---

## 2. Design principles

1. **Automation prepares. The system explains. The user approves. Only then may the system send.**  
2. **Local-first:** processing, state, drafts, logs, and dashboard on the Mac.  
3. **Truth over theater:** no fabricated research, progress, verification certainty, or capabilities.  
4. **Evidence-bound personalization:** drafts cite only observed public facts.  
5. **Human voice is a hard requirement:** tone, phrasing, and structure must read as a careful human consultant, not an AI template.  
6. **Secrets stay out of git:** OAuth tokens, app passwords, and API keys never enter source or examples with real values.  
7. **Smallest reliable vertical slice first:** CSV → clean → research → draft → approve → mock send, then live Gmail.  

---

## 3. High-level system diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                        USER (Mac)                               │
│  Manual Google Maps / public research → supplies CSV files      │
└───────────────────────────────┬─────────────────────────────────┘
                                │ import
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                     ORCHESTRATOR (Python)                       │
│  campaign control · stage runner · rate limits · recovery       │
└───┬─────────┬───────────┬────────────┬────────────┬─────────────┘
    │         │           │            │            │
    ▼         ▼           ▼            ▼            ▼
┌───────┐ ┌───────┐ ┌──────────┐ ┌──────────┐ ┌────────────┐
│ CSV   │ │Email  │ │Research  │ │Drafting  │ │Sender      │
│Import │ │Classify│ │+ Analyze │ │Engine    │ │(Gmail/Mock)│
│Clean  │ │MX/DNS │ │(HTTP/LLM)│ │(Ollama + │ │            │
│Dedupe │ │       │ │          │ │validators│ │            │
└───┬───┘ └───┬───┘ └────┬─────┘ └────┬─────┘ └─────┬──────┘
    │         │          │            │             │
    └─────────┴──────────┴─────┬──────┴─────────────┘
                               ▼
                    ┌────────────────────┐
                    │   SQLite (state)   │
                    │ leads · drafts ·   │
                    │ approvals · sends  │
                    │ audit · counters   │
                    └─────────┬──────────┘
                              ▼
                    ┌────────────────────┐
                    │ Approval Dashboard │
                    │ (localhost UI)     │
                    │ review · edit ·    │
                    │ approve · reject   │
                    └─────────┬──────────┘
                              │ explicit approve only
                              ▼
              ┌───────────────────────────────┐
              │ Gmail accounts (OAuth)        │
              │ 1. hassansfida@gmail.com      │
              │ 2. hassans.official1@gmail.com│
              └───────────────────────────────┘
```

---

## 4. Component design

### 4.1 Project layout (proposed)

```
COLD-EMAIL-OUTREACH/
├── PROJECT_REQUIREMENTS.md
├── FEASIBILITY_REPORT.md
├── ARCHITECTURE.md
├── README.md                      # later
├── EMAIL_COMPLIANCE.md            # later
├── ROADMAP.md                     # later
├── config.example.env
├── data/
│   ├── incoming/                  # user-dropped CSVs (gitignored content ok)
│   ├── samples/                   # fictional sample CSVs only
│   └── exports/
├── storage/
│   └── outreach.db                # SQLite (gitignored)
├── logs/
├── src/
│   ├── config/
│   ├── db/
│   ├── pipeline/
│   │   ├── import_csv.py
│   │   ├── clean.py
│   │   ├── classify_email.py
│   │   ├── research.py
│   │   ├── analyze_site.py
│   │   ├── score.py
│   │   └── draft_email.py
│   ├── ai/
│   │   ├── ollama_client.py
│   │   ├── prompts.py
│   │   └── human_voice.py         # banned phrases, validators
│   ├── approval/
│   │   └── queue.py
│   ├── senders/
│   │   ├── mock.py
│   │   ├── gmail_oauth.py
│   │   └── limits.py
│   ├── dashboard/
│   └── main.py
└── tests/
```

Exact module names may adjust during implementation; boundaries above are the architectural intent.

### 4.2 Configuration

- `config.example.env` documents keys with empty/placeholder values.  
- Real `.env` is gitignored.  
- Config includes:
  - paths for DB, incoming CSV, exports, logs  
  - Ollama host/model name  
  - global daily send cap (**30**, user-locked)  
  - per-account daily sub-caps (**15** each)  
  - sender policy: **round-robin**  
  - sender account IDs (emails only)  
  - pacing delay range  
  - feature flags (mock send vs live send)  
  - Playwright settings (timeouts, mobile viewport size)  

**Configured sender identities:**

| ID | Email | Role | Daily sub-cap |
|---|---|---|---:|
| `gmail_a` | `hassansfida@gmail.com` | Round-robin sender | 15 |
| `gmail_b` | `hassans.official1@gmail.com` | Round-robin sender | 15 |

Live mode remains off until the user explicitly enables it and completes OAuth for each account.

### 4.3 Data layer (SQLite)

Core tables (conceptual):

| Table | Purpose |
|---|---|
| `campaigns` | niche, location, status, active CSV, timestamps |
| `leads` | normalized business fields, classification, score, state |
| `research_reports` | evidence JSON, sources, confidence, gaps |
| `drafts` | subject, body, version hash, personalization rationale, voice flags |
| `approvals` | lead_id, draft_version_hash, decision, actor, timestamp |
| `send_attempts` | account used, provider response, outcome state |
| `suppression` | emails blocked (opt-out, bounce, exclude, already sent) |
| `daily_send_counters` | global + per-account counts by date |
| `audit_log` | append-only operational events |

**Lead states** follow the requirements state machine. Illegal transitions are rejected in code (e.g. no jump from `RESEARCH_COMPLETE` to `SENT`).

**Draft identity:**  
`draft_version_hash = hash(recipient_email + subject + body)`. Approval binds to that hash. Any edit creates a new version and clears approval.

### 4.4 CSV import and cleaning

**Input:** user-provided CSV from manual Maps/public research.

**Pipeline:**

1. Preserve original file bytes/path reference.  
2. Detect/map columns to internal schema.  
3. Normalize whitespace, emails, URLs.  
4. Flag missing/malformed fields.  
5. Deduplicate by email and by business+location heuristics.  
6. Export cleaned + rejected/excluded CSVs.  
7. Emit honest counts and exclusion reasons.  

Internal schema (minimum):

- `business_name`, `niche`, `email`, `website_url`, `location`, `service_area`, `phone`, `public_description`, `source`, `retrieved_date`, plus free-form `extra` JSON.

### 4.5 Email classification

Stages:

1. Syntax  
2. Normalization  
3. Disposable / role heuristics  
4. DNS / MX (and related signals where available)  
5. Classification label + explanation  

Labels: eligible-looking / invalid / risky / unknown / duplicate / incomplete.

**Rule:** never claim inbox existence from these checks alone.

### 4.6 Research and website analysis

**Browser engine:** Playwright (day one; globally installed on this Mac).

For each eligible lead with a website:

1. Open the site with Playwright (desktop + mobile viewport passes where useful).  
2. Capture homepage; limited follow to contact/about/booking/menu links when present.  
3. Extract observable signals (services, CTAs, mobile layout issues, contact paths, friction points, broken obvious flows).  
4. Ask local LLM only to **organize and score evidence**, not invent missing facts.  
5. Write research report with required sections from the spec (what they do, process, strengths, problems, opportunities, app justification, evidence, confidence, gaps, sources).  

If no website / fetch fails: record attempts, confidence, and mark for cautious wording or skip drafting until manual review per campaign rules. Rate-limit and timeout conservatively; never treat one failed load as proof of no website.

### 4.7 Lead scoring

Transparent factors only:

- Evidence of digital friction  
- Mobile/UX signals  
- Contact/booking friction  
- App appropriateness for business model  
- Research confidence  
- Contact channel quality  

Categories: High / Medium / Low / Exclude.

### 4.8 Drafting engine (human-voice critical path)

This is a core architectural component, not a prompt afterthought.

```
research_report + lead_context
        │
        ▼
┌───────────────────────┐
│ Prompt builder        │
│ - niche/location      │
│ - 1–2 evidence points │
│ - offer rules ($500)  │
│ - human-voice rules   │
└───────────┬───────────┘
            ▼
┌───────────────────────┐
│ Ollama local model    │
└───────────┬───────────┘
            ▼
┌───────────────────────┐
│ Deterministic validators
│ - claims ⊆ evidence   │
│ - banned AI phrases   │
│ - length / structure  │
│ - no guarantees       │
│ - professional tone   │
└───────────┬───────────┘
            ▼
     DRAFT_READY → approval queue
```

#### Human-voice + deliverability policy (non-negotiable)

**Goal:** The client must feel a real person researched them and wrote a short professional note — not that an AI sequence contacted them. Copy and structure are system-designed for professionalism and lower ignore/spam risk; **inbox placement is never guaranteed.**

**Architectural enforcements:**

1. **Evidence binding:** every concrete claim in the draft must map to a research evidence ID; otherwise draft fails validation.  
2. **One opportunity focus:** usually one primary observation; second only if clearly evidenced.  
3. **Banned / flagged patterns:** maintained list in `human_voice.py` (e.g. “I hope this email finds you well”, “leverage”, “cutting-edge”, “revolutionize”, “I was impressed by your…”, “as a leading…”, empty compliment openers, slogan stacks).  
4. **Style targets:** short paragraphs, natural contractions where appropriate, specific but calm language, low-pressure CTA, no fake prior relationship.  
5. **Variation:** prompt asks for natural variation; validator rejects near-duplicate bodies across recent drafts when similarity is extreme (best-effort).  
6. **Offer honesty:** include USD $500 website/app language only when scoring/qualification says the scoped package is plausible; otherwise softer “possible fit / scoped package” wording or flag for human rewrite.  
7. **Human is final tone filter:** Streamlit approval UI shows draft prominently with “Edit Draft” as a first-class action. Stiff-but-valid drafts are expected sometimes; editing is normal, not failure.  

**Deliverability-oriented composition (MVP):**

- Prefer plain-text or minimal formatting (no heavy HTML templates, no tracking pixels in MVP).  
- Subject: specific, calm, business-relevant; reject ALL CAPS / spammy urgency / “free$$$” patterns.  
- Body: few or no links (official site reference only when useful); no attachments; no link shorteners.  
- From name/address must match the selected authenticated Gmail account.  
- One clear, low-pressure ask.  
- Pace sends; respect 15/account and 30 global caps.  

**Outputs per lead:** research summary, personalization rationale, subject, body, eligibility/compliance flags, voice-validation result.

### 4.9 Approval subsystem

Dashboard shows at minimum:

- Business, niche, location  
- Recipient + verification limitations  
- Website URL  
- Research summary + evidence  
- Opportunities / proposed scope  
- Subject + full body  
- Why this email is relevant  
- Compliance / sending eligibility  
- Which Gmail account is next in round-robin (and remaining daily quota for that account / global)

Actions:

- Approve and Send (runs final safeguards first)  
- Edit Draft (invalidates prior approval)  
- Regenerate (keeps research; optional user instructions)  
- Reject  
- Skip Lead  
- View Research  
- Pause Campaign  

**Bulk approve:** disabled by default.

### 4.10 Sending subsystem

#### Modes

| Mode | Behavior |
|---|---|
| `mock` | Default for tests/dev; no network send |
| `live` | Gmail API send; requires explicit enable + valid OAuth |

#### Dual Gmail accounts

```
Final safeguards pass?
        │
        ▼
Select sender account (round-robin)
  - skip an account if its 15/day sub-cap is exhausted
  - if both exhausted → lock sending for the day
        │
        ▼
Ensure account not over per-account sub-cap (15)
Ensure global counter < 30
Ensure lead not suppressed / not already sent
Ensure approval hash matches current draft
        │
        ▼
Send via Gmail API
        │
        ├── success → SENT + increment counters + suppress email
        ├── hard failure → SEND_FAILED
        └── uncertain → SEND_STATUS_UNKNOWN (no auto-resend)
```

**Global rule:** **30/day** across both accounts and all campaigns (**15 + 15**).

**Round-robin rule:** alternate `gmail_a` ↔ `gmail_b` on successful assignment; if one account is capped or disconnected, use the other until it is also capped or restored.

**Anti-duplication:** same email address cannot be contacted again from either account once sent/suppressed.

**Pacing:** configurable delay between live sends.

### 4.11 Progress and audit

- Every stage writes structured status to DB + log.  
- Dashboard reads DB only (no cosmetic fake percentages).  
- Audit events cover import, research, draft versions, approvals, sends, pauses, errors.  
- Never log secrets.

### 4.12 Dashboard / UX

**MVP recommendation:** Streamlit on localhost for speed of delivery under $0.  
**Alternative:** FastAPI + simple HTML if more control is needed.

Must support campaign start/pause/resume/stop, approval queue, exports (CSV/JSON/Markdown), and actionable errors.

---

## 5. Campaign workflow (sequential by default)

1. User places niche/location CSV in incoming folder (manual Maps collection).  
2. User starts campaign for that niche/location.  
3. Import → clean → classify.  
4. Process eligible leads sequentially (or small safe concurrency for research only — never for send).  
5. Research → analyze → score.  
6. Draft with human-voice pipeline → `AWAITING_APPROVAL`.  
7. User reviews one draft at a time.  
8. On approve: final safeguards → send via selected Gmail account.  
9. Persist outcomes; continue until niche complete/paused/exhausted.  
10. Only then move to next niche unless user overrides.

Restarts must resume from last verified states without re-emailing sent leads.

---

## 6. Security architecture

| Secret | Storage |
|---|---|
| Gmail OAuth client secret | local env / OS keychain if used; never committed |
| OAuth refresh tokens (both accounts) | local protected store; gitignored |
| App passwords (if SMTP fallback) | env only; gitignored |
| DB with business emails | local disk; user access control |

Rules:

- Example config contains placeholders only.  
- Tests use fictional data + mock sender.  
- No real sends without explicit user authorization.  
- Approval records store content hashes and copies of approved subject/body for audit.  

---

## 7. Technology choices (locked for proposal)

| Layer | Choice | Rationale |
|---|---|---|
| Language | Python | Spec preference; strong for CSV/automation |
| DB | SQLite | Local, zero cost, sufficient scale |
| AI runtime | Ollama | Free local inference |
| AI model | ~7–8B instruct (final tag after bake-off) | Fits 16 GB Intel Mac |
| Browser research | Playwright | User-locked day-one; global Mac install |
| Dashboard MVP | Streamlit | User-approved; fast localhost UI |
| Email | Gmail API OAuth (both accounts) | Free within Google limits; round-robin 15+15 |
| Daily caps | 15/account, 30 global | User-locked |
| Test sender | Mock | Required for safe automated tests |
| Lead acquisition | Manual CSV | User-owned Maps collection |
| Draft UX | System-designed human-voice drafts | Professional, low-spam-pattern; human approves |

---

## 8. Explicit non-goals (current architecture)

- Automated Google Maps scraping or Maps Platform dependency  
- Paid email verification as a required stage  
- Paid LLM APIs as required runtime  
- Auto-send or default bulk approval  
- Guaranteeing inbox placement  
- Promising every prospect a full website + Android app for $500 without qualification  

---

## 9. Failure and recovery model

| Failure | System behavior |
|---|---|
| CSV mapping failure | Stop import for that file; show clear error; preserve prior data |
| Research fetch failure | Mark incomplete; do not invent; allow retry/skip |
| Draft fails voice/evidence validation | Stay out of send path; allow regenerate/edit |
| Approval missing / hash mismatch | Block send |
| Provider disconnect / rate limit | Pause sending; preserve drafts/approvals |
| Uncertain send outcome | `SEND_STATUS_UNKNOWN`; no automatic resend |
| Daily cap reached (per-account 15 or global 30) | Queue remains; send locked until next day counter reset |

---

## 10. Testing architecture

- Unit tests for cleaning, classification honesty, state transitions, approval hash binding, daily cap, dual-account suppression.  
- Integration tests with fictional CSVs + mock sender.  
- Voice validator tests with known bad AI-ish samples.  
- Live Gmail tests: manual, opt-in, never default CI.  

Definition of done remains the acceptance list in `PROJECT_REQUIREMENTS.md` §22.

---

## 11. Documentation deliverables (mapped)

| File | Status |
|---|---|
| `PROJECT_REQUIREMENTS.md` | Exists (authoritative) |
| `FEASIBILITY_REPORT.md` | Written this phase |
| `ARCHITECTURE.md` | This document |
| `README.md` | Not yet |
| `EMAIL_COMPLIANCE.md` | Not yet |
| `ROADMAP.md` | Not yet |
| `config.example.env` | Not yet |
| Source / tests / samples | Not yet (awaiting architecture acceptance) |

---

## 12. Decisions locked by user (2026-10-23)

| Topic | Decision |
|---|---|
| Sender policy | Round-robin |
| Volume | 15 per Gmail account / 30 global per day |
| Dashboard | Streamlit |
| Research | Playwright from day one |
| Email copy / UI | System designs professional human-voice drafts; Streamlit approval/edit |

## 12b. Still open

1. Exact Ollama model tag after install + bake-off.  
2. First niche/location for fictional end-to-end dry run.  

---

## 13. Architecture acceptance statement

This architecture satisfies the requirements’ local-first, $0, human-approval, truthful-progress, and evidence-based personalization constraints, with these locked product inputs:

- Leads arrive as **user-supplied CSVs** (manual Maps collection).  
- Senders are **`hassansfida@gmail.com`** and **`hassans.official1@gmail.com`** in **round-robin at 15+15 (30/day)** (integration unverified until tested).  
- Research uses **Playwright from day one**.  
- UI is **Streamlit**.  
- Draft quality bar is **professional human-written feel** with deliverability-oriented composition, enforced by evidence binding, validators, and mandatory human approval/edit. **No claim that Gmail will never spam-folder a message.**  

**Next step on your go-ahead:** implement Phase 1 (project skeleton, config/secrets pattern, CSV pipeline, SQLite state, fictional samples) — still with mock send only.
