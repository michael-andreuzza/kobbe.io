---
title: Revenue attribution
description: Attribute payment provider webhooks to private Kobbe journeys.
order: 37
category: Revenue attribution
navLabel: Overview
---

Revenue attribution connects a visit to a later payment webhook. Pick your provider first, then follow the shared setup below.

Revenue attribution is off by default. Enable it only on the pages that send visitors toward checkout, and review your privacy notice or consent setup before using it.

## How it works

1. Enable a revenue source in **Site settings → Revenue attribution**.
2. Load the full tracker with `data-revenue-attribution="true"`.
3. For providers or custom checkouts that support metadata, pass `kobbe_attribution_id` to checkout.
4. Add Kobbe's webhook URL and the provider signing secret.

Kobbe hashes the tab-scoped attribution ID before storing it, so the raw value is never stored in D1.

```html
<script
  defer
  data-token="YOUR_SITE_TOKEN"
  data-revenue-attribution="true"
  src="https://app.kobbe.io/tracker.full.js"
></script>
```

## Checkout metadata

Use the same metadata key for every provider:

```js
const attributionId =
  window.kobbe?.getAttributionId?.() ?? window.kobbe?.attributionId;

// Use this metadata object with your provider SDK/API.
const metadata = attributionId ? { kobbe_attribution_id: attributionId } : {};
```

Provider pages show whether this belongs in your checkout flow. Some hosted checkout flows do not expose a place for customers to add metadata manually.

## Webhooks

Add Kobbe’s generated webhook URL to your provider, then paste the provider signing secret back into Kobbe. Production webhooks are signature-verified before Kobbe records revenue:

- Stripe uses the `Stripe-Signature` header.
- Polar uses Polar’s signed webhook headers.
- Paddle uses the `Paddle-Signature` header.
- Creem uses the `creem-signature` header.

Kobbe rejects webhooks when the signing secret is missing, wrong, or outside the replay window.

## What changes

- It uses `sessionStorage`.
- It links analytics events to payment events.
- It stores payment amount, currency, provider event IDs, and a hashed attribution key.
- It does not store customer email, name, or raw attribution ID.
- It may require additional privacy notice or consent depending on your jurisdiction, audience, and checkout setup.
