import type { SoundName } from "./audio";
import type { PhaseType } from "./types";

export interface ScheduledCue {
  /** seconds after the phase starts */
  at: number;
  level: SoundName;
}

/**
 * The list of sounds for one phase, as "play this X seconds after start".
 * Pure function: no audio, no React.
 *
 * - speech: 1 min passed (soft), 1 min left, 30 sec left, 5-4-3-2-1, done
 * - cross (солбисон асуулт): 1 min left (only if longer than 1 min),
 *   30 sec left, 5-4-3-2-1, done
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

  // countdown: a tick at 5, 4, 3, 2, 1 seconds left
  for (let secondsLeft = 5; secondsLeft >= 1; secondsLeft--) {
    if (duration > secondsLeft) {
      cues.push({ at: duration - secondsLeft, level: "tick" });
    }
  }

  // time is up
  cues.push({ at: duration, level: "final" });

  return cues;
}
