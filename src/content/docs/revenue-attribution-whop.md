---
title: Whop revenue attribution
description: Attribute Whop checkout and membership revenue to Kobbe journeys.
order: 43
category: Revenue attribution
navLabel: Whop
brandLogo:
  url: ../../images/brands/whop.svg
  alt: Whop logo
---

Use Whop when you sell memberships, digital products, or checkout links through Whop.

## Setup

1. Enable **Whop** in **Site settings → Integrations → Revenue attribution**.
2. Copy the Kobbe webhook URL.
3. Create a webhook in the Whop Developer dashboard.
4. Subscribe to **payment.succeeded**.
5. Copy Whop's webhook signing secret into Kobbe.
6. Pass `kobbe_attribution_id` in checkout configuration metadata.

## Tracker

Enable revenue attribution on pages that send visitors into Whop checkout:

```html
<script
  defer
  data-token="YOUR_SITE_TOKEN"
  data-revenue-attribution="true"
  src="https://app.kobbe.io/tracker.full.js"
></script>
```

## Checkout metadata

When you create a checkout configuration, include the attribution ID in metadata:

```js
const attributionId =
  window.kobbe?.getAttributionId?.() ?? window.kobbe?.attributionId;

const checkoutConfig = await client.checkoutConfigurations.create({
  company_id: "biz_xxxxxxxxxxxxx",
  plan: {
    initial_price: 10.0,
    plan_type: "one_time",
  },
  metadata: attributionId
    ? { kobbe_attribution_id: attributionId }
    : {},
});
```

## Webhook

Whop uses Standard Webhooks signing. Kobbe verifies `webhook-id`, `webhook-timestamp`, and `webhook-signature` using your saved signing secret before recording revenue.
