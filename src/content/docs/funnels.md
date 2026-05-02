---
title: Funnels
description: Measure where visitors continue or drop off across important paths and events.
order: 8
category: Analyze
navLabel: Funnels
---

Funnels help you understand how people move through a flow on your site. A funnel is a list of steps, such as viewing a pricing page, starting signup, and completing signup.

Use funnels for flows where the order matters:

- Marketing page to signup
- Pricing page to checkout
- Trial start to activation
- Product page to purchase
- Documentation page to install action

## Create a funnel

Open your site in Kobbe, go to **Funnels**, and create a funnel with at least two steps.

Each step can be one of two types:

| Step type    | Use it for                          | Example            |
| ------------ | ----------------------------------- | ------------------ |
| Page path    | A pageview on a specific path       | `/pricing`         |
| Custom event | An action tracked with Kobbe events | `Signup completed` |

Keep step names consistent. If your site sends a custom event called `Signup completed`, use that exact event name in the funnel step.

## Read a funnel

The funnel chart shows how many visitors reached each step in order.

- **Visitors** is the number of visitors who reached that step after reaching the previous step.
- **Conversion** is the percentage that moved from the previous step to this step.
- **Drop-off** is the percentage that stopped before reaching this step.
- **Total conversion** is the percentage that reached the final step from the first step.

For example, if 1,000 visitors viewed `/pricing` and 120 completed `Signup completed`, the total conversion is 12%.

## Use page paths

Page path steps match the path Kobbe stores for pageviews. Query strings and hashes are removed for privacy, so use paths like:

```text
/pricing
/signup
/checkout/success
```

Do not include full URLs, query strings, or fragments.

## Use custom events

Custom event steps are useful when the important action does not have its own page. For example:

```js
window.kobbe?.track("Signup completed", { plan: "starter" });
```

You can also use `data-kobbe-event` attributes for click-based steps:

```html
<button data-kobbe-event="Checkout started">Start checkout</button>
```

Do not send personal data in event names or event properties.

## Privacy

Funnels use the same privacy-friendly analytics data as the rest of Kobbe. They do not use cookies, localStorage, or persistent user profiles. Visitor matching is based on Kobbe's short-lived anonymous visitor signal, which rotates and is not designed to identify people across long periods.
