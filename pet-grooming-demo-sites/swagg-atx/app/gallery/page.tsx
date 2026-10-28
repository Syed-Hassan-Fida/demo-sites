import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { img } from "../lib/images";
import { site } from "../lib/site";

export const metadata: Metadata = {
  title: "Gallery",
  description: `Grooming portfolio for ${site.name} — mobile spa finishes in Austin. Stock placeholders until real photos swap in.`,
  alternates: { canonical: "/gallery" },
};

const shots = [
  { src: img.g1, alt: "Freshly groomed dog portrait" },
  { src: img.g2, alt: "Calm dog during grooming care" },
  { src: img.g3, alt: "Pet spa bath finish" },
  { src: img.g4, alt: "Happy dog after groom" },
  { src: img.g5, alt: "Styled coat close-up" },
  { src: img.g6, alt: "Playful dog outdoors after spa day" },
];

export default function GalleryPage() {
  return (
    <section className="wrap" style={{ paddingTop: "3rem" }}>
      <p className="section-kicker">Gallery</p>
      <h1 className="section-title">SWAGG finishes</h1>
      <p className="section-lead">
        Portfolio layout for the pitch — replace with real van and client photos from{" "}
        {site.instagram} before launch.
      </p>
      <div className="gallery">
        {shots.map((s) => (
          <div className="gallery-item" key={s.src}>
            <Image src={s.src} alt={s.alt} fill sizes="(max-width: 860px) 50vw, 33vw" />
          </div>
        ))}
      </div>
      <p style={{ marginTop: "1.75rem" }}>
        <Link className="btn btn-primary" href="/book">
          Book your pup’s turn
        </Link>
      </p>
    </section>
  );
}
