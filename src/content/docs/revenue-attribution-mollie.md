---
title: Mollie revenue attribution
description: Attribute Mollie payment revenue to Kobbe journeys.
order: 42
category: Revenue attribution
navLabel: Mollie
brandLogo:
  url: ../../images/brands/mollie.svg
  alt: Mollie logo
---

Use Mollie when checkout or payment creation flows through the Mollie Payments API.

## Setup

1. Enable **Mollie** in **Site settings → Integrations → Revenue attribution**.
2. Copy the Kobbe webhook URL.
3. Create a **next-gen webhook** in the Mollie Dashboard with the full payload.
4. Subscribe to the `payment.paid` event.
5. Copy the Mollie signing secret into Kobbe.
6. Pass `kobbe_attribution_id` in payment metadata when creating payments.

## Tracker

Enable revenue attribution on pages that lead visitors toward Mollie checkout:

```html
<script
  defer
  data-token="YOUR_SITE_TOKEN"
  data-revenue-attribution="true"
  src="https://app.kobbe.io/tracker.full.js"
></script>
```

## Payment metadata

Include the attribution ID when creating a payment:

```js
const attributionId =
  window.kobbe?.getAttributionId?.() ?? window.kobbe?.attributionId;

const metadata = attributionId ? { kobbe_attribution_id: attributionId } : {};

// Mollie Payments API
mollie.payments.create({
  amount: { currency: "EUR", value: "10.00" },
  description: "Order",
  metadata,
});
```

Use the same metadata key whether you create payments from your frontend or backend.

## Webhook

Mollie next-gen webhooks send JSON payloads signed with the `X-Mollie-Signature` header (`sha256=<hex>`). Kobbe verifies that signature before parsing the `payment.paid` event and reading attribution metadata from the payment object.
