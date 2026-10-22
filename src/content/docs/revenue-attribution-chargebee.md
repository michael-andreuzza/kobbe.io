---
title: Chargebee revenue attribution
description: Attribute Chargebee subscription payments to Kobbe journeys.
order: 49
category: Revenue attribution
navLabel: Chargebee
brandLogo:
  url: ../../images/brands/chargebee.svg
  alt: Chargebee logo
---

Use Chargebee when you bill subscriptions through Chargebee checkout or the Chargebee API.

Kobbe listens for **payment_succeeded** events and reads `kobbe_attribution_id` from a subscription custom field or from the subscription's `meta_data`. Renewals stay attributed to the visit that started the subscription.

## Setup

1. Enable **Chargebee** in **Site settings → Integrations → Revenue attribution**.
2. Copy the Kobbe webhook URL.
3. In Chargebee, go to **Settings → Configure Chargebee → Webhooks** and click **Add webhook**.
4. Paste the Kobbe webhook URL.
5. Turn on **Protect webhook URL with basic authentication**. Use any username and a long random password.
6. Select the **Payment Succeeded** event and save.
7. Paste the password into Kobbe. To also pin the username, paste `username:password` instead.

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

**Hosted checkout.** Create a subscription custom field with the API name `cf_kobbe_attribution_id` under **Settings → Configure Chargebee → Custom fields**, hidden from customers. Then pass it with the checkout:

```js
const attributionId =
  window.kobbe?.getAttributionId?.() ?? window.kobbe?.attributionId;

const subscription = attributionId ? { cf_kobbe_attribution_id: attributionId } : {};
// Send `subscription` with your checkout request, for example from your server
// when calling hosted_pages.checkout_new_for_items.
```

**API.** When you create the subscription yourself, set the ID in `meta_data`:

```json
{ "meta_data": { "kobbe_attribution_id": "ATTRIBUTION_ID" } }
```

Kobbe also checks the customer and the invoice for the same field, in case your integration stores it there.

## Webhook

Chargebee does not sign webhooks. It protects them with HTTP basic authentication, so Kobbe checks the `Authorization` header against your saved password on every event.
