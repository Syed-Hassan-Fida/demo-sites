---
name: premium-demo-sites
description: >-
  Build and redesign cold-outreach demo websites with Next.js App Router,
  premium 2026 UI/UX, SEO, accessibility, and business-nature-specific design.
  Use when creating or redesigning demo sites under pet-grooming-demo-sites,
  auditing live client sites, writing page inventories/sitemaps, or when the
  user asks for a redesign demo, pitch site, gallery/FAQ/pricing pages, or
  Next.js client handoff.
---

# Premium outreach demo sites (Next.js)

Every redesign demo must feel like a **2026 boutique brand site**, not a
template, Wix clone, or generic AI landing page. Match the **business nature**.

**Out of scope unless the user reopens them:** already-professional sites called
out in the request (e.g. Evergreen Hound, Painted Paws). Do not modify those.

## Stack (required)

- **Next.js only** (App Router + TypeScript). No other frontend framework/CMS
  unless the user explicitly approves.
- Use Metadata API, `next/image`, `sitemap.ts`, `robots.ts`, server/client
  components appropriately.
- One deployable app **per client folder** under `pet-grooming-demo-sites/`.
- Seasonal campaigns are **routes** inside the same app, never a second project.
- Stock: prefer **Pexels** via `next/image` (allow `images.pexels.com` in
  `next.config`). No broken or irrelevant imagery.

## Required workflow per client

1. **Audit** the live site: pages, nav, services, legal, blog, gallery, forms, CTAs.
2. **Write** page inventory + proposed sitemap **before** coding.
3. **Do not drop** existing pages without a documented reason.
4. Research business nature, audience, local market, positioning → tailor design.
5. Use real client content; mark unavoidable placeholders clearly (never lorem).

## Required pages / sections

Every redesign must include at least:

- Home (conversion-focused)
- Portfolio / Gallery
- FAQ
- Pricing or service packages / pricing
- Contact (+ booking path matching how they actually book)
- Privacy, Terms, Accessibility (trust/legal)
- High-value niche extras as needed: services, testimonials, team, service areas,
  trust signals, local SEO, before/after

## Hard composition rules

1. One composition in the first viewport — not a dashboard.
2. Brand first — business name is hero-level.
3. Brand test — removing nav must not make the first screen anonymous.
4. Expressive typography — never Inter / Roboto / Arial / system-only.
5. Atmosphere — gradients, imagery, or texture; never flat single-color pages.
6. Full-bleed hero — no inset hero cards / side panels / floating media blocks.
7. Hero budget — brand + one headline + one support line + CTA group + image.
8. No hero overlays (badges, chips, stickers).
9. Cards default none; never in hero; only when wrapping real interaction.
10. One job per section.
11. Real visual anchor (craft/place/product).
12. 2–3 intentional motions; respect `prefers-reduced-motion`.
13. Avoid AI-default looks (purple/indigo gradients; cream+terracotta cliché;
    broadsheet newspaper; dark-mode-by-default; glow stacks; pill clusters; emoji).

## Mobile hero (non-negotiable)

- Side inset via `width: min(…, calc(100% - 2rem))` + `margin-inline: auto`.
- **Never** `.hero-dock { width: 100% }` (cancels wrap padding).
- Bottom padding clears sticky book bar + `safe-area-inset-bottom`.
- Verify ~390px width; keep copy off faces.

## SEO / a11y / forms / email

- Unique title + meta description, canonical, OG/Twitter, LocalBusiness JSON-LD,
  sitemap, robots, redirects notes for old URLs where known.
- WCAG 2.2 AA where feasible: keyboard, focus, contrast, alt, semantics, labels.
- Forms: validation, success/error, spam honeypot, privacy consent, accessible labels.
- Email templates (contact/booking): brand-aligned HTML + plain-text fallback;
  responsive; professional tone. Prefer `.md` pitch + optional `.html` only if asked.

## QA before done

- [ ] Inventory + sitemap documented
- [ ] Brand test + mobile hero padding
- [ ] All required pages live; no dropped pages without reason
- [ ] Images load; no horizontal scroll / CLS / overlap bugs
- [ ] Forms + keyboard + focus states
- [ ] `next build` passes; lint/type-check clean
- [ ] Demo banner (concept, not live site) + handoff notes + preview URL

## Scaffold

Prefer `pet-grooming-demo-sites/_kit/` patterns and per-client `site.ts` config.
Do **not** clone Evergreen Hound palette/fonts/section order for unrelated brands.
