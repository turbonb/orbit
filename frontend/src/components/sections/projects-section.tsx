"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

type Project = {
  title: string;
  description: string;
  meta: readonly string[];
  image: {
    src: string;
    alt: string;
  };
  align: "left" | "right";
};

const PROJECTS: Project[] = [
  {
    title: "Coastal Villa",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    meta: ["Aspen", "Residential", "2024"],
    image: {
      src: "https://cdn.prod.website-files.com/68f93164bb03f1f44689f2c4/68f93165bb03f1f44689f356_Contemporary%20House%20at%20Dawn_Dusk.jpeg",
      alt: "Modern coastal villa exterior with minimalist design"
    },
    align: "right"
  },
  {
    title: "The Willow Loft",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    meta: ["Aspen", "Residential", "2024"],
    image: {
      src: "https://cdn.prod.website-files.com/68f93164bb03f1f44689f2c4/68f93165bb03f1f44689f355_Modern%20Minimalist%20House%20with%20Garden.jpeg",
      alt: "Low-profile modern loft surrounded by greenery"
    },
    align: "left"
  },
  {
    title: "Sunshine Retreat",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    meta: ["Aspen", "Residential", "2024"],
    image: {
      src: "https://cdn.prod.website-files.com/68f93164bb03f1f44689f2c4/68f93165bb03f1f44689f364_project-2-img.webp",
      alt: "Glass pavilion with landscaped garden in the sun"
    },
    align: "right"
  }
];

export function ProjectsSection() {
  const prefersReducedMotion = usePrefersReducedMotion();

  const sectionVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.section
      id="projects-section"
      className="page-section projects-section"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      transition={{ staggerChildren: prefersReducedMotion ? 0 : 0.18 }}
    >
      <div className="projects-shell">
        <motion.h2 className="section-heading-large projects-heading" variants={sectionVariants}>
          Projects
        </motion.h2>
        <motion.div className="projects-list">
          {PROJECTS.map((project) => {
            const directionMultiplier = project.align === "left" ? -1 : 1;

            const figureInitial = prefersReducedMotion
              ? { opacity: 0 }
              : {
                  opacity: 0,
                  x: 90 * directionMultiplier,
                  scale: 0.95
                };

            const figureAnimate = prefersReducedMotion
              ? { opacity: 1 }
              : {
                  opacity: 1,
                  x: 0,
                  scale: 1,
                  transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] }
                };

            const imageInitial = prefersReducedMotion
              ? { opacity: 0 }
              : {
                  opacity: 0,
                  scaleX: 0.88,
                  x: 60 * directionMultiplier
                };

            const imageAnimate = prefersReducedMotion
              ? { opacity: 1 }
              : {
                  opacity: 1,
                  scaleX: 1,
                  x: 0,
                  transition: {
                    duration: 0.9,
                    ease: [0.22, 1, 0.36, 1]
                  }
                };

            return (
            <motion.article
              className="project-item"
              key={project.title}
              data-align={project.align}
              variants={sectionVariants}
              transition={{
                duration: prefersReducedMotion ? 0 : 0.65,
                ease: [0.16, 1, 0.3, 1]
              }}
            >
              <motion.figure
                className="project-figure"
                initial={figureInitial}
                whileInView={figureAnimate}
                viewport={{ once: true, amount: 0.4 }}
              >
                <motion.div
                  className="project-image-wrapper"
                  initial={imageInitial}
                  whileInView={imageAnimate}
                  viewport={{ once: true, margin: "-20% 0px -10% 0px" }}
                  style={{
                    transformOrigin: project.align === "left" ? "left center" : "right center"
                  }}
                >
                  <Image
                    src={project.image.src}
                    alt={project.image.alt}
                    width={1500}
                    height={1000}
                    className="project-image"
                    sizes="(max-width: 767px) 100vw, (max-width: 1400px) 95vw, 1500px"
                    priority={project.title === "Coastal Villa"}
                  />
                </motion.div>
                <motion.div
                  className="project-info-card"
                  data-align={project.align}
                  initial={
                    prefersReducedMotion
                      ? { opacity: 0 }
                      : { opacity: 0, x: 40 * directionMultiplier, y: 30 }
                  }
                  whileInView={{
                    opacity: 1,
                    x: 0,
                    y: 0,
                    transition: {
                      duration: prefersReducedMotion ? 0 : 0.6,
                      ease: [0.16, 1, 0.3, 1]
                    }
                  }}
                  viewport={{ once: true, amount: 0.5 }}
                >
                  <h3 className="project-title">{project.title}</h3>
                  <ul className="project-meta">
                    {project.meta.map((item) => (
                      <li key={item} className="project-label">
                        {item}
                      </li>
                    ))}
                  </ul>
                  <p className="project-description">{project.description}</p>
                </motion.div>
              </motion.figure>
            </motion.article>
            );
          })}
        </motion.div>
      </div>
    </motion.section>
  );
}
