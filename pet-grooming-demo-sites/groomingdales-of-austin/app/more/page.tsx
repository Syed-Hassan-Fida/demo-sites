import type { Metadata } from "next";
import Link from "next/link";
import { morePages } from "../lib/more";
import { site } from "../lib/site";

export const metadata: Metadata = {
  title: "More",
  description: `Fun pages, Thomas albums, and local favorites from ${site.namePlain}.`,
  alternates: { canonical: "/more" },
};

export default function MoreHubPage() {
  return (
    <section className="wrap" style={{ paddingTop: "3rem" }}>
      <p className="section-kicker">More</p>
      <h1 className="section-title">Extras from the salon</h1>
      <p className="section-lead">
        Fun parent pages, Austin locals notes, products, and Thomas albums — restored from the live More menu.
      </p>
      <div className="cat-grid">
        <Link className="cat-tile" href="/products">
          <strong>Products</strong>
          <span>Shop recommendations and in-salon favorites.</span>
        </Link>
        <Link className="cat-tile" href="/gallery">
          <strong>Gallery</strong>
          <span>Breed albums and fun pics.</span>
        </Link>
        {morePages.map((p) => (
          <Link className="cat-tile" key={p.slug} href={`/more/${p.slug}`}>
            <strong>{p.title}</strong>
            <span>{p.summary}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
