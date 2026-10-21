---
title: A smaller tracker, same features
date: 2026-10-21
description: The Kobbe tracker now ships minified, down to about 2.5 KB gzipped from 4.1 KB. The full build drops from 8.4 KB to 4.7 KB.
---

The tracker lands on every page of every site that runs Kobbe, so every byte counts. Until now it shipped as readable source. It now ships minified.

**About 40% smaller.**

The default `tracker.js` goes from 4.1 KB to about 2.5 KB gzipped. The full build, `tracker.full.js`, with scroll tracking, cross-domain tracking, and Web Vitals, goes from 8.4 KB to 4.7 KB.

**Nothing to change.**

The script tag, the options, and what gets tracked all stay the same. Sites already running Kobbe get the smaller file automatically.
