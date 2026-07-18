const SHARE_URL =
  "https://www.colorsandfonts.com/shaders-builder/embed/?preset=noise-mesh&c0=%23faf5ff&c1=%23c4b5fd&c2=%23fda4af&c3=%23fffbeb&speed=0.07795111772522328&scale=1.0205903373184793&intensity=0.9129925062021291&grain=0.1959294411906329&freq=0.8898601222553233&amp=0.8636063186802582&bri=1.004887837729869&con=0.9321477578853551&engine=3d" as const;

export function HeroShaderBackground() {
  return (
    <iframe
      src={SHARE_URL}
      title=""
      loading="eager"
      className="pointer-events-none absolute inset-0 z-0 h-full w-full border-0 motion-reduce:hidden"
      aria-hidden
    />
  );
}

export default HeroShaderBackground;
