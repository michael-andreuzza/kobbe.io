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

Kobbe offers event tiers from **100,000 monthly events** up to **25,000,000 monthly events**. Every paid tier includes the same product features; tiers mainly differ in monthly event allowance, site limits, and billing amount.

The **Hobby** plan is limited to **3 websites** per workspace. **Starter** allows up to **30 websites**. Growth and higher tiers allow up to **50 websites**.

The homepage shows Hobby, Starter, and Growth as common starting points. For the complete list of all event volumes and prices, see [All event volumes](#all-event-volumes) below.

Yearly billing saves about **44%** compared to paying monthly at every tier. Need more than 25 million monthly events? Email support and we can help you pick the right setup.

Checkout, subscriptions, receipts, and billing management run through **Polar** from the app's billing settings. The app billing page is the source of truth for your workspace's active tier.

## Monthly event caps

Event caps are enforced per workspace and reset monthly in UTC. When a workspace reaches its monthly cap, Kobbe stops ingesting additional analytics events for that workspace until the next reset or plan change.

Use [visit filters](/docs/exclude-visits) and [Reduce usage](/docs/reduce-usage) to avoid spending quota on internal traffic, staging sites, noisy paths, or traffic you do not need to analyze.

## Site limits

Plans can also limit how many websites you can create in one workspace. If you hit the site limit, upgrade the workspace or remove an unused site.

## What counts as usage

Typical usage includes:

- Pageviews.
- Custom events.
- Scroll visibility events.
- One accepted Web Vitals/performance collect payload when performance tracking is enabled.
- Funnel steps because they are based on pageviews and custom events already collected by the tracker.

Optional features such as scroll tracking, cross-domain tracking, and Web Vitals are handled separately from the monthly event counter. Enable them intentionally and avoid sending personal data in event names or properties.

## What happens when usage is blocked

When usage is blocked by a cap or exclusion, Kobbe avoids storing the event. Bot-filtered traffic is also dropped before it reaches your dashboard or usage totals.

If numbers look lower than expected, check:

1. Your workspace billing status and usage.
2. Visit filters.
3. Browser opt-out via `localStorage.kobbe_ignore`.
4. Token validity in the install snippet.
5. Network responses from `/api/collect`.
