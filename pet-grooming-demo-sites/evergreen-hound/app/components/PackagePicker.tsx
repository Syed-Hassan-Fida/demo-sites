"use client";

import { useState } from "react";

const packages = [
  {
    title: "Full custom cut",
    ideal: "Doodles, Shih Tzus & friends",
    items: [
      "Customized all-over haircut",
      "Skin-aware bath, shampoo mix & massage",
      "Low-shed treatment as needed",
      "Brush & dry, nail trim, ear cleaning",
      "Enrichment (treat, puzzle, or play)",
    ],
  },
  {
    title: "Outline tidy",
    ideal: "Retrievers, Aussies & feathered coats",
    items: [
      "Chest, tummy line & fanny feathers",
      "Paw pad shave + paw trim",
      "Sanitary tidy",
      "Eyes / bangs / ears neaten",
      "Bath ritual + enrichment",
    ],
  },
  {
    title: "Between-haircut refresh",
    ideal: "Corgis, retrievers, in-between weeks",
    items: [
      "Paw + sanitary tidy",
      "Face tidy",
      "Custom bath & low-shed care",
      "Nail trim & ear cleaning",
      "Enrichment included",
    ],
  },
  {
    title: "Bath & wellbeing",
    ideal: "Pitbulls, Labs & short coats",
    items: [
      "Custom bath ritual & massage",
      "Brush, dry & low-shed treatment",
      "Nail trim & ear cleaning",
      "Enrichment activity",
      "Calm, force-free handling",
    ],
  },
];

export function PackagePicker() {
  const [active, setActive] = useState(0);
  const pkg = packages[active];

  return (
    <div className="pkg-picker">
      <div className="pkg-tabs" role="tablist" aria-label="Grooming packages">
        {packages.map((p, i) => (
          <button
            key={p.title}
            type="button"
            role="tab"
            aria-selected={i === active}
            className={i === active ? "pkg-tab is-active" : "pkg-tab"}
            onClick={() => setActive(i)}
          >
            {p.title}
          </button>
        ))}
      </div>
      <div className="pkg-panel" role="tabpanel" key={pkg.title}>
        <p className="pkg-ideal">Ideal for {pkg.ideal}</p>
        <h3>{pkg.title}</h3>
        <ul>
          {pkg.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p className="pkg-note">Estimates given upon request · No anal glands or ear plucking</p>
        <a className="btn btn-primary" href="sms:+15127661712">
          Ask about this package
        </a>
      </div>
    </div>
  );
}
