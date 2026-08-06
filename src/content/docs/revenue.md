---
title: Revenue
description: Attribution KPIs, product breakdowns, and purchase journeys for one site.
order: 33.2
category: Analyze
navLabel: Revenue
---

The **Revenue** page shows how paid orders connect to traffic on your site. Open it from the sidebar after [revenue attribution](/docs/revenue-attribution) is configured and Kobbe has recorded paid events.

Use it when you want to answer questions like which landing pages drive purchases, how long visitors take to buy, or which products earn the most attributed revenue.

## What you see

### Summary KPIs

A KPI strip at the top summarizes the selected range:

| Metric | What it shows |
| ------ | ------------- |
| **Gross revenue** | Sum of paid amounts in the range, with a paid-order count. |
| **Refunds** | Amount refunded in the range, with a refund count. |
| **Net revenue** | Gross revenue minus refunds. |
| **Attributed revenue** | Revenue Kobbe could link to a visit in the lookback window, with an attributed-order count. |
| **Attribution rate** | Share of paid orders that Kobbe attributed to a journey. |
| **Median time to purchase** | Typical elapsed time from first attributed touch to payment. |

These KPIs follow the same time range as the rest of the page.

### Attribution breakdown

The **Attribution breakdown** card ranks where attributed revenue came from. Switch tabs to change the lens:

| Tab | What it shows |
| --- | ------------- |
| **Landing pages** | First page in the attributed journey. |
| **Converting pages** | Last page viewed before purchase. |
| **First source** | Referrer or channel at the start of the journey. |
| **Last source** | Referrer or channel immediately before purchase. |

When channel data is available, source tabs may group referrers into traffic channels instead of listing raw referrers.

### Revenue by product

**Revenue by product** lists each product (or price) with orders, revenue, share of total revenue, and attributed share. Kobbe shows the product name when your payment provider sends it in the webhook payload.

For **Polar**, you can also add an optional [organization access token](/docs/revenue-attribution-polar#product-names-optional) with `products:read` in site settings so Kobbe can resolve names from your Polar catalog—including on orders that arrived before the token was saved. Without a name, the product ID is shown with price and type as secondary detail.

### Recent refunds

When refunds exist in the range, a **Recent refunds** card lists each refund with its date, product, order ID, and amount. Refunds arrive through your payment provider's webhook—for Polar, select the `refund.created` event schema (see [Polar revenue attribution](/docs/revenue-attribution-polar#refunds)).

The card shows the 20 most recent refunds; select **Load more** to reveal older ones.

### Purchase journeys

Two journey cards sit below the product table:

| Card | What it shows |
| ---- | ------------- |
| **Touches before purchase** | How many pageviews or sessions typically happen before an order (bucketed counts). |
| **Top purchase paths** | Common page sequences that led to payment in the range. |

## Toolbar controls

Revenue uses the same **time range** and **Add comparison** controls as the overview dashboard.

Two attribution-specific controls appear in the toolbar for live sites (not the public demo):

| Control | Options |
| ------- | ------- |
| **Lookback window** | 7, 14, 30, or 90 days before each payment. |
| **Attribution model** | Last touch, first touch, or linear credit across touches. |

Changing either setting recalculates attribution breakdowns and journey cards for the active range. Overview revenue overlays and breakdown rows may still use the site default until you align settings across surfaces.

## Export and share

Use the menu in a card header to **export CSV** or open **Share** for a branded table image. Share and export are available on the attribution breakdown, revenue by product, recent refunds, touches before purchase, and top purchase paths cards.

See [Share metric images](/docs/share-metric-images) for background and copy options.

## Setup checklist

If a provider is not connected yet, Kobbe shows a short checklist on the page with links to **revenue integrations** in site settings and reminders to enable `data-revenue-attribution="true"` on your tracker snippet.

When no paid events exist for the range, cards stay empty instead of showing misleading zeros.

## Multi-currency

If more than one currency appears in the range, Kobbe avoids mixing amounts and shows a clear message instead of combined totals.

## Related docs

- [Revenue attribution setup](/docs/revenue-attribution)
- [Revenue on the dashboard overview](/docs/dashboard-stats-revenue)
- [Insights](/docs/insights)
- [Dashboard overview](/docs/dashboard-overview)
- [Share metric images](/docs/share-metric-images)
- [Data export](/docs/data-export)
