import type { Metadata } from "next";
import Link from "next/link";
import { site } from "../lib/site";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: `Service terms summary for the ${site.name} redesign demo.`,
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <section className="wrap" style={{ paddingTop: "3rem", maxWidth: "44rem" }}>
      <p className="section-kicker">Legal</p>
      <h1 className="section-title">Terms &amp; Conditions</h1>
      <p className="section-lead">
        Demo summary aligned with live terms (updated August 2025). Not legal advice — production
        terms remain authoritative.
      </p>
      <div className="card" style={{ display: "grid", gap: "0.9rem" }}>
        <p>Appointment-only professional grooming. Service may be refused for safety, health, or behavior.</p>
        <p>Current rabies proof required. Ill or contagious pets should reschedule.</p>
        <p>Severely matted coats may require shaving; additional fees may apply. See also the <Link href="/faq">FAQ</Link>.</p>
        <p>24-hour cancellation notice preferred; late cancel / no-show fees apply (including 100% for same-day / wrong salon).</p>
        <p>Payment is due at service. Questions: <a href={`mailto:${site.email}`}>{site.email}</a>.</p>
      </div>
    </section>
  );
}
