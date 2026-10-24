---
title: Razorpay revenue attribution
description: Attribute Razorpay payments and refunds to Kobbe journeys.
order: 50
category: Revenue attribution
navLabel: Razorpay
brandLogo:
  url: ../../images/brands/razorpay.svg
  alt: Razorpay logo
---

Use Razorpay when you take payments through Razorpay Checkout, Payment Links, or the Razorpay API.

Kobbe listens for **payment.captured** and **refund.processed** events and reads `kobbe_attribution_id` from the payment's `notes`. Refunds are subtracted from the original sale.

## Setup

1. Enable **Razorpay** in **Site settings → Integrations → Revenue attribution**.
2. Copy the Kobbe webhook URL.
3. In the Razorpay Dashboard, go to **Account & Settings → Webhooks** and click **Add New Webhook**.
4. Paste the Kobbe webhook URL and enter a long random **Secret**.
5. Select the **payment.captured** and **refund.processed** events and save.
6. Paste the same secret into Kobbe.

## Tracker

Load the full tracker with revenue attribution on pages that lead to checkout:

```html
<script
  defer
  data-token="YOUR_SITE_TOKEN"
  data-revenue-attribution="true"
  src="https://app.kobbe.io/tracker.full.js"
></script>
```

## Pass the attribution ID

Add the ID to `notes` when you create the order or open Checkout:

```js
const attributionId =
  window.kobbe?.getAttributionId?.() ?? window.kobbe?.attributionId;

const options = {
  key: "rzp_live_...",
  order_id: orderId,
  notes: attributionId ? { kobbe_attribution_id: attributionId } : {},
};
new Razorpay(options).open();
```

Notes set on the order are copied to the payment, so you can also set them server side when calling the Orders API.

## Webhook

Razorpay signs every webhook with your secret. Kobbe checks the `X-Razorpay-Signature` header against an HMAC-SHA256 of the raw body before recording revenue.
