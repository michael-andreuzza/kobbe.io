---
title: Tracking options
description: Enable tracker features from the Kobbe dashboard or from data attributes on your install snippet.
order: 25.5
category: Tracking
navLabel: Tracking options
---

Kobbe can read tracker settings from your HTML or from the dashboard. Hardcode `data-*` attributes in your layout, use toggles under Site settings → Installation → Tracking options, or combine both.

## Where to find it

Open a site in Kobbe, go to Site settings, open the Installation tab, and scroll to Tracking options. Click Save tracking options after you change toggles.

The Install block on the same tab shows your snippet:

| Tab | What it copies |
| --- | --- |
| Minimal | Token only. Enable features in Tracking options (recommended). |
| Explicit | Includes `data-*` attributes that match your saved dashboard toggles. |

## Dashboard toggles vs script attributes

Each feature has an On / Off switch:

| Toggle | Meaning |
| --- | --- |
| Off | Kobbe does not override this feature. The tracker uses your script tag `data-*` attributes, or the default when an attribute is missing. |
| On | Kobbe enables this feature from the dashboard. Saved settings override any hardcoded `data-*` value for that feature on your live site. |

After you save, the tracker loads merged settings from `/api/collect-config` on each page load. You do not need to redeploy your site when you only change dashboard toggles.

## Features you can configure

| Tracking options toggle | Script attribute | Notes |
| --- | --- | --- |
| UTM campaigns | `data-campaigns="true"` | See [UTM campaigns](/docs/utm-campaigns). |
| Hash page paths | `data-track-hash="true"` | See [Hash page paths](/docs/hash-page-paths). |
| Web Vitals | `data-performance="true"` | Requires `tracker.full.js`. See [Performance and Web Vitals](/docs/performance-web-vitals). |
| Auto conversions | `data-conversions="true"` | See [Conversions](/docs/conversions). |
| Debug logging | `data-analytics-debug="true"` | Logs failed collect responses in the browser console. Remove after debugging. |
| Cross-domain | `data-allowed-hostnames="host1,host2"` | Requires `tracker.full.js`. When the toggle is On, enter allowed hostnames in the dashboard field. See [Cross-domain tracking](/docs/cross-domain-tracking). |

The site token (`data-token`) and optional collect endpoint (`data-endpoint`) are always set on the script tag. [First-party collect](/docs/first-party-collect) is configured in site settings, not in Tracking options.

## Recommended setups

### Dashboard-first (minimal snippet)

1. Paste the Minimal install snippet once in your global layout.
2. Turn features On in Tracking options and save.
3. Switch to `tracker.full.js` only when you need Web Vitals, cross-domain handoff, or scroll tracking.

### Code-first (explicit snippet)

1. Add `data-*` attributes to your script tag (or copy the Explicit snippet from site settings).
2. Leave matching toggles Off so the script tag remains the source of truth.
3. Use dashboard toggles later if you want to enable a feature without editing deployed HTML.

### Mixed

Leave toggles Off for features you control in code. Turn On only for features you want Kobbe to manage centrally (for example UTM campaigns on a marketing site where engineers prefer a token-only snippet).

## See also

[Add the tracker](/docs/add-the-tracker) · [Script options](/docs/script-options) · [Installation guides](/docs/installation-guides)
