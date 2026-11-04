import { z } from "zod";

/**
 * Mirrors `src/data/site.json`. Every optional business fact (phone, email,
 * hours, geo, social, verification, analytics) is allowed to be an empty
 * string / null / empty array so the owner can ship the site before those
 * details are known. Consumers must treat empty values as "not configured"
 * and render graceful fallbacks instead of broken links or empty metadata.
 */

const imageSchema = z.object({
  path: z.string().min(1),
  width: z.number().int().positive(),
  height: z.number().int().positive(),
  alt: z.string(),
});

const ctaActionSchema = z.enum(["whatsapp", "call", "link"]);

const ctaSchema = z.object({
  label: z.string().min(1),
  action: ctaActionSchema,
  whatsappMessage: z.string().optional(),
  href: z.string().optional(),
});

const navLinkSchema = z.object({
  label: z.string().min(1),
  href: z.string().min(1),
});

const siteSchema = z.object({
  name: z.string().min(1),
  shortName: z.string().min(1),
  url: z.string().min(1),
  locale: z.string().min(1),
  language: z.string().min(1),
  colors: z.object({
    yellow: z.string(),
    black: z.string(),
    red: z.string(),
    orange: z.string(),
    white: z.string(),
  }),
  taglines: z.object({
    primary: z.string(),
    hindi: z.string(),
  }),
  title: z.object({
    default: z.string().min(1),
    template: z.string().min(1),
  }),
  description: z.string().min(1),
  keywords: z.array(z.string()),
  images: z.object({
    ogImage: imageSchema,
    twitterImage: imageSchema,
    favicon: z.string(),
    icon192: z.string(),
    icon512: z.string(),
    appleTouchIcon: z.string(),
    maskableIcon: z.string(),
  }),
  themeColor: z.string(),
  backgroundColor: z.string(),
  verification: z.object({
    google: z.string(),
    bing: z.string(),
  }),
  analytics: z.object({
    ga4Id: z.string(),
    plausibleDomain: z.string(),
  }),
});

const businessSchema = z.object({
  schemaTypes: z.array(z.string()),
  legalName: z.string().min(1),
  description: z.string(),
  foundingDate: z.string(),
  priceRange: z.string(),
  phone: z.object({
    display: z.string(),
    e164: z.string(),
  }),
  email: z.string(),
  address: z.object({
    streetAddress: z.string().min(1),
    addressLocality: z.string().min(1),
    addressRegion: z.string().min(1),
    postalCode: z.string(),
    addressCountry: z.string().min(1),
  }),
  geo: z.object({
    latitude: z.number().nullable(),
    longitude: z.number().nullable(),
  }),
  googleBusinessProfileUrl: z.string(),
  googleMapsSearchUrl: z.string(),
  googleMapsEmbedUrl: z.string(),
  hours: z.object({
    fallbackText: z.string(),
    rows: z.array(
      z.object({
        day: z.string(),
        opens: z.string(),
        closes: z.string(),
      })
    ),
  }),
  social: z.object({
    instagram: z.string(),
    facebook: z.string(),
    youtube: z.string(),
    justdial: z.string(),
  }),
  payment: z.object({
    upi: z.object({
      enabled: z.boolean(),
      vpa: z.string(),
      qrImage: z.string(),
    }),
    cash: z.boolean(),
    card: z.boolean(),
  }),
  amenities: z.array(z.string()),
  owner: z.object({
    name: z.string().min(1),
    role: z.string().min(1),
    image: imageSchema,
  }),
});

const navigationSchema = z.object({
  links: z.array(navLinkSchema),
  cta: ctaSchema,
});

const heroSchema = z.object({
  tagChip: z.string(),
  headlineLines: z.array(z.string()).length(3),
  headline: z.string().min(1),
  subheadlinePrefix: z.string(),
  subheadlineAccent: z.string(),
  ctaPrimary: ctaSchema,
  ctaSecondary: ctaSchema,
  locationBadge: z.object({
    label: z.string(),
    action: z.literal("link"),
  }),
  priceSticker: z.object({
    amount: z.string(),
    label: z.string(),
  }),
  heroImage: imageSchema,
});

const pricingSchema = z.object({
  title: z.string(),
  lead: z.string(),
  items: z.array(
    z.object({
      id: z.string(),
      icon: z.string(),
      amount: z.string(),
      label: z.string(),
      note: z.string(),
    })
  ),
  fixedPriceText: z.string(),
  noBargainingText: z.string(),
  firstMonthCard: z.object({
    amount: z.string(),
    text: z.string(),
  }),
});

const whySchema = z.object({
  title: z.string(),
  items: z.array(
    z.object({
      icon: z.string(),
      title: z.string(),
      text: z.string(),
    })
  ),
});

const trainerSchema = z.object({
  name: z.string().min(1),
  role: z.string(),
  image: imageSchema,
  bio: z.array(z.string()),
  chips: z.array(z.string()),
  cta: ctaSchema,
});

const galleryItemSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  description: z.string(),
  featured: z.boolean(),
  video: z.string().min(1),
  poster: z.string().min(1),
  width: z.number().int().positive(),
  height: z.number().int().positive(),
  size: z.number().int().positive(),
  duration: z.number().positive(),
  uploadDate: z.string().min(1),
});

const gallerySchema = z.object({
  title: z.string(),
  lead: z.string(),
  items: z.array(galleryItemSchema).min(1),
  ctaTile: z.object({
    title: z.string(),
    addressText: z.string(),
    buttonLabel: z.string(),
  }),
});

const faqSchema = z.object({
  enabled: z.boolean(),
  items: z.array(
    z.object({
      question: z.string().min(1),
      answer: z.string().min(1),
    })
  ),
});

const contactSchema = z.object({
  title: z.string(),
  lead: z.string(),
  rows: z.object({
    address: z.object({ label: z.string(), value: z.string() }),
    phone: z.object({ label: z.string(), fallbackText: z.string() }),
    hours: z.object({ label: z.string(), fallbackText: z.string() }),
  }),
  upi: z.object({
    enabled: z.boolean(),
    title: z.string(),
    text: z.string(),
  }),
  form: z.object({
    mode: z.enum(["whatsapp", "api"]),
    title: z.string(),
    whatsappTemplate: z.string(),
    noPhoneMessage: z.string(),
    fields: z.object({
      name: z.object({ label: z.string(), placeholder: z.string(), required: z.boolean(), errorMessage: z.string() }),
      phone: z.object({ label: z.string(), placeholder: z.string(), required: z.boolean(), errorMessage: z.string() }),
      message: z.object({ label: z.string(), placeholder: z.string(), required: z.boolean(), errorMessage: z.string() }),
    }),
    submitLabel: z.string(),
    successMessage: z.string(),
    errorMessage: z.string(),
  }),
});

const ctaBandSchema = z.object({
  title: z.string(),
  text: z.string(),
  button: ctaSchema,
  backgroundImage: imageSchema,
});

const footerSchema = z.object({
  tagline: z.string(),
  quickLinks: z.array(navLinkSchema),
  visitUs: z.array(z.string()),
  copyrightName: z.string().min(1),
});

const floatingActionsSchema = z.object({
  whatsapp: ctaSchema,
  call: ctaSchema,
});

export const siteConfigSchema = z.object({
  site: siteSchema,
  business: businessSchema,
  navigation: navigationSchema,
  hero: heroSchema,
  pricing: pricingSchema,
  why: whySchema,
  trainer: trainerSchema,
  gallery: gallerySchema,
  faq: faqSchema,
  contact: contactSchema,
  cta: ctaBandSchema,
  footer: footerSchema,
  floatingActions: floatingActionsSchema,
});

export type SiteConfig = z.infer<typeof siteConfigSchema>;
export type CtaConfig = z.infer<typeof ctaSchema>;
export type GalleryItem = z.infer<typeof galleryItemSchema>;
export type ImageConfig = z.infer<typeof imageSchema>;
