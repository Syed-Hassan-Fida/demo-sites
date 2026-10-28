import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "../components/ContactForm";
import { site } from "../lib/site";

export const metadata: Metadata = {
  title: "Book",
  description: `Book a SWAGG mobile groom. Text ${site.phone} or request an appointment online.`,
  alternates: { canonical: "/book" },
};

export default function BookPage() {
  return (
    <section className="wrap" style={{ paddingTop: "3rem" }}>
      <p className="section-kicker">Book</p>
      <h1 className="section-title">Request a van appointment</h1>
      <p className="section-lead">{site.bookLead}</p>

      <div className="grid-2" style={{ marginBottom: "1.75rem" }}>
        <article className="card">
          <h2 style={{ fontSize: "1.25rem", color: "var(--brand)" }}>Call or text</h2>
          <div className="price" style={{ marginTop: "0.5rem" }}>
            <a href={`tel:${site.phoneTel}`}>{site.phone}</a>
          </div>
          <p>Fastest way to lock a route window — same number as the live site.</p>
        </article>
        <article className="card">
          <h2 style={{ fontSize: "1.25rem", color: "var(--brand)" }}>Know your size tier?</h2>
          <p style={{ marginTop: "0.5rem" }}>
            Full Groom starters: Small $85 · Medium $105 · Large $130 · XL $150 and up.
          </p>
          <p style={{ marginTop: "0.85rem" }}>
            <Link className="btn btn-ghost btn-nav" href="/pricing">
              Open pricing
            </Link>
          </p>
        </article>
      </div>

      <ContactForm intent="booking" />
    </section>
  );
}
