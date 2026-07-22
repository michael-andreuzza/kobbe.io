---
title: Events activity log
description: Browse pageviews and custom events in a paginated log with filters, context columns, and CSV export.
order: 12.09
category: Dashboard stats
navLabel: Events activity log
---

The **Events** page is an activity explorer for one site. Use it when you want to inspect individual pageviews and custom events instead of only summary cards on the overview dashboard.

Open it from the sidebar, or use **Activity log** on the overview **Events** card.

## Activity log tabs

The log has three tabs:

| Tab | What it lists |
| --- | ------------- |
| **All** | Pageviews and custom events together. |
| **Views** | Pageviews only. |
| **Events** | Custom events only. |

A summary line above the table shows counts for the active tab and selected time range.

## Filter by event name

On the **Events** tab, use the **All events** control in the top toolbar to filter the log to one custom event name. The list and summary update for that event. Switching to **All** or **Views** clears the event filter.

Event names come from your tracked custom events in the range. Unknown names in the URL are ignored.

## Table columns

Each row includes:

| Column | Meaning |
| ------ | ------- |
| **Event** | Event name, or the page path on the **Views** tab. |
| **Page** | Path where the event fired (hidden on **Views** when the path is the primary column). |
| **Referrer** | Referrer origin when available. |
| **Country** | Country flag when available. |
| **Time** | When the event was recorded. |

Use **Load more** at the bottom to fetch additional rows. Pagination keeps your tab, range, and event filter.

## Toolbar actions

The top toolbar matches other dashboard pages:

- **Top events** returns to the overview dashboard **Events** card for the same range.
- **Export CSV** downloads pageviews and custom events for preset ranges (same export as site settings). Custom date ranges hide export because CSV export currently supports preset windows only.

## Time range

The range control applies to the log, summary counts, and event name list. Changing range resets pagination.

## Related docs

- [Events on the dashboard](/docs/dashboard-stats-events)
- [Custom events](/docs/custom-events)
- [Data export](/docs/data-export)
- [Dashboard overview](/docs/dashboard-overview)
