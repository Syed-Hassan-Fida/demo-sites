import type { Metadata } from "next";
import { site } from "../lib/site";

export const metadata: Metadata = {
  title: "Privacy",
  description: `Privacy policy for the ${site.namePlain} redesign demo.`,
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <section className="wrap prose" style={{ paddingTop: "3rem" }}>
      <p className="section-kicker">Legal</p>
      <h1 className="section-title">Privacy</h1>
      <p>
        This is a redesign demo for {site.namePlain}. Contact and booking forms open your email client and do not store
        submissions on this demo host. Do not send sensitive personal data through the demo.
      </p>
      <p>
        If this concept is finalized as the live site, a full privacy policy covering appointment records, SMS, and
        payment processors will be published before launch. Questions:{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>
    </section>
  );
}
