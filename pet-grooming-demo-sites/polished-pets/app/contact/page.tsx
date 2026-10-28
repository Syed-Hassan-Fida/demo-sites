import type { Metadata } from "next";
import Link from "next/link";
import { SocialLinks } from "../components/SiteChrome";
import { ContactForm } from "../components/ContactForm";
import { site } from "../lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Call/text ${site.phone} or email ${site.email} — ${site.name} mobile grooming Denver & Boulder.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <section className="wrap" style={{ paddingTop: "3rem" }}>
      <p className="section-kicker">Contact</p>
      <h1 className="section-title">Book or say hello</h1>
      <p className="section-lead">
        Whether you want availability, a grooming appointment, or just to share adorable dog photos —
        we’d love to hear from you.
      </p>

      <div className="grid-2" style={{ marginBottom: "1.75rem" }}>
        <article className="card">
          <h2 style={{ fontSize: "1.25rem", color: "var(--brand)", marginBottom: "0.65rem" }}>
            Fastest response
          </h2>
          <p style={{ marginBottom: "0.35rem" }}>
            Call or text{" "}
            <a href={`tel:${site.phoneTel}`} style={{ color: "var(--brand)", fontWeight: 650 }}>
              {site.phone}
            </a>
          </p>
          <p style={{ marginBottom: "0.85rem" }}>
            Email{" "}
            <a href={`mailto:${site.email}`} style={{ color: "var(--brand)", fontWeight: 650 }}>
              {site.email}
            </a>
          </p>
          <SocialLinks />
          <p style={{ marginTop: "1rem", color: "var(--muted)", fontSize: "0.92rem" }}>
            {site.address}
          </p>
          <p className="sister-note" style={{ marginTop: "1rem" }}>
            Need sitting?{" "}
            <a href={site.sisterCompany.url} target="_blank" rel="noreferrer">
              {site.sisterCompany.name}
            </a>
          </p>
        </article>
        <article className="card">
          <h2 style={{ fontSize: "1.25rem", color: "var(--brand)", marginBottom: "0.65rem" }}>
            Prefer a form?
          </h2>
          <p style={{ marginBottom: "1rem" }}>
            Or jump straight to{" "}
            <Link href="/book" style={{ color: "var(--brand)", textDecoration: "underline" }}>
              book a mobile groom
            </Link>
            .
          </p>
          <ContactForm intent="contact" />
        </article>
      </div>
    </section>
  );
}
