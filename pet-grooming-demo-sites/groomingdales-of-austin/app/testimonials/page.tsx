import type { Metadata } from "next";
import Link from "next/link";
import { site } from "../lib/site";

export const metadata: Metadata = {
  title: "Testimonials",
  description: `Client reviews for ${site.namePlain}, including Megan K. and Lauren L.`,
  alternates: { canonical: "/testimonials" },
};

export default function TestimonialsPage() {
  const all = [...site.reviews, ...site.moreReviews];
  return (
    <section className="wrap" style={{ paddingTop: "3rem" }}>
      <p className="section-kicker">Testimonials</p>
      <h1 className="section-title">Paw-some words from clients</h1>
      <p className="section-lead">Real reviews from the live site — including Megan K. and Lauren L.</p>
      <div className="grid-2">
        {all.map((r) => (
          <article className="card" key={r.who + r.quote.slice(0, 24)}>
            <p style={{ color: "var(--pink-deep)", letterSpacing: "0.12em" }}>★★★★★</p>
            <p style={{ margin: "0.75rem 0", color: "var(--ink)" }}>“{r.quote}”</p>
            <p><strong style={{ color: "var(--rose)" }}>{r.who}</strong></p>
          </article>
        ))}
      </div>
      <p style={{ marginTop: "1.5rem" }}>
        <Link className="btn btn-primary" href="/book">Book your spa day</Link>
      </p>
    </section>
  );
}
