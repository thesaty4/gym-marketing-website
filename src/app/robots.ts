import type { MetadataRoute } from "next";
import { getSiteConfig } from "@/lib/getSiteConfig";
import { absoluteUrl } from "@/lib/links";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const config = await getSiteConfig();

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: absoluteUrl(config, "/sitemap.xml"),
  };
}
