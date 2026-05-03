---
title: Billing and usage limits
description: Understand Kobbe plans, monthly event caps, site limits, and how to reduce unnecessary usage.
order: 61
category: Manage
navLabel: Billing and limits
---

Kobbe plans include a monthly event allowance per workspace. Pageviews, custom events, and other analytics hits count toward usage according to the active plan.

Plans and limits can change over time. The billing page in the app is the source of truth for your current workspace.

## Plans

Kobbe currently offers:

- **Starter** — for one website or a focused side project.
- **Growth** — for multiple websites or heavier traffic.

You can manage billing from the app's billing settings. Checkout and subscription management are handled by the billing provider.

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
- Funnel step events because they are based on pageviews and custom events.

Revenue webhooks and performance samples may have separate handling internally, but you should still treat optional features as traffic you intentionally enable.

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
