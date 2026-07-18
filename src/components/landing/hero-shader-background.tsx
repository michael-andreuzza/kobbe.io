import { useEffect, useState } from "react";

/** Canvas-only embed from Colors & Fonts Shader Maker (not the full builder UI). */
const SHADER_EMBED_URL =
  "https://www.colorsandfonts.com/shaders-builder/embed?preset=noise-mesh&c0=%23faf5ff&c1=%23c4b5fd&c2=%23fda4af&c3=%23fffbeb&speed=0.1502041017346391&scale=1.1341852863725506&intensity=0.7364013962919264&grain=0.2445163464872103&freq=0.8888945482207203&amp=0.9892022166954456&bri=1.0380603018747485&con=1.010329354073922";

export function HeroShaderBackground() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    );
  }, []);

  if (!enabled) {
    return null;
  }

  return (
    <iframe
      src={SHADER_EMBED_URL}
      title=""
      loading="lazy"
      className="pointer-events-none absolute inset-0 h-full w-full border-0"
      aria-hidden
    />
  );
}

export default HeroShaderBackground;
