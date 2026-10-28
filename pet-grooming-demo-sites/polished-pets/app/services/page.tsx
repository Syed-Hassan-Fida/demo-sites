import type { Metadata } from "next";
import Link from "next/link";
import { site } from "../lib/site";

export const metadata: Metadata = {
  title: "Services",
  description: `Cage-free mobile Full Groom, Bath & Brush, and special-needs matching — ${site.name} Denver & Boulder.`,
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <section className="wrap" style={{ paddingTop: "3rem" }}>
      <p className="section-kicker">Services</p>
      <h1 className="section-title">Mobile spa menus</h1>
      <p className="section-lead">{site.homeServicesLead}</p>

      <div className="nature-strip" style={{ marginBottom: "2rem" }}>
        <h2>At your door, home, or office</h2>
        <p>
          Every appointment is one-on-one in a cage-free van — no salon kennels, no drop-off stress.
          Groomers adjust pacing for soft temperaments, injuries, and special needs.
        </p>
      </div>

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

      <h2 className="section-title" style={{ marginTop: "2.5rem", fontSize: "1.75rem" }}>
        Popular add-ons
      </h2>
      <div className="grid-2">
        {site.addons.map((a) => (
          <article className="card" key={a.title}>
            <h3>{a.title}</h3>
            <div className="price">{a.price}</div>
            <p>{a.blurb}</p>
          </article>
        ))}
      </div>

      <p style={{ marginTop: "1.5rem", display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
        <Link className="btn btn-primary" href="/book">
          Request an appointment
        </Link>
        <Link className="btn btn-ghost" href="/pricing">
          Exact size pricing
        </Link>
      </p>
    </section>
  );
}
