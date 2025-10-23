"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const TESTIMONIALS = [
  "“Working with Woodland Architects was a blessing for our home. We wanted a space that felt modern but still warm and inviting, and they absolutely nailed it. We highly recommend them for architecture and design projects.”",
  "“From concept to completion, the Woodland team kept our vision front and center. Every detail feels intentional and the finished space is stunning.”",
  "“The collaboration felt seamless. Woodland delivered a design that balances beauty with livability—we couldn’t be happier.”"
] as const;

const ARROWS = {
  left: "https://cdn.prod.website-files.com/68f93164bb03f1f44689f2c4/68f93165bb03f1f44689f34b_left-arrow.svg",
  right:
    "https://cdn.prod.website-files.com/68f93164bb03f1f44689f2c4/68f93165bb03f1f44689f34c_right-arrow.svg"
};

export function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const prefersReducedMotion = usePrefersReducedMotion();

  const showPrevious = useCallback(() => {
    setDirection(-1);
    setActiveIndex((index) =>
      index === 0 ? TESTIMONIALS.length - 1 : index - 1
    );
  }, []);

  const showNext = useCallback(() => {
    setDirection(1);
    setActiveIndex((index) =>
      index === TESTIMONIALS.length - 1 ? 0 : index + 1
    );
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const timer = window.setInterval(() => {
      showNext();
    }, 7000);

    return () => {
      window.clearInterval(timer);
    };
  }, [showNext, prefersReducedMotion]);

  const variants = {
    enter: (dir: number) => ({
      opacity: 0,
      x: dir > 0 ? 60 : -60,
      scale: prefersReducedMotion ? 1 : 0.96
    }),
    center: {
      opacity: 1,
      x: 0,
      scale: 1
    },
    exit: (dir: number) => ({
      opacity: 0,
      x: dir > 0 ? -60 : 60,
      scale: prefersReducedMotion ? 1 : 0.96
    })
  };

  return (
    <motion.section
      id="reviews-section"
      className="testimonials-section"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="container testimonials-container">
        <p className="uppercase-small-heading bottom-margin-small">
          hear our client
        </p>
        <h2 className="uppercase-large-heading">reviews</h2>
        <AnimatePresence mode="wait" initial={false} custom={direction}>
          <motion.p
            key={activeIndex}
            className="testimonial-text"
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              duration: prefersReducedMotion ? 0 : 0.6,
              ease: [0.25, 1, 0.5, 1]
            }}
            aria-live="polite"
          >
            {TESTIMONIALS[activeIndex]}
          </motion.p>
        </AnimatePresence>
        <div className="testimonial-nav">
          <button
            type="button"
            onClick={showPrevious}
            aria-label="Previous testimonial"
          >
            <Image src={ARROWS.left} alt="" width={18} height={18} />
          </button>
          <button
            type="button"
            onClick={showNext}
            aria-label="Next testimonial"
          >
            <Image src={ARROWS.right} alt="" width={18} height={18} />
          </button>
        </div>
      </div>
    </motion.section>
  );
}
