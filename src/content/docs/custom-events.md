---
title: Custom events
description: Track custom events with Kobbe.
order: 6
category: Tracking
navLabel: Custom events
---

Track button clicks, form submissions, and other interactions without writing JavaScript.

Custom events appear in your site's dashboard alongside pageviews. Use them for actions that matter to your product or business, such as newsletter signups, checkout clicks, form submissions, downloads, outbound links, or pricing page actions.

## HTML attributes

Add `data-kobbe-event` to any element. Clicks on that element will be tracked as a custom event.

```html
<button
  type="button"
  data-kobbe-event="Newsletter signup"
  data-kobbe-event-source="footer"
>
  Subscribe
</button>
```

| Attribute            | Description                                                                                                                                                                                                   |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `data-kobbe-event`   | The event name (required).                                                                                                                                                                                    |
| `data-kobbe-event-*` | Optional properties sent as key-value pairs. For example, `data-kobbe-event-source="footer"` sends `{ source: "footer" }`. Hyphenated suffixes become camelCase keys (`data-kobbe-event-plan-id` → `planId`). |

Use short, consistent event names. For example, use `Newsletter signup` everywhere instead of mixing `Newsletter signup`, `newsletter-signup`, and `Subscribe clicked`.

## JavaScript API

The tracker sets `window.kobbe`. Call `.track` from your code after the tracker has loaded.

```js
window.kobbe?.track("Purchase completed", { plan: "pro" });
```

Use the JavaScript API when the event is not a simple click, such as after a payment succeeds, after an API request completes, or after a form validates.

## Limits

| Constraint            | Limit          |
| --------------------- | -------------- |
| Event name length     | 64 characters  |
| Properties per event  | 16 keys        |
| Property key length   | 48 characters  |
| Property value length | 200 characters |

Events or properties that exceed these limits are truncated or dropped by the server.

## Do not send personal data

Do not include emails, names, user IDs, phone numbers, addresses, or other personal data in event names or properties. As a safety net, the server automatically strips keys that look like common PII fields (e.g. `email`, `password`, `phone`, `ssn`).

Good:

```js
window.kobbe?.track("Signup completed", { plan: "pro" });
```

Avoid:

```js
window.kobbe?.track("Signup completed", { email: "person@example.com" });
```
