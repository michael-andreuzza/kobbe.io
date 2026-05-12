---
title: Script options
description: Configure Kobbe tracker options for endpoints, hash routes, attribution, Web Vitals, and debugging.
order: 26
category: Tracking
navLabel: Script
---

Use `data-*` attributes on the `<script>` tag to configure the tracker.

The default `tracker.js` is lightweight and covers pageviews, custom events, custom endpoints, hash routes, and debug logging. Advanced features such as cross-domain tracking, revenue attribution, performance collection, and scroll tracking use `tracker.full.js`.

**See also:** [Custom events](/docs/custom-events) · [Scroll tracking](/docs/scroll-tracking) · [Hash page paths](/docs/hash-page-paths) · [Subdomains](/docs/track-subdomains) · [Cross-domain tracking](/docs/cross-domain-tracking) · [Revenue attribution](/docs/revenue-attribution) · [Performance and Web Vitals](/docs/performance-web-vitals) · [Exclude visits](/docs/exclude-visits)

## Required

### Site token

Your site token from Kobbe. It tells Kobbe which site should receive the pageview or event.

```html
data-token="YOUR_SITE_TOKEN"
```

## Example

```html
<script
  defer
  data-token="YOUR_SITE_TOKEN"
  src="https://app.kobbe.io/tracker.js"
></script>
```

## Optional

### Custom collect endpoint

Override the full collect API URL. By default, the tracker posts to `/api/collect` on the same origin as `tracker.js`.

```html
data-endpoint="https://my-worker.example.com/api/collect"
```

### Hash-based routes

Set to `true` to include `location.hash` in page paths. Use only when hashes represent real routes. See [Hash page paths](/docs/hash-page-paths).

```html
data-track-hash="true"
```

### Cross-domain hostnames

Allow cross-domain tracking for specific hostnames. Requires `tracker.full.js`. See [Cross-domain tracking](/docs/cross-domain-tracking).

```html
data-allowed-hostnames="app.example.com,shop.example.net"
```

### Revenue attribution

Set to `true` to create a tab-scoped attribution ID for checkout metadata. Requires `tracker.full.js`. See [Revenue attribution](/docs/revenue-attribution).

```html
data-revenue-attribution="true"
```

### Web Vitals collection

Set to `true` to send Web Vitals samples (`LCP`, `INP`, `CLS`, `FCP`, `TTFB`). Requires `tracker.full.js`. See [Performance and Web Vitals](/docs/performance-web-vitals).

```html
data-performance="true"
```

### Debug logging

Set to `true` while troubleshooting to log failed collect responses in the browser console. Remove after debugging.

```html
data-analytics-debug="true"
```

```html
<script
  defer
  data-token="YOUR_SITE_TOKEN"
  data-endpoint="https://my-worker.example.com/api/collect"
  data-allowed-hostnames="app.example.com,shop.example.net"
  src="https://app.kobbe.io/tracker.full.js"
></script>
```

When injecting the script from JavaScript, set `script.dataset.token` and optionally `script.dataset.endpoint` (for `data-endpoint`) or `script.dataset.trackHash = "true"` (for `data-track-hash`) before appending the element.

## Element attributes

The tracker also supports opt-in attributes on your page elements:

### Click events

Sends a custom event when the element is clicked. Optional `data-kobbe-event-*` attributes become string props.

```html
data-kobbe-event="Newsletter signup"
```

### Section visibility events

Sends a one-time section visibility event when the element enters the viewport.

Requires `tracker.full.js`.

```html
data-kobbe-scroll="viewed_pricing"
```

### Visibility threshold

Visibility threshold for `data-kobbe-scroll`. Default: `0.5`. Allowed range: `0.1` to `1`.

```html
data-kobbe-scroll-threshold="0.75"
```

### Visibility delay

Delay in milliseconds before a scroll event is sent. Default: `0`. Maximum: `10000`.

```html
data-kobbe-scroll-delay="500"
```

See [Scroll tracking](/docs/scroll-tracking) for privacy guidance and examples.

## Bot filtering and exclusions

Kobbe applies **automatic bot detection** on every collect request (e.g. headless clients and common crawler signals). Suspicious requests return a success response but **do not** increment usage or store an event.

**Exclusions** are separate: per-site rules you set in the Kobbe app (path, hostname, country, IP, or “ignore my browser” via `localStorage`). Those are evaluated after the bot filter and after your site is resolved. See [Exclude visits](/docs/exclude-visits) and [Reduce usage](/docs/reduce-usage).

## Local development

There is no separate “localhost toggle”: if your dev site loads the snippet with a valid token, events are sent like production. Use a **dedicated test site** in Kobbe when you want to keep local traffic out of production stats.

## How it works

- The script sends a pageview when the page loads (and on `hashchange` when [`data-track-hash`](/docs/hash-page-paths) is enabled).
- The current path is sent **without query strings**. Hash fragments are omitted by default and included only with `data-track-hash="true"`.
- Scroll tracking is off by default and requires `tracker.full.js`; marked elements send one custom event when they become visible (see [Scroll tracking](/docs/scroll-tracking)).
- Cross-domain tracking is off by default and requires `tracker.full.js`; when enabled, allowlisted links receive a short handoff parameter that is cleaned from the destination URL and kept in sessionStorage for the current tab (see [Cross-domain tracking](/docs/cross-domain-tracking)).
- Performance collection is off by default and requires `tracker.full.js`; when enabled, Web Vitals samples are stored separately from custom events and one accepted performance payload counts toward usage (see [Performance and Web Vitals](/docs/performance-web-vitals)).
- The page hostname is stored on each event and powers the **Hostnames** breakdown (and hostname exclusions when collect is proxied).
- The referrer is reduced to the origin, so search queries and private URL data are not collected.
- No cookies or persistent identifiers: optional `localStorage.kobbe_ignore === "true"` stops this browser from sending events (see [Exclude visits](/docs/exclude-visits)).
- Custom events use the same tracker script and the same site token (see [Custom events](/docs/custom-events) and `window.kobbe.track`).
