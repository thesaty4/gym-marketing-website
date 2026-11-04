import type { MetadataRoute } from "next";
import { getSiteConfig } from "@/lib/getSiteConfig";

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const config = await getSiteConfig();
  const { site } = config;

  return {
    name: site.name,
    short_name: site.shortName,
    description: site.description,
    start_url: "/",
    display: "standalone",
    background_color: site.backgroundColor,
    theme_color: site.themeColor,
    icons: [
      { src: site.images.icon192, sizes: "192x192", type: "image/png" },
      { src: site.images.icon512, sizes: "512x512", type: "image/png" },
      { src: site.images.maskableIcon, sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
