---
title: Import from Rybbit
description: Pull historical Rybbit data into Kobbe with your Site ID and an API key, from Rybbit Cloud or a self-hosted instance.
order: 40.7
category: Data
navLabel: Rybbit
brandLogo:
  url: ../../images/brands/rybbit.svg
  alt: Rybbit logo
---

Kobbe can read your history from the Rybbit API. It works with Rybbit Cloud and with self-hosted Rybbit.

## Step 1: Find your Site ID and create an API key

1. Log in to Rybbit and open the site you want to move.
2. Copy the **Site ID**: the number after `app.rybbit.io/` in the dashboard URL.
3. Go to **Settings → Organization** or **Settings → Account** and create an **API key**.

On Rybbit Cloud, API keys need a Standard or Pro plan.

## Step 2: Import into Kobbe

1. Open the matching site in Kobbe.
2. Go to **Settings**.
3. Open **Import history**.
4. Choose **Rybbit**.
5. Paste the **Site ID** and **API key**.
6. Self-hosted only: enter your Rybbit URL, for example `https://rybbit.example.com`.
7. Leave **Fill gaps only** selected if Kobbe is already collecting live traffic.
8. Click **Start import**.

Kobbe uses the key once to fetch history in the background. The key is not stored in Kobbe. You can delete it in Rybbit after the import finishes.

## What gets imported

- Daily visitors, visits, pageviews, bounces, and session duration for the main chart and KPI tiles
- Top pages, entry pages, referrers, countries, regions, cities, browsers, operating systems, devices, and hostnames

Rybbit ranks breakdowns over a whole period, so Kobbe imports them as monthly snapshots with the top 100 values per month. Daily totals stay exact.

## What does not carry over

- Events, goals, and funnels
- Session replays and user profiles
- Hourly or realtime history

## Related docs

- [Import analytics data](/docs/import-analytics-data)
- [Data export](/docs/data-export)
- [Dashboard overview](/docs/dashboard-overview)
