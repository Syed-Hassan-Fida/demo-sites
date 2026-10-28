import Image from "next/image";
import Link from "next/link";
import { Reveal } from "./components/Reveal";
import { img } from "./lib/images";
import { site } from "./lib/site";

export default function HomePage() {
  return (
    <>
      <section className="hero" aria-label={`${site.name} hero`}>
        <div className="hero-media">
          <Image src={img.hero} alt={site.heroAlt} fill priority sizes="100vw" />
        </div>
        <div className="hero-shade" />
        <div className="hero-dock">
          <p className="hero-kicker">{site.kicker}</p>
          <h1 className="hero-brand">{site.name}</h1>
          <p className="hero-owner">{site.owner} · {site.aka}</p>
          <p className="hero-line">{site.heroLine}</p>
          <div className="hero-ctas">
            <a className="btn btn-light" href={site.primaryCta.href}>
              {site.primaryCta.label}
            </a>
            <Link
              className="btn btn-ghost"
              href="/about"
              style={{ color: "#fff", borderColor: "rgba(255,255,255,.45)" }}
            >
              Meet Kiera
            </Link>
          </div>
        </div>
      </section>

      <div className="wrap">
        <div className="trust">
          {site.trust.map((t) => (
            <div className="trust-item" key={t.title}>
              <strong>{t.title}</strong>
              <span>{t.sub}</span>
            </div>
          ))}
        </div>
      </div>

      <section className="wrap">
        <div className="about-split">
          <Reveal>
            <div className="about-visual">
              <Image
                src={img.about}
                alt="Placeholder — calm groomed dog portrait for About teaser (swap for Kiera’s photos)"
                fill
                sizes="(max-width: 859px) 100vw, 45vw"
              />
              <p className="about-chip">Zoology roots · animal-first table</p>
            </div>
          </Reveal>
          <Reveal>
            <p className="section-kicker">About</p>
            <h2 className="section-title">Safe. Understood. Unhurried.</h2>
            <p className="section-lead">{site.aboutLead}</p>
            <p style={{ color: "var(--muted)", marginBottom: "1.25rem", maxWidth: "48ch" }}>
              {site.aboutBody}
            </p>
            <Link className="btn btn-primary" href="/about">
              Full story
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="wrap">
        <Reveal>
          <p className="section-kicker">Services</p>
          <h2 className="section-title">{site.homeServicesTitle}</h2>
          <p className="section-lead">{site.homeServicesLead}</p>
        </Reveal>
        <div className="grid-3">
          {site.services.slice(0, 3).map((s) => (
            <Reveal key={s.title}>
              <article className="card">
                <h3>{s.title}</h3>
                {s.price ? <div className="price">{s.price}</div> : null}
                <p>{s.blurb}</p>
              </article>
            </Reveal>
          ))}
        </div>
        <p style={{ marginTop: "1.25rem", display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
          <Link className="btn btn-primary" href="/services">
            All services
          </Link>
          <Link className="btn btn-ghost" href="/pricing">
            Pricing
          </Link>
        </p>
      </section>

      <section className="wrap">
        <Reveal>
          <p className="section-kicker">Gallery</p>
          <h2 className="section-title">Creature finishes</h2>
          <p className="section-lead">
            Stock photography for layout — swap in Kiera’s real before/afters and Magical Creatures
            finishes before launch.
          </p>
        </Reveal>
        <div className="gallery">
          {[img.g1, img.g2, img.g3, img.g4].map((src, i) => (
            <div className="gallery-item" key={src}>
              <Image
                src={src}
                alt={`Grooming portfolio placeholder ${i + 1} — replace with MC Grooming Co photos`}
                fill
                sizes="(max-width: 859px) 50vw, 33vw"
              />
            </div>
          ))}
        </div>
        <p style={{ marginTop: "1.25rem" }}>
          <Link className="btn btn-ghost" href="/gallery">
            Open portfolio
          </Link>
        </p>
      </section>

      <section className="wrap">
        <Reveal>
          <p className="section-kicker">Neighbors</p>
          <h2 className="section-title">What pet parents say</h2>
          <p className="section-lead">
            Placeholders until Kiera shares Nextdoor or client quotes — marked clearly.
          </p>
        </Reveal>
        <div className="grid-3">
          {site.reviews.map((r) => (
            <Reveal key={r.who + r.meta}>
              <article className="card">
                <p className="card-note">{r.meta}</p>
                <p style={{ margin: "0.35rem 0 0.75rem", color: "var(--ink)" }}>“{r.quote}”</p>
                <p>
                  <strong style={{ color: "var(--brand)" }}>{r.who}</strong>
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="wrap">
        <Reveal>
          <div className="cta-band">
            <p className="section-kicker">Book</p>
            <h2 className="section-title">{site.ctaBandTitle}</h2>
            <p className="section-lead">{site.ctaBandLead}</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
              <a className="btn btn-accent" href={site.primaryCta.href}>
                {site.primaryCta.label}
              </a>
              <Link
                className="btn btn-ghost"
                href="/faq"
                style={{ color: "#fff", borderColor: "rgba(255,255,255,.4)" }}
              >
                Read FAQ
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
