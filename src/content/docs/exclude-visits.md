---
title: Filter your visits
description: Ignore your own traffic and filter events by path, host, IP, or country before they count.
order: 30
category: Tracking
navLabel: Filter your visits
---

Drop pageviews and custom events **before** they count toward quotas or appear in the dashboard. This is separate from [bot filtering](/docs/script-options#bot-filtering-and-exclusions)-bots are handled first; visit filters are rules you set per site.

Open **Filter your visits** for the site (`/websites/<site-id>/exclusions`), or use **Filter your visits** from the site sidebar. For volume tips, see [Reduce usage](/docs/reduce-usage).

Changes apply to new visits within about a minute. Past data cannot be retroactively filtered.

## Ignore your browser

For your own machine only, open the site in the browser, then the devtools console and run:

```js
localStorage.kobbe_ignore = "true";
```

To send events again from that browser:

```js
delete localStorage.kobbe_ignore;
```

The tracker checks this flag before any network request. It does not use cookies.

## Add your current IP

In **Filter your visits**, use **Add my current IP** to exclude traffic from the network you are on right now. This is helpful when you browse your own site during development or QA.

The address is compared only when the event is collected and is not stored as part of the event row.

## Path rules

| Rule                 | Matches                                                         |
| -------------------- | --------------------------------------------------------------- |
| **Exact path**       | e.g. `/admin` matches only that path.                           |
| **Prefix with `/*`** | e.g. `/admin/*` matches `/admin/users` but not `/admin` itself. |

Paths are matched against the same normalized path Kobbe stores for events: **pathname only** by default, or **pathname + hash** when the tracker uses [`data-track-hash`](/docs/hash-page-paths). Query strings are never part of the path.

## Hostname rules

Hostnames are compared in lowercase. You can enter `example.com` without `https://`; Kobbe normalizes full URLs to their hostname if you paste one. `example.com` and `www.example.com` match each other automatically, so you do not need to add both.

Use hostname rules when you use [first-party collect](/docs/first-party-collect) or a [custom collect endpoint](/docs/script-options): the tracker sends the **page** hostname on the visitor's site so filters still work.

## Country rules

Use a two-letter ISO-3166 code (e.g. `us`, `de`). Kobbe uses the request's country hint from the edge (same source as dashboard maps). Unknown or missing country will not match a country rule.

## IP rules

Enter the client IPv4 or IPv6 you want to exclude. The address is compared **only when the event is collected**; it is **not stored** as part of the event row. If the edge cannot resolve a client IP, an IP rule will not match.

## Related

- Install and options: [Add the tracker](/docs/add-the-tracker), [Script options](/docs/script-options).
- Custom events use the same collect pipeline: [Custom events](/docs/custom-events).
- Usage tips: [Reduce usage](/docs/reduce-usage).
