import type { Metadata } from "next";
import Link from "next/link";
import { site } from "../lib/site";

export const metadata: Metadata = {
  title: "FAQ",
  description: `Booking, 24-hour / 50% policy, anxious dogs, and payments for ${site.name}.`,
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  return (
    <section className="wrap faq" style={{ paddingTop: "3rem" }}>
      <p className="section-kicker">FAQ</p>
      <h1 className="section-title">Common questions</h1>
      <p className="section-lead">
        Straight answers on booking, the no-show policy, and special-needs care.
      </p>
      {site.faqs.map((f) => (
        <details key={f.q} open={f.q.includes("cancellation")}>
          <summary>{f.q}</summary>
          <p>{f.a}</p>
        </details>
      ))}
      <div className="policy-band" style={{ marginTop: "1.75rem", borderRadius: "0.85rem" }} role="note">
        <div className="wrap" style={{ padding: "0.25rem 0" }}>
          <p>
            <strong>Policy reminder:</strong> {site.policyBanner}
          </p>
        </div>
      </div>
      <p style={{ marginTop: "1.5rem", display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
        <a className="btn btn-primary" href={site.primaryCta.href}>
          {site.primaryCta.label}
        </a>
        <Link className="btn btn-ghost" href="/book">
          Still need help? Request a spot
        </Link>
      </p>
    </section>
  );
}
