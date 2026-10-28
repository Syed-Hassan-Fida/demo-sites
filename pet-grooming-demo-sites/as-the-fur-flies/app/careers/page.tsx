import type { Metadata } from "next";
import { site } from "../lib/site";

export const metadata: Metadata = {
  title: "Careers",
  description: `Join the ${site.name} Fear Free grooming team in Austin.`,
  alternates: { canonical: "/careers" },
};

export default function CareersPage() {
  return (
    <section className="wrap" style={{ paddingTop: "3rem" }}>
      <p className="section-kicker">Careers</p>
      <h1 className="section-title">Company culture</h1>
      <p className="section-lead">
        We work collaboratively to make grooming friendly and fun. We step in for teammates,
        communicate with care, use evidence-based techniques, and stay current on education.
        Inclusive hiring is a commitment — not a slogan.
      </p>
      <h2 className="display" style={{ color: "var(--brand)", fontSize: "1.8rem", marginBottom: "0.85rem" }}>
        Benefits
      </h2>
      <ul style={{ display: "grid", gap: "0.45rem", color: "var(--muted)", marginBottom: "1.75rem", maxWidth: "40rem" }}>
        {[
          "Competitive salary, hourly, or commission-based pay + bonuses by role",
          "Health, dental, and vision insurance",
          "401(k) retirement plan",
          "Weekly pay",
          "Use of facilities for personal pets",
          "Continuing education",
        ].map((b) => (
          <li key={b}>{b}</li>
        ))}
      </ul>
      <h2 className="display" style={{ color: "var(--brand)", fontSize: "1.8rem", marginBottom: "0.85rem" }}>
        Current openings
      </h2>
      <p style={{ color: "var(--muted)", maxWidth: "42ch", marginBottom: "1.25rem" }}>
        We’re always interested in hearing from pet professionals for future opportunities.
      </p>
      <a className="btn btn-primary" href="mailto:nancy@asthefurfliesaustin.com?subject=Career%20inquiry%20—%20As%20The%20Fur%20Flies">
        Email resume &amp; portfolio
      </a>
      <p className="form-note" style={{ marginTop: "0.85rem" }}>nancy@asthefurfliesaustin.com</p>
    </section>
  );
}