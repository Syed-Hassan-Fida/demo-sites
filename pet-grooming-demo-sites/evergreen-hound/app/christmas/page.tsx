import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CtaBook, CtaGhost } from "../components/CtaBook";
import { Reveal } from "../components/Reveal";
import { img } from "../lib/images";
import "./christmas.css";

export const metadata: Metadata = {
  title: "Holiday gifts for Austin pups | Evergreen Hound",
  description:
    "Christmas gifts page — studio & outdoor photo gifts, McConaughey add-on, and text-to-reserve holiday slots.",
};

const gifts = [
  {
    tag: "Most giftable",
    title: "Studio holiday mini",
    price: "From $250",
    blurb:
      "20 minutes in-shop with rotating seasonal backdrops. 8+ edited images — perfect for cards and grandma’s fridge.",
    src: img.studio,
    alt: "Studio-ready pet portrait for holiday cards",
  },
  {
    tag: "Austin outdoors",
    title: "Outdoor mini-session",
    price: "From $300",
    blurb:
      "Golden-hour portraits at an outdoor spot. Families welcome. Custom packages by email.",
    src: img.outdoor,
    alt: "Outdoor mini-session with dogs",
  },
  {
    tag: "Add to any groom",
    title: "The McConaughey",
    price: "+$45",
    blurb:
      "Mini studio snap during their spa day — 3+ edited images. Birthday or holiday theme on request.",
    src: img.portrait,
    alt: "Beautiful groomed dog ready for McConaughey mini photos",
  },
  {
    tag: "Easy gift",
    title: "Evergreen gift card",
    price: "Any amount",
    blurb:
      "Text Noel to set an amount. Recipient books Fear Free grooming or a photo session when ready.",
    src: img.towel,
    alt: "Freshly groomed pup — perfect gift experience",
  },
];

export default function ChristmasPage() {
  return (
    <div className="xmas-page">
      <div className="demo-banner">
        <strong>Holiday page</strong> inside the Evergreen Hound redesign (
        <Link href="/">back to main site</Link>
        ). Concept only until Noel approves.
      </div>

      <header className="xmas-top xmas-top--solid">
        <div className="wrap xmas-nav">
          <Link className="logo logo--ink" href="/">
            Evergreen Hound
          </Link>
          <CtaGhost href="/">← Main site</CtaGhost>
        </div>
      </header>

      <section className="xmas-hero" aria-label="Holiday gifts hero">
        <div className="xmas-hero-media">
          <Image
            src={img.portrait}
            alt="Beautiful pet portrait for holiday gifts"
            fill
            priority
            sizes="100vw"
            className="xmas-hero-img"
          />
        </div>
        <div className="xmas-hero-shade" />
        <span className="flake" aria-hidden />
        <span className="flake" aria-hidden />
        <span className="flake" aria-hidden />
        <span className="flake" aria-hidden />
        <span className="flake" aria-hidden />
        <span className="flake" aria-hidden />
        <span className="flake" aria-hidden />
        <span className="flake" aria-hidden />

        <div className="wrap xmas-hero-dock">
          <p className="xmas-kicker">East Austin · December slots</p>
          <p className="xmas-brand">Evergreen Hound</p>
          <h1>Holiday gifts their pup will actually love.</h1>
          <p className="xmas-support">
            Photography packages, spa add-ons, and gift cards — clear enough for a
            gift-buyer to decide in under a minute.
          </p>
          <div className="hero-ctas">
            <CtaBook variant="light" label="Reserve by text" />
            <CtaGhost href="mailto:barkingevergreen@gmail.com" light>
              Email Noel
            </CtaGhost>
          </div>
        </div>
      </section>

      <section className="wrap gifts">
        <Reveal>
          <h2>This season’s gift ideas</h2>
          <p className="lead">
            Pulled from what Evergreen already offers — presented so holiday shoppers
            don’t hunt through a long service menu.
          </p>
        </Reveal>
        <div className="gift-grid">
          {gifts.map((g, i) => (
            <Reveal key={g.title} delay={i * 80}>
              <article className="gift">
                <div className="gift-media">
                  <Image
                    src={g.src}
                    alt={g.alt}
                    fill
                    sizes="(max-width: 800px) 100vw, 50vw"
                  />
                </div>
                <div className="gift-body">
                  <span className="tag">{g.tag}</span>
                  <h3>{g.title}</h3>
                  <div className="price">{g.price}</div>
                  <p>{g.blurb}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="wrap">
        <Reveal>
          <div className="footer-cta">
            <div>
              <h2>Want December on the calendar?</h2>
              <p>
                Tell Noel your pup’s name, preferred week, and gift type. Fear Free care
                at 2801 E. 5th St · @evergreenhound
              </p>
            </div>
            <CtaBook variant="light" label="Reserve by text" />
          </div>
        </Reveal>
      </section>

      <p className="fine wrap">
        Demo page at <Link href="/christmas">/christmas</Link> · Not the live Evergreen
        Hound website
      </p>
    </div>
  );
}
