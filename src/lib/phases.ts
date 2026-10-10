import { TIME_SETTINGS } from "./constants";
import type { Phase, TimeMode } from "./types";

type DurationSlot = "first" | "other" | "cross";

type PhaseTemplate = Omit<Phase, "duration"> & { slot: DurationSlot };

/**
 * The fixed order of a Karl Popper debate.
 * `slot` says which duration from TIME_SETTINGS the phase uses.
 */
const PHASE_SEQUENCE: PhaseTemplate[] = [
  {
    id: "aff-1",
    team: "affirmative",
    member: 1,
    type: "speech",
    title: "Нотлогч талын 1-р гишүүний илтгэл",
    slot: "first",
  },
  {
    id: "neg-3",
    team: "negative",
    member: 3,
    type: "cross",
    title: "Няцаагч талын 3-р гишүүний солбисон асуулт",
    slot: "cross",
    questioner: true,
  },
  {
    id: "neg-1",
    team: "negative",
    member: 1,
    type: "speech",
    title: "Няцаагч талын 1-р гишүүний илтгэл",
    slot: "first",
  },
  {
    id: "aff-3",
    team: "affirmative",
    member: 3,
    type: "cross",
    title: "Нотлогч талын 3-р гишүүний солбисон асуулт",
    slot: "cross",
    questioner: true,
  },
  {
    id: "aff-2",
    team: "affirmative",
    member: 2,
    type: "speech",
    title: "Нотлогч талын 2-р гишүүний илтгэл",
    slot: "other",
  },
  {
    id: "neg-1-ce",
    team: "negative",
    member: 1,
    type: "cross",
    title: "Няцаагч талын 1-р гишүүний солбисон асуулт",
    slot: "cross",
    questioner: true,
  },
  {
    id: "neg-2",
    team: "negative",
    member: 2,
    type: "speech",
    title: "Няцаагч талын 2-р гишүүний илтгэл",
    slot: "other",
  },
  {
    id: "aff-1-ce",
    team: "affirmative",
    member: 1,
    type: "cross",
    title: "Нотлогч талын 1-р гишүүний солбисон асуулт",
    slot: "cross",
    questioner: true,
  },
  {
    id: "aff-3-final",
    team: "affirmative",
    member: 3,
    type: "speech",
    title: "Нотлогч талын 3-р гишүүний илтгэл",
    slot: "other",
  },
  {
    id: "neg-3-final",
    team: "negative",
    member: 3,
    type: "speech",
    title: "Няцаагч талын 3-р гишүүний илтгэл",
    slot: "other",
  },
];

export function createPhases(mode: TimeMode): Phase[] {
  const settings = TIME_SETTINGS[mode];

  return PHASE_SEQUENCE.map(({ slot, ...phase }) => ({
    ...phase,
    duration: settings[slot],
  }));
}
