import Image from "next/image";
import type { SiteConfig } from "@/lib/site.schema";
import { Button } from "@/components/ui/Button";
import { Slant } from "@/components/ui/Slant";

export function CtaBand({ config }: { config: SiteConfig }) {
  const { cta } = config;

  return (
    <>
      <Slant from="paper" to="black" />
      <section aria-labelledby="cta-heading" className="relative overflow-hidden border-t-[6px] border-brand-yellow py-20 text-brand-white">
        <Image
          src={cta.backgroundImage.path}
          alt=""
          aria-hidden="true"
          fill
          sizes="100vw"
          className="absolute inset-0 -z-10 object-cover"
          style={{ objectPosition: "center 20%" }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10"
          style={{ background: "linear-gradient(90deg, rgba(0,0,0,.94) 0%, rgba(0,0,0,.82) 45%, rgba(0,0,0,.55) 100%)" }}
        />
        <div className="container-brand">
          <h2 id="cta-heading" className="font-display text-[clamp(2.4rem,7vw,4.8rem)] text-brand-yellow">
            {cta.title}
          </h2>
          <p className="mt-3 max-w-xl text-brand-white/90">{cta.text}</p>
          <Button config={config} cta={cta.button} variant="yellow" className="mt-7" />
        </div>
      </section>
    </>
  );
}
