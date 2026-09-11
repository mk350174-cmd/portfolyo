import type { MetadataRoute } from "next";
import { PROJECTS } from "@/content/projects";
import { SITE } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: SITE.url, lastModified: now, priority: 1 },
    { url: `${SITE.url}/about`, lastModified: now, priority: 0.8 },
    ...PROJECTS.map((p) => ({
      url: `${SITE.url}/work/${p.slug}`,
      lastModified: now,
      priority: 0.9,
    })),
  ];
}
