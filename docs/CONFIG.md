# Editing the website content — `src/data/site.json`

Everything on the Muscle Monster Gym website — every word, phone number,
price, photo and video — comes from one file: **`src/data/site.json`**. You
don't need to touch any code to update the site. Edit the JSON file, save
it, and rebuild/redeploy the site; the change will show up everywhere it's
used (including the page's SEO data).

This file is validated against a schema (`src/lib/site.schema.ts`) every
time the site builds. If you make a typo that breaks the structure (for
example, deleting a `{` or `}`), the build will fail with an error message
telling you what's wrong — this is intentional, so a bad edit can't go live
by accident.

A few ground rules:

- Keep the quotes around text values: `"like this"`.
- If a value doesn't apply yet (e.g. you don't have a phone number yet),
  leave it as an empty string `""` rather than deleting the field.
- Don't rename the keys (the text before each `:`) — only change the values
  after them.
- Rupee amounts are written as plain text with the symbol, e.g. `"₹600"`.

## Common changes

### Phone number / WhatsApp

Edit `business.phone`:

```json
"phone": {
  "display": "+91 98765 43210",
  "e164": "+919876543210"
}
```

- `display` is what visitors see on the page.
- `e164` is used to build `tel:` and WhatsApp links — it must start with `+`
  and your country code, with no spaces or dashes.
- Until these are filled in, every "Call" and "WhatsApp" button on the site
  automatically falls back to scrolling to the contact section instead of
  showing a broken link.

### Email

Edit `business.email` (leave as `""` to hide it).

### Gym timings

Edit `business.hours`:

```json
"hours": {
  "fallbackText": "Timings coming soon — call the gym to confirm.",
  "rows": [
    { "day": "Monday – Saturday", "opens": "06:00", "closes": "21:00" },
    { "day": "Sunday", "opens": "07:00", "closes": "12:00" }
  ]
}
```

If `rows` is empty (`[]`), the site shows `fallbackText` instead.

### Prices

Edit `pricing.items` (the two price strips) and `pricing.firstMonthCard`
(the combined first-payment card), plus `hero.priceSticker` (the price shown
on the hero photo). The same numbers also appear in `faq.items` as plain
text — update those too if a price changes, since they aren't generated
automatically.

### Address / map links

Edit `business.address` and `business.googleMapsSearchUrl`. Once you have a
Google Maps "Share → Embed a map" link, paste the `src="..."` URL into
`business.googleMapsEmbedUrl` to enable the click-to-load map on the contact
section.

### Social links

Edit `business.social` (`instagram`, `facebook`, `youtube`, `justdial`).
Any left as `""` are automatically hidden from the footer — you don't need
to delete the icon yourself.

### Photos

Replace the image files in `public/images/` (keeping the same file names),
or add new files and point to them from `site.json`. Every image entry
looks like this:

```json
{ "path": "/images/tahir-owner.jpg", "width": 1125, "height": 1500, "alt": "..." }
```

- `path` must start with `/` and match a real file in `public/`.
- `width`/`height` must match the actual pixel dimensions of the image file
  (check with any image viewer) — this prevents the page from jumping
  around as images load.
- `alt` is read aloud by screen readers and used by Google Images — always
  describe what's actually in the photo.

### Adding/removing a gallery video

The gallery section reads from `gallery.items`, an array of video clips.
To add a new one:

1. Add the compressed `.mp4` file to `public/videos/` and a small preview
   image (poster) to `public/images/posters/`.
2. Add a new entry to `gallery.items`:

   ```json
   {
     "id": "new-clip",
     "title": "New clip title",
     "description": "One sentence describing what's in the clip.",
     "featured": false,
     "video": "/videos/new-clip.mp4",
     "poster": "/images/posters/new-clip.jpg",
     "width": 720,
     "height": 960,
     "size": 123456,
     "duration": 6,
     "uploadDate": "2026-01-01"
   }
   ```

   - Exactly one item should have `"featured": true` — it becomes the big
     video at the top of the gallery; all others appear in the grid.
   - `size` is the file size in bytes (right-click the file → Properties,
     or run `ls -la` on it).
   - `duration` is the clip length in whole seconds.

3. To remove a clip, delete its entry from the array (and optionally delete
   the files from `public/`).

### FAQ

Edit `faq.items` — each entry is a `question`/`answer` pair. Set
`faq.enabled` to `false` to hide the whole section (it will also stop being
included in the page's FAQ rich-result data for Google).

### Navigation labels and links

Edit `navigation.links` (the menu bar) and `footer.quickLinks` (the footer
menu) — each is a list of `{ "label": "...", "href": "#section-id" }`.

### Analytics and search engine verification

Edit `site.analytics` (`ga4Id` for Google Analytics 4, `plausibleDomain` for
Plausible) and `site.verification` (`google`, `bing`) — leave blank until
you have real values; nothing related loads or renders until they're set.

## Switching from the local JSON file to an API

Today the site reads `src/data/site.json` directly, at build time. If you
later want a non-developer to edit content through a CMS or admin panel
instead of editing this file, swap the implementation in
`src/lib/getSiteConfig.ts` — the commented-out code block right there shows
exactly how to fetch from `SITE_CONFIG_API_URL` instead, validated against
the same schema. No component anywhere in the site needs to change because
every component only ever reads from the validated `SiteConfig` object, not
from the JSON file directly.
