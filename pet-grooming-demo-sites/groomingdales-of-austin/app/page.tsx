import Image from "next/image";
import Link from "next/link";
import { Reveal } from "./components/Reveal";
import { galleryCategories } from "./lib/gallery";
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
          <h1 className="hero-brand">Groomingdale&apos;s</h1>
          <p className="hero-subbrand">Of Austin · Award-winning dog grooming salon</p>
          <p className="hero-line">{site.heroLine}</p>
          <div className="hero-ctas">
            <a className="btn btn-light" href={site.primaryCta.href}>{site.primaryCta.label}</a>
            <Link className="btn btn-ghost" href="/gallery" style={{ color: "#fff", borderColor: "rgba(255,255,255,.45)" }}>
              View gallery
            </Link>
          </div>
        </div>
      </section>

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
        <Reveal>
          <p className="section-kicker">Welcome</p>
          <h2 className="section-title">A natural approach to spa-day care</h2>
          <p className="section-lead">
            Groomingdale&apos;s of Austin is an exciting concept in animal care, centering around a full-service
            pet grooming salon. We&apos;re committed to a more natural approach for your pet&apos;s physical and
            emotional well-being.
          </p>
        </Reveal>
      </section>

      <section className="wrap">
        <Reveal>
          <p className="section-kicker">Services</p>
          <h2 className="section-title">{site.homeServicesTitle}</h2>
          <p className="section-lead">{site.homeServicesLead}</p>
        </Reveal>
        <div className="grid-3">
          {site.services.map((s) => (
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
          <Link className="btn btn-primary" href="/services">All services</Link>
          <Link className="btn btn-ghost" href="/pricing">Pricing</Link>
        </p>
      </section>

      <section className="wrap">
        <Reveal>
          <p className="section-kicker">Gallery</p>
          <h2 className="section-title">Breed albums & pretty finishes</h2>
          <p className="section-lead">Browse the same categories as the live salon gallery — stock photos hold the layout until your images drop in.</p>
        </Reveal>
        <div className="cat-grid">
          {galleryCategories.slice(0, 6).map((c) => (
            <Link className="cat-tile" key={c.slug} href={`/gallery/${c.slug}`}>
              <strong>{c.title}</strong>
              <span>{c.blurb}</span>
            </Link>
          ))}
        </div>
        <p style={{ marginTop: "1.25rem" }}>
          <Link className="btn btn-ghost" href="/gallery">Open full gallery</Link>
        </p>
      </section>

      <section className="wrap">
        <Reveal>
          <p className="section-kicker">Education</p>
          <h2 className="section-title">Tips parents actually use</h2>
          <p className="section-lead">Brushing, bathing, doodles, breed profiles — the Education library from the live site, organized for mobile.</p>
        </Reveal>
        <p>
          <Link className="btn btn-primary" href="/education">Browse education</Link>
        </p>
      </section>

      <section className="wrap">
        <Reveal>
          <p className="section-kicker">Happy clients</p>
          <h2 className="section-title">Some paw-some words</h2>
        </Reveal>
        <div className="grid-2">
          {site.reviews.map((r) => (
            <Reveal key={r.who}>
              <article className="card">
                <p style={{ color: "var(--pink-deep)", letterSpacing: "0.12em" }}>★★★★★</p>
                <p style={{ margin: "0.75rem 0", color: "var(--ink)" }}>“{r.quote}”</p>
                <p><strong style={{ color: "var(--rose)" }}>{r.who}</strong></p>
              </article>
            </Reveal>
          ))}
        </div>
        <p style={{ marginTop: "1.25rem" }}>
          <Link className="btn btn-ghost" href="/testimonials">More testimonials</Link>
        </p>
      </section>

      <section className="wrap">
        <Reveal>
          <div className="card" style={{ display: "grid", gap: "1rem" }}>
            <p className="section-kicker">Book</p>
            <h2 className="section-title" style={{ marginBottom: 0 }}>{site.ctaBandTitle}</h2>
            <p className="section-lead" style={{ marginBottom: 0 }}>{site.ctaBandLead}</p>
            <p style={{ color: "var(--muted)", margin: 0 }}>{site.nailWalkIn}</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
              <a className="btn btn-primary" href={site.primaryCta.href}>{site.primaryCta.label}</a>
              <Link className="btn btn-ghost" href="/faq">Read FAQ</Link>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
