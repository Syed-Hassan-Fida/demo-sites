import type { Metadata } from "next";
import { ContactForm } from "../components/ContactForm";
import { site } from "../lib/site";

export const metadata: Metadata = {
  title: "Student groom request",
  description:
    "Austin Community College student grooms at 50% off — North Austin salon evenings and Sundays.",
  alternates: { canonical: "/student" },
};

export default function StudentPage() {
  return (
    <section className="wrap" style={{ paddingTop: "3rem" }}>
      <p className="section-kicker">North · ACC</p>
      <h1 className="section-title">Student groom requests</h1>
      <p className="section-lead">
        Looking for dog grooming that fits your budget? Austin Community College students offer 50%
        off at our North Austin salon.
      </p>
      <div className="card" style={{ marginBottom: "1.5rem", maxWidth: "40rem" }}>
        <p><strong>Hours:</strong> Sundays 12:45–6:00 · Tue/Thu evenings 5:45–9:00</p>
        <ul style={{ marginTop: "0.85rem" }}>
          <li>Bath package — bath, blow-dry, brush-out, ear cleaning, nail trim and buff</li>
          <li>Bath &amp; tidy — plus face, feet, and sanitary</li>
          <li>Full groom — plus all-over haircut</li>
        </ul>
      </div>
      <p className="warning-note" style={{ marginBottom: "1.5rem", maxWidth: "40rem" }}>
        Student appointments are at North only ({site.locations[1].address}).
      </p>
      <ContactForm intent="student-groom" defaultSalon="north" showSalon />
    </section>
  );
}
