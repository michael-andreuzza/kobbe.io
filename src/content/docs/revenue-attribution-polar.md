---
title: Polar revenue attribution
description: Attribute Polar checkout revenue to Kobbe journeys.
order: 39
category: Revenue attribution
navLabel: Polar
brandLogo:
  url: ../../images/brands/polar.svg
  alt: Polar logo
---

Use Polar when your checkout links or hosted product checkouts run through Polar.

## Setup

1. Enable **Polar** in **Site settings → Integrations → Revenue attribution**.
2. Copy the Kobbe webhook URL from the **Webhook** card.
3. Add it as a Polar webhook endpoint.
4. In Polar, select the `order.paid` event schema.
5. Keep the webhook payload format set to **raw**.
6. Copy Polar's webhook secret into the **Webhook** card in Kobbe.
7. Optional: add an organization access token for product names on the [Revenue](/docs/revenue) page (see below).

Kobbe records revenue from Polar's paid order events. If `order.paid` is not selected, Kobbe will not receive the checkout event it expects.

## Polar webhook settings

When you create the Polar webhook endpoint:

- Use the webhook URL copied from Kobbe.
- Select the `order.paid` event schema.
- Set the payload format to **raw**.
- Copy the webhook secret from Polar and save it in Kobbe.

Do not paste the site tracker token into Polar. The webhook secret is separate and is only used to verify signed webhook requests.

## Product names (optional)

Polar `order.paid` webhooks usually include a product ID. They do not always include the display name Kobbe needs for **Revenue by product**.

To show product names—and backfill names on orders that already arrived—you can add a Polar **organization access token** in Kobbe:

1. In Polar, open **Developers** and create an **Organization access token** with the **`products:read`** scope.
2. In Kobbe, go to **Site settings → Integrations → Revenue attribution**, select **Polar**, and open the **Organization access token** card.
3. Paste the token and save it.

This token is **not** the webhook signing secret. Kobbe stores it encrypted per site and uses it only to read product names from Polar's catalog API. Remove the token in site settings before saving a replacement.

When no token is saved, Kobbe still records revenue. Product rows show the ID from the webhook until a name is available from the payload or the catalog token.

Existing orders backfill when you save a token and when you next open the Revenue page.

## Tracker

Load the tracker with revenue attribution before a visitor clicks a Polar checkout link:

```html
<script
  defer
  data-token="YOUR_SITE_TOKEN"
  data-revenue-attribution="true"
  src="https://app.kobbe.io/tracker.full.js"
></script>
```

## Webhook

Polar signs webhook requests with its signed webhook headers. Paste the Polar webhook secret into the **Webhook** card in Kobbe so events can be verified before revenue is recorded.
