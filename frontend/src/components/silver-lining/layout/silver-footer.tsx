import Link from "next/link";

const PRIMARY_LINKS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/#contact" }
];

const SUPPORT_LINKS = [
  { label: "Supplies Checklist", href: "/resources/checklist" },
  { label: "FAQ", href: "/services#faq" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms", href: "/terms" }
];

export function SilverFooter() {
  return (
    <footer className="section-shell border-t border-black/10 bg-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 md:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)_minmax(0,1fr)] lg:px-10">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-full border border-black/5 bg-[hsl(var(--primary)/0.2)] text-base font-semibold uppercase tracking-[0.3em] text-[rgb(28,28,28)]">
              SL
            </span>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[rgba(28,28,28,0.65)]">
                Silver Lining Cleaning
              </p>
              <p className="mt-1 text-sm text-[rgba(28,28,28,0.65)]">
                Concierge-quality cleaning for homes, studios, and suites.
              </p>
            </div>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-[rgba(28,28,28,0.68)]">
            Since 2012, our teams have tailored every visit—from eco-friendly supplies to photographic
            proof after each clean. We believe in meticulous care, transparent updates, and delightfully
            spotless spaces.
          </p>
          <div className="text-xs uppercase tracking-[0.32em] text-[rgba(28,28,28,0.55)]">
            © {new Date().getFullYear()} Silver Lining Cleaning Services. All rights reserved.
          </div>
        </div>

        <nav className="space-y-4">
          <h3 className="text-xs font-semibold uppercase tracking-[0.35em] text-[rgba(28,28,28,0.55)]">
            Navigate
          </h3>
          <ul className="space-y-3 text-sm font-medium text-[rgba(28,28,28,0.75)]">
            {PRIMARY_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="relative inline-flex items-center gap-2 transition hover:text-black"
                >
                  <span>{link.label}</span>
                  <span aria-hidden className="translate-y-[2px] text-[hsl(var(--primary))]">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav className="space-y-4">
          <h3 className="text-xs font-semibold uppercase tracking-[0.35em] text-[rgba(28,28,28,0.55)]">
            Resources
          </h3>
          <ul className="space-y-3 text-sm text-[rgba(28,28,28,0.75)]">
            {SUPPORT_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="transition hover:text-black"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-6 space-y-2 text-sm text-[rgba(28,28,28,0.7)]">
            <p>hello@silverliningcleaning.com</p>
            <p>Available Monday – Saturday, 8am to 6pm.</p>
          </div>
        </nav>
      </div>
    </footer>
  );
}
