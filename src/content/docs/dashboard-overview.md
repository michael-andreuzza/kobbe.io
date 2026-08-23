---
title: Dashboard overview
description: Understand the main Kobbe dashboard, KPIs, charts, and breakdown cards.
order: 12
category: Get started
navLabel: Dashboard
---

The site dashboard is the main place to understand traffic for one website. It combines headline KPIs, a trend chart, and breakdown cards for pages, sources, locations, devices, Search Console, and events.

Use the sidebar to open dedicated pages when you need more detail:

| Page         | Doc                                              |
| ------------ | ------------------------------------------------ |
| **Events**   | [Events activity log](/docs/events-activity-log) |
| **Revenue**  | [Revenue](/docs/revenue)                         |
| **Realtime** | [Realtime visitors](/docs/realtime-visitors)     |
| **Bots**     | [Bot filtering](/docs/script-options#bot-filtering-and-exclusions) — review filtered automated traffic |

## Time range and filters

Use the range control at the top of the dashboard to switch between presets, today-style calendar windows, or custom dates. The selected range applies to KPIs, charts, cards, events, funnels, performance, exports, and shared dashboard links.

If your workspace has a default time range or timezone configured, Kobbe uses that preference when building dashboard links.

## Comparisons

Use **Add comparison** to compare the active overview range against a previous period, week, month, quarter, year, or a custom comparison range. The comparison updates the KPI deltas and adds a dashed line to the main traffic chart so you can see the current trend against the comparison window.

Choosing **No comparison** hides the KPI deltas and comparison chart line. All-time ranges do not show comparisons because there is no clear previous window.

## KPI strip

The headline metrics (visitors, visits, views, bounce rate, and session time) are described in [Dashboard KPIs](/docs/dashboard-stats-kpis).

## Traffic chart

The main chart shows the selected KPI over time. Hover a point to inspect that bucket. Click a point to pin it while you move around the chart, then click the same point again to unpin.

## Chart notes

Pin a day on the traffic chart to keep its tooltip open while you move around the chart. From the pinned tooltip you can add labeled notes for that day, such as a product launch, pricing change, or campaign start.

Each note has a color and short label. Notes appear as markers on day-bucket charts in the selected range. You can edit or delete notes from the pinned tooltip.

Chart notes are disabled on demo workspaces and read-only shared dashboards.

## Breakdown cards

Each card has a dedicated reference page under **Dashboard stats** in the sidebar:

| Card               | Doc                                                                     |
| ------------------ | ----------------------------------------------------------------------- |
| **Pages**          | [Pages on the dashboard](/docs/dashboard-stats-pages)                   |
| **Sources**        | [Sources on the dashboard](/docs/dashboard-stats-sources)               |
| **Locations**      | [Locations on the dashboard](/docs/dashboard-stats-locations)           |
| **Devices**        | [Devices on the dashboard](/docs/dashboard-stats-devices)               |
| **Search Console** | [Search Console on the dashboard](/docs/dashboard-stats-search-console) |
| **Events**         | [Events on the dashboard](/docs/dashboard-stats-events)                 |

Cards show a small preview. Use the expand control when available to open the full list.

## Conversion peak

The **Conversion peak** heatmap at the bottom of the dashboard shows when custom events happen most often by day of week and hour of day. Darker cells mean more events in that bucket. Hover a cell for the exact count.

The heatmap uses custom events only. If you have not sent custom events in the range, the card stays empty.

## Page drill-down

Click a page row to inspect a single path. See [Pages on the dashboard](/docs/dashboard-stats-pages).

## Related docs

- [Events activity log](/docs/events-activity-log)
- [Realtime visitors](/docs/realtime-visitors)
- [Custom events](/docs/custom-events)
- [Funnels](/docs/funnels)
- [Shared dashboards](/docs/shared-dashboards)
