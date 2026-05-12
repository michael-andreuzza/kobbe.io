---
title: Realtime visitors
description: See who is on your site right now, what they are viewing, and where active visits are coming from.
order: 34
category: Analyze
navLabel: Realtime
---

Realtime shows active traffic for one site. Use it when you want to confirm an install, watch a launch, monitor campaign traffic, or see what visitors are reading right now.

## What realtime shows

The realtime page can include:

| Signal                  | What you see                                     |
| ----------------------- | ------------------------------------------------ |
| **Active visitors**     | Approximate count of visitors online right now.  |
| **Current pages**       | Paths visitors are viewing.                      |
| **Recent activity**     | Latest actions in the live window.               |
| **Referrers / sources** | Where active traffic is coming from.             |
| **Locations**           | Country or region hints when available.          |
| **Live map**            | Online visitors on a map when data is available. |

Realtime uses the same privacy model as the rest of Kobbe. It does not expose raw IP addresses, customer names, or personal profiles.

## Active visitors

Kobbe treats a visitor as online when it has recent activity within the live window. The count is intentionally approximate: it is useful for presence and direction, not for billing-grade concurrency.

If a visitor closes a tab or stops interacting, they disappear after the live window expires.

## Realtime map

The map uses coarse location signals from the request edge when available. Missing or unknown countries are simply omitted from the map. Kobbe does not store raw IP addresses to power the map.

## Sharing realtime

Public dashboard links can optionally include realtime access. Choose the shared dashboard scope from site settings:

| Scope                   | Access                                                         |
| ----------------------- | -------------------------------------------------------------- |
| **Overview + realtime** | Viewers can see both the main dashboard and the realtime page. |
| **Overview only**       | Viewers cannot open realtime.                                  |
| **Realtime only**       | Viewers see only the realtime page.                            |

Shared realtime is read-only. Viewers cannot change settings, export data, rotate tokens, or manage share links.

## Related docs

- [Dashboard overview](/docs/dashboard-overview)
- [Shared dashboards](/docs/shared-dashboards)
- [Privacy and cookieless tracking](/docs/privacy-and-cookieless-tracking)
