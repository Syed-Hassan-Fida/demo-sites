import type { MetadataRoute } from "next";
import { site } from "./lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.canonical.replace(/\/$/, "");
  return site.pages.map((p) => ({
    url: p ? `${base}/${p}` : base,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: p === "" ? 1 : p === "book" || p === "pricing" ? 0.9 : 0.7,
  }));
}
