---
title: Conversions
description: Auto-track common goals like contact clicks, outbound links, file downloads, and form submits, then filter the dashboard by conversion.
order: 32
category: Analyze
navLabel: Conversions
---

Conversions help you measure important actions without wiring every click by hand. Turn on built-in presets for contact links, messaging apps, outbound links, file downloads, and form submits, or add custom event names. The tracker loads your rules from Kobbe and sends matching events automatically.

Conversions are separate from [custom events](/docs/custom-events) you define with `data-kobbe-event` or `window.kobbe.track`, but they use the same event pipeline and appear in the same dashboards.

## Enable conversions

Open your site in Kobbe, go to **Settings**, then open the **Conversions** tab. Turn on the presets you want, or add a custom conversion with your own event name.

Then add `data-conversions="true"` to the tracker script. Kobbe also adds this attribute to the install snippet in **Site settings** when conversions are enabled. Instead of editing the snippet, you can set **Auto conversions** to **On** under **Settings → Installation → Scripts**.

```html
<script
  defer
  data-token="YOUR_SITE_TOKEN"
  data-conversions="true"
  src="https://app.kobbe.io/tracker.js"
></script>
```

The tracker fetches enabled rules from `/api/collect-config` on the same origin as your collect endpoint. The rules are cached for up to 5 minutes, so a preset you just turned on can take a few minutes to start sending events.

## Built-in presets

| Preset | What it tracks |
| ------ | -------------- |
| **Contact click** | `tel:` and `mailto:` links |
| **Messaging click** | WhatsApp, Telegram, and similar messaging links |
| **Outbound link** | Links that leave your site hostname |
| **File download** | Links to files like PDFs, ZIPs, and DMGs |
| **Form submit** | Standard form submissions on your pages |
| **Custom** | Any event name you define in Kobbe |

Preset event names are editable in the app. Elements that already use `data-kobbe-event` are not double-counted by conversion presets.

## File downloads

The **File download** preset sends an event when a visitor clicks a link to a file. A link counts when its path ends in one of these extensions, or when it has a `download` attribute:

- Documents: `pdf`, `csv`, `doc`, `docx`, `xls`, `xlsx`, `ppt`, `pptx`, `odt`, `ods`, `odp`, `epub`
- Archives: `zip`, `rar`, `7z`, `gz`, `tgz`, `tar`
- Apps and installers: `dmg`, `pkg`, `exe`, `msi`, `deb`, `rpm`, `apk`, `appimage`, `iso`
- Media: `mp3`, `wav`, `mp4`, `mov`

Each event carries two properties: `file`, the file name (for example `pricing-sheet.pdf`), and `extension`. The full URL and any query string are never sent.

If your download button points to a page or redirect instead of the file itself, for example `/download`, the tracker cannot tell it is a file. Tag the button with the same event name instead:

```html
<a href="/download" data-kobbe-event="File download">Download for Mac</a>
```

## Filter the dashboard

When conversions are enabled, the site overview includes a **Conversion** filter. Pick one conversion to focus KPIs, charts, and breakdowns on visitors who triggered that event.

You can also open a filtered view directly with `?conversion=` in the dashboard URL, using the exact event name from your conversion settings.

## Campaigns and funnels

The **Campaigns** page prefers conversion events when they are enabled, so UTM traffic can be tied to goals instead of only custom events you send manually.

From the overview, you can jump to **Funnels** with `?event=` to pre-fill a funnel step from a conversion event name.

## Privacy

Conversion events follow the same privacy rules as other Kobbe events: no cookies, no persistent visitor profiles, and no personal data in event names or properties.

## Related docs

- [Custom events](/docs/custom-events)
- [UTM campaigns](/docs/utm-campaigns)
- [Funnels](/docs/funnels)
- [Script options](/docs/script-options)
