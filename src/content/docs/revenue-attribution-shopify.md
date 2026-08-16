---
title: Shopify revenue attribution
description: Attribute Shopify order revenue to Kobbe journeys.
order: 46
category: Revenue attribution
navLabel: Shopify
brandLogo:
  url: ../../images/brands/shopify.svg
  alt: Shopify logo
---

Use Shopify when you sell through a Shopify Online Store and want to connect orders back to Kobbe traffic.

Kobbe listens for **orders/paid** webhooks and reads `kobbe_attribution_id` from order note attributes.

## Setup

1. Enable **Shopify** in **Site settings → Integrations → Revenue attribution**.
2. Copy the Kobbe webhook URL.
3. In Shopify Admin, create a custom app or notification webhook.
4. Subscribe to **Order payment** (`orders/paid`).
5. Copy Shopify's webhook signing secret into Kobbe.

## Tracker and cart attributes

Load the full tracker with revenue attribution and automatic Shopify cart sync:

```html
<script
  defer
  data-token="YOUR_SITE_TOKEN"
  data-revenue-attribution="true"
  data-shopify-cart-attribute="true"
  src="https://app.kobbe.io/tracker.full.js"
></script>
```

When `data-shopify-cart-attribute="true"` is set, Kobbe writes `kobbe_attribution_id` to the cart via `/cart/update.js` on each page load.

You can also set the attribute manually before checkout:

```js
const attributionId =
  window.kobbe?.getAttributionId?.() ?? window.kobbe?.attributionId;

if (!attributionId) return;

const body = new FormData();
body.append("attributes[kobbe_attribution_id]", attributionId);

fetch(window.Shopify.routes.root + "cart/update.js", {
  method: "POST",
  body,
});
```

## Limitations

Cart attributes work reliably on the standard **Add to cart → Checkout** flow.

**Buy It Now**, **Shop Pay**, and other accelerated checkout buttons may not carry cart attributes through to the order. If most of your sales use accelerated checkout, attribution coverage will be incomplete until you add a Checkout UI extension or line-item property workaround.

## Webhook

Shopify signs webhooks with **X-Shopify-Hmac-Sha256**. Kobbe verifies the HMAC of the raw request body using your saved signing secret.

The paid order payload should include `note_attributes` with `kobbe_attribution_id` when the cart attribute was set before checkout.
