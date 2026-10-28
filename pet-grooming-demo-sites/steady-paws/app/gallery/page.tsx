import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { img } from "../lib/images";
import { site } from "../lib/site";

export const metadata: Metadata = {
  title: "Gallery",
  description: `Portfolio gallery for ${site.name}. Swap stock placeholders for Crystal’s real client photos before launch.`,
  alternates: { canonical: "/gallery" },
};

const shots = [
  { src: img.g5, alt: "Calm outdoor dog portrait — gallery placeholder" },
  { src: img.g1, alt: "Salon bath finish — gallery placeholder" },
  { src: img.g2, alt: "Soft coat finish — gallery placeholder" },
  { src: img.g3, alt: "Gentle hand finish — gallery placeholder" },
  { src: img.g4, alt: "Relaxed dog after groom — gallery placeholder" },
  { src: img.g6, alt: "Senior dog soft portrait — gallery placeholder" },
];

export default function GalleryPage() {
  return (
    <section className="wrap" style={{ paddingTop: "3rem" }}>
      <p className="section-kicker">Portfolio</p>
      <h1 className="section-title">Gallery</h1>
      <p className="section-lead">
        Licensed stock placeholders for the demo. Before launch, swap in {site.name}’s real client
        photos (also on Instagram{" "}
        <a href={site.instagramUrl} target="_blank" rel="noreferrer" style={{ textDecoration: "underline" }}>
          {site.instagram}
        </a>
        ).
      </p>
      <div className="gallery">
        {shots.map((s, i) => (
          <div className="gallery-item" key={`${s.src}-${i}`}>
            <Image src={s.src} alt={s.alt} fill sizes="(max-width:860px) 50vw, 25vw" />
          </div>
        ))}
      </div>
      <p style={{ marginTop: "1.5rem" }}>
        <Link className="btn btn-primary" href="/book">
          Book a groom
        </Link>
      </p>
    </section>
  );
}
