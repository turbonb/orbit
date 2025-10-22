"use client";

import { CalendarRange, Figma, MonitorSmartphone, Sparkles } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";

const phases = [
  {
    title: "Discovery & Alignment",
    duration: "Days 1–2",
    icon: Sparkles,
    bullets: [
      "Immersion workshop mapping brand thesis, revenue goals, and constraints",
      "Analytics + funnel review to uncover momentum levers",
      "Shared Notion/Linear hub with scope, assets, and decision log"
    ]
  },
  {
    title: "Design Sprints",
    duration: "Days 3–6",
    icon: Figma,
    bullets: [
      "High-fidelity Figma explorations paired with narrative copy kits",
      "Design tokens and component library prepped for build handoff",
      "Async Loom reviews and live working sessions for rapid convergence"
    ]
  },
  {
    title: "Build & Polish",
    duration: "Days 7–12",
    icon: MonitorSmartphone,
    bullets: [
      "Next.js + Supabase implementation with typed contracts and API surface",
      "Motion choreography, accessibility sweep, and performance hardening",
      "Playwright smoke suite plus infrastructure readiness checklist"
    ]
  },
  {
    title: "Launch & Amplify",
    duration: "Days 13–14",
    icon: CalendarRange,
    bullets: [
      "Deployment rituals, environment and secrets hardening",
      "Supabase monitoring, analytics instrumentation, and web vitals validation",
      "Launch communications toolkit with social teasers + press-ready assets"
    ]
  }
];

export function ProcessSection() {
  return (
    <section id="process" className="section-shell relative overflow-hidden py-24">
      <div className="container relative grid gap-14">
        <Reveal
          as="header"
          className="orbit-text-card mx-auto max-w-2xl space-y-5 px-6 py-8 text-center sm:px-10"
        >
          <p className="text-sm font-semibold uppercase tracking-wide text-accent">Process</p>
          <h2 className="display-subheading mt-4 text-balance text-3xl font-semibold text-foreground sm:text-4xl">
            <span className="inline-block text-gradient-soft">
              A launch playbook engineered for pace without the drop in polish.
            </span>
          </h2>
          <p className="mt-5 text-base text-white/85 sm:text-lg">
            Orbit threads strategy, design, and engineering into one orchestrated sprint so the
            product never leaves orbit. Tight feedback loops and automation keep decisions and
            delivery moving in lockstep.
          </p>
        </Reveal>
        <ol className="grid gap-6 lg:grid-cols-2">
          {phases.map(({ title, duration, icon: Icon, bullets }, index) => (
            <Reveal
              key={title}
              as="li"
              delay={0.05 * index}
              className="orbit-text-card relative p-8"
            >
              <div className="flex items-start justify-between gap-6 sm:items-center">
                <div className="flex items-center gap-4">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-primary/30 text-accent">
                    <Icon className="h-6 w-6" />
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold">{title}</h3>
                    <p className="text-sm font-semibold uppercase tracking-wide text-white/70">
                      {duration}
                    </p>
                  </div>
                </div>
              </div>
              <ul className="mt-6 space-y-3 text-sm text-white/85">
                {bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-3 leading-relaxed">
                    <span className="mt-2 h-1 w-5 rounded-full bg-white/70" aria-hidden />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
