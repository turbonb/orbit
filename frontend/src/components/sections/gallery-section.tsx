"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const GALLERY_IMAGES = [
  {
    src: "https://cdn.prod.website-files.com/68f93164bb03f1f44689f2c4/68f93165bb03f1f44689f366_gallery-img-tl.webp",
    alt: "Contemporary villa exterior with reflecting pool",
    slot: "tl"
  },
  {
    src: "https://cdn.prod.website-files.com/68f93164bb03f1f44689f2c4/68f93165bb03f1f44689f368_gallery-img-center.webp",
    alt: "Bold interior archway framing a kitchen",
    slot: "center"
  },
  {
    src: "https://cdn.prod.website-files.com/68f93164bb03f1f44689f2c4/68f93165bb03f1f44689f349_gallery-img-tr.webp",
    alt: "Art-lined hallway leading to a sunlit living room",
    slot: "tr"
  },
  {
    src: "https://cdn.prod.website-files.com/68f93164bb03f1f44689f2c4/68f93165bb03f1f44689f36a_gallery-img-bl.webp",
    alt: "Outdoor terrace with sculpted landscaping",
    slot: "bl"
  },
  {
    src: "https://cdn.prod.website-files.com/68f93164bb03f1f44689f2c4/68f93165bb03f1f44689f367_gallery-img-br.webp",
    alt: "Minimalist foyer with modern chandelier",
    slot: "br"
  }
] as const;

type GallerySlot = (typeof GALLERY_IMAGES)[number]["slot"];

const PARALLAX_CONFIG: Record<GallerySlot, { x: [number, number]; y: [number, number] }> = {
  tl: { x: [0, 46], y: [0, 36] },
  center: { x: [0, 0], y: [0, 0] },
  tr: { x: [0, 34], y: [0, -42] },
  bl: { x: [0, -36], y: [0, 34] },
  br: { x: [0, 36], y: [0, 36] }
};

export function GallerySection() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const tlX = useTransform(scrollYProgress, [0, 1], PARALLAX_CONFIG.tl.x);
  const tlY = useTransform(scrollYProgress, [0, 1], PARALLAX_CONFIG.tl.y);
  const centerX = useTransform(scrollYProgress, [0, 1], PARALLAX_CONFIG.center.x);
  const centerY = useTransform(scrollYProgress, [0, 1], PARALLAX_CONFIG.center.y);
  const trX = useTransform(scrollYProgress, [0, 1], PARALLAX_CONFIG.tr.x);
  const trY = useTransform(scrollYProgress, [0, 1], PARALLAX_CONFIG.tr.y);
  const blX = useTransform(scrollYProgress, [0, 1], PARALLAX_CONFIG.bl.x);
  const blY = useTransform(scrollYProgress, [0, 1], PARALLAX_CONFIG.bl.y);
  const brX = useTransform(scrollYProgress, [0, 1], PARALLAX_CONFIG.br.x);
  const brY = useTransform(scrollYProgress, [0, 1], PARALLAX_CONFIG.br.y);

  const parallaxBySlot: Record<GallerySlot, { x: typeof tlX; y: typeof tlY }> = {
    tl: { x: tlX, y: tlY },
    center: { x: centerX, y: centerY },
    tr: { x: trX, y: trY },
    bl: { x: blX, y: blY },
    br: { x: brX, y: brY }
  };

  return (
    <motion.section
      ref={sectionRef}
      id="gallery-section"
      className="gallery-section page-section"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{
        duration: prefersReducedMotion ? 0 : 0.65,
        ease: [0.16, 1, 0.3, 1]
      }}
    >
      <div className="gallery-shell">
        <div className="gallery-stage">
          <motion.div
            className="gallery-title-block"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="uppercase-small-heading bottom-margin-small">as featured in</p>
            <h2 className="gallery-heading">gallery</h2>
          </motion.div>
          <div className="gallery-grid">
            {GALLERY_IMAGES.map((item, index) => {
              const parallax = parallaxBySlot[item.slot];
              const motionStyle = prefersReducedMotion
                ? undefined
                : { x: parallax.x, y: parallax.y };

              return (
                <motion.div
                  key={item.src}
                  className={`gallery-grid-item gallery-grid-item--${item.slot}`}
                  style={motionStyle}
                  initial={{
                    opacity: prefersReducedMotion ? 1 : 0,
                    scale: prefersReducedMotion ? 1 : 0.95
                  }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.45 }}
                  transition={{
                    duration: prefersReducedMotion ? 0 : 0.6,
                    ease: [0.25, 1, 0.5, 1],
                    delay: prefersReducedMotion ? 0 : index * 0.08
                  }}
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    width={640}
                    height={800}
                    sizes="(max-width: 600px) 100vw, (max-width: 1024px) 50vw, 28vw"
                    className="gallery-grid-image"
                  />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
