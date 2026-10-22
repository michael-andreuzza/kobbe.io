---
title: Import from Matomo
description: Pull historical Matomo traffic into Kobbe from Matomo Cloud or a self-hosted instance.
order: 40.3
category: Data
navLabel: Matomo
brandLogo:
  url: ../../images/brands/matomo.svg
  alt: Matomo logo
---

Kobbe can read your history from the Matomo Reporting API. It works with Matomo Cloud and with self-hosted Matomo, as long as the instance is reachable over HTTPS.

## Step 1: Create an auth token

1. Log in to Matomo.
2. Open **Administration** (the gear icon).
3. Go to **Personal → Security**.
4. Under **Auth tokens**, click **Create new token** and copy it.
5. Note the **Site ID** of the website you want to move. You can find it under **Websites → Manage**.

The token needs at least view access to that website.

## Step 2: Import into Kobbe

1. Open the matching site in Kobbe.
2. Go to **Settings**.
3. Open **Import history**.
4. Choose **Matomo**.
5. Enter your Matomo URL, for example `https://example.matomo.cloud`.
6. Enter the **Site ID** and paste the auth token.
7. Leave **Fill gaps only** selected if Kobbe is already collecting live traffic.
8. Click **Start import**.

Kobbe uses the token once to fetch history in the background. The token is not stored in Kobbe. You can delete it in Matomo after the import finishes.

## What gets imported

- Daily visitors, visits, pageviews, bounces, and session duration for the main chart and KPI tiles
- Daily top pages, entry pages, referrers, countries, regions, cities, browsers, operating systems, and devices

## What does not carry over

- Goals, events, and ecommerce
- Hourly or realtime history
- Visitor logs and individual visits

Some Matomo instances do not keep unique visitor counts for older days. For those days, Kobbe uses the visit count as the visitor count.

## Related docs

- [Import analytics data](/docs/import-analytics-data)
- [Data export](/docs/data-export)
- [Dashboard overview](/docs/dashboard-overview)
