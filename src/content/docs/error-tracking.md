---
title: JavaScript error tracking
description: See which JavaScript errors your visitors run into, on which pages and browsers, and whether they hurt conversions.
order: 38.2
category: Analyze
navLabel: Error tracking
---

Kobbe can record the JavaScript errors your visitors run into, so you find out about a broken checkout before your customers tell you. Errors show up on the site's **Performance** page.

Error tracking is off by default and is available on paid plans.

## Enable error tracking

Turn on **Error tracking** in Site settings → Installation → [Tracking options](/docs/tracking-options), or add `data-errors="true"` to the full tracker:

```html
<script
  defer
  data-token="YOUR_SITE_TOKEN"
  data-errors="true"
  src="https://app.kobbe.io/tracker.full.js"
></script>
```

Error tracking needs `tracker.full.js`. The lightweight `tracker.js` does not record errors.

## What gets recorded

The tracker listens for uncaught errors and unhandled promise rejections. For each one it sends:

- The error message.
- The file and line it came from, for example `checkout.js:118`.
- The page path, plus the browser, device, and country already used for your other stats.

To keep the volume and cost predictable:

- At most 5 errors are sent per page load, and repeats of the same error on a page are sent once.
- Errors are batched into a single request.
- Generic `Script error.` messages from third-party scripts are dropped, since they carry no detail.

## Dashboard

The **JavaScript errors** card on the Performance page groups identical errors and shows, for each one:

| Column  | Meaning                                                            |
| ------- | ------------------------------------------------------------------ |
| Error   | The message, with the file, the page it happens on most, and the browser it happens in most. |
| Visitors | Unique visitors who hit the error.                                |
| Count   | Total times the error happened.                                    |

When at least 10 visitors hit an error in the selected range and you have [conversions](/docs/conversions) set up, the card compares the conversion rate of visitors who hit an error with those who did not.

## Privacy

Error messages can contain data from the page, so Kobbe cleans them before storing anything:

- Query strings are removed from URLs inside messages.
- Email addresses, UUIDs, and long numbers are replaced with placeholders like `[email]` and `[number]`.
- Messages are cut to 300 characters.

Like your other stats, errors are stored without cookies or persistent identifiers.

## Usage

Each recorded error counts as one event toward your monthly usage. The 5-per-page cap keeps a noisy bug from using up your allowance. See [billing and usage limits](/docs/billing-and-usage-limits).

## Related docs

- [Performance and Web Vitals](/docs/performance-web-vitals)
- [Script options](/docs/script-options)
- [Tracking options](/docs/tracking-options)
