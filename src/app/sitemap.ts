import type { MetadataRoute } from "next";

const BASE_URL = process.env.URL || "https://hypocaps.fr";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    { path: "", priority: 1 },
    { path: "/blog", priority: 0.8, changeFreq: "weekly" as const },
    { path: "/faq", priority: 0.7 },
    { path: "/diabete", priority: 0.7 },
    { path: "/members", priority: 0.6 },
    { path: "/concours", priority: 0.6 },
    { path: "/pricing", priority: 0.8 },
    { path: "/questionnaire", priority: 0.9 },
  ];

  return pages.map((p) => ({
    url: `${BASE_URL}${p.path}`,
    lastModified: new Date(),
    changeFrequency: p.changeFreq || ("monthly" as const),
    priority: p.priority,
  }));
}
