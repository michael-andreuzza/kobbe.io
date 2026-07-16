---
title: Import from Plausible
description: Move historical Plausible Analytics data into Kobbe with a ZIP export from site settings.
order: 37
category: Analyze
navLabel: Import from Plausible
---

Keep your historical Plausible data when you switch to Kobbe. The import takes a few minutes once your export is ready.

## Step 1: Export from Plausible

1. Log in to Plausible Analytics.
2. Open **Site settings** for the website you want to export.
3. Scroll to **Imports & exports**.
4. Use **Export data** in site settings. Do **not** use the export button on the chart.
5. Wait for the email with your download link.
6. Download the ZIP file.

Plausible full exports include daily CSV files such as `imported_visitors`, `imported_pages`, `imported_sources`, and related breakdown files.

## Step 2: Import into Kobbe

1. Open the site in Kobbe.
2. Go to **Settings**.
3. Find **Import analytics** in the Actions card.
4. Choose **Fill gaps only** if Kobbe is already collecting live traffic.
5. Upload the Plausible ZIP.
6. Click **Start import**.

Kobbe detects the export format automatically and writes the historical days into your dashboard rollups.

## What gets imported

- Pageview and visitor totals by day
- Referrers and sources
- Pages
- Countries, regions, and cities
- Devices, browsers, and operating systems
- Daily custom event totals

Custom goals from Plausible are not recreated as live Kobbe goals automatically. Set up [conversions](/docs/conversions) or [custom events](/docs/custom-events) again after import if you still need them.

## After the import

Your Plausible history appears beside new Kobbe data in the dashboard. Use **Fill gaps only** to avoid overwriting days where Kobbe is already live.

## Related docs

- [Import analytics data](/docs/import-analytics-data)
- [Import from Fathom](/docs/import-from-fathom)
- [Data export](/docs/data-export)
