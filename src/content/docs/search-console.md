---
title: Google Search Console
description: Connect Google Search Console to import search queries, clicks, impressions, and ranking data into Kobbe.
order: 39
category: Analyze
navLabel: Search Console
---

Connect Google Search Console to import queries, clicks, and landing-page data next to your Kobbe analytics. Numbers are usually delayed **1–3 days** by Google.

## What Kobbe imports

Kobbe imports Search Console rows for the verified property you select:

- Search queries
- Landing pages
- Clicks
- Impressions
- Average position
- Click-through rate

The overview highlights top search terms and can estimate revenue attribution by matching Search Console query/page data with Kobbe's page and revenue analytics.

## Requirements

Before connecting, make sure:

1. The site is verified in Google Search Console.
2. Your Google account can view the Search Console property.
3. The property matches the Kobbe site domain or URL prefix.
4. You are a workspace owner or manager in Kobbe.

Kobbe only requests read-only Search Console access.

## Connect Search Console

1. Open the site in Kobbe.
2. Go to **Site settings → Integrations**.
3. Under **Google Search Console**, click **Connect Search Console**.
4. Sign in with the Google account that can access the property.
5. Pick the matching Search Console property.
6. Save the property.

After the property is saved, Kobbe can sync Search Console data and show search terms in the site overview.

## Choosing a property

Google may return both domain properties and URL-prefix properties. Choose the property that best matches the site you track in Kobbe.

If you track `example.com` in Kobbe, a domain property such as `sc-domain:example.com` is usually the best match. If your Search Console setup only has URL-prefix properties, choose the prefix that matches the canonical site URL.

## Disconnect or reconnect

You can reconnect Search Console from **Site settings → Integrations** if you need to change Google accounts or refresh access.

Disconnecting removes the Google link and deletes synced Search Console rows for that site. It does not remove Kobbe pageviews, events, revenue data, tokens, or site settings.

## Troubleshooting

If no properties appear, confirm that the Google account has access to the site in Google Search Console. You may need to verify the site in Search Console first, then reconnect in Kobbe.

If data looks stale, wait for Google's reporting delay to pass. Search Console data is not realtime.
