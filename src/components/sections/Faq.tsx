import type { SiteConfig } from "@/lib/site.schema";
import { Icon } from "@/components/ui/Icon";
import { Slant } from "@/components/ui/Slant";

export function Faq({ config }: { config: SiteConfig }) {
  const { faq } = config;
  if (!faq.enabled || faq.items.length === 0) return null;

  return (
    <>
      <Slant from="yellow" to="black" />
      <section id="faq" aria-labelledby="faq-heading" className="bg-brand-black py-16 text-brand-white">
        <div className="container-brand">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <header>
              <p className="font-display text-sm tracking-[0.18em] text-brand-orange">FAQ / THE QUICK ANSWERS</p>
              <h2
                id="faq-heading"
                className="mt-4 max-w-md font-display text-[clamp(2.4rem,7vw,4.8rem)] text-brand-yellow"
              >
                Frequently asked questions
              </h2>
              <div aria-hidden="true" className="mt-6 h-2 w-20 rotate-[-2deg] bg-brand-orange" />
              <p className="mt-6 max-w-sm text-brand-white/75">
                Straight answers about memberships, training, and your first visit.
              </p>
            </header>

            <ol className="m-0 list-none p-0">
              {faq.items.map((item, index) => (
                <li key={item.question}>
                  <details className="group border-b-2 border-brand-white/20 py-5 first:border-t-2 first:border-brand-white/20 open:border-brand-yellow">
                    <summary className="flex cursor-pointer list-none items-center gap-4 pr-20 [&::-webkit-details-marker]:hidden md:pr-0">
                      <span
                        aria-hidden="true"
                        className="w-7 shrink-0 font-display text-sm text-brand-orange"
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="flex-1 font-display text-lg transition-colors group-open:text-brand-yellow sm:text-xl">
                        {item.question}
                      </span>
                      <span className="grid h-9 w-9 shrink-0 place-items-center border-2 border-brand-white/30 text-brand-orange transition-colors group-hover:border-brand-yellow group-open:border-brand-yellow group-open:bg-brand-yellow group-open:text-brand-black">
                        <Icon name="plus" className="h-5 w-5 group-open:hidden" />
                        <Icon name="minus" className="hidden h-5 w-5 group-open:block" />
                      </span>
                    </summary>
                    <p className="ml-11 mt-4 max-w-xl pr-20 text-sm leading-relaxed text-brand-white/75 sm:text-base md:pr-0">
                      {item.answer}
                    </p>
                  </details>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>
      <Slant from="black" to="paper" />
    </>
  );
}
