# PROJECT_REQUIREMENTS.md
## AI-Powered Business Research, Lead Qualification, and Human-Approved Cold Outreach System

**Document status:** Master specification  
**Authority:** This is the single authoritative requirements document for planning and implementing the project.  
**Primary operating environment:** User's Mac, with local-first processing wherever practical.  
**System infrastructure budget:** USD $0.  
**Proposed client offer:** USD $500 for a clearly scoped website revamp and Android mobile app solution, subject to feasibility and scope qualification.  
**Default outbound email cap:** 25 emails per day across all campaigns and sending processes.  
**Mandatory rule:** No email may be sent without explicit human approval of that exact recipient and exact message content.

---

## 1. Project Objective

Build a local-first, cost-conscious, AI-assisted system that helps identify suitable business prospects, clean and qualify lead data, research each business's public digital presence, identify evidence-based website or mobile-app opportunities, and prepare highly personalized professional cold emails.

The system should support any user-selected business niche and geographic market. Examples include restaurants and pet shops in Sweden, property-management companies in the UK, real-estate businesses in Dubai, healthcare businesses in the US, and other niches or locations supplied by the user.

The system should automate research and preparation while keeping the user in control of outbound communication:

**Automation prepares. The system explains. The user approves. Only then may the system send.**

The system must be transparent about progress, uncertainty, limitations, costs, and failures. It must not fabricate business facts, email verification results, research findings, progress values, test results, or service capabilities.

## 2. Budget and Operating Constraints

- The total budget for building and operating the outreach system is strictly **USD $0**.
- Prioritize open-source software, local tools, free integrations, and genuinely free service tiers.
- Do not assume access to paid APIs, subscriptions, outreach platforms, lead databases, hosting, AI services, or services requiring a credit card.
- Identify any free-tier limits, commercial-use restrictions, rate limits, setup requirements, local hardware needs, and possible future costs.
- Clearly distinguish free and open-source tools, limited free tiers, locally hosted tools, and paid services.
- If a requirement cannot realistically be met for free, explain why and offer the closest viable alternative. Do not claim a service is free without checking its current terms.
- The proposed **$500 USD client offer** is the intended commercial price, not the system's infrastructure budget. The system must help qualify the scope realistically and must not promise a complete custom website and production-ready app for every business at that price if the work is not feasible.

## 3. Feasibility Research Before Implementation

Before building the system, conduct feasibility research and present the recommended architecture, tool choices, dependencies, setup process, known limitations, and expected costs.

Research:

- Free and open-source MCP servers and integrations compatible with Cursor for email, CSV handling, research, and permitted browser automation.
- Locally hosted or genuinely free AI models suitable for business analysis and email drafting.
- Free and compliant ways to discover businesses and collect permitted public business information.
- Email validation methods and their limitations.
- Tools for website inspection, mobile responsiveness, accessibility, performance, and technical checks.
- Free or open-source deployment options and Android development tools.
- Current email-provider sending limits, authentication requirements, anti-spam policies, and applicable legal requirements.
- Local storage, logging, dashboard, and orchestration approaches suitable for the user's Mac.

For every recommended tool, identify whether it is genuinely free, subject to a quota, requires an account or credit card, uses local computing resources, has commercial-use restrictions, or may incur charges. Verify current conditions where possible.

Do not begin full implementation until the feasibility report and proposed architecture are available. Do not claim an integration works until it has been tested. Mark anything that cannot be verified in the current environment as unverified.

## 4. Local-First Architecture and Preferred Technologies

The system should run on the user's Mac wherever technically possible.

Preferred options:

- Cursor as the development environment.
- Python for CSV processing, orchestration, research, and automation.
- A local or genuinely free AI model for niche-aware research analysis and email drafting.
- Free, reputable MCP integrations when they provide real value.
- Browser automation and public website inspection tools only where permitted.
- SQLite or CSV/JSON/Markdown for local storage and export.
- Gmail API using authorized OAuth access, or another supported email API/SMTP method, for email sending.

Avoid unnecessary cloud dependencies, paid APIs, and services requiring paid subscriptions. Explain any cloud dependency that cannot be avoided.

Use maintainable modular code, clear configuration, robust error handling, structured logs, and tests. Keep credentials out of source code and version control.

## 5. CSV Import, Cleaning, Deduplication, and Email Classification

The system must import CSV files with varying column names and structures and identify fields where available, including:

- Business name and category/niche.
- Email address.
- Website URL.
- Geographic location and service area.
- Phone number.
- Public business description.
- Other useful publicly available business fields.

The pipeline must:

1. Preserve the original imported file and its data.
2. Normalize column names and clean whitespace, casing, and common formatting inconsistencies.
3. Map different column names to a consistent internal schema.
4. Detect missing or malformed fields.
5. Normalize email addresses and website URLs where appropriate.
6. Remove or flag duplicate businesses and duplicate email addresses.
7. Check email syntax.
8. Check domain and DNS/mail-server signals where available.
9. Use legitimate verification methods to assess whether an address is likely to be deliverable.
10. Flag potentially disposable, suspicious, role-based, or otherwise risky addresses where appropriate.
11. Separate records into clearly explained categories:
   - Valid-looking and eligible for further checks.
   - Invalid or malformed.
   - Potentially undeliverable or risky.
   - Unknown or unverifiable.
   - Duplicate.
   - Incomplete or missing required information.
12. Export cleaned data and classification results to separate CSV files or clearly labeled outputs.
13. Report imported, retained, excluded, duplicated, invalid, unknown, and processed record counts, with exclusion reasons.

The system must not claim that syntax checks, DNS checks, SMTP checks, or a third-party tool definitively proves that an inbox exists. Some mail providers deliberately prevent reliable mailbox verification. Unverified contacts must be clearly labeled, not silently treated as valid.

## 6. Niche-Based, Location-Based Sequential Campaign Processing

Support any user-specified niche and location. Example campaigns include:

- Restaurants in Sweden.
- Pet shops in Sweden.
- Property management companies in the United Kingdom.
- Real-estate businesses in Dubai.
- Healthcare businesses in the United States.
- Other user-selected niches and geographic markets.

Process one selected niche/location campaign at a time by default:

1. Import the selected niche's CSV.
2. Clean and classify its records.
3. Research eligible businesses.
4. Analyze their digital presence and potential needs.
5. Generate and validate personalized email drafts.
6. Add drafts to the human approval queue.
7. Send only individually approved drafts that pass final safeguards.
8. Record outcomes and update campaign progress.
9. Continue until the niche is completed, paused, or has no further eligible work.
10. Only then move to the next niche, unless the user explicitly changes this workflow.

Maintain persistent progress. Restarting Cursor, the application, or the Mac must not cause completed work to be unnecessarily repeated or previously contacted leads to be emailed again.

Provide a dashboard/status report for current niche, location, input files, pending leads, completed leads, exclusions, research status, drafts, approvals, sending outcomes, and the next planned action.

## 7. Business Discovery and Google Maps/Public Data Sources

The user intends to use Google Maps to discover potential business clients. Research lawful, permitted, and cost-effective approaches before implementing collection.

Evaluate:

- Manual Google Maps research.
- Official Google Maps Platform services and current free allowances, if any.
- OpenStreetMap and other appropriate open-data sources.
- Public business directories.
- Official business websites and contact pages.
- Other legitimate public sources that can enrich lead records.

Do not assume that Google Maps data can be scraped freely or without restrictions. Check the applicable terms, API conditions, rate limits, attribution requirements, and commercial-use rules. Do not bypass access controls, CAPTCHAs, or technical restrictions.

Collect only information that is publicly available and permitted for the chosen source and necessary for the business outreach purpose. Do not seek private information or infer sensitive personal attributes.

Where permitted, build a structured CSV output that can be imported into the cleaning pipeline. Capture relevant business data such as name, category, location, official website, public contact channel, public phone number, and source/provenance. Record the source and retrieval date where practical. Do not invent unavailable details.

## 8. Business Research and Website Analysis

For each eligible lead, research publicly available information to understand the business before drafting an email. Prioritize official business websites and reliable public sources.

Collect relevant information where available and permitted:

- Business name, niche, location, and service area.
- Public business description and services.
- Official website and relevant publicly accessible pages.
- Public contact details and business email.
- Relevant social media profiles.
- Booking, ordering, appointment, inquiry, or customer-service workflows.
- Existing mobile applications, if discoverable.
- Website usability and mobile responsiveness.
- Accessibility issues.
- Performance and observable technical issues.
- Weak or missing calls to action.
- Friction in booking, ordering, inquiries, or customer access.
- Other specific, observable opportunities to improve customer acquisition, retention, or operations.

For every business, produce a concise research report with:

1. What the business does.
2. Its apparent customer acquisition and service process, based on evidence.
3. What its current digital presence does well.
4. Specific, observable website or customer-experience problems, if any.
5. Potential website improvement opportunities.
6. Whether a dedicated Android app appears justified by the business model.
7. Relevant possible app or workflow features.
8. The evidence supporting each observation and recommendation.
9. Confidence level, information gaps, and limitations.
10. The source URLs or references used, where practical.

Do not treat a temporary website failure as proof that a business has no website. If no website is found, make reasonable checks and mark the conclusion and confidence level. Do not invent observations or claim that a business has a problem without evidence. If evidence is insufficient, flag the lead for manual review or use cautious wording.

Do not automatically recommend a mobile app to every business. Consider whether a responsive website, booking/order workflow, or progressive web app would be more suitable and cost-effective.

## 9. AI-Powered Business Understanding and Personalized Email Generation

This is a core requirement. The AI must understand each business's niche, location, services, likely customer needs, current digital presence, and evidence-backed improvement opportunities before writing an email.

Emails must not be generic templates that merely replace a business name.

Examples of niche-specific reasoning:

- **Restaurant in Sweden:** If evidence shows confusing menu navigation, poor mobile usability, or no convenient reservation flow, discuss the relevant opportunity.
- **Pet shop in Sweden:** If evidence supports it, discuss online product discovery, ordering, local delivery information, or customer-retention features rather than restaurant functionality.
- **Property management company in the UK:** If evidence supports it, discuss tenant service workflows, property inquiries, or making relevant information easier to access.
- **Business with no confirmed website:** Where reasonably verified, explain how an appropriate online presence might help customers discover services, make inquiries, book, or transact.

For every email draft, the system must:

1. Understand the business category, location, and context.
2. Identify one or two evidence-backed opportunities.
3. Explain why the opportunities may matter commercially, without guaranteeing results.
4. Propose a practical solution suited to the business.
5. Mention a website revamp and/or Android app only when relevant.
6. Explain the fixed USD $500 offer transparently when appropriate, subject to a realistic scope.
7. Use a professional, natural, concise, respectful tone.
8. Include a clear, low-pressure call to action.
9. Avoid generic mass-email language, fabricated observations, misleading claims, manipulative wording, and guarantees of revenue or conversion.
10. Make clear which research facts support personalization.
11. Flag uncertain claims or insufficient research for review rather than inventing details.

For each lead, prepare a research summary, personalization rationale/evidence, email subject, complete email body, and any relevant compliance or eligibility flags.

## 10. Human Approval Is Mandatory Before Sending

The system may automatically import and clean data, research businesses, analyze websites, score leads, and prepare email drafts. **It must never send any email unless the user explicitly approves that specific recipient and exact message content.**

Required workflow:

1. Complete lead processing and research.
2. Generate a personalized email draft.
3. Validate the draft against the available research and applicable configured rules.
4. Place the draft in an approval queue.
5. Display the recipient, subject, full body, business research summary, evidence, proposed solution, personalization rationale, and sending eligibility.
6. Wait for an explicit user decision.
7. After approval, re-check final sending safeguards and send only if all checks pass.
8. Record the outcome and update campaign state.

If the user rejects a draft, it must not be sent. The user may edit it, regenerate it, skip the lead, or exclude the lead.

If any approved draft's recipient, subject, or body changes, its approval must be invalidated and fresh approval required. Approval must be tied to the exact recipient and exact message version that will be sent. Bulk approval must be disabled by default.

### Approval interface

Provide a local dashboard or interface with:

- Business name, niche, and location.
- Recipient email and verification status/limitations.
- Official website URL, if available.
- Research summary and evidence.
- Identified problems/opportunities.
- Recommended website/app improvements.
- Subject and complete email body.
- Reason the email is relevant to the business.
- Compliance and sending eligibility status.

Required actions:

- **Approve and Send:** Approve that exact draft and attempt sending only after final safeguards pass.
- **Edit Draft:** Edit subject/body; require approval of the revised version.
- **Regenerate:** Create a new draft using existing research and additional user instructions.
- **Reject:** Prevent the current draft from being sent.
- **Skip Lead:** Leave it uncontacted and continue to the next eligible lead.
- **View Research:** Inspect underlying evidence and analysis.
- **Pause Campaign:** Stop further processing or sending while preserving progress.

If sending status is uncertain, clearly label it and do not blindly retry; doing so could cause duplicate messages.

## 11. Live Progress Tracking and Status Updates at Every Stage

Live progress visibility is a core feature, not a later enhancement. The user must always be able to understand what the system is doing, what has finished, what remains, and what will happen next.

Display status in the dashboard and timestamped logs. For each stage, show where practical:

- Current stage and action.
- Active niche and location.
- Current business/lead being processed.
- Total records, completed records, and remaining records.
- Successful operations.
- Skipped or excluded records.
- Warnings and errors.
- Start time and elapsed time.
- Next planned action.
- Overall state: processing, paused, waiting for approval, completed, or failed.

Example only (actual values must come from live system state):

**Campaign: Restaurants — Sweden**

| Stage | Example status | Example progress |
|---|---|---:|
| CSV import | Completed | 500/500 |
| Data cleaning | Completed | 462 retained |
| Email classification | Completed | 310 eligible for further checks |
| Business research | In progress | 48/310 |
| Website analysis | Pending | Waiting for research |
| Email drafting | Pending | Waiting for analysis |
| Human approval | Pending | No drafts ready |
| Email sending | Locked | Approval required |

Display understandable status messages such as:

- "Importing the selected CSV file."
- "Cleaning and standardizing business records."
- "Removing duplicate email addresses."
- "Checking email format and available verification signals."
- "Researching the official website of the current business."
- "Analyzing mobile responsiveness and customer inquiry options."
- "Identifying business-specific improvement opportunities."
- "Generating a personalized email for this business."
- "Checking the draft against available research."
- "Email prepared successfully. Waiting for your approval."
- "Email approved. Checking final sending eligibility."
- "Sending the approved email through the connected provider."
- "Provider accepted the message; delivery confirmation is unavailable."
- "Campaign paused. Progress has been saved."

Progress must reflect actual persisted processing state. Do not fabricate percentages, counts, completion claims, or elapsed estimates. Distinguish confirmed completion from pending work, estimates, and failures. If a tool or API is unavailable, show the affected stage and explain the issue rather than silently skipping it.

## 12. Persistent State Machine and Workflow Integrity

Implement a persistent state machine so each lead has a clear processing state and only valid transitions are allowed.

Suggested states:

- `IMPORTED`
- `CLEANING`
- `CLEANED`
- `VALIDATION_PENDING`
- `VALIDATION_COMPLETE`
- `RESEARCH_PENDING`
- `RESEARCHING`
- `RESEARCH_COMPLETE`
- `ANALYSIS_COMPLETE`
- `DRAFTING`
- `DRAFT_READY`
- `AWAITING_APPROVAL`
- `REJECTED`
- `APPROVED`
- `SENDING`
- `SENT`
- `SEND_FAILED`
- `SEND_STATUS_UNKNOWN`
- `SKIPPED`
- `EXCLUDED`

Store timestamps, errors, evidence references, draft versions, approval records, and processing results as appropriate.

A lead must never move directly from research to sending. It must have a prepared draft, explicit approval of the exact recipient and content, and successful final sending eligibility checks.

Rejected, excluded, opted-out, duplicate, or otherwise ineligible contacts must remain blocked from sending.

Use a local database such as SQLite to persist state across application and Mac restarts. The daily sending counter and send history must also persist and must not reset when the user restarts the application or switches campaigns.

## 13. Email Account Integration and Credential Security

Research supported ways to connect the user's email account to Cursor/the local system, including:

- Gmail API with authorized OAuth access.
- Other providers' supported APIs or SMTP configuration.
- Free MCP servers that can safely interact with email accounts.
- Local scripts using an authorized provider integration.

Recommend the most secure and practical option based on verified capabilities and current provider requirements.

Provide setup instructions covering authorization, permissions, credential storage, revocation, and testing. Never request that the user put email passwords, OAuth secrets, or API keys directly in source code or commit them to a repository. Use an appropriate secure local credential store or protected environment configuration. Include an example configuration file without real secrets.

Do not connect an account or send real email without the user's explicit authorization. Use a mock sender for automated tests and keep live tests separate.

## 14. Sending Limits, Deliverability, and Compliance

Default limit: **25 emails per day globally across all campaigns and sending processes**. The user's longer-term interest in 30–50 emails/day is not permission to raise the default automatically. Any increase must be configurable and must be justified by the provider's rules, legal requirements, list quality, and observed results.

Research current limits and policies for the chosen provider. A provider's maximum sending quota is not automatically a safe or permitted cold-outreach limit. No daily number guarantees inbox placement or spam avoidance.

Implement:

- Configurable daily sending cap.
- One global counter shared across campaigns and processes.
- Persistent sending history and duplicate prevention.
- Conservative pacing between messages.
- Safe handling of temporary technical failures.
- Suppression of bounced, opted-out, excluded, or otherwise ineligible contacts.
- Delivery/failure tracking where the provider supports it.
- Automatic pause when provider warnings, complaint signals, or concerning bounce levels indicate a problem.
- Human review for uncertain contacts.
- A global stop/pause control.

Start conservatively. Increase volume only where provider rules, applicable law, recipient expectations, list quality, sender authentication/reputation, and observed outcomes support it.

The system must not promise that 25, 30, or 50 emails/day will avoid spam filters. Deliverability depends on sender reputation, authentication, list quality, content, recipient engagement, and other factors.

Investigate and document applicable privacy, direct-marketing, and anti-spam rules in each target market, including relevant Swedish and EU requirements when applicable. Do not assume that business contact data is automatically exempt from privacy or marketing rules. Include any necessary sender identification, lawful contact basis, opt-out method, suppression list, and recordkeeping required for the applicable campaign. Where legality or eligibility is uncertain, flag the campaign and do not send until resolved.

## 15. Lead Scoring and Commercial Qualification

Prioritize prospects with a genuine, evidence-backed opportunity for digital improvement.

Use transparent scoring factors such as:

- Evidence of website or customer-experience problems.
- Quality of the mobile experience.
- Friction in booking, ordering, or customer inquiries.
- Whether a dedicated app is appropriate for the business model.
- Potential relevance/value of the proposed improvements.
- Confidence in research.
- Availability of a legitimate business contact channel.

Do not invent revenue estimates, unsupported financial-condition assumptions, or use sensitive personal information to score prospects.

Recommended categories:

- **High priority:** Clear, evidence-backed opportunity.
- **Medium priority:** Plausible opportunity requiring further review.
- **Low priority:** Limited evidence or weak fit.
- **Exclude:** Invalid contact, opt-out, duplicate, legal restriction, or unsuitable prospect.

The objective is relevant, high-quality outreach rather than maximizing email volume.

## 16. USD $500 Website Revamp and Android App Offer

The user's intended commercial offer is USD $500 for a website revamp and Android mobile app solution. This is a proposed offer, not a promise that every prospect's full requirements can be delivered at that price.

For each qualified prospect, recommend a realistic package and identify:

- Website pages and functionality.
- Android app features and platform compatibility.
- Backend/API requirements.
- Third-party integrations.
- Hosting and deployment requirements.
- Data storage, security, and privacy requirements.
- Maintenance and support expectations.
- Any recurring third-party charges.
- Explicit inclusions, exclusions, and scope assumptions.

Prefer simple, reusable, open-source solutions and free deployment options where appropriate. Research current free hosting/deployment tiers, their limits, commercial-use restrictions, and whether they can support the proposed project.

Do not promise unlimited or permanent free hosting, free third-party services without verification, or free Google Play publishing without checking current registration, testing, and publishing requirements and fees.

If a complete custom website revamp plus production-ready Android app is not realistically deliverable for $500, recommend a smaller, clearly defined package rather than making an unrealistic promise. The system's outreach must accurately represent the proposed scope and avoid guaranteed business outcomes.

## 17. Dashboard and Campaign Management

Provide a simple local dashboard or interface displaying:

- Imported CSV files and data quality summary.
- Active niche and geographic market.
- Total, cleaned, eligible, excluded, duplicate, and unverified leads.
- Research and website-analysis status.
- Lead priority and evidence confidence.
- Drafted, awaiting approval, approved, rejected, and sent email counts.
- Daily sending count and remaining configured allowance.
- Bounces, replies, opt-outs, errors, and delivery status where supported.
- Follow-up eligibility and scheduling, only when legally and operationally appropriate.
- Campaign completion status and next action.
- Detailed progress logs and audit history.

Provide campaign controls to start, pause, resume, stop, cancel an individual lead, retry a failed research/drafting task, review pending approvals, and export results.

Pausing must preserve progress. Resuming must continue from the last verified state. Retrying must not cause a duplicate email or repeat a non-idempotent action without checking its previous outcome.

Export campaign results and research reports to CSV, JSON, or Markdown. Keep the interface understandable and show actionable errors rather than requiring the user to inspect source code for routine status information.

## 18. Failure Handling and Recovery

When a stage fails, the system must:

1. Record the failure and timestamp.
2. Show a clear, understandable explanation and the affected lead/stage.
3. Preserve previously completed work.
4. Prevent invalid state transitions.
5. Offer a safe retry when appropriate.
6. Continue with other eligible leads only if safe and consistent with sequential campaign rules.
7. Never send an unapproved email as a fallback.

If research is incomplete, flag missing evidence rather than inventing business details. If an email address cannot be verified reliably, display uncertainty and apply configured eligibility rules. If the provider is disconnected, paused, rate-limited, or reporting errors, stop sending and preserve drafts and approvals.

For any uncertain send outcome, mark `SEND_STATUS_UNKNOWN`, investigate through provider records if possible, and do not automatically resend until duplicate risk is resolved.

## 19. Audit Logging and Privacy

Maintain a local audit trail for:

- CSV imports and cleaning outcomes.
- Research sources and analysis results.
- Draft generation and revisions.
- Approval and rejection decisions.
- Any changes after draft generation.
- Sending attempts and provider responses.
- Daily limit enforcement.
- Campaign pauses, resumes, and stops.
- Errors and recovery actions.

Approval records must identify the exact recipient and exact approved message version. Store only data needed for the workflow, apply appropriate local access controls, and document data retention/deletion procedures.

Never log passwords, OAuth tokens, API keys, or other authentication secrets. Allow relevant campaign logs to be inspected/exported without exposing credentials. Respect applicable privacy obligations and honor opt-outs in all future campaigns.

## 20. Implementation Plan

After feasibility research and approval of the architecture, implement in small, testable stages:

1. Project structure, configuration, and secure credential strategy.
2. CSV import, normalization, deduplication, validation, and export.
3. Local database and persistent campaign state machine.
4. Live progress reporting and structured logging.
5. Business discovery/source adapters, subject to source terms.
6. Business research and website analysis.
7. Evidence-based lead scoring and niche-specific recommendations.
8. AI-powered personalized email generation.
9. Draft validation and human approval dashboard.
10. Secure email integration.
11. Sending safeguards, global daily limits, and send-state reconciliation.
12. Campaign dashboard, audit history, and reporting.
13. Automated tests and end-to-end mock workflow.
14. Documentation and final verification.

Do not begin by implementing a complex system based on unverified assumptions. First research the tools, verify restrictions, propose the architecture, and identify unresolved decisions. Then build the smallest reliable end-to-end workflow and expand incrementally.

## 21. Required Deliverables

Create these files in the project directory:

- `PROJECT_REQUIREMENTS.md` — this master specification.
- `README.md` — installation, setup, and usage.
- `ARCHITECTURE.md` — architecture and component decisions.
- `FEASIBILITY_REPORT.md` — free-tool research, restrictions, limitations, and cost analysis.
- `EMAIL_COMPLIANCE.md` — sending policies, privacy considerations, and operational safeguards.
- `ROADMAP.md` — implementation phases and outstanding work.
- `config.example.env` — example configuration with no real credentials.
- Working source code for implemented components.
- Automated tests for critical workflows.
- Fictional sample CSV files for demonstration and testing.
- Example personalized emails for multiple niches and locations.
- Instructions for connecting an authorized email account.
- Instructions for safely running the first campaign.

Use only fictional data in sample files. Keep secrets out of source control. Document dependencies, known limitations, external service requirements, and anything not yet verified.

## 22. Acceptance Tests and Definition of Done

Use fictional test data and a mock email sender for automated tests. Do not send real emails during testing unless the user separately and explicitly authorizes a live test.

The implementation is not complete until tests demonstrate that:

1. A CSV can be imported and processed.
2. Records with varying column names can be mapped correctly.
3. Duplicate businesses/emails are detected and handled.
4. Email classifications show limitations and do not falsely claim inbox existence.
5. Research reports include evidence and identify uncertainty.
6. Website issues are not invented, and a temporary error is not treated as proof of no website.
7. Drafts are personalized using available business research and niche/location context.
8. Progress updates appear as stages start, advance, finish, pause, and fail.
9. Progress values reflect actual state and are not fabricated.
10. Failures show useful messages and preserve completed work.
11. A completed draft enters the approval queue instead of being sent automatically.
12. Rejecting a draft prevents sending.
13. Editing recipient, subject, or body invalidates previous approval.
14. Only individually approved, eligible, unchanged drafts can reach the sending function.
15. Approval records bind to the exact recipient and content version.
16. Pausing and resuming preserves progress.
17. Restarting the app preserves workflow state, send history, and the global daily counter.
18. Duplicate leads and previously sent emails are not contacted again accidentally.
19. Uncertain send outcomes do not trigger unsafe duplicate retries.
20. The global daily cap applies across campaigns and processes.
21. Opt-outs, excluded contacts, and other ineligible leads remain blocked.
22. Provider disconnection, rate limiting, or warnings stop sending safely.
23. The dashboard reflects actual database state.
24. Credentials and secrets do not appear in logs, example configuration, or source control.
25. Exported campaign results are usable and accurately reflect the system's records.
26. The mock end-to-end workflow works without sending real email.
27. Any untested live integration or external dependency is explicitly documented as unverified.

## 23. Instructions to the AI Coding Agent

Act as a senior software architect, AI automation engineer, deliverability specialist, and pragmatic business consultant.

- Read this entire document before proposing implementation changes.
- Treat this file as the single authoritative specification.
- Do not independently follow older or conflicting requirement documents.
- Preserve all requirements unless the user explicitly approves a change.
- Resolve overlapping instructions in favor of the stricter safety, privacy, approval, and transparency requirement.
- Research current, changing tool and provider constraints before relying on them.
- Do not claim functionality is implemented or tested unless evidence supports that claim.
- Clearly separate completed, partially implemented, unverified, and not-yet-implemented work.
- If a critical decision is unresolved, explain the options and ask a concise question rather than making an expensive or unsafe assumption.
- Do not start full implementation until the feasibility research and proposed architecture have been presented.
- After creating the feasibility report, implement incrementally and validate each stage.

**Final principle: automate the research and preparation; show live, truthful progress; require human approval for each exact email; and send only when all eligibility, compliance, and provider safeguards pass.**
