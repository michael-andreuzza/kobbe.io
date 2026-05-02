---
title: Script options
description: Configure the Kobbe tracker script.
order: 3
category: Tracking
navLabel: Script
---

The tracker script accepts configuration through `data-*` attributes on the `<script>` tag. For click-based and JavaScript custom events, see [Custom events](/docs/custom-events). For hash-based SPAs and section routes, see [Hash page paths](/docs/hash-page-paths). To roll `www`, `app`, and other hosts into one site, see [Track across subdomains](/docs/track-subdomains). To ignore your own traffic or add server-side filters, see [Exclude visits](/docs/exclude-visits).

## Required

| Attribute    | Description                                                                                        |
| ------------ | -------------------------------------------------------------------------------------------------- |
| `data-token` | Your site token from Kobbe. The token tells Kobbe which site should receive the pageview or event. |

## Example

```html
<script
  defer
  data-token="YOUR_SITE_TOKEN"
  src="https://app.kobbe.io/tracker.js"
></script>
```

## Optional

| Attribute          | Description                                                                                                                                                                                                                                                                                                                                                           |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `data-endpoint`    | Override the **full URL** of the collect API. By default the tracker posts to `/api/collect` on the **same origin as `tracker.js`**. Use a first-party proxy, a Worker, or another absolute URL when the script tag and your API live on different hosts.                                                                                                              |
| `data-track-hash`  | Set to `true` to include `location.hash` in page paths and record **extra pageviews when the hash changes** (hash routers). **Query strings are never collected.** Use only when hashes represent real routes—anchor-heavy pages can inflate counts. See [Hash page paths](/docs/hash-page-paths).                                                                         |

```html
<script
  defer
  data-token="YOUR_SITE_TOKEN"
  data-endpoint="https://my-worker.example.com/api/collect"
  src="https://app.kobbe.io/tracker.js"
></script>
```

When injecting the script from JavaScript, set `script.dataset.token` and optionally `script.dataset.endpoint` (for `data-endpoint`) or `script.dataset.trackHash = "true"` (for `data-track-hash`) before appending the element.

## Bot filtering and exclusions

Kobbe applies **automatic bot detection** on every collect request (e.g. headless clients and common crawler signals). Suspicious requests return a success response but **do not** increment usage or store an event.

**Exclusions** are separate: per-site rules you set in the Kobbe app (path, hostname, country, IP, or “ignore my browser” via `localStorage`). Those are evaluated after the bot filter and after your site is resolved. See [Exclude visits](/docs/exclude-visits).

## Local development

There is no separate “localhost toggle”: if your dev site loads the snippet with a valid token, events are sent like production. Use a **dedicated test site** in Kobbe when you want to keep local traffic out of production stats.

## How it works

- The script sends a pageview when the page loads (and on `hashchange` when [`data-track-hash`](/docs/hash-page-paths) is enabled).
- The current path is sent **without query strings**. Hash fragments are omitted by default and included only with `data-track-hash="true"`.
- The page hostname is stored on each event and powers the **Hostnames** breakdown (and hostname exclusions when collect is proxied).
- The referrer is reduced to the origin, so search queries and private URL data are not collected.
- No cookies or persistent identifiers: optional `localStorage.kobbe_ignore === "true"` stops this browser from sending events (see [Exclude visits](/docs/exclude-visits)).
- Custom events use the same tracker script and the same site token (see [Custom events](/docs/custom-events) and `window.kobbe.track`).
