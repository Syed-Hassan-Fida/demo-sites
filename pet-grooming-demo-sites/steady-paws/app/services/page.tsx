import type { Metadata } from "next";
import Link from "next/link";
import { site } from "../lib/site";

export const metadata: Metadata = {
  title: "Services",
  description: `Full groom, bath & brush, nail care, and special-needs pacing at ${site.name} in Denver.`,
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <section className="wrap" style={{ paddingTop: "3rem" }}>
      <p className="section-kicker">Services</p>
      <h1 className="section-title">VIP spa days, one dog at a time</h1>
      <p className="section-lead">
        Prices vary with breed, size, coat, behavior, and special needs. All services are by
        appointment only — request add-ons when you book so Crystal can reserve enough time.
      </p>
      <div className="grid-2">
        {site.services.map((s) => (
          <article className="card" key={s.title}>
            <h2 style={{ fontSize: "1.45rem", color: "var(--brand)", marginBottom: "0.35rem" }}>
              {s.title}
            </h2>
            {s.price ? <div className="price">{s.price}</div> : null}
            <p>{s.blurb}</p>
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
      <p style={{ marginTop: "1.5rem", display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
        <Link className="btn btn-primary" href="/book">
          Request an appointment
        </Link>
        <Link className="btn btn-ghost" href="/pricing">
          See starting rates
        </Link>
      </p>
    </section>
  );
}
