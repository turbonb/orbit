"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

type FormStatus = "idle" | "submitting" | "success" | "error";

const QUICK_LINKS = [
  { label: "About", href: "#about-section" },
  { label: "Services", href: "#services-section" },
  { label: "Projects", href: "#projects-section" },
  { label: "Gallery", href: "#gallery-section" },
  { label: "Reviews", href: "#reviews-section" },
  { label: "Contact", href: "#contact-section" }
] as const;

const RESOURCE_LINKS = [
  { label: "Style guide", href: "#" },
  { label: "Licenses", href: "#" },
  { label: "Changelog", href: "#" }
] as const;

const CONTACT_LINKS = [
  {
    label: "hi@woodland.com",
    href: "mailto:hi@woodland.com?subject=Mail%20for%20Woodland"
  },
  { label: "Twitter", href: "https://www.x.com", external: true },
  { label: "LinkedIn", href: "https://www.linkedin.com", external: true }
] as const;

function NewsletterForm() {
  const [status, setStatus] = useState<FormStatus>("idle");

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
      await new Promise((resolve) => setTimeout(resolve, 500));
      event.currentTarget.reset();
      setStatus("success");
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <form
      className="newsletter-form"
      onSubmit={handleSubmit}
      onChange={handleChange}
    >
      <div className="form-field-wrapper">
        <label htmlFor="newsletter-email" className="form-label">
          Your email address
        </label>
        <input
          id="newsletter-email"
          name="email"
          type="email"
          required
          maxLength={256}
          className="form-field"
          autoComplete="email"
        />
      </div>
      <button
        type="submit"
        className="primary-button"
        disabled={status === "submitting"}
      >
        {status === "submitting" ? "Please wait..." : "Submit"}
      </button>
      <div className="form-messages" aria-live="polite">
        {status === "success" && (
          <div className="form-message" role="status">
            Thank you for joining!
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
    </form>
  );
}

export function SiteFooter() {
  const currentYear = useMemo(() => new Date().getFullYear(), []);
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <motion.footer
      className="site-footer"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="container">
        <motion.div
          className="footer-grid-top"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.5, delay: 0.05 }}
          >
            <h3 className="footer-heading">Quick Links</h3>
            {QUICK_LINKS.map((link) => (
              <a key={link.label} href={link.href} className="footer-link">
                {link.label}
              </a>
            ))}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.5, delay: 0.1 }}
          >
            <h3 className="footer-heading">Resources</h3>
            {RESOURCE_LINKS.map((link) => (
              <a key={link.label} href={link.href} className="footer-link">
                {link.label}
              </a>
            ))}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.5, delay: 0.15 }}
          >
            <h3 className="footer-heading">Contact</h3>
            {CONTACT_LINKS.map((link) =>
              link.external ? (
                <a
                  key={link.label}
                  href={link.href}
                  className="footer-link"
                  target="_blank"
                  rel="noreferrer"
                >
                  {link.label}
                </a>
              ) : (
                <a key={link.label} href={link.href} className="footer-link">
                  {link.label}
                </a>
              )
            )}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.5, delay: 0.2 }}
          >
            <h3 className="footer-heading">Newsletter</h3>
            <NewsletterForm />
          </motion.div>
        </motion.div>
        <motion.div
          className="footer-divider"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.6, ease: [0.33, 1, 0.68, 1] }}
        />
        <motion.div
          className="footer-bottom"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
        >
          <motion.div
            className="legal-links"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.5 }}
          >
            <Link href="#" className="footer-link">
              Privacy Policy
            </Link>
            <Link href="#" className="footer-link">
              Cookie Policy
            </Link>
          </motion.div>
          <motion.div
            className="legal-links"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.5, delay: 0.08 }}
          >
            <a
              href="https://www.zoyaqib.com/"
              target="_blank"
              rel="noreferrer"
              className="footer-link"
            >
              Created by Zoya Aqib
            </a>
            <a
              href="https://webflow.com/"
              target="_blank"
              rel="noreferrer"
              className="footer-link"
            >
              Powered by Webflow
            </a>
          </motion.div>
          <motion.p
            className="footer-note"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.5, delay: 0.12 }}
          >
            © {currentYear} Woodland Architects. All rights reserved.
          </motion.p>
        </motion.div>
      </div>
    </motion.footer>
  );
}
