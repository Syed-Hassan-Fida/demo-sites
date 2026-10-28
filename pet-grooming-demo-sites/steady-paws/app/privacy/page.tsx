import type { Metadata } from "next";
import { site } from "../lib/site";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: `How ${site.name} / ${site.legalName} handles personal information.`,
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <section className="wrap" style={{ paddingTop: "3rem", maxWidth: "42rem" }}>
      <p className="section-kicker">Legal</p>
      <h1 className="section-title">Privacy policy</h1>
      <p className="section-lead">
        Adapted from Crystal’s published privacy practices for this redesign demo.
      </p>
      <div className="card" style={{ display: "grid", gap: "0.85rem" }}>
        <p>
          This is a redesign demo for <strong>{site.name}</strong> ({site.legalName}). It is not the
          live production website. Contact details shown are published by the business for customer
          communication.
        </p>
        <p>
          <strong>Data collection.</strong> Only information needed to schedule and provide grooming —
          typically your name, contact details, and pet notes (breed, temperament, special needs).
        </p>
        <p>
          <strong>Use.</strong> Used to schedule appointments, deliver care, and communicate about
          your dog’s groom. Not shared with third parties for marketing.
        </p>
        <p>
          <strong>Demo form.</strong> The demo contact/booking form opens your own email client and
          does not store submissions on this host. Do not send payment card numbers through the form.
        </p>
        <p>
          <strong>Payments.</strong> Live payments may use cards, Venmo, Cash App, Zelle, PayPal,
          cash, or Apple Pay via Crystal’s own tools — not this demo.
        </p>
        <p>
          Questions: <a href={`mailto:${site.email}`}>{site.email}</a> ·{" "}
          <a href={`tel:${site.phoneTel}`}>{site.phone}</a>
        </p>
      </div>
    </section>
  );
}
