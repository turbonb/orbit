"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import usePrefersReducedMotion from "@/hooks/use-prefers-reduced-motion";

type FormStatus = "idle" | "submitting" | "success" | "error";

const CONTACT_IMAGE =
  "https://cdn.prod.website-files.com/68f93164bb03f1f44689f2c4/68f93165bb03f1f44689f36c_Modern%20White%20Building%20(1).jpeg";

export function ContactSection() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const prefersReducedMotion = usePrefersReducedMotion();

  const handleChange = () => {
    if (status === "success" || status === "error") {
      setStatus("idle");
    }
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setStatus("submitting");

    try {
      // Simulate async submission while preserving Webflow messaging.
      await new Promise((resolve) => setTimeout(resolve, 600));
      event.currentTarget.reset();
      setStatus("success");
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <motion.section
      id="contact-section"
      className="contact-section"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="container contact-grid">
        <motion.div
          className="contact-form-wrapper"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
        >
          <h2 className="section-heading-large bottom-margin-20px">
            Partner with us
          </h2>
          <p className="grey-text bottom-margin-60px">
            If you’re someone who’s looking to bring a space to life, share a
            few details to help me reach out to you so we can discuss how to
            bring your vision to life.
          </p>
          <form className="contact-form" onSubmit={handleSubmit} onChange={handleChange}>
            <div className="form-field-wrapper">
              <label htmlFor="contact-name" className="form-label-2">
                Your full name
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                maxLength={256}
                className="form-field"
                autoComplete="name"
              />
            </div>
            <div className="form-field-wrapper">
              <label htmlFor="contact-email" className="form-label-2">
                Your email address
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                maxLength={256}
                className="form-field"
                autoComplete="email"
                required
              />
            </div>
            <div className="form-field-wrapper">
              <label htmlFor="contact-message" className="form-label-2">
                A little bit about your project
              </label>
              <textarea
                id="contact-message"
                name="message"
                maxLength={5000}
                className="form-field"
                placeholder="Example Text"
              />
            </div>
            <button
              type="submit"
              className="primary-button full-width"
              disabled={status === "submitting"}
            >
              {status === "submitting" ? "Please wait..." : "Submit"}
            </button>
          </form>
          <div className="form-messages" aria-live="polite">
            {status === "success" && (
              <div className="form-message" role="status">
                Thanks for reaching out! We&apos;ll get back to you as soon as
                possible.
              </div>
            )}
            {status === "error" && (
              <div className="form-message error" role="alert">
                Oops! Something went wrong while submitting the form. You can try
                again or directly email me at{" "}
                <a href="mailto:hello@gordonc.com">hello@gordonc.com</a>.
              </div>
            )}
          </div>
        </motion.div>
        <motion.div
          className="contact-image-wrapper"
          initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.97 }}
          whileInView={{
            opacity: 1,
            scale: 1,
            transition: { duration: prefersReducedMotion ? 0 : 0.8, ease: [0.33, 1, 0.68, 1] }
          }}
          viewport={{ once: true, amount: 0.4 }}
        >
          <Image
            src={CONTACT_IMAGE}
            alt="Modern white building with clear blue sky"
            fill
            sizes="(max-width: 767px) 100vw, (max-width: 991px) 90vw, 640px"
          />
        </motion.div>
      </div>
    </motion.section>
  );
}
