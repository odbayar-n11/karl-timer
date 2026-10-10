"use client";

import { useRouter } from "next/navigation";
import { useDebate } from "@/context/DebateContext";

/** State change + route change bundled together. */
export function useDebateNavigation() {
  const router = useRouter();
  const { startCompetition, resetCompetition } = useDebate();

  function startAndGoToDebate() {
    startCompetition();
    router.push("/debate");
  }

  function resetAndGoHome() {
    resetCompetition();
    router.push("/");
  }

  return { startAndGoToDebate, resetAndGoHome };
}
