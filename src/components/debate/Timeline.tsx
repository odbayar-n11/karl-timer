"use client";

import { formatTime } from "@/lib/format";
import type { Phase, TimeRecord } from "@/lib/types";

interface Props {
  phases: Phase[];
  phaseIndex: number;
  running: boolean;
  records: TimeRecord[];
}

export default function Timeline({
  phases,
  phaseIndex,
  running,
  records,
}: Props) {
  return (
    <section className="mt-6 rounded-2xl border border-[#720314]/20 bg-white p-5 shadow-sm">
      <h2 className="mb-4 text-lg font-bold">Мэтгэлцээний дараалал</h2>

      <div className="space-y-2">
        {phases.map((phase, index) => {
          const isCurrent = index === phaseIndex;
          const isPast = index < phaseIndex;
          const pastRecord = records.find((r) => r.phaseId === phase.id);

          return (
            <div
              key={phase.id}
              className={`flex items-center gap-4 rounded-xl p-3 transition ${
                isCurrent
                  ? "bg-[#720314] text-white"
                  : isPast
                  ? "bg-[#720314]/10 opacity-70"
                  : "bg-[#f0f1f6]"
              }`}
            >
              <div
                className={`w-8 text-center font-bold ${
                  isCurrent ? "text-white/80" : "opacity-60"
                }`}
              >
                {index + 1}
              </div>

              <div className="flex-1">
                <div className="font-semibold">{phase.title}</div>
                <div
                  className={`text-xs ${
                    isCurrent ? "text-white/80" : "opacity-60"
                  }`}
                >
                  {phase.type === "speech" ? "Илтгэл" : "Солбисон асуулт"} ·{" "}
                  {isPast && pastRecord
                    ? formatTime(pastRecord.used)
                    : formatTime(phase.duration)}
                </div>
              </div>

              <div>
                {isCurrent && running && (
                  <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-bold tracking-wider">
                    ЯВЖ БАЙНА
                  </span>
                )}

                {isPast && <span className="text-xs font-bold">✓</span>}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
