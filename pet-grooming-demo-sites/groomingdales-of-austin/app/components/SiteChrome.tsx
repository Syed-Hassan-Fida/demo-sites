import Link from "next/link";
import { site } from "../lib/site";

const links = [
  { href: "/services", label: "Services" },
  { href: "/pricing", label: "Pricing" },
  { href: "/gallery", label: "Gallery" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export function DemoBanner() {
  return (
    <div className="demo-banner">
      <strong>Redesign demo</strong> — concept for {site.name}. Not the live site.
      Pay only if you love it ($150–$300 scoped rebuild).
    </div>
  );
}

export function Header() {
  return (
    <header className="site-header">
      <div className="wrap nav">
        <Link className="logo" href="/">{site.name}</Link>
        <nav className="nav-links" aria-label="Primary">
          {links.map((l) => (
            <Link key={l.href} href={l.href}>{l.label}</Link>
          ))}
        </nav>
        <a className="btn btn-primary btn-nav" href={site.primaryCta.href}>{site.primaryCta.label}</a>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-grid">
        <div>
          <p className="logo" style={{ marginBottom: "0.5rem" }}>{site.name}</p>
          <p>{site.tagline}</p>
          <p style={{ marginTop: "0.75rem" }}>{site.address}</p>
        </div>
        <div>
          <p><a href={`tel:${site.phoneTel}`}>{site.phone}</a></p>
          <p><a href={`mailto:${site.email}`}>{site.email}</a></p>
          {(() => { const ig = String(site.instagram || ""); return ig ? <p><a href={`https://instagram.com/${ig.replace("@","")}`} target="_blank" rel="noreferrer">{ig}</a></p> : null; })()}
        </div>
        <div>
          <p><Link href="/privacy">Privacy</Link></p>
          <p><Link href="/terms">Terms</Link></p>
          <p><Link href="/accessibility">Accessibility</Link></p>
          <p><Link href="/book">Book</Link></p>
        </div>
      </div>
      <div className="wrap">
        <p>Demo redesign concept · {site.name} remains the brand owner · Stock photos for preview</p>
      </div>
    </footer>
  );
}

export function MobileBar() {
  return (
    <div className="mobile-bar">
      <a className="btn btn-primary" href={site.primaryCta.href}>{site.primaryCta.label}</a>
    </div>
  );
}
