import Image from "next/image";
import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const PRESS_LOGOS = [
  {
    src: "https://cdn.prod.website-files.com/68f93164bb03f1f44689f2c4/68f93165bb03f1f44689f343_logo-1.svg",
    alt: "HGTV"
  },
  {
    src: "https://cdn.prod.website-files.com/68f93164bb03f1f44689f2c4/68f93165bb03f1f44689f347_logo-2.svg",
    alt: "eXp Realty"
  },
  {
    src: "https://cdn.prod.website-files.com/68f93164bb03f1f44689f2c4/68f93165bb03f1f44689f348_logo-3.svg",
    alt: "Fortune Magazine"
  }
] as const;

export function PressSection() {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <motion.section
      className="page-section press-section"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="container" style={{ textAlign: "center" }}>
        <motion.p
          className="uppercase-small-heading bottom-margin-small"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.7 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.5 }}
        >
          as featured in
        </motion.p>
        <motion.div
          className="press-strip"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
        >
          {PRESS_LOGOS.map((logo) => (
            <motion.div
              key={logo.alt}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.45 }}
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={140}
                height={40}
                sizes="(max-width: 767px) 120px, 140px"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
