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
          <p className="hero-owner">{site.owner} · Professional handler · Denver</p>
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
              Meet Kimberly
            </Link>
          </div>
        </div>
      </section>

      <div className="wrap">
        <div className="trust" role="list">
          {site.trust.map((t) => (
            <div className="trust-item" role="listitem" key={t.title}>
              <strong>{t.title}</strong>
              <span>{t.sub}</span>
            </div>
          ))}
        </div>
      </div>

      <section className="wrap">
        <div className="story">
          <Reveal>
            <div>
              <div className="story-visual">
                <Image
                  src={img.portrait}
                  alt={`${site.owner} — Kim the Groomer portrait from Zen Den profile`}
                  fill
                  sizes="(max-width: 859px) 100vw, 40vw"
                  priority
                />
              </div>
              <p className="story-caption">
                <strong>{site.owner}</strong> · portrait from her Zen Den profile
              </p>
            </div>
          </Reveal>
          <Reveal>
            <p className="section-kicker">About</p>
            <h2 className="section-title">Handler background. Family salon craft.</h2>
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
        <div className="service-list">
          {site.services.map((s) => (
            <Reveal key={s.title}>
              <article className="service-row">
                <div>
                  <div className="service-row-top">
                    <h3>{s.title}</h3>
                    {s.price ? <div className="price">{s.price}</div> : null}
                  </div>
                  <p>{s.blurb}</p>
                </div>
                {s.includes?.length ? (
                  <ul>
                    {s.includes.map((i) => (
                      <li key={i}>{i}</li>
                    ))}
                  </ul>
                ) : null}
              </article>
            </Reveal>
          ))}
        </div>
        <p style={{ marginTop: "1.35rem" }}>
          <Link className="btn btn-ghost" href="/services">
            All services
          </Link>
        </p>
      </section>

      <section className="wrap">
        <Reveal>
          <p className="section-kicker">Gallery</p>
          <h2 className="section-title">Presentation finishes</h2>
          <p className="section-lead">
            Stock photography for layout — swap in Kim’s real client gallery before launch.
          </p>
        </Reveal>
        <div className="gallery">
          {[img.g1, img.g2, img.g3, img.g4].map((src, i) => (
            <div className="gallery-item" key={src}>
              <Image
                src={src}
                alt={`Grooming portfolio placeholder ${i + 1}`}
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
          <p className="section-kicker">From the table</p>
          <h2 className="section-title">What pet parents notice</h2>
        </Reveal>
        <div className="quote-rail">
          {site.reviews.map((r) => (
            <Reveal key={r.who}>
              <blockquote>
                “{r.quote}”
                <cite>
                  {r.who}
                  {r.meta ? ` · ${r.meta}` : ""}
                </cite>
              </blockquote>
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
              <a className="btn btn-light" href={site.primaryCta.href}>
                {site.primaryCta.label}
              </a>
              <Link
                className="btn btn-ghost"
                href="/book"
                style={{ color: "#fff", borderColor: "rgba(255,255,255,.4)" }}
              >
                Request a visit
              </Link>
              <Link
                className="btn btn-ghost"
                href="/faq"
                style={{ color: "#fff", borderColor: "rgba(255,255,255,.4)" }}
              >
                FAQ
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
