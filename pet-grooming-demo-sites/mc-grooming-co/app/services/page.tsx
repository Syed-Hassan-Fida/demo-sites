import type { Metadata } from "next";
import Link from "next/link";
import { site } from "../lib/site";

export const metadata: Metadata = {
  title: "Services",
  description: `One-on-one grooming services from ${site.name} / ${site.owner} in Park Hill, Denver.`,
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <section className="wrap page-hero">
      <p className="section-kicker">Services</p>
      <h1 className="section-title">What happens at Kiera’s table</h1>
      <p className="section-lead">{site.homeServicesLead}</p>
      <div className="grid-2">
        {site.services.map((s) => (
          <article className="card" key={s.title}>
            <h2 style={{ fontSize: "1.45rem", color: "var(--brand)", marginBottom: "0.35rem" }}>
              {s.title}
            </h2>
            {s.price ? <div className="price">{s.price}</div> : null}
            <p>{s.blurb}</p>
            {Array.isArray(s.includes) && s.includes.length ? (
              <ul>
                {s.includes.map((i: string) => (
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
          See pricing approach
        </Link>
      </p>
    </section>
  );
}
