"use client";

import { useDebate } from "@/context/DebateContext";
import { useDebateGuard } from "@/hooks/useDebateGuard";
import { useDebateNavigation } from "@/hooks/useDebateNavigation";
import { TIME_SETTINGS } from "@/lib/constants";
import DebateHeader from "@/components/debate/DebateHeader";
import TeamBanners from "@/components/debate/TeamBanners";
import MainTimer from "@/components/debate/MainTimer";
import Timeline from "@/components/debate/Timeline";

export default function DebatePage() {
  const {
    mode,
    phases,
    phaseIndex,
    currentPhase,
    remaining,
    running,
    records,
    displayAffirmative,
    displayNegative,
    beginCurrentPhase,
    finishCurrentPhase,
    playChimeSequence,
  } = useDebate();
  const { resetAndGoHome } = useDebateNavigation();
  const canRender = useDebateGuard("debate");

  if (!canRender) return null;

  return (
    <main className="mx-auto max-w-7xl py-6">
      <DebateHeader
        modeLabel={TIME_SETTINGS[mode].label}
        affirmativeName={displayAffirmative}
        negativeName={displayNegative}
        onSound={() => playChimeSequence(1)}
        onReset={resetAndGoHome}
      />

      <TeamBanners
        affirmativeName={displayAffirmative}
        negativeName={displayNegative}
      />

      <MainTimer
        title={currentPhase?.title}
        remaining={remaining}
        running={running}
        onStart={beginCurrentPhase}
        onFinish={finishCurrentPhase}
      />

      <Timeline
        phases={phases}
        phaseIndex={phaseIndex}
        running={running}
        records={records}
      />
    </main>
  );
}
