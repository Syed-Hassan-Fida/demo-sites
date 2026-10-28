import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { galleryCategories } from "../lib/gallery";
import { img } from "../lib/images";
import { site } from "../lib/site";

export const metadata: Metadata = {
  title: "Gallery",
  description: `Breed gallery albums from ${site.namePlain} — Color Me Pretty, Spaniels, Poodles, Doodles, and more.`,
  alternates: { canonical: "/gallery" },
};

export default function GalleryPage() {
  return (
    <section className="wrap" style={{ paddingTop: "3rem" }}>
      <p className="section-kicker">Gallery</p>
      <h1 className="section-title">Salon finishes by breed</h1>
      <p className="section-lead">
        Same album structure as the live site. Stock photography holds layout — swap your Wix gallery images before launch.
      </p>
      <div className="cat-grid" style={{ marginBottom: "2.5rem" }}>
        {galleryCategories.map((c) => (
          <Link className="cat-tile" key={c.slug} href={`/gallery/${c.slug}`}>
            <strong>{c.title}</strong>
            <span>{c.blurb}</span>
          </Link>
        ))}
      </div>
      <div className="gallery">
        {[img.g1, img.g2, img.g3, img.g4].map((src, i) => (
          <div className="gallery-item" key={src}>
            <Image src={src} alt={`Grooming portfolio placeholder ${i + 1}`} fill sizes="25vw" />
          </div>
        ))}
      </div>
    </section>
  );
}
