---
title: Stripe revenue attribution
description: Attribute Stripe Checkout, Payment Links, and PaymentIntent revenue to Kobbe journeys.
order: 38
category: Revenue attribution
navLabel: Stripe
brandLogo:
  url: ../../images/brands/stripe.svg
  alt: Stripe logo
---

Use Stripe when your checkout is created through Checkout Sessions, Payment Links, or PaymentIntents.

## Setup

1. Enable **Stripe** in **Site settings → Revenue attribution**.
2. Copy the Kobbe webhook URL.
3. Add that URL in the Stripe dashboard.
4. Copy Stripe's webhook signing secret into Kobbe.
5. Send `kobbe_attribution_id` with the checkout or payment metadata.

## Tracker

Enable revenue attribution on pages that send visitors into Stripe:

```html
<script
  defer
  data-token="YOUR_SITE_TOKEN"
  data-revenue-attribution="true"
  src="https://app.kobbe.io/tracker.full.js"
></script>
```

## Checkout metadata

When you create a Checkout Session or PaymentIntent, pass the attribution ID in metadata:

```js
const attributionId =
  window.kobbe?.getAttributionId?.() ?? window.kobbe?.attributionId;

const metadata = attributionId ? { kobbe_attribution_id: attributionId } : {};
```

For Payment Links, add the same metadata when you create or update the link, or append it from your server before redirecting to Stripe.

## Webhook

Stripe signs webhook requests with the `Stripe-Signature` header. Use Stripe's webhook signing secret, not an API key.

Send successful checkout or payment events to Kobbe so it can match the payment to the hashed attribution key.
