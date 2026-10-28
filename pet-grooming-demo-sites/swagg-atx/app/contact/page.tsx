import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "../components/ContactForm";
import { SocialLinks } from "../components/SiteChrome";
import { site } from "../lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact ${site.name} — ${site.phone}, ${site.email}, Austin mobile service.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <section className="wrap" style={{ paddingTop: "3rem" }}>
      <p className="section-kicker">Contact</p>
      <h1 className="section-title">Talk to SWAGG</h1>
      <p className="section-lead">
        Hours {site.hours}. Serving {site.areaServed}.
      </p>

      <div className="grid-2" style={{ marginBottom: "2rem" }}>
        <article className="card">
          <h2 style={{ fontSize: "1.2rem", color: "var(--brand)", marginBottom: "0.75rem" }}>
            Direct
          </h2>
          <p>
            Phone:{" "}
            <a href={`tel:${site.phoneTel}`} style={{ color: "var(--brand)", textDecoration: "underline" }}>
              {site.phone}
            </a>
          </p>
          <p style={{ marginTop: "0.45rem" }}>
            Email:{" "}
            <a href={`mailto:${site.email}`} style={{ color: "var(--brand)", textDecoration: "underline" }}>
              {site.email}
            </a>
          </p>
          <p style={{ marginTop: "0.45rem" }}>{site.address}</p>
          <div style={{ marginTop: "1rem" }}>
            <SocialLinks />
          </div>
          <p style={{ marginTop: "1rem" }}>
            <Link className="btn btn-primary btn-nav" href="/book">
              Prefer the booking form?
            </Link>
          </p>
        </article>
        <article className="card">
          <h2 style={{ fontSize: "1.2rem", color: "var(--brand)", marginBottom: "0.75rem" }}>
            Social
          </h2>
          <p>
            Instagram{" "}
            <a href={site.instagramUrl} target="_blank" rel="noreferrer" style={{ textDecoration: "underline" }}>
              {site.instagram}
            </a>
          </p>
          <p style={{ marginTop: "0.45rem" }}>
            Facebook{" "}
            <a href={site.facebookUrl} target="_blank" rel="noreferrer" style={{ textDecoration: "underline" }}>
              SWAGGATX
            </a>
          </p>
        </article>
      </div>

      <ContactForm intent="contact" />
    </section>
  );
}
