---
title: Kobbe for Raycast
date: 2026-08-29
description: Search sites, view overview metrics, top pages and sources, revenue, and setup health from Raycast, with live visitors in the menu bar.
image: /images/changelog/raycast-extension.webp
imageAlt: Kobbe site overview in Raycast, showing live visitors, traffic metrics, revenue, and top pages for the last 7 days.
---

Inspect Kobbe analytics from Raycast on macOS and Windows. Search for **Kobbe** in Raycast to install it.

## Commands

- **Live Visitors**. Visitor count in the menu bar, across all your sites.
- **Search Sites**. List sites and open the dashboard.
- **Site Overview**. Live traffic, engagement, revenue, top pages, and top sources, with a range switcher.
- **Top Pages**. Highest-traffic pages for a site.
- **Top Sources**. Where traffic comes from.
- **Revenue**. Revenue totals with page and source context.
- **Setup Health**. Tracker installation and revenue webhook status.

## Setup

1. Open Kobbe → **Agent access**
2. Create a token named `Raycast`
3. Enable **Read sites**, **Read analytics**, and **Read revenue**
4. Copy the token (starts with `kbpat`)
5. Open a Kobbe command in Raycast and set:
   - **API Token**. Your `kbpat` token.
   - **Kobbe Base URL**. `https://app.kobbe.io`
   - **Default Range**. Last 7 days, or whatever you prefer.
