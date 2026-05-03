---
title: Shared dashboards
description: Share read-only dashboards with clients and teammates.
order: 33
category: Sharing
navLabel: Shared dashboards
---

Kobbe lets you create public, read-only dashboard links that anyone can access without logging in. Useful for sharing traffic data with clients, teammates, or stakeholders.

You can choose what each link shows and when it expires.

## How to enable

1. Open the site in Kobbe.
2. Go to **Settings**.
3. Find **Public dashboard**.
4. Choose what the link can show:
   - **Overview + realtime** — viewers can see the main dashboard and realtime page.
   - **Overview only** — viewers can only see the main dashboard.
   - **Realtime only** — viewers can only see the realtime page.
5. Choose when the link should expire: never, 7 days, 30 days, or 90 days.
6. Enable the link.
7. Copy the generated URL and send it to anyone who needs read-only access.

Shared dashboard links are useful for client reporting, public project stats, team updates, and investor or stakeholder visibility.

## What viewers can see

Shared links expose only the selected read-only surface:

- **Overview** includes the main dashboard cards, trend chart, and breakdowns for the selected site.
- **Realtime** includes the live visitor view and online activity.
- Settings, billing, token management, exports, exclusions, funnel editing, and revenue source configuration are never available from a shared link.

If revenue cards or attributed revenue rows are visible on the shared overview, they are read-only summaries. Viewers cannot access payment provider secrets, webhook URLs, or site settings.

## Managing access

- **Regenerate** — create a new URL and invalidate the old one.
- **Save** — update what the current link can show or when it expires.
- **Revoke** — disable public access entirely.

## Security

The public dashboard is read-only. Anyone with the link can view the dashboard, but they cannot change site settings, rotate tokens, create events, or manage share links.

Revoking or regenerating a link immediately invalidates the previous URL. Expired links stop working automatically.
