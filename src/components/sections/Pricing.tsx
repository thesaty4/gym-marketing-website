import type { SiteConfig } from "@/lib/site.schema";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { Slant } from "@/components/ui/Slant";

export function Pricing({ config }: { config: SiteConfig }) {
  const { pricing } = config;

  return (
    <>
      <Slant from="black" to="yellow" />
      <section id="pricing" aria-labelledby="pricing-heading" className="dot-texture bg-brand-yellow py-16">
        <div className="container-brand">
          <h2 id="pricing-heading" className="font-display text-[clamp(2.4rem,7vw,4.8rem)] text-brand-black">
            {pricing.title}
          </h2>
          <p className="mt-2 max-w-xl text-brand-black/80">{pricing.lead}</p>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {pricing.items.map((item) => (
              <Reveal key={item.id}>
                <div className="brush-strip flex flex-wrap items-center gap-5 bg-brand-black px-7 py-6">
                  <Icon name={item.icon as "dumbbell"} className="h-10 w-10 shrink-0 text-brand-orange max-md:hidden" />
                  <div className="rounded-full bg-brand-yellow px-6 py-2 text-brand-black">
                    <span className="font-display text-[clamp(2.6rem,12.5vw,4.2rem)] md:text-[clamp(3.6rem,11vw,7.6rem)]">{item.amount}</span>
                  </div>
                  <div className="font-display text-brand-white">
                    {item.label}
                    {item.note && <span className="ml-2 text-sm text-brand-yellow">{item.note}</span>}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-12 flex flex-wrap items-center justify-center">
            <div className="brush-strip bg-brand-black px-8 py-4 font-display italic text-brand-white -rotate-1">
              {pricing.fixedPriceText}
            </div>
            <div className="brush-strip -ml-6 bg-brand-red px-8 py-4 font-display italic text-brand-white -rotate-2">
              {pricing.noBargainingText}
            </div>
          </Reveal>

          <Reveal className="mt-12 flex justify-center">
            <div className="shadow-hard-black max-w-md border-[3px] border-brand-black bg-brand-white px-8 py-8 text-center">
              <div className="font-display text-[clamp(2.6rem,8vw,4.4rem)] text-brand-black">{pricing.firstMonthCard.amount}</div>
              <p className="mt-3 text-sm text-brand-black/80">{pricing.firstMonthCard.text}</p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
