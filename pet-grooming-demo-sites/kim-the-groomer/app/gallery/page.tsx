import type { Metadata } from "next";
import Image from "next/image";
import { img } from "../lib/images";
import { site } from "../lib/site";

export const metadata: Metadata = {
  title: "Gallery",
  description: `Portfolio gallery for ${site.name} — presentation finishes from the Oneida Street table.`,
  alternates: { canonical: "/gallery" },
};

const shots = [
  { src: img.g1, alt: "Polished coat finish after professional groom" },
  { src: img.g2, alt: "Confident dog portrait after salon styling" },
  { src: img.g3, alt: "Freshly bathed dog with soft coat" },
  { src: img.g4, alt: "Hand-finish detail on the grooming table" },
  { src: img.g5, alt: "Happy dog after spa care" },
  { src: img.g6, alt: "Clean, well-presented companion after grooming" },
];

export default function GalleryPage() {
  return (
    <section className="wrap page-hero">
      <p className="section-kicker">Portfolio</p>
      <h1 className="section-title">Gallery</h1>
      <p className="section-lead">
        Licensed stock placeholders for the demo layout. Before launch, swap in {site.name}’s real
        client photos from the table.
      </p>
      <div className="gallery">
        {shots.map((s, i) => (
          <div className="gallery-item" key={`${s.src}-${i}`}>
            <Image src={s.src} alt={s.alt} fill sizes="(max-width:860px) 50vw, 33vw" />
          </div>
        ))}
      </div>
    </section>
  );
}
