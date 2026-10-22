---
title: Import from PostHog
description: Pull historical PostHog web analytics into Kobbe with a personal API key, from US or EU Cloud.
order: 40.4
category: Data
navLabel: PostHog
brandLogo:
  url: ../../images/brands/posthog.svg
  alt: PostHog logo
---

Kobbe can read your pageview history from PostHog with a personal API key. It works with PostHog US Cloud and EU Cloud.

## Step 1: Create a personal API key

1. Log in to PostHog.
2. Open **Settings** and note the **Project ID** under **Project**.
3. Go to **Settings → Personal API keys**.
4. Click **Create personal API key**.
5. Give it a name, limit it to the project you want to move, and select the **Query Read** scope.
6. Copy the key. It starts with `phx_`.

## Step 2: Import into Kobbe

1. Open the matching site in Kobbe.
2. Go to **Settings**.
3. Open **Import history**.
4. Choose **PostHog**.
5. Pick your **Region** (US Cloud or EU Cloud).
6. Enter the **Project ID** and paste the personal API key.
7. Leave **Fill gaps only** selected if Kobbe is already collecting live traffic.
8. Click **Start import**.

Kobbe uses the key once to fetch history in the background. The key is not stored in Kobbe. You can delete it in PostHog after the import finishes.

## What gets imported

- Daily visitors, visits, pageviews, bounces, and session duration for the main chart and KPI tiles
- Daily top pages, entry pages, referrers, countries, regions, cities, browsers, operating systems, and devices

Kobbe reads `$pageview` events only. Each breakdown keeps the top 50 values per day.

## What does not carry over

- Custom events, actions, and insights
- Feature flags, experiments, and session recordings
- Person profiles and individual events
- Hourly or realtime history

## If import fails

- Make sure the key has the **Query Read** scope and access to the project.
- Check that the region matches where your project lives. EU projects open at `eu.posthog.com`.
- Very large projects can hit PostHog's query limits. Start the import again later and Kobbe picks up the remaining days with **Fill gaps only**.

## Related docs

- [Import analytics data](/docs/import-analytics-data)
- [Data export](/docs/data-export)
- [Dashboard overview](/docs/dashboard-overview)
