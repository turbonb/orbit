"use client";

import { Code2, Palette, Rocket } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const services = [
  {
    title: "Launch Sprint",
    icon: Rocket,
    summary: "Signature 3–4 week engagement for cinematic marketing surfaces with Supabase-backed funnels.",
    details: [
      "Narrative architecture with voice-aligned Figma explorations",
      "Responsive Next.js build with motion choreography and polish",
      "Supabase schema, lead capture, and automation hook setup"
    ]
  },
  {
    title: "Rapid MVP",
    icon: Code2,
    summary: "4–6 week validation-ready product build pairing shadcn UI with Supabase services.",
    details: [
      "Product mapping, data modeling, and componentized design system",
      "Auth, database, storage, and RLS wiring with typed API surface",
      "Playwright smoke suite, deployment rehearsal, and handoff docs"
    ]
  },
  {
    title: "Experience Revamp",
    icon: Palette,
    summary: "2–3 week overhaul that elevates existing flows with motion, accessibility, and performance tuning.",
    details: [
      "Heuristic + analytics audit translating friction into a prioritized roadmap",
      "Refined component library with motion and brand alignment baked in",
      "Performance hardening, accessibility sweep, and regression coverage"
    ]
  }
];

export function ServicesSection() {
  return (
    <section id="services" className="section-shell relative py-24">
      <div className="container relative grid gap-16">
        <Reveal
          as="header"
          className="mx-auto max-w-3xl text-center"
        >
          <p className="text-sm font-semibold uppercase tracking-wide text-accent">Services</p>
          <h2 className="display-subheading mt-4 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            <span className="inline-block text-gradient-soft">
              Packages that flex with your stage—but never your standards.
            </span>
          </h2>
          <p className="mt-6 text-base text-muted-foreground sm:text-lg">
            Every Orbit engagement is run by a single accountable lead, calibrated for the tempo of
            your team. Opinionated defaults, transparent milestones, and automation-first tooling
            keep momentum compounding from kickoff to launch.
          </p>
        </Reveal>
        <div className="grid gap-6 md:grid-cols-3">
          {services.map(({ title, icon: Icon, summary, details }, index) => (
            <Reveal key={title} delay={0.05 * index} className="h-full">
              <Card className="flex h-full flex-col justify-between border border-primary/20 bg-card/80 shadow-orbit-lg">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/30 text-accent">
                      <Icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="inline-block text-gradient-brand">{title}</CardTitle>
                  </div>
                  <CardDescription>{summary}</CardDescription>
                </CardHeader>
                <CardContent className="pt-4">
                  <ul className="space-y-3 text-sm text-muted-foreground">
                    {details.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
