---
title: AI agent CLI and MCP
description: Let Cursor, Claude Code, Codex, or your terminal inspect and manage Kobbe.
order: 62
category: Manage
navLabel: AI agents
---

Kobbe exposes a scoped API for local tools and AI agents. Use it when you want Cursor, Claude Code, Codex, or a terminal command to inspect analytics, review revenue, check setup health, or manage sites.

The first package is `@kobbe/cli`. It includes regular CLI commands and an MCP server mode.

## Install

```bash
npm install -g @kobbe/cli
```

Create an API token in **Kobbe → Settings → Account → Agent access**. Copy it immediately; Kobbe only shows it once.

Then log in locally:

```bash
kobbe login --token kbpat_YOUR_TOKEN
```

For self-hosted or preview environments, pass a custom app URL:

```bash
kobbe login --token kbpat_YOUR_TOKEN --api https://app.kobbe.io
```

## CLI examples

```bash
kobbe sites
kobbe overview --site site_123 --range today
kobbe revenue --site site_123 --range 7d
kobbe next --site site_123 --range today
kobbe setup-health --site site_123
```

Management commands are also available when the token has the right scopes:

```bash
kobbe create-site --name "Docs site" --domain docs.example.com
kobbe update-site --site site_123 --name "Marketing"
kobbe rotate-token --site site_123
```

Destructive commands require a typed confirmation:

```bash
kobbe delete-site --site site_123 --confirm "DELETE example.com"
kobbe reset-stats --site site_123 --confirm "RESET example.com"
```

If the confirmation is missing or wrong, Kobbe returns the exact phrase required.

## MCP setup

Use MCP mode for Cursor, Claude Code, Codex, or any local MCP-compatible agent:

```bash
kobbe mcp
```

Configure the agent to run the command above and provide the token through `kobbe login` or the `KOBBE_TOKEN` environment variable.

For Cursor, you can use `npx` so users do not need to install the CLI globally:

```json
{
  "mcpServers": {
    "kobbe": {
      "command": "npx",
      "args": ["-y", "@kobbe/cli@latest", "mcp"]
    }
  }
}
```

Available MCP tools include:

- `list_sites`
- `get_overview`
- `get_revenue`
- `get_top_pages`
- `get_sources`
- `get_setup_health`
- `get_next_actions`
- `create_site`
- `update_site`
- `rotate_site_token`
- `delete_site`
- `reset_site_stats`

## Token scopes

API tokens are workspace-scoped and can be revoked any time from account settings.

Scopes:

- `sites:read` — list and inspect sites.
- `analytics:read` — read overview, pages, sources, setup health, and next actions.
- `revenue:read` — read revenue summaries.
- `sites:write` — create or update sites.
- `tokens:write` — rotate tracker tokens.
- `danger:write` — delete sites or reset analytics data.

Do not give `danger:write` to agents you do not fully trust.

## Safety notes

Kobbe API tokens are management credentials. Treat them like passwords.

- Store tokens in your local environment or the `kobbe login` config, not in source control.
- Revoke tokens when an agent, machine, or project no longer needs access.
- Use the smallest scope set that works.
- Destructive actions still require typed confirmation, even when the token has `danger:write`.
- Site tracker tokens are separate from API tokens. A tracker token can send analytics events, but it cannot manage a workspace.

## What agents can ask

Good prompts:

- "What changed on my site today?"
- "Which page should I improve next?"
- "Is revenue attribution configured correctly?"
- "List my sites and tell me which one needs setup."
- "Rotate the tracker token for this test site."

For destructive actions, include the exact confirmation only after you have reviewed the agent's proposed action.
