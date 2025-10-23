"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

type ServiceItem = {
  number: string;
  title: string;
  summary: string;
  bullets: readonly string[];
  image: {
    src: string;
    alt: string;
  };
};

const SERVICES: ServiceItem[] = [
  {
    number: "01",
    title: "Architecture",
    summary:
      "We design buildings that are purposeful, enduring, and deeply connected to their surroundings.",
    bullets: [
      "Concept Design",
      "Architectural Planning",
      "3D Visualization & Modeling",
      "Construction Documentation"
    ],
    image: {
      src: "https://cdn.prod.website-files.com/68f93164bb03f1f44689f2c4/68f93165bb03f1f44689f361_service-1-img.webp",
      alt: "Modern architecture exterior with geometric facade"
    }
  },
  {
    number: "02",
    title: "Interior Design",
    summary:
      "Beyond surface-level styling, we craft interiors that feel as good as they look.",
    bullets: [
      "Spatial Identity",
      "Material & Finish Selection",
      "Furniture & Lighting Design",
      "Detail Development"
    ],
    image: {
      src: "https://cdn.prod.website-files.com/68f93164bb03f1f44689f2c4/68f93165bb03f1f44689f362_service-2-img.webp",
      alt: "Warm modern living room interior with artwork"
    }
  },
  {
    number: "03",
    title: "Layout Planning",
    summary:
      "We organize environments around people, movement, and use, creating clarity, comfort, and adaptability.",
    bullets: [
      "Functional Zoning",
      "Human-Centered Design",
      "Circulation Strategy",
      "Flexibility & Future Use"
    ],
    image: {
      src: "https://cdn.prod.website-files.com/68f93164bb03f1f44689f2c4/68f93165bb03f1f44689f35d_service-3-img.webp",
      alt: "Minimal open-concept living space overlooking water"
    }
  },
  {
    number: "04",
    title: "Project Management",
    summary:
      "We ensure your vision is delivered on time, on budget, and to the highest standards.",
    bullets: [
      "Concept Design",
      "Stakeholder Coordination",
      "Quality Control",
      "Budget & Timeline Tracking"
    ],
    image: {
      src: "https://cdn.prod.website-files.com/68f93164bb03f1f44689f2c4/68f93165bb03f1f44689f360_service-4-img.webp",
      alt: "Construction site with scaffolding and lighting"
    }
  }
];

export function ServicesSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const prefersReducedMotion = usePrefersReducedMotion();

  const toggleService = (index: number) => {
    setOpenIndex((current) => (current === index ? null : index));
  };

  const containerVariants = {
    hidden: {},
    visible: {}
  };

  const serviceVariants = {
    hidden: { opacity: 0, y: 32 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.section
      id="services-section"
      className="page-section"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      transition={{ staggerChildren: prefersReducedMotion ? 0 : 0.12 }}
    >
      <div className="container section-split-grid">
        <motion.div variants={serviceVariants}>
          <h2 className="section-heading-large">Services</h2>
        </motion.div>
        <motion.div className="services-list" variants={serviceVariants}>
          {SERVICES.map((service, index) => {
            const isOpen = openIndex === index;
            const bodyId = `service-panel-${index}`;

            return (
              <motion.div
                className="service-item"
                key={service.title}
                variants={serviceVariants}
                transition={{
                  duration: prefersReducedMotion ? 0 : 0.6,
                  ease: [0.23, 1, 0.32, 1],
                  delay: prefersReducedMotion ? 0 : index * 0.08
                }}
              >
                <div className="service-grid">
                  <div className="service-number">{service.number}</div>
                  <div>
                    <button
                      type="button"
                      className="service-trigger"
                      aria-expanded={isOpen}
                      aria-controls={bodyId}
                      onClick={() => toggleService(index)}
                    >
                      <div className="service-title-block">
                        <h3>{service.title}</h3>
                        <p className="service-description">{service.summary}</p>
                      </div>
                      <span
                        className="accordion-icon"
                        aria-hidden="true"
                        data-open={isOpen ? "true" : undefined}
                      />
                      <span className="sr-only">
                        {isOpen ? "Collapse" : "Expand"} {service.title}
                      </span>
                    </button>
                    <div
                      id={bodyId}
                      className="service-body"
                      data-open={isOpen ? "true" : undefined}
                      aria-hidden={!isOpen}
                    >
                      <ul className="service-bullets">
                        {service.bullets.map((bullet) => (
                          <li className="service-bullet" key={bullet}>
                            <span className="bullet-dot" aria-hidden="true" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="service-image-wrapper">
                        <Image
                          src={service.image.src}
                          alt={service.image.alt}
                          width={480}
                          height={600}
                          sizes="(max-width: 767px) 100vw, 280px"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </motion.section>
  );
}
