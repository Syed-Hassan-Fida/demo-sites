import type { MetadataRoute } from "next";
import { educationPages } from "./lib/education";
import { galleryCategories } from "./lib/gallery";
import { morePages } from "./lib/more";
import { site } from "./lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.canonical.replace(/\/$/, "");
  const staticPaths = [
    "",
    "services",
    "pricing",
    "gallery",
    "faq",
    "book",
    "contact",
    "about",
    "testimonials",
    "education",
    "products",
    "more",
    "privacy",
    "terms",
    "accessibility",
  ];

  const entries: MetadataRoute.Sitemap = staticPaths.map((p) => ({
    url: p ? `${base}/${p}` : base,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: p === "" ? 1 : 0.7,
  }));

  for (const c of galleryCategories) {
    entries.push({
      url: `${base}/gallery/${c.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    });
  }
  for (const e of educationPages) {
    entries.push({
      url: `${base}/education/${e.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    });
  }
  for (const m of morePages) {
    entries.push({
      url: `${base}/more/${m.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    });
  }

  return entries;
}
