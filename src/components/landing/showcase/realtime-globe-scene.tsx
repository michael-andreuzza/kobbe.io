import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Globe, { type GlobeMethods } from "react-globe.gl";
import { MeshPhongMaterial } from "three";
import { feature } from "topojson-client";
import type { Topology, GeometryCollection } from "topojson-specification";
import countriesAtlas from "world-atlas/countries-110m.json";

import { KLEIN_RAMP } from "../dashboard/traffic-gradient";

/**
 * Decorative version of the app's realtime globe for the landing showcase:
 * dotted landmass, gradient visitor dots from mock data, slow auto-rotation.
 * No hover cards, zoom, or fullscreen. Client-only (Three.js) — always load
 * through `React.lazy` after mount, never during SSR.
 */

type MockDot = { lat: number; lon: number; count: number };

/** Plausible spread of live visitors; counts drive the dot size. */
const MOCK_DOTS: MockDot[] = [
  { lat: 60.17, lon: 24.94, count: 3 }, // Helsinki
  { lat: 60.1, lon: 19.94, count: 1 }, // Mariehamn
  { lat: 59.33, lon: 18.07, count: 2 }, // Stockholm
  { lat: 51.51, lon: -0.13, count: 4 }, // London
  { lat: 52.52, lon: 13.4, count: 2 }, // Berlin
  { lat: 48.86, lon: 2.35, count: 3 }, // Paris
  { lat: 40.42, lon: -3.7, count: 1 }, // Madrid
  { lat: 52.37, lon: 4.9, count: 2 }, // Amsterdam
  { lat: 40.71, lon: -74.01, count: 5 }, // New York
  { lat: 37.77, lon: -122.42, count: 4 }, // San Francisco
  { lat: 30.27, lon: -97.74, count: 2 }, // Austin
  { lat: 43.65, lon: -79.38, count: 2 }, // Toronto
  { lat: 19.43, lon: -99.13, count: 1 }, // Mexico City
  { lat: -23.55, lon: -46.63, count: 3 }, // São Paulo
  { lat: -34.6, lon: -58.38, count: 1 }, // Buenos Aires
  { lat: 4.71, lon: -74.07, count: 1 }, // Bogotá
  { lat: 35.68, lon: 139.69, count: 4 }, // Tokyo
  { lat: 1.35, lon: 103.82, count: 2 }, // Singapore
  { lat: 37.57, lon: 126.98, count: 2 }, // Seoul
  { lat: 19.08, lon: 72.88, count: 3 }, // Mumbai
  { lat: -6.21, lon: 106.85, count: 1 }, // Jakarta
  { lat: -33.87, lon: 151.21, count: 2 }, // Sydney
  { lat: -36.85, lon: 174.76, count: 1 }, // Auckland
  { lat: 6.52, lon: 3.38, count: 2 }, // Lagos
  { lat: -1.29, lon: 36.82, count: 1 }, // Nairobi
  { lat: -33.92, lon: 18.42, count: 1 }, // Cape Town
  { lat: 30.04, lon: 31.24, count: 2 }, // Cairo
];

type Ring = [number, number][];

/** Zero-area rings (e.g. the North Korea artifact in world-atlas) crash h3. */
function isValidRing(ring: Ring | undefined): boolean {
  if (!ring || ring.length < 4) return false;
  const [x0, y0] = ring[0] ?? [0, 0];
  return ring.some(([x, y]) => x !== x0 || y !== y0);
}

/** Dotted landmass from per-country shapes, degenerate polygons stripped. */
const LAND_FEATURES = (() => {
  const topology = countriesAtlas as unknown as Topology<{
    countries: GeometryCollection;
  }>;
  const geo = feature(topology, topology.objects.countries);
  const features = "features" in geo ? geo.features : [geo];
  return features
    .map((f) => {
      const geom = f.geometry;
      if (geom?.type !== "Polygon" && geom?.type !== "MultiPolygon") {
        return null;
      }
      const polygons = (
        geom.type === "Polygon" ? [geom.coordinates] : geom.coordinates
      ) as Ring[][];
      const cleaned = polygons.filter((rings) => isValidRing(rings[0]));
      if (cleaned.length === 0) return null;
      return {
        ...f,
        geometry:
          cleaned.length === 1
            ? { type: "Polygon" as const, coordinates: cleaned[0] }
            : { type: "MultiPolygon" as const, coordinates: cleaned },
      };
    })
    .filter((f) => f != null);
})();

/**
 * Resolve a CSS color expression (theme vars, oklch, color-mix) to a plain
 * `#rrggbb` hex string three.js can parse: paint one pixel and read it back.
 */
function resolveCssColor(expression: string, fallback: string): string {
  if (typeof document === "undefined") return fallback;
  const probe = document.createElement("span");
  probe.style.color = expression;
  document.body.appendChild(probe);
  const computed = getComputedStyle(probe).color;
  probe.remove();
  const canvas = document.createElement("canvas");
  canvas.width = 1;
  canvas.height = 1;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) return fallback;
  try {
    ctx.fillStyle = fallback;
    ctx.fillStyle = computed || fallback;
    ctx.fillRect(0, 0, 1, 1);
    const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
    const toHex = (v: number) => v.toString(16).padStart(2, "0");
    return `#${toHex(r ?? 0)}${toHex(g ?? 0)}${toHex(b ?? 0)}`;
  } catch {
    return fallback;
  }
}

type GlobeColors = {
  globe: string;
  land: string;
  points: string[];
};

/** Dot palette sampled along the Klein ramp (same as the traffic charts). */
const RAMP_SAMPLES = [0.15, 0.4, 0.65, 0.9] as const;
const RAMP_FALLBACKS = ["#a8b4e8", "#6b7fd9", "#4756c4", "#3441a5"] as const;

function readColors(): GlobeColors {
  return {
    // Mixed against the muted panel tone so the sphere blends with the card.
    globe: resolveCssColor(
      "color-mix(in oklch, var(--foreground) 4%, var(--muted))",
      "#e8e7e0",
    ),
    land: resolveCssColor(
      "color-mix(in oklch, var(--foreground) 32%, var(--muted))",
      "#a3a29b",
    ),
    points: RAMP_SAMPLES.map((t, index) =>
      resolveCssColor(
        KLEIN_RAMP.sample(t),
        RAMP_FALLBACKS[index] ?? RAMP_FALLBACKS[0],
      ),
    ),
  };
}

// Sized so the sphere fits the camera frame vertically (no flat clip);
// the wrapper crops the bottom and sides.
const DEFAULT_POV = { lat: 30, lng: 5, altitude: 1.5 };

export default function RealtimeGlobeScene() {
  const globeRef = useRef<GlobeMethods | undefined>(undefined);
  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [colors] = useState<GlobeColors>(readColors);
  const interactedRef = useRef(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const measure = () => {
      const rect = el.getBoundingClientRect();
      setSize((prev) =>
        prev.width === rect.width && prev.height === rect.height
          ? prev
          : { width: rect.width, height: rect.height },
      );
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const globeMaterial = useMemo(
    () => new MeshPhongMaterial({ color: colors.globe, shininess: 2 }),
    [colors.globe],
  );

  const handleGlobeReady = useCallback(() => {
    const globe = globeRef.current;
    if (!globe) return;
    globe.pointOfView(DEFAULT_POV, 0);
    const controls = globe.controls() as {
      autoRotate?: boolean;
      autoRotateSpeed?: number;
      enableZoom?: boolean;
    };
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    controls.autoRotate = !reducedMotion;
    controls.autoRotateSpeed = 0.55;
    // No scroll hijacking on the landing page.
    controls.enableZoom = false;
  }, []);

  // Dragging pauses the auto-rotation, like the app.
  const stopAutoRotate = useCallback(() => {
    if (interactedRef.current) return;
    interactedRef.current = true;
    const globe = globeRef.current;
    if (!globe) return;
    try {
      const controls = globe.controls() as { autoRotate?: boolean };
      controls.autoRotate = false;
    } catch {
      /* Controls not ready yet. */
    }
  }, []);

  const pointRadius = useCallback((point: object) => {
    const row = point as MockDot;
    return 0.5 + Math.min(0.5, Math.sqrt(Math.max(0, row.count - 1)) * 0.16);
  }, []);

  // Stable per-dot pick from the gradient ramp, hashed off lat/lon.
  const pointColor = useCallback(
    (point: object) => {
      const row = point as MockDot;
      const hash = Math.abs(Math.round(row.lat * 97.13 + row.lon * 31.7));
      return colors.points[hash % colors.points.length] ?? colors.points[0]!;
    },
    [colors.points],
  );
  const landColor = useCallback(() => colors.land, [colors.land]);

  return (
    <div
      ref={containerRef}
      className="h-full w-full touch-pan-y overflow-hidden"
      onPointerDown={stopAutoRotate}
    >
      {size.width > 0 && size.height > 0 ? (
        <Globe
          ref={globeRef}
          width={size.width}
          height={size.height}
          backgroundColor="rgba(0,0,0,0)"
          globeMaterial={globeMaterial}
          showGraticules={false}
          showAtmosphere={false}
          hexPolygonsData={LAND_FEATURES}
          hexPolygonResolution={3}
          hexPolygonMargin={0.62}
          hexPolygonUseDots
          hexPolygonColor={landColor}
          pointsData={MOCK_DOTS as object[]}
          pointLat={(d) => (d as MockDot).lat}
          pointLng={(d) => (d as MockDot).lon}
          pointColor={pointColor}
          pointAltitude={0.015}
          pointRadius={pointRadius}
          pointsTransitionDuration={0}
          onGlobeReady={handleGlobeReady}
        />
      ) : null}
    </div>
  );
}
