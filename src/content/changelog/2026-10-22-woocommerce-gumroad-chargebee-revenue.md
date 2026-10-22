---
title: WooCommerce, Gumroad, and Chargebee revenue
date: 2026-10-22T19:00:00Z
description: Revenue attribution now works with WooCommerce stores, Gumroad products, and Chargebee subscriptions. 13 payment providers in total.
---

Three more ways to see which pages and campaigns lead to a sale.

**WooCommerce.** Add an Order updated webhook in WooCommerce and a short PHP snippet that stores the attribution ID on each order. Works with the classic and block checkout, and records every order once, as soon as it is paid. [Guide](/docs/revenue-attribution-woocommerce)

**Gumroad.** Paste the Kobbe URL as your Ping endpoint and add `data-gumroad-links="true"` to the tracker. Kobbe tags your Gumroad links, including the overlay, and confirms each sale through the Gumroad API before recording it. [Guide](/docs/revenue-attribution-gumroad)

**Chargebee.** Add a webhook with basic authentication and pass the attribution ID as a subscription custom field or in `meta_data`. Renewals stay attributed to the visit that started the subscription. [Guide](/docs/revenue-attribution-chargebee)

Set them up under **Settings → Integrations → Revenue attribution**.
