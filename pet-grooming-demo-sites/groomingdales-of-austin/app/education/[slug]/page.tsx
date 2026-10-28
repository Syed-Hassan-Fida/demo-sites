import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { educationPages, getEducation } from "../../lib/education";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return educationPages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = getEducation(slug);
  if (!page) return {};
  return {
    title: page.title,
    description: page.summary,
    alternates: { canonical: `/education/${page.slug}` },
  };
}

export default async function EducationArticlePage({ params }: Props) {
  const { slug } = await params;
  const page = getEducation(slug);
  if (!page) notFound();

  const related =
    page.slug === "doodle-information"
      ? educationPages.filter((p) => p.group === "doodle" && p.slug !== page.slug)
      : page.slug === "breeds"
        ? educationPages.filter((p) => p.group === "breeds")
        : [];

  return (
    <section className="wrap" style={{ paddingTop: "3rem" }}>
      <p className="section-kicker">Education</p>
      <h1 className="section-title">{page.title}</h1>
      <p className="section-lead">{page.summary}</p>
      <div className="prose">
        {page.body.map((para) => (
          <p key={para.slice(0, 48)}>{para}</p>
        ))}
      </div>
      {related.length ? (
        <div style={{ marginTop: "2rem" }}>
          <h2 style={{ color: "var(--rose)", fontSize: "1.35rem", marginBottom: "0.85rem" }}>Keep reading</h2>
          <div className="cat-grid">
            {related.map((p) => (
              <Link className="cat-tile" key={p.slug} href={`/education/${p.slug}`}>
                <strong>{p.title}</strong>
                <span>{p.summary}</span>
              </Link>
            ))}
          </div>
        </div>
      ) : null}
      <p style={{ marginTop: "1.75rem", display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
        <Link className="btn btn-ghost" href="/education">All education</Link>
        <Link className="btn btn-primary" href="/book">Book Now</Link>
      </p>
    </section>
  );
}
