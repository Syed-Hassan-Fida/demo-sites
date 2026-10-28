import type { Metadata } from "next";
import { site } from "../lib/site";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: `Privacy policy for the ${site.name} redesign demo.`,
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <section className="wrap page-hero" style={{ maxWidth: "42rem" }}>
      <p className="section-kicker">Legal</p>
      <h1 className="section-title">Privacy policy</h1>
      <p className="section-lead">How this demo site handles information.</p>
      <div className="card" style={{ display: "grid", gap: "0.85rem" }}>
        <p>
          This is a redesign demo for <strong>{site.name}</strong> ({site.owner}). It is not the live
          Zen Den Pet Spa website and is not affiliated as Zen Den retail.
        </p>
        <p>
          Contact details shown are already published by {site.owner} for customer communication
          (phone, email, address on Zen Den / Nextdoor).
        </p>
        <p>
          The demo contact form opens your own email client and does not store submissions on this
          host. Do not send sensitive payment data through the form.
        </p>
        <p>
          Questions: <a href={`mailto:${site.email}`}>{site.email}</a> ·{" "}
          <a href={`tel:${site.phoneTel}`}>{site.phone}</a>
        </p>
      </div>
    </section>
  );
}
