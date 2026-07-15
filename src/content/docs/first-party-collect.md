---
title: First-party collect
description: Serve the tracker and collect endpoint from a dedicated hostname for more reliable first-party delivery.
order: 27.5
category: Tracking
navLabel: First-party collect
---

By default, the tracker loads from `app.kobbe.io` and posts to `/api/collect` on the same origin. **First-party collect** moves both the script and ingest endpoint to a dedicated hostname so requests stay first-party to Kobbe or to a subdomain you control.

This is useful when ad blockers or strict browser privacy lists interfere with third-party analytics domains, or when you want collect traffic on a neutral subdomain like `data.example.com`.

## Kobbe collect subdomain

The fastest option needs no DNS changes on your domain.

1. Open **Site settings** in Kobbe.
2. Under **First-party collect**, choose **Enable first-party collect**.
3. Kobbe provisions a dedicated hostname such as `yoursite-collect.kobbe.io`.
4. Copy the updated install snippet — it loads `tracker.js` from that hostname and posts to the same origin.

Use **Disconnect** to return to the default `app.kobbe.io` snippet.

## Your collect subdomain

For stricter first-party delivery on your own domain, point a subdomain at Kobbe with a CNAME record.

1. In **Site settings**, enter a collect hostname such as `data.example.com`.
2. Choose **Connect**.
3. Add the CNAME record Kobbe shows (from your hostname to the Cloudflare target).
4. Wait for DNS and SSL verification. Status appears in site settings.
5. Update your site with the new install snippet once the hostname is active.

Prefer neutral names like `data.` or `cdn.` rather than `analytics.` or `tracking.`.

Disconnect the active Kobbe collect subdomain before connecting a custom hostname. Use **Cancel setup** while a custom hostname is still pending.

## Install snippet

When first-party collect is active, the install snippet uses your collect hostname for both `src` and the default collect endpoint. You do not need a separate `data-endpoint` unless you proxy collect elsewhere.

```html
<script
  defer
  data-token="YOUR_SITE_TOKEN"
  src="https://yoursite-collect.kobbe.io/tracker.js"
></script>
```

Optional tracker attributes such as `data-conversions`, `data-campaigns`, and `data-track-hash` work the same on the collect hostname.

## What first-party collect is not

First-party collect changes where the tracker script loads and where events are sent. It does **not** host your Kobbe dashboard on your domain.

## Related docs

- [Add the tracker](/docs/add-the-tracker)
- [Script options](/docs/script-options)
- [Filter your visits](/docs/exclude-visits)
