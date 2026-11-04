import type { SiteConfig } from "@/lib/site.schema";
import { resolveCta } from "@/lib/links";
import { Icon } from "@/components/ui/Icon";

export function FloatingActions({ config }: { config: SiteConfig }) {
  const whatsapp = resolveCta(config, config.floatingActions.whatsapp);
  const call = resolveCta(config, config.floatingActions.call);

  return (
    <div
      className="xl:hidden fixed bottom-5 right-5 z-40 flex flex-col gap-3"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)", paddingRight: "env(safe-area-inset-right, 0px)" }}
    >
      <a
        href={call.href}
        aria-label={config.floatingActions.call.label}
        className="flex h-[52px] w-[52px] items-center justify-center rounded-full border-[3px] border-brand-white bg-brand-red text-brand-white shadow-hard-black"
      >
        <Icon name="phone" className="h-6 w-6" />
      </a>
      <a
        href={whatsapp.href}
        target={whatsapp.isExternal ? "_blank" : undefined}
        rel={whatsapp.isExternal ? "noopener noreferrer" : undefined}
        aria-label={config.floatingActions.whatsapp.label}
        className="flex h-[52px] w-[52px] items-center justify-center rounded-full border-[3px] border-brand-white bg-[#1FAF38] text-brand-white shadow-hard-black"
      >
        <Icon name="whatsapp" className="h-6 w-6" />
      </a>
    </div>
  );
}
