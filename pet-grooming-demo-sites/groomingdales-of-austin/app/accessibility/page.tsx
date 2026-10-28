import type { Metadata } from "next";
import { site } from "../lib/site";

export const metadata: Metadata = {
  title: "Accessibility",
  description: "Our accessibility commitment for this demo.",
  alternates: { canonical: "/accessibility" },
};

export default function LegalPage() {
  return (
    <section className="wrap" style={{ paddingTop: "3rem", maxWidth: "42rem" }}>
      <p className="section-kicker">Legal</p>
      <h1 className="section-title">Accessibility</h1>
      <p className="section-lead">Our accessibility commitment for this demo.</p>
      <div className="card" style={{ display: "grid", gap: "0.85rem" }}>
        <p>
          This is a redesign demo for <strong>{site.name}</strong>. It is not the live production website.
          Contact details shown are published by the business for customer communication.
        </p>
        <p>
          The demo contact form opens your own email client and does not store submissions on this host.
          Do not send sensitive payment data through the form.
        </p>
        <p>
          Questions: <a href={`mailto:${site.email}`}>{site.email}</a> ·{" "}
          <a href={`tel:${site.phoneTel}`}>{site.phone}</a>
        </p>
      </div>
    </section>
  );
}
