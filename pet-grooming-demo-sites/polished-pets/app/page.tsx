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
              Why mobile
            </p>
            <h2>Cage-free spa care that rolls to your curb</h2>
            <p>
              No crowded waiting rooms. No kennels. One dog, one groomer, in a fully equipped van —
              outside your home or office in Denver and Boulder County.
            </p>
            <ul className="nature-points">
              <li>Warm hydro bath + premium products in the van</li>
              <li>Matched groomers for soft temperaments & special needs</li>
              <li>Office meetups so you never leave work</li>
              <li>App updates and photos during the appointment</li>
            </ul>
          </div>
        </Reveal>
      </section>

      <section className="wrap">
        <Reveal>
          <p className="section-kicker">Size pricing</p>
          <h2 className="section-title">Full Groom starters</h2>
          <p className="section-lead">
            Exact published tiers from the live menu — Small $120 · Medium $140 · Large $160.
          </p>
        </Reveal>
        <div className="tier-band">
          {site.pricing.map((p, i) => (
            <Reveal key={p.title}>
              <article className={`tier-card${i === 1 ? " featured" : ""}`}>
                <p className="tier-size">{p.size}</p>
                <h2>{p.title.replace(` · ${p.size}`, "")}</h2>
                <p className="tier-weight">
                  Weight <strong>{p.weight}</strong>
                </p>
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
            Full menu & add-ons
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
          {site.services.map((s) => (
            <Reveal key={s.title}>
              <article className="card">
                <h3>{s.title}</h3>
                {s.price ? <div className="price">{s.price}</div> : null}
                <p>{s.blurb}</p>
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
            Layout placeholders — swap in real van and client photos from Instagram before launch.
          </p>
        </Reveal>
        <div className="gallery">
          {[img.g1, img.g2, img.g3, img.g4, img.g5, img.g6].map((src, i) => (
            <div className="gallery-item" key={src}>
              <Image src={src} alt={`Grooming portfolio placeholder ${i + 1}`} fill sizes="33vw" />
            </div>
          ))}
        </div>
        <p style={{ marginTop: "1.25rem", display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
          <Link className="btn btn-ghost" href="/gallery">
            Open portfolio
          </Link>
          <a className="btn btn-primary" href={site.instagramUrl} target="_blank" rel="noreferrer">
            Instagram
          </a>
        </p>
      </section>

      <section className="wrap">
        <Reveal>
          <p className="section-kicker">Happy clients</p>
          <h2 className="section-title">What pet parents say</h2>
          <p className="section-lead">Illustrative quotes for layout — replace with verified reviews.</p>
        </Reveal>
        <div className="grid-3">
          {site.reviews.map((r) => (
            <Reveal key={r.who}>
              <article className="card">
                <p style={{ color: "var(--spark)", letterSpacing: "0.12em" }}>★★★★★</p>
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
          <div className="card" style={{ display: "grid", gap: "1rem" }}>
            <p className="section-kicker">Book</p>
            <h2 className="section-title" style={{ marginBottom: 0 }}>
              {site.ctaBandTitle}
            </h2>
            <p className="section-lead" style={{ marginBottom: 0 }}>
              {site.ctaBandLead}
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
              <a className="btn btn-primary" href={site.primaryCta.href}>
                {site.primaryCta.label}
              </a>
              <a className="btn btn-ghost" href={`tel:${site.phoneTel}`}>
                {site.phone}
              </a>
              <Link className="btn btn-ghost" href="/faq">
                Read FAQ
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
