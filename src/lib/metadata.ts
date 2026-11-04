import type { Metadata } from "next";
import type { SiteConfig } from "@/lib/site.schema";
import { absoluteUrl } from "@/lib/links";

/** Builds the Next.js Metadata object for the home page from `site.json`. */
export function buildMetadata(config: SiteConfig): Metadata {
  const { site, business } = config;
  const url = absoluteUrl(config, "/");

  const geoOther: Record<string, string> = {
    "geo.region": "IN-UP",
    "geo.placename": business.address.addressLocality,
  };
  if (business.geo.latitude !== null && business.geo.longitude !== null) {
    geoOther["geo.position"] = `${business.geo.latitude};${business.geo.longitude}`;
    geoOther.ICBM = `${business.geo.latitude}, ${business.geo.longitude}`;
  }
  if (site.verification.bing) {
    geoOther["msvalidate.01"] = site.verification.bing;
  }

  return {
    metadataBase: new URL(absoluteUrl(config, "/")),
    title: { default: site.title.default, template: site.title.template },
    description: site.description,
    keywords: site.keywords,
    applicationName: site.name,
    authors: [{ name: business.owner.name }],
    creator: business.owner.name,
    category: "Health & Fitness",
    alternates: {
      canonical: url,
      languages: { "en-IN": url },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    openGraph: {
      type: "website",
      locale: "en_IN",
      siteName: site.name,
      url,
      title: site.title.default,
      description: site.description,
      images: [
        {
          url: absoluteUrl(config, site.images.ogImage.path),
          width: site.images.ogImage.width,
          height: site.images.ogImage.height,
          alt: site.images.ogImage.alt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: site.title.default,
      description: site.description,
      images: [absoluteUrl(config, site.images.twitterImage.path)],
    },
    verification: {
      ...(site.verification.google ? { google: site.verification.google } : {}),
    },
    other: geoOther,
    formatDetection: { telephone: true },
    icons: {
      icon: [
        { url: site.images.favicon },
        { url: site.images.icon192, sizes: "192x192", type: "image/png" },
        { url: site.images.icon512, sizes: "512x512", type: "image/png" },
      ],
      apple: [{ url: site.images.appleTouchIcon }],
    },
  };
}
