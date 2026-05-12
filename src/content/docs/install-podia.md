---
title: Install on Podia
description: Add the Kobbe tracker to Podia site or product pages.
order: 17
category: Installation guides
navLabel: Podia
brandLogo:
  url: ../../images/brands/podia.svg
  alt: Podia logo
---

Podia exposes **custom JavaScript** in site settings for sales pages and storefronts (availability depends on plan). Token: [Add the tracker](/docs/add-the-tracker).

## Tracker snippet

```html
<script
  defer
  data-token="YOUR_SITE_TOKEN"
  src="https://app.kobbe.io/tracker.js"
></script>
```

## Steps

1. Podia admin → **Site → Code / analytics** or **Settings → Third-party snippets** (check current UI labels).
2. Paste the snippet into the global head or footer field Podia provides.
3. Save and publish.

## Verify

Visit your public Podia site and confirm Kobbe.

## Next steps

- [Revenue attribution](/docs/revenue-attribution) if you connect payment webhooks separately
- [Custom events](/docs/custom-events) for limited on-page interactions
