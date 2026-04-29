---
title: Script options
description: Configure the Kobbe tracker script.
order: 3
---

The tracker script accepts configuration through `data-*` attributes on the `<script>` tag.

## Required

| Attribute | Description |
| --- | --- |
| `data-token` | Your site token from Kobbe. The token tells Kobbe which site should receive the pageview or event. |

## Example

```html
<script defer data-token="YOUR_SITE_TOKEN" src="https://app.kobbe.io/tracker.js"></script>
```

## How it works

- The script sends a pageview when the page loads.
- The current path is sent without query strings or hashes.
- The referrer is reduced to the origin, so search queries and private URL data are not collected.
- No cookies, localStorage, sessionStorage, or fingerprinting are used.
- Custom events use the same tracker script and the same site token.
