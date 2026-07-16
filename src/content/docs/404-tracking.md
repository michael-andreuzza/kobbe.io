---
title: 404 tracking
description: Find broken links and dead pages by flagging your not-found template with a single attribute.
order: 32.5
category: Tracking
navLabel: 404 tracking
---

Kobbe can record every time a visitor lands on a missing page, so you can find broken internal links, outdated backlinks, and mistyped URLs. It works with both the lightweight tracker and the full tracker, and it is **off until you flag your 404 template**.

## Setup

Add the `data-kobbe-not-found` attribute to any element that only renders on your 404 page — the `<html>` tag, the `<body>` tag, or the page wrapper all work:

```html
<div data-kobbe-not-found>
  <h1>Page not found</h1>
</div>
```

That's the whole setup. When the tracker loads on a flagged page, it sends a `404` event with:

- The **missing path** the visitor requested.
- The **page that linked to it** — the internal page for same-site navigation, or the referring site for external links.

No extra payload, cookies, or identifiers are collected; the event uses the same privacy-friendly shape as a pageview.

## Where the data shows up

Open your dashboard and switch the **Pages** card to the **404s** tab. Each row shows the dead path, how many times it was hit in the selected range, and the page that most often linked to it — so you know exactly which link to fix.

404 events are kept separate from your [custom events](/docs/custom-events), conversions, and funnels, so they never pollute your regular event data.

## Framework notes

- **Static sites and SPAs**: make sure your not-found route actually renders the flagged template. If your host serves a soft 404 (a 200 page), Kobbe still records it as long as the attribute is present.
- **Server-rendered apps**: add the attribute in the 404 template only, not in shared layouts.
- The event name `404` is reserved — the tracker and API treat it as broken-page telemetry, not a custom event.

## Related

- [Script options](/docs/script-options)
- [Pages on the dashboard](/docs/dashboard-stats-pages)
- [Custom events](/docs/custom-events)
