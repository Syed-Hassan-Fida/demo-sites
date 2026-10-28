import type { MetadataRoute } from "next";
import { site } from "./lib/site";

const paths = [
  "",
  "about",
  "services",
  "pricing",
  "gallery",
  "faq",
  "book",
  "contact",
  "policies",
  "privacy",
  "terms",
  "accessibility",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.canonical.replace(/\/$/, "");
  return paths.map((p) => ({
    url: p ? `${base}/${p}` : base,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: p === "" ? 1 : 0.7,
  }));
}
