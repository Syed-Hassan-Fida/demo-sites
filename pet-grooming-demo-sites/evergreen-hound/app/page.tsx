import Image from "next/image";
import { CtaBook, CtaGhost } from "./components/CtaBook";
import { PackagePicker } from "./components/PackagePicker";
import { Reveal } from "./components/Reveal";
import { img } from "./lib/images";

const gallery = [
  { src: img.hero, alt: "Professional hand-scissor finish in a grooming salon" },
  { src: img.bath, alt: "Gentle salon bath for a small dog" },
  { src: img.towel, alt: "Freshly bathed dog wrapped after spa grooming" },
  { src: img.salon, alt: "Groomed dog on the salon table" },
  { src: img.wash, alt: "Careful wash and rinse in the grooming tub" },
  { src: img.calm, alt: "Calm brushing on the grooming table" },
  { src: img.portrait, alt: "Soft portrait after a beautiful groom" },
  { src: img.fluffy, alt: "Fluffy coat finish after professional styling" },
];

const addons = [
  {
    name: "The Willie",
    price: "+$20",
    blurb:
      "Hemp-forward calm package — Green Caviar treatment, CBD treat, relaxation massage.",
    src: img.bath,
    alt: "Spa bath ritual for a calm, chilled-out pup",
  },
  {
    name: "The McConaughey",
    price: "+$45",
    blurb:
      "Mini studio photoshoot with seasonal backdrop + 3+ edited images. Birthday theme on request.",
    src: img.studio,
    alt: "Studio-ready dog portrait after grooming",
  },
  {
    name: "The Ladybird",
    price: "+$45",
    blurb:
      "30-minute training-focused walk on Ladybird Lake Trail. Pre-book only.",
    src: img.outdoor,
    alt: "Dogs outdoors ready for a Ladybird Lake walk",
  },
];

const photoPackages = [
  {
    title: "The McConaughey",
    price: "+$45",
    note: "Grooming add-on only",
    items: [
      "Mini studio shoot on rotating seasonal backdrop",
      "3+ professionally edited images",
      "Birthday theme by request (pre-book)",
    ],
  },
  {
    title: "Studio mini-session",
    price: "From $250",
    note: "20 minutes in-shop",
    items: [
      "Rotating seasonal backdrops & themes",
      "8+ edited images via online gallery",
      "Perfect for holiday cards & socials",
    ],
  },
  {
    title: "Outdoor mini-session",
    price: "From $300",
    note: "Families welcome",
    items: [
      "20 minutes at an outdoor location",
      "8+ professionally edited images",
      "Custom packages by email",
    ],
  },
];

const team = [
  {
    name: "Noel",
    role: "Founder · Lead groomer / trainer · Photographer",
    bio: "17 years with dogs — Fear Free and force-free to the core. Living in Austin with husband and rescue pitbull Maple.",
    src: img.teamNoel,
    alt: "Placeholder portrait slot for Noel — swap for real headshot",
  },
  {
    name: "Nikki",
    role: "Fear-Free stylist",
    bio: "Doodles, outline trims, and de-shed baths for double coats — Huskies, Goldens, Aussies, Poms.",
    src: img.teamNikki,
    alt: "Placeholder portrait slot for Nikki — swap for real headshot",
  },
  {
    name: "Lauren",
    role: "Groomer",
    bio: "Vet-clinic background turned grooming passion — every dog leaves feeling like a star.",
    src: img.teamLauren,
    alt: "Placeholder portrait slot for Lauren — swap for real headshot",
  },
];

const reviews = [
  {
    quote:
      "Amy did an amazing job… my Samoyed came home calm, happy, and beautiful. The photoshoot add-on looked so good.",
    who: "Tokyo’s human",
    meta: "Austin client",
    initial: "T",
  },
  {
    quote:
      "Noel takes kindness with animals to a whole other level. The only place I’d consider for a finicky dog.",
    who: "Jordy’s human",
    meta: "Fear Free regular",
    initial: "J",
  },
  {
    quote:
      "She responded quickly, answered every question, and I’ll definitely be taking him back.",
    who: "Sue & Ringo’s human",
    meta: "East Austin",
    initial: "S",
  },
];

const MAP_EMBED =
  "https://maps.google.com/maps?q=2801%20E.%205th%20St%2C%20Austin%2C%20TX%2078702&z=15&output=embed";

export default function HomePage() {
  const loop = [...gallery, ...gallery];

  return (
    <>
      <div className="demo-banner">
        <strong>Redesign demo</strong> — concept for Evergreen Hound. Not the live Wix
        site. Pay only if Noel loves it ($150–$300 scoped rebuild).
      </div>

      <header className="site-header site-header--solid">
        <div className="wrap nav">
          <a className="logo logo--ink" href="#top">
            Evergreen Hound
          </a>
          <nav className="nav-links nav-links--ink" aria-label="Primary">
            <a href="#grooming">Grooming</a>
            <a href="#addons">Spa add-ons</a>
            <a href="#photography">Photography</a>
            <a href="#team">Team</a>
            <a href="#clients">Clients</a>
            <a href="#hours">Hours</a>
            <a href="/christmas">Christmas</a>
          </nav>
          <a className="btn btn-primary btn-nav" href="sms:+15127661712">
            Text to book
          </a>
        </div>
      </header>

      <main id="top">
        <section className="hero hero--split" aria-label="Evergreen Hound hero">
          <div className="hero-media">
            <Image
              src={img.hero}
              alt="Professional groomer finishing a dog with scissors"
              fill
              priority
              sizes="100vw"
              className="hero-img--right"
            />
          </div>
          <div className="hero-shade hero-shade--dock" />
          <div className="wrap hero-dock">
            <p className="hero-kicker">Fear Free · East Austin · By appointment</p>
            <h1 className="hero-brand">Evergreen Hound</h1>
            <p className="hero-line">
              Force-free, compassionate dog grooming and photography — a kinder,
              gentler approach for body and heart.
            </p>
            <div className="hero-ctas">
              <CtaBook variant="light" />
              <CtaGhost href="mailto:barkingevergreen@gmail.com" light>
                Email Noel
              </CtaGhost>
            </div>
          </div>
        </section>

        <div className="atmosphere">
          <Reveal>
            <div className="trust-bar wrap">
              <div>
                <strong>Fear Free certified</strong>
                <span>Low-stress handling</span>
              </div>
              <div>
                <strong>Cooperative Care</strong>
                <span>Enrichment every visit</span>
              </div>
              <div>
                <strong>Woman-owned</strong>
                <span>East Austin boutique</span>
              </div>
              <div>
                <strong>By appointment</strong>
                <span>One dog at a time</span>
              </div>
            </div>
          </Reveal>

          <Reveal>
            <div className="marquee-wrap" aria-label="Grooming gallery">
              <div className="marquee-track">
                {loop.map((shot, i) => (
                  <div className="marquee-item" key={`${shot.src}-${i}`}>
                    <Image
                      src={shot.src}
                      alt={shot.alt}
                      width={640}
                      height={460}
                      sizes="280px"
                    />
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* 1. Grooming Services */}
          <section className="wrap" id="grooming">
            <Reveal>
              <p className="section-kicker">Grooming Services</p>
              <h2 className="section-title">Estimates given upon request</h2>
              <p className="section-lead">
                Pricing based on breed, coat & temperament. Every visit is customized —
                tap a package to see what’s included. We do not offer anal gland
                expressions or ear plucking (ask your vet for those).
              </p>
            </Reveal>
            <div className="grooming-split">
              <Reveal className="reveal-scale">
                <div className="grooming-visual">
                  <Image
                    src={img.calm}
                    alt="Calm dog being brushed during a Fear Free groom"
                    fill
                    sizes="(max-width: 860px) 100vw, 42vw"
                  />
                </div>
              </Reveal>
              <Reveal delay={80}>
                <PackagePicker />
              </Reveal>
            </div>
          </section>

          {/* 2. Specialty Spa Add-Ons */}
          <section className="wrap" id="addons">
            <Reveal>
              <p className="section-kicker">Specialty Spa Add-Ons</p>
              <h2 className="section-title">Austin-named extras pups actually enjoy</h2>
              <p className="section-lead">
                Willie for calm. McConaughey for the camera. Ladybird for the trail.
              </p>
            </Reveal>
            <div className="addon-stage">
              {addons.map((a, i) => (
                <Reveal key={a.name} delay={i * 90}>
                  <article className="addon-tile">
                    <Image
                      src={a.src}
                      alt={a.alt}
                      fill
                      sizes="(max-width: 860px) 100vw, 33vw"
                    />
                    <div className="addon-copy">
                      <div className="price">{a.price}</div>
                      <h3>{a.name}</h3>
                      <p>{a.blurb}</p>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </section>

          {/* 3. Photography Services */}
          <section className="wrap" id="photography">
            <Reveal>
              <p className="section-kicker">Photography Services</p>
              <h2 className="section-title">Family & pet portrait photography</h2>
              <p className="section-lead">
                Holiday cards, birthdays, and “just because” — same calm team behind the
                camera.
              </p>
            </Reveal>
            <Reveal className="reveal-scale">
              <div className="photo-feature">
                <Image
                  src={img.portrait}
                  alt="Beautiful pet portrait after grooming"
                  fill
                  sizes="100vw"
                />
                <div className="photo-feature-copy">
                  <p className="section-kicker">Seasonal gift path</p>
                  <h2 className="section-title">Christmas gifts page</h2>
                  <p className="section-lead">
                    Studio & outdoor minis, McConaughey add-on, and gift cards — clear for
                    holiday shoppers.
                  </p>
                  <CtaGhost href="/christmas" light>
                    Open Christmas gifts
                  </CtaGhost>
                </div>
              </div>
            </Reveal>
            <div className="photo-grid">
              {photoPackages.map((p, i) => (
                <Reveal key={p.title} delay={i * 80}>
                  <article className="photo-card">
                    <p className="photo-card-note">{p.note}</p>
                    <h3>{p.title}</h3>
                    <div className="photo-card-price">{p.price}</div>
                    <ul>
                      {p.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </article>
                </Reveal>
              ))}
            </div>
          </section>

          {/* 4. Meet the Team */}
          <section className="wrap" id="team">
            <Reveal>
              <p className="section-kicker">Meet the Team</p>
              <h2 className="section-title">The hands behind the calm</h2>
              <p className="section-lead">
                Stock portraits for layout — swap in Noel, Nikki, and Lauren’s real
                headshots before launch.
              </p>
            </Reveal>
            <div className="team-grid">
              {team.map((member, i) => (
                <Reveal key={member.name} delay={i * 80}>
                  <article className="team-card">
                    <div className="team-photo team-photo--filled">
                      <Image
                        src={member.src}
                        alt={member.alt}
                        fill
                        sizes="(max-width: 860px) 100vw, 33vw"
                      />
                      <span className="team-photo-tag">Replace with {member.name}’s photo</span>
                    </div>
                    <div className="team-body">
                      <h3>{member.name}</h3>
                      <p className="team-role">{member.role}</p>
                      <p>{member.bio}</p>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </section>

          {/* 5. My Happy Clients */}
          <section className="wrap" id="clients">
            <Reveal>
              <p className="section-kicker">My Happy Clients</p>
              <h2 className="section-title">Kind words from Austin dog humans</h2>
              <p className="section-lead">
                Follow the real gallery on Instagram{" "}
                <a className="inline-link" href="https://instagram.com/evergreenhound">
                  @evergreenhound
                </a>
              </p>
            </Reveal>
            <div className="review-grid">
              {reviews.map((r, i) => (
                <Reveal key={r.who} delay={i * 80}>
                  <blockquote className="review-card">
                    <div className="stars" aria-label="5 stars">
                      <span>★★★★★</span>
                    </div>
                    <p>“{r.quote}”</p>
                    <footer className="review-person">
                      <span className="review-avatar" aria-hidden>
                        {r.initial}
                      </span>
                      <span>
                        <strong>{r.who}</strong>
                        <small>{r.meta}</small>
                      </span>
                    </footer>
                  </blockquote>
                </Reveal>
              ))}
            </div>
          </section>

          {/* 6. Opening Hours + map */}
          <section className="wrap" id="hours">
            <Reveal>
              <p className="section-kicker">Opening Hours</p>
              <h2 className="section-title">By appointment only</h2>
            </Reveal>
            <div className="hours-grid">
              <Reveal delay={40}>
                <div className="hours-card">
                  <div className="hours-pin" aria-hidden>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M12 21s7-5.4 7-11a7 7 0 1 0-14 0c0 5.6 7 11 7 11Z"
                        stroke="currentColor"
                        strokeWidth="1.7"
                      />
                      <circle
                        cx="12"
                        cy="10"
                        r="2.4"
                        stroke="currentColor"
                        strokeWidth="1.7"
                      />
                    </svg>
                  </div>
                  <h3>Visit the salon</h3>
                  <p className="hours-address">
                    2801 E. 5th St
                    <br />
                    Austin, TX 78702
                  </p>
                  <ul className="hours-meta">
                    <li>
                      <strong>Hours</strong>
                      <span>By appointment only</span>
                    </li>
                    <li>
                      <strong>Text</strong>
                      <a href="sms:+15127661712">512-766-1712</a>
                    </li>
                    <li>
                      <strong>Email</strong>
                      <a href="mailto:barkingevergreen@gmail.com">
                        barkingevergreen@gmail.com
                      </a>
                    </li>
                    <li>
                      <strong>Social</strong>
                      <a href="https://instagram.com/evergreenhound">@evergreenhound</a>
                    </li>
                  </ul>
                  <div className="cta-row hours-ctas">
                    <CtaBook variant="forest" />
                    <CtaGhost href="mailto:barkingevergreen@gmail.com">
                      Start intake by email
                    </CtaGhost>
                  </div>
                </div>
              </Reveal>
              <Reveal delay={100} className="reveal-scale">
                <div className="map-frame">
                  <iframe
                    title="Evergreen Hound location — 2801 E. 5th St, Austin"
                    src={MAP_EMBED}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                  />
                  <a
                    className="map-open"
                    href="https://maps.google.com/?q=2801+E.+5th+St,+Austin,+TX+78702"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Open in Maps →
                  </a>
                </div>
              </Reveal>
            </div>
          </section>

          <footer className="wrap site-footer">
            Demo redesign concept · Evergreen Hound remains the brand owner · Stock
            grooming photos for preview — swap Noel’s gallery on launch
          </footer>
        </div>
      </main>

      <div className="mobile-bar">
        <CtaBook variant="forest" label="Text to book" detail="512-766-1712" />
      </div>
    </>
  );
}
