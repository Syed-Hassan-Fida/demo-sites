import Image from "next/image";
import Link from "next/link";
import { site } from "../lib/site";

const links = [
  { href: "/services", label: "Services" },
  { href: "/cats", label: "Cats" },
  { href: "/pricing", label: "Pricing" },
  { href: "/locations", label: "Locations" },
  { href: "/gallery", label: "Gallery" },
  { href: "/faq", label: "FAQ" },
  { href: "/team", label: "Team" },
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
      <path d="M14 9h3V6h-3c-1.7 0-3 1.3-3 3v2H9v3h2v7h3v-7h3l1-3h-4V9c0-.6.4-1 1-1z" />
    </svg>
  );
}

export function SocialLinks({ className = "" }: { className?: string }) {
  return (
    <div className={`social-row ${className}`.trim()}>
      <a href={site.instagramUrl} target="_blank" rel="noreferrer" aria-label="Instagram">
        <InstagramIcon />
      </a>
      <a href={site.facebook} target="_blank" rel="noreferrer" aria-label="Facebook">
        <FacebookIcon />
      </a>
    </div>
  );
}

export function DemoBanner() {
  return (
    <div className="demo-banner">
      <strong>Redesign demo</strong> — concept for {site.name}. Not the live Squarespace site.
      Pay only if you love it ($150–$300 scoped rebuild).
    </div>
  );
}

export function Header() {
  return (
    <header className="site-header">
      <div className="wrap nav">
        <Link className="logo" href="/">
          <Image src="/logo.png" alt="" width={130} height={65} priority />
          <span className="logo-text">{site.name}</span>
        </Link>
        <nav className="nav-links" aria-label="Primary">
          {links.map((l) => (
            <Link key={l.href} href={l.href}>{l.label}</Link>
          ))}
        </nav>
        <div className="nav-actions">
          <SocialLinks />
          <a className="btn btn-primary btn-nav" href={site.primaryCta.href}>{site.primaryCta.label}</a>
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
            <Image src="/logo.png" alt="" width={110} height={55} />
          </p>
          <p>{site.tagline}</p>
          <p style={{ marginTop: "0.85rem" }}>{site.address}</p>
          <div style={{ marginTop: "1rem" }}><SocialLinks /></div>
        </div>
        <div>
          <p style={{ color: "var(--brand)", fontWeight: 650, marginBottom: "0.45rem" }}>Visit</p>
          {site.locations.map((l) => (
            <p key={l.id} style={{ marginBottom: "0.55rem" }}>
              <strong style={{ color: "var(--ink)" }}>{l.name}</strong><br />
              <a href={`tel:${l.phoneTel}`}>{l.phone}</a><br />
              <a href={`mailto:${l.email}`}>{l.email}</a>
            </p>
          ))}
        </div>
        <div>
          <p style={{ color: "var(--brand)", fontWeight: 650, marginBottom: "0.45rem" }}>Explore</p>
          <p><Link href="/services">Services</Link></p>
          <p><Link href="/cats">Cat suite</Link></p>
          <p><Link href="/pricing">Pricing</Link></p>
          <p><Link href="/gallery">Gallery</Link></p>
          <p><Link href="/testimonials">Testimonials</Link></p>
          <p><Link href="/student">Student grooms</Link></p>
          <p><Link href="/careers">Careers</Link></p>
        </div>
        <div>
          <p style={{ color: "var(--brand)", fontWeight: 650, marginBottom: "0.45rem" }}>Legal</p>
          <p><Link href="/privacy">Privacy</Link></p>
          <p><Link href="/terms">Terms</Link></p>
          <p><Link href="/accessibility">Accessibility</Link></p>
          <p><Link href="/book">Book</Link></p>
          <p><Link href="/faq">FAQ</Link></p>
          <p><Link href="/contact">Contact</Link></p>
        </div>
      </div>
      <div className="wrap">
        <p>Demo redesign concept · {site.name} remains the brand owner · Stock photos for preview layout</p>
      </div>
    </footer>
  );
}

export function MobileBar() {
  return (
    <div className="mobile-bar">
      <a className="btn btn-ghost" href="/book?salon=north">North</a>
      <a className="btn btn-primary" href="/book?salon=south">South</a>
    </div>
  );
}
