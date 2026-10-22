---
title: Import from Umami
description: Move historical Umami Analytics data into Kobbe with an API key or a ZIP export.
order: 39
category: Data
navLabel: Umami
brandLogo:
  url: ../../images/brands/umami.svg
  alt: Umami logo
---

Keep your historical Umami data when you switch to Kobbe. There are two ways to import:

- **API key** (recommended): Kobbe pulls daily totals plus pages, referrers, countries, and devices from Umami Cloud or a self-hosted instance.
- **ZIP export**: upload the data export from Umami Cloud. This restores daily totals and custom event totals only.

## Import with an API key

1. Log in to Umami.
2. Open **Settings → API keys** and create a key. On self-hosted Umami, use a user with access to the website.
3. Open the matching site in Kobbe.
4. Go to **Settings** and open **Import history**.
5. Choose **Umami**, then **API key**.
6. Paste the key and check that **Website domain** matches the website in Umami.
7. For self-hosted Umami, enter your **Self-hosted URL**. Leave it empty for Umami Cloud.
8. Leave **Fill gaps only** selected if Kobbe is already collecting live traffic.
9. Click **Start import**.

Kobbe uses the key once to fetch history in the background. The key is not stored in Kobbe.

### What the API import brings

- Daily visitors and pageviews
- Pages, entry pages, referrers, countries, cities, browsers, operating systems, devices, and hostnames

Umami ranks breakdowns over a whole period, so Kobbe imports them as monthly snapshots with the top 100 values per month. Umami's time series has no bounce rate or session duration, so those stay empty for imported days.

## Import with a ZIP export

### Step 1: Export from Umami

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

### Step 2: Import into Kobbe

1. Open the site in Kobbe.
2. Go to **Settings** and open **Import history**.
3. Choose **Umami**, then **ZIP export**.
4. Choose **Fill gaps only** if Kobbe is already collecting live traffic.
5. Upload the Umami ZIP.
6. Click **Start import**.

### What the ZIP import brings

- Visitors, visits, and pageviews by day
- Daily custom event totals from Umami custom events

Umami exports raw events rather than pre-aggregated reports, so Kobbe rolls them up into daily totals. Pages, referrers, countries, and device breakdowns are **not** imported from the ZIP. Use the API key import if you need them.

Bounce rate and session duration are not reconstructed from Umami exports in this version.

Large exports are fine: the import runs in the background and streams the event file, so date ranges with hundreds of thousands of events process in under a minute.

## If a ZIP import fails

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
