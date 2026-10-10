/**
 * Sound names + the files that play them.
 * The files live in /public/sounds. To use your own sounds,
 * just replace the files (keep the same names) or change the paths here.
 */

export type ChimeLevel = "soft" | "normal" | "high" | "final";
export type SoundName = ChimeLevel | "tick";

export const SOUND_FILES: Record<SoundName, string> = {
  soft: "/sounds/soft.wav", // 1 min passed (quiet)
  normal: "/sounds/normal.wav", // 1 min left
  high: "/sounds/high.wav", // 30 sec left
  final: "/sounds/final.wav", // time is up (loud, double strike)
  tick: "/sounds/tick.wav", // last 5 seconds (not used by default)
};

// Phone vibration (Android only; iPhones ignore it). Milliseconds.
export const VIBRATION_PATTERNS: Record<SoundName, number | number[]> = {
  soft: 120,
  normal: 200,
  high: 200,
  final: [350, 120, 350, 120, 350],
  tick: 40,
};

export const ALL_SOUNDS = Object.keys(SOUND_FILES) as SoundName[];
