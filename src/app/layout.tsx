import type { Metadata, Viewport } from "next";
import { Anton, Barlow } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { getSiteConfig } from "@/lib/getSiteConfig";
import { buildMetadata } from "@/lib/metadata";
import { buildJsonLd } from "@/lib/jsonld";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { FloatingActions } from "@/components/ui/FloatingActions";

const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-anton",
  display: "swap",
  adjustFontFallback: true,
});

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  variable: "--font-barlow",
  display: "swap",
  adjustFontFallback: true,
});

export async function generateMetadata(): Promise<Metadata> {
  const config = await getSiteConfig();
  return buildMetadata(config);
}

export async function generateViewport(): Promise<Viewport> {
  const config = await getSiteConfig();
  return {
    width: "device-width",
    initialScale: 1,
    viewportFit: "cover",
    themeColor: config.site.themeColor,
  };
}

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const config = await getSiteConfig();
  const jsonLd = buildJsonLd(config);

  return (
    <html lang={config.site.language} className={`${anton.variable} ${barlow.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Navbar config={config} />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer config={config} />
        <FloatingActions config={config} />

        {config.site.analytics.ga4Id && (
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${config.site.analytics.ga4Id}`}
            strategy="afterInteractive"
          />
        )}
        {config.site.analytics.ga4Id && (
          <Script id="ga4-init" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${config.site.analytics.ga4Id}');`}
          </Script>
        )}
        {config.site.analytics.plausibleDomain && (
          <Script
            defer
            data-domain={config.site.analytics.plausibleDomain}
            src="https://plausible.io/js/script.js"
            strategy="afterInteractive"
          />
        )}

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
