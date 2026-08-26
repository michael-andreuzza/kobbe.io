import { defineSound } from "@web-kits/audio";
import type { SoundDefinition } from "@web-kits/audio";

/**
 * Synthesized UI sounds for the marketing site (no audio assets). Definitions
 * come from the @web-kits/audio "core" patch by Raphael Salaja; mirrors the
 * app's `app/lib/ui-sounds.ts` without the persisted preference — sounds only
 * ever play in direct response to a pointer or keyboard interaction.
 */

export type UiSoundName = "tick" | "toggle-on" | "toggle-off";

const definitions: Record<UiSoundName, SoundDefinition> = {
  tick: {
    source: { type: "sine", frequency: 1500, fm: { ratio: 0.5, depth: 60 } },
    envelope: { attack: 0, decay: 0.01, sustain: 0, release: 0.004 },
    gain: 0.15,
  },
  "toggle-on": {
    layers: [
      {
        source: { type: "sine", frequency: 2093 },
        envelope: { attack: 0, decay: 0.012, sustain: 0, release: 0.004 },
        gain: 0.2,
      },
      {
        source: { type: "sine", frequency: 3136 },
        envelope: { attack: 0, decay: 0.012, sustain: 0, release: 0.004 },
        delay: 0.025,
        gain: 0.2,
      },
    ],
  },
  "toggle-off": {
    layers: [
      {
        source: { type: "sine", frequency: 3136 },
        envelope: { attack: 0, decay: 0.012, sustain: 0, release: 0.004 },
        gain: 0.2,
      },
      {
        source: { type: "sine", frequency: 2093 },
        envelope: { attack: 0, decay: 0.012, sustain: 0, release: 0.004 },
        delay: 0.025,
        gain: 0.2,
      },
    ],
  },
};

const players = new Map<UiSoundName, () => unknown>();

export function playUiSound(name: UiSoundName): void {
  if (typeof window === "undefined") {
    return;
  }
  try {
    let play = players.get(name);
    if (!play) {
      play = defineSound(definitions[name]);
      players.set(name, play);
    }
    play();
  } catch {
    // Web Audio unavailable or blocked; sounds are never load-bearing.
  }
}
