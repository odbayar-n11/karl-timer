"use client";

import { TIME_SETTINGS } from "@/lib/constants";
import { formatTime } from "@/lib/format";
import type { TimeMode } from "@/lib/types";

interface Props {
  mode: TimeMode;
  onChange: (mode: TimeMode) => void;
}

export default function ModeSelector({ mode, onChange }: Props) {
  return (
    <div className="grid gap-3 md:grid-cols-3 md:gap-6">
      {(
        Object.entries(TIME_SETTINGS) as [
          TimeMode,
          (typeof TIME_SETTINGS)[TimeMode]
        ][]
      ).map(([key, setting]) => (
        <button
          key={key}
          onClick={() => onChange(key)}
          className={`rounded-2xl border p-4 text-left transition md:p-6 ${
            mode === key
              ? "border-[#720314] bg-[#720314] text-white shadow-lg"
              : "border-[#720314]/20 bg-white hover:border-[#720314]/50"
          }`}
        >
          <div className="text-xl font-bold">{setting.label}</div>

          <div
            className={`mt-2 space-y-1 text-sm md:mt-4 md:space-y-2 ${
              mode === key ? "text-white/90" : "text-[#720314]/80"
            }`}
          >
            <div>
              1-р гишүүн: <strong>{formatTime(setting.first)}</strong>
            </div>
            <div>
              2, 3-р гишүүн: <strong>{formatTime(setting.other)}</strong>
            </div>
            <div>
              Солбисон асуулт: <strong>{formatTime(setting.cross)}</strong>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}
