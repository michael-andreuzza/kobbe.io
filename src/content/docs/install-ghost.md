---
title: Install on Ghost
description: Add the Kobbe tracker with Ghost code injection.
order: 15
category: Installation guides
navLabel: Ghost
brandLogo:
  url: ../../images/brands/ghost.png
  alt: Ghost logo
---

Ghost supports **Global header / footer** code injection per site. Token: [Add the tracker](/docs/add-the-tracker).

## Tracker snippet

```html
<script
  defer
  data-token="YOUR_SITE_TOKEN"
  src="https://app.kobbe.io/tracker.js"
></script>
```

## Steps

1. Ghost Admin → **Settings → Code injection**.
2. Paste into **Site header** (preferred).
3. Save.

## Verify

Open a published post, confirm traffic in Kobbe.

## Next steps

- [Custom events](/docs/custom-events) if you add buttons or CTAs outside default templates
- [Revenue attribution](/docs/revenue-attribution) if you sell through a gateway Ghost links to
