export type MorePage = {
  slug: string;
  title: string;
  summary: string;
  body: string[];
};

export const morePages: MorePage[] = [
  {
    slug: "pet-s-true-name",
    title: "Pet’s True Name",
    summary: "A playful look at what we call them vs. who they really are.",
    body: [
      "Every salon day we meet a “Buddy,” “Bella,” or “Max” — and then learn the nickname that only comes out at treat time.",
      "Share your pet’s true name (or secret nickname) when you book. It helps us call them the way you do — and it makes the spa day feel personal.",
      "Swap this placeholder copy for your favorite live anecdotes and photo captions before launch.",
    ],
  },
  {
    slug: "pet-s-true-age",
    title: "Pet’s True Age",
    summary: "Puppy energy, senior grace — age changes the groom plan.",
    body: [
      "Chronological age and “salon age” aren’t always the same. A mature coat, arthritis, or anxiety can change how we pace the day.",
      "Tell us about mobility, hearing, or medical notes on the request form so we can plan a kinder appointment.",
      "Demo note: replace with your live age charts or fun quizzes from the Wix page when you hand over final assets.",
    ],
  },
  {
    slug: "pet-parent-fun",
    title: "Pet Parent Fun",
    summary: "Lighthearted tips and salon culture for Austin pet parents.",
    body: [
      "From bow preferences to bandana debates, pet parents make the salon lively. We love celebrating the quirks that make your dog yours.",
      "Follow us on Instagram and Facebook for fresh finishes and community posts — links are in the footer.",
      "Content here mirrors the spirit of the live “Pet Parent Fun” page; drop in your real games, lists, or photo prompts at launch.",
    ],
  },
  {
    slug: "locals",
    title: "Locals",
    summary: "Austin neighborhood love near Koenig Lane.",
    body: [
      "We’re at 1108 W Koenig Ln, Austin, TX 78756 — convenient for nearby neighborhoods and regulars who’ve made the drive for years.",
      "Local product shout-outs (like Brother’s Barkery treats) keep the boutique stocked with Austin-made goodies.",
      "Ask about neighborhood drop-off rhythm when you request your appointment.",
    ],
  },
  {
    slug: "meet-thomas",
    title: "Meet Thomas",
    summary: "Salon mascot energy — the cute that is Thomas.",
    body: [
      "Thomas is part of the Groomingdale’s story — a familiar face in fun pics and puppy flashbacks.",
      "Browse Thomas as a Puppy, Thomas & Friends, and The Cute That Is Thomas for more of his album.",
      "Replace stock placeholders with your real Thomas gallery images before go-live.",
    ],
  },
  {
    slug: "the-cute-that-is-thomas",
    title: "The Cute That Is Thomas",
    summary: "Portrait moments of the salon’s favorite face.",
    body: [
      "A dedicated album for Thomas at his cutest — bows, fluff, and camera-ready charm.",
      "Demo uses stock photography for layout only; your Wix Thomas photos drop straight into this route.",
    ],
  },
  {
    slug: "thomas-and-friends",
    title: "Thomas and Friends",
    summary: "Thomas with salon pals and client pups.",
    body: [
      "Friendship photos from the nearly cage-free floor — Thomas and the spa-day crew.",
      "Swap in your real group shots; keep captions short and joyful.",
    ],
  },
  {
    slug: "thomas-as-a-puppy",
    title: "Thomas as a Puppy",
    summary: "Flashback fluff from Thomas’s early days.",
    body: [
      "Puppy Thomas reminds every new client why early, positive grooming visits matter.",
      "Add your original puppy timeline photos here before launch.",
    ],
  },
];

export function getMore(slug: string) {
  return morePages.find((p) => p.slug === slug);
}
