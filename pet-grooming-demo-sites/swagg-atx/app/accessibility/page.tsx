import type { Metadata } from "next";
import { site } from "../lib/site";

export const metadata: Metadata = {
  title: "Accessibility",
  description: `Accessibility commitment for the ${site.name} redesign demo.`,
  alternates: { canonical: "/accessibility" },
};

export default function AccessibilityPage() {
  return (
    <section className="wrap" style={{ paddingTop: "3rem", maxWidth: "42rem" }}>
      <p className="section-kicker">Trust</p>
      <h1 className="section-title">Accessibility</h1>
      <p className="section-lead">
        We aim for WCAG 2.2 AA patterns on this redesign demo — keyboard access, visible focus,
        labeled forms, and meaningful alt text.
      </p>
      <div className="card" style={{ display: "grid", gap: "0.85rem" }}>
        <p>
          This is a concept site for <strong>{site.legalName}</strong>, not the live production
          website. If you hit a barrier here, tell us so we can fix it before any launch.
        </p>
        <p>
          Prefer phone? Call or text{" "}
          <a href={`tel:${site.phoneTel}`} style={{ textDecoration: "underline" }}>
            {site.phone}
          </a>
          . Email{" "}
          <a href={`mailto:${site.email}`} style={{ textDecoration: "underline" }}>
            {site.email}
          </a>
          .
        </p>
      </div>
    </section>
  );
}
