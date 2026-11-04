import type { SiteConfig } from "@/lib/site.schema";
import { absoluteUrl } from "@/lib/links";

/** Converts a duration in seconds to an ISO-8601 duration like `PT8S`. */
function isoDuration(seconds: number): string {
  const whole = Math.max(1, Math.round(seconds));
  return `PT${whole}S`;
}

/** Drops keys whose value is "", null, undefined or an empty array/object. */
function pruneEmpty<T>(value: T): T {
  if (Array.isArray(value)) {
    const arr = value.map(pruneEmpty).filter((v) => v !== undefined);
    return arr as unknown as T;
  }
  if (value && typeof value === "object") {
    const entries = Object.entries(value as Record<string, unknown>)
      .map(([k, v]) => [k, pruneEmpty(v)] as const)
      .filter(([, v]) => {
        if (v === "" || v === null || v === undefined) return false;
        if (Array.isArray(v) && v.length === 0) return false;
        if (typeof v === "object" && v !== null && Object.keys(v as object).length === 0) return false;
        return true;
      });
    return Object.fromEntries(entries) as T;
  }
  return value;
}

function buildWebsite(config: SiteConfig) {
  const url = absoluteUrl(config, "/");
  return {
    "@type": "WebSite",
    "@id": `${url}#website`,
    name: config.site.name,
    url,
    inLanguage: config.site.language,
    publisher: { "@id": `${url}#gym` },
  };
}

function buildWebpage(config: SiteConfig) {
  const url = absoluteUrl(config, "/");
  return {
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: config.site.title.default,
    description: config.site.description,
    isPartOf: { "@id": `${url}#website` },
    primaryImageOfPage: { "@id": `${absoluteUrl(config, config.site.images.ogImage.path)}#image` },
    about: { "@id": `${url}#gym` },
    breadcrumb: { "@id": `${url}#breadcrumb` },
    inLanguage: config.site.language,
  };
}

function buildImageObjects(config: SiteConfig) {
  const images = [
    { path: config.site.images.ogImage.path, width: config.site.images.ogImage.width, height: config.site.images.ogImage.height, alt: config.site.images.ogImage.alt },
    { path: config.hero.heroImage.path, width: config.hero.heroImage.width, height: config.hero.heroImage.height, alt: config.hero.heroImage.alt },
    { path: config.business.owner.image.path, width: config.business.owner.image.width, height: config.business.owner.image.height, alt: config.business.owner.image.alt },
    ...config.gallery.items.map((item) => ({ path: item.poster, width: item.width, height: item.height, alt: item.title })),
  ];
  const seen = new Set<string>();
  return images
    .filter((img) => {
      if (seen.has(img.path)) return false;
      seen.add(img.path);
      return true;
    })
    .map((img) => ({
      "@type": "ImageObject",
      "@id": `${absoluteUrl(config, img.path)}#image`,
      url: absoluteUrl(config, img.path),
      contentUrl: absoluteUrl(config, img.path),
      width: img.width,
      height: img.height,
      caption: img.alt,
    }));
}

function buildGymBusiness(config: SiteConfig) {
  const url = absoluteUrl(config, "/");
  const { business } = config;
  const images = [
    absoluteUrl(config, config.site.images.ogImage.path),
    absoluteUrl(config, config.hero.heroImage.path),
    absoluteUrl(config, business.owner.image.path),
    ...config.gallery.items.map((item) => absoluteUrl(config, item.poster)),
  ];

  return pruneEmpty({
    "@type": business.schemaTypes,
    "@id": `${url}#gym`,
    name: config.site.name,
    legalName: business.legalName,
    description: business.description,
    url,
    image: images,
    logo: absoluteUrl(config, "/images/logo-mark.png"),
    telephone: business.phone.e164,
    email: business.email,
    priceRange: business.priceRange,
    address: {
      "@type": "PostalAddress",
      streetAddress: business.address.streetAddress,
      addressLocality: business.address.addressLocality,
      addressRegion: business.address.addressRegion,
      postalCode: business.address.postalCode,
      addressCountry: business.address.addressCountry,
    },
    geo:
      business.geo.latitude !== null && business.geo.longitude !== null
        ? { "@type": "GeoCoordinates", latitude: business.geo.latitude, longitude: business.geo.longitude }
        : undefined,
    hasMap: business.googleMapsSearchUrl || business.googleBusinessProfileUrl,
    openingHoursSpecification: business.hours.rows.map((row) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: row.day,
      opens: row.opens,
      closes: row.closes,
    })),
    sameAs: [business.social.instagram, business.social.facebook, business.social.youtube, business.social.justdial, business.googleBusinessProfileUrl].filter(
      Boolean
    ),
    amenityFeature: business.amenities.map((name) => ({ "@type": "LocationFeatureSpecification", name, value: true })),
    founder: {
      "@type": "Person",
      name: business.owner.name,
      jobTitle: business.owner.role,
    },
  });
}

function buildVideoObjects(config: SiteConfig) {
  return config.gallery.items.map((item) =>
    pruneEmpty({
      "@type": "VideoObject",
      "@id": `${absoluteUrl(config, "/")}#video-${item.id}`,
      name: item.title,
      description: item.description,
      thumbnailUrl: absoluteUrl(config, item.poster),
      contentUrl: absoluteUrl(config, item.video),
      uploadDate: item.uploadDate,
      duration: isoDuration(item.duration),
      width: item.width,
      height: item.height,
      inLanguage: config.site.language,
    })
  );
}

function buildFaqPage(config: SiteConfig) {
  if (!config.faq.enabled || config.faq.items.length === 0) return null;
  const url = absoluteUrl(config, "/");
  return {
    "@type": "FAQPage",
    "@id": `${url}#faq`,
    mainEntity: config.faq.items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

function buildBreadcrumbs(config: SiteConfig) {
  const url = absoluteUrl(config, "/");
  return {
    "@type": "BreadcrumbList",
    "@id": `${url}#breadcrumb`,
    itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: url }],
  };
}

/** Builds the full `@graph` of structured data rendered on the home page. */
export function buildJsonLd(config: SiteConfig) {
  const graph = [
    buildWebsite(config),
    buildWebpage(config),
    buildGymBusiness(config),
    ...buildImageObjects(config),
    ...buildVideoObjects(config),
    buildFaqPage(config),
    buildBreadcrumbs(config),
  ].filter(Boolean);

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}
