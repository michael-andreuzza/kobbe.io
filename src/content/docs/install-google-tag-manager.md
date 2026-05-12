---
title: Install with Google Tag Manager
description: Load the Kobbe tracker through Google Tag Manager.
order: 12.95
category: Installation guides
navLabel: Google Tag Manager
brandLogo:
  url: "../../images/brands/gtag manager.svg"
  alt: Google Tag Manager logo
---

You can deploy Kobbe from GTM with a **Custom HTML** tag. You still need the site token from [Add the tracker](/docs/add-the-tracker).

## Steps

1. In GTM, create a **Custom HTML** tag.
2. Paste:

```html
<script
  defer
  data-token="YOUR_SITE_TOKEN"
  src="https://app.kobbe.io/tracker.js"
></script>
```

3. Set **Triggering** to **All Pages** (or the subset you want measured).
4. Publish the container.

Use **Consent** or “Consent Initialization” triggers if your site requires CMP gating. Only fire the tag after analytics consent when that matches the rules that apply to your country, region, audience, and policy.

## Verify

Use GTM preview mode, load a page, then confirm the request and Kobbe traffic.

## Next steps

- [Script options](/docs/script-options)
- [Exclude visits](/docs/exclude-visits)
