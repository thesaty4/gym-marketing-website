import type { SiteConfig } from "@/lib/site.schema";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { Slant } from "@/components/ui/Slant";

export function Gallery({ config }: { config: SiteConfig }) {
  const { gallery, business } = config;

  return (
    <>
      <Slant from="black" to="yellow" />
      <section id="gallery" aria-labelledby="gallery-heading" className="dot-texture bg-brand-yellow py-16">
        <div className="container-brand">
          <h2 id="gallery-heading" className="font-display text-[clamp(2.4rem,7vw,4.8rem)] text-brand-black">
            {gallery.title}
          </h2>
          <p className="mt-2 max-w-xl text-brand-black/80">{gallery.lead}</p>

          <div className="mt-10">
            <GalleryGrid items={gallery.items} ctaTile={gallery.ctaTile} directionsHref={business.googleMapsSearchUrl || "#contact"} />
          </div>
        </div>
      </section>
    </>
  );
}
