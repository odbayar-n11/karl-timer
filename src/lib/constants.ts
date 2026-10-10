import type { TimeMode } from "./types";

export const TIME_SETTINGS: Record<
  TimeMode,
  {
    label: string;
    first: number;
    other: number;
    cross: number;
  }
> = {
  short: {
    label: "Богиносгосон цаг",
    first: 4 * 60,
    other: 3 * 60,
    cross: 1 * 60,
  },
  normal: {
    label: "Үндсэн цаг",
    first: 5 * 60,
    other: 4 * 60,
    cross: 2 * 60,
  },
  extended: {
    label: "Уртасгасан цаг",
    first: 6 * 60,
    other: 5 * 60,
    cross: 2 * 60,
  },
};
