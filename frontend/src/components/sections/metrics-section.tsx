"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { PRESS_LOGOS } from "@/components/sections/press-section";

const METRICS = [
  {
    value: "316+",
    label: "projects completed"
  },
  {
    value: "740+",
    label: "satisfied customers"
  },
  {
    value: "215+",
    label: "YTD transactions"
  }
] as const;

export function MetricsSection() {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <motion.section
      className="metrics-section"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.6, ease: [0.23, 1, 0.32, 1] }}
    >
      <div className="metrics-shell">
        <motion.div
          className="metrics-content"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.45, ease: [0.25, 1, 0.5, 1] }}
        >
          <p className="uppercase-small-heading metrics-eyebrow">by the numbers</p>
          <div className="metrics-grid">
            {METRICS.map((metric, index) => (
              <motion.div
                className="stat-wrapper"
                key={metric.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{
                  duration: prefersReducedMotion ? 0 : 0.55,
                  delay: prefersReducedMotion ? 0 : index * 0.08,
                  ease: [0.25, 1, 0.5, 1]
                }}
              >
                <p className="stat-value">{metric.value}</p>
                <span className="stat-label">{metric.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
        <motion.div
          className="metrics-press"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.5, ease: [0.25, 1, 0.5, 1] }}
        >
          <p className="uppercase-small-heading metrics-eyebrow">as featured in</p>
          <div className="metrics-logo-strip">
            {PRESS_LOGOS.map((logo) => (
              <Image
                key={logo.alt}
                src={logo.src}
                alt={logo.alt}
                width={140}
                height={40}
                className="metrics-logo"
                sizes="(max-width: 767px) 110px, 140px"
              />
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
