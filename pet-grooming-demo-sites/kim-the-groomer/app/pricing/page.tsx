import type { Metadata } from "next";
import Link from "next/link";
import { site } from "../lib/site";

export const metadata: Metadata = {
  title: "Pricing",
  description: `Quote-led pricing for ${site.name} — full groom, bath visits, and detail work in Denver.`,
  alternates: { canonical: "/pricing" },
};

export default function PricingPage() {
  return (
    <section className="wrap page-hero">
      <p className="section-kicker">Pricing</p>
      <h1 className="section-title">Packages & quotes</h1>
      <p className="section-lead">{site.pricingLead}</p>
      <div className="grid-3">
        {site.pricing.map((p) => (
          <article className="card" key={p.title}>
            <p className="card-note">{p.note}</p>
            <h2 style={{ fontSize: "1.35rem", color: "var(--brand)" }}>{p.title}</h2>
            <div className="price">{p.price}</div>
            {p.items?.length ? (
              <ul>
                {p.items.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            ) : null}
          </article>
        ))}
      </div>
      <p style={{ marginTop: "1.75rem" }}>
        <Link className="btn btn-primary" href="/book">
          Ask for a quote
        </Link>
      </p>
    </section>
  );
}
