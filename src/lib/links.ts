import type { CtaConfig, SiteConfig } from "@/lib/site.schema";

/**
 * Builds a wa.me link with an encoded prefilled message. Falls back to
 * `#contact` when no WhatsApp number is configured, so the button never
 * points at a broken link.
 */
export function whatsappLink(config: SiteConfig, message?: string): string {
  const number = config.business.phone.e164.replace(/[^\d]/g, "");
  if (!number) return "#contact";
  const text = message ?? "";
  return `https://wa.me/${number}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
}

/**
 * Builds a `tel:` link. Falls back to `#contact` when no phone number is
 * configured.
 */
export function telLink(config: SiteConfig): string {
  const number = config.business.phone.e164;
  if (!number) return "#contact";
  return `tel:${number}`;
}

/**
 * Resolves an absolute URL against `site.url`, honoring the
 * `NEXT_PUBLIC_SITE_URL` env override (useful for preview deployments).
 */
export function absoluteUrl(config: SiteConfig, path: string): string {
  const base = (process.env.NEXT_PUBLIC_SITE_URL || config.site.url).replace(/\/$/, "");
  const suffix = path.startsWith("/") ? path : `/${path}`;
  return `${base}${suffix}`;
}

/**
 * Resolves the href + accessible behaviour for any `cta`/button object
 * driven by JSON (`action: "whatsapp" | "call" | "link"`).
 */
export function resolveCta(config: SiteConfig, cta: CtaConfig): { href: string; isExternal: boolean } {
  switch (cta.action) {
    case "whatsapp":
      return { href: whatsappLink(config, cta.whatsappMessage), isExternal: true };
    case "call":
      return { href: telLink(config), isExternal: false };
    case "link":
      return { href: cta.href ?? "#contact", isExternal: false };
    default:
      return { href: "#contact", isExternal: false };
  }
}
