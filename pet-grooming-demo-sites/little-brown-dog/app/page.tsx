import Image from "next/image";
import Link from "next/link";
import { Reveal } from "./components/Reveal";
import { img, portraits } from "./lib/images";
import { site } from "./lib/site";

export default function HomePage() {
  const featured = portraits.slice(0, 8);

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
          />
        </div>
        <div className="hero-shade" />
        <div className="hero-dock">
          <p className="hero-kicker">{site.kicker}</p>
          <h1 className="hero-brand">{site.name}</h1>
          <p className="hero-line">{site.heroLine}</p>
          <div className="hero-ctas">
            <a className="btn btn-light" href={site.primaryCta.href}>{site.primaryCta.label}</a>
            <Link
              className="btn btn-ghost"
              href="/gallery"
              style={{ color: "#fff", borderColor: "rgba(255,255,255,.45)" }}
            >
              Named portrait gallery
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
          <p className="section-kicker">Studio portraits</p>
          <h2 className="section-title">Max, Owen, CJ & company</h2>
          <p className="section-lead">
            The live gallery already tells the craft story — named client portraits, not anonymous stock.
            This redesign keeps that editorial spine and makes booking as clear as the finish.
          </p>
        </Reveal>
        <div className="portrait-rail">
          {featured.map((p, i) => (
            <Reveal key={"key" in p ? p.key : `${p.name}-${i}`}>
              <figure className="portrait">
                <Image src={p.src} alt={`${p.name} — ${p.note}`} fill sizes="(max-width:860px) 50vw, 25vw" />
                <figcaption>
                  {p.name}
                  <span>{p.note}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
        <p style={{ marginTop: "1.25rem" }}>
          <Link className="btn btn-ghost" href="/gallery">Full gallery</Link>
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
        <p style={{ marginTop: "1.25rem", display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
          <Link className="btn btn-primary" href="/services">All services</Link>
          <Link className="btn btn-ghost" href="/pricing">Breed-tier pricing</Link>
        </p>
      </section>

      <section className="wrap">
        <div className="split">
          <Reveal>
            <div className="split-media">
              <Image
                src={img.about}
                alt="Banner — studio portrait from Little Brown Dog"
                fill
                sizes="(max-width:860px) 100vw, 50vw"
              />
            </div>
          </Reveal>
          <Reveal>
            <div>
              <p className="section-kicker">Master groomer</p>
              <h2 className="section-title">Brooke El-Merrahi, NCMG, CCE</h2>
              <p className="section-lead" style={{ marginBottom: "1rem" }}>
                A salon-like sanctuary in the Navajo Art District — straight-through appointments,
                towel-free drying, and finishes limited only by coat and imagination.
              </p>
              <Link className="btn btn-ghost" href="/about">About the studio</Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="wrap">
        <Reveal>
          <p className="section-kicker">Notes from clients</p>
          <h2 className="section-title">What pet parents say</h2>
          <p className="section-lead">
            Placeholder slots until real public reviews are pasted in — the live site leads with portraits, not quotes.
          </p>
        </Reveal>
        <div className="grid-3">
          {site.reviews.map((r) => (
            <Reveal key={r.who}>
              <article className="card">
                <p style={{ color: "var(--accent)", letterSpacing: "0.12em", fontSize: "0.8rem" }}>PLACEHOLDER</p>
                <p style={{ margin: "0.75rem 0", color: "var(--ink)" }}>“{r.quote}”</p>
                <p><strong style={{ color: "var(--brand)" }}>{r.who}</strong></p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="wrap">
        <Reveal>
          <div className="card" style={{ display: "grid", gap: "1rem" }}>
            <p className="section-kicker">Book</p>
            <h2 className="section-title" style={{ marginBottom: 0 }}>{site.ctaBandTitle}</h2>
            <p className="section-lead" style={{ marginBottom: 0 }}>{site.ctaBandLead}</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
              <a className="btn btn-primary" href={site.primaryCta.href}>{site.primaryCta.label}</a>
              <Link className="btn btn-ghost" href="/book">Send a request</Link>
              <Link className="btn btn-ghost" href="/faq">Read FAQ</Link>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
