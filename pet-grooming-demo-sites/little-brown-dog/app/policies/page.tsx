import type { Metadata } from "next";
import Link from "next/link";
import { site } from "../lib/site";

export const metadata: Metadata = {
  title: "Shop policies",
  description: `Shop policies for ${site.name} — drop-off, pickup, no-shows, hand stripping, dematting.`,
  alternates: { canonical: "/policies" },
};

export default function PoliciesPage() {
  return (
    <section className="wrap" style={{ paddingTop: "3rem", paddingBottom: "4rem" }}>
      <p className="section-kicker">Policies</p>
      <h1 className="section-title">Shop policies</h1>
      <p className="section-lead">
        Written for stress-free, exceptional grooming. The short version: arrive on time, pick up promptly,
        and call or text {site.phone} if anything changes.
      </p>

      <div className="card" style={{ marginBottom: "1.75rem" }}>
        <h2 style={{ fontSize: "1.25rem", color: "var(--brand)", marginBottom: "0.65rem" }}>Must-know</h2>
        <ol style={{ paddingLeft: "1.2rem", color: "var(--muted)", display: "grid", gap: "0.45rem" }}>
          <li>Drop your pet off at your appointment time (15+ minutes late → reschedule).</li>
          <li>Pick up within 30 minutes of groom completion (15 minutes appreciated; late fees apply after 30).</li>
          <li>Call or text {site.phone} if there are any issues — the team can only help if you reach out.</li>
        </ol>
      </div>

      <div className="policy-block">
        <h2>Late drop-off</h2>
        <p>
          Arriving 15 minutes or more past the appointment means a reschedule. Keeping later clients on time
          and refusing to rush craft quality are non-negotiable.
        </p>
      </div>

      <div className="policy-block">
        <h2>Pickups & late fees</h2>
        <p>
          You receive a pickup time at drop-off. Within 30 minutes: no late fee. After 30 minutes: $23 late pickup,
          then +$15 each additional hour. Last pets of the day: 15-minute window or $23 fee. After posted closing:
          additional $55/hour per pet to keep staff on the clock.
        </p>
      </div>

      <div className="policy-block">
        <h2>No-shows</h2>
        <p>
          Missing an appointment without calling beforehand incurs 50% of the missed groom fee (day-of or added
          to the next visit). Communicate — emergencies are handled with flexibility when possible.
        </p>
      </div>

      <div className="policy-block">
        <h2>Hand stripping</h2>
        <p>
          Preliminary evaluation required; 4-week-or-less schedule; book far ahead. Limited terrier and natural-backed
          sporting breeds for new preliminary appointments. Hourly pricing varies with coat.
        </p>
      </div>

      <div className="policy-block">
        <h2>Dematting & behavior</h2>
        <p>
          Severe or chronic matting may be refused; shave-downs only with drop-off consent; free brush-out coaching
          available. Serious reactivity may require a two-groomer handling charge while the team rebuilds trust.
        </p>
      </div>

      <div className="policy-block">
        <h2>Fleas & lice</h2>
        <p>
          Grooming stops immediately if ectoparasites are found. Bath + parasite fee covers disinfection; pets may
          go home less dry than usual. Monthly preventives are strongly recommended year-round in Denver.
        </p>
      </div>

      <p className="form-note" style={{ marginBottom: "1.25rem" }}>
        Summary for this redesign demo — the live Shop Policies page remains authoritative until handoff.
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
        <a className="btn btn-primary" href={site.primaryCta.href}>{site.primaryCta.label}</a>
        <Link className="btn btn-ghost" href="/faq">FAQ</Link>
      </div>
    </section>
  );
}
