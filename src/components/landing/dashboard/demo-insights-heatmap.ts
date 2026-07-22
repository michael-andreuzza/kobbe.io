import type { ConversionHeatmapCell } from "./conversion-heatmap-grid";

/** Matches `DEFAULTS.seed` in `app.kobbe.io/scripts/seed-local-demo-data.ts`. */
export const DEMO_ANALYTICS_SEED = 0x4b0bb3;

/** Stable anchor so the marketing preview heatmap does not shift between builds. */
const DEMO_HEATMAP_NOW_MS = Date.UTC(2026, 6, 22, 14, 0, 0);

/** Matches demo seed defaults (`count` / `days`). */
const DEMO_HEATMAP_EVENT_COUNT = 5000;
const DEMO_HEATMAP_DAYS = 90;
const DEMO_CUSTOM_EVENT_RATE = 0.11;
const RECENT_EVENTS_PER_SITE_DAY_MIN = 26;
const RECENT_EVENTS_PER_SITE_DAY_EXTRA = 18;
const RECENT_DAILY_GUARANTEE_DAYS = 14;
const RECENT_CUSTOM_EVENT_RATE = 0.08;

/** Mulberry32 — same PRNG as the app demo seed script. */
function makeRng(seed: number): () => number {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function utcStartOfDayMs(ms: number) {
  const d = new Date(ms);
  return Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
}

/** Same time skew as `pickOccurredMs` in the app demo seed script. */
function pickOccurredMs(rng: () => number, now: number, days: number) {
  const r = rng();
  const hour = 60 * 60 * 1000;
  const day = 24 * hour;
  if (r < 0.1) {
    return now - Math.floor(rng() * 30 * 60 * 1000);
  }
  if (r < 0.58) {
    return now - Math.floor(rng() * day);
  }
  if (r < 0.86) {
    return now - day - Math.floor(rng() * 6 * day);
  }
  return now - Math.floor(rng() * days * day);
}

function recordCustomEvent(
  grid: Map<string, number>,
  occurredAt: number,
) {
  const date = new Date(occurredAt);
  const dayOfWeek = date.getUTCDay();
  const hour = date.getUTCHours();
  const key = `${dayOfWeek}:${hour}`;
  grid.set(key, (grid.get(key) ?? 0) + 1);
}

/**
 * Aggregates synthetic custom-event timestamps using the app demo seed PRNG +
 * occurred-at distribution. Matches what `loadConversionHeatmap` returns for
 * seeded demo sites.
 */
export function buildDemoInsightsHeatmapCells(): ConversionHeatmapCell[] {
  const rng = makeRng(DEMO_ANALYTICS_SEED);
  const grid = new Map<string, number>();
  const now = DEMO_HEATMAP_NOW_MS;

  for (let n = 0; n < DEMO_HEATMAP_EVENT_COUNT; n += 1) {
    if (rng() >= DEMO_CUSTOM_EVENT_RATE) {
      continue;
    }
    recordCustomEvent(grid, pickOccurredMs(rng, now, DEMO_HEATMAP_DAYS));
  }

  const dayMs = 24 * 60 * 60 * 1000;
  const todayStart = utcStartOfDayMs(now);
  for (let dayOffset = 0; dayOffset < RECENT_DAILY_GUARANTEE_DAYS; dayOffset += 1) {
    const dayStart = todayStart - dayOffset * dayMs;
    const dayEnd = dayOffset === 0 ? now : dayStart + dayMs - 1;
    const span = Math.max(1, dayEnd - dayStart);
    const count =
      RECENT_EVENTS_PER_SITE_DAY_MIN +
      Math.floor(rng() * RECENT_EVENTS_PER_SITE_DAY_EXTRA);

    for (let i = 0; i < count; i += 1) {
      if (rng() >= RECENT_CUSTOM_EVENT_RATE) {
        continue;
      }
      recordCustomEvent(grid, dayStart + Math.floor(rng() * span));
    }
  }

  return [...grid.entries()]
    .map(([key, count]) => {
      const [dayOfWeek, hour] = key.split(":").map(Number);
      return { dayOfWeek: dayOfWeek!, hour: hour!, count };
    })
    .filter(
      (cell) =>
        cell.dayOfWeek >= 0 &&
        cell.dayOfWeek <= 6 &&
        cell.hour >= 0 &&
        cell.hour <= 23 &&
        cell.count > 0,
    );
}
