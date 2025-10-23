"use client";

import { useEffect, useState } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

export function usePrefersReducedMotion(): boolean {
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia(QUERY);
    const updatePreference = (event: MediaQueryListEvent | MediaQueryList) => {
      setPrefersReduced(event.matches);
    };

    updatePreference(mediaQuery);

    const canAddEventListener = typeof mediaQuery.addEventListener === "function";
    if (canAddEventListener) {
      mediaQuery.addEventListener("change", updatePreference);
      return () => mediaQuery.removeEventListener("change", updatePreference);
    }

    mediaQuery.addListener(updatePreference);
    return () => mediaQuery.removeListener(updatePreference);
  }, []);

  return prefersReduced;
}
