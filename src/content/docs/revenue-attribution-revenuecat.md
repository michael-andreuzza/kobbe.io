---
title: RevenueCat revenue attribution
description: Attribute RevenueCat initial purchases to Kobbe journeys.
order: 44
category: Revenue attribution
navLabel: RevenueCat
brandLogo:
  url: ../../images/brands/revenuecat.svg
  alt: RevenueCat logo
---

Use RevenueCat when you sell subscriptions through RevenueCat Billing (web) or the mobile SDK (App Store / Play Store).

Kobbe records **initial purchases only** in v1 (`INITIAL_PURCHASE` and `NON_RENEWING_PURCHASE`). Renewals and cancellations are ignored for now.

## Setup

1. Enable **RevenueCat** in **Site settings → Integrations → Revenue attribution**.
2. Copy the Kobbe webhook URL.
3. Add it as a webhook integration in RevenueCat.
4. Subscribe to **INITIAL_PURCHASE** and **NON_RENEWING_PURCHASE**.
5. Copy RevenueCat's authorization header value or signing secret into Kobbe.

## Tracker

Enable revenue attribution on marketing pages that lead into your app or paywall:

```html
<script
  defer
  data-token="YOUR_SITE_TOKEN"
  data-revenue-attribution="true"
  src="https://app.kobbe.io/tracker.full.js"
></script>
```

## Web Billing metadata

When using RevenueCat Billing on the web, pass metadata in the purchase call:

```js
const attributionId =
  window.kobbe?.getAttributionId?.() ?? window.kobbe?.attributionId;

await Purchases.getSharedInstance().purchase({
  rcPackage: pkg,
  metadata: attributionId
    ? { kobbe_attribution_id: attributionId }
    : {},
});
```

## Mobile SDK subscriber attributes

For native app purchases, set a subscriber attribute immediately before purchase:

```js
await Purchases.setAttributes({
  kobbe_attribution_id: attributionId,
});
```

Kobbe reads `kobbe_attribution_id` from webhook `metadata` (web) or `subscriber_attributes` (mobile).

## Webhook

RevenueCat supports an **Authorization** header or **X-RevenueCat-Webhook-Signature** HMAC. Kobbe accepts either when the saved secret matches.
