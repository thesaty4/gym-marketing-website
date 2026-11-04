import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  compress: true,
  poweredByHeader: false,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async headers() {
    const securityHeaders = [
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      { key: "X-Frame-Options", value: "SAMEORIGIN" },
      { key: "Content-Security-Policy", value: "frame-ancestors 'self'" },
      { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
    ];
    const immutableCache = [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }];

    return [
      { source: "/:path*", headers: securityHeaders },
      { source: "/videos/:path*", headers: immutableCache },
      { source: "/images/:path*", headers: immutableCache },
      { source: "/icons/:path*", headers: immutableCache },
    ];
  },
};

export default nextConfig;
