---
title: Import from Plausible
description: Move historical Plausible Analytics data into Kobbe with a Stats API key or a ZIP export.
order: 37
category: Data
navLabel: Plausible
brandLogo:
  url: ../../images/brands/plausible.svg
  alt: Plausible logo
---

Keep your historical Plausible data when you switch to Kobbe. There are two ways to import:

- **API key** (recommended): Kobbe pulls daily history straight from Plausible. No waiting for an export email.
- **ZIP export**: upload the full export from Plausible site settings. This also brings daily custom event totals.

## Import with an API key

1. Log in to Plausible Analytics.
2. Open **Account settings → API keys** and create a key, choosing **Stats API**.
3. Open the matching site in Kobbe.
4. Go to **Settings** and open **Import history**.
5. Choose **Plausible**, then **API key**.
6. Paste the key and check that **Site domain** matches the site in Plausible.
7. For self-hosted Plausible, enter your **Self-hosted URL**. Leave it empty for Plausible Cloud.
8. Leave **Fill gaps only** selected if Kobbe is already collecting live traffic.
9. Click **Start import**.

Kobbe uses the key once to fetch history in the background. The key is not stored in Kobbe. You can delete it in Plausible after the import finishes.

The API import includes data you previously imported into Plausible from other tools, and brings the same totals and breakdowns as the ZIP export, except custom events.

## Import with a ZIP export

### Step 1: Export from Plausible

1. Log in to Plausible Analytics.
2. Open **Site settings** for the website you want to export.
3. Scroll to **Imports & exports**.
4. Use **Export data** in site settings. Do **not** use the export button on the chart.
5. Wait for the email with your download link.
6. Download the ZIP file.

Plausible full exports include daily CSV files such as `imported_visitors`, `imported_pages`, `imported_sources`, and related breakdown files.

### Step 2: Import into Kobbe

1. Open the site in Kobbe.
2. Go to **Settings** and open **Import history**.
3. Choose **Plausible**, then **ZIP export**.
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
- Daily custom event totals (ZIP export only)

Custom goals from Plausible are not recreated as live Kobbe goals automatically. Set up [conversions](/docs/conversions) under **Settings → Conversions** or [custom events](/docs/custom-events) again after import if you still need them.

## After the import

Your Plausible history appears beside new Kobbe data in the dashboard. Use **Fill gaps only** to avoid overwriting days where Kobbe is already live.

## Related docs

- [Import analytics data](/docs/import-analytics-data)
- [Import from Fathom](/docs/import-from-fathom)
- [Data export](/docs/data-export)
