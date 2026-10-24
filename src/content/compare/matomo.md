---
title: "Kobbe vs Matomo"
description: "Matomo is open source analytics you can self-host, built to replace Google Analytics feature for feature. Kobbe is cookieless web analytics with revenue attribution and AI agent access in one clear dashboard."
competitor: "Matomo"
lastChecked: 2026-10-21
rows:
  - feature: "Cookies"
    kobbe: "None"
    competitor: "Yes by default, can be turned off"
  - feature: "Data retention"
    kobbe: "3 years"
    competitor: "Reports forever, raw data 24 months on Cloud"
  - feature: "Payment integrations"
    kobbe: "14 native"
    competitor: "Manual ecommerce setup, WooCommerce"
  - feature: "Funnels"
    kobbe: "Yes"
    competitor: "Yes"
  - feature: "Search Console"
    kobbe: "Yes"
    competitor: "Yes"
  - feature: "Official MCP server"
    kobbe: "Read and write"
    competitor: "Read only by default"
  - feature: "Open source"
    kobbe: "No"
    competitor: "Yes"
  - feature: "Hosting"
    kobbe: "Cloudflare"
    competitor: "Self-hosted, or Cloud in Europe"
---

## Where Matomo is the better pick

- You want to self-host and keep every raw visit on your own servers.
- You need heatmaps, session recordings, A/B tests or a tag manager in the same tool.
- You want the depth of Google Analytics without Google.

## Where Kobbe is the better pick

- You want analytics without cookies out of the box, with nothing to configure.
- You want revenue from Stripe, Polar, Paddle, or Shopify tied to each page, without setting up ecommerce tracking.
- You want one dashboard you can read in a minute, not a report builder.

## Switching from Matomo

Add the Kobbe script next to Matomo and run both for a few weeks. Once you trust the numbers, remove Matomo. See [Installation guides](/docs/installation-guides).

Import your Matomo history with an auth token, from Matomo Cloud or a self-hosted instance. Kobbe only fills the days before your first Kobbe pageview, so nothing gets overwritten. See [Import from Matomo](/docs/import-from-matomo).
