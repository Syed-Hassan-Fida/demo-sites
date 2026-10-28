import type { Metadata } from "next";
import Link from "next/link";
import { site } from "../lib/site";

export const metadata: Metadata = {
  title: "Service area",
  description: `Mobile pet grooming across Austin and surrounding communities — ${site.name} vans at your door.`,
  alternates: { canonical: "/service-area" },
};

export default function ServiceAreaPage() {
  return (
    <section className="wrap" style={{ paddingTop: "3rem" }}>
      <p className="section-kicker">Service area</p>
      <h1 className="section-title">Austin &amp; surrounding</h1>
      <p className="section-lead">
        SWAGG serves Austin, Texas and surrounding areas by appointment. Not sure we reach your
        street? Text or call{" "}
        <a href={`tel:${site.phoneTel}`} style={{ color: "var(--brand)", textDecoration: "underline" }}>
          {site.phone}
        </a>{" "}
        with your neighborhood.
      </p>

      <div className="nature-strip" style={{ marginBottom: "2rem" }}>
        <h2>How mobile coverage works</h2>
        <p>
          Share your area, dog’s size/coat, and preferred days. We fit you into a route window
          Mon–Sat 8am–6pm. Exact availability depends on the van schedule that week.
        </p>
      </div>

      <h2 className="section-title" style={{ fontSize: "1.65rem" }}>
        Neighborhoods &amp; nearby cities
      </h2>
      <p className="section-lead" style={{ marginTop: "-0.35rem" }}>
        Local SEO helpers for the pitch — confirm exact coverage with Jolie's team when booking.
      </p>
      <div className="city-cloud" style={{ marginBottom: "2rem" }}>
        {site.austinAreas.map((c) => (
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
