"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

const HERO_VIDEO_SRC = "/brand/13147019_1920_1080_30fps.mp4";

const LEFT_COLUMN = [
  {
    label: "Designation",
    value: "Launch Sprint Studio"
  },
  {
    label: "Focus",
    value: "Supabase-backed marketing sites, rapid MVPs, and revamps tuned for conversion."
  },
  {
    label: "Trajectory",
    value: "Strategy → Story → Ship inside a 21-day orbit."
  }
];

const MISSION_PROTOCOL = [
  "Prime the velocity grid + ignite gradient thrusters.",
  "Stabilize Supabase autopilot for auth, data, and storage.",
  "Wake the contact beacon to confirm launch coordinates."
];

export function HeroSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="section-shell relative flex min-h-[calc(100vh-5rem)] flex-col overflow-hidden">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {prefersReducedMotion ? (
          <div className="h-full w-full bg-[radial-gradient(circle_at_center,hsl(var(--brand-tekhelet)/0.55),hsl(var(--brand-void)))]" />
        ) : (
          <video
            key="orbit-galaxy"
            className="h-full w-full scale-[1.08] object-cover object-center"
            autoPlay
            loop
            muted
            playsInline
            poster="/brand/Planet_image.jpg"
          >
            <source src={HERO_VIDEO_SRC} type="video/mp4" />
          </video>
        )}
      </div>

      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(16,6,36,0.9),rgba(45,12,78,0.64) 48%,rgba(120,60,180,0.4) 78%,rgba(45,12,78,0.26) 100%)]" />
      <div className="pointer-events-none absolute inset-0 backdrop-blur-[1.25px]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[18vh] bg-[linear-gradient(180deg,rgba(16,6,36,0)_0%,rgba(24,8,52,0.7)_55%,rgba(36,10,68,0.95)_100%)]" />

      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="absolute left-0 right-0 top-[clamp(1.25rem,3vw,2.5rem)] z-20 flex items-center justify-between px-[clamp(1.5rem,6vw,4.5rem)] font-mono text-[0.7rem] uppercase tracking-[0.48em] text-white/65"
      >
        <span>Launch Deck&nbsp;No.005</span>
        <span>2025 Edition</span>
      </motion.div>

      <div className="relative z-10 mx-auto flex w-full max-w-[1700px] flex-1 flex-col justify-between gap-[clamp(2rem,5vw,3.5rem)] px-5 pb-[clamp(2.5rem,6vw,4rem)] pt-[clamp(6.5rem,9vw,7.5rem)] sm:px-8 lg:px-12 xl:px-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.1 }}
          className="flex flex-col items-center gap-[clamp(1.5rem,4vw,2.6rem)] text-center"
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
            <div className="flex items-center gap-3 rounded-full border border-white/25 bg-white/8 px-4 py-2 text-xs uppercase tracking-[0.35em] text-white/80 shadow-[0_14px_46px_rgba(16,7,36,0.4)]">
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

        <div className="mt-auto grid w-full gap-[clamp(1.2rem,2.6vw,2.4rem)] text-left text-white lg:grid-cols-[minmax(0,400px)_minmax(0,1fr)_minmax(0,400px)]">
          <motion.aside
            initial={{ opacity: 0, x: -26 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: "easeOut", delay: 0.25 }}
            className="flex flex-col gap-8"
          >
            <div>
              <p className="font-mono text-[0.7rem] uppercase tracking-[0.42em] text-white/55">Orbital Viewport</p>
              <p className="mt-2 font-mono text-sm uppercase tracking-[0.6em] text-white">OC-01</p>
            </div>

            <div className="space-y-6 border-l border-white/15 pl-6">
              {LEFT_COLUMN.map(({ label, value }) => (
                <div key={label}>
                  <p className="font-mono text-[0.7rem] uppercase tracking-[0.32em] text-white/50">{label}</p>
                  <p className="mt-2 text-[0.95rem] text-white/90">{value}</p>
                </div>
              ))}
            </div>

            <div className="space-y-3">
              <p className="font-mono text-[0.7rem] uppercase tracking-[0.32em] text-white/50">Intercepted Transmission</p>
              <p className="text-[0.95rem] text-white/80">
                “Orbit ships cinematic Supabase builds in literal weeks. Velocity without drag, polish without compromise.”
              </p>
            </div>
          </motion.aside>

          <div />

          <motion.aside
            initial={{ opacity: 0, x: 26 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: "easeOut", delay: 0.25 }}
            className="flex flex-col gap-7 text-left lg:text-right"
          >
            <div className="lg:ml-auto">
              <p className="font-mono text-[0.7rem] uppercase tracking-[0.42em] text-[rgba(255,145,0,0.75)]">Mission Protocol</p>
              <ol className="mt-4 space-y-4 font-mono text-[0.85rem] uppercase tracking-[0.32em] text-white/85">
                {MISSION_PROTOCOL.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </div>
            <div className="border-t border-white/15 pt-5 font-mono text-[0.7rem] uppercase tracking-[0.34em] text-white/55">
              Status: Accepting launch windows
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}
