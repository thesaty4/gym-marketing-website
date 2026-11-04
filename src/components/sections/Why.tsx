import type { SiteConfig } from "@/lib/site.schema";
import { Icon } from "@/components/ui/Icon";
import { Slant } from "@/components/ui/Slant";

export function Why({ config }: { config: SiteConfig }) {
  const { why } = config;

  return (
    <>
      <Slant from="yellow" to="paper" />
      <section id="why" aria-labelledby="why-heading" className="bg-paper py-16 text-on-paper">
      <div className="container-brand">
        <h2 id="why-heading" className="text-center font-display text-[clamp(2.4rem,7vw,4.8rem)]">
          {why.title}
        </h2>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y-[3px] divide-brand-black lg:divide-x-[3px] lg:divide-y-0">
          {why.items.map((item) => (
            <div key={item.title} className="px-6 py-8 text-center first:pt-0 lg:first:pl-0">
              <Icon name={item.icon as "dumbbell"} className="mx-auto h-10 w-10 text-brand-orange" />
              <h3 className="mt-4 font-display text-xl">{item.title}</h3>
              <p className="mt-2 text-sm text-on-paper-soft">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
    </>
  );
}
