"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

const LOGO_SRC =
  "https://cdn.prod.website-files.com/68f93164bb03f1f44689f2c4/68f93165bb03f1f44689f346_wp-logo.svg";

const NAV_LINKS = [
  { href: "#about-section", label: "About" },
  { href: "#services-section", label: "Services" },
  { href: "#projects-section", label: "Projects" },
  { href: "#gallery-section", label: "Gallery" },
  { href: "#reviews-section", label: "Reviews" },
  { href: "#contact-section", label: "Contact" }
] as const;

export function MainNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileNav, setIsMobileNav] = useState(false);

  const closeMenu = useCallback(() => setIsMenuOpen(false), []);

  useEffect(() => {
    const updateLayout = () => {
      const mobile = window.innerWidth <= 991;
      setIsMobileNav(mobile);
      if (!mobile) {
        closeMenu();
      }
    };

    updateLayout();
    window.addEventListener("resize", updateLayout);
    return () => window.removeEventListener("resize", updateLayout);
  }, [closeMenu]);

  useEffect(() => {
    const handleHashNavigation = () => closeMenu();
    window.addEventListener("hashchange", handleHashNavigation);
    return () => window.removeEventListener("hashchange", handleHashNavigation);
  }, [closeMenu]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [closeMenu]);

  return (
    <div className="navbar-logo-left">
      <div className="navbar-logo-left-container">
        <div className="container">
          <div className="navbar-wrapper">
            <Link
              href="#top"
              className="navbar-brand"
              aria-label="Navigate to the Woodland hero section"
              onClick={closeMenu}
            >
              <Image
                src={LOGO_SRC}
                alt="Woodland logo"
                height={40}
                width={140}
                priority
              />
            </Link>
            <button
              type="button"
              className="menu-button"
              aria-expanded={isMenuOpen}
              aria-controls="main-navigation"
              aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              onClick={() => setIsMenuOpen((open) => !open)}
            >
              <span aria-hidden="true" />
            </button>
            <div
              id="main-navigation"
              className="nav-menu-wrapper"
              data-open={isMenuOpen && isMobileNav ? "true" : undefined}
              aria-hidden={isMobileNav ? !isMenuOpen : undefined}
            >
              <ul className="nav-menu" role="list">
                {NAV_LINKS.map(({ href, label }) => (
                  <li key={href}>
                    <a
                      href={href}
                      className="nav-link"
                      onClick={closeMenu}
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
