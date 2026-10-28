# As The Fur Flies — inventory & sitemap

**Nature:** Luxury dog + cat day spa, Fear Free certified team, **two Austin locations** (North + South). North hosts the exclusive cat suite + ACC student grooms.  
**Live:** https://www.asthefurfliesaustin.com/ (Squarespace)  
**Pitch angle:** Unified booking so clients stop choosing the wrong salon / no-show fees; clearer dual-location + feline IA.  
**Audited:** 2026-10-28 (WebFetch + browser CDP nav/logo/social extraction)

## Brand assets (live)

| Asset | Source URL | Local demo path |
|---|---|---|
| Logo | `https://images.squarespace-cdn.com/content/v1/5b1d303f506fbedd0b51580c/6b3e69ad-91a2-435c-bbf9-985b848d45dd/As+the+Fur+Flies+Logo.jpg` | `/public/logo.jpg` |
| Favicon | `https://images.squarespace-cdn.com/content/v1/5b1d303f506fbedd0b51580c/10d034b2-bb26-4a6f-9053-06884abf02e7/favicon.ico` | `/public/favicon.ico` |
| Fear Free badge | `…/New+Fear+Free+logo.jpg` | `/public/fear-free.jpg` |

**Logo identity (sampled from Squarespace WebP logo):** vivid orchid/violet wordmark (`#8400d8` family) on soft lavender field with near-black ink — luxury spa, **not** forest Evergreen.  
**Tokens used in demo:** `--bg #f7f1f6`, `--paper #fffafc`, `--ink #160f18`, `--brand #5c1f7a`, `--orchid #9b4db0`, `--accent #c4a06a` (champagne gold), `--muted #6a5568`.

## Social (footer on live)

- Instagram: https://instagram.com/asthefurfliesaustin  
- Facebook: https://www.facebook.com/asthefurfliesaustin  
- Also present on LinkedIn / Bluesky (secondary; primary CTAs are IG + FB)

## Live inventory

| Live URL / item | Type | Keep in redesign? |
|---|---|---|
| `/` Homepage luxury pitch + Fear Free claim | page | yes → `/` |
| `/schedule-appointment-copy` North booking + wrong-salon 100% fee notice | form | yes → `/book?salon=north` |
| `/schedule-appointment-ready-1` South booking + same fee notice | form | yes → `/book?salon=south` |
| `/cat-care` Cat suite, Kitty Cat Club, feline price menu, North afternoon window | page | yes → `/cats` |
| `/new-page-1` ACC student grooms 50% off (North evenings/Sundays) | form | yes → `/student` |
| `/about-us-ready` Meet the team (Nancy + North/South groomers, Fear Free) | page | yes → `/team` |
| `/faq-ready` Policies & FAQs (rabies, cancel, late, card on file, mats, puppies, cats, pickup) | page | yes → `/faq` |
| `/pricing-and-services` Bath / Bath & Tidy / Full Groom + add-ons; quote-at-drop-off | page | yes → `/pricing` (+ dog overview on `/services`) |
| `/testimonials-ready` Named client quotes | page | yes → `/testimonials` |
| `/contact-us-ready` **Gallery** (misnamed URL) | page | yes → `/gallery` |
| `/articles` Blog index (4 educational posts) | page | **dropped** — thin Squarespace blog; grooming education folded into FAQ; no individual article routes in demo |
| `/careers` Culture, benefits, email nancy@… | page | yes → `/careers` |
| `/privacy` Privacy Notice (SMS opt-in heavy) | page | yes → `/privacy` (summarized for demo) |
| `/terms-and-conditions` Terms | page | yes → `/terms` (summarized for demo) |
| Footer contact phones/emails per salon | CTA | yes → `/contact` + `/locations` + book |
| Accessibility (accessiBe widget only; no statement page) | widget | yes → `/accessibility` (new trust page; live has no dedicated URL) |
| Cart / shop chrome | Squarespace noise | **dropped** — no active retail storefront content worth porting |

**Dropped with reason:** Articles blog (thin; content themes covered in FAQ); Squarespace cart chrome (no meaningful shop).

## Proposed sitemap

- `/` Home — dual-salon luxury spa composition  
- `/services` Dog packages overview + add-ons  
- `/cats` Cat suite, Kitty Cat Club, feline menu  
- `/pricing` Starting prices & add-ons (final at drop-off)  
- `/locations` North + South details / hours / contacts / maps  
- `/team` Meet the team  
- `/gallery` Portfolio  
- `/testimonials` Happy clients  
- `/faq` Policies & FAQs  
- `/book` Salon picker + request form (`?salon=north|south`)  
- `/student` ACC student groom requests (North)  
- `/contact`  
- `/careers`  
- `/privacy` `/terms` `/accessibility`  

## Brand direction

Orchid plum + lavender mist + champagne gold (from logo violet), **not** Evergreen forest. Display: Instrument Serif; body: DM Sans. Emphasize dual-location clarity, Fear Free, and North cat suite.
