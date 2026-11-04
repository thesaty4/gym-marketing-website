import { getSiteConfig } from "@/lib/getSiteConfig";
import { Hero } from "@/components/sections/Hero";
import { Pricing } from "@/components/sections/Pricing";
import { Why } from "@/components/sections/Why";
import { Trainer } from "@/components/sections/Trainer";
import { Gallery } from "@/components/sections/Gallery";
import { Faq } from "@/components/sections/Faq";
import { Contact } from "@/components/sections/Contact";
import { CtaBand } from "@/components/sections/CtaBand";

export const revalidate = 3600;

export default async function HomePage() {
  const config = await getSiteConfig();

  return (
    <>
      <Hero config={config} />
      <Pricing config={config} />
      <Why config={config} />
      <Trainer config={config} />
      <Gallery config={config} />
      <Faq config={config} />
      <Contact config={config} />
      <CtaBand config={config} />
    </>
  );
}
