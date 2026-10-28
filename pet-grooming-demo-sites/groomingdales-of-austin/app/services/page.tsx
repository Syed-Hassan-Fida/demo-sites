import type { Metadata } from "next";
import Link from "next/link";
import { site } from "../lib/site";

export const metadata: Metadata = {
  title: "Services",
  description: `Full grooming, bathing, nail trims, and add-ons at ${site.namePlain}.`,
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <section className="wrap" style={{ paddingTop: "3rem" }}>
      <p className="section-kicker">Services</p>
      <h1 className="section-title">Dog grooming & add-ons</h1>
      <p className="section-lead">
        We offer a variety of dog grooming services and add-ons. Estimates depend on breed and coat —
        request an appointment and we&apos;ll confirm.
      </p>
      <div className="grid-3">
        {site.services.map((s) => (
          <article className="card" key={s.title}>
            <h2 style={{ fontSize: "1.45rem", color: "var(--rose)", marginBottom: "0.4rem" }}>{s.title}</h2>
            <div className="price">{s.price}</div>
            <p>{s.blurb}</p>
            <ul>
              {s.includes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
      <div style={{ marginTop: "2.5rem" }}>
        <h2 className="section-title" style={{ fontSize: "1.8rem" }}>À la carte & extras</h2>
        <p className="section-lead">{site.nailWalkIn}. Ask us about the FURminator and Rapid Return when you book.</p>
        <div className="grid-2">
          {site.addons.map((a) => (
            <article className="card" key={a.title}>
              <h3>{a.title}</h3>
              <p>{a.note}</p>
            </article>
          ))}
        </div>
      </div>
      <p style={{ marginTop: "1.75rem", display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
        <Link className="btn btn-primary" href="/book">Book Now</Link>
        <Link className="btn btn-ghost" href="/pricing">See pricing</Link>
      </p>
    </section>
  );
}
