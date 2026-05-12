---
title: Polar revenue attribution
description: Attribute Polar checkout revenue to Kobbe journeys.
order: 39
category: Revenue attribution
navLabel: Polar
brandLogo:
  url: ../../images/brands/polar.svg
  alt: Polar logo
---

Use Polar when your checkout links or hosted product checkouts run through Polar.

## Setup

1. Enable **Polar** in **Site settings → Revenue attribution**.
2. Copy the Kobbe webhook URL.
3. Add it as a Polar webhook endpoint.
4. Copy Polar's webhook secret into Kobbe.
5. Pass `kobbe_attribution_id` into the checkout.

## Tracker

Load the tracker with revenue attribution before a visitor clicks a Polar checkout link:

```html
<script
  defer
  data-token="YOUR_SITE_TOKEN"
  data-revenue-attribution="true"
  src="https://app.kobbe.io/tracker.full.js"
></script>
```

## Checkout links

For Polar-hosted links, append the attribution ID as a query parameter:

```js
const attributionId =
  window.kobbe?.getAttributionId?.() ?? window.kobbe?.attributionId;

if (attributionId) {
  const url = new URL(polarCheckoutUrl);
  url.searchParams.set("kobbe_attribution_id", attributionId);
}
```

If you create Polar checkouts through an API, send the same value in metadata when the API supports it.

## Webhook

Polar signs webhook requests with its signed webhook headers. Paste the Polar webhook secret into Kobbe so events can be verified before revenue is recorded.
