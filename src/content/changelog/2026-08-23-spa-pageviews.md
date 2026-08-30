---
title: SPA route changes count as pageviews
date: 2026-08-23
description: The tracker now records client-side navigations in React, Vue, and other SPAs automatically, with no extra setup.
---

Single-page apps only counted the first document load; navigating between routes was invisible. The tracker now hooks `history.pushState` and `popstate`, so client-side navigations in React, Vue, Svelte, and friends are recorded as pageviews automatically, deduplicated by path. Nothing to configure. See [Tracking options](/docs/tracking-options).
