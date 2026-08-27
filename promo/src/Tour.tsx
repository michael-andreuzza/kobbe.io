import React from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  OffthreadVideo,
  Sequence,
  staticFile,
  useCurrentFrame,
} from "remotion";

const FPS = 30;

/** Frames two neighboring clips overlap while the incoming one fades in. */
const CROSS = 12;

type TourClip = {
  /** Second in the walkthrough footage to start from. */
  startAtSec: number;
  durationSec: number;
  /** CSS transform-origin: where the zoom pushes into. */
  origin: string;
  scaleFrom: number;
  scaleTo: number;
};

/* Offsets come from the recording script's section marks:
   Overview sweep 6.3, Roll-up 13.7 (sweep 16.3, scroll 21.7), Funnels 25.7
   (hover 28.1), Performance 34.1 (sweep 36.7), dark flip 44.8 (sweep 46.4),
   dark Funnels 53.1 (hover 55.5), end 62.4. */
const clips: TourClip[] = [
  // Overview: cursor sweeps the trend chart, tooltip riding along.
  {
    startAtSec: 6.3,
    durationSec: 5.8,
    origin: "50% 32%",
    scaleFrom: 1.06,
    scaleTo: 1.2,
  },
  // Roll-up: all-sites chart sweep, then the per-site table scrolls in.
  {
    startAtSec: 15.7,
    durationSec: 6,
    origin: "50% 38%",
    scaleFrom: 1.04,
    scaleTo: 1.16,
  },
  // Funnels: push into the gradient funnel body while stages are hovered.
  {
    startAtSec: 26.5,
    durationSec: 5.6,
    origin: "50% 40%",
    scaleFrom: 1.08,
    scaleTo: 1.28,
  },
  // Performance: Web Vitals KPIs and the LCP trend sweep.
  {
    startAtSec: 35.3,
    durationSec: 5.8,
    origin: "58% 38%",
    scaleFrom: 1.06,
    scaleTo: 1.22,
  },
  // Dark mode: the overview trend sweep on the dark canvas.
  {
    startAtSec: 46.6,
    durationSec: 5.8,
    origin: "50% 32%",
    scaleFrom: 1.05,
    scaleTo: 1.18,
  },
  // Dark mode: funnels, stages hovered.
  {
    startAtSec: 54.1,
    durationSec: 6,
    origin: "50% 40%",
    scaleFrom: 1.08,
    scaleTo: 1.26,
  },
];

export const tourDurationInFrames = clips.reduce(
  (sum, clip) => sum + Math.round(clip.durationSec * FPS),
  0,
) - (clips.length - 1) * CROSS;

const Clip: React.FC<{ spec: TourClip; fadeIn: boolean }> = ({
  spec,
  fadeIn,
}) => {
  const frame = useCurrentFrame();
  const frames = Math.round(spec.durationSec * FPS);

  const opacity = fadeIn
    ? interpolate(frame, [0, CROSS], [0, 1], { extrapolateRight: "clamp" })
    : 1;
  // A slow, steady push — no cuts inside a clip, just the camera drifting in.
  const scale = interpolate(
    frame,
    [0, frames],
    [spec.scaleFrom, spec.scaleTo],
    { easing: Easing.inOut(Easing.quad) },
  );

  return (
    <AbsoluteFill style={{ opacity }}>
      <AbsoluteFill
        style={{ transform: `scale(${scale})`, transformOrigin: spec.origin }}
      >
        <OffthreadVideo
          muted
          src={staticFile("walkthrough.mp4")}
          startFrom={Math.round(spec.startAtSec * FPS)}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/** Raw dashboard tour: footage with zooms and crossfades, nothing on top. */
export const Tour: React.FC = () => {
  let from = 0;
  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      {clips.map((spec, i) => {
        const frames = Math.round(spec.durationSec * FPS);
        const sequence = (
          <Sequence key={i} from={from} durationInFrames={frames}>
            <Clip spec={spec} fadeIn={i > 0} />
          </Sequence>
        );
        from += frames - CROSS;
        return sequence;
      })}
    </AbsoluteFill>
  );
};
