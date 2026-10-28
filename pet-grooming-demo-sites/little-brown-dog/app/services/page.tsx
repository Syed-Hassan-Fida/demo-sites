import type { Metadata } from "next";
import Link from "next/link";
import { site } from "../lib/site";

export const metadata: Metadata = {
  title: "Services",
  description: `Dog grooming services at ${site.name} — Bath & Brush, haircuts, hand stripping, à la carte care.`,
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <section className="wrap" style={{ paddingTop: "3rem", paddingBottom: "4rem" }}>
      <p className="section-kicker">Services</p>
      <h1 className="section-title">Full-service, appointment only</h1>
      <p className="section-lead">
        Brooke El-Merrahi, NCMG, CCE leads a straight-through studio — drop off at your time, groom begins,
        and your dog returns as fast as craft allows. Bath & Brush is the foundation; everything else is à la carte.
      </p>

      <div className="grid-2" style={{ marginBottom: "2rem" }}>
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

      <h2 className="section-title" style={{ fontSize: "1.8rem" }}>Breed levels</h2>
      <p className="section-lead">
        Pricing uses breed standards for size, weight, and coat. XL full-coated breeds (Bernese, Newfie,
        Great Pyrenees, Malamute, etc.) are not accommodated — the shop is small and busy. Bearded Collies are hourly.
      </p>
      <div className="grid-2" style={{ marginBottom: "2rem" }}>
        {site.breedTiers.map((b) => (
          <article className="card" key={b.title}>
            <h3>{b.title}</h3>
            <div className="price">{b.range}</div>
            <p>{b.examples}</p>
          </article>
        ))}
      </div>

      <p style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
        <Link className="btn btn-primary" href="/pricing">See price tiers</Link>
        <Link className="btn btn-ghost" href="/book">Request an appointment</Link>
      </p>
    </section>
  );
}
