import type { Metadata } from "next";
import { site } from "../lib/site";

export const metadata: Metadata = {
  title: "Accessibility",
  description: `Accessibility commitment for the ${site.name} demo.`,
  alternates: { canonical: "/accessibility" },
};

export default function AccessibilityPage() {
  return (
    <section className="wrap page-hero" style={{ maxWidth: "42rem" }}>
      <p className="section-kicker">Legal</p>
      <h1 className="section-title">Accessibility</h1>
      <p className="section-lead">Our accessibility commitment for this demo.</p>
      <div className="card" style={{ display: "grid", gap: "0.85rem" }}>
        <p>
          We aim for WCAG 2.2 AA where feasible: semantic headings, keyboard focus, readable
          contrast, form labels, and reduced-motion respect.
        </p>
        <p>
          If you hit a barrier on this demo, email{" "}
          <a href={`mailto:${site.email}`}>{site.email}</a> or call{" "}
          <a href={`tel:${site.phoneTel}`}>{site.phone}</a> — we will work to fix it before any live
          handoff.
        </p>
      </div>
    </section>
  );
}
