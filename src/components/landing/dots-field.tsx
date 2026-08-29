import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Abstract particle fields for the landing stat cards, one behavior each:
 *
 * - "filter": dots drift in as noise, settle into an exact grid, and the
 *   flagged ones (accent) get ejected before the grid locks. Loops.
 * - "bars": dots flow in and stack into an ascending dotted bar chart —
 *   traffic turning into revenue. Loops.
 * - "drift": dots fade in (a visit is counted), live briefly, then dissolve
 *   without a trace and reappear somewhere unrelated — nothing stored,
 *   nothing linking one appearance to the next.
 *
 * All variants render their settled/calm state when the visitor prefers
 * reduced motion.
 */

const GRID = 24;
const COUNT = GRID * GRID;
const ACCENT_RATIO = 0.12;

/** Phase timings in seconds for the looping variants. */
const SCATTER_T = 2.6;
const SETTLE_T = 2.8;
const HOLD_T = 2.2;
const CYCLE_T = SCATTER_T + SETTLE_T + HOLD_T;

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export type DotsVariant = "filter" | "bars" | "drift";

export function DotsField(props: {
  className?: string;
  variant?: DotsVariant;
  /** Regular dots; defaults to warm off-white. */
  dotColor?: string;
  /** Accented dots (ejected bots, conversions); defaults to orange. */
  accentColor?: string;
}) {
  const mountRef = useRef<HTMLDivElement>(null);
  const variant = props.variant ?? "filter";

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const PAPER = new THREE.Color(props.dotColor ?? "#f5f3ef");
    const ACCENT = new THREE.Color(props.accentColor ?? "#ec8b2f");

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    camera.position.z = 2;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    // Deterministic pseudo-random so SSR/CSR and every loop agree.
    let seed = 1873;
    const rand = () => {
      seed = (seed * 16807) % 2147483647;
      return (seed - 1) / 2147483646;
    };

    const home = new Float32Array(COUNT * 3);
    const scatter = new Float32Array(COUNT * 3);
    const drift = new Float32Array(COUNT * 3);
    const isAccent = new Uint8Array(COUNT);
    const colors = new Float32Array(COUNT * 3);
    const positions = new Float32Array(COUNT * 3);

    const span = 1.64;

    // Shared scatter cloud + per-dot noise.
    for (let i = 0; i < COUNT; i++) {
      scatter[i * 3] = (rand() - 0.5) * 2.4;
      scatter[i * 3 + 1] = (rand() - 0.5) * 2.4;
      scatter[i * 3 + 2] = 0;

      drift[i * 3] = (rand() - 0.5) * 0.22;
      drift[i * 3 + 1] = (rand() - 0.5) * 0.22;
      drift[i * 3 + 2] = 0;

      isAccent[i] = rand() < ACCENT_RATIO ? 1 : 0;
      const c = isAccent[i] ? ACCENT : PAPER;
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    // Home positions per variant.
    if (variant === "bars") {
      // Ascending dotted bar chart: taller columns hold more dots so the
      // fill density stays constant. Small x jitter keeps the bars dotted.
      const COLS = 12;
      const weights = Array.from({ length: COLS }, (_, c) => c + 1);
      const totalWeight = weights.reduce((a, b) => a + b, 0);
      let idx = 0;
      for (let c = 0; c < COLS; c++) {
        const n =
          c === COLS - 1
            ? COUNT - idx
            : Math.round((COUNT * weights[c]) / totalWeight);
        const colX = (c / (COLS - 1) - 0.5) * span;
        const colH = (span * (c + 1)) / COLS;
        for (let k = 0; k < n && idx < COUNT; k++, idx++) {
          home[idx * 3] = colX + (rand() - 0.5) * 0.07;
          home[idx * 3 + 1] = -span / 2 + rand() * colH;
          home[idx * 3 + 2] = 0;
        }
      }
    } else {
      // Exact grid (used by "filter"; ignored by "drift").
      for (let i = 0; i < COUNT; i++) {
        const gx = i % GRID;
        const gy = Math.floor(i / GRID);
        home[i * 3] = (gx / (GRID - 1) - 0.5) * span;
        home[i * 3 + 1] = (gy / (GRID - 1) - 0.5) * span;
        home[i * 3 + 2] = 0;
      }
    }

    // Per-dot lifecycle parameters for the "drift" variant.
    const lifePhase = new Float32Array(COUNT);
    const alphas = new Float32Array(COUNT);
    alphas.fill(1);
    if (variant === "drift") {
      for (let i = 0; i < COUNT; i++) {
        lifePhase[i] = rand();
        // Anonymity: every dot identical, no accent highlights.
        colors[i * 3] = PAPER.r;
        colors[i * 3 + 1] = PAPER.g;
        colors[i * 3 + 2] = PAPER.b;
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute("alpha", new THREE.BufferAttribute(alphas, 1));

    // Custom shader for every variant: raw GL points are squares, the
    // fragment mask rounds them into soft circles, and the alpha attribute
    // lets "drift" fade dots individually.
    const material = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      vertexColors: true,
      // PointsMaterial scales size by the renderer pixel ratio internally;
      // the shader must do the same or dots shrink on retina screens.
      uniforms: {
        uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
      },
      vertexShader: `
        uniform float uPixelRatio;
        attribute float alpha;
        varying float vAlpha;
        varying vec3 vColor;
        void main() {
          vColor = color;
          vAlpha = alpha;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = 4.0 * uPixelRatio;
        }
      `,
      fragmentShader: `
        varying float vAlpha;
        varying vec3 vColor;
        void main() {
          float d = length(gl_PointCoord - 0.5);
          float mask = 1.0 - smoothstep(0.38, 0.5, d);
          if (mask < 0.01) discard;
          gl_FragColor = vec4(vColor, vAlpha * 0.95 * mask);
        }
      `,
    });

    scene.add(new THREE.Points(geometry, material));

    const posAttr = geometry.getAttribute("position") as THREE.BufferAttribute;
    const alphaAttr = geometry.getAttribute("alpha") as THREE.BufferAttribute;

    function layoutFilter(time: number) {
      const t = time % CYCLE_T;
      for (let i = 0; i < COUNT; i++) {
        const j = i * 3;
        let x: number;
        let y: number;

        if (t < SCATTER_T) {
          // Loose cloud, slowly breathing.
          const w = t / SCATTER_T;
          x = scatter[j] + Math.sin(time * 0.7 + i) * drift[j] * (1 - w * 0.3);
          y =
            scatter[j + 1] +
            Math.cos(time * 0.6 + i * 1.3) * drift[j + 1] * (1 - w * 0.3);
        } else if (t < SCATTER_T + SETTLE_T) {
          const w = easeInOutCubic((t - SCATTER_T) / SETTLE_T);
          if (isAccent[i]) {
            // Bots get pushed off the bottom edge instead of joining the grid.
            x = scatter[j] * (1 + w * 0.4);
            y = scatter[j + 1] - w * 2.6;
          } else {
            x = scatter[j] + (home[j] - scatter[j]) * w;
            y = scatter[j + 1] + (home[j + 1] - scatter[j + 1]) * w;
          }
        } else {
          if (isAccent[i]) {
            x = scatter[j];
            y = scatter[j + 1] - 2.6;
          } else {
            x = home[j];
            y = home[j + 1];
          }
        }

        positions[j] = x;
        positions[j + 1] = y;
      }
      posAttr.needsUpdate = true;
    }

    function layoutBars(time: number) {
      const t = time % CYCLE_T;
      for (let i = 0; i < COUNT; i++) {
        const j = i * 3;
        let x: number;
        let y: number;

        if (t < SCATTER_T) {
          // Cloud drifting in from the left.
          const w = t / SCATTER_T;
          x =
            scatter[j] -
            (1 - w) * 0.5 +
            Math.sin(time * 0.7 + i) * drift[j] * (1 - w * 0.3);
          y =
            scatter[j + 1] +
            Math.cos(time * 0.6 + i * 1.3) * drift[j + 1] * (1 - w * 0.3);
        } else if (t < SCATTER_T + SETTLE_T) {
          // Everyone counts here: dots stack into the ascending chart.
          const w = easeInOutCubic((t - SCATTER_T) / SETTLE_T);
          x = scatter[j] + (home[j] - scatter[j]) * w;
          y = scatter[j + 1] + (home[j + 1] - scatter[j + 1]) * w;
        } else {
          x = home[j];
          y = home[j + 1];
        }

        positions[j] = x;
        positions[j + 1] = y;
      }
      posAttr.needsUpdate = true;
    }

    // Deterministic hash so each dot gets a fresh, unrelated anchor per life.
    function hash(n: number) {
      const s = Math.sin(n) * 43758.5453;
      return s - Math.floor(s);
    }

    // Matches the tempo of the other variants' 7.6s cycles: with staggered
    // phases, fades happen as often as their transitions do.
    const LIFE_T = 4;

    function layoutDrift(time: number) {
      // Each dot fades in at a random spot, drifts gently, dissolves, and
      // reappears somewhere unrelated. No trails, no continuity.
      for (let i = 0; i < COUNT; i++) {
        const j = i * 3;
        const total = time / LIFE_T + lifePhase[i];
        const cycle = Math.floor(total);
        const local = total - cycle;

        const ax = (hash(i * 12.9898 + cycle * 78.233) - 0.5) * 1.9;
        const ay = (hash(i * 3.171 + cycle * 151.31) - 0.5) * 1.7;

        positions[j] = ax + Math.sin(time * 0.55 + i) * 0.04;
        positions[j + 1] = ay + Math.cos(time * 0.45 + i * 1.3) * 0.04;

        alphas[i] =
          local < 0.18
            ? local / 0.18
            : local > 0.82
              ? (1 - local) / 0.18
              : 1;
      }
      posAttr.needsUpdate = true;
      alphaAttr.needsUpdate = true;
    }

    const layout =
      variant === "bars"
        ? layoutBars
        : variant === "drift"
          ? layoutDrift
          : layoutFilter;

    function resize() {
      const { clientWidth: w, clientHeight: h } = mount;
      if (!w || !h) return;
      renderer.setSize(w, h);
      // Fixed -1..1 frustum on both axes so the field stretches to fill the
      // container, whatever its shape (points are screen-space sized, so
      // non-uniform scaling is invisible).
      camera.left = -1;
      camera.right = 1;
      camera.top = 1;
      camera.bottom = -1;
      camera.updateProjectionMatrix();
    }

    const observer = new ResizeObserver(resize);
    observer.observe(mount);
    resize();

    let frame = 0;
    // Don't start the cycle until the card is actually in front of the
    // visitor, so they see the animation from the beginning instead of
    // arriving mid-loop (matters in the horizontal card scroller).
    let visible = false;
    const visibility = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !visible) {
            visible = true;
            clock.start();
          }
        }
      },
      { threshold: 0.5 },
    );

    const clock = new THREE.Clock(false);
    if (reduceMotion) {
      // Settled state: locked grid / full chart / resting scatter.
      layout(variant === "drift" ? 0 : SCATTER_T + SETTLE_T + 0.1);
      renderer.render(scene, camera);
    } else {
      visibility.observe(mount);
      const tick = () => {
        layout(visible ? clock.getElapsedTime() : 0);
        renderer.render(scene, camera);
        frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    }

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      visibility.disconnect();
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, [props.dotColor, props.accentColor, variant]);

  return <div ref={mountRef} className={props.className} aria-hidden="true" />;
}

export default DotsField;
