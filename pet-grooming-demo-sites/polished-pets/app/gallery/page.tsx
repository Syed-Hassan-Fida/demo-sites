import type { Metadata } from "next";
import Image from "next/image";
import { img } from "../lib/images";
import { site } from "../lib/site";

export const metadata: Metadata = {
  title: "Gallery",
  description: `Mobile grooming portfolio for ${site.name} — cage-free van finishes in Denver & Boulder.`,
  alternates: { canonical: "/gallery" },
};

const shots = [
  { src: img.g1, alt: "Calm dog after mobile groom" },
  { src: img.g2, alt: "Bath and fluff dry detail" },
  { src: img.g3, alt: "Hand-finish coat care" },
  { src: img.g4, alt: "Happy dog after spa visit" },
  { src: img.g5, alt: "Outdoor pup portrait" },
  { src: img.g6, alt: "Grooming care close-up" },
];

export default function GalleryPage() {
  return (
    <section className="wrap" style={{ paddingTop: "3rem" }}>
      <p className="section-kicker">Portfolio</p>
      <h1 className="section-title">Gallery</h1>
      <p className="section-lead">
        Licensed stock placeholders for the demo layout. Before launch, swap in real van and client
        photos from Instagram{" "}
        <a href={site.instagramUrl} target="_blank" rel="noreferrer" style={{ color: "var(--brand)", textDecoration: "underline" }}>
          {site.instagram}
        </a>
        .
      </p>
      <div className="gallery">
        {shots.map((s, i) => (
          <div className="gallery-item" key={`${s.src}-${i}`}>
            <Image src={s.src} alt={s.alt} fill sizes="(max-width:860px) 50vw, 33vw" />
          </div>
        ))}
      </div>
      <p style={{ marginTop: "1.5rem" }}>
        <a className="btn btn-primary" href={site.instagramUrl} target="_blank" rel="noreferrer">
          Follow on Instagram
        </a>
      </p>
    </section>
  );
}
