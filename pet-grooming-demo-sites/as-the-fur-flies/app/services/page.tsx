import type { Metadata } from "next";
import Link from "next/link";
import { site } from "../lib/site";

export const metadata: Metadata = {
  title: "Services",
  description: `Dog and cat spa services at ${site.name} — Bath, Bath & Tidy, Full Groom, and North cat suite.`,
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <section className="wrap" style={{ paddingTop: "3rem" }}>
      <p className="section-kicker">Services</p>
      <h1 className="section-title">Dog &amp; cat day spa care</h1>
      <p className="section-lead">{site.homeServicesLead}</p>
      <div className="grid-2">
        {site.services.map((s) => (
          <article className="card" key={s.title}>
            <h2 style={{ fontSize: "1.45rem", color: "var(--brand)", marginBottom: "0.35rem" }}>{s.title}</h2>
            {s.price ? <div className="price">{s.price}</div> : null}
            <p>{s.blurb}</p>
            {s.includes?.length ? <ul>{s.includes.map((i) => <li key={i}>{i}</li>)}</ul> : null}
          </article>
        ))}
      </div>
      <p className="warning-note" style={{ marginTop: "1.5rem", maxWidth: "48rem" }}>
        The team raises standards through continued education and Fear Free certification. Final
        ticket may change after coat, behavior, and specialty shampoo review at drop-off.
      </p>
      <p style={{ marginTop: "1.5rem", display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
        <Link className="btn btn-primary" href="/book">Request an appointment</Link>
        <Link className="btn btn-ghost" href="/cats">Cat suite menu</Link>
        <Link className="btn btn-ghost" href="/pricing">Pricing detail</Link>
      </p>
    </section>
  );
}
