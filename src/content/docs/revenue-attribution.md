---
title: Revenue attribution
description: Attribute payment provider webhooks to private Kobbe journeys.
order: 14
category: Tracking
navLabel: Revenue
---

Revenue attribution is an advanced opt-in feature. It is off by default because it uses `sessionStorage` and payment metadata to connect a browser journey with a later payment webhook.

Enable it only after updating your privacy notice or consent banner. Kobbe does not collect customer emails for attribution.

## How it works

1. Enable a revenue source in **Site settings → Revenue attribution**.
2. Paste the provider webhook signing secret in Kobbe.
3. Add `data-revenue-attribution="true"` to the tracker script.
4. Pass `window.kobbe.attributionId` as payment metadata using the key `kobbe_attribution_id`.
5. Add the generated webhook URL to Stripe, Polar, Paddle, or Creem.

The browser ID is a random tab-scoped value stored in `sessionStorage`. The collect API and revenue webhook hash that value server-side before storing it, so the raw attribution ID is never stored in D1.

```html
<script
  defer
  data-token="YOUR_SITE_TOKEN"
  data-revenue-attribution="true"
  src="https://app.kobbe.io/tracker.js"
></script>
```

## Checkout metadata

When creating a checkout, include the attribution ID if it exists:

```js
const attributionId = window.kobbe?.attributionId

// Use this metadata object with your provider SDK/API.
const metadata = attributionId
  ? { kobbe_attribution_id: attributionId }
  : {}
```

Use the same metadata key for Stripe Checkout, Stripe PaymentIntents, Stripe Payment Links, Polar checkouts, Paddle transactions, and Creem checkouts.

## Webhooks

In Kobbe, enable the provider in **Site settings → Revenue attribution**, paste its webhook signing secret, and copy its webhook URL. Add that URL to the provider dashboard for successful payment, checkout, order, or transaction events.

Keep the webhook URL private. It includes an unguessable source ID and can be disabled from site settings. Production webhooks are also signature-verified before Kobbe parses the JSON body:

- Stripe uses the `Stripe-Signature` header.
- Polar uses Polar’s signed webhook headers.
- Paddle uses the `Paddle-Signature` header.
- Creem uses the `creem-signature` header.

Kobbe rejects revenue webhooks when the signing secret is missing, cannot be decrypted, is wrong, or the request timestamp is outside the replay window.

## GDPR and consent

Kobbe’s default tracker remains cookieless and does not create persistent IDs. Revenue attribution changes that behavior for the pages where you enable it:

- It uses `sessionStorage`.
- It links analytics events to payment events.
- It stores payment amount, currency, provider event IDs, and a hashed attribution key.
- It does not store customer email, name, or raw attribution ID.

For many sites this requires a privacy notice update and may require consent before loading the revenue attribution tracker option.
