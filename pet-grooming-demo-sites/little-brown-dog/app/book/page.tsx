import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "../components/ContactForm";
import { site } from "../lib/site";

export const metadata: Metadata = {
  title: "Book",
  description: `Request an appointment with ${site.name} — call, text, or email the Navajo Street studio.`,
  alternates: { canonical: "/book" },
};

export default function BookPage() {
  return (
    <section className="wrap" style={{ paddingTop: "3rem", paddingBottom: "4rem" }}>
      <p className="section-kicker">Book</p>
      <h1 className="section-title">Request an appointment</h1>
      <p className="section-lead">{site.bookLead}</p>

      <div className="grid-2" style={{ marginBottom: "1.75rem" }}>
        <article className="card">
          <h2 style={{ fontSize: "1.25rem", color: "var(--brand)" }}>Fastest path</h2>
          <p style={{ margin: "0.65rem 0 1rem" }}>Call or text the studio — same number for both.</p>
          <a className="btn btn-primary" href={site.primaryCta.href}>{site.primaryCta.label}</a>
        </article>
        <article className="card">
          <h2 style={{ fontSize: "1.25rem", color: "var(--brand)" }}>Studio</h2>
          <p>{site.address}</p>
          <p style={{ marginTop: "0.35rem" }}>{site.hours}</p>
          <p style={{ marginTop: "0.65rem" }}>
            <Link href="/policies">Review shop policies</Link> before your first visit.
          </p>
        </article>
      </div>

      <h2 className="section-title" style={{ fontSize: "1.8rem" }}>Or send a request</h2>
      <ContactForm intent="booking" />
    </section>
  );
}
