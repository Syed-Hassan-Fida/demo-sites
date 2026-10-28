import type { Metadata } from "next";
import Link from "next/link";
import { site } from "../lib/site";

export const metadata: Metadata = {
  title: "Testimonials",
  description: `Happy clients of ${site.name} in North and South Austin.`,
  alternates: { canonical: "/testimonials" },
};

export default function TestimonialsPage() {
  return (
    <section className="wrap" style={{ paddingTop: "3rem" }}>
      <p className="section-kicker">Testimonials</p>
      <h1 className="section-title">Happy clients</h1>
      <p className="section-lead">Quotes adapted from the live testimonials page.</p>
      <div className="grid-2">
        {site.reviews.map((r) => (
          <blockquote
            key={r.who}
            style={{
              background: "var(--paper)",
              border: "1px solid var(--line)",
              borderRadius: "1rem",
              padding: "1.25rem 1.35rem",
            }}
          >
            <p style={{ color: "var(--ink)", marginBottom: "0.85rem" }}>“{r.quote}”</p>
            <p>
              <strong style={{ color: "var(--brand)" }}>{r.who}</strong>
              <span style={{ display: "block", color: "var(--muted)", fontSize: "0.88rem" }}>{r.meta}</span>
            </p>
          </blockquote>
        ))}
      </div>
      <p style={{ marginTop: "1.75rem" }}>
        <Link className="btn btn-primary" href="/book">Book your salon</Link>
      </p>
    </section>
  );
}
