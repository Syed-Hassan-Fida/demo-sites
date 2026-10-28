import type { Metadata } from "next";
import Link from "next/link";
import { site } from "../lib/site";

export const metadata: Metadata = {
  title: "Pricing",
  description: `Pricing and services for ${site.name} — starting rates confirmed at drop-off.`,
  alternates: { canonical: "/pricing" },
};

export default function PricingPage() {
  return (
    <section className="wrap" style={{ paddingTop: "3rem" }}>
      <p className="section-kicker">Pricing</p>
      <h1 className="section-title">Pricing and services</h1>
      <p className="section-lead">{site.pricingLead}</p>
      <p className="warning-note" style={{ marginBottom: "1.75rem", maxWidth: "48rem" }}>
        Online booking shows a baseline. At drop-off we discuss the haircut, coat condition and type,
        behavior, specialty shampoos, and allergies — then confirm a more accurate price. Sales tax
        applies under Texas law.
      </p>
      <div className="grid-3">
        {site.pricing.map((p) => (
          <article className="card" key={p.title}>
            <h2 style={{ fontSize: "1.35rem", color: "var(--brand)" }}>{p.title}</h2>
            <div className="price">{p.price}</div>
            <p>{p.note}</p>
            {p.items?.length ? <ul>{p.items.map((i) => <li key={i}>{i}</li>)}</ul> : null}
          </article>
        ))}
      </div>
      <h2 className="section-title" style={{ marginTop: "2.5rem", fontSize: "1.8rem" }}>Additional fees</h2>
      <div className="grid-2">
        {site.addons.map((a) => (
          <article className="card" key={a.title}>
            <h3>{a.title}</h3>
            <div className="price">{a.price}</div>
            <p>{a.blurb}</p>
          </article>
        ))}
      </div>
      <p style={{ marginTop: "1.5rem", color: "var(--muted)" }}>
        Feline menu with published starting prices lives on{" "}
        <Link href="/cats" style={{ color: "var(--brand)", textDecoration: "underline" }}>Cat care</Link>.
      </p>
      <p style={{ marginTop: "1.5rem", display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
        <Link className="btn btn-primary" href="/book">Book a salon</Link>
        <Link className="btn btn-ghost" href="/faq">Policies &amp; FAQs</Link>
      </p>
    </section>
  );
}
