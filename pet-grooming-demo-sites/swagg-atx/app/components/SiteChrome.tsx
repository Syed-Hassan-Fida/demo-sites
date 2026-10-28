import Image from "next/image";
import Link from "next/link";
import { site } from "../lib/site";

const links = [
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/pricing", label: "Pricing" },
  { href: "/gallery", label: "Gallery" },
  { href: "/faq", label: "FAQ" },
  { href: "/service-area", label: "Areas" },
  { href: "/contact", label: "Contact" },
];

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M13.5 22v-8h2.7l.4-3.1h-3.1V8.9c0-.9.3-1.5 1.6-1.5H16.8V4.6c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.3H8.2V14h2.4v8h2.9z" />
    </svg>
  );
}

export function SocialLinks({ className = "" }: { className?: string }) {
  return (
    <div className={`social-row ${className}`.trim()}>
      <a
        href={site.instagramUrl}
        target="_blank"
        rel="noreferrer"
        aria-label={`Instagram ${site.instagram}`}
      >
        <InstagramIcon />
      </a>
      <a
        href={site.facebookUrl}
        target="_blank"
        rel="noreferrer"
        aria-label="Facebook SWAGGATX"
      >
        <FacebookIcon />
      </a>
    </div>
  );
}

export function DemoBanner() {
  return (
    <div className="demo-banner">
      <strong>Redesign demo</strong> — concept for {site.name}. Not the live site. Pay only if
      you love it ($150–$300 scoped rebuild).
    </div>
  );
}

export function Header() {
  return (
    <header className="site-header">
      <div className="wrap nav">
        <Link className="logo" href="/">
          <Image src="/logo.png" alt="" width={48} height={60} priority aria-hidden />
          <span className="logo-text">{site.name}</span>
        </Link>
        <nav className="nav-links" aria-label="Primary">
          {links.map((l) => (
            <Link key={l.href} href={l.href}>
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="nav-actions">
          <SocialLinks />
          <a className="btn btn-primary btn-nav" href={site.primaryCta.href}>
            {site.primaryCta.label}
          </a>
        </div>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-grid">
        <div>
          <p className="logo" style={{ marginBottom: "0.65rem" }}>
            <Image src="/logo.png" alt="" width={40} height={50} />
            <span className="logo-text">{site.legalName}</span>
          </p>
          <p>{site.tagline}</p>
          <p style={{ marginTop: "0.75rem" }}>{site.address}</p>
          <p style={{ marginTop: "0.35rem" }}>{site.hours}</p>
          <div style={{ marginTop: "1rem" }}>
            <SocialLinks />
          </div>
        </div>
        <div>
          <p style={{ color: "var(--brand)", fontWeight: 650, marginBottom: "0.45rem" }}>
            Contact
          </p>
          <p>
            <a href={`tel:${site.phoneTel}`}>{site.phone}</a>
          </p>
          <p>
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </p>
          <p>
            <a href={site.instagramUrl} target="_blank" rel="noreferrer">
              {site.instagram}
            </a>
          </p>
          <p>
            <a href={site.facebookUrl} target="_blank" rel="noreferrer">
              facebook.com/SWAGGATX
            </a>
          </p>
        </div>
        <div>
          <p style={{ color: "var(--brand)", fontWeight: 650, marginBottom: "0.45rem" }}>
            Explore
          </p>
          <p>
            <Link href="/about">About</Link>
          </p>
          <p>
            <Link href="/services">Services</Link>
          </p>
          <p>
            <Link href="/pricing">Pricing</Link>
          </p>
          <p>
            <Link href="/gallery">Gallery</Link>
          </p>
          <p>
            <Link href="/faq">FAQ</Link>
          </p>
          <p>
            <Link href="/service-area">Service area</Link>
          </p>
          <p>
            <Link href="/book">Book</Link>
          </p>
        </div>
        <div>
          <p style={{ color: "var(--brand)", fontWeight: 650, marginBottom: "0.45rem" }}>
            Legal
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
          <p>
            <Link href="/contact">Contact</Link>
          </p>
        </div>
      </div>
      <div className="wrap">
        <p>
          Demo redesign concept · {site.name} remains the brand owner · Stock photos for preview
          layout
        </p>
      </div>
    </footer>
  );
}

export function MobileBar() {
  return (
    <div className="mobile-bar">
      <a className="btn btn-ghost" href={`tel:${site.phoneTel}`}>
        Call / text
      </a>
      <a className="btn btn-primary" href={site.primaryCta.href}>
        {site.primaryCta.label}
      </a>
    </div>
  );
}
