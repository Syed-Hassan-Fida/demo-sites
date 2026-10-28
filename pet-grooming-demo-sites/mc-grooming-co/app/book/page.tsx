import type { Metadata } from "next";
import { ContactForm } from "../components/ContactForm";
import { site } from "../lib/site";

export const metadata: Metadata = {
  title: "Book",
  description: `Request an appointment with ${site.name}.`,
  alternates: { canonical: "/book" },
};

type Location = {
  name: string;
  address: string;
  phone: string;
  phoneTel: string;
  email?: string;
  hours?: string;
};

export default function BookPage() {
  const locations = ((site as { locations?: Location[] }).locations || []).filter(Boolean);

  return (
    <section className="wrap" style={{ paddingTop: "3rem" }}>
      <p className="section-kicker">Book</p>
      <h1 className="section-title">Request an appointment</h1>
      <p className="section-lead">{site.bookLead}</p>
      <p style={{ marginBottom: "1.25rem" }}>
        Prefer faster?{" "}
        <a className="btn btn-primary" href={site.primaryCta.href} style={{ marginLeft: "0.35rem" }}>
          {site.primaryCta.label}
        </a>
      </p>
      {locations.length ? (
        <div className="grid-2" style={{ marginBottom: "1.5rem" }}>
          {locations.map((l) => (
            <article className="card" key={l.name}>
              <h2 style={{ fontSize: "1.25rem", color: "var(--brand)" }}>{l.name}</h2>
              <p>{l.address}</p>
              <p><a href={`tel:${l.phoneTel}`}>{l.phone}</a></p>
              {l.email ? <p><a href={`mailto:${l.email}`}>{l.email}</a></p> : null}
              {l.hours ? <p style={{ marginTop: "0.5rem" }}>{l.hours}</p> : null}
            </article>
          ))}
        </div>
      ) : null}
      <ContactForm intent="booking" />
    </section>
  );
}
