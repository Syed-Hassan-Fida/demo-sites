import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "../components/ContactForm";
import { site } from "../lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact ${site.legalName} / ${site.name} at 3280 N Downing, Denver. Call or text 720-394-3917.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <section className="wrap" style={{ paddingTop: "3rem" }}>
      <p className="section-kicker">Contact</p>
      <h1 className="section-title">Crystal’s Grooming</h1>
      <p className="section-lead">
        Exceptional one-on-one care for every pet — including dogs labeled difficult,
        misunderstood, or aggressive. They need the right patience, love, and understanding.
        Calling or texting is best!
      </p>

      <div className="grid-2" style={{ marginBottom: "1.75rem" }}>
        <article className="card">
          <h2 style={{ fontSize: "1.25rem", color: "var(--brand)" }}>Reach Crystal</h2>
          <p style={{ marginTop: "0.5rem" }}>
            <a href={`tel:${site.phoneTel}`}>{site.phone}</a>
          </p>
          <p>
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </p>
          <p style={{ marginTop: "0.75rem" }}>{site.address}</p>
          <p style={{ marginTop: "0.75rem" }}>
            <a href={site.instagramUrl} target="_blank" rel="noreferrer">
              {site.instagram}
            </a>
            {" · "}
            <a href={site.facebook} target="_blank" rel="noreferrer">
              Facebook
            </a>
          </p>
          <p style={{ marginTop: "1rem" }}>
            <a className="btn btn-primary" href={site.primaryCta.href}>
              {site.primaryCta.label}
            </a>
          </p>
        </article>
        <article className="card">
          <h2 style={{ fontSize: "1.25rem", color: "var(--brand)" }}>Booking policy</h2>
          <p style={{ marginTop: "0.5rem" }}>{site.policyBanner}</p>
          <p style={{ marginTop: "0.75rem" }}>
            Payments accepted: {site.payments.join(", ")}.
          </p>
          <p style={{ marginTop: "0.75rem" }}>
            <Link href="/book" style={{ textDecoration: "underline" }}>
              Go to booking request
            </Link>
          </p>
        </article>
      </div>

      <h2 className="section-title" style={{ fontSize: "1.7rem" }}>
        Send a message
      </h2>
      <ContactForm intent="contact" />
    </section>
  );
}
