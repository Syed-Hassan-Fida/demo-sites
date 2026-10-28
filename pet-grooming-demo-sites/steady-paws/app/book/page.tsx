import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "../components/ContactForm";
import { site } from "../lib/site";

export const metadata: Metadata = {
  title: "Book",
  description: `Book with Crystal at ${site.name}. Call/text preferred. 24-hour notice; 50% late cancel / no-show.`,
  alternates: { canonical: "/book" },
};

export default function BookPage() {
  return (
    <section className="wrap" style={{ paddingTop: "3rem" }}>
      <p className="section-kicker">Book</p>
      <h1 className="section-title">Request an appointment</h1>
      <p className="section-lead">{site.bookLead}</p>

      <div className="grid-2" style={{ marginBottom: "1.75rem" }}>
        <article className="card">
          <h2 style={{ fontSize: "1.25rem", color: "var(--brand)" }}>Fastest path</h2>
          <p style={{ margin: "0.5rem 0 1rem" }}>
            Calling or texting is best — Crystal can ask temperament and coat questions up front.
          </p>
          <a className="btn btn-primary" href={site.primaryCta.href}>
            {site.primaryCta.label}
          </a>
          <p style={{ marginTop: "0.85rem" }}>
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </p>
        </article>
        <article className="card">
          <h2 style={{ fontSize: "1.25rem", color: "var(--brand)" }}>Salon</h2>
          <p>{site.address}</p>
          <p style={{ marginTop: "0.65rem" }}>{site.policyBanner}</p>
          <p style={{ marginTop: "0.85rem" }}>
            <Link href="/faq" style={{ textDecoration: "underline" }}>
              Full FAQ
            </Link>
          </p>
        </article>
      </div>

      <h2 className="section-title" style={{ fontSize: "1.7rem" }}>
        Or send a request
      </h2>
      <p className="section-lead">
        Include breed and temperament notes so Crystal can plan enough time for anxious or
        special-needs dogs.
      </p>
      <ContactForm intent="booking" />
    </section>
  );
}
