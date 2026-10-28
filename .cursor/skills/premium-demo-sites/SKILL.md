---
name: premium-demo-sites
description: >-
  Build and redesign cold-outreach demo websites with a premium 2026 look,
  mobile-first heroes, and business-nature-specific UX. Use when creating or
  redesigning demo sites under pet-grooming-demo-sites (or similar), Next.js
  landing pages for outreach prospects, Christmas/seasonal subpages, or when
  the user asks for a redesign demo, premium site, or client pitch site.
---

# Premium outreach demo sites

Every new redesign demo must feel like a **2026 boutique brand site**, not a
template, Wix clone, or generic AI landing page. Match the **business nature**
(Fear Free groomer ≠ tattoo shop ≠ cafe ≠ plumber).

## Hard composition rules

1. **One composition** in the first viewport — not a dashboard.
2. **Brand first** — business name is hero-level; headline must not overpower it.
3. **Brand test** — if removing the nav makes the first screen anonymous, branding is too weak.
4. **Typography** — expressive fonts; never Inter / Roboto / Arial / system-only stacks.
5. **Atmosphere** — gradients, imagery, or subtle texture; never flat single-color pages.
6. **Full-bleed hero** — edge-to-edge image/video plane. No inset hero cards, side panels, rounded media cards, tiled collages, or floating image blocks unless the client’s existing system requires it.
7. **Hero budget** — first viewport: brand + one headline + one short support line + one CTA group + one dominant image. No stats, schedules, address blocks, promos, or secondary marketing in the hero.
8. **No hero overlays** — no badges, chips, stickers, or callout boxes on hero media.
9. **Cards** — default none. Never in the hero. Use cards only when they wrap a real interaction.
10. **One job per section** — one purpose, one headline, usually one short lead.
11. **Real visual anchor** — show the craft, place, or product; decorative gradients alone do not count.
12. **Motion** — ship 2–3 intentional motions (reveal, subtle ken burns, CTA pulse). Respect `prefers-reduced-motion`.
13. **Avoid AI-default looks** — purple-on-white / indigo gradients; warm cream + terracotta serif; broadsheet hairline newspaper layouts; dark-mode-by-default; glow stacks; rounded-full pill clusters; emoji decoration.

## Business-nature first

Before pixels, decide:

| Ask | Output |
|---|---|
| What do they sell / care about? | Palette, imagery, tone |
| What makes them different? | Hero line + trust strip |
| How do customers book/buy? | Primary CTA (SMS, call, form, Shopify) |
| Seasonal money? | Optional `/christmas` or campaign route **inside the same app** |

Examples:

- **Fear Free pet groomer** — calm forest palette, soft motion, appointment-by-text, spa add-ons + photography path.
- **Restaurant** — appetite photography, reservation CTA, menu hierarchy, atmosphere over corporate trust badges.
- **Trade / home service** — clarity, proof, service areas, fast call/text; less lifestyle fluff.

Do **not** reuse Evergreen Hound colors/fonts/section order blindly for a different trade.

## Mobile hero (non-negotiable)

Desktop can stay a left text dock over full-bleed media. On mobile:

- Hero copy uses the same horizontal inset as page content (`width: min(…, calc(100% - 2rem))` + `margin-inline: auto`).
- **Never** set `.hero-dock { width: 100% }` — it cancels `.wrap` side padding and flushes CTAs to the screen edge.
- Bottom padding must clear any sticky mobile book bar:  
  `padding-bottom: calc(3.5rem + bar-height + env(safe-area-inset-bottom))`.
- Keep copy off faces: gradient dock + `object-position` tuned per image; verify on a real phone width (~390px).
- Primary CTA must be thumb-reachable; prefer sticky bottom book bar under ~860px.

Fix mobile padding **without** restyling desktop when the user says desktop is fine.

## Stack & structure

- Next.js App Router, one deployable app per client folder.
- Seasonal pages are **routes** (`/christmas`), never a second project.
- Free stock: prefer **Pexels** via `next/image` (Unsplash often breaks the optimizer). Allow only needed hosts in `next.config`.
- Demo banner at top: redesign concept, not the live site; scoped price if pitching.
- Required information follows the **client’s** real services — do not invent sections that fight their business.

## Section quality bar

- Strong CTA hierarchy (one primary, one secondary).
- Trust proof near the hero (certifications, years, neighborhood) — **below** the fold of the hero composition.
- Services scannable on phone; unique named offers get visual treatment.
- Reviews feel modern (avatar + quote + meta), not star widgets from 2014.
- Hours / map when location matters; appointment-only businesses say so clearly.
- Team portraits: real when available; honest placeholders labeled for swap.

## Checklist before calling a demo done

- [ ] First viewport passes brand test (mobile + desktop)
- [ ] Mobile hero has correct side + bottom padding; sticky CTA does not cover copy
- [ ] All images load (no broken `/_next/image`, no blocked live CDN)
- [ ] Motion works; reduced-motion still readable
- [ ] Palette/type/imagery match **this** business, not the last demo
- [ ] Desktop left alone if user only asked for a mobile fix
