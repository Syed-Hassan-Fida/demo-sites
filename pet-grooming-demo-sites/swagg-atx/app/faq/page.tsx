import type { Metadata } from "next";
import Link from "next/link";
import { site } from "../lib/site";

export const metadata: Metadata = {
  title: "FAQ",
  description: `Booking, hours, mobile vans, allergy-aware care, and pricing questions for ${site.name}.`,
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  return (
    <section className="wrap" style={{ paddingTop: "3rem" }}>
      <p className="section-kicker">FAQ</p>
      <h1 className="section-title">Common questions</h1>
      <p className="section-lead">
        Straight answers for busy Austin pet parents. Still unsure? Text{" "}
        <a href={`tel:${site.phoneTel}`} style={{ color: "var(--brand)", textDecoration: "underline" }}>
          {site.phone}
        </a>
        .
      </p>
      <div className="faq">
        {site.faqs.map((f) => (
          <details key={f.q}>
            <summary>{f.q}</summary>
            <p>{f.a}</p>
          </details>
        ))}
      </div>
      <p style={{ marginTop: "1.75rem", display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
        <Link className="btn btn-primary" href="/book">
          Request a stop
        </Link>
        <Link className="btn btn-ghost" href="/pricing">
          See rates
        </Link>
      </p>
    </section>
  );
}
