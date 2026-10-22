---
title: Import from Cloudflare Web Analytics
description: Pull the last six months of Cloudflare Web Analytics into Kobbe with an API token.
order: 40.5
category: Data
navLabel: Cloudflare
brandLogo:
  url: ../../images/brands/cloudflare.svg
  alt: Cloudflare logo
---

Kobbe can read your Cloudflare Web Analytics history through the Cloudflare GraphQL API. Cloudflare keeps about six months of Web Analytics data, so that is how far back the import reaches.

## Step 1: Create an API token

1. Log in to the Cloudflare dashboard.
2. Copy your **Account ID**. It is shown on the account overview and in the dashboard URL.
3. Go to **My Profile → API Tokens**.
4. Click **Create Token**, then **Create Custom Token**.
5. Add the permission **Account → Account Analytics → Read**.
6. Under **Account Resources**, include the account that holds your site.
7. Create the token and copy it.

## Step 2: Import into Kobbe

1. Open the matching site in Kobbe.
2. Go to **Settings**.
3. Open **Import history**.
4. Choose **Cloudflare Web Analytics**.
5. Enter the **Account ID** and paste the API token.
6. Check that **Website hostname** matches the site in Web Analytics.
7. Leave **Fill gaps only** selected if Kobbe is already collecting live traffic.
8. Click **Start import**.

Kobbe uses the token once to fetch history in the background. The token is not stored in Kobbe. You can delete it in Cloudflare after the import finishes.

## What gets imported

- Daily visits and pageviews for the main chart and KPI tiles
- Daily top pages, entry pages, referrers, countries, browsers, operating systems, and devices

## Good to know

- Cloudflare does not count unique visitors, so Kobbe uses visits as the visitor count for imported days.
- Cloudflare samples high traffic sites, so imported numbers are estimates.
- Bounce rate, session duration, regions, and cities are not available from Cloudflare.
- Days older than about six months cannot be imported.

## Related docs

- [Import analytics data](/docs/import-analytics-data)
- [Data export](/docs/data-export)
- [Dashboard overview](/docs/dashboard-overview)
