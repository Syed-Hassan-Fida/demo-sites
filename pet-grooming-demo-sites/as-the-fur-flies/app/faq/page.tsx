import type { Metadata } from "next";
import Link from "next/link";
import { site } from "../lib/site";

export const metadata: Metadata = {
  title: "Policies & FAQs",
  description: `Rabies, cancellations, cats, pickup, and booking policies for ${site.name}.`,
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  return (
    <section className="wrap faq" style={{ paddingTop: "3rem" }}>
      <p className="section-kicker">Policies &amp; FAQs</p>
      <h1 className="section-title">Common questions</h1>
      <p className="section-lead">
        Straight answers adapted from the live Policies &amp; FAQs page — especially dual-salon booking,
        rabies proof, and pickup timing.
      </p>
      {site.faqs.map((f) => (
        <details key={f.q}>
          <summary>{f.q}</summary>
          <p>{f.a}</p>
        </details>
      ))}
      <p style={{ marginTop: "1.5rem", display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
        <Link className="btn btn-primary" href="/book">Book or ask</Link>
        <Link className="btn btn-ghost" href="/terms">Terms</Link>
      </p>
    </section>
  );
}
