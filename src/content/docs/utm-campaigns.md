---
title: UTM campaigns
description: Track marketing campaign traffic, conversions, and attributed revenue with opt-in UTM capture.
order: 12.05
category: Dashboard stats
navLabel: Campaigns
---

Kobbe can report campaign performance from standard UTM parameters when you opt in on the tracker script.

Campaign tracking is off by default. When enabled, Kobbe reads only these allowlisted fields from the current URL:

- `utm_source`
- `utm_medium`
- `utm_campaign`
- `utm_term`
- `utm_content`

Kobbe still stores page paths without query strings. Full URLs, private tokens, and unrelated query parameters are not stored.

## UTM fields

Use the standard UTM fields to describe where the visit came from:

- `utm_source` is the place sending traffic, like `newsletter`, `google`, `linkedin`, or `producthunt`.
- `utm_medium` is the channel type, like `email`, `cpc`, `social`, or `affiliate`.
- `utm_campaign` is the campaign name, like `launch`, `upgrade`, or `black-friday`.
- `utm_term` is optional and is mostly used for paid search keywords, like `privacy analytics tool`.
- `utm_content` is optional and helps distinguish different links in the same campaign, like `hero-link`, `footer-link`, or `pricing-button`.

## Enable campaign tracking

Add `data-campaigns="true"` to the tracker:

```html
<script
  defer
  data-token="YOUR_SITE_TOKEN"
  data-campaigns="true"
  src="https://app.kobbe.io/tracker.js"
></script>
```

Then send visitors to URLs such as:

```text
https://example.com/pricing?utm_source=newsletter&utm_medium=email&utm_campaign=launch
```

## Revenue by campaign

Revenue by campaign needs both campaign tracking and revenue attribution:

```html
<script
  defer
  data-token="YOUR_SITE_TOKEN"
  data-campaigns="true"
  data-revenue-attribution="true"
  src="https://app.kobbe.io/tracker.full.js"
></script>
```

Follow [Revenue attribution](/docs/revenue-attribution) to pass `kobbe_attribution_id` through checkout and connect payment webhooks back to campaign journeys.

## What you see

The Campaigns page shows:

- campaign visitors and pageviews
- conversions from custom events
- top campaigns, sources, mediums, and source / medium pairs
- attributed orders and revenue when revenue attribution is enabled

## Privacy notes

Campaign capture is intentionally narrow. Kobbe does not store the original query string, does not store arbitrary URL parameters, and does not turn UTM parameters into a persistent visitor profile.

Review your privacy notice before enabling campaign or revenue attribution, especially if your checkout flow or marketing stack requires consent in your jurisdiction.

## Related docs

- [Script options](/docs/script-options)
- [Sources on the dashboard](/docs/dashboard-stats-sources)
- [Revenue attribution](/docs/revenue-attribution)
