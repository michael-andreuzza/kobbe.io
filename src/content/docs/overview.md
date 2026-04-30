---
title: Kobbe documentation
description: Learn how to add Kobbe to your site and use the privacy-friendly analytics dashboard.
order: 1
navLabel: Overview
---

Kobbe is a privacy-friendly analytics dashboard for understanding your website traffic. It collects pageviews and custom events without cookies, persistent identifiers, or personal data.

## Quick start

1. Add your website in Kobbe.
2. Copy the tracker script from your site settings.
3. Paste the script into your website.
4. Open your dashboard to see visitors, visits, views, sources, locations, devices, and events.

## What you can see

- **Visitors, visits, and views** — understand how much traffic your site receives.
- **Top pages** — see which pages people enter, view, and leave from.
- **Referrers and channels** — know where traffic comes from, including search, social, direct, and other websites.
- **Locations** — view countries, regions, and cities without storing personal data.
- **Devices** — compare browsers, operating systems, and device types.
- **Custom events** — track clicks, signups, purchases, downloads, and other important actions.
- **Funnels** — measure conversion and drop-off across page paths and custom events.
- **AI traffic** — see referrals from tools like ChatGPT, Perplexity, Claude, and more.
- **Shared dashboards** — create read-only links for clients, teammates, or stakeholders.
- **Data export** — download site analytics as CSV for reports, backups, or spreadsheet analysis.

## Privacy by default

Kobbe does not use cookies, localStorage, sessionStorage, or browser fingerprinting techniques (canvas, WebGL, font enumeration, etc.). There is no persistent client-side identifier and no cross-session tracking.

To count same-day unique visitors, the server computes a short-lived anonymous hash from the request metadata and a daily-rotating secret. The hash cannot be reversed, is never shared across days, and raw IP addresses are never stored in the database.

The tracker strips query strings from URLs and only sends the referrer origin, so search queries, tokens, and other sensitive URL data are not collected.
