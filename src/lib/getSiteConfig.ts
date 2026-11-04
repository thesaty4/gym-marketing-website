import { cache } from "react";
import siteJson from "@/data/site.json";
import { siteConfigSchema, type SiteConfig } from "@/lib/site.schema";

/**
 * Loads and validates the site content config. Today this reads the local
 * `site.json`; swap it for an API without touching any component.
 *
 * To switch to an API later, replace the body with:
 *
 *   const res = await fetch(process.env.SITE_CONFIG_API_URL!, {
 *     next: { revalidate: 3600 },
 *   });
 *   if (!res.ok) throw new Error(`Failed to load site config: ${res.status}`);
 *   const json = await res.json();
 *   const parsed = siteConfigSchema.safeParse(json);
 *   if (!parsed.success) {
 *     throw new Error(`Invalid site config from API: ${parsed.error.message}`);
 *   }
 *   return parsed.data;
 *
 * `React.cache` keeps this to a single parse per request/build.
 */
export const getSiteConfig = cache(async (): Promise<SiteConfig> => {
  const parsed = siteConfigSchema.safeParse(siteJson);
  if (!parsed.success) {
    throw new Error(`Invalid src/data/site.json: ${parsed.error.message}`);
  }
  return parsed.data;
});
