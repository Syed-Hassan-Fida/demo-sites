import type { Metadata } from "next";
import Link from "next/link";
import { site } from "../lib/site";

export const metadata: Metadata = {
  title: "Services",
  description: `Grooming services at ${site.name}.`,
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <section className="wrap" style={{ paddingTop: "3rem" }}>
      <p className="section-kicker">Services</p>
      <h1 className="section-title">What we offer</h1>
      <p className="section-lead">{site.homeServicesLead}</p>
      <div className="grid-2">
        {site.services.map((s) => (
          <article className="card" key={s.title}>
            <h2 style={{ fontSize: "1.45rem", color: "var(--brand)", marginBottom: "0.35rem" }}>{s.title}</h2>
            {s.price ? <div className="price">{s.price}</div> : null}
            <p>{s.blurb}</p>
            {Array.isArray(s.includes) && s.includes.length ? (
              <ul>{s.includes.map((i: string) => <li key={i}>{i}</li>)}</ul>
            ) : null}
          </article>
        ))}
      </div>
      <p style={{ marginTop: "1.5rem" }}>
        <Link className="btn btn-primary" href="/book">Request an appointment</Link>
      </p>
    </section>
  );
}
