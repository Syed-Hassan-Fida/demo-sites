# Redesign plan — Evergreen Hound (Austin)

**Client:** Evergreen Hound  
**Live site today:** https://www.evergreenhound.com/ (Wix)  
**Contact:** barkingevergreen@gmail.com · Text 512-766-1712 · @evergreenhound  
**Demo folder:** `evergreen-hound/` (one Vercel project)  
**Christmas:** route `/christmas` inside the same app — **not** a separate project  
**Price to pitch:** **$150–$300** for the scoped redesign (pay only after they approve the demo)  
**Upsells (call only):** private/centralized CRM · custom Shopify theme/store

---

## 1. What’s wrong with the current site (evidence-based)

| Issue | Why it costs them bookings |
|---|---|
| Long Wix single page | Packages, add-ons, photography, team, reviews all compete; hard to scan on phone |
| Weak primary CTA hierarchy | “Book Now” + text + intake form compete; mobile users hesitate |
| Packages buried in dense lists | Breed packages + Austin-named add-ons (“Willie”, “McConaughey”, “Ladybird”) are unique — under-sold visually |
| Photography is a second business | $250–$300 sessions + holiday cards deserve a dedicated path (Christmas landing) |
| No clear “gift / holiday” path | Season is live (late Oct → Christmas); gift cards + holiday mini-sessions are money left on the table |
| Intake form at the bottom | Friction after the pitch; should sit next to Book |

**Do not promise:** replacing their Fear Free process, building a full multi-tenant CRM in the $150–$300 package, or a production Shopify store inside that price.

---

## 2. Demo offer scope ($150–$300)

### Included (if they approve after demo)
1. Modern mobile-first **homepage redesign** (Next.js)
2. Clear **Book / Text** CTA strip
3. Visual service cards (breed packages + spa add-ons)
4. Team + Fear Free / Cooperative Care / woman-owned trust strip
5. Reviews block
6. **Christmas gifts page** at `/christmas` (holiday photo + gift card CTAs)
7. Basic on-page SEO (titles, meta, headings, OG tags)
8. Deployed on Vercel demo URLs

### Not included (discuss on call → separate quote)
- Live SMS/booking system integration (MoeGo, etc.)
- Private CRM / client history / reminders automation
- Custom Shopify store + private theme
- Ongoing ads management
- Full brand identity overhaul / custom photography shoot

---

## 3. Information architecture

### Page `/` — main redesign
1. Hero — force-free promise + Book / Text  
2. Why Evergreen (Fear Free, East Austin, woman-owned)  
3. Grooming packages (4 breed paths)  
4. Spa add-ons (Willie / McConaughey / Ladybird)  
5. Photography teaser → link to `/christmas` + studio/outdoor prices  
6. Team (Noel, Nikki, Lauren)  
7. Reviews  
8. Visit / contact (address, text, email, IG)  
9. Demo banner (this is a redesign concept)

### Page `/christmas` — seasonal (same project)
1. Hero — “Holiday gifts for Austin pups”  
2. Gift ideas: Holiday studio mini · Outdoor mini · Gift card · McConaughey add-on  
3. Simple “text to reserve” CTA  
4. Deadline / limited December slots messaging (honest scarcity)  
5. Link back to `/`  


---

## 4. Visual direction (brand-fit, not generic AI look)

- **Palette:** deep evergreen `#16352e`, moss `#5f7f6f`, mist `#e7eeea`, charcoal `#1c1f1d`, soft gold accent `#c4a574` (sparingly — photography/holiday, not terracotta-cream cliché)
- **Type:** display = *Fraunces*; UI = *Figtree* (via `next/font`)
- **Motion:** soft fade-up on sections; sticky mobile Book bar; Christmas page gentle snowfall CSS (subtle, not emoji spam)
- **Imagery:** use placeholders + clear image slots labeled for Noel’s real photos later; never fake review quotes beyond what’s already public on their site

---

## 5. Build & deploy checklist

- [x] Monorepo folder created  
- [x] Main redesign at `/`  
- [x] Christmas page at `/christmas` (same project)  
- [x] Removed separate `evergreen-hound-christmas` project  
- [ ] Push repo / connect Vercel  
- [ ] Deploy **one** project, Root Directory `evergreen-hound`  
- [ ] Paste `DEMO_URL` and `DEMO_URL/christmas` into email  
- [ ] Send to barkingevergreen@gmail.com (human approve first)  

---

## 6. Success criteria for this client

They reply or book a call because:
1. Demo looks like *their* brand, not a template farm  
2. Christmas page shows seasonal revenue they don’t currently spotlight  
3. Price is low-risk ($150–$300, pay if they love it)  
4. Upsells are optional, not stuffed into the first ask  

---

## 7. Next clients after Evergreen

Reuse the same monorepo pattern: new folder per shop → new Vercel root project → new demo URL.
