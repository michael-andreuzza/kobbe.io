---
title: Hash page paths
description: Track SPAs and section links that use the URL hash as the route.
order: 27
category: Tracking
navLabel: Hash paths
---

Some sites use `location.hash` as the app route (for example `/#/dashboard` or `/#pricing`). The default Kobbe tracker only sends the **pathname**, so hash-only navigations do not create new pageviews.

## Opt in with `data-track-hash`

Add **`data-track-hash="true"`** on the same `<script>` tag as the tracker:

```html
<script
  defer
  data-token="YOUR_SITE_TOKEN"
  data-track-hash="true"
  src="https://app.kobbe.io/tracker.js"
></script>
```

When enabled:

- Page paths stored in Kobbe are **`pathname` + `hash`** (for example `/` + `#pricing` → `/#pricing`).
- The tracker listens for **`hashchange`** and records an extra pageview when the combined path changes.
- **Query strings are never** sent or stored.

## Raw API

Server-side or CLI sends can set **`"trackHash": true`** on the JSON body alongside `path` if the path includes a `#fragment` that should be stored. This must match what you send from the browser tracker for consistent behavior.

## Anchor-heavy pages

Many marketing pages use hashes only for **in-page anchors** (table of contents, tabs). Turning on hash paths there can **inflate pageview counts**, because each anchor click changes the hash. Enable **`data-track-hash` only when hashes represent real screens or routes** in your app.

## Related

- [Script options](/docs/script-options) — all `data-*` attributes on the tracker.
- [Add the tracker](/docs/add-the-tracker) — default install snippet.
- [Exclude visits](/docs/exclude-visits) — path exclusions use the same stored path shape (including hash when this mode is on).
