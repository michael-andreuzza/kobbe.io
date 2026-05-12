---
title: Install on Framer
description: Add the Kobbe tracker to a Framer site with custom code.
order: 11
category: Installation guides
navLabel: Framer
brandLogo:
  url: ../../images/brands/framer.svg
  alt: Framer logo
---

Framer can run a global script from **Site settings**. Token: [Add the tracker](/docs/add-the-tracker).

## Tracker snippet

```html
<script
  defer
  data-token="YOUR_SITE_TOKEN"
  src="https://app.kobbe.io/tracker.js"
></script>
```

## Steps

1. Open **Site Settings → General → Custom Code** (wording may vary by Framer version).
2. Paste the snippet in the **Head** section.
3. Publish.

If Framer exposes only an embed/component for scripts, use the equivalent that outputs in `<head>` on every page.

## Verify

Open the published site and check Kobbe.

## Next steps

- [Script options](/docs/script-options)
- [Custom events](/docs/custom-events)
