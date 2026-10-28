import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { img } from "../lib/images";
import { site } from "../lib/site";

export const metadata: Metadata = {
  title: "About Kimberly",
  description: `Meet ${site.owner} of ${site.name} — professional show-dog handler and independent groomer at Zen Den, Denver.`,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <section className="wrap page-hero">
      <p className="section-kicker">About</p>
      <h1 className="section-title">{site.owner}</h1>
      <p className="section-lead">
        The independent groomer behind {site.name} — handler-trained eyes, salon-family craft,
        Park Hill table.
      </p>

      <div className="story" style={{ marginBottom: "2.75rem" }}>
        <div>
          <div className="story-visual">
            <Image
              src={img.portrait}
              alt={`${site.owner} with a dog — portrait from Zen Den Pet Spa profile`}
              fill
              sizes="(max-width: 859px) 100vw, 40vw"
              priority
            />
          </div>
          <p className="story-caption">
            <strong>Real photo</strong> from her Zen Den host profile (not a stock headshot)
          </p>
        </div>
        <div>
          <h2 style={{ color: "var(--brand)", fontSize: "1.7rem", marginBottom: "0.85rem" }}>
            Lifelong with dogs — ring and salon
          </h2>
          <p style={{ color: "var(--muted)", marginBottom: "1rem" }}>{site.aboutLead}</p>
          <p style={{ color: "var(--muted)", marginBottom: "1rem" }}>{site.aboutBody}</p>
          <p style={{ color: "var(--muted)", marginBottom: "1.25rem" }}>
            She is accepting new clients. Reach her on her own line — not through Zen Den retail —
            especially while the storefront is under repair.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
            <a className="btn btn-primary" href={site.primaryCta.href}>
              {site.primaryCta.label}
            </a>
            <a className="btn btn-ghost" href={site.secondaryCta.href}>
              {site.secondaryCta.label}
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
            Not Zen Den staff
          </h2>
          <p>
            Kim rents grooming space at Zen Den Pet Spa ({site.street}). She runs {site.legalName}{" "}
            as her own practice — her phone, her email, her appointments. During temporary retail
            closures, contact her directly; grooming continues by appointment.
          </p>
        </article>
        <article className="card">
          <p className="card-note">How to book</p>
          <h2 style={{ fontSize: "1.35rem", color: "var(--brand)", marginBottom: "0.5rem" }}>
            Call or email first
          </h2>
          <p>
            Share breed, coat condition, temperament, and preferred days. Pricing is quote-led —
            coat work varies.{" "}
            <a href={`tel:${site.phoneTel}`}>{site.phone}</a> ·{" "}
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </p>
        </article>
      </div>
    </section>
  );
}
