import type { Metadata } from "next";
import Link from "next/link";
import { site } from "../lib/site";

export const metadata: Metadata = {
  title: "Pricing",
  description: `Starting rates for ${site.name}: full groom from $95, bath & brush from $65, add-ons listed.`,
  alternates: { canonical: "/pricing" },
};

export default function PricingPage() {
  return (
    <section className="wrap" style={{ paddingTop: "3rem" }}>
      <p className="section-kicker">Pricing</p>
      <h1 className="section-title">Starting rates</h1>
      <p className="section-lead">{site.pricingLead}</p>
      <div className="grid-3">
        {site.pricing.map((p) => (
          <article className="card" key={p.title}>
            <h2 style={{ fontSize: "1.35rem", color: "var(--brand)" }}>{p.title}</h2>
            <div className="price">{p.price}</div>
            <p>{p.note}</p>
            {p.items?.length ? (
              <ul>
                {p.items.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            ) : null}
          </article>
        ))}
      </div>

      <h2 className="section-title" style={{ marginTop: "2.5rem", fontSize: "1.8rem" }}>
        Add-ons
      </h2>
      <p className="section-lead">
        Request at booking — these can extend appointment time. Quoted items depend on coat and
        needs.
      </p>
      <div className="grid-2">
        {site.addons.map((a) => (
          <article className="card" key={a.title}>
            <h3>{a.title}</h3>
            <div className="price">{a.price}</div>
            <p>{a.blurb}</p>
          </article>
        ))}
      </div>

      <div className="policy-band" style={{ marginTop: "2.5rem", borderRadius: "0.85rem" }} role="note">
        <div className="wrap" style={{ padding: "0.25rem 0" }}>
          <p>
            <strong>Remember:</strong> {site.policyBanner}
          </p>
          <a href={site.primaryCta.href} style={{ color: "var(--accent)", textDecoration: "underline" }}>
            Call / text for a quote
          </a>
        </div>
      </div>

      <p style={{ marginTop: "1.5rem" }}>
        <Link className="btn btn-primary" href="/book">
          Book with these packages
        </Link>
      </p>
    </section>
  );
}
