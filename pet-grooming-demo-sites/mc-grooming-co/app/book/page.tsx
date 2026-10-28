import type { Metadata } from "next";
import { ContactForm } from "../components/ContactForm";
import { site } from "../lib/site";

export const metadata: Metadata = {
  title: "Book",
  description: `Request an appointment with ${site.owner} at ${site.name}. Text-first booking in Park Hill.`,
  alternates: { canonical: "/book" },
};

export default function BookPage() {
  const locations = site.locations;

  return (
    <section className="wrap page-hero">
      <p className="section-kicker">Book</p>
      <h1 className="section-title">Request an appointment</h1>
      <p className="section-lead">{site.bookLead}</p>
      <p style={{ marginBottom: "1.25rem", display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
        <a className="btn btn-primary" href={site.primaryCta.href}>
          {site.primaryCta.label}
        </a>
        <a className="btn btn-ghost" href={`mailto:${site.email}`}>
          Email {site.email}
        </a>
      </p>
      {locations.length ? (
        <div className="grid-2" style={{ marginBottom: "1.5rem" }}>
          {locations.map((l) => (
            <article className="card" key={l.name}>
              <h2 style={{ fontSize: "1.25rem", color: "var(--brand)" }}>{l.name}</h2>
              <p>{l.address}</p>
              <p>
                <a href={`tel:${l.phoneTel}`}>{l.phone}</a>
              </p>
              {l.email ? (
                <p>
                  <a href={`mailto:${l.email}`}>{l.email}</a>
                </p>
              ) : null}
              {l.hours ? <p style={{ marginTop: "0.5rem" }}>{l.hours}</p> : null}
            </article>
          ))}
        </div>
      ) : null}
      <ContactForm intent="booking" />
    </section>
  );
}
