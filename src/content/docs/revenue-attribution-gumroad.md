---
title: Gumroad revenue attribution
description: Attribute Gumroad sales to Kobbe journeys.
order: 48
category: Revenue attribution
navLabel: Gumroad
brandLogo:
  url: ../../images/brands/gumroad.svg
  alt: Gumroad logo
---

Use Gumroad when you sell digital products, memberships, or courses through Gumroad links or the Gumroad overlay.

Kobbe listens for Gumroad's **Ping** on every sale and reads `kobbe_attribution_id` from the buy link's URL parameters. Refunds and test pings are ignored.

## Setup

1. Enable **Gumroad** in **Site settings → Integrations → Revenue attribution**.
2. Copy the Kobbe webhook URL.
3. In Gumroad, go to **Settings → Advanced** and paste it as the **Ping endpoint**.
4. On the same page, create an **Application**, then click **Generate access token**.
5. Paste the access token into Kobbe as the secret.

Gumroad does not sign its pings. Kobbe uses the access token to look up each sale in your Gumroad account before recording it, so a forged ping is rejected. The token is stored encrypted and only used for that lookup.

## Tracker

Load the full tracker with revenue attribution and Gumroad link tagging:

```html
<script
  defer
  data-token="YOUR_SITE_TOKEN"
  data-revenue-attribution="true"
  data-gumroad-links="true"
  src="https://app.kobbe.io/tracker.full.js"
></script>
```

With `data-gumroad-links="true"`, Kobbe adds `kobbe_attribution_id` to every link pointing at `gumroad.com`, your `*.gumroad.com` store, or `gum.co`. It works with plain links and with the Gumroad overlay.

If you open checkout from your own code, add the parameter yourself:

```js
const attributionId =
  window.kobbe?.getAttributionId?.() ?? window.kobbe?.attributionId;

const url = new URL("https://yourname.gumroad.com/l/product");
if (attributionId) url.searchParams.set("kobbe_attribution_id", attributionId);
```

## Webhook

Gumroad sends the ping as a form post with the sale, the price in cents, and any URL parameters from the buy link under `url_params`. Kobbe confirms the sale through the Gumroad API with your access token, then records it.
