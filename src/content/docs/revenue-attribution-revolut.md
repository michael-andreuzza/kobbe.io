---
title: Revolut revenue attribution
description: Attribute Revolut Merchant order revenue to Kobbe journeys.
order: 43
category: Revenue attribution
navLabel: Revolut
brandLogo:
  url: ../../images/brands/revolut.svg
  alt: Revolut logo
---

Use Revolut when checkout or order creation flows through the Revolut Merchant API.

## Setup

1. Enable **Revolut** in **Site settings → Integrations → Revenue attribution**.
2. Copy the Kobbe webhook URL.
3. Create a webhook in the Revolut Merchant dashboard.
4. Subscribe to the `ORDER_COMPLETED` event.
5. Copy Revolut's webhook signing secret into Kobbe.
6. Copy your Merchant API secret into Kobbe.
7. Pass `kobbe_attribution_id` in order metadata when creating orders.

## Tracker

Enable revenue attribution on pages that lead visitors toward Revolut checkout:

```html
<script
  defer
  data-token="YOUR_SITE_TOKEN"
  data-revenue-attribution="true"
  src="https://app.kobbe.io/tracker.full.js"
></script>
```

## Order metadata

Include the attribution ID when creating an order:

```js
const attributionId =
  window.kobbe?.getAttributionId?.() ?? window.kobbe?.attributionId;

const metadata = attributionId ? { kobbe_attribution_id: attributionId } : {};

// Revolut Merchant API
await fetch("https://merchant.revolut.com/api/orders", {
  method: "POST",
  headers: {
    Authorization: `Bearer ${REVOLUT_MERCHANT_SECRET}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    amount: 1999,
    currency: "EUR",
    description: "Starter plan",
    metadata,
  }),
});
```

Use the same metadata key whether you create orders from your frontend or backend.

## Merchant API secret {#merchant-api-secret}

Revolut webhooks usually only include the order id. Kobbe needs your **Merchant API secret** to call the Revolut Merchant API and read amount, currency, description, and attribution metadata from the completed order.

1. In the Revolut Merchant dashboard, copy your **API secret key**.
2. In Kobbe, go to **Site settings → Integrations → Revenue attribution**, select **Revolut**, and open the **Merchant API secret** card.
3. Paste the secret and save.

This secret is **not** the webhook signing secret. Kobbe stores it encrypted per site and uses it only to retrieve order details after a verified `ORDER_COMPLETED` webhook.

## Webhook

Revolut webhooks are signed with the `Revolut-Signature` and `Revolut-Request-Timestamp` headers. Kobbe verifies that signature before processing `ORDER_COMPLETED` events.

Revolut sends a thin webhook payload that usually only includes the order id. Kobbe uses your Merchant API secret to fetch the full order and read amount, currency, and attribution metadata.
