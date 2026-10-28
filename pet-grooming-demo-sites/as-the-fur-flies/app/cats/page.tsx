import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "../components/Reveal";
import { img } from "../lib/images";
import { site } from "../lib/site";

export const metadata: Metadata = {
  title: "Cat grooming",
  description:
    "North Austin cat suite, Kitty Cat Club, and feline grooming menu at As The Fur Flies.",
  alternates: { canonical: "/cats" },
};

export default function CatsPage() {
  return (
    <>
      <section className="wrap" style={{ paddingTop: "3rem" }}>
        <Reveal>
          <p className="section-kicker">Cats</p>
          <h1 className="section-title">Finicky felines, patient hands</h1>
          <p className="section-lead">
            Cats benefit from professional degreasing baths every 4–6 weeks. Our North Austin salon
            keeps kitties in a quiet suite with a window — separate from the dogs.
          </p>
        </Reveal>
        <div className="split" style={{ marginBottom: "2rem" }}>
          <div className="split-media" style={{ minHeight: 320 }}>
            <Image src={img.cat} alt="Cat ready for Fear Free grooming" fill sizes="50vw" />
          </div>
          <div>
            <p className="ribbon" style={{ marginBottom: "1rem" }}>
              <Image src="/fear-free.png" alt="" width={120} height={36} />
              NCGI · Fear Free · First Aid/CPR
            </p>
            <p style={{ color: "var(--muted)", marginBottom: "1rem" }}>
              Jaclyn Guyette, CFMG — Certified Feline Master Groomer through the National Cat
              Groomers Institute — leads feline care. Only a valid rabies vaccine is required.
            </p>
            <p className="warning-note" style={{ marginBottom: "1rem" }}>
              Typical cat window: afternoon drop-off at 12 pm, pickup at 3 pm (confirm when booking).
            </p>
            <Link className="btn btn-primary" href="/book?salon=north">Book North (cats)</Link>
          </div>
        </div>
      </section>

      <section className="wrap">
        <p className="section-kicker">Kitty Cat Club</p>
        <h2 className="section-title">15% off when you plan ahead</h2>
        <p className="section-lead">
          Book six months of grooming appointments in advance (no longer than six weeks between
          visits). Reduces hairballs, shedding, and flaky coat — join free.
        </p>
        <div className="grid-3">
          {site.catServices.map((s) => (
            <article className="card" key={s.title}>
              <h3>{s.title}</h3>
              <div className="price">{s.price}</div>
              <p>{s.blurb}</p>
            </article>
          ))}
        </div>
        <p style={{ marginTop: "1.25rem", color: "var(--muted)", maxWidth: "48ch" }}>
          All cat services include a bath (minimum two lathers), blow-dry, brushout, ear and face
          cleaning, nail trim, toe tuft trim, face trim for certain breeds, and sanitary shave for
          longhaired/larger cats.
        </p>
      </section>

      <section className="wrap">
        <p className="section-kicker">Add-ons</p>
        <h2 className="section-title">Extras &amp; special care</h2>
        <div className="grid-3">
          {site.catAddons.map((a) => (
            <div key={a.title} style={{ borderBottom: "1px solid var(--line)", padding: "0.75rem 0" }}>
              <strong style={{ color: "var(--brand)" }}>{a.title}</strong>
              <div className="price" style={{ fontSize: "1.2rem", margin: "0.2rem 0 0" }}>{a.price}</div>
            </div>
          ))}
        </div>
        <p style={{ marginTop: "1.25rem", color: "var(--muted)", maxWidth: "52ch" }}>
          Matted or pelted coats carry greater risk and may need specialized products. Regular
          4–6 week visits are the best way to avoid fees. Some medical or stress cases may be
          referred for veterinary-sedated grooming.
        </p>
      </section>
    </>
  );
}
