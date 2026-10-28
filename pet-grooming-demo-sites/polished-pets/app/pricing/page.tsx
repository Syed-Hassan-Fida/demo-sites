import type { Metadata } from "next";
import Link from "next/link";
import { site } from "../lib/site";

export const metadata: Metadata = {
  title: "Pricing",
  description: `Full Groom from $120 / $140 / $160 and Bath & Brush from $110 / $130 / $150 — size-based mobile pricing for ${site.name}.`,
  alternates: { canonical: "/pricing" },
};

export default function PricingPage() {
  return (
    <section className="wrap" style={{ paddingTop: "3rem" }}>
      <p className="section-kicker">Pricing</p>
      <h1 className="section-title">Size-based mobile rates</h1>
      <p className="section-lead">{site.pricingLead}</p>

      <h2 className="section-title" style={{ fontSize: "1.75rem", maxWidth: "22ch" }}>
        Full Groom
      </h2>
      <p className="section-lead" style={{ marginTop: "-0.5rem" }}>
        Includes: {site.fullGroomIncludes}.
      </p>
      <div className="tier-band">
        {site.pricing.map((p, i) => (
          <article className={`tier-card${i === 1 ? " featured" : ""}`} key={p.title}>
            <p className="tier-size">{p.size}</p>
            <h2>{p.title}</h2>
            <p className="tier-weight">
              Weight <strong>{p.weight}</strong>
            </p>
            <div className="tier-price-row">
              <span className="tier-prefix">{p.pricePrefix}</span>
              <span className="tier-amount">{p.price}</span>
            </div>
            {p.note ? <p className="tier-note">{p.note}</p> : null}
            {p.items?.length ? (
              <ul>
                {p.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : null}
            <p style={{ marginTop: "1rem" }}>
              <Link className="btn btn-primary btn-nav" href="/book">
                Book this size
              </Link>
            </p>
          </article>
        ))}
      </div>

      <h2 className="section-title" style={{ marginTop: "1rem", fontSize: "1.75rem", maxWidth: "22ch" }}>
        Bath &amp; Brush only
      </h2>
      <p className="section-lead" style={{ marginTop: "-0.5rem" }}>
        Includes: {site.bathBrushIncludes}.
      </p>
      <div className="tier-band">
        {site.bathBrushPricing.map((p) => (
          <article className="tier-card" key={p.title}>
            <p className="tier-size">{p.size}</p>
            <h2>{p.title}</h2>
            <p className="tier-weight">
              Weight <strong>{p.weight}</strong>
            </p>
            <div className="tier-price-row">
              <span className="tier-prefix">{p.pricePrefix}</span>
              <span className="tier-amount">{p.price}</span>
            </div>
            {p.items?.length ? (
              <ul>
                {p.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : null}
          </article>
        ))}
      </div>

      <h2 className="section-title" style={{ marginTop: "1rem", fontSize: "1.75rem" }}>
        Add-on enhancements
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

      <p style={{ marginTop: "1.75rem", display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
        <Link className="btn btn-primary" href="/book">
          Book with these packages
        </Link>
        <Link className="btn btn-ghost" href="/faq">
          Policies &amp; FAQ
        </Link>
      </p>
    </section>
  );
}
