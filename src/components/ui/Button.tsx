import type { CtaConfig, SiteConfig } from "@/lib/site.schema";
import { resolveCta } from "@/lib/links";

const variantClass = {
  yellow: "btn-yellow",
  black: "btn-black",
  "outline-white": "btn-outline-white",
} as const;

export function Button({
  config,
  cta,
  variant,
  className,
}: {
  config: SiteConfig;
  cta: CtaConfig;
  variant: keyof typeof variantClass;
  className?: string;
}) {
  const { href, isExternal } = resolveCta(config, cta);
  return (
    <a
      href={href}
      className={`btn ${variantClass[variant]} ${className ?? ""}`}
      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {cta.label}
    </a>
  );
}
