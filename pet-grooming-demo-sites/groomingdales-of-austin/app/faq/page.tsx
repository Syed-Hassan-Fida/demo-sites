import type { Metadata } from "next";
import Link from "next/link";
import { site } from "../lib/site";

export const metadata: Metadata = {
  title: "FAQ",
  description: `Frequently asked questions for ${site.namePlain}.`,
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  return (
    <section className="wrap faq" style={{ paddingTop: "3rem" }}>
      <p className="section-kicker">FAQ</p>
      <h1 className="section-title">Common questions</h1>
      <p className="section-lead">Straight answers from the salon — booking, spa-day flow, shedding, cats, and more.</p>
      {site.faqs.map((f) => (
        <details key={f.q}>
          <summary>{f.q}</summary>
          <p>{f.a}</p>
        </details>
      ))}
      <p style={{ marginTop: "1.5rem" }}>
        <Link className="btn btn-primary" href="/book">Still need help? Book or ask</Link>
      </p>
    </section>
  );
}
