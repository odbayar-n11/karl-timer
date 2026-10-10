"use client";

import { formatTime } from "@/lib/format";

interface Props {
  title?: string;
  remaining: number;
  running: boolean;
  onStart: () => void;
  onFinish: () => void;
}

export default function MainTimer({
  title,
  remaining,
  running,
  onStart,
  onFinish,
}: Props) {
  return (
    <section className="rounded-3xl border border-[#720314]/20 bg-white p-8 text-center relative overflow-hidden shadow-sm">
      <div className="text-lg text-[#720314]/80 font-medium">{title}</div>

      <div
        className={`my-8 font-mono text-8xl font-black tracking-tight md:text-[10rem] transition-colors ${
          remaining < 0
            ? "text-red-600 animate-pulse"
            : remaining <= 30
            ? "text-amber-600"
            : remaining <= 60
            ? "text-yellow-600"
            : "text-[#720314]"
        }`}
      >
        {formatTime(remaining)}
      </div>

      {remaining < 0 && (
        <div className="mb-4 text-red-600 font-bold tracking-widest uppercase text-sm">
          ⚠️ Илүү цаг ашиглаж байна
        </div>
      )}

      <div className="flex justify-center gap-4">
        {!running ? (
          <button
            onClick={onStart}
            className="rounded-2xl bg-[#720314] text-white px-12 py-5 text-xl font-bold hover:bg-[#5a0210] transition shadow-lg"
          >
             Эхлүүлэх
          </button>
        ) : (
          <button
            onClick={onFinish}
            className="rounded-2xl bg-amber-600 text-white px-12 py-5 text-xl font-bold hover:bg-amber-700 transition shadow-lg"
          >
             Цаг дуусгах
          </button>
        )}
      </div>

      <div className="mt-6 text-sm text-[#720314]/60">
        {running
          ? "Цаг явж байна"
          : "Эхлүүлэх товчийг дарж цагийг эхлүүлнэ үү"}
      </div>
    </section>
  );
}
