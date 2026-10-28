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
          <p className="hero-line">{site.heroLine}</p>
          <div className="hero-ctas">
            <a className="btn btn-light" href={site.primaryCta.href}>
              {site.primaryCta.label}
            </a>
            <Link
              className="btn btn-ghost"
              href="/pricing"
              style={{ color: "#fff", borderColor: "rgba(255,255,255,.45)" }}
            >
              Size pricing
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
          <div className="nature-strip">
            <p className="section-kicker" style={{ color: "var(--accent)" }}>
              Dogs come first
            </p>
            <h2>Austin’s mobile spa with swagger</h2>
            <p>
              Founded in 2014 by award-winning Austinite {site.founder}, SWAGG rolls a fully
              equipped unit to your curb — allergy- and skin-aware products, calm handling, and
              finishes you’d want for your own dog.
            </p>
            <ul className="nature-points">
              <li>Professional mobile unit with salon equipment</li>
              <li>Allergy &amp; skin treatment–aware styling</li>
              <li>Pet-safe products for coat and comfort</li>
              <li>Text-to-book routing Mon–Sat 8–6</li>
            </ul>
          </div>
        </Reveal>
      </section>

      <section className="wrap">
        <Reveal>
          <p className="section-kicker">Size pricing</p>
          <h2 className="section-title">Full Groom starters</h2>
          <p className="section-lead">
            Exact published starters from the live menu — Small $85 · Medium $105 · Large $130 ·
            XL $150 and up.
          </p>
        </Reveal>
        <div className="tier-band">
          {site.pricing.map((p, i) => (
            <Reveal key={p.title}>
              <article className={`tier-card${i === 0 ? " featured" : ""}`}>
                <p className="tier-size">{p.size}</p>
                <h2>Full Groom</h2>
                <div className="tier-price-row">
                  <span className="tier-prefix">{p.pricePrefix}</span>
                  <span className="tier-amount">{p.price}</span>
                </div>
                {p.note ? <p className="tier-note">{p.note}</p> : null}
                <ul>
                  <li>{site.fullGroomIncludes}</li>
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
        <p>
          <Link className="btn btn-primary" href="/pricing">
            Full menu &amp; baths
          </Link>
        </p>
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
        <p style={{ marginTop: "1.25rem" }}>
          <Link className="btn btn-ghost" href="/services">
            All services
          </Link>
        </p>
      </section>

      <section className="wrap">
        <Reveal>
          <p className="section-kicker">Gallery</p>
          <h2 className="section-title">Fresh finishes</h2>
          <p className="section-lead">
            Layout placeholders — swap in real SWAGG van and client photos before launch.
          </p>
        </Reveal>
        <div className="gallery">
          {[img.g1, img.g2, img.g3, img.g4, img.g5, img.g6].map((src, i) => (
            <div className="gallery-item" key={src}>
              <Image src={src} alt={`Grooming portfolio placeholder ${i + 1}`} fill sizes="33vw" />
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
          <p className="section-kicker">Happy dog parents</p>
          <h2 className="section-title">What Austin says</h2>
        </Reveal>
        <div className="grid-3">
          {site.reviews.map((r) => (
            <Reveal key={r.who}>
              <article className="card">
                <p className="quote-mark">★★★★★</p>
                <p style={{ margin: "0.75rem 0", color: "var(--ink)" }}>“{r.quote}”</p>
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
          <div className="nature-strip">
            <p className="section-kicker" style={{ color: "var(--accent)" }}>
              Book
            </p>
            <h2>{site.ctaBandTitle}</h2>
            <p>{site.ctaBandLead}</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", marginTop: "0.5rem" }}>
              <a className="btn btn-light" href={site.primaryCta.href}>
                {site.primaryCta.label}
              </a>
              <a
                className="btn btn-ghost"
                href={`tel:${site.phoneTel}`}
                style={{ color: "#fff", borderColor: "rgba(255,255,255,.45)" }}
              >
                Text {site.phone}
              </a>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
