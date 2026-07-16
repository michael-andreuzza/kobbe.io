---
title: Import from Umami
description: Move historical Umami Analytics data into Kobbe with a ZIP export from Umami Cloud.
order: 39
category: Analyze
navLabel: Import from Umami
---

Keep your historical Umami data when you switch to Kobbe.

## Step 1: Export from Umami

1. Log in to Umami Cloud.
2. Open your account menu, then **Settings**.
3. Go to **Data → Export**.
4. Choose the website and date range you want to migrate.
5. Wait for the email with your download link.
6. Download the ZIP file.

Umami exports usually include:

- `website_event.csv` (required)
- `session.csv` or `session_data.csv` (optional, helps countries/devices)
- `event_data.csv` (optional)

Kobbe reads `website_event.csv` inside the ZIP and rolls it up into daily dashboard history.

## Step 2: Import into Kobbe

1. Open the site in Kobbe.
2. Go to **Settings**.
3. Find **Import analytics** in the Actions card.
4. Choose **Fill gaps only** if Kobbe is already collecting live traffic.
5. Upload the Umami ZIP.
6. Click **Start import**.

## What gets imported

- Visitors, visits, and pageviews by day
- Daily custom event totals from Umami custom events

Umami exports raw events rather than pre-aggregated reports, so Kobbe rolls them up into daily totals. Pages, referrers, countries, and device breakdowns are **not** imported from Umami yet.

Bounce rate and session duration are not reconstructed from Umami exports in this version.

Large exports are fine: the import runs in the background and streams the event file, so date ranges with hundreds of thousands of events process in under a minute.

## If import fails

- **Use the ZIP file** from Umami's email link, not the unzipped folder.
- **Keep the ZIP under 25 MB.** If your export is larger, split it into shorter date ranges in Umami.
- If Kobbe is already collecting live traffic, use **Fill gaps only** or pick a **date range** that does not overlap days Kobbe already has.
- If you see a specific error in the toast, follow that message first.

## After the import

Use the same merge modes described in [Import analytics data](/docs/import-analytics-data) to keep live Kobbe traffic safe.

## Related docs

- [Import analytics data](/docs/import-analytics-data)
- [Import from Plausible](/docs/import-from-plausible)
- [Import from Fathom](/docs/import-from-fathom)
