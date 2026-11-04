"use client";

import { useState } from "react";
import Image from "next/image";
import type { SiteConfig } from "@/lib/site.schema";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";

export function Navbar({ config }: { config: SiteConfig }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 h-16 border-b-[3px] border-brand-yellow bg-brand-black pt-[env(safe-area-inset-top,0px)]">
      <nav aria-label="Primary" className="container-brand flex h-16 items-center justify-between">
        <a href="#home" className="flex items-center gap-2 shrink-0" onClick={() => setOpen(false)}>
          <Image src="/images/logo-mark.png" alt="" width={40} height={40} className="h-10 w-10" priority />
          <span className="font-display text-sm leading-none text-brand-white">
            MUSCLE MONSTER
            <br />
            <span className="border-t-2 border-brand-orange text-brand-orange">GYM</span>
          </span>
        </a>

        <div className="hidden xl:flex items-center gap-7">
          {config.navigation.links.map((link) => (
            <a key={link.href} href={link.href} className="font-display text-sm tracking-wide text-brand-white hover:text-brand-yellow">
              {link.label}
            </a>
          ))}
          <Button config={config} cta={config.navigation.cta} variant="yellow" className="max-xs:hidden text-sm px-4 py-2" />
        </div>

        <button
          type="button"
          className="xl:hidden inline-flex h-11 w-11 items-center justify-center border-[3px] border-brand-yellow text-brand-yellow"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <Icon name={open ? "close" : "menu"} className="h-6 w-6" />
        </button>
      </nav>

      {open && (
        <div id="mobile-nav" className="xl:hidden absolute inset-x-0 top-16 border-b-[3px] border-brand-yellow bg-brand-black">
          <div className="container-brand flex flex-col gap-1 py-4">
            {config.navigation.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-display text-lg tracking-wide text-brand-white py-2 hover:text-brand-yellow"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <Button config={config} cta={config.navigation.cta} variant="yellow" className="max-xs:hidden mt-2 w-full" />
          </div>
        </div>
      )}
    </header>
  );
}
