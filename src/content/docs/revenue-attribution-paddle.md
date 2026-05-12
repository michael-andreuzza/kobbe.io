---
title: Paddle revenue attribution
description: Attribute Paddle checkout revenue to Kobbe journeys.
order: 40
category: Revenue attribution
navLabel: Paddle
brandLogo:
  url: ../../images/brands/paddle.svg
  alt: Paddle logo
---

Use Paddle when your checkout or overlay checkout is created through Paddle.

## Setup

1. Enable **Paddle** in **Site settings → Revenue attribution**.
2. Copy the Kobbe webhook URL.
3. Add it as a Paddle notification destination.
4. Copy the Paddle webhook secret into Kobbe.
5. Pass `kobbe_attribution_id` in the checkout custom data.

## Tracker

Enable revenue attribution on pages that open Paddle checkout:

```html
<script
  defer
  data-token="YOUR_SITE_TOKEN"
  data-revenue-attribution="true"
  src="https://app.kobbe.io/tracker.full.js"
></script>
```

## Checkout custom data

When opening Paddle checkout, include the attribution ID in `customData`:

```js
const attributionId =
  window.kobbe?.getAttributionId?.() ?? window.kobbe?.attributionId;

const customData = attributionId ? { kobbe_attribution_id: attributionId } : {};
```

Use the same key whether you open checkout inline, as an overlay, or from your backend.

## Webhook

Paddle signs webhook requests with the `Paddle-Signature` header. Kobbe verifies that signature before parsing the transaction event.
