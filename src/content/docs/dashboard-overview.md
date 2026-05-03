---
title: Dashboard overview
description: Understand the main Kobbe dashboard, KPIs, charts, and breakdown cards.
order: 12
category: Get started
navLabel: Dashboard
---

The site dashboard is the main place to understand traffic for one website. It combines headline KPIs, a trend chart, revenue cards when configured, and breakdown cards for pages, sources, locations, and devices.

## Time range and filters

Use the range control at the top of the dashboard to switch between presets, today-style calendar windows, or custom dates. The selected range applies to KPIs, charts, cards, events, funnels, performance, exports, and shared dashboard links.

If your workspace has a default time range or timezone configured, Kobbe uses that preference when building dashboard links.

## KPI strip

The top strip shows:

- **Visitors** — unique anonymous visitor keys for the selected range.
- **Visits** — session-like groups based on activity.
- **Views** — pageviews.
- **Bounce rate** — visits with one pageview.
- **Session time** — average time between first and last pageview in a visit.

Click a KPI to change the main chart metric. Period comparisons appear when the selected range supports a meaningful previous window.

## Traffic chart

The main chart shows the selected KPI over time. Hover a point to inspect that bucket. Click a point to pin it while you move around the chart, then click the same point again to unpin.

When revenue attribution is configured and the selected metric is visitors or visits, Kobbe overlays revenue bars on the same chart. The revenue amount appears in the tooltip.

## Revenue cards

When paid events exist for the selected range, the dashboard shows:

- **Revenue** — total revenue received from configured payment webhooks.
- **Attributed revenue** — revenue that matched an analytics journey.
- **Paid events** — number of payment events.

Attributed revenue can also appear directly on rows in Pages, Sources, Locations, and Devices. Rows without revenue stay blank rather than showing zero.

## Breakdown cards

The dashboard cards answer common questions:

- **Pages** — top pages, entry pages, and exit pages.
- **Sources** — referrers, hostnames, traffic channels, and AI tools.
- **Locations** — countries, regions, and cities.
- **Devices** — browsers, operating systems, and device categories.

Cards show a small preview. If a revenue-attributed row falls outside the top preview, Kobbe still keeps that row visible so you can see where the conversion was credited. Use the expand button when available to open the full list.

## Page drill-down

Click a page row to inspect a single path. The page drill-down uses the same dashboard patterns, filtered to that path, so you can understand traffic, sources, events, and exits for one page.

## Related docs

- [Realtime visitors](/docs/realtime-visitors)
- [Custom events](/docs/custom-events)
- [Funnels](/docs/funnels)
- [Revenue attribution](/docs/revenue-attribution)
- [Shared dashboards](/docs/shared-dashboards)
