---
title: Add the tracker
description: Add the Kobbe tracker script to your website and verify that pageviews appear in real time.
order: 25
category: Get started
navLabel: Add the tracker
---

Add Kobbe to your site by copying the tracker script from your dashboard and pasting it into your website.

For framework and builder-specific steps, see [Installation guides](/docs/installation-guides).

## 1. Create a site

- Sign in to Kobbe
- Create a site and enter the domain you want to track
- Copy the site token before leaving the page (it is not shown again after reload)

## 2. Add the tracker script

The Install section on the same page gives you a Minimal snippet (token only) or an Explicit snippet with `data-*` attributes. Use [Tracking options](/docs/tracking-options) when you prefer dashboard On / Off toggles instead of editing HTML.

```html
<script
  defer
  data-token="YOUR_SITE_TOKEN"
  src="https://app.kobbe.io/tracker.js"
></script>
```

The script automatically records a pageview when the page loads.

Use the same snippet on each subdomain you want in this site (for example `www`, `app`, or `blog`). See [Track across subdomains](/docs/track-subdomains).

The default `tracker.js` is enough for pageviews and custom events. For optional features, use [Tracking options](/docs/tracking-options) in the dashboard or `data-*` attributes from [Script options](/docs/script-options). Switch to `tracker.full.js` when you need [scroll tracking](/docs/scroll-tracking), [cross-domain tracking](/docs/cross-domain-tracking), or [Web Vitals](/docs/performance-web-vitals).

## See also

- [Tracking options](/docs/tracking-options)
- [Script options](/docs/script-options)
- [Filter your visits](/docs/exclude-visits)

## 3. Verify tracking

- Open your site in a new tab
- Return to Kobbe and check the dashboard
- The visit should appear in real time

If you do not see traffic after a minute:

- Confirm the script is present in the page source.
- Confirm the token matches the site you created.
- Make sure the script is not blocked by a strict Content Security Policy.

## 4. Track important actions

Pageviews work automatically. To track clicks, signups, purchases, downloads, or other actions, add custom events with HTML attributes or the JavaScript API.

Continue with [Custom events](/docs/custom-events).
