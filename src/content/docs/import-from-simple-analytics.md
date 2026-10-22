---
title: Import from Simple Analytics
description: Pull historical Simple Analytics traffic into Kobbe through its Stats API.
order: 40.2
category: Data
navLabel: Simple Analytics
brandLogo:
  url: ../../images/brands/simpleanalytics.svg
  alt: Simple Analytics logo
---

Kobbe can pull your Simple Analytics history directly from its Stats API and write it into daily dashboard rollups. No export file is needed.

## Step 1: Get an API key (private sites only)

Public Simple Analytics dashboards need no key. If your dashboard is private:

1. Log in to Simple Analytics.
2. Open **Account settings**.
3. Go to **API keys** and create a new key.
4. Copy the key.

## Step 2: Import into Kobbe

1. Open the matching site in Kobbe.
2. Go to **Settings**.
3. Open **Import history**.
4. Choose **Simple Analytics**.
5. Enter the hostname exactly as it appears in Simple Analytics, for example `example.com`.
6. Paste the API key if the dashboard is private.
7. Leave **Fill gaps only** selected if Kobbe is already collecting live traffic.
8. Click **Start import**.

Kobbe uses the key once to fetch history in the background. The key is not stored in Kobbe. You can delete it in Simple Analytics after the import finishes.

## What gets imported

- Daily visitors and pageviews for the main chart and KPI tiles
- Top pages, referrers, countries, browsers, operating systems, and devices as monthly breakdown snapshots

## What does not carry over

- Sessions, bounce rate, and session duration, because Simple Analytics does not track them. Visits match visitors in this import.
- Regions and cities
- Events and goals
- Daily breakdown rows, because the Stats API only returns breakdowns for a whole period

## Related docs

- [Import analytics data](/docs/import-analytics-data)
- [Data export](/docs/data-export)
- [Dashboard overview](/docs/dashboard-overview)
