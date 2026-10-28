import type { Metadata } from "next";
import Link from "next/link";
import { site } from "../lib/site";

export const metadata: Metadata = {
  title: "FAQ",
  description: `Mobile grooming FAQs for ${site.name} — van tours, vaccines, fleas, office grooms, tipping, and more.`,
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  return (
    <section className="wrap faq" style={{ paddingTop: "3rem" }}>
      <p className="section-kicker">FAQ</p>
      <h1 className="section-title">Mobile grooming answers</h1>
      <p className="section-lead">
        Straight answers from Polished Pets’ live FAQ — prep, app updates, van tours, office grooms,
        and cage-free care.
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
        <Link className="btn btn-ghost" href="/service-area">
          Service area
        </Link>
      </p>
    </section>
  );
}
