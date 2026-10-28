import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { img } from "../lib/images";
import { site } from "../lib/site";

export const metadata: Metadata = {
  title: "About",
  description: `About ${site.name} — Brooke El-Merrahi, NCMG, CCE, Lower Highland Art District Denver.`,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <section className="wrap" style={{ paddingTop: "3rem", paddingBottom: "4rem" }}>
      <p className="section-kicker">About</p>
      <h1 className="section-title">Master-groomer studio in the Art District</h1>
      <p className="section-lead">{site.tagline}</p>

      <div className="split" style={{ marginBottom: "3rem" }}>
        <div className="split-media" style={{ minHeight: "22rem" }}>
          <Image
            src={img.about}
            alt="Banner — portrait finish from the Little Brown Dog studio"
            fill
            sizes="(max-width:860px) 100vw, 50vw"
            priority
          />
        </div>
        <div>
          <h2 style={{ color: "var(--brand)", fontSize: "1.65rem", marginBottom: "0.75rem" }}>
            Brooke El-Merrahi, NCMG, CCE
          </h2>
          <p style={{ color: "var(--muted)", marginBottom: "0.85rem" }}>
            Little Brown Dog is a full-service, appointment-only pet grooming studio. Owner and groomer
            Brooke El-Merrahi is a Nationally Certified Master Groomer and Certified Canine Esthetician —
            so coat type, breed standard, and temperament drive the finish, not a one-cut template.
          </p>
          <p style={{ color: "var(--muted)", marginBottom: "0.85rem" }}>
            In 2021 the studio torch passed from founders Melissa and Scott Fidge to Brooke, who had already
            been part of the shop for years. The mission stayed: a salon-like sanctuary where pets leave looking
            extraordinary without corner-cutting.
          </p>
          <p style={{ color: "var(--muted)" }}>
            Specialty craft includes hand scissoring, hand stripping, Asian Fusion, hair art, and canine
            esthetician treatments — with K-9 First Aid and CPR certification on the floor.
          </p>
        </div>
      </div>

      <div className="grid-2" style={{ marginBottom: "2.5rem" }}>
        <article className="card">
          <h3>Straight-through appointments</h3>
          <p>
            Drop-off starts the groom immediately. Dogs aren’t kenneled for hours awaiting a bath — the only
            kennel time is typically while awaiting pickup. Prompt pickups keep every visit calm.
          </p>
        </article>
        <article className="card">
          <h3>Towel-free & thoughtful ops</h3>
          <p>
            Synthetic drying chamois replace towel stacks for faster, lower-stress drying and less laundry load.
            Recirculating baths, LED lighting, and composting of pet hair are part of the sustainability path.
          </p>
        </article>
      </div>

      <div className="card" style={{ marginBottom: "1.5rem" }}>
        <h3 style={{ marginBottom: "0.5rem" }}>Visit</h3>
        <p>{site.address}</p>
        <p>{site.hours}</p>
        <p style={{ fontSize: "0.9rem" }}>{site.hoursNote}</p>
        <p style={{ marginTop: "0.65rem" }}>{site.reception}</p>
        <p style={{ marginTop: "0.85rem" }}>
          Careers interest? Email {site.email} — the live careers page remains the source of truth for openings.
        </p>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
        <a className="btn btn-primary" href={site.primaryCta.href}>{site.primaryCta.label}</a>
        <Link className="btn btn-ghost" href="/policies">Shop policies</Link>
        <Link className="btn btn-ghost" href="/gallery">Portrait gallery</Link>
      </div>
    </section>
  );
}
