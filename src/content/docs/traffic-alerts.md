---
title: Traffic alerts
description: Get opt-in email alerts when traffic spikes or drops.
order: 47
category: Reports and alerts
navLabel: Traffic alerts
---

Traffic alerts email you when a site's recent pageview volume changes sharply compared with its recent baseline. They are off by default and can be enabled from **Site settings → Reports and alerts**.

Alerts use aggregate analytics data Kobbe has already collected. They do not add browser tracking, cookies, or visitor identifiers.

## How alerts work

Kobbe compares the last 24 hours of pageviews with the site's recent daily baseline. In the first version:

- A spike is detected when traffic is roughly 2.5× above baseline.
- A drop is detected when traffic falls below roughly 50% of baseline.
- Low-volume changes are ignored to reduce noise.
- Alerts are deduplicated so a site does not receive the same alert repeatedly for the same day.

These alerts are designed to catch obvious changes, not explain every fluctuation. Use the dashboard to inspect sources, pages, countries, devices, and events after an alert.

## Availability

Traffic alerts are intended for paid workspaces and are opt-in per site. You can disable them any time from site settings.

## Related docs

- [Monthly reports](/docs/monthly-reports)
- [Dashboard overview](/docs/dashboard-overview)
- [Reduce usage](/docs/reduce-usage)
