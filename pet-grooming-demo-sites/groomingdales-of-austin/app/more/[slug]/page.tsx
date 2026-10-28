import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { img } from "../../lib/images";
import { getMore, morePages } from "../../lib/more";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return morePages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = getMore(slug);
  if (!page) return {};
  return {
    title: page.title,
    description: page.summary,
    alternates: { canonical: `/more/${page.slug}` },
  };
}

export default async function MoreArticlePage({ params }: Props) {
  const { slug } = await params;
  const page = getMore(slug);
  if (!page) notFound();

  const isThomas = page.slug.includes("thomas");

  return (
    <section className="wrap" style={{ paddingTop: "3rem" }}>
      <p className="section-kicker">More</p>
      <h1 className="section-title">{page.title}</h1>
      <p className="section-lead">{page.summary}</p>
      <div className="prose">
        {page.body.map((para) => (
          <p key={para.slice(0, 48)}>{para}</p>
        ))}
      </div>
      {isThomas ? (
        <div className="gallery" style={{ marginTop: "1.75rem" }}>
          {[img.g2, img.g5, img.g3, img.g6].map((src, i) => (
            <div className="gallery-item" key={src}>
              <Image src={src} alt={`Thomas album placeholder ${i + 1}`} fill sizes="25vw" />
            </div>
          ))}
        </div>
      ) : null}
      <p style={{ marginTop: "1.75rem", display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
        <Link className="btn btn-ghost" href="/more">More hub</Link>
        <Link className="btn btn-primary" href="/book">Book Now</Link>
      </p>
    </section>
  );
}
