---
title: Import from DataFast
description: Pull historical DataFast analytics into Kobbe with a read-only website API key.
order: 40
category: Data
navLabel: Import from DataFast
---

DataFast does not offer a dashboard export, but it does provide a read-only Website API. Kobbe can pull your historical traffic directly from that API and write it into daily dashboard rollups.

## Step 1: Create a DataFast API key

1. Log in to DataFast.
2. Open **Website settings** for the site you want to move.
3. Go to **Developer** (or **API**).
4. Generate a new **website API key** that starts with `df_`.
5. Copy the key. Use a read-only key if DataFast offers scope selection.

## Step 2: Import into Kobbe

1. Open the matching site in Kobbe.
2. Go to **Settings**.
3. Open **Import history**.
4. Choose **DataFast**.
5. Paste the API key.
6. Leave **Fill gaps only** selected if Kobbe is already collecting live traffic.
7. Click **Start import**.

Kobbe uses the key once to fetch history in the background. The key is not stored in Kobbe. You can revoke it in DataFast after the import finishes.

## What gets imported

- Daily visitors, pageviews, and sessions for the main chart and KPI tiles
- Top pages, referrers, countries, devices, browsers, and operating systems as monthly breakdown snapshots

## What does not carry over

- Revenue, payments, goals, and funnels from DataFast
- Hourly or realtime history
- Per-day breakdown rows when the DataFast API only exposes monthly aggregates
- Bounce rate and average session duration in this import path

After import, use **Fill gaps only** so Kobbe keeps live tracking for new days without double-counting history.

## Related docs

- [Import analytics data](/docs/import-analytics-data)
- [Data export](/docs/data-export)
- [Dashboard overview](/docs/dashboard-overview)
