import type { Metadata } from "next";
import Image from "next/image";
import { img } from "../lib/images";
import { site } from "../lib/site";

export const metadata: Metadata = {
  title: "Gallery",
  description: `Portfolio gallery for ${site.name}.`,
  alternates: { canonical: "/gallery" },
};

const shots = [
  { src: img.g1, alt: "Salon groom finish" },
  { src: img.g2, alt: "Bath and fluff dry" },
  { src: img.g3, alt: "Hand finish detail" },
  { src: img.g4, alt: "Happy dog after groom" },
  { src: img.hero, alt: "Grooming portrait" },
  { src: img.g2, alt: "Coat care detail" },
];

export default function GalleryPage() {
  return (
    <section className="wrap" style={{ paddingTop: "3rem" }}>
      <p className="section-kicker">Portfolio</p>
      <h1 className="section-title">Gallery</h1>
      <p className="section-lead">
        Licensed stock placeholders for the demo. Before launch, swap in {site.name}’s real client photos
        {site.instagram ? <> (also on Instagram {String(site.instagram)})</> : null}.
      </p>
      <div className="gallery">
        {shots.map((s, i) => (
          <div className="gallery-item" key={`${s.src}-${i}`}>
            <Image src={s.src} alt={s.alt} fill sizes="(max-width:860px) 50vw, 25vw" />
          </div>
        ))}
      </div>
    </section>
  );
}
