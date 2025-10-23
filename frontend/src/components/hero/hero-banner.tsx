"use client";

import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

export function HeroBanner() {
  const prefersReducedMotion = usePrefersReducedMotion();

  const baseTransition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 1.1, ease: [0.83, 0, 0.17, 1] };

  return (
    <section id="top" className="hero-section">
      <div className="hero-images-wrapper">
        <motion.div
          className="hero-image-background"
          aria-hidden="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { ...baseTransition } }}
        />
        <div className="page-title">
          <div className="container">
            <motion.h1
              className="large-title"
              initial={{ opacity: 0, y: 40 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: { ...baseTransition, delay: prefersReducedMotion ? 0 : 0.4 }
              }}
            >
              Woodland
            </motion.h1>
          </div>
        </div>
        <motion.div
          className="hero-image-foreground"
          aria-hidden="true"
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: { ...baseTransition, delay: prefersReducedMotion ? 0 : 0.2 }
          }}
        />
        <div className="animated-overlay-blocks" aria-hidden="true">
          <motion.div
            className="left-overlay-block"
            initial={{ x: 0 }}
            animate={{
              x: "-100%",
              transition: { ...baseTransition, delay: prefersReducedMotion ? 0 : 0.1 }
            }}
          />
          <motion.div
            className="right-overlay-block"
            initial={{ x: 0 }}
            animate={{ x: "100%", transition: baseTransition }}
          />
        </div>
      </div>
    </section>
  );
}
