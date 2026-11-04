"use client";

import { useRef, useState } from "react";
import type { GalleryItem } from "@/lib/site.schema";
import { VideoTile } from "@/components/gallery/VideoTile";
import { Lightbox } from "@/components/gallery/Lightbox";

export function GalleryGrid({
  items,
  ctaTile,
  directionsHref,
}: {
  items: GalleryItem[];
  ctaTile: { title: string; addressText: string; buttonLabel: string };
  directionsHref: string;
}) {
  const featured = items.find((item) => item.featured) ?? items[0];
  const rest = items.filter((item) => item.id !== featured.id);

  const [active, setActive] = useState<GalleryItem | null>(null);
  const triggerRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const lastTrigger = useRef<HTMLElement | null>(null);

  function openItem(item: GalleryItem, el: HTMLElement | null) {
    lastTrigger.current = el;
    setActive(item);
  }

  return (
    <div>
      <div className="mb-6">
        <TileWrapper onCapture={(el) => (triggerRefs.current[featured.id] = el)}>
          <VideoTile item={featured} featured onOpen={() => openItem(featured, triggerRefs.current[featured.id])} />
        </TileWrapper>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {rest.map((item, i) => (
          <TileWrapper key={item.id} onCapture={(el) => (triggerRefs.current[item.id] = el)}>
            <VideoTile item={item} accent={i % 2 === 0 ? "orange" : "red"} onOpen={() => openItem(item, triggerRefs.current[item.id])} />
          </TileWrapper>
        ))}

        <a
          href={directionsHref}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center gap-3 bg-brand-black p-6 text-center text-brand-white"
          style={{ aspectRatio: "3 / 4" }}
        >
          <span className="font-display text-xl text-brand-yellow">{ctaTile.title}</span>
          <span className="text-sm text-brand-white/80">{ctaTile.addressText}</span>
          <span className="btn btn-yellow mt-2">{ctaTile.buttonLabel}</span>
        </a>
      </div>

      <Lightbox item={active} onClose={() => setActive(null)} returnFocusRef={lastTrigger} />
    </div>
  );
}

/** Captures the rendered tile's trigger `<button>` so focus can return to it when the lightbox closes. */
function TileWrapper({ children, onCapture }: { children: React.ReactNode; onCapture: (el: HTMLButtonElement | null) => void }) {
  return (
    <div
      ref={(div) => {
        const button = div?.querySelector("button") ?? null;
        onCapture(button);
      }}
    >
      {children}
    </div>
  );
}
