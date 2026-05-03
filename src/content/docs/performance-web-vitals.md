---
title: Performance and Web Vitals
description: Collect optional real-user Web Vitals samples and inspect page, device, browser, and country performance.
order: 38
category: Analyze
navLabel: Performance
---

Kobbe can collect real-user performance samples when you opt in with the tracker. These samples power the **Performance** dashboard for Core Web Vitals and related page-load metrics.

Performance collection is off by default.

## Enable performance tracking

Add `data-performance="true"` to your tracker snippet:

```html
<script
  defer
  data-token="YOUR_SITE_TOKEN"
  data-performance="true"
  src="https://app.kobbe.io/tracker.js"
></script>
```

After visitors generate enough samples, open the site's **Performance** page from the sidebar.

## Metrics

Kobbe can collect:

- **LCP** — Largest Contentful Paint.
- **INP** — Interaction to Next Paint.
- **CLS** — Cumulative Layout Shift.
- **FCP** — First Contentful Paint.
- **TTFB** — Time to First Byte.

Availability depends on browser support and the page lifecycle. Some browsers or visits may not produce every metric.

## Dashboard

The Performance dashboard shows:

- Summary cards for the selected metric.
- A trend chart over the selected time range.
- Slowest pages by p75.
- Device, browser, and country breakdowns by p75.
- Sample counts so you can judge how much data backs each row.

p75 means the 75th percentile. If a page has p75 LCP of `2.5s`, 75% of collected samples were at or below that value and 25% were slower.

## Privacy

Performance samples are separate from custom events. They are collected only when `data-performance="true"` is present and are not shown in the Events feed.

Performance payloads include the current page path, browser/device/location hints already used for analytics breakdowns, and the metric values. Do not enable performance collection unless it fits your privacy notice and legal basis.

## Related docs

- [Script options](/docs/script-options)
- [Dashboard overview](/docs/dashboard-overview)
- [Privacy and cookieless tracking](/docs/privacy-and-cookieless-tracking)
