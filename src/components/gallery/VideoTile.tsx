"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { GalleryItem } from "@/lib/site.schema";
import { Icon } from "@/components/ui/Icon";

/**
 * A single gallery tile. The video element is decorative (`aria-hidden`) and
 * only gets a `src` once it nears the viewport; the surrounding `<button>`
 * carries the accessible name via its caption. Opening the lightbox is
 * delegated to the parent via `onOpen` so only one `<dialog>` exists.
 */
export function VideoTile({
  item,
  featured,
  accent,
  onOpen,
}: {
  item: GalleryItem;
  featured?: boolean;
  accent?: "orange" | "red";
  onOpen: () => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const video = videoRef.current;
    if (!container || !video) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    if (reduceMotion || saveData) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setArmed(true);
          }
          if (entry.intersectionRatio >= 0.45) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        }
      },
      { rootMargin: "250px 0px", threshold: [0, 0.45] }
    );
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  const borderClass = accent === "red" ? "border-b-[6px] border-brand-red" : "border-b-[6px] border-brand-orange";

  return (
    <div ref={containerRef} className={`group relative overflow-hidden bg-brand-black ${borderClass}`} style={{ aspectRatio: featured ? "16 / 9" : "3 / 4" }}>
      <button
        type="button"
        onClick={onOpen}
        className="absolute inset-0 h-full w-full text-left"
        aria-label={item.title}
      >
        <video
          ref={videoRef}
          aria-hidden="true"
          muted
          loop
          playsInline
          preload="none"
          poster={item.poster}
          src={armed ? item.video : undefined}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.06]"
        />
        {!armed && (
          <Image
            src={item.poster}
            alt=""
            aria-hidden="true"
            fill
            sizes={featured ? "100vw" : "(min-width: 860px) 25vw, 50vw"}
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent p-4">
          <span className="font-display text-sm text-brand-white">{item.title}</span>
        </div>
        <span className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-brand-black/70 text-brand-white">
          <Icon name="expand" className="h-4 w-4" />
        </span>
      </button>
    </div>
  );
}
