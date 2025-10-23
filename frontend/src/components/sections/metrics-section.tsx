import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

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
      className="page-section metrics-section"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.6, ease: [0.23, 1, 0.32, 1] }}
    >
      <div className="container">
        <motion.h2
          className="metrics-heading"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.5 }}
        >
          by the numbers
        </motion.h2>
        <motion.div
          className="metrics-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {METRICS.map((metric, index) => (
            <motion.div
              className="metric-item"
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
              <p className="metric-value">{metric.value}</p>
              <span className="metric-label">{metric.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
