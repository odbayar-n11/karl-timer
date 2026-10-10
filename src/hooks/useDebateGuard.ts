"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDebate } from "@/context/DebateContext";

/**
 * Keeps people on the right page for the current debate state
 * (e.g. after a refresh the in-memory state is gone -> back to "/").
 *
 * Returns true when the page is allowed to render.
 */
export function useDebateGuard(page: "debate" | "results"): boolean {
  const router = useRouter();
  const { configured, finished } = useDebate();

  useEffect(() => {
    if (page === "debate") {
      if (!configured) router.replace("/");
      if (finished) router.replace("/results");
    } else if (!finished) {
      router.replace("/");
    }
  }, [page, configured, finished, router]);

  return page === "debate" ? configured && !finished : finished;
}
