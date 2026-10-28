import type { Metadata } from "next";
import { site } from "../lib/site";

export const metadata: Metadata = {
  title: "Accessibility",
  description: `Accessibility commitment for the ${site.name} redesign demo.`,
  alternates: { canonical: "/accessibility" },
};

export default function AccessibilityPage() {
  return (
    <section className="wrap" style={{ paddingTop: "3rem", maxWidth: "44rem" }}>
      <p className="section-kicker">Legal</p>
      <h1 className="section-title">Accessibility</h1>
      <p className="section-lead">
        The live Squarespace site uses a third-party accessibility widget. This demo aims for WCAG 2.2 AA
        patterns: semantic landmarks, keyboard focus, labeled forms, and readable contrast.
      </p>
      <div className="card" style={{ display: "grid", gap: "0.9rem" }}>
        <p>
          If you hit a barrier on this demo, email{" "}
          <a href={`mailto:${site.email}`}>{site.email}</a> or call{" "}
          <a href={`tel:${site.phoneTel}`}>{site.phone}</a> and describe the page and assistive tech.
        </p>
        <p>We will prioritize fixes on any production rebuild you approve.</p>
      </div>
    </section>
  );
}
