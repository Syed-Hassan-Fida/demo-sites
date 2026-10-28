import Image from "next/image";
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
        <Link className="logo-lockup" href="/" aria-label={`${site.name} home`}>
          <Image src="/logo.png" alt="" width={220} height={96} priority className="logo-img" />
          <span className="logo-text">{site.name}</span>
        </Link>
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
  const ig = String(site.instagram || "").replace("@", "");
  return (
    <footer className="site-footer">
      <div className="wrap footer-grid">
        <div>
          <Image src="/logo.png" alt={site.name} width={200} height={88} className="footer-logo" />
          <p>{site.tagline}</p>
          <p style={{ marginTop: "0.75rem" }}>{site.address}</p>
          <p style={{ marginTop: "0.35rem" }}>{site.hours}</p>
          <p style={{ fontSize: "0.8rem" }}>{site.hoursNote}</p>
        </div>
        <div>
          <p><a href={`tel:${site.phoneTel}`}>{site.phone}</a></p>
          <p><a href={`mailto:${site.email}`}>{site.email}</a></p>
          {ig ? (
            <p>
              <a href={`https://instagram.com/${ig}`} target="_blank" rel="noreferrer">
                Instagram @{ig}
              </a>
            </p>
          ) : null}
          {site.facebook ? (
            <p>
              <a href={site.facebook} target="_blank" rel="noreferrer">Facebook</a>
            </p>
          ) : null}
        </div>
        <div>
          <p><Link href="/about">About</Link></p>
          <p><Link href="/policies">Shop policies</Link></p>
          <p><Link href="/privacy">Privacy</Link></p>
          <p><Link href="/terms">Terms</Link></p>
          <p><Link href="/accessibility">Accessibility</Link></p>
          <p><Link href="/book">Book</Link></p>
        </div>
      </div>
      <div className="wrap">
        <p>
          Demo redesign concept · {site.name} remains the brand owner · Client portraits from the live studio gallery for layout preview
        </p>
      </div>
    </footer>
  );
}

export function MobileBar() {
  return (
    <div className="mobile-bar">
      <a className="btn btn-primary" href={site.primaryCta.href}>{site.primaryCta.label}</a>
      <Link className="btn btn-ghost" href="/book">Request</Link>
    </div>
  );
}
