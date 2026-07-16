---
title: Import analytics data
description: Bring historical traffic from Plausible, Fathom, and other exports into Kobbe without overwriting live data.
order: 36
category: Analyze
navLabel: Import analytics data
---

Kobbe can import historical analytics from other tools so your dashboard shows older traffic next to new Kobbe data.

Imports write **daily rollup data** into Kobbe. That means KPIs, charts, and breakdown tabs can show your migrated history, but funnels, realtime, and page drilldowns still depend on live Kobbe events collected after you switch.

## Before you import

- Use a **full site export ZIP**, not a quick chart export with row limits.
- Import on the **same site** where you will collect new Kobbe traffic.
- Pick a merge mode so you do not overwrite days Kobbe already has.
- Keep the ZIP under **25 MB**. If your export is larger, split it into shorter date ranges.

Imports run in the background. Large exports can take a minute to process, and the settings page reports the result when the import finishes.

## Merge modes

**Fill gaps only (recommended)**  
Imports days that are missing in Kobbe. If the site already has live data, Kobbe only fills history **before your first Kobbe pageview**.

**Selected date range**  
Imports only the dates you choose. Overlapping days are skipped unless you replace them.

**Replace date range**  
Replaces rollup data for the imported days in the ZIP. Live raw events are not deleted.

## What gets imported

- Visitors, visits, pageviews, bounce visits, and session duration by day
- Top pages, referrers, countries, regions, cities, devices, browsers, and operating systems
- Daily custom event totals when the export includes them

Custom events and conversions from the old tool are not recreated automatically. Re-enable the goals you need in Kobbe after import.

## What does not fully carry over

- Hourly or realtime history
- Funnels and ordered visitor journeys
- Revenue attribution
- Cross-filtered combinations such as "Google traffic on mobile in Germany" from aggregate exports alone

## Supported providers

- [Import from Plausible](/docs/import-from-plausible)
- [Import from Fathom](/docs/import-from-fathom)
- [Import from Umami](/docs/import-from-umami)

If you need another source, contact support with a sample export.

## Plan availability

Analytics import is available on **Starter and higher** plans, the same as data export.

## Related docs

- [Data export](/docs/data-export)
- [Dashboard overview](/docs/dashboard-overview)
- [Filter your visits](/docs/exclude-visits)
