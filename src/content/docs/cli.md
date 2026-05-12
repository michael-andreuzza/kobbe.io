---
title: Kobbe CLI
description: Inspect analytics, revenue, setup health, and site settings from your terminal.
order: 13
category: Get started
navLabel: CLI
---

Use the Kobbe CLI when you want quick terminal access to your sites, traffic, revenue, setup health, and management commands.

The CLI package is `@kobbe/cli`. It also includes MCP server mode for AI agents, covered in [AI agents](/docs/ai-agents).

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

## Read analytics

```bash
kobbe sites
kobbe overview --site site_123 --range today
kobbe revenue --site site_123 --range 7d
kobbe next --site site_123 --range today
kobbe setup-health --site site_123
```

Use these commands to check what changed, review revenue, inspect setup health, and find the next page or source worth improving.

## Manage sites

Management commands are available when the token has the right scopes:

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

## Related

- [AI agents](/docs/ai-agents)
- [Dashboard overview](/docs/dashboard-overview)
- [Revenue attribution](/docs/revenue-attribution)
