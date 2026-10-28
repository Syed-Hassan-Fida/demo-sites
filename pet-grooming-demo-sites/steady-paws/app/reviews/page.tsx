import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "../components/Reveal";
import { site } from "../lib/site";

export const metadata: Metadata = {
  title: "Reviews",
  description: `Client reviews for ${site.name} / ${site.legalName} in Denver.`,
  alternates: { canonical: "/reviews" },
};

export default function ReviewsPage() {
  return (
    <section className="wrap" style={{ paddingTop: "3rem" }}>
      <Reveal>
        <p className="section-kicker">Reviews</p>
        <h1 className="section-title">What pet parents say</h1>
        <p className="section-lead">
          Real words from Crystal’s clients — including big dogs, doodles, and pups who needed extra
          patience.
        </p>
      </Reveal>
      <div className="grid-2">
        {site.reviews.map((r) => (
          <Reveal key={r.who + r.quote.slice(0, 12)}>
            <article className="card">
              <p style={{ color: "var(--accent)", letterSpacing: "0.12em" }}>★★★★★</p>
              <p style={{ margin: "0.75rem 0", color: "var(--ink)" }}>“{r.quote}”</p>
              <p>
                <strong style={{ color: "var(--brand)" }}>{r.who}</strong>
              </p>
            </article>
          </Reveal>
        ))}
      </div>
      <p style={{ marginTop: "1.5rem", display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
        <a className="btn btn-primary" href={site.primaryCta.href}>
          {site.primaryCta.label}
        </a>
        <Link className="btn btn-ghost" href="/book">
          Request a spot
        </Link>
      </p>
    </section>
  );
}
