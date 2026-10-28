import type { Metadata } from "next";
import Link from "next/link";
import { site } from "../lib/site";

export const metadata: Metadata = {
  title: "Pricing",
  description: `Pricing and packages for ${site.name}.`,
  alternates: { canonical: "/pricing" },
};

type Addon = { title: string; price: string; blurb: string };

export default function PricingPage() {
  const addons = ((site as { addons?: Addon[] }).addons || []);

  return (
    <section className="wrap" style={{ paddingTop: "3rem" }}>
      <p className="section-kicker">Pricing</p>
      <h1 className="section-title">Packages & starting rates</h1>
      <p className="section-lead">{site.pricingLead}</p>
      <div className="grid-3">
        {site.pricing.map((p) => (
          <article className="card" key={p.title}>
            <h2 style={{ fontSize: "1.35rem", color: "var(--brand)" }}>{p.title}</h2>
            <div className="price">{p.price}</div>
            <p>{p.note}</p>
            {p.items?.length ? <ul>{p.items.map((i: string) => <li key={i}>{i}</li>)}</ul> : null}
          </article>
        ))}
      </div>
      {addons.length ? (
        <>
          <h2 className="section-title" style={{ marginTop: "2.5rem", fontSize: "1.8rem" }}>Add-ons</h2>
          <div className="grid-2">
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
      <p style={{ marginTop: "1.5rem" }}>
        <Link className="btn btn-primary" href="/book">Book with these packages</Link>
      </p>
    </section>
  );
}
