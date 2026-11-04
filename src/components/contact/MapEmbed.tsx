"use client";

import { useState } from "react";

/** Click-to-load map facade: avoids loading the embed iframe until requested, to protect CWV. */
export function MapEmbed({ embedUrl, title }: { embedUrl: string; title: string }) {
  const [loaded, setLoaded] = useState(false);

  if (loaded) {
    return (
      <iframe
        src={embedUrl}
        title={title}
        loading="lazy"
        className="h-72 w-full border-[3px] border-brand-black"
        referrerPolicy="no-referrer-when-downgrade"
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setLoaded(true)}
      className="btn btn-black h-72 w-full justify-center"
    >
      Load map
    </button>
  );
}
