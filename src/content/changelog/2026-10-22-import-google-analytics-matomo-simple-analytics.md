---
title: Import from Google Analytics, Matomo, and Simple Analytics
date: 2026-10-22T16:00:00Z
description: Three more ways to bring your history into Kobbe. Connect Google Analytics, or pull from Matomo and Simple Analytics through their APIs. No export files needed.
---

Your old traffic can now come with you from three more tools. All three import straight from the provider's API, so there is no export file to download first.

**Google Analytics 4.** Click **Connect Google Analytics**, sign in, and pick a property. Kobbe asks for read-only access, imports daily traffic plus pages, referrers, locations, and devices, and does not store the connection afterwards. [Guide](/docs/import-from-google-analytics)

**Matomo.** Enter your Matomo URL, Site ID, and an auth token. Works with Matomo Cloud and self-hosted instances, and brings over daily breakdowns down to the city. [Guide](/docs/import-from-matomo)

**Simple Analytics.** Enter your hostname, plus an API key if your dashboard is private. Breakdowns arrive as monthly snapshots, since that is what the Stats API offers. [Guide](/docs/import-from-simple-analytics)

As with every import, **Fill gaps only** imports just the days before your first Kobbe pageview, so live data is never overwritten. Find it under **Settings → Import history**.
