---
title: Install on Bubble
description: Add the Kobbe tracker to Bubble apps through SEO, metatag, or script settings.
order: 16
category: Installation guides
navLabel: Bubble
brandLogo:
  url: ../../images/brands/buble.svg
  alt: Bubble logo
---

Bubble runs as a single-page app. Use **Settings → SEO / metatags** or the dedicated **Script/meta tags** area your plan exposes. Token: [Add the tracker](/docs/add-the-tracker).

## Tracker snippet

```html
<script
  defer
  data-token="YOUR_SITE_TOKEN"
  src="https://app.kobbe.io/tracker.js"
></script>
```

## Steps

1. Bubble Editor → **Settings** tab.
2. Find **SEO / metatags** → **Script in header** (or equivalent).
3. Paste the snippet.
4. Deploy a new version.

Some Bubble tiers limit header scripts; upgrade if the field is unavailable.

## SPA navigations

If only the initial load fires a pageview, add lightweight custom flows with [Custom events](/docs/custom-events) for navigation or important workflows.

## Verify

Open the live app URL and check Kobbe.

## Next steps

- [Script options](/docs/script-options)
- [Custom events](/docs/custom-events)
