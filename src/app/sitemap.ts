import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(site.updated);
  return [
    { url: site.url, lastModified, changeFrequency: "monthly", priority: 1 },
    { url: `${site.url}/work/ai-sheets`, lastModified, changeFrequency: "yearly", priority: 0.8 },
    { url: `${site.url}/work/timefork`, lastModified, changeFrequency: "yearly", priority: 0.8 },
    { url: `${site.url}/work/gallerist`, lastModified, changeFrequency: "yearly", priority: 0.8 },
  ];
}
