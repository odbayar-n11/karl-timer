"use client";

import { useDebate } from "@/context/DebateContext";
import { useDebateGuard } from "@/hooks/useDebateGuard";
import { useDebateNavigation } from "@/hooks/useDebateNavigation";
import { TIME_SETTINGS } from "@/lib/constants";
import { sumUsed } from "@/lib/results";
import ResultsHeader from "@/components/results/ResultsHeader";
import TeamResultsCard from "@/components/results/TeamResultsCard";
import SummaryStats from "@/components/results/SummaryStats";

export default function ResultsPage() {
  const {
    mode,
    records,
    totalDuration,
    groupedResults,
    displayAffirmative,
    displayNegative,
  } = useDebate();
  const { resetAndGoHome } = useDebateNavigation();
  const canRender = useDebateGuard("results");

  if (!canRender) return null;

  return (
    <main className="mx-auto max-w-6xl py-6">
      <ResultsHeader
        affirmativeName={displayAffirmative}
        negativeName={displayNegative}
      />

      <div className="grid gap-6 md:grid-cols-2">
        <TeamResultsCard
          name={displayAffirmative}
          roleLabel="Нотлогч"
          speeches={groupedResults.affSpeeches}
          crosses={groupedResults.affCrosses}
        />
        <TeamResultsCard
          name={displayNegative}
          roleLabel="Няцаагч"
          speeches={groupedResults.negSpeeches}
          crosses={groupedResults.negCrosses}
        />
      </div>

      <SummaryStats
        totalPlanned={totalDuration}
        totalUsed={sumUsed(records)}
        modeLabel={TIME_SETTINGS[mode].label}
      />

      <button
        onClick={resetAndGoHome}
        className="mt-8 rounded-xl bg-[#720314] text-white px-6 py-4 font-bold hover:bg-[#5a0210] transition shadow-lg"
      >
        Шинэ мэтгэлцээн
      </button>
    </main>
  );
}
