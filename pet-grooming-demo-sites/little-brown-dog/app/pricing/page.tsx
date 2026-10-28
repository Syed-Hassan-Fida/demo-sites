import type { Metadata } from "next";
import Link from "next/link";
import { site } from "../lib/site";

export const metadata: Metadata = {
  title: "Pricing",
  description: `Breed-tier pricing for ${site.name} — Bath & Brush, haircut add-ons, and à la carte care.`,
  alternates: { canonical: "/pricing" },
};

type Addon = { title: string; price: string; blurb: string };

export default function PricingPage() {
  const addons = (site.addons || []) as Addon[];

  return (
    <section className="wrap" style={{ paddingTop: "3rem", paddingBottom: "4rem" }}>
      <p className="section-kicker">Pricing</p>
      <h1 className="section-title">Breed-tier rates</h1>
      <p className="section-lead">{site.pricingLead}</p>

      <div className="grid-3" style={{ marginBottom: "2rem" }}>
        {site.pricing.map((p) => (
          <article className="card" key={p.title}>
            <h2 style={{ fontSize: "1.35rem", color: "var(--brand)" }}>{p.title}</h2>
            <div className="price">{p.price}</div>
            <p>{p.note}</p>
            {p.items?.length ? <ul>{p.items.map((i: string) => <li key={i}>{i}</li>)}</ul> : null}
          </article>
        ))}
      </div>

      <h2 className="section-title" style={{ fontSize: "1.8rem" }}>Breed tiers at a glance</h2>
      <div className="grid-2" style={{ marginBottom: "2rem" }}>
        {site.breedTiers.map((b) => (
          <article className="card" key={b.title}>
            <h3>{b.title}</h3>
            <div className="price">{b.range}</div>
            <p>{b.examples}</p>
          </article>
        ))}
      </div>

      {addons.length ? (
        <>
          <h2 className="section-title" style={{ fontSize: "1.8rem" }}>À la carte add-ons</h2>
          <div className="grid-2" style={{ marginBottom: "1.5rem" }}>
            {addons.map((a) => (
              <article className="card" key={a.title}>
                <h3>{a.title}</h3>
                <div className="price">{a.price}</div>
                <p>{a.blurb}</p>
              </article>
            ))}
          </div>
        </>
      ) : null}

      <p className="form-note" style={{ marginBottom: "1.25rem" }}>
        Figures transcribed from the live Dog Services page for this demo — confirm current rates before launch.
        Extra drying, mats, behavior, or ectoparasites may adjust the total.
      </p>
      <p style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
        <Link className="btn btn-primary" href="/book">Book with these packages</Link>
        <Link className="btn btn-ghost" href="/policies">Read shop policies</Link>
      </p>
    </section>
  );
}
