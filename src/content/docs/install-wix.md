---
title: Install on Wix
description: Add the Kobbe tracker to a Wix site with custom code.
order: 19
category: Installation guides
navLabel: Wix
brandLogo:
  url: ../../images/brands/wix.svg
  alt: Wix logo
---

Wix can inject global scripts from **Settings → Custom code** (requires a plan that supports it). Token: [Add the tracker](/docs/add-the-tracker).

## Tracker snippet

```html
<script
  defer
  data-token="YOUR_SITE_TOKEN"
  src="https://app.kobbe.io/tracker.js"
></script>
```

## Steps

1. Wix Editor → **Settings → Custom code** (or **Tracking & Analytics**).
2. Add custom code → place in **Head** on **All pages**.
3. Apply and publish.

Free tiers may block custom head code — use a Premium plan or Wix’s approved analytics integrations workaround per their docs.

## Verify

Open the live site and confirm Kobbe.

## Next steps

- [Script options](/docs/script-options)
- [Custom events](/docs/custom-events)
