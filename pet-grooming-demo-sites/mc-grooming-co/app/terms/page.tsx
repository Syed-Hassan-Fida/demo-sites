import type { Metadata } from "next";
import { site } from "../lib/site";

export const metadata: Metadata = {
  title: "Terms",
  description: `Demo terms for ${site.name} — not legal advice; independent of Zen Den retail.`,
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <section className="wrap page-hero" style={{ maxWidth: "42rem" }}>
      <p className="section-kicker">Legal</p>
      <h1 className="section-title">Terms</h1>
      <p className="section-lead">Demo redesign terms — not legal advice.</p>
      <div className="card" style={{ display: "grid", gap: "0.85rem" }}>
        <p>
          This site is a redesign concept for <strong>{site.name}</strong> / {site.owner}. It is not
          Zen Den Pet Spa’s website. Grooming appointments are with {site.owner} as an independent
          business renting space.
        </p>
        <p>
          Service details, availability, and pricing are confirmed directly with {site.owner}. Stock
          photography and placeholder reviews are for demo layout only.
        </p>
        <p>
          Questions: <a href={`mailto:${site.email}`}>{site.email}</a> ·{" "}
          <a href={`tel:${site.phoneTel}`}>{site.phone}</a>
        </p>
      </div>
    </section>
  );
}
