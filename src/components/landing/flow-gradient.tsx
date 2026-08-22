import { useEffect, useRef } from "react";

/**
 * Croisette-style flowing gradient, ported from the template's actual
 * wave-gradient shader config: soft orange + lilac pastels over the page
 * background, hard-light blended against black (which produces the neon
 * magenta/violet midtones), masked out toward the bottom, moving slowly.
 *
 * Self-contained: pauses offscreen, renders a single static frame for
 * reduced motion, caps DPR, and follows the color scheme for the base.
 */

const VERT = `
attribute vec2 a_pos;
varying vec2 v_uv;
void main() {
  v_uv = a_pos * 0.5 + 0.5;
  gl_Position = vec4(a_pos, 0.0, 1.0);
}
`;

const FRAG = `
precision highp float;
varying vec2 v_uv;
uniform float u_time;
uniform float u_aspect;
uniform vec3 u_base;
uniform float u_neon;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  // Three octaves keeps the field soft and blobby (the CSS blur on top
  // finishes the gaussian look); more octaves reads as grainy smoke.
  for (int i = 0; i < 3; i++) {
    v += a * noise(p);
    p = p * 2.03 + vec2(4.7, 8.1);
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = v_uv;
  uv.x *= u_aspect;
  float t = u_time * 0.05;

  // Large, slow domain warp that bends the color bands into organic pools.
  vec2 q = vec2(
    fbm(uv * 0.8 + vec2(0.0, t)),
    fbm(uv * 0.8 - vec2(t * 0.7, 0.0))
  );
  float warp = fbm(uv * 0.9 + 1.8 * q + 0.3 * t);

  // Croisette's wave-gradient cycles through its palette in distorted
  // bands: orange -> background -> lilac -> orange. That cycling is what
  // creates the big separate orange regions and black pools.
  float w = uv.x * 0.35 + v_uv.y * 1.1 + 1.6 * warp + 0.15 * t;
  float x = fract(w) * 3.0;

  vec3 orange = vec3(1.0, 0.663, 0.369);
  vec3 lilac = vec3(0.867, 0.529, 1.0);
  vec3 col = mix(orange, u_base, smoothstep(0.0, 1.0, x));
  col = mix(col, lilac, smoothstep(1.0, 2.0, x));
  col = mix(col, orange, smoothstep(2.0, 3.0, x));

  // Hard-light against black turns the pastel midtones into neon
  // magenta/hot-pink and deep violet. Skipped in light mode (u_neon = 0)
  // where the pastels sit softly on white instead.
  vec3 neon = max(col * 2.0 - 1.0, 0.0);
  gl_FragColor = vec4(mix(col, neon, u_neon), 1.0);
}
`;

const DARK_BASE: [number, number, number] = [0.05, 0.04, 0.07];
const LIGHT_BASE: [number, number, number] = [1, 1, 1];

export function FlowGradient({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", {
      antialias: false,
      depth: false,
      stencil: false,
      alpha: false,
      powerPreference: "low-power",
    });
    if (!gl) return;

    const compile = (type: number, source: string) => {
      const shader = gl.createShader(type)!;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      return shader;
    };
    const program = gl.createProgram()!;
    gl.attachShader(program, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(program, compile(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW,
    );
    const posLoc = gl.getAttribLocation(program, "a_pos");
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    const timeLoc = gl.getUniformLocation(program, "u_time");
    const aspectLoc = gl.getUniformLocation(program, "u_aspect");
    const baseLoc = gl.getUniformLocation(program, "u_base");
    const neonLoc = gl.getUniformLocation(program, "u_neon");

    const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    let frame = 0;
    let visible = true;
    const start = performance.now();

    const applyBase = () => {
      gl.uniform3fv(baseLoc, darkQuery.matches ? DARK_BASE : LIGHT_BASE);
      gl.uniform1f(neonLoc, darkQuery.matches ? 1 : 0);
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const width = Math.max(1, Math.round(canvas.clientWidth * dpr));
      const height = Math.max(1, Math.round(canvas.clientHeight * dpr));
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        gl.viewport(0, 0, width, height);
        gl.uniform1f(aspectLoc, width / height);
      }
    };

    const draw = (timeSeconds: number) => {
      resize();
      gl.uniform1f(timeLoc, timeSeconds);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    const loop = () => {
      draw((performance.now() - start) / 1000);
      frame = requestAnimationFrame(loop);
    };

    const renderStill = () => {
      applyBase();
      draw(40);
    };

    const startOrStill = () => {
      cancelAnimationFrame(frame);
      applyBase();
      if (motionQuery.matches) {
        renderStill();
      } else if (visible) {
        frame = requestAnimationFrame(loop);
      }
    };

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry?.isIntersecting ?? true;
      startOrStill();
    });
    observer.observe(canvas);

    const resizeObserver = new ResizeObserver(() => {
      if (motionQuery.matches) renderStill();
    });
    resizeObserver.observe(canvas);

    darkQuery.addEventListener("change", startOrStill);
    motionQuery.addEventListener("change", startOrStill);
    startOrStill();

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      resizeObserver.disconnect();
      darkQuery.removeEventListener("change", startOrStill);
      motionQuery.removeEventListener("change", startOrStill);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, []);

  // Same trick as the Croisette template: the shader is masked out toward
  // the bottom so the page background pools there.
  const bottomFadeMask = "linear-gradient(0deg, rgba(0,0,0,0) 0%, #000 50%)";

  return (
    <div
      className={className}
      aria-hidden="true"
      style={{
        overflow: "hidden",
        maskImage: bottomFadeMask,
        WebkitMaskImage: bottomFadeMask,
      }}
    >
      {/* Oversized + blurred so the gaussian softness never exposes canvas edges. */}
      <canvas
        ref={canvasRef}
        className="h-full w-full"
        style={{ transform: "scale(1.2)", filter: "blur(36px)" }}
      />
    </div>
  );
}

export default FlowGradient;
