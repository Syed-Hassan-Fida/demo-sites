import { site } from "./site";

export type GalleryCat = {
  slug: string;
  title: string;
  blurb: string;
  images: { src: string; alt: string }[];
};

const pool = [site.images.g1, site.images.g2, site.images.g3, site.images.g4, site.images.g5, site.images.g6];

function shots(title: string, offset = 0) {
  return [0, 1, 2, 3].map((i) => ({
    src: pool[(i + offset) % pool.length],
    alt: `${title} grooming finish placeholder ${i + 1} — swap for salon photos`,
  }));
}

export const galleryCategories: GalleryCat[] = [
  {
    slug: "color-me-pretty",
    title: "Color Me Pretty",
    blurb: "Creative color and pretty finishes from the salon gallery.",
    images: shots("Color Me Pretty", 0),
  },
  {
    slug: "spaniels",
    title: "Spaniels",
    blurb: "Cocker and spaniel coats — tidy, feathered, and show-ready looks.",
    images: shots("Spaniel", 1),
  },
  {
    slug: "poodles-bichons",
    title: "Poodles & Bichons",
    blurb: "Curl, scissor work, and classic lamb or puppy silhouettes.",
    images: shots("Poodle & Bichon", 2),
  },
  {
    slug: "small-breeds",
    title: "Small Breeds",
    blurb: "Compact companions with big personality finishes.",
    images: shots("Small breed", 3),
  },
  {
    slug: "terriers",
    title: "Terriers",
    blurb: "Hand-finish energy for wire and soft terrier coats.",
    images: shots("Terrier", 4),
  },
  {
    slug: "shih-tzu-lhasa-apso",
    title: "Shih Tzu & Lhasa Apso",
    blurb: "From flowing elegance to easy lifestyle clips.",
    images: shots("Shih Tzu & Lhasa", 5),
  },
  {
    slug: "doodles",
    title: "Doodles",
    blurb: "Oodles of doodle curls — length and lifestyle matched.",
    images: shots("Doodle", 0),
  },
  {
    slug: "others",
    title: "Others",
    blurb: "More breeds and mixes from the Groomingdale’s gallery.",
    images: shots("Other breed", 2),
  },
  {
    slug: "other-fun-pics",
    title: "Other Fun Pics",
    blurb: "Salon smiles, bows, and behind-the-scenes fun.",
    images: shots("Fun salon", 1),
  },
];

export function getGalleryCat(slug: string) {
  return galleryCategories.find((c) => c.slug === slug);
}
