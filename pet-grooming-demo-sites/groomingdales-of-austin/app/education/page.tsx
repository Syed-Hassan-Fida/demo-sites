import type { Metadata } from "next";
import Link from "next/link";
import { educationPages } from "../lib/education";
import { site } from "../lib/site";

export const metadata: Metadata = {
  title: "Education",
  description: `Grooming tips, breed profiles, and doodle coat care from ${site.namePlain}.`,
  alternates: { canonical: "/education" },
};

const groups: { key: typeof educationPages[number]["group"]; label: string }[] = [
  { key: "tips", label: "Grooming tips" },
  { key: "breeds", label: "Breed profiles" },
  { key: "doodle", label: "Doodle library" },
  { key: "hub", label: "Breed hub" },
];

export default function EducationHubPage() {
  return (
    <section className="wrap" style={{ paddingTop: "3rem" }}>
      <p className="section-kicker">Education</p>
      <h1 className="section-title">Learn before spa day</h1>
      <p className="section-lead">
        The full Education menu from the live site — brushing truths, ear plucking nuance, rainy-day potty tips, and breed realities.
      </p>
      {groups.map((g) => {
        const items = educationPages.filter((p) => p.group === g.key);
        if (!items.length) return null;
        return (
          <div key={g.key} style={{ marginBottom: "2.25rem" }}>
            <h2 style={{ color: "var(--rose)", fontSize: "1.45rem", marginBottom: "0.85rem" }}>{g.label}</h2>
            <div className="cat-grid">
              {items.map((p) => (
                <Link className="cat-tile" key={p.slug} href={`/education/${p.slug}`}>
                  <strong>{p.title}</strong>
                  <span>{p.summary}</span>
                </Link>
              ))}
            </div>
          </div>
        );
      })}
    </section>
  );
}
