import type { Metadata } from "next";
import { ContactForm } from "../components/ContactForm";
import { site } from "../lib/site";

export const metadata: Metadata = {
  title: "Book Now",
  description: `Request a grooming appointment at ${site.namePlain}.`,
  alternates: { canonical: "/book" },
};

export default function BookPage() {
  return (
    <section className="wrap" style={{ paddingTop: "3rem" }}>
      <p className="section-kicker">Book Now</p>
      <h1 className="section-title">Request an appointment</h1>
      <p className="section-lead">{site.bookLead}</p>
      <p style={{ color: "var(--muted)", marginBottom: "1.25rem" }}>{site.nailWalkIn}</p>
      <ContactForm intent="appointment-request" />
      <div className="card" style={{ marginTop: "1.75rem", maxWidth: "36rem" }}>
        <h2 style={{ color: "var(--rose)", fontSize: "1.2rem", marginBottom: "0.5rem" }}>Prefer to call?</h2>
        <p>
          <a href={`tel:${site.phoneTel}`}>{site.phone}</a> · <a href={`tel:${site.phoneAltTel}`}>{site.phoneAlt}</a>
        </p>
        <p style={{ marginTop: "0.35rem" }}>
          <a href={`mailto:${site.email}`}>{site.email}</a>
        </p>
      </div>
    </section>
  );
}
