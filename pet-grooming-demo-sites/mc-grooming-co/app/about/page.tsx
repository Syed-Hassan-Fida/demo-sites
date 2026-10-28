import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { img } from "../lib/images";
import { site } from "../lib/site";

export const metadata: Metadata = {
  title: "About Kiera",
  description: `Meet ${site.owner} of ${site.name} — zoology-minded, animal-first independent grooming in Park Hill, Denver.`,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <section className="wrap page-hero">
      <p className="section-kicker">About</p>
      <h1 className="section-title">Kiera Odell</h1>
      <p className="section-lead">
        Independent groomer behind {site.name} — also known in the neighborhood as {site.aka}.
      </p>

      <div className="about-split" style={{ marginBottom: "2.5rem" }}>
        <div className="about-visual">
          <Image
            src={img.about}
            alt="Placeholder portrait slot — swap for a photo of Kiera or a signature client finish"
            fill
            sizes="(max-width: 859px) 100vw, 45vw"
            priority
          />
          <p className="about-chip">Accepting new clients · Park Hill table</p>
        </div>
        <div>
          <h2 style={{ color: "var(--brand)", fontSize: "1.65rem", marginBottom: "0.85rem" }}>
            From zoology class to the grooming table
          </h2>
          <p style={{ color: "var(--muted)", marginBottom: "1rem" }}>{site.aboutLead}</p>
          <p style={{ color: "var(--muted)", marginBottom: "1rem" }}>{site.aboutBody}</p>
          <p style={{ color: "var(--muted)", marginBottom: "1.25rem" }}>
            Her Nextdoor presence leans playful — “one-on-one grooming with the Lord of the Groom” —
            but the practice is serious about low-stress handling: no rush, no kennel cattle call,
            animal first.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
            <a className="btn btn-primary" href={site.primaryCta.href}>
              {site.primaryCta.label}
            </a>
            <Link className="btn btn-ghost" href="/book">
              Booking form
            </Link>
          </div>
        </div>
      </div>

      <div className="grid-2">
        <article className="card">
          <p className="card-note">Independent</p>
          <h2 style={{ fontSize: "1.35rem", color: "var(--brand)", marginBottom: "0.5rem" }}>
            Not Zen Den retail
          </h2>
          <p>
            Kiera rents grooming space at Zen Den Pet Spa ({site.street}). She runs her own book,
            her own phone, and her own email. During temporary retail closures, contact her
            directly — grooming continues by appointment.
          </p>
        </article>
        <article className="card">
          <p className="card-note">Hours</p>
          <h2 style={{ fontSize: "1.35rem", color: "var(--brand)", marginBottom: "0.5rem" }}>
            When to reach her
          </h2>
          <p>
            Listed hours: {site.hours}. Confirm when you text — solo calendars flex around coat
            work and sensitive dogs.
          </p>
          {site.nextdoor ? (
            <p style={{ marginTop: "0.75rem" }}>
              <a href={site.nextdoor} target="_blank" rel="noreferrer">
                Magical Creatures on Nextdoor →
              </a>
            </p>
          ) : null}
        </article>
      </div>
    </section>
  );
}
