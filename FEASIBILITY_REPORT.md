# FEASIBILITY_REPORT.md

**Document status:** Feasibility research (pre-implementation)  
**Authority:** Subordinate to `PROJECT_REQUIREMENTS.md`  
**Date:** 2026-10-23  
**System infrastructure budget:** USD $0  
**Primary environment:** User's local Mac (Intel Core i7-9750H, 16 GB RAM, macOS 26.7.1)  
**Verified locally (this session):** Python 3.14.0, Node.js (nvm), Homebrew present; Ollama **not** installed yet  

---

## 1. Executive verdict

A local-first outreach system that cleans CSV leads, researches public websites, drafts personalized emails, requires per-message human approval, and sends through authorized Gmail accounts is **feasible at USD $0**.

The following user decisions remove the hardest $0 blockers from discovery and clarify sending:

| Decision | Impact |
|---|---|
| User will collect Google Maps leads **manually** and supply CSV files | Removes Maps scraping ToS risk and Maps Platform billing/card requirements from the system scope |
| Two personal Gmail accounts will send outreach | **Round-robin 15 + 15 = 30/day** (user-locked operating cap) |
| Drafts must feel **strictly human-written**, never “AI wrote this” | Feasible with local LLM + hard drafting rules + mandatory human approval; quality depends on research quality and model choice |

**Estimated coverage of the full specification at $0 with these decisions:** approximately **80–85%** of intended product value. Remaining gaps are mainly: definitive mailbox existence proof at scale, cloud-grade AI quality, and client-side $500 delivery economics (commercial offer, not outreach infrastructure).

**Implementation must not begin until this report and `ARCHITECTURE.md` are accepted.** This report does not claim any integration works until tested.

---

## 2. Confirmed operating constraints

### 2.1 Budget and tooling rules

- Total build + operate budget for the outreach system: **USD $0**.
- Prefer open-source, local tools, and genuinely free tiers.
- Do not assume paid APIs, paid outreach platforms, paid lead databases, paid hosting, or paid AI APIs.
- Do not require a credit card for system operation unless the user explicitly later authorizes it.
- Distinguish: genuinely free / open-source vs free tier with quota vs free tier requiring billing/card vs paid.

### 2.2 Sending and approval rules

- Spec default was 25/day; **user-approved operating cap: 30 emails/day globally**, split as **15 per Gmail account** via round-robin.
- **No email may be sent** without explicit human approval of that exact recipient and exact message content.
- Bulk approval is disabled by default.
- If recipient, subject, or body changes after approval, approval is invalidated.
- Cap increase rationale: dual-inbox load split (15 + 15) to reduce single-mailbox burn while staying far under personal Gmail’s ~500/day hard ceiling. This still does **not** guarantee inbox placement.

### 2.3 Lead source decision (locked)

- **Google Maps discovery is out of system automation scope.**
- The user will research Maps (and any other permitted sources) manually and provide CSV files.
- The system must still record provenance fields when the CSV includes them (e.g. `source`, `retrieved_date`) but will not scrape Maps or call Google Maps Platform APIs in the $0 architecture.

### 2.4 Authorized sending mailboxes (user-declared)

The user intends the system to send from:

1. `hassansfida@gmail.com`
2. `hassans.official1@gmail.com`

**Security note:** These are account identifiers only. Passwords, app passwords, OAuth client secrets, and refresh tokens must never be stored in source code, git, or example configs. OAuth credentials belong in a local protected store / `.env` excluded from version control.

**Unverified until tested:** OAuth setup for both accounts, Gmail API send success, daily quota behavior under dual-account use, and deliverability outcomes.

---

## 3. Hardware and local AI feasibility

### 3.1 Observed machine

| Item | Value | Implication |
|---|---|---|
| CPU | Intel Core i7-9750H @ 2.60 GHz | Local LLM inference works but is slower than Apple Silicon |
| RAM | 16 GB | Comfortable for ~7–8B quantized models; avoid large 30B+ models |
| Disk | ~20 GB free observed at assessment time | Models need several GB each; free space must be monitored before pulls |
| Python | 3.14.0 present | Suitable for orchestration, CSV, SQLite, research scripts |
| Ollama | Not installed | Required for free local drafting/analysis engine |

### 3.2 Recommended free local AI stack

| Component | Recommendation | Cost | Notes |
|---|---|---|---|
| Runtime | Ollama (local) | Free / open | Install required before AI stages |
| Primary model | Instruct model in ~7–8B class (e.g. Llama 3.1 8B, Qwen 2.5/3 7–8B, Mistral 7B — exact tag chosen at install time) | Free download | Best balance of quality vs Intel 16 GB limits |
| Fallback smaller model | ~3–4B instruct | Free | If 8B is too slow or memory-constrained |
| Cloud paid LLMs | Out of scope | Paid | Not assumed |

**Honest quality expectation:** Local 7–8B models can produce professional, niche-aware drafts **when** given strong evidence from research and strict anti-AI-voice rules. They will not match the best paid cloud models. Human approval remains mandatory and is part of quality control, not optional polish.

### 3.3 “Intelligent email engine” definition under $0

For this project, the best available $0 engine is:

1. Structured public-web research → evidence pack  
2. Local LLM constrained to that evidence  
3. Deterministic draft validators (length, claims, tone heuristics, banned phrases)  
4. Human edit/approve before send  

Cursor’s own chat models may assist during development or one-off drafting sessions, but the **system runtime** must not depend on paid cloud AI APIs.

---

## 4. Requirement-by-requirement feasibility

### 4.1 CSV import, cleaning, deduplication, email classification — FEASIBLE ($0)

**Approach:** Pure Python + pandas or csv stdlib + SQLite.

**Supported without paid services:**

- Column mapping / normalization  
- Deduplication (email + business identity heuristics)  
- Syntax validation  
- Domain DNS / MX checks  
- Disposable / role-based heuristics (local lists)  
- Classification into valid-looking / invalid / risky / unknown / duplicate / incomplete  

**Limitation (by design and by physics of email):**  
Syntax + MX does **not** prove an inbox exists. SMTP probing is incomplete, often blocked, and free third-party verifiers have tiny quotas. The system must label uncertainty honestly and never claim definitive mailbox proof from free local checks.

| Verification method | Cost | Proves inbox exists? | Recommendation |
|---|---|---|---|
| Syntax | Free local | No | Always use |
| DNS / MX | Free local | No (domain can receive) | Always use |
| Disposable/role lists | Free local | No | Always use |
| Free third-party APIs | Tiny free quotas; some need signup | Partial / unknown | Optional later; not required for MVP |
| Paid verifiers | Paid | Better, still imperfect | Out of $0 scope |

### 4.2 Niche/location sequential campaigns + persistent state — FEASIBLE ($0)

SQLite state machine with the states listed in the requirements is fully local and free. Progress must survive Cursor/app/Mac restarts. Global daily send counter must persist across campaigns and both Gmail accounts.

### 4.3 Business discovery / Google Maps — MANUAL (OUT OF AUTOMATION SCOPE)

| Option | Fits $0 + no card + ToS-safe? | Decision |
|---|---|---|
| Automated Google Maps scraping | No (ToS / fragile / non-compliant) | Rejected |
| Google Maps Platform Places API | Free monthly call caps exist, but billing account / card typically required | Rejected for $0 no-card architecture |
| OpenStreetMap / Overpass | Free / open, incomplete for many niches and emails | Optional enrichment later, not primary |
| **Manual Maps research → user-supplied CSV** | Yes | **Selected primary path** |

**CSV expectation (flexible columns):** business name, niche/category, email, website, location, phone, public description, source, retrieved date, and other useful public fields. The importer must tolerate varying headers.

### 4.4 Business research and website analysis — FEASIBLE WITH LIMITS ($0)

**User decision:** **Playwright from day one** (installed globally on this Mac).

**Feasible locally:**

- Fetch official website HTML (where publicly accessible), including JS-rendered pages via Playwright  
- Extract title, meta description, headings, contact/booking/order links, obvious CTAs  
- Mobile/responsiveness signals via Playwright viewport checks + page inspection  
- Detect missing contact paths, broken links (best-effort), thin content signals  
- Produce evidence-backed research reports with confidence and gaps  

**Limits:**

- Cannot treat temporary downtime as “no website”  
- Cannot invent problems  
- Cannot deeply audit accessibility to WCAG certification level for free without careful tooling and time  
- Social profile discovery is best-effort from site links only  
- App Store / Play presence discovery is best-effort public search; may be incomplete  

**Dependencies:** Internet access; global Playwright install on the Mac. No paid SEO/API required for MVP.

### 4.5 AI understanding + personalized email generation — FEASIBLE ($0) WITH HARD HUMAN-VOICE RULES

Core requirement: emails must **not** be generic templates with only the business name swapped.

**Additional hard product rule (user-mandated):**  
Generated emails must be professional and must **strictly feel human-written**. The recipient must not feel that “an AI is reaching out.”

#### Drafting rules the system must enforce

Expert drafting standard (system-owned; Streamlit approval UI presents these drafts for review):

1. Write from concrete evidence only (1–2 specific observations max).  
2. Short, natural sentences. Prefer plain business English over marketing copy.  
3. No hype, no guarantees (“increase revenue 3x”), no fake familiarity.  
4. No AI-tell phrases (examples to ban/detect): “I hope this email finds you well”, “leverage”, “cutting-edge”, “revolutionize”, “as an AI”, “I came across your business and was impressed”, excessive em dashes, stacked buzzwords, perfect parallel slogan-like bullets in the body.  
5. Sound like a competent freelancer/consultant who looked at their site carefully — because that is the intended truth.  
6. Mention the USD $500 offer only when scope is plausibly realistic; otherwise recommend a narrower package or flag for manual rewrite.  
7. Always attach research summary + evidence + personalization rationale to the approval UI so the human can catch anything that still sounds synthetic.  
8. Prefer slightly imperfect natural variation across leads (different openings, different evidence order) without random nonsense.

#### Deliverability-oriented composition (best practice, not a guarantee)

Designed to **reduce** spam-filter and ignore risk; **cannot eliminate** it:

| Do | Avoid |
|---|---|
| Plain-text lean body (or very light formatting) | Heavy HTML, colors, tracking pixels in MVP |
| Specific subject tied to their business/site | ALL CAPS, “$$$”, “Free”, “Act now”, spammy urgency |
| One clear ask (short reply / quick call) | Attachments, many links, link shorteners |
| Real sender identity matching the Gmail From | Misleading From names |
| Evidence-based personalization | Mass-mail merge language |
| Honest scope; easy opt-out when required | Guarantees, fake scarcity |

**Honest limit:** Gmail filtering depends on domain/account reputation, list quality, recipient engagement, authentication, and content. Professional human-sounding copy helps; it does **not** make messages unspamable.

**Quality gate:** Even with good prompts, local models will occasionally sound stiff. Human approval + edit is the final quality layer and is mandatory.

### 4.6 Human approval dashboard — FEASIBLE ($0)

Local web UI (recommended: Streamlit or lightweight FastAPI + templates) on localhost. Required actions from the spec are all implementable without paid services.

### 4.7 Live progress + logging — FEASIBLE ($0)

SQLite + structured logs + dashboard reads from real state. Progress values must never be fabricated.

### 4.8 Email account integration — FEASIBLE ($0), UNVERIFIED UNTIL TESTED

| Method | Cost | Fit | Notes |
|---|---|---|---|
| **Gmail API + OAuth (recommended)** | Free for standard personal use within Google limits | Best | Per-account OAuth; store tokens securely locally |
| Gmail SMTP + App Password | Free | Acceptable fallback | Requires 2FA + app password; still keep secrets out of git |
| Paid ESPs / Instantly / Smartlead | Paid | Out of scope | — |

**Provider limits (personal @gmail.com, publicly documented):** roughly **500 messages/recipients per rolling day** hard ceiling. The system’s **30/day global operating cap (15+15)** is well under that ceiling. Hitting Google’s hard limit is unlikely at 30/day; **spam/reputation risk remains real** for cold outreach regardless of volume. No template or cadence can promise Gmail will not filter messages.

**Dual-account design implications (user-locked):**

- Both accounts are first-class senders in config.  
- **Sender policy: round-robin** between `hassansfida@gmail.com` and `hassans.official1@gmail.com`.  
- **Per-account daily sub-cap: 15** each.  
- **Global daily cap: 30** (15 + 15).  
- Never send the same lead from both accounts.  
- Suppression lists and send history are global.  
- OAuth must be completed separately for each mailbox.  
- Live send tests require explicit user authorization.  
- Approval UI may still show which account will send next; manual override is optional later, not required for MVP.

**Gmail API / Google Cloud caveats (must document honestly):**

- Creating a Cloud project and OAuth client is free for this use case in normal personal/testing setups, but Google’s developer consoles and policies change.  
- OAuth verification is a concern if the app is used by many external users; for the account owner authorizing their own local app, testing/internal use is the intended path.  
- Exact Cloud console steps and any billing prompts must be verified during setup and recorded as verified/unverified.

### 4.9 Deliverability, compliance, 30/day (15+15) cap — PARTIALLY FEASIBLE ($0)

**Software can enforce:**

- Global persistent daily counter (30)  
- Per-account sub-caps (15 each) + round-robin assignment  
- Pacing between sends  
- Duplicate prevention  
- Suppression of bounced/opted-out/excluded contacts  
- Pause on provider errors  
- Approval binding to exact content  

**Software cannot guarantee:**

- Inbox placement  
- That 30/day is “safe” forever  
- Legal compliance in every target market without human judgment  

**Compliance stance:** Flag uncertain jurisdictions; require identifiable sender info and opt-out handling appropriate to the campaign; do not assume B2B data is automatically exempt from privacy/marketing rules (especially EU/Sweden-relevant campaigns). Full legal advice is outside the system; `EMAIL_COMPLIANCE.md` will capture operational safeguards (to be written later).

### 4.10 Lead scoring — FEASIBLE ($0)

Transparent heuristic + evidence confidence scoring is free and local. No invented revenue estimates.

### 4.11 USD $500 website + Android offer — COMMERCIAL CONSTRAINT (NOT INFRA COST)

The outreach system can help qualify scope and draft honest offers. It must not promise a full custom website + production Android app for every business at $500 if unrealistic.

**Client delivery costs that may break $0 for the client project (not for this outreach tool):** Google Play developer registration historically involves a fee; hosting free tiers have limits; maintenance is not free in time. These belong in offer qualification, not in outreach infrastructure budget.

### 4.12 Dashboard, failure handling, audit logging — FEASIBLE ($0)

All local. Secrets never logged.

---

## 5. Tool matrix (recommended vs rejected)

### 5.1 Recommended for $0 local architecture

| Need | Tool | Type | Limits / caveats |
|---|---|---|---|
| Dev environment | Cursor | Existing user tool | Not an outreach SaaS dependency |
| Language | Python 3 | Free / local | Already present |
| Storage | SQLite | Free / local | Sufficient for this scale |
| Data interchange | CSV / JSON / Markdown | Free | User-supplied Maps CSVs |
| Local LLM | Ollama + 7–8B instruct | Free / local | Install + disk/RAM limits |
| HTTP fetch | httpx / requests | Free / open | Respect robots/ToS; rate-limit |
| HTML parse | BeautifulSoup / selectolax | Free / open | — |
| Browser research | Playwright | Free / open | **Verified this Mac:** Node Playwright CLI v1.64.0 at `~/.nvm/.../bin/playwright`. Python `playwright` package will be added as a free project dependency at build time for the pipeline. |
| Dashboard | Streamlit | Free / local | User-approved MVP; localhost |
| Email send | Gmail API OAuth | Free within Google account limits | Dual account setup; unverified until tested |
| Tests | pytest + mock sender | Free | No real sends in CI/default tests |

### 5.2 Rejected or deferred under current $0 rules

| Tool / approach | Why |
|---|---|
| Google Maps scraping | ToS / non-compliant automation |
| Google Maps Platform as required dependency | Billing/card expectations conflict with no-card $0 rule |
| Paid cold-email platforms | Cost |
| Paid AI APIs as required runtime | Cost |
| Claiming SMTP verification as proof of inbox | Technically unreliable; violates honesty rules |
| Auto-send without approval | Explicitly forbidden |

---

## 6. Free-tier and policy risks (honest)

| Area | Risk | Mitigation |
|---|---|---|
| Cold email to Gmail-era filters | Spam folder / domain or account reputation damage | Low volume, high personalization, human tone, clean lists, stop on bounces/complaints |
| Dual personal Gmail sending | Both accounts can be limited if Google detects abuse patterns | Shared suppression, conservative pacing, exact-content approval, optional per-account sub-caps |
| Local model hallucinations | Fabricated “website problems” | Evidence-only prompting; validators; human approval; reject drafts that cite missing evidence |
| Website fetch blocks | Some sites block bots | Retry/backoff; mark research incomplete; manual review flag |
| Disk/RAM on Intel Mac | Slow or failed model loads | Smaller model fallback; monitor free disk before `ollama pull` |
| Legal variance by country | EU/UK/US/UAE rules differ | Campaign-level compliance flags; do not send when uncertain |
| Google OAuth / API policy changes | Setup friction | Document verified steps at setup time; keep SMTP app-password fallback |

---

## 7. What “done enough” looks like without full build

This feasibility phase is complete when:

1. This report and `ARCHITECTURE.md` exist and match `PROJECT_REQUIREMENTS.md`.  
2. Manual CSV supply is accepted as the lead-discovery method.  
3. Dual Gmail senders are recorded as intended integration targets (not yet connected).  
4. Human-voice drafting is specified as a non-negotiable quality requirement.  
5. Unverified items are explicitly marked unverified.  

Full implementation remains gated on user approval of architecture.

---

## 8. Recommended implementation order (after approval)

Aligned with requirements §20, smallest reliable path first:

1. Project structure, config, secret strategy  
2. CSV import/clean/classify + sample fictional CSVs  
3. SQLite state machine  
4. Progress logging  
5. Website research (given URL in CSV)  
6. Scoring  
7. Local AI drafting with human-voice constraints + validators  
8. Approval dashboard  
9. Gmail OAuth for both accounts + mock sender tests  
10. Send safeguards + 30/day global cap (15+15 round-robin)  
11. Campaign dashboard / audit / exports  
12. Tests + docs (`README`, compliance, roadmap, example env)

---

## 9. Decisions locked by user (2026-10-23)

| Decision | Choice |
|---|---|
| Sender policy | **Round-robin** across both Gmail accounts |
| Daily volume | **15 per account**, **30 global** |
| Dashboard | **Streamlit** MVP |
| Research tooling | **Playwright from day one** (global install on this Mac) |
| Email copy / template UX | System-designed professional human-voice drafts + Streamlit approval/edit UI |

## 9b. Still open (can resolve during early build)

1. **Exact local model tag** after Ollama install and a short quality bake-off on sample drafts.  
2. **Target markets for first live campaign** (affects compliance wording and opt-out language).  

---

## 10. Bottom line

| Question | Answer |
|---|---|
| Can we advance this project at $0 on this Mac? | **Yes.** |
| Can Maps lead gen stay manual via user CSV? | **Yes — preferred and selected.** |
| Can both listed Gmail accounts be senders? | **Yes in design; round-robin 15+15; unverified until OAuth/send tests.** |
| Can drafts feel human, not AI / not spammy? | **Yes as the design bar**, via evidence-bound prompting, deliverability-oriented composition, validators, and mandatory human approval/edit. **No guarantee** Gmail will never filter a message. |
| Should full build start now? | **Architecture decisions above are locked.** Implementation may begin on your go-ahead. |

**Final principle preserved:** automate research and preparation; show truthful progress; require human approval of each exact email; send only when eligibility, compliance, and provider safeguards pass — with copy that reads like a careful human wrote it.
