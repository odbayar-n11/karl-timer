"use client";

import type { ChimeLevel } from "@/lib/audio";

interface Props {
  soundEnabled: boolean;
  onToggle: (v: boolean) => void;
  playChimeSequence: (count?: number, level?: ChimeLevel) => void;
  playLoudTickSound: (continuous?: boolean) => void;
}

export default function SoundTest({
  soundEnabled,
  onToggle,
  playChimeSequence,
  playLoudTickSound,
}: Props) {
  return (
    <div className="mt-8 rounded-2xl border border-[#720314]/20 bg-white p-6 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-lg font-bold">Дохионы sound test</h2>
          <p className="text-sm text-[#720314]/80">
            Цагийн дохиог урьчилан тоглогчдод сонсгох
          </p>
        </div>

        <label className="inline-flex items-center gap-2 text-sm cursor-pointer font-medium">
          <input
            type="checkbox"
            checked={soundEnabled}
            onChange={(e) => onToggle(e.target.checked)}
            className="rounded accent-[#720314] h-4 w-4"
          />
          Асаалттай
        </label>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <button
          onClick={() => playChimeSequence(1, "soft")}
          className="rounded-xl border border-[#720314]/30 bg-[#720314]/10 p-3 text-xs font-bold hover:bg-[#720314]/20 transition"
        >
          1 мин өнгөрсөн
        </button>

        <button
          onClick={() => playChimeSequence(1, "normal")}
          className="rounded-xl border border-[#720314]/30 bg-[#720314]/10 p-3 text-xs font-bold hover:bg-[#720314]/20 transition"
        >
          1 мин үлдсэн 
        </button>

        <button
          onClick={() => playChimeSequence(1, "high")}
          className="rounded-xl border border-[#720314]/30 bg-[#720314]/10 p-3 text-xs font-bold hover:bg-[#720314]/20 transition"
        >
          30 сек үлдсэн 
        </button>

        <button
          onClick={() => playChimeSequence(1, "final")}
          className="rounded-xl border border-red-700/30 bg-red-500/10 p-3 text-xs font-bold text-red-900 hover:bg-red-500/20 transition"
        >
          Хугацаа дууссан
        </button>

        <button
          onClick={() => playLoudTickSound(true)}
          className="col-span-2 rounded-xl border border-red-700/30 bg-red-500/10 p-3 text-xs font-bold text-red-900 hover:bg-red-500/20 transition md:col-span-4"
        >
          Сүүлийн 5 секунд 
        </button>
      </div>
    </div>
  );
}
