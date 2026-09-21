---
title: Agents can now read almost everything
date: 2026-09-21
description: Ten new MCP tools and CLI commands bring time-series, breakdowns, custom events, goals, funnels, and campaigns to AI agents.
---

The agent API used to cover the basics: overview KPIs, top pages, sources, and revenue. Now agents connected through MCP see nearly everything the dashboard shows.

**New read tools.**

`get_timeseries` returns visitors, visits, views, bounce rate, and session time over time, bucketed to match the range. `get_breakdown` splits visitors by country, region, city, browser, OS, device, or channel. `get_custom_events` lists custom events with an optional property breakdown per event, `get_goals` reports conversion goals with completions, `get_funnels` returns per-step visitors, conversion, and drop-off, and `get_campaigns` covers UTM traffic.

**Agents can manage goals and funnels too.**

`create_goal`, `delete_goal`, `create_funnel`, and `delete_funnel` let an agent set up conversion tracking, not just read it. Writes require the `sites:write` scope, same as site management.

**Same privacy.**

Every tool returns the same anonymous aggregates as the dashboard. There are still no individual visitor profiles to query, by design.

All of it ships in `@kobbe/cli` 0.3.0 with matching CLI commands like `kobbe timeseries`, `kobbe breakdown`, and `kobbe funnels`. The [AI agents](/docs/ai-agents) and [CLI](/docs/cli) docs list everything.
