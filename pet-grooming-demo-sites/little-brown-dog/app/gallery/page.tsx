import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { portraits } from "../lib/images";
import { site } from "../lib/site";

export const metadata: Metadata = {
  title: "Gallery",
  description: `Named studio portraits from ${site.name} — Max, Owen, CJ, Gordon, Banner, Abbey, Toby, Dexter, Remy, Rommel.`,
  alternates: { canonical: "/gallery" },
};

export default function GalleryPage() {
  return (
    <section className="wrap" style={{ paddingTop: "3rem", paddingBottom: "4rem" }}>
      <p className="section-kicker">Portfolio</p>
      <h1 className="section-title">Named portrait gallery</h1>
      <p className="section-lead">
        Real client portraits from the live Little Brown Dog gallery on lbdog.com — credited to the studio’s own photography.
        More finishes live on Instagram {site.instagram}.
      </p>
      <div className="portrait-rail">
        {portraits.map((p, i) => (
          <figure className="portrait" key={"key" in p ? p.key : `${p.name}-${i}`}>
            <Image
              src={p.src}
              alt={`${p.name} — ${p.note} at ${site.name}`}
              fill
              sizes="(max-width:860px) 50vw, 25vw"
            />
            <figcaption>
              {p.name}
              <span>{p.note}</span>
            </figcaption>
          </figure>
        ))}
      </div>
      <p style={{ marginTop: "1.75rem" }}>
        <Link className="btn btn-primary" href="/book">Book a portrait-ready finish</Link>
      </p>
    </section>
  );
}
