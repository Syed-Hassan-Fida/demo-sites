# Pet Grooming Demo Sites (Vercel monorepo)

Demo websites for cold outreach to independent pet groomers.  
One Git repo → many Vercel projects via **Root Directory** (one folder = one client site).

## Stack

**Next.js App Router + TypeScript** only. Metadata API, `next/image`, sitemap/robots, LocalBusiness JSON-LD.

## Out of scope (do not redesign)

- `evergreen-hound/` — already built ([live demo](https://demo-sites-lovat-kappa.vercel.app/)); source client https://www.evergreenhound.com/
- Painted Paws — https://www.paintedpawsaustin.com/ (professionally built; no folder)

## In-scope redesigns (CSV batch 2026-10-28)

| Folder | Client | Inventories | `npm run build` |
|---|---|---|---|
| `as-the-fur-flies/` | As The Fur Flies (2 Austin salons) | [inventory](./INVENTORIES/as-the-fur-flies.md) | pass |
| `groomingdales-of-austin/` | Groomingdales Of Austin | [inventory](./INVENTORIES/groomingdales-of-austin.md) | pass |
| `swagg-atx/` | SWAGG mobile | [inventory](./INVENTORIES/swagg-atx.md) | pass |
| `steady-paws/` | Crystal’s / Steady Paws (Denver) | [inventory](./INVENTORIES/steady-paws.md) | pass |
| `little-brown-dog/` | Little Brown Dog (Denver) | [inventory](./INVENTORIES/little-brown-dog.md) | pass |
| `polished-pets/` | Polished Pets Mobile | [inventory](./INVENTORIES/polished-pets.md) | pass |
| `mc-grooming-co/` | MC Grooming Co / Kiera | [inventory](./INVENTORIES/mc-grooming-co.md) | pass |
| `kim-the-groomer/` | Kim the Groomer | [inventory](./INVENTORIES/kim-the-groomer.md) | pass |

Each app includes: Home, Services, Pricing, Gallery, FAQ, Book, Contact, Privacy, Terms, Accessibility, 404, sitemap, robots, contact email plain-text template, `HANDOFF.md`.

## Scaffold

```bash
# edit configs/<slug>.json then:
node _scripts/scaffold-demo.mjs configs/<slug>.json
cd <slug> && npm install && npm run build
```

## Deploy on Vercel

1. Add New Project → this repo  
2. **Root Directory** = client folder (e.g. `as-the-fur-flies`)  
3. Deploy  

Repeat per client (separate Vercel projects).

## Local run

```bash
cd as-the-fur-flies   # or any client folder
npm install
npm run dev
```

## Pitch emails (same format as Evergreen)

| File | Client |
|---|---|
| `EMAIL_evergreen_hound.md` | Evergreen Hound (live demo URL filled in) |
| `EMAIL_as_the_fur_flies.md` | As The Fur Flies |
| `EMAIL_groomingdales_of_austin.md` | Groomingdales Of Austin |
| `EMAIL_swagg_atx.md` | SWAGG |
| `EMAIL_steady_paws.md` | Crystal’s / Steady Paws |
| `EMAIL_little_brown_dog.md` | Little Brown Dog |
| `EMAIL_polished_pets.md` | Polished Pets |
| `EMAIL_mc_grooming_co.md` | MC Grooming Co |
| `EMAIL_kim_the_groomer.md` | Kim the Groomer |

Replace `DEMO_URL` after each Vercel deploy.

## Skills

Project skill: `.cursor/skills/premium-demo-sites/SKILL.md`  
Changelog: [QA_CHECKLIST.md](./QA_CHECKLIST.md) · [SKILL_CHANGES.md](./SKILL_CHANGES.md)
