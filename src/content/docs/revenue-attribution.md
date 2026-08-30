---
title: Revenue attribution
description: Attribute payment provider webhooks to private Kobbe journeys.
order: 37
category: Revenue attribution
navLabel: Overview
---

Revenue attribution connects a visit to a later payment webhook. Pick your provider first, then follow the shared setup below.

Revenue attribution is included on every plan. Enable it only on the pages that send visitors toward checkout, and review your privacy notice or consent setup before using it.

## How it works

- Enable a revenue source in Site settings → Integrations → Revenue attribution
- Load the full tracker with `data-revenue-attribution="true"`
- Pass `kobbe_attribution_id` to checkout when your provider supports metadata
- Add Kobbe's webhook URL and the provider signing secret
- For **Revolut**, also add your Merchant API secret so Kobbe can fetch order details from thin webhooks

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
- Mollie uses the `X-Mollie-Signature` header.
- Revolut uses the `Revolut-Signature` and `Revolut-Request-Timestamp` headers.
- Whop and Superwall use Standard Webhooks signing (`webhook-*` or `svix-*` headers).
- RevenueCat accepts an **Authorization** header or **X-RevenueCat-Webhook-Signature** HMAC.
- Shopify uses the `X-Shopify-Hmac-Sha256` header.

Kobbe rejects webhooks when the signing secret is missing, wrong, or outside the replay window.

## What changes

- It uses `sessionStorage`.
- It links analytics events to payment events.
- It stores payment amount, currency, provider event IDs, and a hashed attribution key.
- It does not store customer email, name, or raw attribution ID.
- It may require additional privacy notice or consent depending on your jurisdiction, audience, and checkout setup.

## After setup

Once webhooks are flowing, open the [Revenue](/docs/revenue) page in the sidebar to review attributed totals, product breakdowns, and purchase journeys. Overview KPIs and breakdown rows are described in [Revenue on the dashboard](/docs/dashboard-stats-revenue).

If your checkout ends on a thank-you page, add it under **Settings → Exclusions → Revenue attribution** so it never claims last-touch credit for the purchase. Details in [Exclude thank-you pages](/docs/revenue#exclude-thank-you-pages).

## Related docs

- [Revenue page](/docs/revenue)
- [Revenue on the dashboard](/docs/dashboard-stats-revenue)
- [Polar revenue attribution](/docs/revenue-attribution-polar)
- [Stripe revenue attribution](/docs/revenue-attribution-stripe)
- [Paddle revenue attribution](/docs/revenue-attribution-paddle)
- [Creem revenue attribution](/docs/revenue-attribution-creem)
- [Mollie revenue attribution](/docs/revenue-attribution-mollie)
- [Revolut revenue attribution](/docs/revenue-attribution-revolut)
- [Whop revenue attribution](/docs/revenue-attribution-whop)
- [RevenueCat revenue attribution](/docs/revenue-attribution-revenuecat)
- [Superwall revenue attribution](/docs/revenue-attribution-superwall)
- [Shopify revenue attribution](/docs/revenue-attribution-shopify)
