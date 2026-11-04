"use client";

import { useEffect, useRef } from "react";
import type { GalleryItem } from "@/lib/site.schema";
import { Icon } from "@/components/ui/Icon";

/**
 * Native `<dialog>` lightbox. Pauses and clears the `src` on close so the
 * clip stops downloading/playing, and returns focus to the tile that opened
 * it. Closes on the X button, a backdrop click and Escape (handled natively
 * by `<dialog>`'s `cancel` event).
 */
export function Lightbox({
  item,
  onClose,
  returnFocusRef,
}: {
  item: GalleryItem | null;
  onClose: () => void;
  returnFocusRef: React.RefObject<HTMLElement | null>;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (item && !dialog.open) {
      dialog.showModal();
    } else if (!item && dialog.open) {
      dialog.close();
    }
  }, [item]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const handleClose = () => {
      const video = videoRef.current;
      if (video) {
        video.pause();
        video.removeAttribute("src");
        video.load();
      }
      onClose();
      returnFocusRef.current?.focus();
    };
    dialog.addEventListener("close", handleClose);
    return () => dialog.removeEventListener("close", handleClose);
  }, [onClose, returnFocusRef]);

  return (
    <dialog
      ref={dialogRef}
      onClick={(e) => {
        if (e.target === dialogRef.current) dialogRef.current?.close();
      }}
      aria-label={item?.title}
      className={`m-auto border-0 bg-transparent p-0 backdrop:bg-black/85 ${item?.featured ? "w-[min(96vw,1100px)]" : "w-[min(92vw,520px)]"}`}
    >
      {item && (
        <div className="relative">
          <button
            type="button"
            onClick={() => dialogRef.current?.close()}
            aria-label="Close"
            className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 border-brand-white bg-brand-black/60 text-brand-white"
          >
            <Icon name="close" className="h-5 w-5" />
          </button>
          <video
            ref={videoRef}
            key={item.id}
            src={item.video}
            poster={item.poster}
            controls
            autoPlay
            loop
            playsInline
            className="max-h-[80vh] w-full"
          />
          <p className="mt-2 font-display text-sm text-brand-white">{item.title}</p>
        </div>
      )}
    </dialog>
  );
}
