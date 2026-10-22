---
title: Site search
description: See what visitors type into your site's search box, and filter the dashboard by any search term.
order: 32.6
category: Tracking
navLabel: Site search
---

Site search shows what visitors look for on your site. The terms they type into your search box tell you what they expect to find, and what you might be missing.

Site search is off by default and works with both `tracker.js` and `tracker.full.js`.

## Enable site search

Turn on **Site search** in Site settings → Installation → [Tracking options](/docs/tracking-options), or add `data-site-search="true"` to your snippet:

```html
<script
  defer
  data-token="YOUR_SITE_TOKEN"
  data-site-search="true"
  src="https://app.kobbe.io/tracker.js"
></script>
```

When a visitor lands on a search results page like `/search?q=pricing`, the tracker reads the term from the URL and records it with that pageview. By default it checks the `q`, `s`, `search`, `query`, and `term` parameters.

### Custom search parameter

If your search uses a different parameter, enter it under **Search parameter** in Tracking options, or set it on the script tag. Separate several names with commas, up to 5:

```html
data-site-search-param="keyword"
```

### Search boxes that don't change the URL

Some searches, like a popup that opens on a keyboard shortcut, never put the term in the URL. Add it to the link of the result the visitor picks instead, for example `/docs/install?q=install`. The tracker records the term on the page they open.

## Dashboard

Open the **Searches** tab on the Pages card to see the top search terms by unique visitors. Click a term to filter the whole dashboard to visitors who searched for it, for example to see where they came from or whether they converted.

## Privacy

Search terms are cleaned before they are stored:

- Terms are lowercased and extra spaces are removed, so `Pricing ` and `pricing` count as one term.
- Terms are cut to 80 characters.
- Terms that look like an email address or contain more than 6 digits are dropped, so personal details typed into a search box are not stored.

The rest of the query string is still stripped from stored paths.

## Usage

Search terms are stored on the pageview, so site search does not add any events to your monthly usage.

## Related docs

- [Pages on the dashboard](/docs/dashboard-stats-pages)
- [Script options](/docs/script-options)
- [Tracking options](/docs/tracking-options)
