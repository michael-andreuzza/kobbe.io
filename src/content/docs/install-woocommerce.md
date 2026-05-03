---
title: Install on WooCommerce
description: Add the Kobbe tracker to WordPress when running WooCommerce.
order: 14
category: Installation guides
navLabel: WooCommerce
---

WooCommerce runs on WordPress — use the same global snippet as [WordPress](/docs/install-wordpress). Token: [Add the tracker](/docs/add-the-tracker).

## Tracker snippet

```html
<script
  defer
  data-token="YOUR_SITE_TOKEN"
  src="https://app.kobbe.io/tracker.js"
></script>
```

## Steps

1. Add the snippet to your child theme `header.php` or a header-script plugin so it runs on **shop, product, cart, and checkout pages**.
2. Avoid loading twice (some plugins inject analytics globally).

## Purchase measurement

Pageviews cover catalog browsing. Track important milestones with [Custom events](/docs/custom-events) and connect payments through [Revenue attribution](/docs/revenue-attribution) when applicable.

## Verify

Browse a product and cart; confirm events in Kobbe as you define them.

## Next steps

- [WordPress](/docs/install-wordpress)
- [Exclude visits](/docs/exclude-visits) for staging or admin
