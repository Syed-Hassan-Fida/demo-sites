import type { Metadata } from "next";
import { site } from "../lib/site";

export const metadata: Metadata = {
  title: "Accessibility",
  description: `Accessibility statement for the ${site.name} redesign demo.`,
  alternates: { canonical: "/accessibility" },
};

export default function AccessibilityPage() {
  return (
    <section className="wrap" style={{ paddingTop: "3rem", maxWidth: "42rem" }}>
      <p className="section-kicker">Legal</p>
      <h1 className="section-title">Accessibility</h1>
      <p className="section-lead">We aim for a calm site that’s usable for more people.</p>
      <div className="card" style={{ display: "grid", gap: "0.85rem" }}>
        <p>
          This redesign demo targets WCAG 2.2 AA where feasible: semantic headings, keyboard focus
          styles, labeled form fields, and respect for <code>prefers-reduced-motion</code>.
        </p>
        <p>
          If you hit a barrier on this demo — or need help booking by phone — contact Crystal at{" "}
          <a href={`tel:${site.phoneTel}`}>{site.phone}</a> or{" "}
          <a href={`mailto:${site.email}`}>{site.email}</a>.
        </p>
        <p>
          Salon address: {site.address}. Please call ahead if you need access details for arrival.
        </p>
      </div>
    </section>
  );
}
