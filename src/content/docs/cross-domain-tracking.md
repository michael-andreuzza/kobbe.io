---
title: Cross-domain tracking
description: Link visitor journeys across different root domains with explicit opt-in.
order: 29
category: Tracking
navLabel: Cross-domain
---

Cross-domain tracking is an **advanced opt-in** feature for sites that need to connect a journey across different root domains, such as a marketing site on `example.com` and an app on `example-app.com`.

By default, Kobbe does **not** link visitors across different root domains.

Kobbe stays privacy-friendly by default; this feature only runs when you use `tracker.full.js` and explicitly add `data-allowed-hostnames`.

## Setup

Install the same Kobbe tracker token on each domain you want to measure as one site, then add the other allowed domains to the script tag:

```html
<script
  defer
  data-token="YOUR_SITE_TOKEN"
  data-allowed-hostnames="app.example.com,shop.example.net"
  src="https://app.kobbe.io/tracker.full.js"
></script>
```

Use a comma-separated list of **hostnames only**. Do not include paths, query strings, email addresses, or user identifiers.

## How it works

When a visitor clicks a link to an allowlisted hostname, the tracker appends a short handoff parameter to the destination URL. On the destination domain, the tracker reads the parameter, removes it from the address bar, and uses it for future events in that browser tab.

The raw handoff value is not stored in Kobbe. The collector hashes it server-side with the site ID, current UTC day, and a daily in-memory salt, then stores the resulting same-day anonymous visitor key.

## Limits

- Only explicit hostnames in `data-allowed-hostnames` are decorated.
- The destination domain must also load the Kobbe tracker with cross-domain tracking enabled.
- Cross-domain matching is designed for same-day journey and funnel analysis, not long-term user identification.
- The tracker does not use cookies or localStorage for this feature. When cross-domain tracking is enabled, it uses sessionStorage to keep the handoff stable within the current browser tab.

## Related

- [Track across subdomains](/docs/track-subdomains) — subdomains work without cross-domain handoff.
- [Script options](/docs/script-options) — all tracker attributes.
- [Funnels](/docs/funnels) — use cross-domain journeys to analyze marketing to app/store flows.
