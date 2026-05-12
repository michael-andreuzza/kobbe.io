---
title: Billing and usage limits
description: Understand Kobbe plans, monthly event caps, site limits, and how to reduce unnecessary usage.
order: 61
category: Manage
navLabel: Billing and limits
---

Kobbe plans are based on a monthly event allowance per workspace. Pageviews, custom events, scroll visibility events, and accepted Web Vitals/performance payloads count toward usage according to the active tier.

Plans and limits can change over time. The billing page in the app is the source of truth for your current workspace.

## Plans

Kobbe currently offers event tiers from **100,000 monthly events** up to **25,000,000 monthly events**. Every paid tier includes the same product features; the tier mainly changes monthly event allowance and billing amount.

Yearly billing gives one month free at every tier. For traffic above the published tiers, contact support so we can help with a higher-volume plan.

You can manage billing from the app's billing settings. Checkout and subscription management are handled by the billing provider, and the app billing page is the source of truth for the workspace's active tier.

## Monthly event caps

Event caps are enforced per workspace and reset monthly in UTC. When a workspace reaches its monthly cap, Kobbe stops ingesting additional analytics events for that workspace until the next reset or plan change.

Use [traffic exclusions](/docs/exclude-visits) and [Reduce usage](/docs/reduce-usage) to avoid spending quota on internal traffic, staging sites, noisy paths, or traffic you do not need to analyze.

## Site limits

Plans can also limit how many websites you can create in one workspace. If you hit the site limit, upgrade the workspace or remove an unused site.

## What counts as usage

Typical usage includes:

- Pageviews.
- Custom events.
- Scroll visibility events.
- One accepted Web Vitals/performance collect payload when performance tracking is enabled.
- Funnel steps because they are based on pageviews and custom events already collected by the tracker.

Revenue webhooks and attribution metadata are handled separately from the monthly event counter, but you should still enable optional features intentionally and avoid sending personal data.

## What happens when usage is blocked

When usage is blocked by a cap or exclusion, Kobbe avoids storing the event. Bot-filtered traffic is also dropped before it reaches your dashboard or usage totals.

If numbers look lower than expected, check:

1. Your workspace billing status and usage.
2. Traffic exclusions.
3. Browser opt-out via `localStorage.kobbe_ignore`.
4. Token validity in the install snippet.
5. Network responses from `/api/collect`.

## Related docs

- [Reduce usage](/docs/reduce-usage)
- [Exclude visits](/docs/exclude-visits)
- [Script options](/docs/script-options)
- [Data export](/docs/data-export)
