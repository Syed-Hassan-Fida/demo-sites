import type { MetadataRoute } from "next";
import { site } from "./lib/site";

const paths = site.pages;

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.canonical.replace(/\/$/, "");
  return paths.map((p) => ({
    url: p ? `${base}/${p}` : base,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: p === "" ? 1 : 0.7,
  }));
}
