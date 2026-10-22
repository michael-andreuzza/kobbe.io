---
title: JavaScript error tracking and site search
date: 2026-10-22T15:00:00Z
description: See the JavaScript errors your visitors run into and whether they cost you conversions, and find out what people type into your site's search box.
---

Two new tracking options, both off until you turn them on.

**JavaScript error tracking.**

Turn on **Error tracking** in Site settings → Installation → Tracking options, and the Performance page gets a **JavaScript errors** card. Identical errors are grouped, with the file and line, the page and browser where they happen most, and how many visitors hit them. With conversions set up, the card also compares the conversion rate of visitors who hit an error with those who did not. Messages are cleaned before they are stored, and at most 5 errors are sent per page load. It needs `tracker.full.js` and a paid plan. See [JavaScript error tracking](/docs/error-tracking).

**Site search.**

Turn on **Site search** and the Pages card gets a **Searches** tab with the terms visitors type into your search box, ranked by unique visitors. Click a term to filter the whole dashboard to the people who searched for it. Kobbe reads the term from search result URLs like `/search?q=pricing`, and you can set your own parameter name. Terms that look like an email address or a long number are dropped. Site search adds nothing to your monthly usage. See [Site search](/docs/site-search).
