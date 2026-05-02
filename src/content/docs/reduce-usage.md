---
title: Reduce usage
description: Keep analytics useful by excluding low-value traffic and avoiding unnecessary events.
order: 13
category: Manage
navLabel: Reduce usage
---

If your event volume is higher than expected, first check whether all tracked traffic is actually useful. Kobbe can drop low-value traffic **before it counts toward quotas** with [traffic exclusions](/docs/exclude-visits).

## Start with low-value traffic

Common candidates:

- Internal dashboards such as `/app/*`.
- Admin tools such as `/admin/*`.
- Preview, staging, or QA hostnames.
- Your own browser with `localStorage.kobbe_ignore = "true"`.
- Countries you do not serve, when the traffic is clearly not useful.

For example, a SaaS might care most about marketing pages, signup, checkout, and onboarding. Logged-in app traffic can be noisy if product analytics already live somewhere else.

## Do not exclude conversion paths

Be careful with pages that explain whether your marketing works:

- Signup, checkout, payment success, and onboarding pages.
- Landing pages used in campaigns.
- Funnel steps you measure in Kobbe.
- Pages where custom events fire, such as `Signup completed` or `Checkout started`.

If you exclude a conversion page or event, Kobbe cannot include it in dashboards or funnels.

## Watch optional tracking features

Optional features can increase event volume:

- [Hash page paths](/docs/hash-page-paths) can add pageviews on `hashchange`.
- [Scroll tracking](/docs/scroll-tracking) adds one custom event per marked section per page visit.
- [Cross-domain tracking](/docs/cross-domain-tracking) can make more of a multi-domain journey visible in one site.

These are useful when configured intentionally. Keep event names and marked sections focused on decisions you actually make.

## Use exclusions

Use [Exclude visits](/docs/exclude-visits) to configure:

- Path rules.
- Hostname rules.
- Country rules.
- IP rules.
- Browser-level ignore for your own device.

Exclusions apply before events are stored or counted toward quotas.

## Related

- [Exclude visits](/docs/exclude-visits)
- [Script options](/docs/script-options)
- [Funnels](/docs/funnels)
