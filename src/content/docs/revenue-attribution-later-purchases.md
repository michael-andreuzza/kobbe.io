---
title: Attribute sales that happen later
description: Save the attribution ID at signup so trials, invoices, and return purchases still trace back to the visit that earned them.
order: 37.5
category: Revenue attribution
navLabel: Sales after signup
---

The attribution ID lives in `sessionStorage`, so it only lasts as long as the browser tab. When a visitor signs up today and pays next week, on another device, or after a free trial, the checkout runs in a new session with no ID, and the sale shows up as unattributed.

The fix stays cookieless: save the ID with the account when the visitor signs up, then send that saved ID with the checkout whenever they pay. The link lives in your own database, and Kobbe still never sees an email or a name.

## When to use this

- Free trials that convert days or weeks later
- Accounts that upgrade from inside your app instead of from your marketing site
- Quotes, invoices, or sales calls that end in a payment link
- Buyers who sign up on mobile and pay on desktop

If visitors usually pay in the same visit, the regular [checkout metadata](/docs/revenue-attribution#checkout-metadata) setup already covers them.

## 1. Load the tracker on the signup page

The signup page needs the full tracker with revenue attribution turned on, the same as your checkout pages:

```html
<script
  defer
  data-token="YOUR_SITE_TOKEN"
  data-revenue-attribution="true"
  src="https://app.kobbe.io/tracker.full.js"
></script>
```

## 2. Send the ID with the signup

Read the ID in the browser and submit it with the signup form, for example as a hidden field:

```html
<input type="hidden" name="kobbe_attribution_id" id="kobbe-attribution-id" />

<script>
  window.addEventListener("load", () => {
    const id = window.kobbe?.getAttributionId?.() ?? window.kobbe?.attributionId;
    if (id) document.getElementById("kobbe-attribution-id").value = id;
  });
</script>
```

If you sign up visitors with `fetch` instead of a form, add the same value to the request body.

## 3. Store it on the account

Save the value on the user or customer record when you create it. Keep the first value you receive and never overwrite it on later logins.

```sql
ALTER TABLE users ADD COLUMN kobbe_attribution_id TEXT;
```

The ID is a random value scoped to one browser tab. It carries no personal data, so storing it next to the account adds nothing new to your privacy notice beyond what revenue attribution already requires.

## 4. Pass it when they pay

When you create the checkout on your server, read the stored ID and send it as `kobbe_attribution_id`, using the field your provider documents. Kobbe matches it against the visits it recorded, no matter how much later the payment arrives.

Stripe Checkout, one-time payments and subscriptions:

```js
const session = await stripe.checkout.sessions.create({
  mode: "subscription",
  line_items: [{ price: priceId, quantity: 1 }],
  client_reference_id: user.kobbe_attribution_id ?? undefined,
  subscription_data: user.kobbe_attribution_id
    ? { metadata: { kobbe_attribution_id: user.kobbe_attribution_id } }
    : undefined,
  success_url,
  cancel_url,
});
```

Setting `subscription_data.metadata` lets `invoice.paid` renewals trace back to the same visit. See [Stripe revenue attribution](/docs/revenue-attribution-stripe) for which events to enable.

Polar:

```js
const checkout = await polar.checkouts.create({
  products: [productId],
  metadata: user.kobbe_attribution_id
    ? { kobbe_attribution_id: user.kobbe_attribution_id }
    : {},
});
```

Paddle:

```js
Paddle.Checkout.open({
  items: [{ priceId, quantity: 1 }],
  customData: user.kobbe_attribution_id
    ? { kobbe_attribution_id: user.kobbe_attribution_id }
    : undefined,
});
```

Every other provider reads the same `kobbe_attribution_id` key from the field listed on its page: metadata, custom data, cart or note attributes, subscriber attributes, or a custom field.

## 5. Match the lookback to your sales cycle

Kobbe only credits visits inside the lookback window, counted back from the payment date. The default is 30 days. With a 14-day trial and buyers who take a week to decide, pick 90 days in the **Revenue** page settings so the original visit still counts.

## Signup on a different domain

The ID does not follow visitors across domains on its own. If your marketing site is `example.com` and signup happens on `app.example.com`, add the ID to your signup links and read it from the URL on the app side:

```js
const id = window.kobbe?.getAttributionId?.() ?? window.kobbe?.attributionId;
document.querySelectorAll('a[href^="https://app.example.com/signup"]').forEach((a) => {
  const url = new URL(a.href);
  if (id) url.searchParams.set("kobbe_attribution_id", id);
  a.href = url.toString();
});
```

On the app, read `kobbe_attribution_id` from the signup URL and store it on the new account as in step 3.

## Related docs

- [Revenue attribution](/docs/revenue-attribution)
- [Stripe revenue attribution](/docs/revenue-attribution-stripe)
- [Revenue page](/docs/revenue)
