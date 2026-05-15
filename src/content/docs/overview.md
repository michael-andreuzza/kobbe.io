---
title: Kobbe documentation
description: Learn how to add Kobbe to your site and use the privacy-friendly analytics dashboard.
order: 1
category: Get started
navLabel: Overview
---

Kobbe is a privacy-friendly analytics dashboard for understanding your website traffic. Its defaults collect pageviews and custom events without cookies, persistent identifiers, or personal data.

## What you can see

### Traffic overview

Kobbe shows visitors, visits, views, top pages, referrers, channels, locations, devices, and opt-in UTM campaigns so you can understand where traffic comes from and what people view.

### Events and conversions

Track custom events for clicks, signups, purchases, downloads, and important sections. Funnels help you measure drop-off across page paths and events, and [UTM campaigns](/docs/utm-campaigns) can connect marketing links to conversions.

### Connected insights

Optional Web Vitals and Search Console data help you review slow pages, browsers, devices, organic queries, landing pages, clicks, impressions, and rankings next to your analytics. AI traffic referrals are shown alongside other sources.

### Sharing and exports

Create read-only dashboards for clients or teammates, invite team viewers without giving them workspace settings access, and export site analytics as CSV when you need reports or backups.

[Monthly reports](/docs/monthly-reports) and [traffic alerts](/docs/traffic-alerts) can be enabled per site when you want opt-in email summaries or obvious spike/drop notifications.

### CLI, Raycast, and AI agents

Use the [CLI](/docs/cli), [Raycast extension](/docs/raycast), or [AI agents](/docs/ai-agents) to inspect analytics, review revenue, check setup health, and manage sites from your terminal, Raycast, or MCP-compatible tools.

## Privacy by default

Kobbe's default tracker does not use cookies or browser fingerprinting techniques (canvas, WebGL, font enumeration, etc.). It does not use `localStorage` or `sessionStorage` **to count pageviews or build visitor profiles**.

**Visitor opt-out:** If someone sets `localStorage.kobbe_ignore` (see [Exclude visits](/docs/exclude-visits)), the script stops sending events from that browser. That stores a **preference**, not a persistent analytics identifier.

In the default configuration there is no client-side storage used for cross-session tracking.

To count same-day unique visitors, the server computes a short-lived anonymous hash from the request metadata and a daily-rotating secret. The hash cannot be reversed, is never shared across days, and raw IP addresses are never stored in the database.

The tracker strips query strings from URLs and only sends the referrer origin, so search queries, tokens, and other sensitive URL data are not collected.
