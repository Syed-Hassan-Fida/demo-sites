export type EduPage = {
  slug: string;
  title: string;
  summary: string;
  body: string[];
  group: "hub" | "tips" | "breeds" | "doodle";
};

export const educationPages: EduPage[] = [
  {
    slug: "doodle-information",
    title: "Oodles of Doodles",
    summary: "Doodles have beautiful coats that need real upkeep — start here for coat care paths.",
    group: "doodle",
    body: [
      "Do you currently own or have you considered owning a Doodle? Doodles have beautiful coats that do require upkeep. Use the linked guides below for general info, tools, coat care, brushing, shampoo, and clip options.",
      "Explore General Doodle Info, Tools, Coat Care 101, Brushing Tips, Shampoo, and Options for a full at-home care plan between salon visits.",
    ],
  },
  {
    slug: "general-doodle-information",
    title: "General Doodle Information",
    summary: "What to expect from doodle coats and salon schedules.",
    group: "doodle",
    body: [
      "Doodle coats vary widely — from loose waves to dense curls — and that variety changes how often you brush and how often you book.",
      "Plan on regular professional grooming plus consistent home brushing. Waiting until mats set in often means a shorter clip than you hoped for.",
      "Ask us which tools and shampoo match your dog’s coat type; the wrong brush is the #1 reason “I brush every day” still ends in mats.",
    ],
  },
  {
    slug: "tools",
    title: "Doodle Tools",
    summary: "Brushes and combs that actually reach the skin.",
    group: "doodle",
    body: [
      "A slicker that never reaches the skin won’t demat a doodle. Pair a quality slicker with a metal comb that tells the truth about tangles.",
      "Keep a spray conditioner or detangler handy so you aren’t dragging a dry coat. Ask the salon which Chris Christensen or similar tools we recommend for your coat type.",
      "Replace worn slicker pads — bent pins scratch skin and skip over mats.",
    ],
  },
  {
    slug: "coat-care-101",
    title: "Coat Care 101",
    summary: "Never bathe a matted dog — brush first, then wash.",
    group: "doodle",
    body: [
      "First and foremost: never, EVER bathe a matted dog. Water tightens tangles into a sponge that takes forever to dry and can irritate skin.",
      "Always brush and comb before the bath, as well as after. Put your pet up on a table or stable surface — dogs are usually more cooperative off the floor where play happens.",
      "If you can’t get a comb from the skin straight out with no resistance, you still have matting to address before shampoo.",
    ],
  },
  {
    slug: "shampoo",
    title: "Shampoo",
    summary: "Choosing the right wash — and using it safely around eyes.",
    group: "doodle",
    body: [
      "With so many choices, we can help you pick the right shampoo and conditioner. We personally avoid certain bargain brands that can be harsh.",
      "Use a sponge to wash the face and around the eyes so you control where suds go. For medicated soaks, set a timer — ten wet minutes can feel endless, but soak time matters.",
      "Rinse thoroughly. Leftover product is a common cause of itch after a home bath.",
    ],
  },
  {
    slug: "options",
    title: "Doodle Clip Options",
    summary: "Length and style choices that fit your lifestyle.",
    group: "doodle",
    body: [
      "Clip options range from tidy puppy/lamb looks to shorter summer-friendly trims. Coat texture decides what will look smooth versus choppy.",
      "Tell us how often you can brush at home — that honesty helps us recommend a length you’ll love three weeks later, not just on pickup day.",
      "Rapid Return and specialty finishes can be requested when you book.",
    ],
  },
  {
    slug: "breeds",
    title: "Breed Information",
    summary: "Profiles for Cocker Spaniels, Poodles, and Shih Tzu / Lhasa Apso.",
    group: "hub",
    body: [
      "Please explore the breed profiles linked from this hub for coat realities, clip choices, and how often to book.",
      "We highlight Cocker Spaniels, Poodles, and Shih Tzu & Lhasa Apso because their coats reward early, consistent grooming habits.",
    ],
  },
  {
    slug: "bathing-tips",
    title: "Bathing Tips",
    summary: "Smarter home baths that don’t create bigger problems.",
    group: "tips",
    body: [
      "Demat before you wet the coat. Water and soap bind into mats and make drying miserable for everyone.",
      "Use lukewarm water, a dog-safe shampoo, and a thorough rinse. Face work is safer with a damp sponge than a heavy pour.",
      "Dry fully — especially armpits, ears, and dense doodle curls — so dampness doesn’t linger against skin.",
    ],
  },
  {
    slug: "grooming-tips",
    title: "Grooming Tips",
    summary: "Effectively brushing Fido at home — the salon truth check.",
    group: "tips",
    body: [
      "“But he can’t possibly be matted, I brush him every day!” — often the brush is wrong for the coat, or it never reaches the skin.",
      "Reality check: if you can’t get a comb through from the skin straight out with no resistance, you have matting to some degree.",
      "Grooming time is not play time. Put him up on a table (never unattended), start from the bottom and work up, then comb to verify. Never bathe a matted dog.",
      "Regular effective brushing means a happier dog and often lower grooming prices when it’s time for a new ‘do’.",
    ],
  },
  {
    slug: "nail-trimming",
    title: "Nail Trimming",
    summary: "DIY nail tips for between salon visits.",
    group: "tips",
    body: [
      "Become comfortable with the procedure so your confidence transfers to your dog. A helper can make early sessions easier.",
      "Avoid trimming on the floor when you can — a table or stable surface helps. Handle paws regularly so touch isn’t a surprise.",
      "When in doubt, book our walk-in nail windows (Tue–Fri 11–4, Sat 11–3) and let the salon handle the quick.",
    ],
  },
  {
    slug: "brushing-tips",
    title: "Brushing Tips",
    summary: "Start from the bottom — a comb tells the truth.",
    group: "tips",
    body: [
      "Like detangling a ponytail: start at the ends and work up so each pass is smoothing finished hair.",
      "A brush will lie to you; a comb tells the truth. Comb after brushing, then re-check hot spots: behind ears, neck, base of tail, armpits, and flanks.",
      "Get down TO the skin without scrubbing the skin — too much pressure causes brush burn.",
    ],
  },
  {
    slug: "to-pluck-or-not-to-pluck",
    title: "To Pluck Or Not To Pluck",
    summary: "Ear plucking isn’t automatic for every dog anymore.",
    group: "tips",
    body: [
      "Historically, groomers plucked loose ear-canal hair on coated breeds (poodles, Lhasas, Shih Tzus, many terriers and doodles). Short-coated breeds and many spaniels/Goldens are often hair-free in the canal.",
      "The practice is more individualized now. Some dogs get itchy or shake their heads after plucking; others stay healthier with careful plucking plus cleaning.",
      "We’ll discuss what’s right for your pet’s ears — don’t assume every groom includes aggressive plucking.",
    ],
  },
  {
    slug: "curb-your-pet",
    title: "Curb Your Pet",
    summary: "Potty before check-in — rainy-day salon sanity.",
    group: "tips",
    body: [
      "Our busiest clean-up days are rainy days when pets haven’t been allowed to relieve themselves before spa drop-off.",
      "We have a small front yard for a quick empty-out on arrival. A few minutes at home or here keeps your pet more comfortable and our floors less exciting.",
      "We (and your dog) appreciate morning potty time before grooming.",
    ],
  },
  {
    slug: "shavedown-yes-or-no",
    title: "Shavedown — Yes or No?",
    summary: "Will shaving cool your dog? It depends on the coat.",
    group: "tips",
    body: [
      "Triple-coated (and some double-coated) dogs are often best left in coat — shaving can damage coats that are slow to recover.",
      "What does help: thoroughly brushing and combing the undercoat so air can move and the coat can do its insulating job.",
      "Ask us before a full shave-down. Lifestyle clips exist that stay neat without wrecking the wrong coat type.",
    ],
  },
  {
    slug: "peeing-in-the-rain",
    title: "Peeing In The Rain",
    summary: "Wet paws vs. a cleaner salon day — what we recommend.",
    group: "tips",
    body: [
      "Nobody loves muddy paws in the car before a groom. Still, rainy days mean more paper towels when pets skip potty time.",
      "A quick curb or yard stop before check-in is kinder to your dog and to the team. Bring a towel for paws if needed — we’ll still welcome the spa guest.",
    ],
  },
  {
    slug: "cocker-spaniels",
    title: "Cocker Spaniels",
    summary: "Happy coats, big eyes, and clip choices for busy families.",
    group: "breeds",
    body: [
      "American Cocker Spaniels won hearts with those eyes and sunny attitudes — and their coats need a plan.",
      "A short all-over clip is great for cockers on the go (camping, lake days, morning jogs): easier baths, easier flea/tick checks.",
      "Longer looks are beautiful with committed brushing. Short outdoor breeds stay short year-round; your cocker doesn’t need a heavy coat to be comfortable if you choose a tidy clip.",
    ],
  },
  {
    slug: "poodle",
    title: "Poodle",
    summary: "Start early — poodles live a grooming lifestyle.",
    group: "breeds",
    body: [
      "Poodles of any size spend a meaningful part of life in the salon — begin early, even while the puppy fluff is adorable.",
      "Not every clip suits every coat texture. A scissored lamb look that flatters the neighbor’s dog may look choppy on yours.",
      "Typical schedule: every 4–8 weeks depending on clip. Fun facts clients love: poodles originated in Germany (not France) and were bred as water retrievers.",
    ],
  },
  {
    slug: "shih-tzu",
    title: "Shih Tzu & Lhasa Apso",
    summary: "Flowing elegance — or an easier lifestyle clip.",
    group: "breeds",
    body: [
      "Lhasa Apsos and Shih Tzus can wear elegant flowing coats with bi-daily brushing. Keep that up and professional visits may be every 7–9 weeks for pads, feet, and face.",
      "Most families don’t have time for full-length maintenance — and that’s okay. We tailor shorter clips so you and your pup stay happy, usually every 5–8 weeks.",
      "Ask about face, body, and sanitary options that match your brushing reality.",
    ],
  },
];

export function getEducation(slug: string) {
  return educationPages.find((p) => p.slug === slug);
}

export const educationNav = educationPages.filter((p) =>
  [
    "doodle-information",
    "breeds",
    "bathing-tips",
    "grooming-tips",
    "nail-trimming",
    "brushing-tips",
    "to-pluck-or-not-to-pluck",
    "curb-your-pet",
    "shavedown-yes-or-no",
    "peeing-in-the-rain",
    "cocker-spaniels",
    "poodle",
    "shih-tzu",
  ].includes(p.slug)
);
