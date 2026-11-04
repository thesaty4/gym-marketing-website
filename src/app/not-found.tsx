import Link from "next/link";
import { getSiteConfig } from "@/lib/getSiteConfig";

export default async function NotFound() {
  const config = await getSiteConfig();

  return (
    <div className="dot-texture flex min-h-[70vh] flex-col items-center justify-center bg-brand-yellow px-6 py-20 text-center text-brand-black">
      <p className="font-display text-sm tracking-wide">404</p>
      <h1 className="mt-2 font-display text-[clamp(2.4rem,8vw,4.8rem)]">Page not found</h1>
      <p className="mt-4 max-w-md text-brand-black/80">
        That page doesn&apos;t exist. Head back to {config.site.name} and find what you were looking for.
      </p>
      <Link href="/" className="btn btn-black mt-8">
        Back to home
      </Link>
    </div>
  );
}
