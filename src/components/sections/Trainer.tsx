import Image from "next/image";
import type { SiteConfig } from "@/lib/site.schema";
import { Button } from "@/components/ui/Button";
import { BrushStrip } from "@/components/ui/BrushStrip";
import { Reveal } from "@/components/ui/Reveal";
import { Slant } from "@/components/ui/Slant";

export function Trainer({ config }: { config: SiteConfig }) {
  const { trainer } = config;

  return (
    <>
      <Slant from="paper" to="black" />
      <section id="trainer" aria-labelledby="trainer-heading" className="bg-brand-black py-16 text-brand-white">
        <div className="container-brand">
          <Reveal className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div className="mx-auto w-full max-w-sm">
              <div
                className="shadow-hard-yellow-lg -rotate-[1.8deg] border-4 border-brand-white"
                style={{ aspectRatio: "4 / 5" }}
              >
                <Image
                  src={trainer.image.path}
                  alt={trainer.image.alt}
                  width={trainer.image.width}
                  height={trainer.image.height}
                  sizes="(min-width: 860px) 384px, 80vw"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            <div>
              <h2 id="trainer-heading" className="font-display text-[clamp(2.4rem,7vw,4.8rem)] text-brand-yellow">
                Meet {trainer.name}
              </h2>
              <BrushStrip color="red" rotate={-1} className="mt-4 text-sm">
                {trainer.role}
              </BrushStrip>

              <div className="mt-6 space-y-4 text-brand-white/90">
                {trainer.bio.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>

              <ul className="mt-6 flex flex-wrap gap-3">
                {trainer.chips.map((chip) => (
                  <li key={chip} className="rounded-full border-2 border-brand-yellow px-4 py-1 text-sm text-brand-yellow">
                    {chip}
                  </li>
                ))}
              </ul>

              <Button config={config} cta={trainer.cta} variant="yellow" className="mt-8" />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
