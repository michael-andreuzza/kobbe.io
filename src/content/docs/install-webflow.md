---
title: Install on Webflow
description: Add the Kobbe tracker via Webflow site-wide custom code.
order: 10
category: Installation guides
navLabel: Webflow
brandLogo:
  url: ../../images/brands/webflow.svg
  alt: Webflow logo
---

Webflow injects **site-wide** scripts from Project settings. Token: [Add the tracker](/docs/add-the-tracker).

## Tracker snippet

```html
<script
  defer
  data-token="YOUR_SITE_TOKEN"
  src="https://app.kobbe.io/tracker.js"
></script>
```

## Steps

1. Open **Project settings → Custom code**.
2. Paste the snippet into **Head code** (recommended) or **Footer code** if your compliance setup requires it.
3. Publish the site.

Some plans restrict custom code — upgrade if the fields are locked.

## Verify

Publish, open the live URL, confirm visits in Kobbe.

## Next steps

- [Script options](/docs/script-options)
- [Custom events](/docs/custom-events)
