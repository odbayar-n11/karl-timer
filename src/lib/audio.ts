/**
 * Sound names + the files that play them.
 * The files live in /public/sounds. To use your own sounds,
 * just replace the files (keep the same names) or change the paths here.
 */

export type ChimeLevel = "soft" | "normal" | "high" | "final";
export type SoundName = ChimeLevel | "countdown";

export const SOUND_FILES: Record<SoundName, string> = {
  soft: "/sounds/soft.wav", // 1 min passed (quiet)
  normal: "/sounds/normal.wav", // 1 min left
  high: "/sounds/high.wav", // 30 sec left
  final: "/sounds/final.wav", // time is up (loud, double strike)
  // ONE file, exactly 5.00 s long, with the 5-4-3-2-1 ticks already inside it
  countdown: "/sounds/countdown.wav",
};

// Phone vibration (Android only; iPhones ignore it). Milliseconds.
export const VIBRATION_PATTERNS: Record<SoundName, number | number[]> = {
  soft: 120,
  normal: 200,
  high: 200,
  final: [350, 120, 350, 120, 350],
  // five short pulses, one per second, matching the ticks
  countdown: [80, 920, 80, 920, 80, 920, 80, 920, 80],
};

export const ALL_SOUNDS = Object.keys(SOUND_FILES) as SoundName[];
