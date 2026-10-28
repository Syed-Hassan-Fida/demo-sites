import type { Metadata } from "next";
import { site } from "../lib/site";

export const metadata: Metadata = {
  title: "Terms",
  description: `Terms of use for the ${site.namePlain} redesign demo.`,
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <section className="wrap prose" style={{ paddingTop: "3rem" }}>
      <p className="section-kicker">Legal</p>
      <h1 className="section-title">Terms</h1>
      <p>
        This website is a non-live redesign concept. {site.namePlain} remains the brand owner. Pricing and availability
        are confirmed by the salon when you request an appointment.
      </p>
      <p>
        Demo content may include stock photography placeholders. Salon policies for cancellations, temperament, and coat
        condition remain those communicated by {site.namePlain} directly.
      </p>
    </section>
  );
}
