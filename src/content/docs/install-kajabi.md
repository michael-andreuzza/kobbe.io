---
title: Install on Kajabi
description: Add the Kobbe tracker to Kajabi site-wide scripts.
order: 18
category: Installation guides
navLabel: Kajabi
brandLogo:
  url: ../../images/brands/kajabi.svg
  alt: Kajabi logo
---

Kajabi allows **site-wide tracking scripts** in Settings. Token: [Add the tracker](/docs/add-the-tracker).

## Tracker snippet

```html
<script
  defer
  data-token="YOUR_SITE_TOKEN"
  src="https://app.kobbe.io/tracker.js"
></script>
```

## Steps

1. Kajabi → **Settings → Site details** (or **Analytics / Scripts** depending on UI version).
2. Paste into **Header tracking code** / **Footer tracking code** — header is preferred.
3. Save.

## Verify

Load a public Kajabi page and check Kobbe.

## Next steps

- [Custom events](/docs/custom-events) for offers and buttons where Kajabi exposes custom code blocks
- [Revenue attribution](/docs/revenue-attribution) for separate payment flows
