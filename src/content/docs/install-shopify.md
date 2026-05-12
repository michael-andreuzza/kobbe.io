---
title: Install on Shopify
description: Add the Kobbe tracker to a Shopify Online Store theme.
order: 13
category: Installation guides
navLabel: Shopify
brandLogo:
  url: ../../images/brands/shopify.svg
  alt: Shopify logo
---

Shopify themes render **`theme.liquid`**. Add the snippet in the `<head>` (or before `</body>`) of your live theme’s layout. Token: [Add the tracker](/docs/add-the-tracker).

## Tracker snippet

```liquid
<script
  defer
  data-token="YOUR_SITE_TOKEN"
  src="https://app.kobbe.io/tracker.js"
></script>
```

## Steps

1. Admin → **Online Store → Themes → … → Edit code**.
2. Open `layout/theme.liquid`.
3. Paste before `</head>` (or use Theme App Extensions / custom liquid sections if you manage scripts there).

Duplicate the snippet only once — avoid loading it in both theme and a second app.

## Checkout and headless stores

Standard Kobbe scripts run on Storefront pages you edit in Liquid. Checkout domains and headless storefronts may need different injection points; keep the same token per Kobbe site where possible.

## Verify

Visit the storefront URL and check Kobbe.

## Next steps

- [Custom events](/docs/custom-events) for add-to-cart or purchase buttons
- [Revenue attribution](/docs/revenue-attribution) for payment webhooks
