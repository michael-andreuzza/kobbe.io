---
title: "Kobbe vs PostHog"
description: "PostHog is a full product suite: analytics, session replay, feature flags and more. Kobbe is cookieless web analytics with native revenue attribution and AI agent access in one clear dashboard."
competitor: "PostHog"
lastChecked: 2026-10-21
rows:
  - feature: "Cookies"
    kobbe: "None"
    competitor: "Yes by default, for 1 year"
  - feature: "Data retention"
    kobbe: "3 years"
    competitor: "Up to 7 years"
  - feature: "Payment integrations"
    kobbe: "10 native"
    competitor: "Stripe, through its data warehouse"
  - feature: "Funnels"
    kobbe: "Yes"
    competitor: "Yes"
  - feature: "Core Web Vitals"
    kobbe: "Yes"
    competitor: "Yes"
  - feature: "Search Console"
    kobbe: "Yes"
    competitor: "As a data warehouse source"
  - feature: "Official MCP server"
    kobbe: "Read and write"
    competitor: "Read and write"
  - feature: "Official CLI"
    kobbe: "Yes"
    competitor: "Yes"
  - feature: "Open source"
    kobbe: "No"
    competitor: "Yes"
  - feature: "Hosting"
    kobbe: "Cloudflare"
    competitor: "US, or EU in Frankfurt"
---

## Where PostHog is the better pick

- You want session replay, feature flags, experiments and error tracking next to your analytics.
- You want to self-host, or open source matters to you.
- You need to identify signed-in users and follow them across your product.

## Where Kobbe is the better pick

- You want web analytics without cookies, not a product suite to configure.
- You want revenue from Stripe, Polar, Paddle, or Shopify tied to each page, without a data warehouse.
- You want one dashboard you can read in a minute.

## Switching from PostHog

Add the Kobbe script next to PostHog and run both for a few weeks. Once you trust the numbers, keep PostHog for product analytics or remove it. See [Installation guides](/docs/installation-guides).

Import your PostHog pageview history with a personal API key. Kobbe only fills the days before your first Kobbe pageview, so nothing gets overwritten. See [Import from PostHog](/docs/import-from-posthog).
