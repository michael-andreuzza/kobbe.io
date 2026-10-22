---
title: Import from PostHog, Cloudflare, and Pirsch
date: 2026-10-22T17:00:00Z
description: Three more import sources, plus API key imports for Plausible and Umami. Paste a key and Kobbe pulls your history in the background.
---

Three more tools can now hand over their history, and two existing ones got a faster route.

**PostHog.** Enter your Project ID and a personal API key with Query Read. Works with US and EU Cloud, and brings daily traffic plus pages, referrers, locations, and devices. [Guide](/docs/import-from-posthog)

**Cloudflare Web Analytics.** Enter your Account ID and an API token with Account Analytics Read. Cloudflare keeps about six months of data, and it has no unique visitors, so visits stand in for visitors. [Guide](/docs/import-from-cloudflare-web-analytics)

**Pirsch.** Paste the ID and secret of an oAuth client. Daily totals are exact, and breakdowns arrive as monthly snapshots. [Guide](/docs/import-from-pirsch)

**Plausible and Umami, by API key.** No more waiting for an export email. Paste an API key and Kobbe pulls your history directly, from the cloud or a self-hosted instance. For Umami this also brings pages, referrers, countries, and devices, which the ZIP export never had. The ZIP upload still works for both. [Plausible guide](/docs/import-from-plausible), [Umami guide](/docs/import-from-umami)

Keys are used once for the import and never stored. Find it all under **Settings → Import history**.
