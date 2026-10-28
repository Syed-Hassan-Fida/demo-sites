import type { Metadata } from "next";
import Link from "next/link";
import { site } from "../lib/site";

export const metadata: Metadata = {
  title: "Locations",
  description: "North and South Austin salon addresses, phones, and booking for As The Fur Flies.",
  alternates: { canonical: "/locations" },
};

export default function LocationsPage() {
  return (
    <section className="wrap" style={{ paddingTop: "3rem" }}>
      <p className="section-kicker">Locations</p>
      <h1 className="section-title">Two Austin day spas</h1>
      <p className="section-lead">
        Same Fear Free standard, different rooms. Confirm which salon you’re booking — wrong-salon
        same-day appointments risk a 100% fee.
      </p>
      <div className="grid-2">
        {site.locations.map((l) => (
          <article className="card" key={l.id}>
            <h2 style={{ fontSize: "1.7rem" }}>{l.name}</h2>
            <p>{l.address}</p>
            <p style={{ marginTop: "0.55rem" }}><a href={`tel:${l.phoneTel}`}>{l.phone}</a></p>
            <p><a href={`mailto:${l.email}`}>{l.email}</a></p>
            <p style={{ marginTop: "0.55rem" }}>{l.hours}</p>
            <p style={{ marginTop: "0.45rem", color: "var(--orchid)", fontWeight: 600 }}>{l.note}</p>
            <iframe
              className="map-frame"
              style={{ marginTop: "1rem" }}
              title={`Map — ${l.name}`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src={l.mapEmbed}
            />
            <p style={{ marginTop: "1rem" }}>
              <Link className="btn btn-primary" href={`/book?salon=${l.id}`}>Book {l.name.split(" ")[0]}</Link>
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
