import type { Metadata } from "next";
import { ContactForm } from "../components/ContactForm";
import { site } from "../lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Visit ${site.namePlain} at ${site.address}.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <section className="wrap" style={{ paddingTop: "3rem" }}>
      <p className="section-kicker">Contact</p>
      <h1 className="section-title">Come visit</h1>
      <p className="section-lead">Boutique salon care on Koenig Lane — reach out anytime.</p>
      <div className="grid-2">
        <article className="card">
          <h2 style={{ color: "var(--rose)", fontSize: "1.35rem", marginBottom: "0.75rem" }}>Salon</h2>
          <p><strong>Address</strong><br />{site.address}</p>
          <p style={{ marginTop: "0.75rem" }}>
            <strong>Phone</strong><br />
            <a href={`tel:${site.phoneTel}`}>{site.phone}</a><br />
            <a href={`tel:${site.phoneAltTel}`}>{site.phoneAlt}</a>
          </p>
          <p style={{ marginTop: "0.75rem" }}>
            <strong>Email</strong><br />
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </p>
          <p style={{ marginTop: "0.75rem" }}><strong>Hours</strong></p>
          <ul>
            {site.hours.map((h) => (
              <li key={h.day}>{h.day}: {h.time}</li>
            ))}
          </ul>
          <p style={{ marginTop: "0.75rem" }}>{site.nailWalkIn}</p>
          <p style={{ marginTop: "1rem", display: "flex", gap: "0.75rem" }}>
            <a className="btn btn-ghost" href={site.facebook} target="_blank" rel="noreferrer">Facebook</a>
            <a className="btn btn-ghost" href={site.instagram} target="_blank" rel="noreferrer">Instagram</a>
          </p>
        </article>
        <div>
          <ContactForm intent="contact" />
        </div>
      </div>
    </section>
  );
}
