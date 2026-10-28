"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { educationNav } from "../lib/education";
import { galleryCategories } from "../lib/gallery";
import { morePages } from "../lib/more";
import { site } from "../lib/site";

function SocialIcons({ className }: { className?: string }) {
  return (
    <div className={className}>
      <a href={site.facebook} target="_blank" rel="noreferrer" aria-label="Facebook">
        f
      </a>
      <a href={site.instagram} target="_blank" rel="noreferrer" aria-label="Instagram">
        ig
      </a>
    </div>
  );
}

function Brand() {
  return (
    <Link className="brand-lockup" href="/">
      <Image src={site.logo} alt="" width={48} height={48} priority />
      <span className="logo-text">{site.name}</span>
    </Link>
  );
}

export function DemoBanner() {
  return (
    <div className="demo-banner">
      <strong>Redesign demo</strong> — concept for {site.namePlain}. Not the live site.
      Pay only if you love it ($150–$300 scoped rebuild).
    </div>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="wrap nav">
        <Brand />
        <nav className="nav-links" aria-label="Primary">
          <details className="nav-drop">
            <summary>About</summary>
            <div className="nav-panel">
              <Link href="/about">Staff</Link>
              <Link href="/testimonials">Testimonials</Link>
              <Link href="/faq">FAQ</Link>
            </div>
          </details>
          <Link href="/services">Services</Link>
          <details className="nav-drop">
            <summary>Education</summary>
            <div className="nav-panel" style={{ maxHeight: "70vh", overflow: "auto" }}>
              <Link href="/education">Education hub</Link>
              {educationNav.map((p) => (
                <Link key={p.slug} href={`/education/${p.slug}`}>{p.title}</Link>
              ))}
            </div>
          </details>
          <Link href="/book">Book Now</Link>
          <Link href="/contact">Contact</Link>
          <details className="nav-drop">
            <summary>More</summary>
            <div className="nav-panel" style={{ maxHeight: "70vh", overflow: "auto", minWidth: "16rem" }}>
              <Link href="/gallery">Gallery</Link>
              {galleryCategories.map((c) => (
                <Link key={c.slug} href={`/gallery/${c.slug}`}>{c.title}</Link>
              ))}
              <Link href="/products">Products</Link>
              <Link href="/more">More hub</Link>
              {morePages.map((p) => (
                <Link key={p.slug} href={`/more/${p.slug}`}>{p.title}</Link>
              ))}
              <Link href="/pricing">Pricing</Link>
            </div>
          </details>
        </nav>
        <SocialIcons className="nav-socials" />
        <a className="btn btn-primary btn-nav" href={site.primaryCta.href}>{site.primaryCta.label}</a>
        <button type="button" className="nav-toggle" aria-expanded={open} onClick={() => setOpen((v) => !v)}>
          Menu
        </button>
      </div>
      {open ? (
      <div className="mobile-drawer open">
        <div className="wrap" style={{ display: "grid", gap: "0.35rem" }}>
          <details>
            <summary>About</summary>
            <div className="sub">
              <Link href="/about" onClick={() => setOpen(false)}>Staff</Link>
              <Link href="/testimonials" onClick={() => setOpen(false)}>Testimonials</Link>
              <Link href="/faq" onClick={() => setOpen(false)}>FAQ</Link>
            </div>
          </details>
          <Link href="/services" onClick={() => setOpen(false)}>Services</Link>
          <details>
            <summary>Education</summary>
            <div className="sub">
              <Link href="/education" onClick={() => setOpen(false)}>Education hub</Link>
              {educationNav.map((p) => (
                <Link key={p.slug} href={`/education/${p.slug}`} onClick={() => setOpen(false)}>{p.title}</Link>
              ))}
            </div>
          </details>
          <Link href="/book" onClick={() => setOpen(false)}>Book Now</Link>
          <Link href="/contact" onClick={() => setOpen(false)}>Contact</Link>
          <details>
            <summary>More</summary>
            <div className="sub">
              <Link href="/gallery" onClick={() => setOpen(false)}>Gallery</Link>
              {galleryCategories.map((c) => (
                <Link key={c.slug} href={`/gallery/${c.slug}`} onClick={() => setOpen(false)}>{c.title}</Link>
              ))}
              <Link href="/products" onClick={() => setOpen(false)}>Products</Link>
              <Link href="/pricing" onClick={() => setOpen(false)}>Pricing</Link>
              {morePages.map((p) => (
                <Link key={p.slug} href={`/more/${p.slug}`} onClick={() => setOpen(false)}>{p.title}</Link>
              ))}
            </div>
          </details>
          <SocialIcons className="footer-socials" />
        </div>
      </div>
      ) : null}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-grid">
        <div>
          <Brand />
          <p style={{ marginTop: "0.75rem" }}>{site.tagline}</p>
          <p style={{ marginTop: "0.75rem" }}>{site.address}</p>
          <SocialIcons className="footer-socials" />
        </div>
        <div>
          <p><a href={`tel:${site.phoneTel}`}>{site.phone}</a></p>
          <p><a href={`tel:${site.phoneAltTel}`}>{site.phoneAlt}</a></p>
          <p><a href={`mailto:${site.email}`}>{site.email}</a></p>
          {site.hours.map((h) => (
            <p key={h.day}>{h.day}: {h.time}</p>
          ))}
        </div>
        <div>
          <p><Link href="/education">Education</Link></p>
          <p><Link href="/gallery">Gallery</Link></p>
          <p><Link href="/services">Services</Link></p>
          <p><Link href="/products">Products</Link></p>
          <p><Link href="/book">Book</Link></p>
        </div>
        <div>
          <p><Link href="/privacy">Privacy</Link></p>
          <p><Link href="/terms">Terms</Link></p>
          <p><Link href="/accessibility">Accessibility</Link></p>
          <p><Link href="/faq">FAQ</Link></p>
        </div>
      </div>
      <div className="wrap">
        <p>Demo redesign concept · {site.namePlain} remains the brand owner · Stock photos for preview</p>
      </div>
    </footer>
  );
}

export function MobileBar() {
  return (
    <div className="mobile-bar">
      <a className="btn btn-primary" href={site.primaryCta.href}>{site.primaryCta.label}</a>
      <a className="btn btn-ghost" href={`tel:${site.phoneTel}`}>Call</a>
    </div>
  );
}
