---
title: Add the tracker
description: Add the Kobbe tracker to your website.
order: 2
category: Get started
navLabel: Add the tracker
---

Add Kobbe to your site by copying the tracker script from your dashboard and pasting it into your website.

## 1. Create a site

Sign in to Kobbe, create a site, and enter the domain you want to track.

After the site is created, Kobbe shows a site token. Copy it before leaving the page. For security, the token cannot be shown again after the page reloads.

## 2. Add the tracker script

Paste this script on every page you want to track. Replace `YOUR_SITE_TOKEN` with the token from your site settings.

```html
<script
  defer
  data-token="YOUR_SITE_TOKEN"
  src="https://app.kobbe.io/tracker.js"
></script>
```

The script automatically records a pageview when the page loads.

Use the **same snippet** on each subdomain you want in this site (for example `www`, `app`, or `blog`). See [Track across subdomains](/docs/track-subdomains).

Optional settings such as a custom collect URL (`data-endpoint`) or hash routes (`data-track-hash`) are described in [Script options](/docs/script-options); see [Hash page paths](/docs/hash-page-paths) for SPAs that use the URL hash as the route. To drop your own visits or filter by path, hostname, country, or IP, see [Exclude visits](/docs/exclude-visits).

## 3. Verify tracking

Open your site in a new tab, then return to Kobbe and check the dashboard. You should see the visit appear in real time.

If you do not see traffic after a minute:

- Confirm the script is present in the page source.
- Confirm the token matches the site you created.
- Make sure the script is not blocked by a strict Content Security Policy.

## 4. Track important actions

Pageviews work automatically. To track clicks, signups, purchases, downloads, or other actions, add custom events with HTML attributes or the JavaScript API.

Continue with [Custom events](/docs/custom-events).
