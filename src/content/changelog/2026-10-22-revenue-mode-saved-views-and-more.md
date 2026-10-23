---
title: Revenue mode, saved views, new imports, error tracking, and more
date: 2026-10-22
description: Rank the dashboard by revenue, save your favorite filters, group pages into sections, track JavaScript errors and site search, import from six more tools, and connect WooCommerce, Gumroad, and Chargebee.
image: ../../images/changelog/revenue-mode.webp
imageAlt: The Kobbe dashboard with the Revenue tile selected, pages and referrers ranked by revenue, each with its visitor count.
---

A big day: new dashboard features, two new tracking options, six more import sources, and three more payment providers.

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

**JavaScript error tracking.**

Turn on **Error tracking** in Site settings → Installation → Tracking options, and the Performance page gets a **JavaScript errors** card. Identical errors are grouped, with the file and line, the page and browser where they happen most, and how many visitors hit them. With conversions set up, the card also compares the conversion rate of visitors who hit an error with those who did not. Messages are cleaned before they are stored, and at most 5 errors are sent per page load. It needs `tracker.full.js` and a paid plan. See [JavaScript error tracking](/docs/error-tracking).

**Site search.**

Turn on **Site search** and the Pages card gets a **Searches** tab with the terms visitors type into your search box, ranked by unique visitors. Click a term to filter the whole dashboard to the people who searched for it. Kobbe reads the term from search result URLs like `/search?q=pricing`, and you can set your own parameter name. Terms that look like an email address or a long number are dropped. Site search adds nothing to your monthly usage. See [Site search](/docs/site-search).

**Import from six more tools.**

Your old traffic can now come with you from Google Analytics, Matomo, Simple Analytics, PostHog, Cloudflare Web Analytics, and Pirsch. Every one imports straight from the provider's API, so there is no export file to download first.

- **Google Analytics 4**: click **Connect Google Analytics**, sign in, and pick a property. Kobbe asks for read-only access and does not store the connection afterwards. [Guide](/docs/import-from-google-analytics)
- **Matomo**: enter your Matomo URL, Site ID, and an auth token. Works with Matomo Cloud and self-hosted instances, with daily breakdowns down to the city. [Guide](/docs/import-from-matomo)
- **Simple Analytics**: enter your hostname, plus an API key if your dashboard is private. Breakdowns arrive as monthly snapshots. [Guide](/docs/import-from-simple-analytics)
- **PostHog**: enter your Project ID and a personal API key with Query Read. Works with US and EU Cloud. [Guide](/docs/import-from-posthog)
- **Cloudflare Web Analytics**: enter your Account ID and an API token with Account Analytics Read. Cloudflare keeps about six months of data and has no unique visitors, so visits stand in for visitors. [Guide](/docs/import-from-cloudflare-web-analytics)
- **Pirsch**: paste the ID and secret of an oAuth client. Daily totals are exact, and breakdowns arrive as monthly snapshots. [Guide](/docs/import-from-pirsch)

**Plausible and Umami, by API key.**

No more waiting for an export email. Paste an API key and Kobbe pulls your history directly, from the cloud or a self-hosted instance. For Umami this also brings pages, referrers, countries, and devices, which the ZIP export never had. The ZIP upload still works for both. [Plausible guide](/docs/import-from-plausible), [Umami guide](/docs/import-from-umami)

Keys are used once for the import and never stored. As with every import, **Fill gaps only** imports just the days before your first Kobbe pageview, so live data is never overwritten. Find it all under **Settings → Import history**.

**WooCommerce, Gumroad, and Chargebee revenue.**

Revenue attribution now works with 13 payment providers.

- **WooCommerce**: add an Order updated webhook and a short PHP snippet that stores the attribution ID on each order. Works with the classic and block checkout, and records every order once, as soon as it is paid. [Guide](/docs/revenue-attribution-woocommerce)
- **Gumroad**: paste the Kobbe URL as your Ping endpoint and add `data-gumroad-links="true"` to the tracker. Kobbe tags your Gumroad links, including the overlay, and confirms each sale through the Gumroad API before recording it. [Guide](/docs/revenue-attribution-gumroad)
- **Chargebee**: add a webhook with basic authentication and pass the attribution ID as a subscription custom field or in `meta_data`. Renewals stay attributed to the visit that started the subscription. [Guide](/docs/revenue-attribution-chargebee)

Set them up under **Settings → Integrations → Revenue attribution**.
