import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";

type FooterLogoRevealProps = {
  className?: string;
};

const LOGO_TEXT = "kobbe";
const CHART_VARS = [
  "--chart-1",
  "--chart-2",
  "--chart-3",
  "--chart-4",
  "--chart-5",
] as const;
const FONT_FAMILY =
  'InterVariable, ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"';
const MAX_PARTICLES = 10_000;
const TRACKING_EM = -0.06;

type Particle = {
  startX: number;
  startY: number;
  targetX: number;
  targetY: number;
  color: string;
  size: number;
  offsetX: number;
  offsetY: number;
  velocityX: number;
  velocityY: number;
};

type ParticleTargets = {
  fontSize: number;
  width: number;
  height: number;
  particles: Particle[];
};

function getChartColors(root: HTMLElement) {
  const styles = getComputedStyle(root);
  return CHART_VARS.map((name) => styles.getPropertyValue(name).trim()).filter(
    Boolean,
  );
}

function pickColorForX(
  x: number,
  letterBounds: { start: number; end: number; color: string }[],
  colors: string[],
) {
  return (
    letterBounds.find((bound) => x >= bound.start + 4 && x < bound.end + 4)
      ?.color ??
    letterBounds[letterBounds.length - 1]?.color ??
    colors[0] ??
    "#ffffff"
  );
}

function reservoirSampleTextPixels(
  data: Uint8ClampedArray,
  width: number,
  height: number,
  count: number,
  letterBounds: { start: number; end: number; color: string }[],
  colors: string[],
) {
  const selected: { x: number; y: number; color: string }[] = [];
  let seen = 0;

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const alpha = data[(y * width + x) * 4 + 3];
      if (alpha <= 110) continue;

      seen += 1;
      const sample = {
        x: x + Math.random(),
        y: y + Math.random(),
        color: pickColorForX(x, letterBounds, colors),
      };

      if (selected.length < count) {
        selected.push(sample);
        continue;
      }

      const replaceIndex = Math.floor(Math.random() * seen);
      if (replaceIndex < count) {
        selected[replaceIndex] = sample;
      }
    }
  }

  return selected;
}

function buildParticleTargets(
  text: string,
  viewportWidth: number,
  colors: string[],
): ParticleTargets {
  const probe = document.createElement("canvas");
  const probeCtx = probe.getContext("2d");
  if (!probeCtx) {
    return { fontSize: 0, width: 0, height: 0, particles: [] };
  }

  let fontSize = 100;
  probeCtx.font = `500 ${fontSize}px ${FONT_FAMILY}`;

  const tracking = TRACKING_EM * fontSize;
  let measuredWidth = 0;
  for (const char of text) {
    measuredWidth += probeCtx.measureText(char).width + tracking;
  }
  measuredWidth -= tracking;

  fontSize = (fontSize * viewportWidth) / measuredWidth;
  const trackingPx = TRACKING_EM * fontSize;

  probeCtx.font = `500 ${fontSize}px ${FONT_FAMILY}`;

  let textWidth = 0;
  const letterBounds: { start: number; end: number; color: string }[] = [];
  let cursor = 0;
  for (const [index, char] of [...text].entries()) {
    const charWidth = probeCtx.measureText(char).width;
    letterBounds.push({
      start: cursor,
      end: cursor + charWidth,
      color: colors[index] ?? colors[colors.length - 1] ?? "#ffffff",
    });
    cursor += charWidth + trackingPx;
    textWidth = cursor;
  }
  textWidth -= trackingPx;

  const textHeight = fontSize * 0.92;
  probe.width = Math.ceil(textWidth) + 8;
  probe.height = Math.ceil(textHeight) + 8;

  probeCtx.font = `500 ${fontSize}px ${FONT_FAMILY}`;
  probeCtx.fillStyle = "#ffffff";
  probeCtx.textBaseline = "alphabetic";

  cursor = 4;
  const baseline = fontSize * 0.82;
  for (const char of text) {
    probeCtx.fillText(char, cursor, baseline);
    cursor += probeCtx.measureText(char).width + trackingPx;
  }

  const { data, width, height } = probeCtx.getImageData(
    0,
    0,
    probe.width,
    probe.height,
  );

  const selected = reservoirSampleTextPixels(
    data,
    width,
    height,
    MAX_PARTICLES,
    letterBounds,
    colors,
  );
  const offsetX = (viewportWidth - textWidth) / 2;

  if (selected.length === 0) {
    return { fontSize, width: viewportWidth, height: 0, particles: [] };
  }

  const minY = Math.min(...selected.map((sample) => sample.y));
  const maxY = Math.max(...selected.map((sample) => sample.y));
  const verticalPadding = 4;
  const contentHeight = maxY - minY + verticalPadding * 2;

  const particles = selected.map((sample) => {
    const targetX = offsetX + sample.x;
    const targetY = sample.y - minY + verticalPadding;

    const spread = Math.max(viewportWidth, contentHeight) * 0.55;
    const angle = Math.random() * Math.PI * 2;
    const radius = Math.sqrt(Math.random()) * spread;

    return {
      startX: targetX + Math.cos(angle) * radius,
      startY: targetY + Math.sin(angle) * radius + contentHeight * 0.35,
      targetX,
      targetY,
      color: sample.color,
      size: 0.75 + Math.random() * 0.85,
      offsetX: 0,
      offsetY: 0,
      velocityX: 0,
      velocityY: 0,
    };
  });

  return {
    fontSize,
    width: viewportWidth,
    height: contentHeight,
    particles,
  };
}

function easeOutCubic(value: number) {
  return 1 - (1 - value) ** 3;
}

export function FooterLogoReveal({ className }: FooterLogoRevealProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    if (!root || !canvas) return;

    const abort = new AbortController();
    const state = {
      revealProgress: shouldReduceMotion ? 1 : 0,
      pointerX: -9999,
      pointerY: -9999,
      pointerActive: false,
      burstProgress: 0,
    };

    let targets: ParticleTargets = {
      fontSize: 0,
      width: 0,
      height: 0,
      particles: [],
    };
    let frameId = 0;
    let cleanupGsap: (() => void) | undefined;

    const scatterParticles = () => {
      const spread = Math.max(targets.width, targets.height) * 0.55;
      for (const particle of targets.particles) {
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.sqrt(Math.random()) * spread;
        particle.startX = particle.targetX + Math.cos(angle) * radius;
        particle.startY =
          particle.targetY + Math.sin(angle) * radius + targets.height * 0.35;
        particle.offsetX = 0;
        particle.offsetY = 0;
        particle.velocityX = 0;
        particle.velocityY = 0;
      }
    };

    const rebuild = () => {
      const colors = getChartColors(root);
      if (colors.length === 0) return;

      const viewportWidth = document.documentElement.clientWidth;
      targets = buildParticleTargets(LOGO_TEXT, viewportWidth, colors);

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.ceil(targets.width * dpr);
      canvas.height = Math.ceil(targets.height * dpr);
      canvas.style.width = `${targets.width}px`;
      canvas.style.height = `${targets.height}px`;

      scatterParticles();
      if (shouldReduceMotion) {
        state.revealProgress = 1;
      }
    };

    const draw = () => {
      const ctx = canvas.getContext("2d");
      if (!ctx || targets.particles.length === 0) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, targets.width, targets.height);

      const formProgress = easeOutCubic(
        Math.min(1, Math.max(0, state.revealProgress)),
      );
      const burst = state.burstProgress;
      const fadeIn = Math.min(1, formProgress / 0.22);
      const isSettled =
        formProgress >= 0.999 && !state.pointerActive && burst <= 0.001;

      if (fadeIn <= 0 && burst <= 0) return;

      for (const particle of targets.particles) {
        let x: number;
        let y: number;

        if (isSettled) {
          x = particle.targetX;
          y = particle.targetY;
          particle.offsetX = 0;
          particle.offsetY = 0;
          particle.velocityX = 0;
          particle.velocityY = 0;
        } else {
          const assembleProgress = Math.max(0, (formProgress - 0.08) / 0.92);
          x =
            particle.startX +
            (particle.targetX - particle.startX) * assembleProgress +
            particle.offsetX;
          y =
            particle.startY +
            (particle.targetY - particle.startY) * assembleProgress +
            particle.offsetY;

          if (burst > 0) {
            const dx = x - state.pointerX;
            const dy = y - state.pointerY;
            const dist = Math.hypot(dx, dy) || 1;
            const wave = Math.max(0, 1 - dist / 240);
            const easedWave = wave * wave;
            x += (dx / dist) * easedWave * burst * 16;
            y += (dy / dist) * easedWave * burst * 16;
          }

          if (state.pointerActive && formProgress > 0.92) {
            const dx = x - state.pointerX;
            const dy = y - state.pointerY;
            const dist = Math.hypot(dx, dy);
            if (dist < 120 && dist > 0) {
              const force = (1 - dist / 120) * 0.35;
              particle.velocityX += (dx / dist) * force;
              particle.velocityY += (dy / dist) * force;
            }
          }

          particle.velocityX *= 0.84;
          particle.velocityY *= 0.84;
          particle.offsetX += particle.velocityX;
          particle.offsetY += particle.velocityY;
          particle.offsetX *= 0.9;
          particle.offsetY *= 0.9;
        }

        ctx.globalAlpha = burst > 0 ? 1 : fadeIn * fadeIn;
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(x, y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
    };

    const tick = () => {
      draw();
      frameId = window.requestAnimationFrame(tick);
    };

    const playReveal = async () => {
      if (shouldReduceMotion) return;

      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      if (abort.signal.aborted) return;

      gsap.registerPlugin(ScrollTrigger);

      const context = gsap.context(() => {
        const timeline = gsap.timeline({ defaults: { ease: "none" } }).to(state, {
          revealProgress: 1,
          duration: 1,
        });

        ScrollTrigger.create({
          trigger: root,
          start: "top bottom",
          end: "bottom bottom",
          scrub: 0.85,
          animation: timeline,
          invalidateOnRefresh: true,
        });

        ScrollTrigger.refresh();
      }, root);

      cleanupGsap = () => context.revert();
    };

    const playBurst = async () => {
      if (shouldReduceMotion) return;

      const { gsap } = await import("gsap");
      gsap.killTweensOf(state);

      gsap
        .timeline()
        .to(state, {
          burstProgress: 0.85,
          duration: 0.28,
          ease: "sine.out",
        })
        .to(state, {
          burstProgress: 0,
          duration: 1.35,
          ease: "power3.out",
        });
    };

    rebuild();
    tick();
    void playReveal();

    const onResize = () => {
      rebuild();
      void import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
        ScrollTrigger.refresh();
      });
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      state.pointerX = event.clientX - rect.left;
      state.pointerY = event.clientY - rect.top;
      state.pointerActive = true;
    };

    const onPointerLeave = () => {
      state.pointerActive = false;
    };

    window.addEventListener("resize", onResize, { signal: abort.signal });
    canvas.addEventListener("pointermove", onPointerMove, {
      signal: abort.signal,
    });
    canvas.addEventListener("pointerleave", onPointerLeave, {
      signal: abort.signal,
    });
    canvas.addEventListener("click", () => void playBurst(), {
      signal: abort.signal,
    });

    return () => {
      abort.abort();
      window.cancelAnimationFrame(frameId);
      cleanupGsap?.();
    };
  }, [shouldReduceMotion]);

  return (
    <div
      ref={rootRef}
      className={className}
      aria-label={LOGO_TEXT}
      role="img"
    >
      <canvas ref={canvasRef} className="block cursor-pointer leading-none" />
    </div>
  );
}

export default FooterLogoReveal;
