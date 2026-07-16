---
title: Import from Fathom
description: Move historical Fathom Analytics data into Kobbe with a daily ZIP export.
order: 38
category: Analyze
navLabel: Import from Fathom
---

Keep your historical Fathom data when you switch to Kobbe.

## Step 1: Export from Fathom

You need a **daily** export. Period totals without a date column cannot be imported as a time series.

### Recommended: custom export

1. Open your site in Fathom.
2. Go to **Settings → Exports** or choose **Custom Export** from the dashboard export menu.
3. Pick **Pageviews** as the data type.
4. Set **Date grouping** to **Day**.
5. Choose the date range you want to migrate.
6. Download the ZIP or CSV bundle Fathom provides.

### Dashboard ZIP export

Fathom dashboard ZIP files can work when they include daily rows in `Summary.csv` or per-dimension files with a date column. If Kobbe reports that no daily rows were found, create a custom export with **Day** grouping instead.

## Step 2: Import into Kobbe

1. Open the site in Kobbe.
2. Go to **Settings**.
3. Find **Import analytics** in the Actions card.
4. Choose **Fill gaps only** if Kobbe is already collecting live traffic.
5. Upload the Fathom ZIP.
6. Click **Start import**.

## What gets imported

- Visitors, visits, and pageviews by day when the export includes daily rows
- Pages, referrers, countries, regions, cities, devices, browsers, and operating systems
- Daily event totals when `Events.csv` includes dates

Revenue and event values from Fathom are not imported into Kobbe revenue attribution.

## After the import

Use the same merge modes described in [Import analytics data](/docs/import-analytics-data) to keep live Kobbe traffic safe.

## Related docs

- [Import analytics data](/docs/import-analytics-data)
- [Import from Plausible](/docs/import-from-plausible)
- [Data export](/docs/data-export)
