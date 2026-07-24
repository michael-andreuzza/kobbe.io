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

Kobbe offers event tiers from **20,000 monthly events** up to **25,000,000 monthly events** on a single product. Pick the volume that fits your traffic on the [pricing page](/#pricing). **Every product feature is included** at every step. You pay for monthly event capacity, not feature tiers.

What changes as you move the slider:

- **Monthly event cap** (the main difference between tiers).
- **Data retention** (1 to 5 years of historical analytics, shown on the pricing page for each volume).
- **Monthly email reports** (included from **5M monthly events**).

Paid plans include **unlimited websites** per workspace.

The slider starts at 20K, then jumps to 100K before stepping through 250K, 500K, and 750K up to 1M so you can upgrade gradually. For the complete list of volumes and prices, see [All event volumes](#all-event-volumes) below.

Yearly billing saves **2 months** compared to paying monthly at every tier. Need more than 25 million monthly events? Email support and we can help you pick the right setup.

Checkout, subscriptions, receipts, and billing management run through **Polar** from the app's billing settings. The app billing page is the source of truth for your workspace's active tier.

## Monthly event caps

Event caps are enforced per workspace and reset monthly in UTC. When a workspace reaches its monthly cap, Kobbe stops ingesting additional analytics events for that workspace until the next reset or plan change.

Use [visit filters](/docs/exclude-visits) and [Reduce usage](/docs/reduce-usage) to avoid spending quota on internal traffic, staging sites, noisy paths, or traffic you do not need to analyze.

## Site limits

Paid plans include **unlimited websites** per workspace. During a free trial or without an active subscription, the app may limit how many sites you can create. Upgrade or start a trial to remove that cap.

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
