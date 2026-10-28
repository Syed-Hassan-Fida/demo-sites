import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "../components/ContactForm";
import { site } from "../lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact ${site.name} — phone, text, email, parking, and directions to 3235 Navajo Street.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <section className="wrap" style={{ paddingTop: "3rem", paddingBottom: "4rem" }}>
      <p className="section-kicker">Contact</p>
      <h1 className="section-title">Studio details</h1>
      <p className="section-lead">
        Before stopping by, call or text — the shop is appointment-only and closing time flexes with the day&apos;s book.
      </p>

      <div className="grid-2" style={{ marginBottom: "2rem" }}>
        <article className="card">
          <h2 style={{ fontSize: "1.25rem", color: "var(--brand)", marginBottom: "0.5rem" }}>Reach us</h2>
          <p><a href={`tel:${site.phoneTel}`}>{site.phone}</a> — text or call</p>
          <p><a href={`mailto:${site.email}`}>{site.email}</a></p>
          <p style={{ marginTop: "0.75rem" }}>{site.address}</p>
          <p>{site.hours}</p>
          <p style={{ fontSize: "0.88rem" }}>{site.hoursNote}</p>
          <p style={{ marginTop: "0.65rem", fontSize: "0.92rem" }}>{site.reception}</p>
          <p style={{ marginTop: "0.85rem" }}>
            <a href={`https://instagram.com/${String(site.instagram).replace("@", "")}`} target="_blank" rel="noreferrer">
              {site.instagram}
            </a>
            {" · "}
            <a href={site.facebook} target="_blank" rel="noreferrer">Facebook</a>
          </p>
        </article>
        <article className="card">
          <h2 style={{ fontSize: "1.25rem", color: "var(--brand)", marginBottom: "0.5rem" }}>Parking & landmarks</h2>
          <p>Street parking on Navajo or 33rd Ave is usually available.</p>
          <p style={{ marginTop: "0.5rem" }}>
            Free public spaces in Community Plaza Park (from Osage Street, directly behind the shop).
          </p>
          <p style={{ marginTop: "0.75rem" }}>
            Across from Lumina (the large white building). Look for Navajo Art District signage off Osage from I-25 exit 212 (20th Street).
          </p>
          <p style={{ marginTop: "0.85rem" }}>
            <a
              href="https://maps.google.com/maps?z=16&q=3235+navajo+street+denver,+co+80211"
              target="_blank"
              rel="noreferrer"
            >
              Open in Google Maps
            </a>
          </p>
        </article>
      </div>

      <h2 className="section-title" style={{ fontSize: "1.8rem" }}>Send a note</h2>
      <p className="section-lead">Prefer the form? We&apos;ll open your mail app with the details — or just call/text.</p>
      <ContactForm intent="contact" />
      <p style={{ marginTop: "1.25rem" }}>
        <Link className="btn btn-ghost" href="/book">Go to booking request</Link>
      </p>
    </section>
  );
}
