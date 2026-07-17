---
title: Embed widgets
description: Embed compact analytics cards on your marketing site or app.
order: 34
category: Sharing
navLabel: Embed widgets
---

Kobbe embed widgets are small iframe cards you can place on a marketing site, landing page, or app. They show read-only analytics without asking visitors to open the dashboard.

Widgets use a **separate embed token** from the [shared dashboard](/docs/shared-dashboards). You can enable either feature on its own, or both at the same time.

## Widget types

| Widget | What it shows |
| ------ | ------------- |
| **Chart** | Visitor count for the last hour, a compact trend chart, and top countries. |
| **Realtime** | How many people are on your site right now. |

## How to enable

1. Open the site in Kobbe.
2. Go to **Settings**.
3. Open the **Widgets** card.
4. Turn on **Enable embed widgets**.
5. Pick **Chart** or **Realtime** to preview the design.
6. Customize **Chart color** and **Theme** (light, dark, or system).
7. Copy the **Embed code** snippet for the active tab.
8. Paste the snippet into your site HTML where you want the card to appear.

The snippet includes the iframe and a small resize script so the card height stays correct after the page loads.

## Customization

| Option | What it does |
| ------ | ------------ |
| **Chart color** | Sets the accent color on the chart line and live dot. |
| **Theme** | Forces light or dark styling, or follows the visitor's system theme. |

Color and theme are saved for the site and included in the embed URL automatically. You do not need to edit the snippet by hand after changing options.

## Managing the embed link

| Action | What it does |
| ------ | ------------ |
| **Link expiry** | Choose when the embed token should stop working: never, 7 days, 30 days, or 90 days. |
| **Save expiry** | Apply a new expiry to the current embed token. |
| **Regenerate token** | Create a new embed token and invalidate the old one. Update any pages that still use the previous snippet. |
| **Disable** | Turn off embed widgets and revoke the current embed token. |

## Where to paste the snippet

Paste the full snippet anywhere you can add HTML, footers, sidebars, Astro/React/Vue pages, Webflow embed blocks, and similar.

The iframe is responsive up to 360px wide. On narrow layouts it scales down with the page.

## Security

Embed widgets are read-only. Visitors who load the iframe cannot change site settings, rotate your tracking token, or access billing.

Each site gets its own embed token (`embed_…`). Revoking, regenerating, or letting the link expire stops the old snippet from loading new data.
