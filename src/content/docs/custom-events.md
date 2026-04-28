---
title: Custom events
description: Track custom events with Kobbe.
order: 4
---

Track button clicks, form submissions, and other interactions without writing JavaScript.

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

| Attribute | Description |
| --- | --- |
| `data-kobbe-event` | The event name (required). |
| `data-kobbe-event-*` | Optional properties sent as key-value pairs. For example, `data-kobbe-event-source="footer"` sends `{ source: "footer" }`. |

## JavaScript API

The tracker sets `window.kobbe`. Call `.track` from your code after the tracker has loaded.

```js
window.kobbe?.track("Purchase completed", { plan: "pro" })
```
