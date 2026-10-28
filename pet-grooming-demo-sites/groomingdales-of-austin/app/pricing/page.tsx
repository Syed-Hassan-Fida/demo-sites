import type { Metadata } from "next";
import Link from "next/link";
import { site } from "../lib/site";

export const metadata: Metadata = {
  title: "Pricing",
  description: `Service package ranges and nail trim pricing for ${site.namePlain}.`,
  alternates: { canonical: "/pricing" },
};

export default function PricingPage() {
  return (
    <section className="wrap" style={{ paddingTop: "3rem" }}>
      <p className="section-kicker">Pricing</p>
      <h1 className="section-title">Clear starting points</h1>
      <p className="section-lead">{site.pricingLead}</p>
      <div className="grid-3">
        {site.pricing.map((p) => (
          <article className="card" key={p.title}>
            <p className="section-kicker" style={{ marginBottom: "0.35rem" }}>{p.note}</p>
            <h2 style={{ fontSize: "1.45rem", color: "var(--rose)" }}>{p.title}</h2>
            <div className="price">{p.price}</div>
            <ul>
              {p.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
      <div className="card" style={{ marginTop: "1.75rem" }}>
        <h2 style={{ color: "var(--rose)", fontSize: "1.25rem", marginBottom: "0.5rem" }}>Nail trim loyalty</h2>
        <p>Purchase 7 nail trims and the 8th is free — must be used within one year of purchase.</p>
        <p style={{ marginTop: "0.5rem" }}>{site.nailWalkIn}</p>
      </div>
      <p style={{ marginTop: "1.5rem" }}>
        <Link className="btn btn-primary" href="/book">Request an estimate</Link>
      </p>
    </section>
  );
}
