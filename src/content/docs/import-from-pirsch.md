---
title: Import from Pirsch
description: Pull historical Pirsch Analytics data into Kobbe with an oAuth client from your dashboard settings.
order: 40.6
category: Data
navLabel: Pirsch
brandLogo:
  url: ../../images/brands/pirsch.svg
  alt: Pirsch logo
---

Kobbe can read your history from the Pirsch API. You need an oAuth client with read access. Access keys only send data to Pirsch and cannot be used for an import.

## Step 1: Create an oAuth client

1. Log in to Pirsch and open the dashboard you want to move.
2. Go to **Settings → Integration**.
3. Under **Clients**, click **Add client**.
4. Choose the **oAuth** type and give it read access.
5. Copy the **Client ID** and the **Client secret**. The secret is only shown once.

## Step 2: Import into Kobbe

1. Open the matching site in Kobbe. Its domain must match the Pirsch dashboard.
2. Go to **Settings**.
3. Open **Import history**.
4. Choose **Pirsch**.
5. Paste the **Client ID** and **Client secret**.
6. Leave **Fill gaps only** selected if Kobbe is already collecting live traffic.
7. Click **Start import**.

Kobbe uses the client once to fetch history in the background. The secret is not stored in Kobbe. You can delete the client in Pirsch after the import finishes.

## What gets imported

- Daily visitors, visits, pageviews, bounces, and session duration for the main chart and KPI tiles
- Top pages, entry pages, referrers, countries, regions, cities, browsers, operating systems, and devices

Pirsch ranks breakdowns over a whole period, so Kobbe imports them as monthly snapshots with the top 100 values per month. Daily totals stay exact.

## What does not carry over

- Events, goals, and funnels
- UTM campaign reports
- Hourly or realtime history

## Related docs

- [Import analytics data](/docs/import-analytics-data)
- [Data export](/docs/data-export)
- [Dashboard overview](/docs/dashboard-overview)
