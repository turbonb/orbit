"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "#services", label: "Services" },
  { href: "#process", label: "Process" },
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" }
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-30 bg-[linear-gradient(120deg,rgba(60,9,108,0.65),rgba(90,24,154,0.55),rgba(255,145,0,0.28))] backdrop-blur-lg">
      <div className="grid h-20 w-full grid-cols-[auto_1fr_auto] items-center gap-4 px-2 sm:px-4 lg:px-6">
        <Link href="/" className="flex min-w-[150px] items-center gap-3">
          <span className="sr-only">Ahead of Orbit</span>
          <span className="relative grid h-12 w-12 place-items-center overflow-hidden rounded-full bg-orbit-emblem shadow-orbit-emblem">
            <Image
              src="/brand/Just_logo.png"
              alt="Ahead of Orbit glyph"
              fill
              priority
              sizes="48px"
              className="object-cover"
            />
          </span>
          <span className="hidden text-xs font-semibold uppercase tracking-[0.45em] text-white/75 sm:inline">
            Orbit Collective
          </span>
        </Link>
        <nav className="hidden items-center justify-center gap-8 uppercase tracking-[0.4em] text-xs text-white/65 xl:flex xl:justify-self-center">
          {navItems.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="transition hover:text-white"
            >
              {label}
            </a>
          ))}
        </nav>
        <div className="flex items-center justify-end gap-3">
          <Button
            asChild
            size="sm"
            className="group hidden items-center gap-3 rounded-full border border-white/25 bg-white/15 px-6 text-[11px] font-semibold uppercase tracking-[0.35em] text-white transition hover:bg-[linear-gradient(120deg,rgba(93,28,170,0.9),rgba(157,78,221,0.85))] hover:border-white/35 xl:inline-flex"
          >
            <Link href="/start-your-build">
              <span>Start Your Build</span>
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
          <button
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white transition hover:bg-white/15 xl:hidden"
            onClick={() => setOpen((prev) => !prev)}
            aria-expanded={open}
            aria-label="Toggle navigation"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      <div
        className={cn(
          "origin-top overflow-hidden border-t border-white/12 bg-[linear-gradient(120deg,rgba(60,9,108,0.95),rgba(90,24,154,0.85))] backdrop-blur-xl transition-all duration-300 xl:hidden",
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <nav className="flex flex-col gap-3 px-6 py-4 sm:px-8">
          {navItems.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="rounded-2xl px-4 py-3 text-sm font-medium uppercase tracking-[0.35em] text-white/75 transition hover:bg-white/10 hover:text-white"
              onClick={() => setOpen(false)}
            >
              {label}
            </a>
          ))}
          <div className="flex flex-col gap-3 px-4 pt-2">
          <Button
            asChild
            size="lg"
            className="group rounded-full border border-white/25 bg-white/15 px-6 text-sm font-semibold uppercase tracking-[0.4em] text-white transition hover:bg-[linear-gradient(120deg,rgba(93,28,170,0.9),rgba(157,78,221,0.85))] hover:border-white/35"
          >
            <Link href="/start-your-build" onClick={() => setOpen(false)}>
              <span>Start Your Build</span>
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}
