---
title: Import from Google Analytics
description: Connect a Google account once and pull your GA4 history into Kobbe with read-only access.
order: 40.1
category: Data
navLabel: Google Analytics
brandLogo:
  url: ../../images/brands/googleanalytics.svg
  alt: Google Analytics logo
---

Kobbe can read your Google Analytics 4 history through the Google Analytics Data API. You sign in with Google, pick a property, and Kobbe imports daily traffic and breakdowns in the background.

Universal Analytics properties are not supported. Google deleted that data in 2024, so only GA4 properties can be imported.

## Step 1: Connect Google Analytics

1. Open the matching site in Kobbe.
2. Go to **Settings**.
3. Open **Import history**.
4. Choose **Google Analytics**.
5. Click **Connect Google Analytics** and sign in with the Google account that can see the property.
6. Allow read-only access to Google Analytics when Google asks.

## Step 2: Import into Kobbe

1. Back in Kobbe, pick the GA4 property to import.
2. Leave **Fill gaps only** selected if Kobbe is already collecting live traffic.
3. Click **Start import**.

Kobbe only uses the connection for this import and does not store it afterwards. To import again later, connect again.

## What gets imported

- Daily visitors, sessions, pageviews, bounces, and session duration for the main chart and KPI tiles
- Daily top pages, entry pages, referrers, countries, regions, cities, browsers, operating systems, devices, and hostnames

## What does not carry over

- GA4 events, key events, conversions, and ecommerce revenue
- Hourly or realtime history
- Campaign and UTM breakdowns
- Rows Google hides behind `(not set)` or `(other)`

GA4 counts visitors with its own identifiers, so imported numbers can differ from what Kobbe measures after you switch. Kobbe stores the imported figures as they come from Google.

## Related docs

- [Import analytics data](/docs/import-analytics-data)
- [Data export](/docs/data-export)
- [Dashboard overview](/docs/dashboard-overview)
