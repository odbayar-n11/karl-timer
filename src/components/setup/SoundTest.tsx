"use client";

import { useEffect, useRef, useState } from "react";
import type { ChimeLevel } from "@/lib/audio";

// The countdown test plays 5 ticks, one per second.
// The button stays locked for this long so it can't be stacked.
const COUNTDOWN_COOLDOWN_MS = 5000;

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
  const [countdownLocked, setCountdownLocked] = useState(false);
  const cooldownTimerRef = useRef<number | null>(null);

  // clear the timer if the user leaves this step while it is running
  useEffect(() => {
    return () => {
      if (cooldownTimerRef.current !== null) {
        window.clearTimeout(cooldownTimerRef.current);
      }
    };
  }, []);

  function handleCountdownTest() {
    if (countdownLocked) return;

    playLoudTickSound(true);
    setCountdownLocked(true);

    cooldownTimerRef.current = window.setTimeout(() => {
      setCountdownLocked(false);
      cooldownTimerRef.current = null;
    }, COUNTDOWN_COOLDOWN_MS);
  }

  return (
    <div className="mt-8 rounded-2xl border border-[#720314]/20 bg-white p-6 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-lg font-bold">Дохионы sound test</h2>
          <p className="text-sm text-[#720314]/80">
            Дохио бүрийн дууг туршиж үзэх:
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
          1 мин өнгөрсөн (1 удаа)
        </button>

        <button
          onClick={() => playChimeSequence(1, "normal")}
          className="rounded-xl border border-[#720314]/30 bg-[#720314]/10 p-3 text-xs font-bold hover:bg-[#720314]/20 transition"
        >
          1 мин үлдсэн (1 удаа)
        </button>

        <button
          onClick={() => playChimeSequence(1, "high")}
          className="rounded-xl border border-[#720314]/30 bg-[#720314]/10 p-3 text-xs font-bold hover:bg-[#720314]/20 transition"
        >
          30 сек үлдсэн (1 удаа)
        </button>

        <button
          onClick={() => playChimeSequence(1, "final")}
          className="rounded-xl border border-red-700/30 bg-red-500/10 p-3 text-xs font-bold text-red-900 hover:bg-red-500/20 transition"
        >
          Хугацаа дууссан
        </button>

        <button
          onClick={handleCountdownTest}
          disabled={countdownLocked}
          className={`col-span-2 rounded-xl border border-red-700/30 bg-red-500/10 p-3 text-xs font-bold text-red-900 transition md:col-span-4 ${
            countdownLocked
              ? "cursor-not-allowed opacity-40"
              : "hover:bg-red-500/20"
          }`}
        >
          Сүүлийн 5 секунд (5, 4, 3, 2, 1)
        </button>
      </div>
    </div>
  );
}
