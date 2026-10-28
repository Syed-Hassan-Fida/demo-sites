import type { Metadata } from "next";
import { ContactForm } from "../components/ContactForm";
import { site } from "../lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact ${site.name} — ${site.phone} · ${site.email} · ${site.street}, Denver.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <section className="wrap page-hero">
      <p className="section-kicker">Contact</p>
      <h1 className="section-title">Reach Kim directly</h1>
      <p className="section-lead">
        Independent groomer — call or email {site.owner}. Do not rely on the Zen Den retail desk
        while it is closed for repair.
      </p>
      <div className="grid-2" style={{ marginBottom: "1.75rem", maxWidth: "48rem" }}>
        <div>
          <p style={{ marginBottom: "0.35rem" }}>
            <a href={`tel:${site.phoneTel}`}>{site.phone}</a>
          </p>
          <p style={{ marginBottom: "0.35rem" }}>
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </p>
          <p style={{ color: "var(--muted)" }}>{site.address}</p>
        </div>
      </div>
      <ContactForm intent="contact" />
    </section>
  );
}
