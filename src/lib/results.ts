import type { Team, TimeRecord } from "./types";

export interface GroupedResults {
  affSpeeches: TimeRecord[];
  affCrosses: TimeRecord[];
  negSpeeches: TimeRecord[];
  negCrosses: TimeRecord[];
}

export function sumUsed(records: TimeRecord[]): number {
  return records.reduce((sum, r) => sum + r.used, 0);
}

export function groupResults(records: TimeRecord[]): GroupedResults {
  const getSpeeches = (team: Team) =>
    records
      .filter((r) => r.team === team && r.type === "speech")
      .sort((a, b) => a.member - b.member);

  const getCrosses = (team: Team) =>
    records
      .filter((r) => r.team === team && r.type === "cross")
      .sort((a, b) => b.member - a.member);

  return {
    affSpeeches: getSpeeches("affirmative"),
    affCrosses: getCrosses("affirmative"),
    negSpeeches: getSpeeches("negative"),
    negCrosses: getCrosses("negative"),
  };
}
