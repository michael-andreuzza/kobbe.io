import { loadFont } from "@remotion/fonts";
import React from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  OffthreadVideo,
  Sequence,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

import { colors, font } from "./theme";

loadFont({
  family: "InterVariable",
  url: staticFile("InterVariable.woff2"),
  weight: "100 900",
});

const FPS = 30;

const INTRO = 105;
const CLIP = 110;
const OUTRO = 135;

type ClipSpec = {
  label: string;
  sub: string;
  color: string;
  /** Second in the walkthrough footage to start from. */
  startAtSec: number;
  /** CSS transform-origin: where the zoom pushes into. */
  origin: string;
  scaleFrom: number;
  scaleTo: number;
  framed?: boolean;
};

/* startAtSec offsets come from the recording script's section timestamps
   (Overview 7.9, Realtime 18.8, Events 39.3, Funnels 46.9, Revenue 55.7,
   Performance 64.8), nudged forward so each page is settled on screen. */
const clips: ClipSpec[] = [
  {
    label: "Traffic",
    sub: "Visitors, sources, and pages — live",
    color: colors.brand,
    startAtSec: 9,
    origin: "62% 28%",
    scaleFrom: 1.06,
    scaleTo: 1.22,
  },
  {
    label: "Realtime",
    sub: "Who is on your site right now",
    color: colors.cyan,
    startAtSec: 22.5,
    // Push into the globe: the seeded local site has no live visitors, so
    // keep the zeroed "online now" KPI row out of the crop.
    origin: "50% 78%",
    scaleFrom: 1.35,
    scaleTo: 1.5,
    framed: true,
  },
  {
    label: "Funnels",
    sub: "Watch visits become signups",
    color: colors.purple,
    startAtSec: 48.6,
    origin: "50% 42%",
    scaleFrom: 1.05,
    scaleTo: 1.38,
  },
  {
    label: "Revenue",
    sub: "Every sale, attributed to its page",
    color: colors.pink,
    startAtSec: 57.4,
    origin: "35% 18%",
    scaleFrom: 1.08,
    scaleTo: 1.26,
    framed: true,
  },
  {
    label: "Performance",
    sub: "Core Web Vitals from real visits",
    color: colors.peach,
    startAtSec: 66.5,
    origin: "55% 45%",
    scaleFrom: 1.05,
    scaleTo: 1.22,
  },
];

export const promoDurationInFrames = INTRO + clips.length * CLIP + OUTRO;

/* ------------------------------- Intro -------------------------------- */

const Intro: React.FC = () => {
  const frame = useCurrentFrame();

  const spacing = interpolate(frame, [0, 70], [0.42, 0.08], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const wordmarkOpacity = interpolate(frame, [0, 22], [0, 1], {
    extrapolateRight: "clamp",
  });
  const taglineOpacity = interpolate(frame, [38, 58], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const taglineRise = interpolate(frame, [38, 58], [14, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const ruleWidth = interpolate(frame, [30, 70], [0, 260], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  // Leave by scaling forward slightly, like a camera passing through.
  const exit = interpolate(frame, [INTRO - 18, INTRO], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.in(Easing.cubic),
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.sand,
        alignItems: "center",
        justifyContent: "center",
        fontFamily: font,
        opacity: 1 - exit,
        transform: `scale(${1 + exit * 0.12})`,
      }}
    >
      <div
        style={{
          color: colors.carbon,
          fontSize: 148,
          fontWeight: 650,
          letterSpacing: `${spacing}em`,
          // Compensate the trailing letter-space so the word stays centered.
          marginRight: `-${spacing}em`,
          opacity: wordmarkOpacity,
        }}
      >
        KOBBE
      </div>
      {/* Gapless spectrum chip strip, the landing hero's signature. */}
      <div
        style={{
          display: "flex",
          width: ruleWidth,
          height: 10,
          borderRadius: 2,
          overflow: "hidden",
          marginTop: 42,
        }}
      >
        {[colors.peach, colors.pink, colors.purple, colors.cyan].map((c) => (
          <div key={c} style={{ flex: 1, backgroundColor: c }} />
        ))}
      </div>
      <div
        style={{
          marginTop: 40,
          color: colors.mutedForeground,
          fontSize: 40,
          fontWeight: 480,
          letterSpacing: "0.01em",
          opacity: taglineOpacity,
          transform: `translateY(${taglineRise}px)`,
        }}
      >
        Privacy-first web analytics, with revenue built in.
      </div>
    </AbsoluteFill>
  );
};

/* -------------------------------- Clips ------------------------------- */

const ClipLabel: React.FC<{ spec: ClipSpec; onCard: boolean }> = ({
  spec,
  onCard,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = spring({
    frame: frame - 8,
    fps,
    config: { damping: 200, stiffness: 120 },
  });

  return (
    <div
      style={{
        position: "absolute",
        left: 72,
        bottom: 64,
        display: "flex",
        alignItems: "center",
        gap: 22,
        fontFamily: font,
        opacity: enter,
        transform: `translateY(${(1 - enter) * 30}px)`,
      }}
    >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            backgroundColor: onCard ? "transparent" : "rgba(255,255,255,0.94)",
            borderRadius: 12,
            border: onCard ? "none" : `1px solid ${colors.border}`,
            padding: onCard ? 0 : "18px 34px 18px 26px",
            boxShadow: onCard ? "none" : "0 8px 28px rgba(43,43,43,0.10)",
          }}
        >
          <div
            style={{
              width: 20,
              height: 20,
              borderRadius: 4,
              backgroundColor: spec.color,
            }}
          />
        <div>
          <div
            style={{
              color: colors.carbon,
              fontSize: 44,
              fontWeight: 620,
              lineHeight: 1.05,
            }}
          >
            {spec.label}
          </div>
          <div
            style={{
              color: colors.mutedForeground,
              fontSize: 24,
              fontWeight: 480,
              marginTop: 6,
            }}
          >
            {spec.sub}
          </div>
        </div>
      </div>
    </div>
  );
};

const Clip: React.FC<{ spec: ClipSpec }> = ({ spec }) => {
  const frame = useCurrentFrame();

  const fadeIn = interpolate(frame, [0, 10], [0, 1], {
    extrapolateRight: "clamp",
  });
  const fadeOut = interpolate(frame, [CLIP - 10, CLIP], [1, 0], {
    extrapolateLeft: "clamp",
  });
  // A slow, steady push — the elegance is in the patience.
  const scale = interpolate(frame, [0, CLIP], [spec.scaleFrom, spec.scaleTo], {
    easing: Easing.inOut(Easing.quad),
  });

  const video = (
    <OffthreadVideo
      muted
      src={staticFile("walkthrough.mp4")}
      startFrom={Math.round(spec.startAtSec * FPS)}
      style={{ width: "100%", height: "100%", objectFit: "cover" }}
    />
  );

  return (
    <AbsoluteFill
      style={{ backgroundColor: colors.sand, opacity: fadeIn * fadeOut }}
    >
      {spec.framed ? (
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
          <div
            style={{
              width: 1560,
              height: 878,
              borderRadius: 14,
              overflow: "hidden",
              boxShadow:
                "0 20px 60px rgba(43,43,43,0.12), 0 1px 3px rgba(43,43,43,0.08)",
              border: `1px solid ${colors.border}`,
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                transform: `scale(${scale})`,
                transformOrigin: spec.origin,
              }}
            >
              {video}
            </div>
          </div>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill
          style={{ transform: `scale(${scale})`, transformOrigin: spec.origin }}
        >
          {video}
        </AbsoluteFill>
      )}
      <ClipLabel spec={spec} onCard={false} />
    </AbsoluteFill>
  );
};

/* -------------------------------- Outro ------------------------------- */

const Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const bgIn = interpolate(frame, [0, 12], [0, 1], {
    extrapolateRight: "clamp",
  });
  const line = spring({ frame: frame - 6, fps, config: { damping: 200 } });
  const markIn = spring({ frame: frame - 40, fps, config: { damping: 200 } });
  const pillIn = spring({ frame: frame - 62, fps, config: { damping: 200 } });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.carbon,
        alignItems: "center",
        justifyContent: "center",
        fontFamily: font,
        opacity: bgIn,
      }}
    >
      <div
        style={{
          color: colors.onCarbon,
          fontSize: 96,
          fontWeight: 640,
          letterSpacing: "-0.02em",
          opacity: line,
          transform: `translateY(${(1 - line) * 40}px)`,
        }}
      >
        Know what works.
      </div>
      <div
        style={{
          marginTop: 44,
          color: colors.onCarbonMuted,
          fontSize: 38,
          fontWeight: 500,
          letterSpacing: "0.22em",
          opacity: markIn,
          transform: `translateY(${(1 - markIn) * 24}px)`,
        }}
      >
        KOBBE.IO
      </div>
      <div
        style={{
          marginTop: 64,
          backgroundColor: colors.onCarbon,
          color: colors.carbon,
          fontSize: 30,
          fontWeight: 560,
          borderRadius: 12,
          padding: "20px 40px",
          opacity: pillIn,
          transform: `translateY(${(1 - pillIn) * 24}px)`,
        }}
      >
        Start a 15-day free trial
      </div>
    </AbsoluteFill>
  );
};

/* ------------------------------ Composition --------------------------- */

export const Promo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: colors.sand }}>
      <Sequence durationInFrames={INTRO}>
        <Intro />
      </Sequence>
      {clips.map((spec, i) => (
        <Sequence
          key={spec.label}
          from={INTRO + i * CLIP}
          durationInFrames={CLIP}
        >
          <Clip spec={spec} />
        </Sequence>
      ))}
      <Sequence from={INTRO + clips.length * CLIP} durationInFrames={OUTRO}>
        <Outro />
      </Sequence>
    </AbsoluteFill>
  );
};
