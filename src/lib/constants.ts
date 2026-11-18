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
    cross: 2 * 60,
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

/** Бэлтгэлийн хугацаа: нэг удаад 1 минут, баг бүр 4 удаа авах эрхтэй. */
export const PREP_TIME_SECONDS = 60;
export const PREP_USES_PER_TEAM = 4;

/** Мэтгэлцээн эхлэхээс өмнөх илтгэл бэлтгэх хугацаа (нэг удаа). */
export const OPENING_PREP_SECONDS = 5 * 60;
