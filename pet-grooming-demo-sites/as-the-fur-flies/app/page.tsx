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
            <Link className="btn btn-light" href="/book">Book a salon</Link>
            <Link
              className="btn btn-ghost"
              href="/cats"
              style={{ color: "#fff", borderColor: "rgba(255,255,255,.45)" }}
            >
              Cat suite
            </Link>
          </div>
        </div>
      </section>

      <div className="wrap">
        <div className="salon-strip" aria-label="Choose a salon">
          {site.locations.map((l) => (
            <Link key={l.id} className="salon-pick" href={`/book?salon=${l.id}`}>
              <em>{l.id === "north" ? "North · cats + students" : "South · dog spa"}</em>
              <strong>{l.name}</strong>
              <span>{l.address}</span>
            </Link>
          ))}
        </div>

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
          <p className="section-kicker">Services</p>
          <h2 className="section-title">{site.homeServicesTitle}</h2>
          <p className="section-lead">{site.homeServicesLead}</p>
        </Reveal>
        <div className="grid-3">
          {site.services.slice(0, 3).map((s) => (
            <Reveal key={s.title}>
              <article>
                <h3 className="display" style={{ color: "var(--brand)", fontSize: "1.55rem", marginBottom: "0.35rem" }}>
                  {s.title}
                </h3>
                <div className="price" style={{ fontSize: "1.2rem" }}>{s.price}</div>
                <p style={{ color: "var(--muted)" }}>{s.blurb}</p>
              </article>
            </Reveal>
          ))}
        </div>
        <p style={{ marginTop: "1.5rem", display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
          <Link className="btn btn-primary" href="/services">Dog services</Link>
          <Link className="btn btn-ghost" href="/pricing">Pricing &amp; add-ons</Link>
        </p>
      </section>

      <section className="wrap">
        <div className="split">
          <Reveal>
            <div className="split-media">
              <Image src={img.cat} alt="Calm cat ready for spa grooming" fill sizes="(max-width:860px) 100vw, 50vw" />
            </div>
          </Reveal>
          <Reveal>
            <p className="section-kicker">Feline suite</p>
            <h2 className="section-title">North Austin cat care</h2>
            <p className="section-lead">
              Quiet room with a window, NCGI-trained feline grooming, and the Kitty Cat Club for
              regulars who want 15% off when they book six months ahead.
            </p>
            <p className="ribbon" style={{ marginBottom: "1.1rem" }}>
              <Image src="/fear-free.png" alt="" width={120} height={36} />
              Fear Free certified team
            </p>
            <Link className="btn btn-primary" href="/cats">Explore cat services</Link>
          </Reveal>
        </div>
      </section>

      <section className="wrap">
        <Reveal>
          <p className="section-kicker">Gallery</p>
          <h2 className="section-title">Fresh finishes</h2>
          <p className="section-lead">
            Layout placeholders from stock photography — swap in your live gallery before launch.
          </p>
        </Reveal>
        <div className="gallery">
          {[img.g1, img.g2, img.g3, img.g4, img.g5, img.spa].map((src, i) => (
            <div className="gallery-item" key={src}>
              <Image src={src} alt={`Grooming portfolio placeholder ${i + 1}`} fill sizes="33vw" />
            </div>
          ))}
        </div>
        <p style={{ marginTop: "1.25rem" }}>
          <Link className="btn btn-ghost" href="/gallery">Open portfolio</Link>
        </p>
      </section>

      <section className="wrap">
        <Reveal>
          <p className="section-kicker">Happy clients</p>
          <h2 className="section-title">What Austin pet parents say</h2>
        </Reveal>
        <div className="grid-3">
          {site.reviews.slice(0, 3).map((r) => (
            <Reveal key={r.who}>
              <blockquote style={{ borderTop: "2px solid var(--accent)", paddingTop: "1rem" }}>
                <p style={{ color: "var(--ink)", marginBottom: "0.85rem" }}>“{r.quote}”</p>
                <p>
                  <strong style={{ color: "var(--brand)" }}>{r.who}</strong>
                  <span style={{ display: "block", color: "var(--muted)", fontSize: "0.88rem" }}>{r.meta}</span>
                </p>
              </blockquote>
            </Reveal>
          ))}
        </div>
        <p style={{ marginTop: "1.25rem" }}>
          <Link className="btn btn-ghost" href="/testimonials">More testimonials</Link>
        </p>
      </section>

      <section className="wrap">
        <Reveal>
          <div style={{
            padding: "2rem 0 0.5rem",
            borderTop: "1px solid var(--line)",
            display: "grid",
            gap: "1rem",
          }}>
            <p className="section-kicker">Book</p>
            <h2 className="section-title" style={{ marginBottom: 0 }}>{site.ctaBandTitle}</h2>
            <p className="section-lead" style={{ marginBottom: 0 }}>{site.ctaBandLead}</p>
            <p className="warning-note">
              A no-show / cancellation fee of 100% of the scheduled service applies if you schedule
              with the incorrect salon for same-day appointments. Confirm North vs South before you submit.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
              <Link className="btn btn-primary" href="/book?salon=north">Book North</Link>
              <Link className="btn btn-gold" href="/book?salon=south">Book South</Link>
              <Link className="btn btn-ghost" href="/faq">Read policies</Link>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
