---
title: AI agents
description: Let Cursor, Claude Code, Codex, or another MCP-compatible agent inspect and manage Kobbe.
order: 14
category: Get started
navLabel: AI agents
---

Kobbe exposes a scoped API for local AI agents. Use it when you want Cursor, Claude Code, Codex, or another MCP-compatible tool to inspect analytics, review revenue, check setup health, or manage sites.

Agent access uses the same `@kobbe/cli` package as the [CLI](/docs/cli), but runs it in MCP server mode.

## Setup

Create an API token in **Kobbe → Settings → Account → Agent access**. Copy it immediately; Kobbe only shows it once.

You can either log in once with the CLI:

```bash
kobbe login --token kbpat_YOUR_TOKEN
```

Or provide the token through the `KOBBE_TOKEN` environment variable.

## MCP mode

Run Kobbe in MCP server mode directly, or use one of the client examples below:

```bash
kobbe mcp
```

## Available tools

MCP tools include:

| Tool                | What it does                                                           |
| ------------------- | ---------------------------------------------------------------------- |
| `list_sites`        | List sites the token can access.                                       |
| `get_overview`      | Read headline traffic KPIs for one site.                               |
| `get_revenue`       | Read revenue summaries when revenue attribution is configured.         |
| `get_top_pages`     | Inspect top pages for a site and time range.                           |
| `get_sources`       | Inspect referrers, channels, and source breakdowns.                    |
| `get_setup_health`  | Check whether tracking and optional features are configured correctly. |
| `get_next_actions`  | Ask Kobbe for suggested follow-up work.                                |
| `create_site`       | Create a new site when the token has write access.                     |
| `update_site`       | Update site details when the token has write access.                   |
| `rotate_site_token` | Rotate a site tracker token.                                           |
| `delete_site`       | Delete a site with dangerous write access and confirmation.            |
| `reset_site_stats`  | Reset analytics data with dangerous write access and confirmation.     |

## Token scopes

API tokens are workspace-scoped and can be revoked any time from account settings.

Scopes:

| Scope            | Allows                                                         |
| ---------------- | -------------------------------------------------------------- |
| `sites:read`     | List and inspect sites.                                        |
| `analytics:read` | Read overview, pages, sources, setup health, and next actions. |
| `revenue:read`   | Read revenue summaries.                                        |
| `sites:write`    | Create or update sites.                                        |
| `tokens:write`   | Rotate tracker tokens.                                         |
| `danger:write`   | Delete sites or reset analytics data.                          |

## Safety notes

Kobbe API tokens are management credentials. Treat them like passwords.

- Store tokens in your local environment or the `kobbe login` config, not in source control.
- Revoke tokens when an agent, machine, or project no longer needs access.
- Use the smallest scope set that works.
- Destructive actions still require typed confirmation, even when the token has `danger:write`.
- Site tracker tokens are separate from API tokens. A tracker token can send analytics events, but it cannot manage a workspace.

## Good prompts

- "What changed on my site today?"
- "Which page should I improve next?"
- "Is revenue attribution configured correctly?"
- "List my sites and tell me which one needs setup."
- "Rotate the tracker token for this test site."

For destructive actions, include the exact confirmation only after you have reviewed the agent's proposed action.
