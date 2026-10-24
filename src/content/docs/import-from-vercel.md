---
title: Import from Vercel Web Analytics
description: Pull historical Vercel Web Analytics data into Kobbe with your project name and an access token.
order: 40.8
category: Data
navLabel: Vercel
brandLogo:
  url: ../../images/brands/vercel.svg
  alt: Vercel logo
---

Kobbe can read your history from the Vercel Web Analytics API. How far back it goes depends on your Vercel plan, because Vercel only keeps data for a limited window.

## Step 1: Find your project and create a token

1. Log in to Vercel and open the project you want to move.
2. Copy the **project name** or the project ID from **Settings → General**.
3. If the project belongs to a team, copy the **team slug** or team ID from the team's **Settings → General**.
4. Go to **Account Settings → Tokens** and create a token scoped to that team.

## Step 2: Import into Kobbe

1. Open the matching site in Kobbe.
2. Go to **Settings**.
3. Open **Import history**.
4. Choose **Vercel Web Analytics**.
5. Paste the **Project**, the **Team** (leave it empty for a personal account), and the **Access token**.
6. Leave **Fill gaps only** selected if Kobbe is already collecting live traffic.
7. Click **Start import**.

Kobbe uses the token once to fetch history in the background. The token is not stored in Kobbe. You can delete it in Vercel after the import finishes.

## What gets imported

- Daily visitors and pageviews for the main chart and KPI tiles
- Top pages, referrers, countries, browsers, operating systems, and devices

Kobbe imports the longest window your plan allows. Breakdowns are monthly snapshots with the top 100 values per month.

## What does not carry over

- Sessions, bounces, and session duration: Vercel does not report them, so visits equal visitors for imported days
- Custom events and UTM reports
- Days older than your plan's retention window

## Related docs

- [Import analytics data](/docs/import-analytics-data)
- [Data export](/docs/data-export)
- [Dashboard overview](/docs/dashboard-overview)
