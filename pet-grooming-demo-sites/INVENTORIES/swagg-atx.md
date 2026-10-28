# SWAGG — inventory & sitemap

**Client:** SWAGG Mobile Pet Grooming (Jolie Garcia)  
**Live:** https://www.swaggatx.com/  
**Nature:** Appointment-only mobile spa vans (professional unit to your curb) — not a brick-and-mortar salon twin.  
**Pitch angle:** Clearer “book the van” path + size pricing + route/neighborhood intake (deposits/CRM as phase 2).

---

## Live site audit (2026-10-28)

### Pages / nav (Squarespace)

| Live URL | Content | Demo disposition |
|---|---|---|
| `/` | “Austin’s Premiere Mobile Pet Grooming”; philosophy “dogs come first, always”; happy dog-parent quotes (Julie, Doreena, Michael); why grooming matters; hours; contact | Keep → `/` conversion home |
| `/about` | Mission; mobile-spa cleanliness; founder Jolie Garcia (est. 2014, award-winning, AKC, international training); pet-safe products | Keep → `/about` |
| `/menue` | Services & rates: Bath / Maintenance Trim / Full Groom by size; “text for rate”; contact form | Map → `/pricing` + `/services` (redirect note: `/menue` → `/pricing`) |
| Appointments / booking | Text/call primary; form “reply within 24 hours” | → `/book` (+ sticky call/text) |
| Cart / newsletter widgets | Squarespace commerce/newsletter chrome | **Dropped** — not core to mobile booking pitch |
| Legal | None visible | **Added** `/privacy` · `/terms` · `/accessibility` |

### Contact & ops (verbatim)

- **Email:** swaggatxgrooming@gmail.com  
- **Phone / text:** (512) 202-5920  
- **Hours:** Monday–Saturday 8am–6pm · Sunday closed  
- **Area:** Austin, Texas & surrounding areas (mobile)  
- **Socials (public):** Instagram `@swaggatx` · Facebook `facebook.com/SWAGGATX`

### Published starting rates (`/menue`)

| Package | Small | Medium | Large | XL |
|---|---|---|---|---|
| Bath | $65+ | $85+ | $105+ | $120+ |
| Maintenance Trim | $85+ | $105+ | $135+ | $165+ |
| Full Groom | $85+ | $105+ | $130+ | $150+ |

Final ticket may change with coat, mats, behavior, travel — text to confirm.

### Brand assets & color read

- **Logo:** Barber-pole mark with “SWAGG” wordmark + poodle silhouettes (live Squarespace asset → demo `public/logo.png` + favicons).  
- **Palette from mark:** charcoal/black, pole red, pole indigo/blue, white paper.  
- **Demo tokens:** bg `#f1eef0` · paper `#ffffff` · ink `#121014` · brand `#171417` · accent `#e24c4c` · pole `#3535a0` · muted `#5c5658`.  
- **Type:** Unbounded (display) + Figtree (body) — expressive, not Inter/system.

### Positioning to preserve

- Dogs come first / satisfaction guaranteed  
- Allergy & skin treatment–aware pet stylist  
- Award-winning founder story  
- Mobile luxury convenience (“we come to you”)  
- Partnership with pet parents (listen / kindness)

---

## Proposed / shipped sitemap

`/` · `/about` · `/services` · `/pricing` · `/gallery` · `/faq` · `/service-area` · `/book` · `/contact` · `/privacy` · `/terms` · `/accessibility`

**SEO helpers:** `sitemap.ts` · `robots.ts` · LocalBusiness/PetGroomer JSON-LD · unique titles/descriptions  
**Redirect notes if launched:** `/menue` → `/pricing` · `/appointments` → `/book`

---

## Design direction (mobile van — not salon twin)

Bold curb-side spa confidence: charcoal + electric coral + barber-pole indigo, full-bleed hero, size-tier pricing band, neighborhood cloud for route SEO, text-to-book sticky bar. Gallery uses Pexels stock until real van/client photos swap in.
