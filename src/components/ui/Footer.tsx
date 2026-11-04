import Image from "next/image";
import type { SiteConfig } from "@/lib/site.schema";
import { Icon } from "@/components/ui/Icon";

export function Footer({ config }: { config: SiteConfig }) {
  const { footer, business } = config;
  const year = new Date().getFullYear();

  const socials = [
    { key: "instagram", url: business.social.instagram, label: "Instagram" },
    { key: "facebook", url: business.social.facebook, label: "Facebook" },
    { key: "youtube", url: business.social.youtube, label: "YouTube" },
  ].filter((s) => s.url) as { key: "instagram" | "facebook" | "youtube"; url: string; label: string }[];

  return (
    <footer className="border-t-[6px] border-brand-red bg-brand-black text-brand-white">
      <div className="container-brand grid gap-10 py-14 md:grid-cols-4">
        <div>
          <a href="#home" className="flex items-center gap-2">
            <Image src="/images/logo-mark.png" alt="" width={40} height={40} className="h-10 w-10" />
            <span className="font-display text-sm">{config.site.name}</span>
          </a>
          <p className="mt-3 font-display italic text-brand-yellow">{footer.tagline}</p>
          {socials.length > 0 && (
            <ul className="mt-4 flex gap-3">
              {socials.map((s) => (
                <li key={s.key}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-brand-yellow text-brand-yellow hover:bg-brand-yellow hover:text-brand-black"
                  >
                    <Icon name={s.key} className="h-4 w-4" />
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        <nav aria-label="Footer quick links">
          <h2 className="font-display text-sm text-brand-yellow">Quick links</h2>
          <ul className="mt-3 space-y-2">
            {footer.quickLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="text-sm text-brand-white/85 hover:text-brand-yellow">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <address className="not-italic">
          <h2 className="font-display text-sm text-brand-yellow">Visit us</h2>
          <p className="mt-3 text-sm text-brand-white/85">
            {footer.visitUs.map((line, i) => (
              <span key={line}>
                {line}
                {i < footer.visitUs.length - 1 && <br />}
              </span>
            ))}
          </p>
        </address>

        <div>
          <h2 className="font-display text-sm text-brand-yellow">Contact</h2>
          <p className="mt-3 text-sm text-brand-white/85">
            {business.phone.display || "Phone coming soon"}
            <br />
            {business.email || ""}
          </p>
        </div>
      </div>

      <div className="border-t border-brand-white/15 py-5 text-center text-xs text-brand-white/60">
        &copy; {year} {footer.copyrightName}. All rights reserved.
      </div>
    </footer>
  );
}
