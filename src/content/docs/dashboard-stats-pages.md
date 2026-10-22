---
title: Pages on the dashboard
description: Top, entered, and exited pages, previews, expansion, and the per-page drill-down.
order: 12.03
category: Dashboard stats
navLabel: Pages
---

The **Pages** breakdown answers where people land, what they view most, and where they leave.

## What you see

| View          | What it shows                                                             |
| ------------- | ------------------------------------------------------------------------- |
| **Top pages** | Paths with the most views in the selected range.                          |
| **Entered**   | Paths where visits started (entry pages).                                 |
| **Exited**    | Paths where visits ended (exit pages).                                    |
| **404s**      | Missing pages visitors hit, with the page that most often linked to them. |
| **Groups**    | Unique visitors per section of your site, using path patterns you define. |

The 404s tab needs a one-line setup on your site, see [404 tracking](/docs/404-tracking).

## Page groups

Groups combine many pages into one row, so you can compare sections like your blog, docs, and pricing instead of reading hundreds of individual paths.

Open the **Groups** tab and choose **Create a group**, or use the pencil icon on the card once you have groups. Each group has a name and a path:

| Path              | Matches                                     |
| ----------------- | ------------------------------------------- |
| `/blog/*`         | `/blog` and every page under it.            |
| `/pricing`        | Only `/pricing`.                            |
| `/docs/*/install` | `/docs/v1/install`, `/docs/v2/install`, etc. |

- `*` is a wildcard that matches any characters.
- A visitor who views several pages in a group counts once for that group.
- A page that fits several groups counts only in the most specific one, so `/blog/guides/*` wins over `/blog/*`.
- Groups follow the selected date range and filters, like the other tabs.
- A site can have up to 20 groups, shared by everyone in the workspace.

## Preview and full list

Cards show a **short preview**. When an expand control is available, use it to open the full list for that breakdown.

## Page drill-down

Click a **page row** to open a drill-down for that path. It reuses the same dashboard patterns, filtered to that path, so you can inspect traffic, sources, events, and exits for a single page.

### Previous and next pages

The Pages card in the drill-down has two tabs that follow visitors through the page:

- **Previous**: the pages viewed right before this one in the same visit. **Visit started here** counts visits that landed on the page.
- **Next**: the pages viewed right after it. **Left the site** counts visits that ended on the page.

Hover a row to see its share of the page's views, and click a path to open its drill-down. A visit ends after 30 minutes without a pageview, and reloading a page does not count as coming from itself.

## Related docs

- [Dashboard overview](/docs/dashboard-overview)
- [Hash page paths](/docs/hash-page-paths)
