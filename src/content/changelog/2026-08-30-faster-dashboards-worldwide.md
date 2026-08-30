---
title: Faster dashboards outside Europe
date: 2026-08-30
description: The app now runs next to its database, cutting dashboard loads from seconds to a few hundred milliseconds for users far from Europe.
---

Dashboard pages were noticeably slow for users far from Europe, where Kobbe's database lives: every query paid an intercontinental round trip. The app now runs next to the database instead of next to the visitor, cutting page loads from a few seconds to a few hundred milliseconds for users in Asia, the Americas, and Oceania.
