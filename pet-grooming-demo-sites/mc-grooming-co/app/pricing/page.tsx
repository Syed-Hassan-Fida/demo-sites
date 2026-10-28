import type { Metadata } from "next";
import Link from "next/link";
import { site } from "../lib/site";

export const metadata: Metadata = {
  title: "Pricing",
  description: `Quote-by-dog pricing for ${site.name}. Text Kiera with breed and coat notes.`,
  alternates: { canonical: "/pricing" },
};

export default function PricingPage() {
  return (
    <section className="wrap page-hero">
      <p className="section-kicker">Pricing</p>
      <h1 className="section-title">Honest quotes, not a guess menu</h1>
      <p className="section-lead">{site.pricingLead}</p>
      <div className="grid-3">
        {site.pricing.map((p) => (
          <article className="card" key={p.title}>
            <p className="card-note">{p.note}</p>
            <h2 style={{ fontSize: "1.4rem", color: "var(--brand)" }}>{p.title}</h2>
            <div className="price">{p.price}</div>
            <ul>
              {p.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
      {site.addons.length ? (
        <div style={{ marginTop: "2rem" }}>
          <h2 style={{ color: "var(--brand)", fontSize: "1.45rem", marginBottom: "0.85rem" }}>
            Also ask about
          </h2>
          <div className="grid-2">
            {site.addons.map((a) => (
              <article className="card" key={a.title}>
                <h3>{a.title}</h3>
                <p>{a.note}</p>
              </article>
            ))}
          </div>
        </div>
      ) : null}
      <p style={{ marginTop: "1.5rem" }}>
        <a className="btn btn-primary" href={site.primaryCta.href}>
          Text for a quote
        </a>
      </p>
      <p style={{ marginTop: "1rem" }}>
        <Link href="/faq" style={{ color: "var(--brand)", textDecoration: "underline" }}>
          Questions first? Read the FAQ
        </Link>
      </p>
    </section>
  );
}
