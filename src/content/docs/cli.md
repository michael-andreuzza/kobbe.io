---
title: Kobbe CLI
description: Inspect analytics, setup health, and site settings from your terminal.
order: 13
category: Get started
navLabel: CLI
---

Use the Kobbe CLI when you want quick terminal access to your sites, traffic, setup health, and management commands.

The CLI package is `@kobbe/cli`. It also includes MCP server mode for AI agents, covered in [AI agents](/docs/ai-agents).

## Install

```bash
npm install -g @kobbe/cli
```

Create an API token from the app profile menu (your avatar, top right) → Agent access. You can also open [app.kobbe.io/settings/agent-access](https://app.kobbe.io/settings/agent-access) directly. It is not under site settings or Account settings. Copy the token immediately; Kobbe only shows it once.

Agent access is included on every plan. Only workspace owners and managers can create tokens. Use Cmd/Ctrl K and search Agent access if you do not see it in the profile menu.

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
kobbe next --site site_123 --range today
kobbe setup-health --site site_123
```

Use these commands to check what changed, inspect setup health, and find the next page or source worth improving.

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
