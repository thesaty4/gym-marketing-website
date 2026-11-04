import Image from "next/image";
import type { SiteConfig } from "@/lib/site.schema";
import { Button } from "@/components/ui/Button";
import { BrushStrip } from "@/components/ui/BrushStrip";
import { Icon } from "@/components/ui/Icon";

export function Hero({ config }: { config: SiteConfig }) {
  const { hero, business } = config;

  return (
    <section id="home" aria-labelledby="hero-heading" className="hero-screen relative flex items-center overflow-hidden bg-brand-black py-6 xl:py-10">
        {/* Decorative ghost dumbbell */}
        <svg
          aria-hidden="true"
          viewBox="0 0 200 100"
          className="pointer-events-none absolute -right-10 top-10 h-[340px] w-[680px] -rotate-12 text-brand-yellow opacity-[0.11]"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
        >
          <path d="M20 50h160M20 50a10 10 0 1 1 0 .1M180 50a10 10 0 1 1 0 .1" />
          <rect x="5" y="30" width="22" height="40" rx="6" />
          <rect x="173" y="30" width="22" height="40" rx="6" />
        </svg>

        <div className="container-brand relative grid gap-5 xl:grid-cols-[1.1fr_.9fr] xl:items-end xl:gap-10">
          <div className="xl:pb-14">
            <BrushStrip color="yellow" rotate={-2.5} className="text-sm font-display">
              {hero.tagChip}
            </BrushStrip>

            <h1 id="hero-heading" className="hero-heading mt-4 font-display text-brand-yellow xl:mt-6">
              {hero.headlineLines.map((line) => (
                <span key={line} data-animate="true" className="hero-line">
                  {line}
                </span>
              ))}
            </h1>

            <p className="mt-4 max-w-xl text-lg text-brand-white/90 xl:mt-6">
              {hero.subheadlinePrefix} <span className="text-brand-yellow">{hero.subheadlineAccent}</span>
            </p>

            <div className="mt-4 flex flex-wrap gap-3 xl:mt-8 xl:gap-4">
              <Button config={config} cta={hero.ctaPrimary} variant="yellow" className="text-sm xl:text-lg" />
              <Button config={config} cta={hero.ctaSecondary} variant="outline-white" className="text-sm xl:text-lg" />
            </div>

            <a
              href={business.googleMapsSearchUrl || "#contact"}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-brand-white px-4 py-2 text-sm font-semibold text-brand-black xl:mt-8"
            >
              <Icon name="pin" className="h-4 w-4 text-brand-red" />
              {hero.locationBadge.label}
            </a>
          </div>

          <div
            className="hero-visual relative mx-auto max-w-full"
            style={{ aspectRatio: `${hero.heroImage.width} / ${hero.heroImage.height}` }}
          >
            <div
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 bg-brand-yellow"
              style={{ top: "17%", clipPath: "polygon(34% 0,100% 0,100% 100%,22% 100%)" }}
            />
            <div
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 bg-brand-orange"
              style={{ top: "17%", clipPath: "polygon(27% 0,31% 0,19% 100%,15% 100%)" }}
            />
            <Image
              src={hero.heroImage.path}
              alt={hero.heroImage.alt}
              width={hero.heroImage.width}
              height={hero.heroImage.height}
              priority
              fetchPriority="high"
              sizes="(min-width: 900px) 560px, 200px"
              className="relative h-full w-full origin-bottom scale-110 object-contain object-bottom xl:scale-115"
              style={{ filter: "drop-shadow(0 8px 22px rgba(0,0,0,.4))" }}
            />
            <div className="absolute bottom-[14%] left-[-8%] max-xl:left-2">
              <BrushStrip color="black" rotate={-5} className="border-[3px] border-brand-yellow px-3 py-2 text-center xl:px-6 xl:py-4">
                <div className="font-display text-3xl leading-none text-brand-yellow xl:text-[3.4rem]">{hero.priceSticker.amount}</div>
                <div className="mt-1 font-display text-xs text-brand-white">{hero.priceSticker.label}</div>
              </BrushStrip>
            </div>
          </div>
        </div>
      </section>
  );
}
