import type { Metadata } from "next";
import { site } from "../lib/site";

export const metadata: Metadata = {
  title: "Accessibility",
  description: `Accessibility statement for the ${site.namePlain} redesign demo.`,
  alternates: { canonical: "/accessibility" },
};

export default function AccessibilityPage() {
  return (
    <section className="wrap prose" style={{ paddingTop: "3rem" }}>
      <p className="section-kicker">Legal</p>
      <h1 className="section-title">Accessibility</h1>
      <p>
        We aim for WCAG 2.2 AA patterns on this demo: semantic headings, keyboard-focus styles, form labels, and
        reduced-motion respect. If you hit a barrier, email{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a> or call{" "}
        <a href={`tel:${site.phoneTel}`}>{site.phone}</a>.
      </p>
    </section>
  );
}
