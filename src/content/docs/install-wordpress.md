---
title: Install on WordPress
description: Add the Kobbe tracker to WordPress (theme, child theme, or header plugin).
order: 9
category: Installation guides
navLabel: WordPress
brandLogo:
  url: ../../images/brands/wordpress.svg
  alt: WordPress logo
---

WordPress needs the script on **every front-end page**. Token: [Add the tracker](/docs/add-the-tracker).

## Tracker snippet

```html
<script
  defer
  data-token="YOUR_SITE_TOKEN"
  src="https://app.kobbe.io/tracker.js"
></script>
```

## Theme header (classic)

1. In the admin, go to **Appearance → Theme File Editor** (or edit files over SFTP).
2. Open `header.php` in your active theme (prefer a **child theme** so updates do not wipe the change).
3. Paste the snippet before `</head>` or `wp_head()`.

## Block themes (FSE)

Use **Appearance → Editor → Templates** and add a **Custom HTML** block in the template head area if your theme exposes it, or use a small **mu-plugin** / header & footer scripts plugin that prints the snippet on `wp_head`.

## WooCommerce stores

Storefront pages are still WordPress templates — the same snippet applies. See also [WooCommerce](/docs/install-woocommerce) for funnel-specific notes.

## Verify

Visit the public site (not `/wp-admin`), then check Kobbe.

## Next steps

- [Exclude visits](/docs/exclude-visits) to drop admin or editor traffic
- [Custom events](/docs/custom-events)
- [Revenue attribution](/docs/revenue-attribution)
