export const site = {
  slug: "little-brown-dog",
  name: "Little Brown Dog",
  liveUrl: "https://lbdog.com/",
  canonical: "https://little-brown-dog-demo.vercel.app",
  tagline:
    "Full-service dog grooming studio led by Nationally Certified Master Groomer Brooke El-Merrahi, NCMG, CCE — Lower Highland Art District, Denver.",
  kicker: "NCMG studio · Navajo Art District · Denver",
  heroLine:
    "Portrait-quality, straight-through grooms from a nationally certified master groomer — appointment only.",
  heroAlt: "Max — studio portrait after a Little Brown Dog groom",
  seoTitleSuffix: "Master groomer studio — Highland Denver",
  seoDescription:
    "Little Brown Dog pet grooming in Denver’s Lower Highland Art District. Led by Brooke El-Merrahi, NCMG, CCE. 3235 Navajo Street. Call or text 720-588-8523.",
  address: "3235 Navajo Street, Denver, CO 80211",
  street: "3235 Navajo Street",
  city: "Denver",
  region: "CO",
  postal: "80211",
  phone: "(720) 588-8523",
  phoneTel: "+17205888523",
  email: "info@lbdog.com",
  instagram: "@lil_brn_dog",
  facebook: "https://www.facebook.com/littlebrowndogpetgroomingstudio",
  primaryCta: {
    label: "Call or text to book",
    href: "tel:+17205888523",
  },
  fonts: {
    displayImport: "Quattrocento",
    bodyImport: "Quattrocento Sans",
    displayOpts: "",
  },
  theme: {
    bg: "#efe8df",
    paper: "#fbf7f1",
    ink: "#24160f",
    brand: "#603020",
    accent: "#4a6fa5",
    muted: "#6b5648",
    heroObjectPosition: "50% 28%",
  },
  hours: "Mon–Fri 7:00am–6:00pm* · Sat & Sun closed",
  hoursNote: "*Actual closing time varies based on groomer schedule.",
  reception:
    "Reception in salon: Tue, Thu, Fri 9:00a–4:30p · Wed 10:00a–2:00p. Text & email from 7:00a Mon–Fri.",
  trust: [
    { title: "NCMG / CCE", sub: "Master groomer led" },
    { title: "Art District", sub: "3235 Navajo Street" },
    { title: "1:1 finish", sub: "Straight-through appointments" },
    { title: "Towel-free", sub: "Lower-stress drying" },
  ],
  homeServicesTitle: "À la carte craft, breed-aware pricing",
  homeServicesLead:
    "Every visit starts with Bath & Brush. Haircuts and specialty work are chosen to fit coat, lifestyle, and schedule.",
  services: [
    {
      title: "Bath & Brush",
      price: "From $59.50",
      blurb:
        "Required foundation for every visit: berry facial, full-body massage bath with Pure Paws sulfate-free shampoo, ear clean, nail file, hand dry, and complete brush-out.",
      includes: ["Berry facial", "Massage bath", "Ears & nails", "Hand dry & brush-out"],
    },
    {
      title: "Profile Trim",
      price: "From $39.25",
      blurb:
        "For coats that don’t need a full body cut — tidy the silhouette on breeds like Pomeranians, Goldens, and Aussies. Priced in addition to Bath & Brush.",
      includes: ["Silhouette tidy", "Coat-aware trim"],
    },
    {
      title: "Basic Cut",
      price: "From $57",
      blurb:
        "Easy-to-maintain active-pet cut: about 1″ all over with your choice of length on head, ears, and tail. Added to Bath & Brush.",
      includes: ["1″ body", "Custom head / ears / tail"],
    },
    {
      title: "Intermediate Cut",
      price: "From $75",
      blurb:
        "More shape and flash — bodies up to 1.5″ with hand-scissored leg flair. Four-week schedule required to qualify.",
      includes: ["Up to 1.5″ body", "Hand-scissored leg flair", "4-week schedule"],
    },
    {
      title: "Advanced Cut",
      price: "From $97.50+",
      blurb:
        "Master-stylist work — full hand scissors, Asian Fusion, and other out-of-the-ordinary finishes. Strict 3–4 week schedule for longer coats.",
      includes: ["Master stylist", "Hand scissors / specialty", "Photo references welcome"],
    },
    {
      title: "Hand stripping",
      price: "Hourly · waitlist",
      blurb:
        "Award-winning hand stripping by Brooke for wire coats. Preliminary evaluation required; 4-week-or-less schedule; first-of-day preferred.",
      includes: ["Preliminary evaluation", "4-week max cycle", "Limited breed list"],
    },
  ],
  pricingLead:
    "Prices use breed standards (size, weight, coat). Listed amounts assume regular maintenance — coat condition and temperament can adjust the quote. Bath & Brush is required; haircuts are add-ons.",
  breedTiers: [
    { title: "Itty Bitty", range: "20 lbs & under", examples: "Yorkie, Maltese, Toy/Mini Poodle, Shih Tzu…" },
    { title: "Small", range: "21–35 lbs", examples: "Beagle, Cocker, Cavalier, Mini Doodle…" },
    { title: "Medium", range: "36–65 lbs", examples: "Lab, Wheaten, Boxer, Small Standard Doodle…" },
    { title: "Large", range: "66–90 lbs", examples: "Golden, Aussie, Large Standard Poodle / Doodle…" },
  ],
  pricing: [
    {
      title: "Bath & Brush",
      price: "$59.50 · $83.75 · $111.50 · $136.70",
      note: "Itty → Large breed tiers",
      items: ["Required every visit", "Facial, bath, nails, ears", "Hand dry & full brush"],
    },
    {
      title: "Haircut add-ons",
      price: "Profile from $39 · Basic from $57 · Intermediate from $75 · Advanced from $97.50+",
      note: "Added to Bath & Brush",
      items: ["Profile tidy", "Basic / Intermediate / Advanced", "Hand stripping hourly"],
    },
    {
      title: "À la carte",
      price: "As listed",
      note: "Day-of / as needed",
      items: [
        "LUX nail grind from $35.50+",
        "Deshedding $19.25–$36",
        "Deep conditioning $18",
        "Dental health $8.25",
      ],
    },
  ],
  addons: [
    {
      title: "LUX nail trim / grinding",
      price: "From $35.50+",
      blurb: "Day-of appointment; rotary grind for smooth nails. Nails & ear cleaning included in bath/groom services.",
    },
    {
      title: "Deshedding treatment",
      price: "$19.25–$36",
      blurb: "Gentle undercoat work for better skin circulation and less hair at home.",
    },
    {
      title: "Deep conditioning",
      price: "$18",
      blurb: "Warm conditioning soak for dry Colorado coats.",
    },
    {
      title: "Dental health treatment",
      price: "$8.25",
      blurb: "Clean teeth plus toothbrush and enzymatic toothpaste to take home.",
    },
  ],
  reviews: [
    {
      quote: "Placeholder review — swap for a real Google/Yelp quote before launch. Gallery-first live site didn’t publish three attributed testimonials.",
      who: "Review slot · Highland client",
    },
    {
      quote: "Placeholder review — NCMG craft and calm straight-through visits are the story; drop in your best public review text.",
      who: "Review slot · Denver client",
    },
    {
      quote: "Placeholder review — keep attribution honest; do not invent star copy for outreach.",
      who: "Review slot · Repeat client",
    },
  ],
  faqs: [
    {
      q: "Who leads the studio?",
      a: "Brooke El-Merrahi, Nationally Certified Master Groomer (NCMG) and Certified Canine Esthetician (CCE). The studio sits in the Lower Highland / Navajo Art District near downtown Denver.",
    },
    {
      q: "How do I book?",
      a: "Call or text 720-588-8523, or email info@lbdog.com. Little Brown Dog is 100% appointment-based — no walk-in queues.",
    },
    {
      q: "What are your hours?",
      a: "Monday–Friday 7:00am–6:00pm*. Saturday & Sunday closed. Closing time varies with the groomer schedule. Reception hours differ; text and email are monitored from 7:00am Mon–Fri.",
    },
    {
      q: "What is straight-through grooming?",
      a: "You drop off at your appointment time and work begins immediately — pets aren’t kenneled for hours waiting. Prompt pickup (ideally within 15 minutes, within 30 to avoid fees) keeps the schedule calm for every dog.",
    },
    {
      q: "Why towel-free?",
      a: "A single synthetic drying chamois per pet replaces stacks of cotton towels — faster dry, less force-dryer time, less stress, and lower laundry/electricity load as part of the shop’s sustainability path.",
    },
    {
      q: "Do you take every breed?",
      a: "Breed tiers run from Itty Bitty through Large. XL full-coated breeds (Bernese, Newfie, Great Pyrenees, etc.) are not accommodated due to shop size and schedule. Bearded Collies are hourly. See Services for details.",
    },
    {
      q: "Why must I opt in to texts?",
      a: "Federal Campaign Registry rules require explicit opt-in for business SMS. The team behind the keyboard is still human — the labels look more formal than the people sending them.",
    },
    {
      q: "Why is check-in in the front hallway?",
      a: "The outdoor/hallway check-in flow supports one-on-one straight-through grooming timelines and reduces hallway congestion while the team observes each pet at arrival.",
    },
  ],
  bookLead:
    "Call or text 720-588-8523 (preferred) or email info@lbdog.com with your dog’s breed, coat notes, and preferred days. New clients: ask for onboarding form links a few days ahead.",
  locations: [],
  ctaBandTitle: "Book the Navajo Street studio",
  ctaBandLead: "A booking path as considered as the portraits on the wall.",
  pages: [
    "",
    "about",
    "services",
    "pricing",
    "gallery",
    "faq",
    "book",
    "contact",
    "policies",
    "privacy",
    "terms",
    "accessibility",
  ],
  handoffNotes:
    "- Logo + favicon sourced from live WordPress assets.\n- Gallery uses named client portraits hotlinked from lbdog.com CDN.\n- Reviews are explicit placeholders — live site is gallery-first.\n- Pricing transcribed from live Dog Services page; confirm before launch.",
};

export type SiteConfig = typeof site;
