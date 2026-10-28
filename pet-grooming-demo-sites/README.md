# Pet Grooming Demo Sites (Vercel monorepo)

Demo websites for cold outreach to independent pet groomers (US / UK / CA).  
One Git repo → many Vercel projects via **Root Directory** (one folder = one client site).

## Stack: **Next.js (App Router)**

Native on Vercel, easy SEO/OG, same React skills. Prefer this over plain Vite+React for these demos.

## Repo layout

```text
pet-grooming-demo-sites/
├── README.md
├── PLAN_evergreen_hound.md
├── EMAIL_evergreen_hound.md
└── evergreen-hound/              ← ONE Vercel project (Root Directory)
    ├── package.json
    ├── app/
    │   ├── page.tsx              ← main redesign (/)
    │   └── christmas/
    │       └── page.tsx          ← Christmas gifts page (/christmas)
    └── public/
```

Add more clients later as sibling folders (`painted-paws/`, `bark-and-hound/`, …) — each gets its own Vercel project.  
**Do not** create a separate Vercel project for Christmas; it is a route inside the client site.

## Deploy on Vercel

1. Vercel → **Add New** → **Project**
2. Import this Git repository
3. **Root Directory** → `evergreen-hound`
4. Deploy once

URLs after deploy:
- Main: `https://YOUR-PROJECT.vercel.app/`
- Christmas: `https://YOUR-PROJECT.vercel.app/christmas`

For the **next** groomer client: Add New Project again → same repo → different Root Directory (e.g. `painted-paws`).

## Local run

```bash
cd evergreen-hound
npm install
npm run dev
# http://localhost:3000
# http://localhost:3000/christmas
```

## First client

**Evergreen Hound** (Austin, TX)  
Offer: **$150–$300** redesign + Christmas page (same site), pay only if they love it.  
CRM / Shopify = call upsells only.
