import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { img } from "../lib/images";
import { site } from "../lib/site";

export const metadata: Metadata = {
  title: "Gallery",
  description: `Grooming portfolio gallery for ${site.name}.`,
  alternates: { canonical: "/gallery" },
};

const shots = [
  { src: img.g1, alt: "Salon groom finish" },
  { src: img.g2, alt: "Fresh face after spa bath" },
  { src: img.g3, alt: "Hand finish detail" },
  { src: img.g4, alt: "Happy dog after groom" },
  { src: img.g5, alt: "Cat grooming care" },
  { src: img.spa, alt: "Calm spa portrait" },
  { src: img.hero, alt: "Luxury day-spa portrait" },
  { src: img.cat, alt: "Feline suite guest" },
];

export default function GalleryPage() {
  return (
    <section className="wrap" style={{ paddingTop: "3rem" }}>
      <p className="section-kicker">Portfolio</p>
      <h1 className="section-title">Gallery</h1>
      <p className="section-lead">
        Stock placeholders for layout. Before launch, swap in real finishes from your Squarespace
        gallery and Instagram @{site.instagram}.
      </p>
      <div className="gallery">
        {shots.map((s, i) => (
          <div className="gallery-item" key={`${s.src}-${i}`}>
            <Image src={s.src} alt={s.alt} fill sizes="(max-width:860px) 50vw, 33vw" />
          </div>
        ))}
      </div>
      <p style={{ marginTop: "1.5rem" }}>
        <a className="btn btn-ghost" href={site.instagramUrl} target="_blank" rel="noreferrer">
          Follow on Instagram
        </a>
      </p>
    </section>
  );
}
