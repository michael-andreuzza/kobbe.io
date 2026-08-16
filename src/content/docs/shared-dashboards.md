---
title: Shared dashboards
description: Share read-only dashboards with clients and teammates.
order: 33
category: Sharing
navLabel: Shared dashboards
---

Kobbe lets you create public, read-only dashboard links that anyone can access without logging in. Useful for sharing traffic data with clients, teammates, or stakeholders.

## How to enable

1. Open the site in Kobbe.
2. Go to **Settings**.
3. Open the **Sharing** tab.
4. Find **Public dashboard**.
5. Choose when the link should expire: never, 7 days, 30 days, or 90 days.
6. Enable the link.
7. Copy the generated URL and send it to anyone who needs read-only access.

Shared dashboard links are useful for client reporting, public project stats, team updates, and investor or stakeholder visibility.

## What viewers can see

Shared links show the site overview dashboard only:

- KPI strip and traffic chart for the selected date range
- Pages, sources, locations, devices, and custom event breakdowns

Settings, billing, token management, exports, exclusions, realtime, and funnel editing are never available from a shared link.

## Managing access

| Action         | What it does                                 |
| -------------- | -------------------------------------------- |
| **Regenerate** | Create a new URL and invalidate the old one. |
| **Save**       | Update when the current link expires.        |
| **Revoke**     | Disable public access entirely.              |

## Security

The public dashboard is read-only. Anyone with the link can view the dashboard, but they cannot change site settings, rotate tokens, create events, or manage share links.

Revoking or regenerating a link immediately invalidates the previous URL. Expired links stop working automatically.

## Embed widgets

If you want a compact analytics card on your marketing site instead of a full dashboard link, use [Embed widgets](/docs/embed-widgets). That feature has its own token, expiry, and iframe snippets.

If you want live visitor counts in an iframe, use the **Live** embed widget there. Shared dashboard links do not include realtime.

If you want a one-off chart image for social posts or updates, use [Share metric images](/docs/share-metric-images) from the overview traffic chart.
