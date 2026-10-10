"use client";

import { useEffect } from "react";

/** Keeps the screen awake while `active` is true (if the browser supports it). */
export function useWakeLock(active: boolean) {
  useEffect(() => {
    if (!active) return;
    if (typeof navigator === "undefined" || !("wakeLock" in navigator)) return;

    let lock: WakeLockSentinel | null = null;
    let cancelled = false;

    const request = async () => {
      try {
        const sentinel = await navigator.wakeLock.request("screen");
        if (cancelled) {
          sentinel.release().catch(() => {});
          return;
        }
        lock = sentinel;
      } catch {
        // denied or unsupported: nothing to do
      }
    };

    // the browser releases the lock when the tab is hidden; take it again
    const onVisible = () => {
      if (document.visibilityState === "visible" && (!lock || lock.released)) {
        request();
      }
    };

    request();
    document.addEventListener("visibilitychange", onVisible);

    return () => {
      cancelled = true;
      document.removeEventListener("visibilitychange", onVisible);
      lock?.release().catch(() => {});
    };
  }, [active]);
}
