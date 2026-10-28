import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { site } from "../lib/site";

export const metadata: Metadata = {
  title: "About",
  description: `Meet ${site.founder} and the SWAGG mobile grooming team — Austin’s premiere van spa since 2014.`,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <section className="wrap" style={{ paddingTop: "3rem" }}>
      <p className="section-kicker">About</p>
      <h1 className="section-title">Dogs come first, always</h1>
      <p className="section-lead">{site.aboutMission}</p>

      <div className="grid-2" style={{ marginBottom: "2.5rem", alignItems: "center" }}>
        <div style={{ position: "relative", aspectRatio: "4/5", borderRadius: "0.9rem", overflow: "hidden" }}>
          <Image
            src="/logo.png"
            alt={`${site.name} logo — barber pole with SWAGG wordmark`}
            fill
            sizes="50vw"
            style={{ objectFit: "contain", background: "#fff", padding: "2rem" }}
          />
        </div>
        <div>
          <p className="section-kicker">Founder</p>
          <h2 className="section-title" style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)" }}>
            Our history &amp; {site.founder}
          </h2>
          <p style={{ color: "var(--muted)", marginBottom: "1rem" }}>{site.aboutFounder}</p>
          <p style={{ color: "var(--muted)" }}>{site.aboutCraft}</p>
        </div>
      </div>

      <div className="nature-strip" style={{ marginBottom: "2rem" }}>
        <h2>Partnership, not a conveyer belt</h2>
        <p>
          We listen to pet parents, treat every dog with love and kindness, and keep our mobile
          spas clean and well-operating — the experience we would want for our own pets.
        </p>
        <ul className="nature-points">
          <li>Voted among Austin’s top pet grooming salons after launch</li>
          <li>Respect and support from local veterinarians</li>
          <li>International training influence on craft and safety</li>
          <li>Allergy- and skin-aware product choices</li>
        </ul>
      </div>

      <p style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
        <Link className="btn btn-primary" href="/book">
          Book with SWAGG
        </Link>
        <Link className="btn btn-ghost" href="/services">
          See services
        </Link>
      </p>
    </section>
  );
}
