import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "../components/ContactForm";
import { site } from "../lib/site";

export const metadata: Metadata = {
  title: "Book",
  description: `Request a North or South Austin appointment with ${site.name}.`,
  alternates: { canonical: "/book" },
};

type Search = { salon?: string };

export default async function BookPage({
  searchParams,
}: {
  searchParams: Promise<Search>;
}) {
  const sp = await searchParams;
  const raw = (sp.salon || "").toLowerCase();
  const defaultSalon = raw === "north" || raw === "south" ? raw : "";

  return (
    <section className="wrap" style={{ paddingTop: "3rem" }}>
      <p className="section-kicker">Book</p>
      <h1 className="section-title">Request an appointment</h1>
      <p className="section-lead">{site.bookLead}</p>
      <p className="warning-note" style={{ marginBottom: "1.5rem", maxWidth: "42rem" }}>
        Wrong-salon same-day requests can incur a 100% fee. Prefer texting?
        South <a href="sms:+18302436437">830-243-6437</a> · North{" "}
        <a href="sms:+17377274432">737-727-4432</a> · Shared call/text{" "}
        <a href={`tel:${site.phoneTel}`}>{site.phone}</a>.
      </p>
      <div className="grid-2" style={{ marginBottom: "1.75rem" }}>
        {site.locations.map((l) => (
          <article key={l.id} style={{ borderTop: "2px solid var(--accent)", paddingTop: "0.85rem" }}>
            <h2 className="display" style={{ fontSize: "1.55rem", color: "var(--brand)" }}>{l.name}</h2>
            <p style={{ color: "var(--muted)" }}>{l.address}</p>
            <p><a href={`tel:${l.phoneTel}`}>{l.phone}</a></p>
            <p><a href={`mailto:${l.email}`}>{l.email}</a></p>
            <p style={{ marginTop: "0.45rem", color: "var(--muted)", fontSize: "0.9rem" }}>{l.note}</p>
            <p style={{ marginTop: "0.75rem" }}>
              <Link className="btn btn-ghost" href={`/book?salon=${l.id}`}>Select {l.name.split(" ")[0]}</Link>
            </p>
          </article>
        ))}
      </div>
      <ContactForm intent="booking" showSalon defaultSalon={defaultSalon} />
      <p style={{ marginTop: "1.5rem", color: "var(--muted)" }}>
        Looking for ACC student pricing? <Link href="/student" style={{ color: "var(--brand)", textDecoration: "underline" }}>Student groom requests</Link>
      </p>
    </section>
  );
}
