# SEO — what's automated vs. what you still need to do

The site itself takes care of the technical SEO: metadata, structured data
(JSON-LD), the sitemap, robots rules, and semantic HTML. None of that
requires any action from you beyond keeping `src/data/site.json` accurate
(see [`CONFIG.md`](./CONFIG.md)).

The items below **can't be done in code** — they're steps you (the gym
owner, or whoever manages the business listings) need to complete outside
this repository for the site to actually rank well and show up correctly in
Google/Bing search and Maps.

## 1. Claim and verify your Google Business Profile (GBP)

This is the single most important step for local search — it's what powers
the map, hours, reviews and "Directions" button that shows up when someone
searches "Muscle Monster Gym" or "gym near me" on Google.

1. Go to [google.com/business](https://www.google.com/business/) and create
   or claim the listing for Muscle Monster Gym.
2. Set the category to **Gym** (add "Personal Trainer" as an additional
   category if relevant).
3. Fill in the exact address, phone number and hours — these must match
   `site.json` exactly (see "Keep your NAP consistent" below).
4. Upload real photos of the gym, equipment and Tahir.
5. Add this website's URL to the profile.
6. Once verified, copy the profile's public URL into
   `business.googleBusinessProfileUrl` in `site.json`.
7. From Google Maps, use "Share → Embed a map" to get an embed link, and
   paste it into `business.googleMapsEmbedUrl` to enable the on-page map.

## 2. Verify the site in Search Console and Bing Webmaster Tools

- **Google Search Console**: [search.google.com/search-console](https://search.google.com/search-console).
  Add the property, verify ownership (the HTML tag method pairs with
  `site.verification.google` in `site.json`), then submit
  `https://<your-domain>/sitemap.xml` under Sitemaps.
- **Bing Webmaster Tools**: [www.bing.com/webmasters](https://www.bing.com/webmasters).
  Same process — verify with `site.verification.bing`, then submit the
  sitemap.

Once you have real verification tokens, paste them into `site.json` and
redeploy; the `<meta>` tags are generated automatically from those values
and omitted entirely while they're blank.

## 3. Keep your NAP (Name, Address, Phone) identical everywhere

Search engines cross-check your business details across the web. Make sure
the **exact same** name, address and phone number appear, character for
character, on:

- This website (`business.*` in `site.json`)
- Google Business Profile
- Instagram / Facebook bio
- JustDial and any other local directory listing

Inconsistent NAP data (e.g. "Banjariya Rd" in one place and "Banjariya Road"
in another) is one of the most common reasons local businesses rank worse
than they should.

## 4. Collect real reviews

Ask members to leave a Google review after a good session. Once you have a
meaningful number of genuine reviews, consider adding a `reviews` section to
the site with real `aggregateRating` data — **only ever use real review
data**; fabricated ratings violate Google's structured data guidelines and
can get the listing penalized.

## 5. Re-test after every deploy

After each time you redeploy the site (especially after changing
`site.json` or images), re-run these free tools against the live URL:

- [Rich Results Test](https://search.google.com/test/rich-results) — checks
  the `LocalBusiness`/`ExerciseGym`, `VideoObject` and `FAQPage` structured
  data renders without errors.
- [PageSpeed Insights](https://pagespeed.web.dev/) — checks Core Web Vitals
  and the Lighthouse Performance/Accessibility/SEO scores.
- [Mobile-Friendly Test](https://search.google.com/test/mobile-friendly) —
  confirms the page works well on phones (most searches for local gyms
  happen on mobile).
