import type { MetadataRoute } from "next";
import { getSiteConfig } from "@/lib/getSiteConfig";
import { absoluteUrl } from "@/lib/links";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const config = await getSiteConfig();
  const url = absoluteUrl(config, "/");

  const images = [
    config.site.images.ogImage.path,
    config.hero.heroImage.path,
    config.business.owner.image.path,
    ...config.gallery.items.map((item) => item.poster),
  ].map((path) => absoluteUrl(config, path));

  const videos = config.gallery.items.map((item) => ({
    title: item.title,
    thumbnail_loc: absoluteUrl(config, item.poster),
    description: item.description,
    content_loc: absoluteUrl(config, item.video),
    duration: item.duration,
    publication_date: item.uploadDate,
    family_friendly: "yes" as const,
  }));

  return [
    {
      url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
      images,
      videos,
    },
  ];
}
