import type { Metadata } from "next";
import Link from "next/link";
import { site } from "../lib/site";

export const metadata: Metadata = {
  title: "Service area",
  description: `Mobile dog grooming across Denver and Boulder County — ${site.name} cage-free vans at your door or office.`,
  alternates: { canonical: "/service-area" },
};

export default function ServiceAreaPage() {
  return (
    <section className="wrap" style={{ paddingTop: "3rem" }}>
      <p className="section-kicker">Service area</p>
      <h1 className="section-title">Denver &amp; Boulder County</h1>
      <p className="section-lead">
        Cage-free mobile grooms at your home or office. Not sure we reach your ZIP? Call or text{" "}
        <a href={`tel:${site.phoneTel}`} style={{ color: "var(--brand)", textDecoration: "underline" }}>
          {site.phone}
        </a>
        .
      </p>

      <div className="nature-strip" style={{ marginBottom: "2rem" }}>
        <h2>How mobile coverage works</h2>
        <p>
          We match you with a local professional groomer suited to your dog’s coat and temperament —
          then the van comes to you. First visit usually requires someone home; after that, alternate
          access can be arranged.
        </p>
      </div>

      <h2 className="section-title" style={{ fontSize: "1.65rem" }}>
        Greater Denver
      </h2>
      <div className="city-cloud" style={{ marginBottom: "2.25rem" }}>
        {site.denverCities.map((c) => (
          <span className="city-pill" key={c}>
            {c}
          </span>
        ))}
      </div>

      <h2 className="section-title" style={{ fontSize: "1.65rem" }}>
        Boulder County &amp; nearby
      </h2>
      <div className="city-cloud" style={{ marginBottom: "2rem" }}>
        {site.boulderCities.map((c) => (
          <span className="city-pill" key={c}>
            {c}
          </span>
        ))}
      </div>

      <p style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
        <Link className="btn btn-primary" href="/book">
          Request a route stop
        </Link>
        <Link className="btn btn-ghost" href="/pricing">
          See size pricing
        </Link>
      </p>
    </section>
  );
}
