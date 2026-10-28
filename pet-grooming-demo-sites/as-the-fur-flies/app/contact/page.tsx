import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "../components/ContactForm";
import { SocialLinks } from "../components/SiteChrome";
import { site } from "../lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact North or South ${site.name} in Austin.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <section className="wrap" style={{ paddingTop: "3rem" }}>
      <p className="section-kicker">Contact</p>
      <h1 className="section-title">Say hello</h1>
      <p className="section-lead">
        Shared line <a href={`tel:${site.phoneTel}`}>{site.phone}</a>. Prefer a salon-specific text or email below.
      </p>
      <div className="grid-2" style={{ marginBottom: "1.75rem" }}>
        {site.locations.map((l) => (
          <article className="card" key={l.id}>
            <h2 style={{ fontSize: "1.35rem" }}>{l.name}</h2>
            <p>{l.address}</p>
            <p style={{ marginTop: "0.45rem" }}><a href={`tel:${l.phoneTel}`}>{l.phone}</a></p>
            <p><a href={`mailto:${l.email}`}>{l.email}</a></p>
            <p style={{ marginTop: "0.75rem" }}>
              <Link className="btn btn-ghost" href={`/book?salon=${l.id}`}>Book {l.name.split(" ")[0]}</Link>
            </p>
          </article>
        ))}
      </div>
      <div style={{ marginBottom: "1.25rem" }}>
        <SocialLinks />
      </div>
      <ContactForm intent="contact" showSalon />
    </section>
  );
}
