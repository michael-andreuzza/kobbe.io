---
title: Stripe revenue attribution
description: Attribute Stripe Checkout, Payment Links, and PaymentIntent revenue to Kobbe journeys.
order: 38
category: Revenue attribution
navLabel: Stripe
brandLogo:
  url: ../../images/brands/stripe.svg
  alt: Stripe logo
---

Use Stripe when your checkout is created through Checkout Sessions, Payment Links, or PaymentIntents.

## Setup

1. Enable **Stripe** in **Site settings → Integrations → Revenue attribution**.
2. Copy the Kobbe webhook URL.
3. Add that URL in the Stripe dashboard.
4. Copy Stripe's webhook signing secret into Kobbe.
5. Send `kobbe_attribution_id` with the checkout or payment metadata.
6. Optional: add a restricted API key for product names on the [Revenue](/docs/revenue) page (see below).

## Tracker

Enable revenue attribution on pages that send visitors into Stripe:

```html
<script
  defer
  data-token="YOUR_SITE_TOKEN"
  data-revenue-attribution="true"
  src="https://app.kobbe.io/tracker.full.js"
></script>
```

## Checkout metadata

When you create a Checkout Session or PaymentIntent, pass the attribution ID in metadata:

```js
const attributionId =
  window.kobbe?.getAttributionId?.() ?? window.kobbe?.attributionId;

const metadata = attributionId ? { kobbe_attribution_id: attributionId } : {};
```

For Payment Links, add the same metadata when you create or update the link, or append it from your server before redirecting to Stripe.

## Webhook

Stripe signs webhook requests with the `Stripe-Signature` header. Use Stripe's webhook signing secret, not an API key.

### Which events to enable

Pick the one event that matches how you charge. Stripe fires several events for a single purchase (Checkout Session, PaymentIntent, Charge, Invoice); Kobbe collapses them into one order when they share a payment identifier, but enabling only what you need keeps the log clean and avoids edge cases.

| How you charge | Enable |
| --- | --- |
| Checkout Sessions or Payment Links, one-time | `checkout.session.completed` |
| Checkout Sessions or Payment Links with delayed payment methods (bank debits, vouchers) | `checkout.session.completed` and `checkout.session.async_payment_succeeded` |
| Subscriptions (first payment and renewals) | `invoice.paid` |
| PaymentIntents without Checkout | `payment_intent.succeeded` |
| Refunds | `refund.created` |

Attribution metadata must live on the object the event carries. `checkout.session.completed` reads the session's `metadata` or `client_reference_id`; `payment_intent.succeeded` reads the PaymentIntent's `metadata`; `invoice.paid` reads the subscription's metadata (Checkout copies it there when you set `subscription_data.metadata`).

Kobbe ignores test-mode events (`livemode: false`) and any event type not listed above, including `charge.refunded` snapshots.

## Product names (optional)

Stripe webhooks do not include line items, so orders from Checkout Sessions and Payment Links show as **Unknown product** in **Revenue by product** unless the payload carries a `description` or a `product_name` in metadata.

To name those orders, and backfill the ones that already arrived, add a Stripe **restricted API key** in Kobbe:

1. In Stripe, open **Developers → API keys** and create a **restricted key** with a single permission: **Checkout Sessions: Read**. Use a live-mode key (it starts with `rk_live_`).
2. In Kobbe, go to **Site settings → Integrations → Revenue attribution**, select **Stripe**, and open the **Restricted API key** card.
3. Paste the key and save it. Kobbe checks the key against Stripe before storing it.

This key is **not** the webhook signing secret. Kobbe stores it encrypted per site and uses it only to read a Checkout Session's line items once per order, taking the product name, product ID, and price ID from the first item. Orders paid through a PaymentIntent are resolved through the Checkout Session that created them; PaymentIntents created without Checkout have no line items and keep the description from the webhook.

When no key is saved, Kobbe still records revenue and the Revenue page shows a warning with the number of unnamed Stripe orders. Existing orders backfill when you save a key and when you next open the Revenue page.
