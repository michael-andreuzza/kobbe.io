---
title: Live visitors for agents and the CLI
date: 2026-09-03
description: A new get_live MCP tool and kobbe live command return who's online right now across every site in one call.
---

Agents connected through MCP can now ask "who's on my sites right now?" The new `get_live` tool returns the online count for every site in the workspace in a single request, and the CLI gets a matching `kobbe live` command with a per-site table and workspace total. Both ship in `@kobbe/cli` 0.2.0, and the [AI agents](/docs/ai-agents) docs now list every scope, including `revenue:read`.
