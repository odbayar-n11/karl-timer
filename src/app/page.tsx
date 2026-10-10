"use client";

import { useState } from "react";
import { useDebate } from "@/context/DebateContext";
import { useDebateNavigation } from "@/hooks/useDebateNavigation";
import SetupHeader from "@/components/setup/SetupHeader";
import ModeSelector from "@/components/setup/ModeSelector";
import TeamNameInputs from "@/components/setup/TeamNameInputs";
import SoundTest from "@/components/setup/SoundTest";

const STEP_TITLES = ["Цагийн горим сонгох", "Багуудын нэр", "Дохио шалгах"];
const LAST_STEP = STEP_TITLES.length - 1;

export default function SetupPage() {
  const [step, setStep] = useState(0);

  const {
    mode,
    setMode,
    affirmativeName,
    setAffirmativeName,
    negativeName,
    setNegativeName,
    soundEnabled,
    setSoundEnabled,
    playChimeSequence,
    playLoudTickSound,
  } = useDebate();
  const { startAndGoToDebate } = useDebateNavigation();

  const isFirst = step === 0;
  const isLast = step === LAST_STEP;

  return (
    <main className="mx-auto flex min-h-[calc(100dvh-3rem)] max-w-4xl flex-col py-2 md:py-10">
      {/* Title only on the first step to save space */}
      {isFirst && <SetupHeader />}

      {/* Step indicator */}
      <div className="mb-4">
        <div className="flex gap-2">
          {STEP_TITLES.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 flex-1 rounded-full transition ${
                i <= step ? "bg-[#720314]" : "bg-[#720314]/20"
              }`}
            />
          ))}
        </div>
        <div className="mt-2 flex items-baseline justify-between">
          <h2 className="text-lg font-bold">{STEP_TITLES[step]}</h2>
          <span className="text-sm font-medium text-[#720314]/70">
            {step + 1} / {STEP_TITLES.length}
          </span>
        </div>
      </div>

      {/* Step content (removes the top margin of the first block) */}
      <div className="flex-1 [&>*:first-child]:mt-0">
        {step === 0 && <ModeSelector mode={mode} onChange={setMode} />}

        {step === 1 && (
          <TeamNameInputs
            affirmativeName={affirmativeName}
            negativeName={negativeName}
            onAffirmativeChange={setAffirmativeName}
            onNegativeChange={setNegativeName}
          />
        )}

        {step === 2 && (
          <SoundTest
            soundEnabled={soundEnabled}
            onToggle={setSoundEnabled}
            playChimeSequence={playChimeSequence}
            playLoudTickSound={playLoudTickSound}
          />
        )}
      </div>

      {/* Prev / Next at the bottom */}
      <div className="mt-6 flex gap-3">
        {!isFirst && (
          <button
            onClick={() => setStep(step - 1)}
            className="flex-1 rounded-2xl border border-[#720314]/30 bg-white py-4 text-lg font-bold hover:bg-[#720314]/10 transition"
          >
            ← Өмнөх
          </button>
        )}

        {!isLast ? (
          <button
            onClick={() => setStep(step + 1)}
            className="flex-[2] rounded-2xl bg-[#720314] py-4 text-lg font-bold text-white shadow-xl hover:bg-[#5a0210] transition"
          >
            Дараах →
          </button>
        ) : (
          <button
            onClick={startAndGoToDebate}
            className="flex-[2] rounded-2xl bg-[#720314] py-4 text-lg font-bold text-white shadow-xl hover:bg-[#5a0210] transition"
          >
            Мэтгэлцээнийг эхлүүлэх
          </button>
        )}
      </div>
    </main>
  );
}
