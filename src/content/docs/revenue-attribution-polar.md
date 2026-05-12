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

1. Enable **Polar** in **Site settings → Revenue attribution**.
2. Copy the Kobbe webhook URL.
3. Add it as a Polar webhook endpoint.
4. In Polar, select the `order.paid` event schema.
5. Keep the webhook payload format set to **raw**.
6. Copy Polar's webhook secret into Kobbe.

Kobbe records revenue from Polar's paid order events. If `order.paid` is not selected, Kobbe will not receive the checkout event it expects.

## Polar webhook settings

When you create the Polar webhook endpoint:

- Use the webhook URL copied from Kobbe.
- Select the `order.paid` event schema.
- Set the payload format to **raw**.
- Copy the webhook secret from Polar and save it in Kobbe.

Do not paste the site tracker token into Polar. The webhook secret is separate and is only used to verify signed webhook requests.

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

Polar signs webhook requests with its signed webhook headers. Paste the Polar webhook secret into Kobbe so events can be verified before revenue is recorded.
