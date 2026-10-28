import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { galleryCategories, getGalleryCat } from "../../lib/gallery";
import { site } from "../../lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return galleryCategories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cat = getGalleryCat(slug);
  if (!cat) return {};
  return {
    title: cat.title,
    description: cat.blurb,
    alternates: { canonical: `/gallery/${cat.slug}` },
  };
}

export default async function GalleryCategoryPage({ params }: Props) {
  const { slug } = await params;
  const cat = getGalleryCat(slug);
  if (!cat) notFound();

  return (
    <section className="wrap" style={{ paddingTop: "3rem" }}>
      <p className="section-kicker">Gallery</p>
      <h1 className="section-title">{cat.title}</h1>
      <p className="section-lead">{cat.blurb}</p>
      <div className="gallery">
        {cat.images.map((im) => (
          <div className="gallery-item" key={im.src + im.alt}>
            <Image src={im.src} alt={im.alt} fill sizes="(max-width:860px) 50vw, 25vw" />
          </div>
        ))}
      </div>
      <p style={{ marginTop: "1.5rem", display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
        <Link className="btn btn-ghost" href="/gallery">All albums</Link>
        <Link className="btn btn-primary" href="/book">Book {site.namePlain}</Link>
      </p>
    </section>
  );
}
