---
title: Scroll tracking
description: Track when visitors reach important page sections without collecting raw scroll behavior.
order: 9
category: Tracking
navLabel: Scroll tracking
---

Scroll tracking is **off by default**. Enable it only on the sections you care about by adding `data-kobbe-scroll` to the element.

Kobbe tracks a one-time **section visibility event**, not continuous scroll depth, raw pixels, viewport size, mouse movement, DOM text, or user identity.

## Basic setup

```html
<section data-kobbe-scroll="viewed_pricing">
  <h2>Pricing</h2>
  <p>Choose the plan that fits your team.</p>
</section>
```

When the section becomes at least **50% visible**, the tracker sends a custom event named `viewed_pricing`. The event uses the same privacy-friendly payload as other custom events: current sanitized path, page hostname, reduced referrer, and no cookies or persistent client identifier.

## Event names

Scroll event names must be short and non-personal:

- Use lowercase letters, numbers, underscores, hyphens, and colons.
- Maximum length is 64 characters.
- Good examples: `viewed_pricing`, `read_testimonials`, `scroll:hero_cta`.
- Do not include emails, names, user IDs, account IDs, or other personal data.

Invalid scroll event names are ignored by the tracker.

## Threshold and delay

You can tune when the event fires:

```html
<section
  data-kobbe-scroll="viewed_pricing"
  data-kobbe-scroll-threshold="0.75"
  data-kobbe-scroll-delay="1000"
>
  <!-- Pricing content -->
</section>
```

- `data-kobbe-scroll-threshold` controls how much of the element must be visible. Default: `0.5`. Allowed range: `0.1` to `1`.
- `data-kobbe-scroll-delay` waits before sending the event, in milliseconds. Default: `0`. Maximum: `10000`.
- Each marked element fires at most once per page visit.

## GDPR-friendly defaults

Kobbe is privacy-friendly by default, but GDPR compliance also depends on your legal basis, privacy notice, and how you configure tracking on your site.

For scroll tracking:

- The default tracker records no scroll events.
- You explicitly choose which sections to track.
- Kobbe stores a named event, not raw scroll telemetry.
- You should mention section visibility analytics in your privacy notice when required.

Because scroll tracking adds custom events, keep it focused on sections that answer a real product or marketing question. See [Reduce usage](/docs/reduce-usage) for event-volume tips.

## Use with funnels

Scroll events are stored as custom events, so you can use them in [funnels](/docs/funnels). For example, measure how many visitors saw the pricing section before starting checkout.

## Related

- [Custom events](/docs/custom-events)
- [Script options](/docs/script-options)
- [Funnels](/docs/funnels)
