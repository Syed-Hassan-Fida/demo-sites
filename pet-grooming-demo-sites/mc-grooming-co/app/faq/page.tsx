import type { Metadata } from "next";
import Link from "next/link";
import { site } from "../lib/site";

export const metadata: Metadata = {
  title: "FAQ",
  description: `FAQ for ${site.name} — booking, Zen Den vs independent, retail closure, one-on-one care.`,
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  return (
    <section className="wrap page-hero faq">
      <p className="section-kicker">FAQ</p>
      <h1 className="section-title">Straight answers</h1>
      <p className="section-lead">
        Especially useful while Zen Den retail access may be limited — book the groomer, not the
        shop desk.
      </p>
      {site.faqs.map((f) => (
        <details key={f.q}>
          <summary>{f.q}</summary>
          <p>{f.a}</p>
        </details>
      ))}
      <p style={{ marginTop: "1.5rem", display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
        <Link className="btn btn-primary" href="/book">
          Still need help? Book or ask
        </Link>
        <a className="btn btn-ghost" href={site.primaryCta.href}>
          {site.primaryCta.label}
        </a>
      </p>
    </section>
  );
}
