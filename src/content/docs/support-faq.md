---
title: Frequently Asked Questions
description: Answers about Kobbe privacy, analytics data, billing, setup, and support.
order: 71
category: Support
navLabel: FAQ
---

## Privacy and tracking

### Do I need a cookie banner for Kobbe?

Kobbe's default tracker does not use analytics cookies or persistent browser identifiers, and it sends no analytics request when Global Privacy Control or Do Not Track is enabled. Consent requirements still depend on your jurisdiction, site configuration, and whether you enable optional features such as revenue attribution.

### How does Kobbe count unique visitors without cookies?

Kobbe derives a daily rotating, non-reversible identifier from minimized request data. The identifier changes each day, is scoped to the site, and is not used to build long-term visitor profiles.

### Does Kobbe store raw IP addresses?

No. The hosted analytics app is designed around privacy-minimized event records and does not store raw visitor IP addresses in the application database.

### Is Kobbe GDPR friendly?

Kobbe is designed to reduce personal data collection, avoid analytics cookies by default, and support privacy-conscious analytics workflows. Legal obligations still depend on how you configure and use the product.

## Analytics data

### What counts toward my monthly event limit?

Pageviews, custom events, scroll visibility events, and accepted Web Vitals/performance payloads count toward the monthly workspace event limit. Funnels are calculated from the pageviews and custom events you already collect. Revenue webhooks and attribution metadata are handled separately.

### Are bots counted in my stats?

No. Kobbe includes bot filtering for crawlers, referrer spam, and common data-center traffic so your reports stay focused on real visitors.

### How long is analytics data retained?

Paid workspaces keep analytics data for as long as the workspace remains active, unless you delete data or a legal requirement requires removal.

### Can I export my data?

Yes. Kobbe is built for ownership and portability, with export options for teams that need to analyze or archive their analytics data elsewhere.

## Billing and plans

### How does event-based pricing work?

Each plan includes a monthly event allowance for the whole workspace. You choose the tier that matches your traffic volume, and the product remains the same across tiers.

### Is yearly billing discounted?

Yes. Yearly billing gives one month free at every paid tier, so the annual price is eleven months of the monthly plan.

### Is there a free trial?

New paid plans include a 3-day trial so you can set up tracking, review your reports, and confirm the plan fits your usage.

### I saw a Kobbe charge on my statement. What is it?

It is usually a Kobbe subscription charge for a workspace, trial conversion, or renewal. If you do not recognize it, see [charges on your statement](/docs/support-charges) or email support@kobbe.io.

### What happens if I need more than 25 million monthly events?

Contact support and we will help set up a higher-volume plan that fits your traffic and operational needs.

## Setup and support

### Will the script slow down my site?

The tracker is small, loads asynchronously, and avoids blocking the critical rendering path. It is designed to collect analytics without getting in the way of your site.

### Can I use Kobbe with any website?

Yes. Kobbe works with plain HTML sites and common frameworks or platforms, including Astro, Next.js, React Router, WordPress, Shopify, Webflow, and more.

### Can I share dashboards with clients?

Yes. You can create public, read-only dashboard links for clients or teammates and revoke them whenever needed.

### Where do I get help?

Email support@kobbe.io for help with setup, billing, privacy questions, revenue attribution, or anything else around your workspace.
