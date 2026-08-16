---
title: Superwall revenue attribution
description: Attribute Superwall initial purchases to Kobbe journeys.
order: 45
category: Revenue attribution
navLabel: Superwall
brandLogo:
  url: ../../images/brands/superwall.svg
  alt: Superwall logo
---

Use Superwall when you run paywalls across the App Store, Play Store, or Stripe.

Kobbe records **initial purchases only** in v1 (`initial_purchase` and `non_renewing_purchase`). Renewals, cancellations, and billing issues are ignored for now.

## Setup

1. Enable **Superwall** in **Site settings → Integrations → Revenue attribution**.
2. Copy the Kobbe webhook URL.
3. Add it in **Superwall → Integrations → Webhooks**.
4. Subscribe to **initial_purchase** and **non_renewing_purchase**.
5. Copy Superwall's webhook signing secret into Kobbe.

## Tracker

Enable revenue attribution on pages that send visitors toward your app or paywall:

```html
<script
  defer
  data-token="YOUR_SITE_TOKEN"
  data-revenue-attribution="true"
  src="https://app.kobbe.io/tracker.full.js"
></script>
```

## User attributes

Set `kobbe_attribution_id` as a Superwall user attribute before the paywall purchase flow:

```js
const attributionId =
  window.kobbe?.getAttributionId?.() ?? window.kobbe?.attributionId;

if (attributionId) {
  await Superwall.shared.setUserAttributes({
    kobbe_attribution_id: attributionId,
  });
}
```

Superwall includes `userAttributes` on webhook events. Kobbe looks for `kobbe_attribution_id` there.

## Webhook

Superwall uses Svix-style Standard Webhooks signing (`svix-id`, `svix-timestamp`, `svix-signature`). Whop uses the same algorithm with `webhook-*` headers. Paste the signing secret from Superwall into Kobbe.
