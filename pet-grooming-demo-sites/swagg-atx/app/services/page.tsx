import type { Metadata } from "next";
import Link from "next/link";
import { site } from "../lib/site";

export const metadata: Metadata = {
  title: "Services",
  description: `Mobile full grooms, maintenance trims, baths, and allergy-aware styling from ${site.name} in Austin.`,
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <section className="wrap" style={{ paddingTop: "3rem" }}>
      <p className="section-kicker">Services</p>
      <h1 className="section-title">Mobile spa packages</h1>
      <p className="section-lead">
        Luxury convenience — a professional unit rolls to you. Appointment only; text{" "}
        <a href={`tel:${site.phoneTel}`} style={{ color: "var(--brand)", textDecoration: "underline" }}>
          {site.phone}
        </a>{" "}
        for details.
      </p>

      <div className="grid-2">
        {site.services.map((s) => (
          <article className="card" key={s.title}>
            <h3>{s.title}</h3>
            {s.price ? <div className="price">{s.price}</div> : null}
            <p>{s.blurb}</p>
            {s.includes?.length ? (
              <ul>
                {s.includes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : null}
          </article>
        ))}
      </div>

      <p style={{ marginTop: "1.75rem", display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
        <Link className="btn btn-primary" href="/pricing">
          Size rates
        </Link>
        <Link className="btn btn-ghost" href="/book">
          Request appointment
        </Link>
      </p>
    </section>
  );
}
