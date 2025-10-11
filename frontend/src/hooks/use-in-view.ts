import { RefObject, useEffect, useRef, useState } from "react";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

export interface UseInViewOptions {
  /**
   * Intersection observer threshold, defaults to 0.2.
   */
  threshold?: number;
  /**
   * Additional margin around the viewport, defaults to "0px".
   */
  rootMargin?: string;
  /**
   * Whether the observer should stop watching after the first intersection.
   */
  once?: boolean;
}

interface UseInViewReturn<T extends Element> {
  ref: RefObject<T>;
  isInView: boolean;
}

/**
 * Lightweight intersection observer utility that plays nicely with reduced-motion settings.
 */
export function useInView<T extends Element = HTMLElement>({
  threshold = 0.2,
  rootMargin = "0px",
  once = true
}: UseInViewOptions = {}): UseInViewReturn<T> {
  const prefersReducedMotion = usePrefersReducedMotion();
  const elementRef = useRef<T>(null);
  const [isInView, setIsInView] = useState(prefersReducedMotion);

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const node = elementRef.current;
    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (once) {
            observer.disconnect();
          }
        } else if (!once) {
          setIsInView(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [prefersReducedMotion, threshold, rootMargin, once]);

  return {
    ref: elementRef,
    isInView
  };
}

