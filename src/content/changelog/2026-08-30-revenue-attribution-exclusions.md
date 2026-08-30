---
title: Exclude pages from revenue attribution
date: 2026-08-30
description: Thank-you pages can no longer claim last-touch revenue credit. Exclude them in site settings; the change applies retroactively.
---

Post-checkout thank-you pages could claim revenue credit: their pageview lands right before the payment webhook, so last-touch attribution saw them as the "last page before purchase" even though they did no selling.

You can now exclude pages under **Settings → Exclusions → Revenue attribution**. Excluded pages keep counting in traffic, conversions, and funnels; they just never take revenue credit. The change applies retroactively to past purchases. Details in [Filter your visits](/docs/exclude-visits#revenue-attribution-pages).
