"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { createPhases } from "@/lib/phases";
import { getCueSchedule, type ScheduledCue } from "@/lib/timerCues";
import { groupResults, type GroupedResults } from "@/lib/results";
import type { ChimeLevel } from "@/lib/audio";
import { useSound } from "@/hooks/useSound";
import { useWakeLock } from "@/hooks/useWakeLock";
import type { Phase, TimeMode, TimeRecord } from "@/lib/types";

interface DebateContextValue {
  // setup
  mode: TimeMode;
  setMode: (m: TimeMode) => void;
  affirmativeName: string;
  setAffirmativeName: (v: string) => void;
  negativeName: string;
  setNegativeName: (v: string) => void;
  soundEnabled: boolean;
  setSoundEnabled: (v: boolean) => void;

  // derived
  displayAffirmative: string;
  displayNegative: string;
  totalDuration: number;

  // debate state
  configured: boolean;
  finished: boolean;
  phases: Phase[];
  phaseIndex: number;
  currentPhase: Phase | undefined;
  remaining: number;
  running: boolean;
  records: TimeRecord[];
  groupedResults: GroupedResults;

  // actions
  startCompetition: () => void;
  beginCurrentPhase: () => void;
  finishCurrentPhase: () => void;
  resetCompetition: () => void;
  playChimeSequence: (count?: number, level?: ChimeLevel) => void;
  playLoudTickSound: (continuous?: boolean) => void;
}

const DebateContext = createContext<DebateContextValue | null>(null);

export function DebateProvider({ children }: { children: ReactNode }) {
  const [configured, setConfigured] = useState(false);

  const [mode, setMode] = useState<TimeMode>("normal");
  const [affirmativeName, setAffirmativeName] = useState("");
  const [negativeName, setNegativeName] = useState("");

  const [phases, setPhases] = useState<Phase[]>([]);
  const [phaseIndex, setPhaseIndex] = useState(0);

  const [remaining, setRemaining] = useState(0);
  const [running, setRunning] = useState(false);
  const [records, setRecords] = useState<TimeRecord[]>([]);

  const [finished, setFinished] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const startedAtRef = useRef<number | null>(null);
  const currentRecordStartRef = useRef<string | null>(null);

  // chimes of the running phase, and how many have already played
  const cueScheduleRef = useRef<ScheduledCue[]>([]);
  const cueIndexRef = useRef(0);

  const { playChimeSequence, playLoudTickSound } = useSound(soundEnabled);

  // keep the screen awake while a phase is running
  useWakeLock(running);

  const currentPhase = phases[phaseIndex];

  const displayAffirmative = affirmativeName.trim() || "Нотлогч тал";
  const displayNegative = negativeName.trim() || "Няцаагч тал";

  const totalDuration = useMemo(
    () => phases.reduce((sum, phase) => sum + phase.duration, 0),
    [phases]
  );

  const groupedResults = useMemo(() => groupResults(records), [records]);

  function startCompetition() {
    const newPhases = createPhases(mode);

    setPhases(newPhases);
    setPhaseIndex(0);
    setRemaining(newPhases[0].duration);
    setRecords([]);
    setFinished(false);
    setConfigured(true);
    setRunning(false);
  }

  function beginCurrentPhase() {
    if (!currentPhase) return;

    startedAtRef.current = Date.now();
    currentRecordStartRef.current = new Date().toISOString();

    cueScheduleRef.current = getCueSchedule(
      currentPhase.duration,
      currentPhase.type
    );
    cueIndexRef.current = 0;

    setRemaining(currentPhase.duration);
    setRunning(true);
  }

  function finishCurrentPhase() {
    if (!currentPhase || startedAtRef.current === null) return;

    const elapsed = (Date.now() - startedAtRef.current) / 1000;

    const record: TimeRecord = {
      phaseId: currentPhase.id,
      title: currentPhase.title,
      type: currentPhase.type,
      team: currentPhase.team,
      member: currentPhase.member,
      allocated: currentPhase.duration,
      used: elapsed,
      startedAt: currentRecordStartRef.current ?? new Date().toISOString(),
      endedAt: new Date().toISOString(),
    };

    setRecords((prev) => [...prev, record]);

    startedAtRef.current = null;
    currentRecordStartRef.current = null;
    cueScheduleRef.current = [];
    setRunning(false);

    if (phaseIndex >= phases.length - 1) {
      setFinished(true);
      return;
    }

    const nextIndex = phaseIndex + 1;
    setPhaseIndex(nextIndex);
    setRemaining(phases[nextIndex].duration);
  }

  function resetCompetition() {
    cueScheduleRef.current = [];
    setConfigured(false);
    setRunning(false);
    setFinished(false);
    setPhases([]);
    setPhaseIndex(0);
    setRemaining(0);
    setRecords([]);
    setAffirmativeName("");
    setNegativeName("");
  }

  // Timer tick + sound cues (lives in the provider so it survives route changes).
  // Cues are decided by elapsed time, so if the phone delays the timer
  // for a moment the chime is played late instead of being skipped.
  useEffect(() => {
    if (!running || !currentPhase || startedAtRef.current === null) {
      return;
    }

    const interval = window.setInterval(() => {
      if (startedAtRef.current === null) return;

      const elapsed = (Date.now() - startedAtRef.current) / 1000;

      const schedule = cueScheduleRef.current;
      let due: ScheduledCue | null = null;
      while (
        cueIndexRef.current < schedule.length &&
        elapsed >= schedule[cueIndexRef.current].at
      ) {
        due = schedule[cueIndexRef.current];
        cueIndexRef.current += 1;
      }
      // if several became due at once, play only the most important (last)
      if (due) {
        if (due.level === "tick") playLoudTickSound(false);
        else playChimeSequence(1, due.level);
      }

      setRemaining(currentPhase.duration - elapsed);
    }, 50);

    return () => window.clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running, currentPhase]);

  const value: DebateContextValue = {
    mode,
    setMode,
    affirmativeName,
    setAffirmativeName,
    negativeName,
    setNegativeName,
    soundEnabled,
    setSoundEnabled,
    displayAffirmative,
    displayNegative,
    totalDuration,
    configured,
    finished,
    phases,
    phaseIndex,
    currentPhase,
    remaining,
    running,
    records,
    groupedResults,
    startCompetition,
    beginCurrentPhase,
    finishCurrentPhase,
    resetCompetition,
    playChimeSequence,
    playLoudTickSound,
  };

  return (
    <DebateContext.Provider value={value}>{children}</DebateContext.Provider>
  );
}

export function useDebate() {
  const ctx = useContext(DebateContext);
  if (!ctx) throw new Error("useDebate must be used inside <DebateProvider>");
  return ctx;
}
