---
title: Import from Ahrefs Web Analytics
description: Pull historical Ahrefs Web Analytics data into Kobbe with your Project ID and an API key.
order: 40.9
category: Data
navLabel: Ahrefs
brandLogo:
  url: ../../images/brands/ahrefs.svg
  alt: Ahrefs logo
---

Kobbe can read your history from the Ahrefs API. You need an API key, which requires an Ahrefs plan with API access.

## Step 1: Find your Project ID and create an API key

1. Log in to Ahrefs and open **Web Analytics** for the site you want to move.
2. Copy the **Project ID**: the number in the Web Analytics URL.
3. Go to **Account settings → API keys** and create a key.

## Step 2: Import into Kobbe

1. Open the matching site in Kobbe.
2. Go to **Settings**.
3. Open **Import history**.
4. Choose **Ahrefs Web Analytics**.
5. Paste the **Project ID** and **API key**.
6. Leave **Fill gaps only** selected if Kobbe is already collecting live traffic.
7. Click **Start import**.

Kobbe uses the key once to fetch history in the background. The key is not stored in Kobbe. You can delete it in Ahrefs after the import finishes.

## What gets imported

- Daily visitors, visits, pageviews, bounces, and session duration for the main chart and KPI tiles
- Top pages, entry pages, and referrers

Breakdowns are monthly snapshots with the top 100 values per month. Daily totals stay exact.

## What does not carry over

- Countries, browsers, operating systems, and devices
- Events and goals
- Hourly or realtime history

## Related docs

- [Import analytics data](/docs/import-analytics-data)
- [Data export](/docs/data-export)
- [Dashboard overview](/docs/dashboard-overview)
