import type { Metadata } from "next";
import Link from "next/link";
import { site } from "../lib/site";

export const metadata: Metadata = {
  title: "Terms",
  description: `Booking terms and salon policies for ${site.name} / ${site.legalName}.`,
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <section className="wrap" style={{ paddingTop: "3rem", maxWidth: "42rem" }}>
      <p className="section-kicker">Legal</p>
      <h1 className="section-title">Terms & salon policy</h1>
      <p className="section-lead">Key booking rules for this redesign demo concept.</p>
      <div className="card" style={{ display: "grid", gap: "0.85rem" }}>
        <p>
          This page summarizes published policies for <strong>{site.name}</strong> /{" "}
          <strong>{site.legalName}</strong>. The live site remains the source of truth until a
          rebuild is approved.
        </p>
        <p>
          <strong>Appointments only.</strong> No walk-in grooming. The calendar books well in
          advance — please plan ahead.
        </p>
        <p>
          <strong>Cancellation / no-show.</strong> At least 24 hours’ notice is required to
          reschedule or cancel. Late cancel or no-show fee is <strong>50% of the scheduled
          groom</strong> — nonnegotiable so the spot can be filled.
        </p>
        <p>
          <strong>Care.</strong> Services may include bathing, haircuts, nail care, ear cleaning,
          and requested add-ons. Crystal inspects skin and coat during the groom and will
          communicate concerns before acting on major changes.
        </p>
        <p>
          <strong>Payments.</strong> {site.payments.join(", ")}.
        </p>
        <p>
          More detail: <Link href="/faq">FAQ</Link> · <Link href="/privacy">Privacy</Link> ·{" "}
          <Link href="/accessibility">Accessibility</Link>
        </p>
        <p>
          Contact: <a href={`mailto:${site.email}`}>{site.email}</a> ·{" "}
          <a href={`tel:${site.phoneTel}`}>{site.phone}</a> · {site.address}
        </p>
      </div>
    </section>
  );
}
