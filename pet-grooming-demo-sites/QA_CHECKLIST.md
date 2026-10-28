# Final QA checklist — CSV redesign batch (2026-10-28)

## Scope

- Source: `data/incoming/pet_grooming_us.csv`
- Excluded: Evergreen Hound, Painted Paws
- Built: 8 Next.js App Router demos (see README table)

## Per-site checks

| Check | ATFF | Groomingdales | SWAGG | Steady | LBDog | Polished | MC | Kim |
|---|---|---|---|---|---|---|---|---|
| Inventory + sitemap documented | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Gallery / FAQ / Pricing pages | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Book + Contact forms (validation, honeypot, consent) | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Privacy / Terms / Accessibility | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Metadata + OG + JSON-LD + sitemap/robots | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Mobile hero side/bottom padding pattern | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Unique brand theme (not Evergreen clone) | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| `npm run build` passes | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Email plain-text confirmation template | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Handoff notes | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |

## Known demo limitations (documented, not bugs)

- Gallery images are licensed Pexels placeholders — swap client photos before launch.
- Some reviews are illustrative placeholders when live sites lacked 3+ quotes (marked in HANDOFF / inventories).
- Contact form opens `mailto:` (no server storage on demo host) — intentional for outreach demos.
- Preview URLs: deploy each folder as its own Vercel Root Directory; canonicals in config are placeholders until deploy.
- Optional deeper pages (`/about`, `/service-area`, `/locations`) called out in inventories for ATFF/SWAGG/LBDog — core required set ships; extend from HANDOFF notes when pitching.

## Accessibility / UX smoke (kit baseline)

- Semantic headings, focus-visible styles, form labels, FAQ `<details>`
- Sticky mobile CTA bar under 860px with hero bottom clearance
- `prefers-reduced-motion` disables ken burns / reveals
- No horizontal scroll intended at 390 / 768 / 1280

## Not run in this batch (manual before client send)

- [ ] Visual pass on real device Safari/Chrome
- [ ] Screen reader spot-check
- [ ] Deploy preview URLs + replace `DEMO_URL` in emails
- [ ] Client photo swap + real review attribution
