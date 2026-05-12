---
title: Creem revenue attribution
description: Attribute Creem checkout revenue to Kobbe journeys.
order: 41
category: Revenue attribution
navLabel: Creem
brandLogo:
  url: ../../images/brands/creem.svg
  alt: Creem logo
---

Use Creem when your product checkout or payment link is handled by Creem.

## Setup

1. Enable **Creem** in **Site settings → Revenue attribution**.
2. Copy the Kobbe webhook URL.
3. Add it in Creem's webhook settings.
4. Copy the Creem signing secret into Kobbe.
5. Pass `kobbe_attribution_id` with the checkout metadata.

## Tracker

Enable revenue attribution before a visitor starts checkout:

```html
<script
  defer
  data-token="YOUR_SITE_TOKEN"
  data-revenue-attribution="true"
  src="https://app.kobbe.io/tracker.full.js"
></script>
```

## Checkout metadata

Include the attribution ID when creating or redirecting to checkout:

```js
const attributionId =
  window.kobbe?.getAttributionId?.() ?? window.kobbe?.attributionId;

const metadata = attributionId ? { kobbe_attribution_id: attributionId } : {};
```

## Webhook

Creem signs webhook requests with the `creem-signature` header. Kobbe verifies the signature and then looks for the attribution metadata on the payment event.
