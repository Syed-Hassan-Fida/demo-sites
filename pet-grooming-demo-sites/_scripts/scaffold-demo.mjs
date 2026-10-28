#!/usr/bin/env node
/**
 * Scaffolds a full Next.js App Router demo site from a JSON config.
 * Usage: node scaffold-demo.mjs ../configs/as-the-fur-flies.json
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const configPath = process.argv[2];
if (!configPath) {
  console.error("Usage: node scaffold-demo.mjs <config.json>");
  process.exit(1);
}

const cfg = JSON.parse(fs.readFileSync(path.resolve(configPath), "utf8"));
const out = path.join(root, cfg.slug);
fs.mkdirSync(out, { recursive: true });

function write(rel, content) {
  const p = path.join(out, rel);
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, content);
  console.log("  +", rel);
}

const pagesList = cfg.pages || [
  "",
  "services",
  "pricing",
  "gallery",
  "faq",
  "book",
  "contact",
  "privacy",
  "terms",
  "accessibility",
];

write(
  "package.json",
  JSON.stringify(
    {
      name: `${cfg.slug}-demo`,
      version: "0.1.0",
      private: true,
      scripts: { dev: "next dev", build: "next build", start: "next start", lint: "next lint" },
      dependencies: { next: "^15.1.0", react: "^19.0.0", "react-dom": "^19.0.0" },
      devDependencies: {
        "@types/node": "^22.10.0",
        "@types/react": "^19.0.0",
        "@types/react-dom": "^19.0.0",
        typescript: "^5.7.0",
      },
    },
    null,
    2
  )
);

write(
  "tsconfig.json",
  JSON.stringify(
    {
      compilerOptions: {
        target: "ES2017",
        lib: ["dom", "dom.iterable", "esnext"],
        allowJs: true,
        skipLibCheck: true,
        strict: true,
        noEmit: true,
        esModuleInterop: true,
        module: "esnext",
        moduleResolution: "bundler",
        resolveJsonModule: true,
        isolatedModules: true,
        jsx: "preserve",
        incremental: true,
        plugins: [{ name: "next" }],
        paths: { "@/*": ["./*"] },
      },
      include: ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
      exclude: ["node_modules"],
    },
    null,
    2
  )
);

write(
  "next.config.mjs",
  `/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [{ protocol: "https", hostname: "images.pexels.com" }],
  },
};
export default nextConfig;
`
);

write(
  "next-env.d.ts",
  `/// <reference types="next" />
/// <reference types="next/image-types/global" />
`
);

write(
  "app/lib/site.ts",
  `export const site = ${JSON.stringify(cfg, null, 2)} as const;

export type SiteConfig = typeof site;
`
);

write(
  "app/lib/images.ts",
  `export const img = ${JSON.stringify(cfg.images, null, 2)} as const;
`
);

write(
  "app/globals.css",
  `:root {
  --bg: ${cfg.theme.bg};
  --ink: ${cfg.theme.ink};
  --brand: ${cfg.theme.brand};
  --accent: ${cfg.theme.accent};
  --muted: ${cfg.theme.muted};
  --paper: ${cfg.theme.paper};
  --line: color-mix(in srgb, var(--brand) 14%, transparent);
}

* { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
body {
  font-family: var(--font-body), system-ui, sans-serif;
  color: var(--ink);
  background: var(--bg);
  line-height: 1.55;
  overflow-x: hidden;
}
h1,h2,h3,.logo,.display {
  font-family: var(--font-display), Georgia, serif;
  font-weight: 550;
  letter-spacing: -0.025em;
  line-height: 1.1;
}
a { color: inherit; text-decoration: none; }
img { max-width: 100%; display: block; }
button, input, textarea, select { font: inherit; }
:focus-visible { outline: 2px solid var(--accent); outline-offset: 3px; }

.demo-banner {
  background: #14110f; color: #f3e8d8; text-align: center;
  font-size: 0.82rem; padding: 0.55rem 1rem; position: relative; z-index: 60;
}
.demo-banner strong { color: var(--accent); }
.wrap { width: min(1120px, calc(100% - 2rem)); margin-inline: auto; }

.site-header {
  position: sticky; top: 0; z-index: 40;
  background: color-mix(in srgb, var(--paper) 92%, transparent);
  backdrop-filter: blur(14px);
  border-bottom: 1px solid var(--line);
}
.nav { display: flex; align-items: center; justify-content: space-between; gap: 0.75rem; padding: 0.75rem 0; }
.logo { font-size: 1.15rem; color: var(--brand); flex-shrink: 0; }
.nav-links { display: none; gap: 1rem; font-size: 0.88rem; font-weight: 500; color: color-mix(in srgb, var(--ink) 70%, transparent); }
.nav-links a:hover { color: var(--brand); }

.btn {
  display: inline-flex; align-items: center; justify-content: center; gap: 0.4rem;
  border-radius: 0.65rem; padding: 0.8rem 1.2rem; font-weight: 650; font-size: 0.95rem;
  border: 1.5px solid transparent; transition: transform .25s ease, background .25s ease;
}
.btn:hover { transform: translateY(-2px); }
.btn-primary { background: var(--brand); color: #fff; }
.btn-ghost { background: transparent; border-color: color-mix(in srgb, var(--brand) 35%, transparent); color: var(--brand); }
.btn-light { background: #fff; color: var(--brand); }
.btn-nav { padding: 0.6rem 0.95rem; font-size: 0.88rem; }

.hero {
  position: relative; min-height: min(92svh, 780px); display: grid; align-items: stretch;
  color: #fff; overflow: hidden;
}
.hero-media { position: absolute; inset: 0; z-index: 0; }
.hero-media img { object-fit: cover; object-position: ${cfg.theme.heroObjectPosition || "65% center"}; width: 100%; height: 100%; animation: ken 22s ease-in-out infinite alternate; }
@keyframes ken { from { transform: scale(1.03); } to { transform: scale(1.09); } }
.hero-shade {
  position: absolute; inset: 0; z-index: 1;
  background:
    linear-gradient(105deg, rgba(10,10,10,.92) 0%, rgba(10,10,10,.72) 38%, rgba(10,10,10,.28) 62%, rgba(10,10,10,.12) 100%),
    linear-gradient(180deg, rgba(10,10,10,.2) 0%, transparent 35%, rgba(10,10,10,.35) 100%);
}
.hero-dock {
  position: relative; z-index: 2; display: flex; flex-direction: column; justify-content: flex-end;
  width: min(1120px, calc(100% - 2rem));
  max-width: min(34rem, calc(100% - 2rem));
  margin-inline: auto;
  padding: 4.25rem 0 3rem;
  box-sizing: border-box;
}
@media (max-width: 859px) {
  .hero-dock { padding-top: 3.25rem; padding-bottom: calc(3.5rem + 5.25rem + env(safe-area-inset-bottom, 0px)); }
}
.hero-kicker { font-size: .78rem; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; color: var(--accent); margin-bottom: .85rem; }
.hero-brand { font-size: clamp(2.5rem, 7vw, 4.8rem); line-height: .95; margin-bottom: .85rem; max-width: 12ch; }
.hero-line { font-family: var(--font-body), system-ui, sans-serif; font-size: clamp(1.02rem, 2vw, 1.18rem); max-width: 34ch; opacity: .92; margin-bottom: 1.5rem; }
.hero-ctas { display: flex; flex-direction: column; gap: .75rem; }
.hero-ctas .btn { width: 100%; justify-content: center; }

.trust { display: grid; gap: 1rem; padding: 1.75rem 0; grid-template-columns: 1fr 1fr; }
.trust strong { display: block; font-family: var(--font-display), Georgia, serif; color: var(--brand); font-size: 1.05rem; }
.trust span { font-size: .88rem; color: var(--muted); }

section { padding: 4.25rem 0; position: relative; }
.section-kicker { color: var(--accent); font-size: .78rem; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; margin-bottom: .55rem; }
.section-title { font-size: clamp(1.9rem, 4vw, 2.9rem); color: var(--brand); margin-bottom: .75rem; max-width: 18ch; }
.section-lead { max-width: 48ch; color: var(--muted); margin-bottom: 1.75rem; font-size: 1.05rem; }

.grid-2 { display: grid; gap: 1.25rem; }
.grid-3 { display: grid; gap: 1.25rem; }
.card {
  background: var(--paper); border: 1px solid var(--line); border-radius: 1rem; padding: 1.35rem 1.4rem;
}
.card h3 { color: var(--brand); font-size: 1.35rem; margin-bottom: .4rem; }
.card p, .card li { color: var(--muted); font-size: .96rem; }
.card ul { list-style: none; display: grid; gap: .4rem; margin-top: .75rem; }
.card li { padding-left: 1.1rem; position: relative; }
.card li::before { content: ""; position: absolute; left: 0; top: .55rem; width: .4rem; height: .4rem; border-radius: 50%; background: var(--accent); }
.price { font-family: var(--font-display), Georgia, serif; font-size: 1.55rem; color: var(--ink); margin: .35rem 0 .6rem; }

.gallery { display: grid; gap: .85rem; grid-template-columns: 1fr 1fr; }
.gallery-item { position: relative; aspect-ratio: 1; border-radius: .75rem; overflow: hidden; }
.gallery-item img { object-fit: cover; width: 100%; height: 100%; }

.faq details {
  background: var(--paper); border: 1px solid var(--line); border-radius: .85rem;
  padding: 1rem 1.15rem; margin-bottom: .65rem;
}
.faq summary { cursor: pointer; font-weight: 650; color: var(--brand); }
.faq details p { margin-top: .65rem; color: var(--muted); }

.form { display: grid; gap: .85rem; max-width: 36rem; }
.form label { display: grid; gap: .35rem; font-size: .9rem; font-weight: 600; color: var(--brand); }
.form input, .form textarea, .form select {
  border: 1px solid var(--line); border-radius: .65rem; padding: .75rem .85rem; background: #fff; color: var(--ink);
}
.form .hp { position: absolute; left: -9999px; opacity: 0; height: 0; width: 0; }
.form-note { font-size: .85rem; color: var(--muted); }
.form-success { background: color-mix(in srgb, var(--brand) 8%, white); border: 1px solid var(--line); border-radius: .85rem; padding: 1rem 1.15rem; color: var(--brand); }

.site-footer { padding: 2.5rem 0 6.5rem; font-size: .88rem; color: var(--muted); border-top: 1px solid var(--line); }
.site-footer a { color: var(--brand); text-decoration: underline; text-underline-offset: 3px; }
.footer-grid { display: grid; gap: 1.25rem; margin-bottom: 1.5rem; }
.mobile-bar {
  position: fixed; left: 0; right: 0; bottom: 0; z-index: 50; display: flex; gap: .5rem;
  padding: .65rem .85rem calc(.65rem + env(safe-area-inset-bottom));
  background: color-mix(in srgb, var(--paper) 94%, transparent); backdrop-filter: blur(12px);
  border-top: 1px solid var(--line);
}
.mobile-bar .btn { flex: 1; }

.reveal { opacity: 0; transform: translateY(24px); transition: opacity .8s ease, transform .8s ease; }
.reveal.is-in { opacity: 1; transform: none; }

@media (min-width: 640px) {
  .hero-ctas { flex-direction: row; flex-wrap: wrap; }
  .hero-ctas .btn { width: auto; }
}
@media (min-width: 860px) {
  .nav-links { display: flex; }
  .hero { align-items: center; min-height: min(88svh, 740px); }
  .hero-dock { justify-content: center; padding: 4.5rem 0; margin-left: max(1rem, calc((100% - min(1120px, 100% - 2rem)) / 2)); }
  .trust { grid-template-columns: repeat(4, 1fr); }
  .grid-2 { grid-template-columns: 1fr 1fr; }
  .grid-3 { grid-template-columns: repeat(3, 1fr); }
  .gallery { grid-template-columns: repeat(4, 1fr); }
  .footer-grid { grid-template-columns: 2fr 1fr 1fr; }
  .mobile-bar { display: none; }
  .site-footer { padding-bottom: 2.5rem; }
}
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: .01ms !important; transition-duration: .01ms !important; }
  .reveal { opacity: 1; transform: none; }
}
`
);

write(
  "app/components/Reveal.tsx",
  `"use client";
import { useEffect, useRef, useState, type ReactNode } from "react";

export function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setOn(true); },
      { threshold: 0.12 }
    );
    io.observe(el);
    const t = setTimeout(() => setOn(true), 1800);
    return () => { io.disconnect(); clearTimeout(t); };
  }, []);
  return (
    <div ref={ref} className={\`reveal \${on ? "is-in" : ""} \${className}\`.trim()}>
      {children}
    </div>
  );
}
`
);

write(
  "app/components/SiteChrome.tsx",
  `import Link from "next/link";
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
          <p><a href={\`tel:\${site.phoneTel}\`}>{site.phone}</a></p>
          <p><a href={\`mailto:\${site.email}\`}>{site.email}</a></p>
          {typeof site.instagram === "string" && site.instagram ? <p><a href={\`https://instagram.com/\${site.instagram.replace("@","")}\`} target="_blank" rel="noreferrer">{site.instagram}</a></p> : null}
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
`
);

write(
  "app/components/ContactForm.tsx",
  `"use client";
import { useState, type FormEvent } from "react";
import { site } from "../lib/site";

export function ContactForm({ intent = "general" }: { intent?: string }) {
  const [ok, setOk] = useState(false);
  const [err, setErr] = useState("");

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErr("");
    const fd = new FormData(e.currentTarget);
    if (String(fd.get("company") || "").trim()) return; // honeypot
    const name = String(fd.get("name") || "").trim();
    const email = String(fd.get("email") || "").trim();
    const phone = String(fd.get("phone") || "").trim();
    const message = String(fd.get("message") || "").trim();
    const consent = fd.get("consent");
    if (!name || !email || !message) {
      setErr("Please fill name, email, and message.");
      return;
    }
    if (!consent) {
      setErr("Please agree to the privacy notice so we can reply.");
      return;
    }
    const subject = encodeURIComponent(\`[\${site.name}] \${intent} — \${name}\`);
    const body = encodeURIComponent(
      \`Name: \${name}\\nEmail: \${email}\\nPhone: \${phone}\\nIntent: \${intent}\\n\\n\${message}\`
    );
    window.location.href = \`mailto:\${site.email}?subject=\${subject}&body=\${body}\`;
    setOk(true);
  }

  if (ok) {
    return (
      <div className="form-success" role="status">
        Thanks — your mail app should open with the details. If it doesn’t, email{" "}
        <a href={\`mailto:\${site.email}\`}>{site.email}</a> or call{" "}
        <a href={\`tel:\${site.phoneTel}\`}>{site.phone}</a>.
      </div>
    );
  }

  return (
    <form className="form" onSubmit={onSubmit} noValidate>
      <label>
        Name
        <input name="name" autoComplete="name" required />
      </label>
      <label>
        Email
        <input name="email" type="email" autoComplete="email" required />
      </label>
      <label>
        Phone
        <input name="phone" type="tel" autoComplete="tel" />
      </label>
      <label>
        Message
        <textarea name="message" rows={5} required />
      </label>
      <label className="hp" aria-hidden="true">
        Company
        <input name="company" tabIndex={-1} autoComplete="off" />
      </label>
      <label style={{ fontWeight: 500 }}>
        <span style={{ display: "flex", gap: "0.55rem", alignItems: "flex-start" }}>
          <input name="consent" type="checkbox" required style={{ marginTop: "0.2rem" }} />
          <span>
            I agree that {site.name} may use these details to respond. See the{" "}
            <a href="/privacy" style={{ textDecoration: "underline" }}>privacy policy</a>.
          </span>
        </span>
      </label>
      {err ? <p className="form-note" role="alert" style={{ color: "#8a2a2a" }}>{err}</p> : null}
      <button className="btn btn-primary" type="submit">Send request</button>
      <p className="form-note">Demo form opens your email client — no data is stored on this demo host.</p>
    </form>
  );
}
`
);

write(
  "app/layout.tsx",
  `import type { Metadata } from "next";
import { ${cfg.fonts.displayImport}, ${cfg.fonts.bodyImport} } from "next/font/google";
import { DemoBanner, Footer, Header, MobileBar } from "./components/SiteChrome";
import { site } from "./lib/site";
import "./globals.css";

const display = ${cfg.fonts.displayImport}({ subsets: ["latin"], variable: "--font-display"${cfg.fonts.displayOpts || ""} });
const body = ${cfg.fonts.bodyImport}({ subsets: ["latin"], variable: "--font-body" });

const url = site.canonical;

export const metadata: Metadata = {
  metadataBase: new URL(url),
  title: {
    default: \`\${site.name} | \${site.seoTitleSuffix}\`,
    template: \`%s | \${site.name}\`,
  },
  description: site.seoDescription,
  alternates: { canonical: "/" },
  openGraph: {
    title: site.name,
    description: site.seoDescription,
    url,
    siteName: site.name,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: site.name,
    description: site.seoDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "PetGroomer",
  name: site.name,
  description: site.seoDescription,
  url,
  telephone: site.phone,
  email: site.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.street || site.address,
    addressLocality: site.city,
    addressRegion: site.region,
    postalCode: site.postal || undefined,
    addressCountry: "US",
  },
  areaServed: site.areaServed || site.city,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={\`\${display.variable} \${body.variable}\`}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <DemoBanner />
        <Header />
        <main>{children}</main>
        <Footer />
        <MobileBar />
      </body>
    </html>
  );
}
`
);

write(
  "app/page.tsx",
  `import Image from "next/image";
import Link from "next/link";
import { Reveal } from "./components/Reveal";
import { img } from "./lib/images";
import { site } from "./lib/site";

export default function HomePage() {
  return (
    <>
      <section className="hero" aria-label={\`\${site.name} hero\`}>
        <div className="hero-media">
          <Image src={img.hero} alt={site.heroAlt} fill priority sizes="100vw" />
        </div>
        <div className="hero-shade" />
        <div className="hero-dock">
          <p className="hero-kicker">{site.kicker}</p>
          <h1 className="hero-brand">{site.name}</h1>
          <p className="hero-line">{site.heroLine}</p>
          <div className="hero-ctas">
            <a className="btn btn-light" href={site.primaryCta.href}>{site.primaryCta.label}</a>
            <Link className="btn btn-ghost" href="/pricing" style={{ color: "#fff", borderColor: "rgba(255,255,255,.45)" }}>
              View pricing
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
          <Link className="btn btn-primary" href="/services">All services</Link>
        </p>
      </section>

      <section className="wrap">
        <Reveal>
          <p className="section-kicker">Gallery</p>
          <h2 className="section-title">Recent finishes</h2>
          <p className="section-lead">Stock grooming photography for layout — swap in your real gallery before launch.</p>
        </Reveal>
        <div className="gallery">
          {[img.g1, img.g2, img.g3, img.g4].map((src, i) => (
            <div className="gallery-item" key={src}>
              <Image src={src} alt={\`Grooming portfolio placeholder \${i + 1}\`} fill sizes="25vw" />
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
          <h2 className="section-title">What pet parents say</h2>
        </Reveal>
        <div className="grid-3">
          {site.reviews.map((r) => (
            <Reveal key={r.who}>
              <article className="card">
                <p style={{ color: "var(--accent)", letterSpacing: "0.12em" }}>★★★★★</p>
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
              <Link className="btn btn-ghost" href="/faq">Read FAQ</Link>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
`
);

write(
  "app/services/page.tsx",
  `import type { Metadata } from "next";
import Link from "next/link";
import { site } from "../lib/site";

export const metadata: Metadata = {
  title: "Services",
  description: \`Grooming services at \${site.name}.\`,
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <section className="wrap" style={{ paddingTop: "3rem" }}>
      <p className="section-kicker">Services</p>
      <h1 className="section-title">What we offer</h1>
      <p className="section-lead">{site.homeServicesLead}</p>
      <div className="grid-2">
        {site.services.map((s) => (
          <article className="card" key={s.title}>
            <h2 style={{ fontSize: "1.45rem", color: "var(--brand)", marginBottom: "0.35rem" }}>{s.title}</h2>
            {s.price ? <div className="price">{s.price}</div> : null}
            <p>{s.blurb}</p>
            {s.includes?.length ? (
              <ul>{s.includes.map((i) => <li key={i}>{i}</li>)}</ul>
            ) : null}
          </article>
        ))}
      </div>
      <p style={{ marginTop: "1.5rem" }}>
        <Link className="btn btn-primary" href="/book">Request an appointment</Link>
      </p>
    </section>
  );
}
`
);

write(
  "app/pricing/page.tsx",
  `import type { Metadata } from "next";
import Link from "next/link";
import { site } from "../lib/site";

export const metadata: Metadata = {
  title: "Pricing",
  description: \`Pricing and packages for \${site.name}.\`,
  alternates: { canonical: "/pricing" },
};

export default function PricingPage() {
  return (
    <section className="wrap" style={{ paddingTop: "3rem" }}>
      <p className="section-kicker">Pricing</p>
      <h1 className="section-title">Packages & starting rates</h1>
      <p className="section-lead">{site.pricingLead}</p>
      <div className="grid-3">
        {site.pricing.map((p) => (
          <article className="card" key={p.title}>
            <h2 style={{ fontSize: "1.35rem", color: "var(--brand)" }}>{p.title}</h2>
            <div className="price">{p.price}</div>
            <p>{p.note}</p>
            {p.items?.length ? <ul>{p.items.map((i) => <li key={i}>{i}</li>)}</ul> : null}
          </article>
        ))}
      </div>
      {site.addons?.length ? (
        <>
          <h2 className="section-title" style={{ marginTop: "2.5rem", fontSize: "1.8rem" }}>Add-ons</h2>
          <div className="grid-2">
            {site.addons.map((a) => (
              <article className="card" key={a.title}>
                <h3>{a.title}</h3>
                <div className="price">{a.price}</div>
                <p>{a.blurb}</p>
              </article>
            ))}
          </div>
        </>
      ) : null}
      <p style={{ marginTop: "1.5rem" }}>
        <Link className="btn btn-primary" href="/book">Book with these packages</Link>
      </p>
    </section>
  );
}
`
);

write(
  "app/gallery/page.tsx",
  `import type { Metadata } from "next";
import Image from "next/image";
import { img } from "../lib/images";
import { site } from "../lib/site";

export const metadata: Metadata = {
  title: "Gallery",
  description: \`Portfolio gallery for \${site.name}.\`,
  alternates: { canonical: "/gallery" },
};

const shots = [
  { src: img.g1, alt: "Salon groom finish" },
  { src: img.g2, alt: "Bath and fluff dry" },
  { src: img.g3, alt: "Hand finish detail" },
  { src: img.g4, alt: "Happy dog after groom" },
  { src: img.hero, alt: "Grooming portrait" },
  { src: img.g2, alt: "Coat care detail" },
];

export default function GalleryPage() {
  return (
    <section className="wrap" style={{ paddingTop: "3rem" }}>
      <p className="section-kicker">Portfolio</p>
      <h1 className="section-title">Gallery</h1>
      <p className="section-lead">
        Licensed stock placeholders for the demo. Before launch, swap in {site.name}’s real client photos
        {site.instagram ? <> (also on Instagram {site.instagram})</> : null}.
      </p>
      <div className="gallery">
        {shots.map((s, i) => (
          <div className="gallery-item" key={\`\${s.src}-\${i}\`}>
            <Image src={s.src} alt={s.alt} fill sizes="(max-width:860px) 50vw, 25vw" />
          </div>
        ))}
      </div>
    </section>
  );
}
`
);

write(
  "app/faq/page.tsx",
  `import type { Metadata } from "next";
import Link from "next/link";
import { site } from "../lib/site";

export const metadata: Metadata = {
  title: "FAQ",
  description: \`Frequently asked questions for \${site.name}.\`,
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  return (
    <section className="wrap faq" style={{ paddingTop: "3rem" }}>
      <p className="section-kicker">FAQ</p>
      <h1 className="section-title">Common questions</h1>
      <p className="section-lead">Straight answers so booking feels easy.</p>
      {site.faqs.map((f) => (
        <details key={f.q}>
          <summary>{f.q}</summary>
          <p>{f.a}</p>
        </details>
      ))}
      <p style={{ marginTop: "1.5rem" }}>
        <Link className="btn btn-primary" href="/book">Still need help? Book or ask</Link>
      </p>
    </section>
  );
}
`
);

write(
  "app/book/page.tsx",
  `import type { Metadata } from "next";
import { ContactForm } from "../components/ContactForm";
import { site } from "../lib/site";

export const metadata: Metadata = {
  title: "Book",
  description: \`Request an appointment with \${site.name}.\`,
  alternates: { canonical: "/book" },
};

export default function BookPage() {
  return (
    <section className="wrap" style={{ paddingTop: "3rem" }}>
      <p className="section-kicker">Book</p>
      <h1 className="section-title">Request an appointment</h1>
      <p className="section-lead">{site.bookLead}</p>
      <p style={{ marginBottom: "1.25rem" }}>
        Prefer faster?{" "}
        <a className="btn btn-primary" href={site.primaryCta.href} style={{ marginLeft: "0.35rem" }}>
          {site.primaryCta.label}
        </a>
      </p>
      {site.locations?.length ? (
        <div className="grid-2" style={{ marginBottom: "1.5rem" }}>
          {site.locations.map((l) => (
            <article className="card" key={l.name}>
              <h2 style={{ fontSize: "1.25rem", color: "var(--brand)" }}>{l.name}</h2>
              <p>{l.address}</p>
              <p><a href={\`tel:\${l.phoneTel}\`}>{l.phone}</a></p>
              {l.email ? <p><a href={\`mailto:\${l.email}\`}>{l.email}</a></p> : null}
              {l.hours ? <p style={{ marginTop: "0.5rem" }}>{l.hours}</p> : null}
            </article>
          ))}
        </div>
      ) : null}
      <ContactForm intent="booking" />
    </section>
  );
}
`
);

write(
  "app/contact/page.tsx",
  `import type { Metadata } from "next";
import { ContactForm } from "../components/ContactForm";
import { site } from "../lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: \`Contact \${site.name}.\`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <section className="wrap" style={{ paddingTop: "3rem" }}>
      <p className="section-kicker">Contact</p>
      <h1 className="section-title">Say hello</h1>
      <p className="section-lead">{site.address}</p>
      <p style={{ marginBottom: "0.35rem" }}><a href={\`tel:\${site.phoneTel}\`}>{site.phone}</a></p>
      <p style={{ marginBottom: "1.25rem" }}><a href={\`mailto:\${site.email}\`}>{site.email}</a></p>
      <ContactForm intent="contact" />
    </section>
  );
}
`
);

for (const legal of [
  ["privacy", "Privacy policy", "How this demo site handles information."],
  ["terms", "Terms", "Demo redesign terms — not legal advice."],
  ["accessibility", "Accessibility", "Our accessibility commitment for this demo."],
]) {
  const [slug, title, lead] = legal;
  write(
    `app/${slug}/page.tsx`,
    `import type { Metadata } from "next";
import { site } from "../lib/site";

export const metadata: Metadata = {
  title: "${title}",
  description: "${lead}",
  alternates: { canonical: "/${slug}" },
};

export default function LegalPage() {
  return (
    <section className="wrap" style={{ paddingTop: "3rem", maxWidth: "42rem" }}>
      <p className="section-kicker">Legal</p>
      <h1 className="section-title">${title}</h1>
      <p className="section-lead">${lead}</p>
      <div className="card" style={{ display: "grid", gap: "0.85rem" }}>
        <p>
          This is a redesign demo for <strong>{site.name}</strong>. It is not the live production website.
          Contact details shown are published by the business for customer communication.
        </p>
        <p>
          The demo contact form opens your own email client and does not store submissions on this host.
          Do not send sensitive payment data through the form.
        </p>
        <p>
          Questions: <a href={\`mailto:\${site.email}\`}>{site.email}</a> ·{" "}
          <a href={\`tel:\${site.phoneTel}\`}>{site.phone}</a>
        </p>
      </div>
    </section>
  );
}
`
  );
}

write(
  "app/sitemap.ts",
  `import type { MetadataRoute } from "next";
import { site } from "./lib/site";

const paths = ${JSON.stringify(pagesList)};

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.canonical.replace(/\\/$/, "");
  return paths.map((p) => ({
    url: p ? \`\${base}/\${p}\` : base,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: p === "" ? 1 : 0.7,
  }));
}
`
);

write(
  "app/robots.ts",
  `import type { MetadataRoute } from "next";
import { site } from "./lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: \`\${site.canonical.replace(/\\/$/, "")}/sitemap.xml\`,
  };
}
`
);

write(
  "app/not-found.tsx",
  `import Link from "next/link";

export default function NotFound() {
  return (
    <section className="wrap" style={{ paddingTop: "4rem", paddingBottom: "4rem" }}>
      <h1 className="section-title">Page not found</h1>
      <p className="section-lead">That URL isn’t in this demo. Head home or book an appointment.</p>
      <Link className="btn btn-primary" href="/">Back home</Link>
    </section>
  );
}
`
);

write(
  "emails/contact-confirmation.md",
  `# Contact confirmation (plain text)

Subject: We got your note — ${cfg.name}

Hi {{name}},

Thanks for reaching out to ${cfg.name}. We received your message and will reply as soon as we can.

Meanwhile you can text/call ${cfg.phone} if it’s time-sensitive.

— ${cfg.name}
${cfg.email}

---
HTML version should mirror brand colors (${cfg.theme.brand}) with a single primary CTA to ${cfg.primaryCta.href}.
`
);

write(
  "HANDOFF.md",
  `# Handoff — ${cfg.name}

- **Folder:** \`${cfg.slug}/\`
- **Live site (do not overwrite):** ${cfg.liveUrl}
- **Inventory:** \`../INVENTORIES/${cfg.slug}.md\`
- **Canonical (demo):** ${cfg.canonical}
- **Run:** \`npm install && npm run dev\`
- **Build:** \`npm run build\`
- **Primary CTA:** ${cfg.primaryCta.label} → ${cfg.primaryCta.href}

## Notes
${cfg.handoffNotes || "- Tailor gallery to real photos before pitch."}
`
);

write(
  ".gitignore",
  `node_modules
.next
out
.env*.local
`
);

console.log("\nScaffolded", cfg.slug, "→", out);
