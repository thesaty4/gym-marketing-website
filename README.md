# Muscle Monster Gym — website

A production-ready, SEO-first, fully responsive single-page marketing site
for Muscle Monster Gym (Banjariya Road, Khalilabad, Uttar Pradesh), built
with Next.js App Router and TypeScript. All visible content — copy, prices,
photos, videos, FAQ, contact details — is driven by one file,
[`src/data/site.json`](./src/data/site.json); see
[`docs/CONFIG.md`](./docs/CONFIG.md) for how to edit it.

## Requirements

- Node.js 20+ and npm

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command           | What it does                                      |
| ----------------- | -------------------------------------------------- |
| `npm run dev`     | Start the local dev server with hot reload         |
| `npm run build`   | Type-check, lint-aware production build (Turbopack)|
| `npm run start`   | Serve the production build locally                 |
| `npm run lint`    | Run ESLint                                          |

## Editing content

Everything on the page — the gym name, prices, phone number, hours, photos,
gallery videos and FAQ — comes from
[`src/data/site.json`](./src/data/site.json), validated at build time
against [`src/lib/site.schema.ts`](./src/lib/site.schema.ts). See
[`docs/CONFIG.md`](./docs/CONFIG.md) for a plain-language guide, and
[`docs/SEO.md`](./docs/SEO.md) for the local-SEO steps that have to happen
outside this repo (Google Business Profile, Search Console, etc.).

The hero keeps its left-aligned copy and fills the first viewport below the navigation.
Its heading and image scale with the screen size; on unusually short screens
or with enlarged text, the section can grow to keep all content accessible.

## Environment variables

| Variable                | Required | Purpose                                                                 |
| ------------------------ | -------- | ------------------------------------------------------------------------ |
| `NEXT_PUBLIC_SITE_URL`   | No       | Overrides `site.url` from `site.json` for absolute URLs (useful for preview deployments where the production domain in `site.json` doesn't apply yet). |
| `SITE_CONFIG_API_URL`    | No       | Only used if you switch `src/lib/getSiteConfig.ts` from the local JSON file to a remote API — see the commented example in that file. |

No other environment variables are required; analytics (GA4/Plausible) and
search-engine verification are configured entirely through
`site.json` and simply don't render anything until you fill them in.

## Project structure

```
src/
  app/            Routes: layout, home page, sitemap, robots, manifest, 404, /api/inquiry
  components/
    sections/     One component per page section (Hero, Pricing, Why, Trainer, Gallery, Faq, Contact, CtaBand)
    ui/           Shared building blocks (Navbar, Footer, Button, BrushStrip, Slant, Icon, Reveal, FloatingActions)
    gallery/      Video tile + lightbox
    contact/      Inquiry form + map embed facade
  lib/            Config loading/validation, JSON-LD, metadata, link helpers
  data/           site.json (all content)
docs/             CONFIG.md, SEO.md
```

## Deployment

The home page is statically generated at build time and revalidated hourly
(`export const revalidate = 3600` in `src/app/page.tsx`), so content changes
in `site.json` go live within an hour without a full rebuild — or
immediately after a redeploy.

### Vercel

1. Push this repository to GitHub/GitLab/Bitbucket.
2. Import it in [Vercel](https://vercel.com/new).
3. Set `NEXT_PUBLIC_SITE_URL` to your production domain (optional — it
   falls back to `site.url` in `site.json`).
4. Deploy. No other configuration is required.

### Self-hosted / any Node host

```bash
npm run build
npm run start
```

Serves the optimized production build on port 3000 (override with
`next start -p <port>`).

## Before going live

Run through the checklist in [`docs/SEO.md`](./docs/SEO.md) and confirm in
`site.json`:

- `site.url` is set to the real production domain (not the `example.com`
  placeholder).
- `business.phone`, `business.email` and `business.hours` are filled in.
- Real photos replace the placeholder images in `public/images/`, and real
  gym-floor clips replace the placeholder videos in `public/videos/`.
