"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const HERO_HIGHLIGHTS = [
  {
    label: "Designation",
    value: "Launch sprint studio"
  },
  {
    label: "Focus",
    value: "Supabase marketing sites, rapid MVPs, conversion revamps"
  },
  {
    label: "Trajectory",
    value: "Strategy → Story → Ship inside a 21-day orbit"
  }
];

const MISSION_PROTOCOL = [
  "Prime the velocity grid + ignite gradient thrusters.",
  "Stabilize Supabase autopilot for auth, data, and storage.",
  "Wake the contact beacon to confirm launch coordinates."
];

const TRANSMISSION_TEXT = "Orbit ships cinematic Supabase builds in literal weeks—velocity without drag, polish without compromise.";

export function HeroSection() {

  return (
    <section className="section-shell relative flex min-h-[calc(100vh-5rem)] flex-col overflow-hidden">

      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="absolute left-0 right-0 top-[clamp(1.25rem,3vw,2.5rem)] z-20 flex items-center justify-between px-[clamp(1.5rem,6vw,4.5rem)] font-mono text-[0.7rem] uppercase tracking-[0.48em] text-white/65"
      >
        <span>Launch Deck&nbsp;No.005</span>
        <span>2025 Edition</span>
      </motion.div>

      <div className="relative z-10 mx-auto flex w-full max-w-[1700px] flex-1 flex-col justify-between gap-[clamp(1.5rem,4.5vw,3rem)] px-5 pb-[clamp(2rem,5vw,3.5rem)] pt-[clamp(4.5rem,7vw,6rem)] sm:px-8 lg:px-12 xl:px-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.1 }}
          className="mx-auto flex w-full max-w-4xl flex-col items-center gap-[clamp(1.25rem,3.5vw,2.4rem)] text-center"
        >
          <span className="relative inline-flex h-[clamp(5.5rem,10vw,8.25rem)] w-[clamp(5.5rem,10vw,8.25rem)] items-center justify-center overflow-hidden rounded-full bg-transparent">
            <Image
              src="/brand/Just_logo.png"
              alt="Orbit Collective emblem"
              fill
              className="object-contain"
              sizes="(max-width: 768px) 64px, 96px"
              priority
            />
          </span>
          <h1 className="font-display text-[clamp(3.8rem,10vw,7.75rem)] uppercase leading-[0.78] text-white">
            Orbit Collective
          </h1>
          <p className="max-w-2xl text-base text-white/75 sm:text-lg">
            Orbit Collective is a supersonic studio—design-first, automation-ready, Supabase powered. We plan,
            prototype, and launch cinematic web experiences in weeks, not quarters.
          </p>
          <div className="flex items-center justify-center">
            <div className="flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.35em] text-white/85 shadow-[0_18px_48px_rgba(15,6,32,0.45)]">
              <Image
                src="/brand/Just_logo.png"
                alt="Orbit badge"
                width={28}
                height={28}
                className="h-7 w-7 rounded-full border border-white/20 bg-white/10 p-1"
              />
              Orbit studio
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.95, ease: "easeOut", delay: 0.25 }}
          className="orbit-text-card mt-auto w-full px-6 py-5 text-white sm:px-8 lg:px-10"
        >
          <div className="flex flex-col gap-3 border-b border-white/15 pb-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <p className="font-mono text-[0.7rem] uppercase tracking-[0.42em] text-white/65">Orbital Viewport</p>
              <span className="font-mono text-sm uppercase tracking-[0.6em] text-white/80">OC-01</span>
            </div>
            <div className="flex items-center gap-3 text-right">
              <p className="font-mono text-[0.7rem] uppercase tracking-[0.42em] text-[rgba(255,145,0,0.8)]">Mission Protocol</p>
              <span className="text-xs uppercase tracking-[0.42em] text-white/60">Prime · Stabilize · Confirm</span>
            </div>
          </div>
          <div className="mt-4 grid gap-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:items-start">
            <div className="space-y-4">
              <ul className="grid gap-2 text-sm text-white/85">
                {HERO_HIGHLIGHTS.map(({ label, value }) => (
                  <li key={label} className="flex items-center gap-3">
                    <span className="h-px w-6 bg-white/35" aria-hidden />
                    <span>
                      <span className="font-mono text-[0.65rem] uppercase tracking-[0.32em] text-white/60">{label}</span>
                      <span className="ml-3 text-[0.95rem] text-white/85">{value}</span>
                    </span>
                  </li>
                ))}
              </ul>
              <p className="text-sm leading-relaxed text-white/80">
                {TRANSMISSION_TEXT}
              </p>
            </div>
            <div className="space-y-4 lg:pl-6 lg:text-right">
              <ol className="space-y-2 font-mono text-[0.78rem] uppercase tracking-[0.32em] text-white/80">
                {MISSION_PROTOCOL.map((step) => (
                  <li key={step} className="leading-snug">{step}</li>
                ))}
              </ol>
              <div className="border-t border-white/15 pt-3 font-mono text-[0.65rem] uppercase tracking-[0.34em] text-white/65">
                Status: Accepting launch windows
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
