import type { Metadata } from "next";
import Link from "next/link";
import { site } from "../lib/site";

export const metadata: Metadata = {
  title: "Meet our team",
  description: `Fear Free groomers at ${site.name} — North and South Austin.`,
  alternates: { canonical: "/team" },
};

export default function TeamPage() {
  return (
    <section className="wrap" style={{ paddingTop: "3rem" }}>
      <p className="section-kicker">Team</p>
      <h1 className="section-title">We love them — and so will you</h1>
      <p className="section-lead">
        Certified, continuing-education focused, and committed to a Fear Free experience for every pet.
        Bios condensed from the live Meet our Team page.
      </p>
      <div className="grid-2">
        {site.team.map((m) => (
          <article key={m.name} style={{ borderTop: "2px solid var(--accent)", paddingTop: "1rem" }}>
            <p style={{ fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--orchid)" }}>
              {m.salon}
            </p>
            <h2 className="display" style={{ fontSize: "1.65rem", color: "var(--brand)", margin: "0.25rem 0" }}>{m.name}</h2>
            <p style={{ fontWeight: 650, marginBottom: "0.55rem" }}>{m.role}</p>
            <p style={{ color: "var(--muted)" }}>{m.bio}</p>
          </article>
        ))}
      </div>
      <p style={{ marginTop: "1.75rem", color: "var(--muted)" }}>
        Full roster lives on the current site — this demo highlights leadership and standout specialists.
        Prefer a specific groomer? Mention them in your{" "}
        <Link href="/book" style={{ color: "var(--brand)", textDecoration: "underline" }}>booking request</Link>.
      </p>
    </section>
  );
}
