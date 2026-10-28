import type { Metadata } from "next";
import { ContactForm } from "../components/ContactForm";
import { site } from "../lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact ${site.name}.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <section className="wrap" style={{ paddingTop: "3rem" }}>
      <p className="section-kicker">Contact</p>
      <h1 className="section-title">Say hello</h1>
      <p className="section-lead">{site.address}</p>
      <p style={{ marginBottom: "0.35rem" }}><a href={`tel:${site.phoneTel}`}>{site.phone}</a></p>
      <p style={{ marginBottom: "1.25rem" }}><a href={`mailto:${site.email}`}>{site.email}</a></p>
      <ContactForm intent="contact" />
    </section>
  );
}
