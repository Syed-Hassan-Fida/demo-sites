import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "../components/Reveal";
import { img } from "../lib/images";
import { site } from "../lib/site";

export const metadata: Metadata = {
  title: "About Crystal",
  description: `Meet Crystal — ${site.legalName} / ${site.name} in Denver. 14 years of patient grooming for every temperament.`,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <section className="wrap" style={{ paddingTop: "3rem" }}>
      <div className="split">
        <Reveal>
          <div className="split-media">
            <Image
              src={img.hands}
              alt="Placeholder for Crystal at work — swap for a real headshot"
              fill
              sizes="(max-width:859px) 100vw, 45vw"
              priority
            />
          </div>
        </Reveal>
        <Reveal>
          <p className="section-kicker">Our story</p>
          <h1 className="section-title">{site.about.title}</h1>
          <p className="section-lead">{site.about.lead}</p>
          {site.about.body.map((p) => (
            <p key={p.slice(0, 24)} style={{ color: "var(--muted)", marginBottom: "1rem", maxWidth: "48ch" }}>
              {p}
            </p>
          ))}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", marginTop: "1rem" }}>
            <a className="btn btn-primary" href={site.primaryCta.href}>
              {site.primaryCta.label}
            </a>
            <Link className="btn btn-ghost" href="/book">
              Request a spot
            </Link>
          </div>
        </Reveal>
      </div>

      <div style={{ marginTop: "3.5rem" }}>
        <Reveal>
          <p className="section-kicker">How Crystal works</p>
          <h2 className="section-title">Built for misunderstood dogs</h2>
        </Reveal>
        <div className="grid-3" style={{ marginTop: "1rem" }}>
          {site.approach.map((a) => (
            <Reveal key={a.title}>
              <article className="card">
                <h3>{a.title}</h3>
                <p>{a.blurb}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>

      <div className="policy-band" style={{ marginTop: "3rem", borderRadius: "0.85rem" }} role="note">
        <div className="wrap" style={{ padding: "0.25rem 0" }}>
          <p>
            <strong>Policy:</strong> {site.policyBanner}
          </p>
          <Link href="/faq" style={{ color: "var(--accent)", textDecoration: "underline" }}>
            Details in FAQ
          </Link>
        </div>
      </div>
    </section>
  );
}
