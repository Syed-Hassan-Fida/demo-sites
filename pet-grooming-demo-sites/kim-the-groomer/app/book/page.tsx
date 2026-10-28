import type { Metadata } from "next";
import { ContactForm } from "../components/ContactForm";
import { site } from "../lib/site";

export const metadata: Metadata = {
  title: "Book",
  description: `Request an appointment with ${site.name} / ${site.owner} in Denver.`,
  alternates: { canonical: "/book" },
};

export default function BookPage() {
  return (
    <section className="wrap page-hero">
      <p className="section-kicker">Book</p>
      <h1 className="section-title">Request an appointment</h1>
      <p className="section-lead">{site.bookLead}</p>
      <p style={{ marginBottom: "1.35rem", display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
        <a className="btn btn-primary" href={site.primaryCta.href}>
          {site.primaryCta.label}
        </a>
        <a className="btn btn-ghost" href={site.secondaryCta.href}>
          {site.secondaryCta.label}
        </a>
      </p>
      <article className="card" style={{ marginBottom: "1.5rem", maxWidth: "36rem" }}>
        <p className="card-note">Table</p>
        <h2 style={{ fontSize: "1.25rem", color: "var(--brand)", marginBottom: "0.4rem" }}>
          Zen Den space
        </h2>
        <p>{site.address}</p>
        <p style={{ marginTop: "0.5rem" }}>
          Confirm drop-off when you book — retail may be closed during building repair.
        </p>
      </article>
      <ContactForm intent="booking" />
    </section>
  );
}
