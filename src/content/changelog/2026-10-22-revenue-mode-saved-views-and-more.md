---
title: Revenue mode, saved views, page groups, file downloads, and more
date: 2026-10-22
description: Rank the dashboard by revenue, save your favorite filters, group pages into sections, follow visitors from page to page, track file downloads, find search opportunities, and protect shared dashboards with a password.
image: ../../images/changelog/revenue-mode.webp
imageAlt: The Kobbe dashboard with the Revenue tile selected, pages and referrers ranked by revenue, each with its visitor count.
---

Eight additions today.

**Rank the dashboard by revenue.**

With a payment provider connected, select the Revenue tile and every breakdown panel re-sorts by revenue, with bars sized by revenue too. Each row keeps its visitor count, so a quiet page that sells stands out next to a busy one that does not. Click another tile to go back to visitors. See [revenue attribution](/docs/revenue-attribution) to connect a provider.

**Revenue per visitor on every row.**

In revenue mode, each row that earned something also shows what it earns per visitor, for example `$7.27/visitor`, across pages, sources, channels, locations, devices, and campaigns. It is calculated from numbers the dashboard already has, so nothing new is tracked.

**Saved views.**

Filter the dashboard, for example Google visitors on mobile, then choose **Save view** next to your filters. The view shows up in the **Views** menu for everyone in the workspace. A view stores filters, not dates, so it works with whatever range you pick. See [saved views](/docs/dashboard-overview#saved-views).

**Page groups.**

The Pages card has a new **Groups** tab. Create a group with a name and a path like `/blog/*`, which covers `/blog` and everything under it, and see unique visitors per section. Someone who reads five blog posts counts once for Blog. See [page groups](/docs/dashboard-stats-pages#page-groups).

**Previous and next pages.**

Click a page in the Pages card to open its drill-down. Its Pages card now has **Previous** and **Next** tabs: the pages viewed right before and right after it in the same visit, including how many visits started or ended there. The drill-down chart now shows visitors over time for that page. See [previous and next pages](/docs/dashboard-stats-pages#previous-and-next-pages).

**File download tracking.**

A new **File download** conversion preset records clicks on links to files like PDFs, ZIPs, DMGs, and spreadsheets, with the file name and extension, never the full URL. Turn it on in **Settings → Conversions**. Download buttons that point to a redirect, like `/download`, can be tagged with `data-kobbe-event="File download"`. See [file downloads](/docs/conversions#file-downloads).

**Search opportunities.**

The Google search keywords card has an **Opportunities** tab that flags queries worth working on: ones almost on page one, ones where you rank in the top five but get few clicks, and ones where two of your pages compete. It uses the Search Console data Kobbe already syncs, with no new Google permissions. See [Search Console on the dashboard](/docs/dashboard-stats-search-console#opportunities).

**Password-protected shared dashboards.**

In **Settings → Sharing**, add a password of 6 to 128 characters to your shared link. Viewers see a short password screen first and stay unlocked for 30 days. Changing the password locks out everyone who used the old one. See [shared dashboards](/docs/shared-dashboards).
