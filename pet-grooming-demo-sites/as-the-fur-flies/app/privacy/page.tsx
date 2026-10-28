import type { Metadata } from "next";
import { site } from "../lib/site";

export const metadata: Metadata = {
  title: "Privacy Notice",
  description: `Privacy summary for the ${site.name} redesign demo.`,
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <section className="wrap" style={{ paddingTop: "3rem", maxWidth: "44rem" }}>
      <p className="section-kicker">Legal</p>
      <h1 className="section-title">Privacy Notice</h1>
      <p className="section-lead">
        Demo summary inspired by the live As the Fur Flies LLC Privacy Policy (effective Jan 1, 2026).
        Not a substitute for the production legal page.
      </p>
      <div className="card" style={{ display: "grid", gap: "0.9rem" }}>
        <p>
          This redesign demo for <strong>{site.name}</strong> is not the live production website.
          The demo contact form opens your email client and does not store submissions on this host.
        </p>
        <p>
          On the live business site, customer opt-in information (including SMS consent) is kept
          confidential and is not shared with affiliates for unrelated marketing. Carriers are not
          liable for delayed or undelivered messages; standard rates may apply. Reply STOP to opt out
          of SMS where applicable.
        </p>
        <p>
          Do not send payment card numbers through demo forms. Questions about production privacy:
          nancy@asthefurfliesaustin.com · (512) 502-5112 · or{" "}
          <a href={`mailto:${site.email}`}>{site.email}</a>.
        </p>
      </div>
    </section>
  );
}
