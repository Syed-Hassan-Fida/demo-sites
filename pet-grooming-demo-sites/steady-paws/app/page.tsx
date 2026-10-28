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
          <Image
            src={img.hero}
            alt={site.heroAlt}
            fill
            priority
            sizes="100vw"
            style={{ objectPosition: site.theme.heroObjectPosition }}
          />
        </div>
        <div className="hero-shade" />
        <div className="hero-dock">
          <p className="hero-kicker">{site.kicker}</p>
          <h1 className="hero-brand">{site.name}</h1>
          <p className="hero-line">{site.heroLine}</p>
          <div className="hero-ctas">
            <a className="btn btn-light" href={site.primaryCta.href}>
              {site.primaryCta.label}
            </a>
            <Link
              className="btn btn-ghost"
              href="/book"
              style={{ color: "#fff", borderColor: "rgba(255,255,255,.45)" }}
            >
              Request a spot
            </Link>
          </div>
        </div>
      </section>

      <div className="policy-band" role="note">
        <div className="wrap">
          <p>
            <strong>Booking policy:</strong> {site.policyBanner}
          </p>
          <Link href="/faq" style={{ color: "var(--accent)", textDecoration: "underline" }}>
            Read FAQ
          </Link>
        </div>
      </div>

      <div className="wrap">
        <div className="trust">
          {site.trust.map((t) => (
            <div key={t.title}>
              <strong>{t.title}</strong>
              <span>{t.sub}</span>
            </div>
          ))}
        </div>
      </div>

      <section className="wrap">
        <div className="split">
          <Reveal>
            <div className="split-media">
              <Image
                src={img.calm}
                alt="Gentle, unhurried grooming for a nervous dog"
                fill
                sizes="(max-width:859px) 100vw, 45vw"
              />
            </div>
          </Reveal>
          <Reveal>
            <p className="section-kicker">Special-needs welcome</p>
            <h2 className="section-title">Patience for dogs who need more time</h2>
            <p className="section-lead">
              Anxious, fearful, reactive, senior, and special-needs dogs are not a side note here —
              they’re the heart of Crystal’s work. Looks never come before safety.
            </p>
            <div className="approach-list">
              {site.approach.map((a) => (
                <div className="approach-item" key={a.title}>
                  <h3>{a.title}</h3>
                  <p>{a.blurb}</p>
                </div>
              ))}
            </div>
            <p style={{ marginTop: "1.5rem" }}>
              <Link className="btn btn-primary" href="/about">
                Meet Crystal
              </Link>
            </p>
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
            Starting rates
          </Link>
        </p>
      </section>

      <section className="wrap">
        <Reveal>
          <p className="section-kicker">Gallery</p>
          <h2 className="section-title">Calm finishes</h2>
          <p className="section-lead">
            Stock placeholders for layout — swap in Crystal’s real client photos before launch.
          </p>
        </Reveal>
        <div className="gallery">
          {[img.g1, img.g2, img.g3, img.g4].map((src, i) => (
            <div className="gallery-item" key={src}>
              <Image src={src} alt={`Grooming portfolio placeholder ${i + 1}`} fill sizes="25vw" />
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
          <p className="section-kicker">Happy clients</p>
          <h2 className="section-title">What pet parents say</h2>
        </Reveal>
        <div className="grid-3">
          {site.reviews.slice(0, 3).map((r) => (
            <Reveal key={r.who}>
              <article className="card">
                <p style={{ color: "var(--accent)", letterSpacing: "0.12em" }}>★★★★★</p>
                <p style={{ margin: "0.75rem 0", color: "var(--ink)" }}>“{r.quote}”</p>
                <p>
                  <strong style={{ color: "var(--brand)" }}>{r.who}</strong>
                </p>
              </article>
            </Reveal>
          ))}
        </div>
        <p style={{ marginTop: "1.25rem" }}>
          <Link className="btn btn-ghost" href="/reviews">
            More reviews
          </Link>
        </p>
      </section>

      <section className="wrap">
        <Reveal>
          <div className="cta-panel">
            <p className="section-kicker">Book</p>
            <h2 className="section-title">{site.ctaBandTitle}</h2>
            <p className="section-lead">{site.ctaBandLead}</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
              <a className="btn btn-gold" href={site.primaryCta.href}>
                {site.primaryCta.label}
              </a>
              <Link
                className="btn btn-ghost"
                href="/book"
                style={{ color: "#fff", borderColor: "rgba(255,255,255,.4)" }}
              >
                Request form
              </Link>
              <Link
                className="btn btn-ghost"
                href="/faq"
                style={{ color: "#fff", borderColor: "rgba(255,255,255,.4)" }}
              >
                Policy FAQ
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
