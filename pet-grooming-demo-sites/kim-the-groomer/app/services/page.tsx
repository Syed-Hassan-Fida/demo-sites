import type { Metadata } from "next";
import Link from "next/link";
import { site } from "../lib/site";

export const metadata: Metadata = {
  title: "Services",
  description: `Grooming services with ${site.name} — full groom, bath & brush, and new-client intros in Denver.`,
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <section className="wrap page-hero">
      <p className="section-kicker">Services</p>
      <h1 className="section-title">What Kim offers</h1>
      <p className="section-lead">{site.homeServicesLead}</p>
      <div className="service-list">
        {site.services.map((s) => (
          <article className="service-row" key={s.title}>
            <div>
              <div className="service-row-top">
                <h2 style={{ fontSize: "1.45rem", color: "var(--brand)" }}>{s.title}</h2>
                {s.price ? <div className="price">{s.price}</div> : null}
              </div>
              <p>{s.blurb}</p>
            </div>
            {s.includes?.length ? (
              <ul>
                {s.includes.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            ) : null}
          </article>
        ))}
      </div>
      <p style={{ marginTop: "1.75rem", display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
        <Link className="btn btn-primary" href="/book">
          Request an appointment
        </Link>
        <Link className="btn btn-ghost" href="/pricing">
          Pricing
        </Link>
      </p>
    </section>
  );
}
