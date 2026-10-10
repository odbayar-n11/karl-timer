import type { SoundName } from "./audio";
import type { PhaseType } from "./types";

export interface ScheduledCue {
  /** seconds after the phase starts */
  at: number;
  level: SoundName;
}

/** Length of the countdown audio file (the 5-4-3-2-1 ticks). */
const COUNTDOWN_SECONDS = 5;

/**
 * The list of sounds for one phase, as "play this X seconds after start".
 * Pure function: no audio, no React.
 *
 * - speech: 1 min passed (soft), 1 min left, 30 sec left, countdown, done
 * - cross (солбисон асуулт): 1 min left (only if longer than 1 min),
 *   30 sec left, countdown, done
 */
export function getCueSchedule(
  duration: number,
  type: PhaseType = "speech"
): ScheduledCue[] {
  const cues: ScheduledCue[] = [];

  // 1 minute has passed: very soft (speeches only)
  if (type === "speech" && duration >= 60) {
    cues.push({ at: 60, level: "soft" });
  }

  // 1 minute left
  if (duration > 60) cues.push({ at: duration - 60, level: "normal" });

  // 30 seconds left
  if (duration > 30) cues.push({ at: duration - 30, level: "high" });

  // countdown: ONE 5-second file that starts 5 seconds before the end,
  // so the ticks are evenly spaced no matter how the connection behaves
  if (duration > COUNTDOWN_SECONDS) {
    cues.push({ at: duration - COUNTDOWN_SECONDS, level: "countdown" });
  }

  // time is up
  cues.push({ at: duration, level: "final" });

  return cues;
}
