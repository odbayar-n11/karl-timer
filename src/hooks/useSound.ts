"use client";

import { useEffect, useRef } from "react";
import {
  ALL_SOUNDS,
  SOUND_FILES,
  VIBRATION_PATTERNS,
  type ChimeLevel,
  type SoundName,
} from "@/lib/audio";

const CHIME_GAP_MS = 700; // pause between repeated chimes

/**
 * Plays the sound files. Phones only allow sound after a tap, so on the
 * first tap anywhere we "unlock" every sound (play it muted for an instant).
 * After that, the timer is allowed to play them on its own.
 */
export function useSound(soundEnabled: boolean) {
  const audiosRef = useRef<Partial<Record<SoundName, HTMLAudioElement>>>({});
  const unlockedRef = useRef(false);
  const manualRef = useRef<Set<SoundName>>(new Set());
  const enabledRef = useRef(soundEnabled);

  useEffect(() => {
    enabledRef.current = soundEnabled;
  }, [soundEnabled]);

  function getAudio(name: SoundName): HTMLAudioElement | null {
    if (typeof window === "undefined") return null;

    let audio = audiosRef.current[name];
    if (!audio) {
      audio = new Audio(SOUND_FILES[name]);
      audio.preload = "auto";
      audio.load();
      audiosRef.current[name] = audio;
    }
    return audio;
  }

  useEffect(() => {
    // start loading every file right away
    ALL_SOUNDS.forEach((name) => getAudio(name));

    const unlock = () => {
      if (unlockedRef.current) return;
      unlockedRef.current = true;

      for (const name of ALL_SOUNDS) {
        const audio = getAudio(name);
        if (!audio) continue;

        audio.muted = true;
        audio
          .play()
          .then(() => {
            // if a real sound was requested meanwhile, let it keep playing
            if (!manualRef.current.has(name)) {
              audio.pause();
              audio.currentTime = 0;
            }
            manualRef.current.delete(name);
            audio.muted = false;
          })
          .catch(() => {
            audio.muted = false;
            unlockedRef.current = false; // try again on the next tap
          });
      }
    };

    const events = ["pointerdown", "touchend", "click", "keydown"] as const;
    events.forEach((e) => window.addEventListener(e, unlock));

    return () => {
      events.forEach((e) => window.removeEventListener(e, unlock));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function playSound(name: SoundName) {
    if (!enabledRef.current) return;

    const audio = getAudio(name);
    if (!audio) return;

    manualRef.current.add(name);
    audio.muted = false;
    audio.currentTime = 0;
    audio.play().catch(() => {});

    try {
      if ("vibrate" in navigator) navigator.vibrate(VIBRATION_PATTERNS[name]);
    } catch {
      // not supported, ignore
    }
  }

  function playChimeSequence(count: number = 1, level: ChimeLevel = "normal") {
    for (let i = 0; i < count; i++) {
      if (i === 0) playSound(level);
      else window.setTimeout(() => playSound(level), i * CHIME_GAP_MS);
    }
  }

  // Plays the single 5-second countdown file (5-4-3-2-1 ticks inside it)
  function playLoudTickSound() {
    playSound("countdown");
  }

  return { playChimeSequence, playLoudTickSound };
}
