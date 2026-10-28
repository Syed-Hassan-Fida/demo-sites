export const site = {
  slug: "kim-the-groomer",
  name: "Kim the Groomer",
  owner: "Kimberly Chatman",
  legalName: "Kim The Groomer Ltd.",
  liveUrl: "https://www.zendenpetspa.com/",
  canonical: "https://kim-the-groomer-demo.vercel.app",
  tagline:
    "Independent Denver groomer with professional handler roots — book Kim directly at her Zen Den table.",
  kicker: "Independent · Show-handler background · Accepting new clients",
  heroLine:
    "Ring-aware presentation and salon-family craft — call Kim for your pup’s next full finish at Oneida Street.",
  heroAlt: "Confident dog with polished coat after a professional groom",
  seoTitleSuffix: "Independent dog groomer — Denver, CO",
  seoDescription:
    "Kim the Groomer / Kimberly Chatman — professional show-dog handler turned independent groomer at Zen Den, 2247 Oneida St, Denver. Accepting new clients. Call (360) 710-4383.",
  address: "2247 Oneida St, Denver, CO 80207 (space inside Zen Den Pet Spa)",
  street: "2247 Oneida St",
  city: "Denver",
  region: "CO",
  postal: "80207",
  neighborhood: "Park Hill",
  phone: "(360) 710-4383",
  phoneTel: "+13607104383",
  email: "kimthegroomer25@gmail.com",
  instagram: "",
  areaServed: "Park Hill and greater Denver, CO",
  notice: {
    title: "Grooming continues — book Kim directly",
    body: "Zen Den retail is temporarily closed for building repair. Independent grooming still runs by appointment. Call or email Kim — do not rely on the retail desk.",
  },
  primaryCta: {
    label: "Call Kim",
    href: "tel:+13607104383",
  },
  secondaryCta: {
    label: "Email Kim",
    href: "mailto:kimthegroomer25@gmail.com",
  },
  aboutLead:
    "Kimberly Chatman has been working with dogs her whole life. She has shown dogs as a professional handler and worked in her mother’s grooming salon.",
  aboutBody:
    "Kim rents her own table at Zen Den Pet Spa so neighborhood clients get handler-trained eyes on silhouette, coat, and finish — with the warmth of a family salon. She runs Kim The Groomer Ltd. as an independent practice: her phone, her email, her book. She is accepting new clients.",
  homeServicesTitle: "Handler eyes. Salon finish.",
  homeServicesLead:
    "Every visit is paced for the dog in front of her — cut, bath, and presentation shaped by show-ring discipline and mom’s salon roots.",
  services: [
    {
      title: "Full groom",
      price: "Quote by dog",
      blurb:
        "Complete haircut and spa finish with show-aware balance — silhouette, feet, and face shaped for everyday life.",
      includes: ["Breed-aware cut", "Bath & conditioner", "Nails, ears, finish"],
    },
    {
      title: "Bath & brush",
      price: "Quote by dog",
      blurb: "Maintenance visits that keep coats comfortable between full grooms.",
      includes: ["Bath", "Thorough dry", "Brush-out"],
    },
    {
      title: "New client intro",
      price: "Discuss needs",
      blurb:
        "Accepting new neighborhood clients — share breed, coat, temperament, and any handling notes up front.",
      includes: ["Phone consult", "Custom plan", "First-visit pacing"],
    },
  ],
  pricingLead:
    "Independent pricing by breed, coat condition, and temperament — call or email for a quote before you book.",
  pricing: [
    {
      title: "Full groom",
      price: "On request",
      note: "Signature visit",
      items: ["Haircut", "Bath & condition", "Nails, ears, polish"],
    },
    {
      title: "Bath & brush",
      price: "On request",
      note: "Maintenance",
      items: ["Bath", "Dry", "Brush-out"],
    },
    {
      title: "Detail work",
      price: "As needed",
      note: "Coat dependent",
      items: ["Nails", "Ears", "Sanitary trim"],
    },
  ],
  addons: [] as { title: string; price: string; blurb: string }[],
  trust: [
    { title: "Handler background", sub: "Show-ring eye" },
    { title: "Salon roots", sub: "Mom’s craft" },
    { title: "New clients", sub: "Accepting now" },
    { title: "Oneida St", sub: "Zen Den table" },
  ],
  reviews: [
    {
      quote:
        "[Placeholder] Swap for a real client quote before launch — Kim’s finishes speak for themselves.",
      who: "Denver client",
      meta: "Placeholder",
    },
    {
      quote: "You can tell she has handler eyes for silhouette and finish.",
      who: "Show-aware pet parent",
      meta: "Demo voice",
    },
    {
      quote: "Booking Kim directly is simple — phone, email, done.",
      who: "New Park Hill client",
      meta: "Demo voice",
    },
  ],
  faqs: [
    {
      q: "Is Kim part of Zen Den retail?",
      a: "No. Kimberly Chatman is an independent groomer renting space at Zen Den Pet Spa. Book her directly by phone or email — grooming continues even when retail access is limited.",
    },
    {
      q: "Is she accepting new clients?",
      a: "Yes — Kim is accepting new clients. Call (360) 710-4383 or email kimthegroomer25@gmail.com with breed, coat, and preferred days.",
    },
    {
      q: "What is her background?",
      a: "Kim has worked with dogs her whole life. She showed dogs as a professional handler and worked in her mother’s grooming salon before opening her independent Denver table.",
    },
    {
      q: "Where is the table?",
      a: "2247 Oneida St, Denver, CO 80207 — inside Zen Den Pet Spa. Confirm pickup/drop-off when you book; retail may be closed during building repair.",
    },
    {
      q: "How do I get a price?",
      a: "Pricing depends on breed, coat, and condition. Call or email for a quote — there is no published menu on the host site.",
    },
  ],
  bookLead:
    "Call (360) 710-4383 with breed, coat notes, and preferred days. New clients welcome. Or send the form below and Kim will follow up.",
  locations: [] as {
    name: string;
    address: string;
    phone: string;
    phoneTel: string;
    email?: string;
    hours?: string;
  }[],
  ctaBandTitle: "Book Kim — not a host-site blurb",
  ctaBandLead:
    "A personal page for an independent groomer: call, email, or request a visit for your next finish.",
  pages: [
    "",
    "about",
    "services",
    "pricing",
    "gallery",
    "faq",
    "book",
    "contact",
    "privacy",
    "terms",
    "accessibility",
  ],
  handoffNotes:
    "- First branded site (was Zen Den host-profile only).\n- Real Zen Den portrait in public/assets/kim-portrait.jpg.\n- No personal logo — wordmark only.\n- Reviews marked as placeholders.\n- Pricing quote-led (not published live).",
};

export type SiteConfig = typeof site;
