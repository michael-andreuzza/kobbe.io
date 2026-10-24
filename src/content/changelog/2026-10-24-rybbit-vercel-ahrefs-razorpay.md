---
title: Import from Rybbit, Vercel, and Ahrefs, plus Razorpay revenue
date: 2026-10-24
description: Bring your history from Rybbit, Vercel Web Analytics, and Ahrefs Web Analytics, and attribute Razorpay payments to the visits that led to them.
---

Three more import sources and one more payment provider.

**Import from three more tools.**

Each one imports straight from the provider's API. Keys are used once and never stored, and **Fill gaps only** keeps your live data untouched.

- **Rybbit**: enter your Site ID and an API key. Works with Rybbit Cloud and self-hosted instances. [Guide](/docs/import-from-rybbit)
- **Vercel Web Analytics**: enter your project, team, and an access token. Kobbe imports as far back as your Vercel plan keeps data. Vercel has no sessions, so visits equal visitors for imported days. [Guide](/docs/import-from-vercel)
- **Ahrefs Web Analytics**: enter your Project ID and an API key. Daily totals plus top pages, entry pages, and referrers. [Guide](/docs/import-from-ahrefs)

Find them under **Settings → Import history**.

**Razorpay revenue.**

Add a webhook for `payment.captured` and `refund.processed`, pass `kobbe_attribution_id` in the payment notes, and each sale shows up next to the page and source that brought the buyer in. Refunds are subtracted automatically. Revenue attribution now works with 14 payment providers. [Guide](/docs/revenue-attribution-razorpay)
