import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "../components/ContactForm";
import { site } from "../lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact ${site.owner} at ${site.name} — text, email, Park Hill address & hours.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <section className="wrap page-hero">
      <p className="section-kicker">Contact</p>
      <h1 className="section-title">Reach Kiera directly</h1>
      <p className="section-lead">
        Independent groomer — not the Zen Den retail desk. Especially important while retail access
        may be closed.
      </p>
      <div className="grid-2" style={{ marginBottom: "1.75rem" }}>
        <article className="card">
          <p className="card-note">Direct</p>
          <p style={{ marginBottom: "0.35rem" }}>
            <a href={`tel:${site.phoneTel}`}>{site.phone}</a>
          </p>
          <p style={{ marginBottom: "0.35rem" }}>
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </p>
          <p style={{ marginTop: "0.75rem" }}>{site.address}</p>
          <p style={{ marginTop: "0.35rem" }}>{site.hours}</p>
          {site.nextdoor ? (
            <p style={{ marginTop: "0.75rem" }}>
              <a href={site.nextdoor} target="_blank" rel="noreferrer">
                Nextdoor · Magical Creatures Grooming
              </a>
            </p>
          ) : null}
        </article>
        <article className="card">
          <p className="card-note">Fastest</p>
          <h2 style={{ fontSize: "1.35rem", color: "var(--brand)", marginBottom: "0.5rem" }}>
            Text first
          </h2>
          <p style={{ marginBottom: "1rem" }}>
            Include dog name, breed, coat notes, and temperament. New clients welcome.
          </p>
          <a className="btn btn-primary" href={site.primaryCta.href}>
            {site.primaryCta.label}
          </a>
          <p style={{ marginTop: "0.85rem" }}>
            <Link href="/book" style={{ color: "var(--brand)", textDecoration: "underline" }}>
              Or use the booking form →
            </Link>
          </p>
        </article>
      </div>
      <ContactForm intent="contact" />
    </section>
  );
}
