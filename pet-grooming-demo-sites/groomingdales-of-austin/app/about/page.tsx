import type { Metadata } from "next";
import Link from "next/link";
import { site } from "../lib/site";

export const metadata: Metadata = {
  title: "About & Staff",
  description: `Meet the ${site.namePlain} team — Kate and the salon staff.`,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <section className="wrap" style={{ paddingTop: "3rem" }}>
      <p className="section-kicker">About</p>
      <h1 className="section-title">Meet the salon</h1>
      <p className="section-lead">
        Est. 2006 — award-winning Austin dog grooming with a natural approach to your pet&apos;s physical and emotional well-being.
      </p>
      <div className="grid-2">
        {site.staff.map((s) => (
          <article className="card" key={s.name}>
            <p className="section-kicker">{s.role}</p>
            <h2 style={{ color: "var(--rose)", fontSize: "1.6rem", marginBottom: "0.5rem" }}>{s.name}</h2>
            <p>{s.bio}</p>
          </article>
        ))}
        <article className="card">
          <p className="section-kicker">Visit</p>
          <h2 style={{ color: "var(--rose)", fontSize: "1.6rem", marginBottom: "0.5rem" }}>Salon details</h2>
          <p>{site.address}</p>
          <p style={{ marginTop: "0.5rem" }}>
            <a href={`tel:${site.phoneTel}`}>{site.phone}</a> · <a href={`tel:${site.phoneAltTel}`}>{site.phoneAlt}</a>
          </p>
          <p style={{ marginTop: "0.5rem" }}><a href={`mailto:${site.email}`}>{site.email}</a></p>
          <ul style={{ marginTop: "0.75rem" }}>
            {site.hours.map((h) => (
              <li key={h.day}>{h.day}: {h.time}</li>
            ))}
          </ul>
        </article>
      </div>
      <p style={{ marginTop: "1.5rem", display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
        <Link className="btn btn-primary" href="/book">Book Now</Link>
        <Link className="btn btn-ghost" href="/testimonials">Testimonials</Link>
      </p>
    </section>
  );
}
