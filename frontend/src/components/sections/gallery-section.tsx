import Image from "next/image";
import { motion } from "framer-motion";
import usePrefersReducedMotion from "@/hooks/use-prefers-reduced-motion";

const GALLERY_IMAGES = [
  {
    src: "https://cdn.prod.website-files.com/68f93164bb03f1f44689f2c4/68f93165bb03f1f44689f366_gallery-img-tl.webp",
    alt: "Modern staircase with sculptural railing"
  },
  {
    src: "https://cdn.prod.website-files.com/68f93164bb03f1f44689f2c4/68f93165bb03f1f44689f368_gallery-img-center.webp",
    alt: "Minimalist living room with warm lighting"
  },
  {
    src: "https://cdn.prod.website-files.com/68f93164bb03f1f44689f2c4/68f93165bb03f1f44689f349_gallery-img-tr.webp",
    alt: "Architectural staircase detail with concrete"
  },
  {
    src: "https://cdn.prod.website-files.com/68f93164bb03f1f44689f2c4/68f93165bb03f1f44689f36a_gallery-img-bl.webp",
    alt: "Outdoor seating area with textured walls"
  },
  {
    src: "https://cdn.prod.website-files.com/68f93164bb03f1f44689f2c4/68f93165bb03f1f44689f367_gallery-img-br.webp",
    alt: "Modern kitchen with wooden cabinetry"
  },
  {
    src: "https://cdn.prod.website-files.com/68f93164bb03f1f44689f2c4/68f93165bb03f1f44689f36c_Modern%20White%20Building%20(1).jpeg",
    alt: "White curved exterior building against blue sky"
  }
] as const;

export function GallerySection() {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <motion.section
      id="gallery-section"
      className="page-section"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="container">
        <motion.div
          className="gallery-intro"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
        >
          <p className="uppercase-small-heading bottom-margin-small">
            as featured in
          </p>
          <h2 className="gallery-heading">gallery</h2>
        </motion.div>
        <motion.div className="gallery-grid">
          {GALLERY_IMAGES.map((image, index) => (
            <motion.div
              key={image.src}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{
                duration: prefersReducedMotion ? 0 : 0.55,
                delay: prefersReducedMotion ? 0 : index * 0.05
              }}
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={640}
                height={640}
                sizes="(max-width: 767px) 100vw, (max-width: 991px) 50vw, 33vw"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
