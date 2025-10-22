"use client";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";

const marqueeHighlights = [
  {
    label: "Supabase Sprints",
    body: "Launch-ready Supabase experiences delivered in 10–21 day programs."
  },
  {
    label: "Automation Native",
    body: "VoltAgent, BullMQ, and Supabase jobs wired from day one of the build."
  },
  {
    label: "Design Systems",
    body: "Shadcn/Tailwind foundations with cinematic motion and responsive polish."
  },
  {
    label: "Founder Led",
    body: "Nick Brooks leads every engagement—no handoffs, no lost strategy context."
  },
  {
    label: "Launch Rituals",
    body: "Daily async Loom recaps, live working sessions, and transparent milestone tracking."
  }
];

function Marquee() {
  const prefersReducedMotion = usePrefersReducedMotion();

  const renderCard = ({ label, body }: (typeof marqueeHighlights)[number]) => (
    <article
      className={cn(
        "group orbit-text-card relative flex min-h-[180px] min-w-[320px] max-w-[360px] flex-col justify-between gap-4 p-7 text-left shadow-[0_18px_40px_hsl(var(--brand-void)_/_0.3)]",
        "ring-1 ring-inset ring-white/10"
      )}
    >
      <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.35em] text-accent/80">
        <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
        {label}
      </span>
      <p className="text-base font-semibold leading-relaxed text-white/90">
        {body}
      </p>
      <span className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <span className="absolute inset-0 bg-orbit-highlight" />
      </span>
    </article>
  );

  if (prefersReducedMotion) {
    return (
      <div className="relative left-1/2 w-screen max-w-none -translate-x-1/2 overflow-hidden py-6">
        <div className="flex flex-wrap justify-center gap-6 px-8">
          {marqueeHighlights.map((item) => (
            <div key={item.label}>{renderCard(item)}</div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="relative left-1/2 w-screen max-w-none -translate-x-1/2 overflow-hidden py-6">
      <div className="orbit-marquee-mask overflow-hidden">
        <div className="flex w-max animate-marquee items-stretch will-change-transform">
          {[0, 1].map((iteration) => (
            <div
              key={iteration}
              className={cn(
                "flex items-stretch gap-6",
                iteration === 0 ? "px-8" : "pr-8"
              )}
              aria-hidden={iteration === 1}
            >
              {marqueeHighlights.map((item) => (
                <div key={`${iteration}-${item.label}`}>{renderCard(item)}</div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function WhyChooseUsSection() {
  return (
    <section id="why-choose-us" className="section-shell relative py-24">
      <div className="container relative space-y-12">
        <header className="orbit-text-card mx-auto max-w-2xl space-y-5 px-6 py-8 text-center sm:px-10">
          <p className="text-sm font-semibold uppercase tracking-[0.4em] text-accent">Why Choose Us</p>
          <h2 className="display-subheading mt-4 text-3xl font-semibold text-foreground sm:text-4xl">
            <span className="inline-block text-gradient-soft">
              Orbit Collective is the sprint studio founders trust when speed still needs polish.
            </span>
          </h2>
          <p className="mt-5 text-base text-white/85 sm:text-lg">
            Hands-on leadership, automation-first build systems, and a Supabase-native stack keep every
            engagement orbiting momentum from kickoff to launch.
          </p>
        </header>
        <Marquee />
      </div>
    </section>
  );
}
