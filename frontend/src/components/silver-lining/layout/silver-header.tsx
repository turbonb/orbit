"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/#contact" }
];

export function SilverHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-black/5 bg-white/80 backdrop-blur-md">
      <Reveal
        direction="down"
        className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-5 transition-all sm:px-8 lg:px-10"
      >
        <Link
          href="/"
          className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.3em] text-[rgba(28,28,28,0.85)] hover:text-black"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white text-base font-bold text-black shadow-[0_8px_20px_rgba(15,15,20,0.08)]">
            SL
          </span>
          Silver Lining
        </Link>
        <nav className="hidden items-center gap-8 text-xs font-semibold uppercase tracking-[0.35em] text-[rgba(28,28,28,0.65)] md:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="relative pb-1 text-[rgba(28,28,28,0.75)] transition hover:text-black after:absolute after:inset-x-0 after:-bottom-1 after:h-[2px] after:bg-black/0 hover:after:bg-[hsl(var(--primary))]"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <Button
            asChild
            size="lg"
            className="hidden rounded-full bg-[hsl(var(--primary))] px-6 py-2 text-xs font-semibold uppercase tracking-[0.32em] text-[hsl(var(--secondary))] shadow-soft transition hover:bg-[hsl(var(--primary)/0.85)] md:inline-flex"
          >
            <Link href="/#contact">Book a walkthrough</Link>
          </Button>
          <button
            className="flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white text-[rgba(28,28,28,0.8)] shadow-[0_10px_28px_rgba(15,15,20,0.08)] md:hidden"
            aria-label="Toggle navigation"
            aria-expanded={open}
            onClick={() => setOpen((prev) => !prev)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </Reveal>
      <div
        className={cn(
          "md:hidden",
          "overflow-hidden border-t border-black/10 bg-white/95 backdrop-blur-md transition-all duration-300 ease-out",
          open ? "max-h-[320px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="space-y-4 px-5 pb-6 pt-4 sm:px-8">
          <nav className="flex flex-col gap-3 text-sm font-medium uppercase tracking-[0.3em] text-[rgba(28,28,28,0.8)]">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-xl border border-black/5 bg-white px-4 py-3 shadow-[0_12px_30px_rgba(15,15,20,0.08)] transition hover:border-black/15 hover:bg-[hsl(var(--primary)/0.12)]"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <Button
            asChild
            size="lg"
            className="w-full rounded-full bg-[hsl(var(--primary))] px-6 py-2 text-xs font-semibold uppercase tracking-[0.32em] text-[hsl(var(--secondary))] shadow-soft transition hover:bg-[hsl(var(--primary)/0.85)]"
          >
            <Link href="/#contact" onClick={() => setOpen(false)}>
              Book a walkthrough
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
