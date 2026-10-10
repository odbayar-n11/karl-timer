export type TimeMode = "short" | "normal" | "extended";

export type Team = "affirmative" | "negative";

export type Speaker =
  | "aff-1"
  | "neg-3"
  | "neg-1"
  | "aff-3"
  | "aff-2"
  | "neg-1-ce"
  | "neg-2"
  | "aff-1-ce"
  | "aff-3-final"
  | "neg-3-final";

export type PhaseType = "speech" | "cross";

export interface Phase {
  id: Speaker;
  team: Team;
  member: number;
  type: PhaseType;
  title: string;
  duration: number;
  questioner?: boolean;
}

export interface TimeRecord {
  phaseId: string;
  title: string;
  type: PhaseType;
  team: Team;
  member: number;
  allocated: number;
  used: number;
  startedAt: string;
  endedAt: string;
}
