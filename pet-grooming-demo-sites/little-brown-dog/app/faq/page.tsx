import type { Metadata } from "next";
import Link from "next/link";
import { site } from "../lib/site";

export const metadata: Metadata = {
  title: "FAQ",
  description: `Frequently asked questions for ${site.name} — booking, hours, towel-free grooming, text opt-in.`,
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  return (
    <section className="wrap faq" style={{ paddingTop: "3rem", paddingBottom: "4rem" }}>
      <p className="section-kicker">FAQ</p>
      <h1 className="section-title">Common questions</h1>
      <p className="section-lead">
        Straight answers from the live studio FAQ and shop notes — so booking feels as clear as the portraits.
      </p>
      {site.faqs.map((f) => (
        <details key={f.q}>
          <summary>{f.q}</summary>
          <p>{f.a}</p>
        </details>
      ))}
      <p style={{ marginTop: "1.5rem", display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
        <Link className="btn btn-primary" href="/book">Still need help? Book or ask</Link>
        <Link className="btn btn-ghost" href="/policies">Shop policies</Link>
      </p>
    </section>
  );
}
