"use client";

import maplibregl from "maplibre-gl";
import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

import { capabilityMockupSurfaceClass } from "./dashboard-card-layout";

import "maplibre-gl/dist/maplibre-gl.css";

const MAP_STYLE_LIGHT =
  "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json";
const MAP_STYLE_DARK =
  "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json";

const VISITOR_LOCATIONS = [
  { lon: -122.4194, lat: 37.7749 },
  { lon: -74.006, lat: 40.7128 },
  { lon: -0.1276, lat: 51.5074 },
  { lon: 13.405, lat: 52.52 },
] as const;

function isDarkTheme() {
  if (typeof window === "undefined") {
    return false;
  }

  return (
    document.documentElement.classList.contains("dark") ||
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );
}

function watchThemeChange(onChange: () => void) {
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  mediaQuery.addEventListener("change", onChange);

  const classObserver = new MutationObserver(onChange);
  classObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });

  return () => {
    mediaQuery.removeEventListener("change", onChange);
    classObserver.disconnect();
  };
}

function mapStyleForTheme() {
  return isDarkTheme() ? MAP_STYLE_DARK : MAP_STYLE_LIGHT;
}

function createMarkerElement(larger = false) {
  const el = document.createElement("div");
  const size = larger ? 16 : 14;
  el.style.width = `${size}px`;
  el.style.height = `${size}px`;
  el.style.borderRadius = "9999px";
  el.style.backgroundColor = "var(--foreground)";
  el.style.border = "2px solid var(--card)";
  el.style.boxShadow = "0 1px 2px rgb(0 0 0 / 0.18)";
  return el;
}

function setPaintProperty(
  map: maplibregl.Map,
  layerId: string,
  property: string,
  value: unknown,
) {
  try {
    if (map.getLayer(layerId)) {
      map.setPaintProperty(layerId, property, value);
    }
  } catch {
    // CARTO layer ids can differ between style versions.
  }
}

function applyKobbeMapTheme(map: maplibregl.Map) {
  const dark = isDarkTheme();
  const colors = {
    water: dark ? "#161616" : "#fbfbfa",
    land: dark ? "#262626" : "#e2e2df",
    landDetail: dark ? "#2e2e2e" : "#d9d9d6",
    boundary: dark ? "#484848" : "#b8b8b4",
    road: dark ? "#3a3a3a" : "#ccccca",
    label: dark ? "#ececec" : "#343430",
    labelHalo: dark ? "#161616" : "#fbfbfa",
  };

  for (const layer of map.getStyle().layers ?? []) {
    const layerMeta = layer as maplibregl.LayerSpecification & {
      "source-layer"?: string;
    };
    const name = `${layer.id} ${layerMeta["source-layer"] ?? ""}`.toLowerCase();

    if (layer.type === "background") {
      setPaintProperty(map, layer.id, "background-color", colors.land);
      setPaintProperty(map, layer.id, "background-opacity", 1);
      continue;
    }

    if (name.includes("water")) {
      setPaintProperty(map, layer.id, "fill-color", colors.water);
      setPaintProperty(map, layer.id, "line-color", colors.water);
      setPaintProperty(map, layer.id, "fill-opacity", 1);
      continue;
    }

    if (
      name.includes("land") ||
      name.includes("park") ||
      name.includes("wood") ||
      name.includes("grass")
    ) {
      setPaintProperty(map, layer.id, "fill-color", colors.landDetail);
      setPaintProperty(map, layer.id, "fill-opacity", 1);
      continue;
    }

    if (layer.type === "fill") {
      setPaintProperty(map, layer.id, "fill-color", colors.land);
      setPaintProperty(map, layer.id, "fill-opacity", 1);
      continue;
    }

    if (name.includes("boundary") || name.includes("admin")) {
      setPaintProperty(map, layer.id, "line-color", colors.boundary);
      setPaintProperty(map, layer.id, "line-opacity", 0.55);
      continue;
    }

    if (name.includes("road") || name.includes("transport")) {
      setPaintProperty(map, layer.id, "line-color", colors.road);
      setPaintProperty(map, layer.id, "line-opacity", 0.55);
      continue;
    }

    if (layer.type === "symbol") {
      setPaintProperty(map, layer.id, "text-color", colors.label);
      setPaintProperty(map, layer.id, "text-halo-color", colors.labelHalo);
      setPaintProperty(map, layer.id, "text-halo-width", 1.1);
    }
  }
}

export function RealtimePreview() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    let map: maplibregl.Map | null = null;
    const markers: maplibregl.Marker[] = [];
    let resizeObserver: ResizeObserver | null = null;
    let stopWatchingTheme: (() => void) | null = null;
    let intersectionObserver: IntersectionObserver | null = null;
    let layoutObserver: ResizeObserver | null = null;

    const syncMarkers = () => {
      if (!map) {
        return;
      }

      markers.splice(0).forEach((marker) => marker.remove());
      VISITOR_LOCATIONS.forEach((location, index) => {
        markers.push(
          new maplibregl.Marker({
            element: createMarkerElement(index === 1),
          })
            .setLngLat([location.lon, location.lat])
            .addTo(map!),
        );
      });
    };

    const scheduleResize = () => {
      if (!map) {
        return;
      }

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          try {
            map?.resize();
          } catch {
            // Map may throw during teardown races.
          }
        });
      });
    };

    const onLoad = () => {
      if (!map) {
        return;
      }

      applyKobbeMapTheme(map);
      syncMarkers();
      scheduleResize();
    };

    const startMap = () => {
      if (map || container.offsetWidth === 0 || container.offsetHeight === 0) {
        return;
      }

      map = new maplibregl.Map({
        container,
        style: mapStyleForTheme(),
        center: [-35, 48],
        zoom: 1.35,
        minZoom: 1,
        maxZoom: 4,
        interactive: false,
        attributionControl: false,
        fadeDuration: 0,
        renderWorldCopies: false,
      });

      map.on("load", onLoad);
      scheduleResize();

      resizeObserver = new ResizeObserver(() => {
        scheduleResize();
      });
      resizeObserver.observe(container);

      const onThemeChange = () => {
        if (!map) {
          return;
        }

        map.setStyle(mapStyleForTheme());
        map.once("styledata", () => {
          if (!map) {
            return;
          }

          applyKobbeMapTheme(map);
          syncMarkers();
          scheduleResize();
        });
      };

      stopWatchingTheme = watchThemeChange(onThemeChange);
    };

    intersectionObserver = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          startMap();
        }
      },
      { rootMargin: "120px" },
    );
    intersectionObserver.observe(container);

    layoutObserver = new ResizeObserver(() => {
      startMap();
    });
    layoutObserver.observe(container);

    // Cards already in view on first paint still need a map instance.
    startMap();

    return () => {
      intersectionObserver?.disconnect();
      layoutObserver?.disconnect();
      stopWatchingTheme?.();
      resizeObserver?.disconnect();
      markers.forEach((marker) => marker.remove());
      map?.remove();
      map = null;
    };
  }, []);

  return (
    <div
      className={cn(
        capabilityMockupSurfaceClass,
        "relative h-36 w-full overflow-hidden [&_.maplibregl-canvas]:outline-none [&_.maplibregl-ctrl-bottom-left]:hidden [&_.maplibregl-ctrl-bottom-right]:hidden [&_.maplibregl-ctrl-logo]:hidden",
      )}
    >
      <div ref={containerRef} className="absolute inset-0" aria-hidden />

      <div className="border-border bg-card/95 pointer-events-none absolute top-2 right-2 flex flex-col overflow-hidden rounded-md border">
        <span className="border-border text-muted-foreground flex size-6 items-center justify-center border-b text-xs leading-none">
          +
        </span>
        <span className="text-muted-foreground flex size-6 items-center justify-center text-xs leading-none">
          −
        </span>
      </div>
    </div>
  );
}
