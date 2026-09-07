import type { ImageMetadata } from "astro";

import coastDark from "@/images/wallpapers/coast-dark.webp";
import coastLight from "@/images/wallpapers/coast-light.webp";
import harbourDark from "@/images/wallpapers/harbour-dark.webp";
import harbourLight from "@/images/wallpapers/harbour-light.webp";
import quayDark from "@/images/wallpapers/quay-dark.webp";
import quayLight from "@/images/wallpapers/quay-light.webp";
import villageDark from "@/images/wallpapers/village-dark.webp";
import villageLight from "@/images/wallpapers/village-light.webp";

/**
 * Polar checkout link for the free "Kobbe Wallpapers" product. Polar collects
 * the email and grants the zip as a downloadable benefit.
 */
export const WALLPAPERS_DOWNLOAD_URL =
  "https://buy.polar.sh/polar_cl_lmq2VDukWpp5c1xXsNQ0VyLltwRjY9j3lIk0v0talOn";

export type Wallpaper = {
  slug: string;
  title: string;
  blurb: string;
  light: ImageMetadata;
  dark: ImageMetadata;
};

/** The quay comes first and runs full width; the frieze needs the room. */
export const wallpapers: Wallpaper[] = [
  {
    slug: "quay",
    title: "The quay.",
    blurb:
      "The hero frieze, standing still. Every tiny person on the quay is doing analytics: tallying, weighing, filtering the bots at the gate. At night the lamps come on and nobody moves an inch.",
    light: quayLight,
    dark: quayDark,
  },
  {
    slug: "coast",
    title: "The coast.",
    blurb:
      "Pines on a granite shore, one red cottage, and a sailboat passing a skerry. After dark the cottage window and the masthead light are the only things awake.",
    light: coastLight,
    dark: coastDark,
  },
  {
    slug: "harbour",
    title: "The harbour.",
    blurb:
      "Three boathouses and a jetty at the edge of open water, boats tied up for the evening. A single lamp on the jetty for the dark version.",
    light: harbourLight,
    dark: harbourDark,
  },
  {
    slug: "village",
    title: "The village.",
    blurb:
      "The footer scene: a handful of houses on a rocky islet, ochre, grey, and Falu red, with a rowing boat below. Lit windows and their reflections at night.",
    light: villageLight,
    dark: villageDark,
  },
];

export const wallpaperFacts = [
  {
    title: "5120 × 2880, 16:9",
    description:
      "Made for 5K displays like the Studio Display and iMac, and scales cleanly down to 4K, QHD, and every MacBook.",
  },
  {
    title: "Dynamic HEIC",
    description:
      "One file per scene that follows macOS appearance: the light frame by day, the night frame in Dark Mode, with no jump in the drawing.",
  },
  {
    title: "Flat PNGs too",
    description:
      "Light and dark versions of each scene as plain PNGs for Windows, Linux, iPad, or if you want to pin one look.",
  },
  {
    title: "Free, for an email",
    description:
      "Delivered through Polar. You get the zip and an occasional note when Kobbe ships something; unsubscribe any time.",
  },
];

export const installSteps = [
  "Unzip the download and open the Dynamic (HEIC) folder.",
  "Open System Settings, then Wallpaper, and click Add Photo, or drag the HEIC straight onto the desktop preview.",
  "Pick Dynamic in the menu next to the preview. macOS now swaps light and dark with your appearance setting.",
];
