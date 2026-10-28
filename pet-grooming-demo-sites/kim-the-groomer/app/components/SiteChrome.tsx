import Link from "next/link";
import { site } from "../lib/site";

const links = [
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/pricing", label: "Pricing" },
  { href: "/gallery", label: "Gallery" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export function Wordmark({ tone = "ink" }: { tone?: "ink" | "light" }) {
  return (
    <span className="wordmark" style={tone === "light" ? { color: "#f7efe8" } : undefined}>
      <span className="wordmark-mark" aria-hidden="true">
        KT
      </span>
      <span>
        <span className="wordmark-name">{site.name}</span>
        <span className="wordmark-sub" style={tone === "light" ? { color: "rgba(247,239,232,.72)" } : undefined}>
          {site.owner}
        </span>
      </span>
    </span>
  );
}

export function DemoBanner() {
  return (
    <div className="demo-banner">
      <strong>Redesign demo</strong> — concept for {site.name}. Not the live site. Pay only if you
      love it ($150–$300 scoped rebuild).
    </div>
  );
}

export function Notice() {
  if (!site.notice) return null;
  return (
    <div className="notice">
      <div className="wrap notice-inner">
        <strong>{site.notice.title}</strong>
        <p>{site.notice.body}</p>
      </div>
    </div>
  );
}

export function Header() {
  return (
    <header className="site-header">
      <div className="wrap nav">
        <Link className="logo" href="/" aria-label={`${site.name} home`}>
          <Wordmark />
        </Link>
        <nav className="nav-links" aria-label="Primary">
          {links.map((l) => (
            <Link key={l.href} href={l.href}>
              {l.label}
            </Link>
          ))}
        </nav>
        <a className="btn btn-primary btn-nav" href={site.primaryCta.href}>
          {site.primaryCta.label}
        </a>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-grid">
        <div>
          <p style={{ marginBottom: "0.65rem" }}>
            <Wordmark />
          </p>
          <p>{site.tagline}</p>
          <p style={{ marginTop: "0.75rem" }}>{site.address}</p>
        </div>
        <div>
          <p>
            <a href={`tel:${site.phoneTel}`}>{site.phone}</a>
          </p>
          <p>
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </p>
          <p style={{ marginTop: "0.5rem" }}>{site.legalName}</p>
        </div>
        <div>
          <p>
            <Link href="/about">About</Link>
          </p>
          <p>
            <Link href="/book">Book</Link>
          </p>
          <p>
            <Link href="/privacy">Privacy</Link>
          </p>
          <p>
            <Link href="/terms">Terms</Link>
          </p>
          <p>
            <Link href="/accessibility">Accessibility</Link>
          </p>
        </div>
      </div>
      <div className="wrap">
        <p>
          Demo redesign concept · {site.name} remains the brand owner · Zen Den portrait + stock
          photos for preview
        </p>
      </div>
    </footer>
  );
}

export function MobileBar() {
  return (
    <div className="mobile-bar">
      <a className="btn btn-primary" href={site.primaryCta.href}>
        {site.primaryCta.label}
      </a>
      <Link className="btn btn-ghost" href="/book">
        Book
      </Link>
    </div>
  );
}
