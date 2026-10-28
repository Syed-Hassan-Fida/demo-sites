import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { img } from "../lib/images";
import { site } from "../lib/site";

export const metadata: Metadata = {
  title: "Gallery",
  description: `Portfolio placeholders for ${site.name} — swap in real Magical Creatures finishes.`,
  alternates: { canonical: "/gallery" },
};

const shots = [
  { src: img.g1, alt: "Portfolio placeholder 1 — calm companion portrait" },
  { src: img.g2, alt: "Portfolio placeholder 2 — soft coat finish" },
  { src: img.g3, alt: "Portfolio placeholder 3 — table-ready groom" },
  { src: img.g4, alt: "Portfolio placeholder 4 — spa bath moment" },
  { src: img.g5, alt: "Portfolio placeholder 5 — outdoor neighborhood pup" },
  { src: img.g6, alt: "Portfolio placeholder 6 — close affectionate finish" },
];

export default function GalleryPage() {
  return (
    <section className="wrap page-hero">
      <p className="section-kicker">Gallery</p>
      <h1 className="section-title">Creature finishes</h1>
      <p className="section-lead">
        Stock images for demo layout only. Before launch, replace with Kiera’s real before/afters
        from Magical Creatures / MC Grooming Co.
      </p>
      <div className="gallery">
        {shots.map((s) => (
          <div className="gallery-item" key={s.src}>
            <Image src={s.src} alt={s.alt} fill sizes="(max-width: 859px) 50vw, 33vw" />
          </div>
        ))}
      </div>
      <p style={{ marginTop: "1.5rem" }}>
        <Link className="btn btn-primary" href="/book">
          Book a finish
        </Link>
      </p>
    </section>
  );
}
