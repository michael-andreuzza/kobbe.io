---
title: Shared dashboards
description: Share read-only dashboards with clients and teammates.
order: 5
---

Kobbe lets you create public, read-only dashboard links that anyone can access without logging in. Useful for sharing traffic data with clients, teammates, or stakeholders.

## How to enable

1. Go to the **Settings** page of a site.
2. In the **Public dashboard** section, click **Enable**.
3. A unique shareable URL is generated. Copy and send it to anyone who needs access.

## Managing access

- **Regenerate** — click the regenerate button to create a new URL and invalidate the old one.
- **Revoke** — click **Revoke** to disable public access entirely.

## Security

Share tokens are stored as SHA-256 hashes. Revoking or regenerating a link immediately invalidates the previous token. The public dashboard is read-only and cannot be used to modify site settings.
