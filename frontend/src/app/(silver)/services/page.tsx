import Link from "next/link";

import { ContactCTA } from "@/components/silver-lining/sections/contact-cta";
import { MetricsGrid } from "@/components/silver-lining/shared/metrics-grid";
import { Reveal } from "@/components/motion/reveal";

const PILLARS = [
  {
    title: "Routine Care",
    description: "Weekly or bi-weekly light maintenance tuned to your lifestyle."
  },
  {
    title: "Deep Refresh",
    description: "Floor-to-ceiling attention for seasonal resets or post-renovation."
  },
  {
    title: "Move Logistics",
    description: "Pre and post tenancy turnover cleaning to secure deposits."
  },
  {
    title: "Commercial Suites",
    description: "After-hours sanitisation for studios, offices, and showrooms."
  }
];

const PACKAGE_FEATURES = [
  "Dedicated two-person crew for every visit",
  "Entry and exit checklist with photo proof",
  "Laundry + linen reset add-on",
  "Always-on chat for schedule adjustments"
];

const SPECIALTY_SERVICES = [
  {
    title: "One-Time Deep Clean",
    points: ["High-touch sanitisation", "Appliance detailing", "Tile & grout focus"]
  },
  {
    title: "Airbnb Turnover",
    points: ["Staging reset", "Amenity restock", "Linen service"]
  },
  {
    title: "Post-Construction",
    points: ["HEPA dust removal", "Window polishing", "Debris disposal coordination"]
  },
  {
    title: "Add-on Services",
    points: ["Oven + fridge detail", "Carpet extraction", "Plant care"]
  }
];

const PROCESS_STEPS = [
  {
    title: "Assessment",
    description: "Walkthrough + custom checklist building.",
    detail: "We map your goals, preferred products, and areas of focus during a 30-minute consult."
  },
  {
    title: "Eco Prep",
    description: "We arrive with allergen-free, child-safe products.",
    detail: "Hypoallergenic concentrates, reusable microfiber rotations, and labelled caddies for every room."
  },
  {
    title: "Execution",
    description: "Two-person teams with supervisor QA.",
    detail: "Dedicated pros work the plan while supervisors handle quality checks and special requests."
  },
  {
    title: "Follow-up",
    description: "Photo proof + 48-hour happiness guarantee.",
    detail: "Receive documented completion, notes, and optional touch-ups within two days."
  }
];

const SERVICE_METRICS = [
  { value: "500", label: "Recurring clients" },
  { value: "24h", label: "Scheduling window" },
  { value: "4.9/5", label: "Average rating" },
  { value: "100%", label: "Eco-certified supplies" }
];

export default function ServicesPage() {
  return (
    <>
      <HeroSection />
      <StickyShowcase />
      <ServicePillars />
      <PackageComparison />
      <ServiceMetrics />
      <ContactCTA />
    </>
  );
}

function HeroSection() {
  return (
    <section className="section-shell bg-white py-24">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 px-5 text-center sm:px-8">
        <Reveal className="sl-badge inline-flex">
          Silver Lining
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="text-[clamp(3rem,5.55vw,4.5rem)] font-semibold uppercase tracking-[0.28em] text-[rgb(28,28,28)]">
            Services
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="max-w-2xl text-base leading-relaxed text-[rgba(28,28,28,0.7)]">
            From weekly touch-ups to move-out deep cleans, we tailor every visit. Explore the packages that
            keep homes, studios, and commercial suites spotless with concierge-level care.
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <Link
            href="#packages"
            className="inline-flex items-center gap-3 rounded-full bg-[hsl(var(--primary))] px-6 py-3 text-xs font-semibold uppercase tracking-[0.32em] text-[hsl(var(--secondary))] shadow-soft transition hover:bg-[hsl(var(--primary)/0.85)]"
          >
            View packages
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

function StickyShowcase() {
  return (
    <section id="process" className="section-shell bg-white py-24">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 sm:px-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:items-start lg:px-10">
        <div className="grid grid-cols-2 gap-4 lg:sticky lg:top-32 lg:h-[640px]">
          <div className="col-span-2 aspect-[4/3] rounded-[2.5rem] border border-black/6 bg-[linear-gradient(140deg,rgba(255,255,255,0.95)0%,rgba(231,231,233,1)100%)] shadow-[0_22px_50px_rgba(12,12,16,0.12)]" />
          <div className="aspect-[3/4] rounded-[2.5rem] border border-black/6 bg-[linear-gradient(160deg,rgba(219,236,98,0.28)0%,rgba(231,231,233,0.9)70%)] shadow-[0_22px_50px_rgba(12,12,16,0.1)]" />
          <div className="aspect-[3/4] rounded-[2.5rem] border border-black/6 bg-[linear-gradient(140deg,rgba(28,28,28,0.92)0%,rgba(28,28,28,0.86)100%)] shadow-[0_26px_60px_rgba(12,12,16,0.18)]" />
        </div>
        <div className="space-y-10">
          {PROCESS_STEPS.map((step, index) => (
            <Reveal key={step.title} delay={0.08 * index}>
              <div className="space-y-3 rounded-[2.5rem] border border-black/5 bg-white px-6 py-7 shadow-[0_18px_45px_rgba(12,12,16,0.1)] sm:px-8">
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[rgba(28,28,28,0.55)]">
                  {step.title}
                </p>
                <h3 className="text-2xl font-semibold text-[rgb(28,28,28)]">{step.description}</h3>
                <p className="text-sm leading-relaxed text-[rgba(28,28,28,0.68)]">{step.detail}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServicePillars() {
  return (
    <section className="section-shell bg-black py-24 text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 sm:px-8 md:grid-cols-2 lg:grid-cols-4 lg:px-10">
        {PILLARS.map((pillar, index) => (
          <Reveal key={pillar.title} delay={0.08 * index} className="rounded-[2.5rem] border border-white/10 bg-white/5 p-6">
            <h3 className="text-xl font-semibold text-white">{pillar.title}</h3>
            <p className="mt-4 text-sm leading-relaxed text-white/75">{pillar.description}</p>
            <Link
              href="/#contact"
              className="mt-6 inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-[hsl(var(--primary))]"
            >
              Download detailed checklist →
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function PackageComparison() {
  return (
    <section id="packages" className="section-shell bg-white py-24">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 sm:px-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:px-10">
        <Reveal className="rounded-[3rem] border border-black/6 bg-black text-white shadow-[0_26px_60px_rgba(12,12,16,0.18)]">
          <div className="space-y-6 px-8 py-10 sm:px-10 sm:py-12">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/70">
              Signature Routine Plan
            </p>
            <h2 className="text-3xl font-semibold sm:text-4xl">
              Concierge-level weekly or bi-weekly care.
            </h2>
            <p className="text-sm leading-relaxed text-white/75">
              Perfect for homes that never miss a beat. We rotate deep-tasks each visit, document every pass,
              and keep supplies labelled and ready for future crews.
            </p>
            <ul className="space-y-3 text-sm text-white/80">
              {PACKAGE_FEATURES.map((feature) => (
                <li key={feature}>• {feature}</li>
              ))}
            </ul>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.32em] text-[hsl(var(--primary))]"
            >
              Request quote →
            </Link>
          </div>
        </Reveal>
        <div className="grid gap-6">
          {SPECIALTY_SERVICES.map((service, index) => (
            <Reveal
              key={service.title}
              delay={0.05 * index}
              className="h-full rounded-[2.5rem] border border-black/6 bg-white px-7 py-8 shadow-[0_20px_48px_rgba(12,12,16,0.1)]"
            >
              <h3 className="text-xl font-semibold text-[rgb(28,28,28)]">{service.title}</h3>
              <ul className="mt-4 space-y-2 text-sm text-[rgba(28,28,28,0.68)]">
                {service.points.map((point) => (
                  <li key={point}>• {point}</li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceMetrics() {
  return (
    <section className="section-shell bg-white py-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-10">
        <Reveal className="mb-10 space-y-4 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[rgba(28,28,28,0.55)]">
            Service Metrics
          </p>
          <h2 className="text-3xl font-semibold text-[rgb(28,28,28)] sm:text-4xl">
            Reliability measured visit after visit.
          </h2>
        </Reveal>
        <MetricsGrid items={SERVICE_METRICS} />
      </div>
    </section>
  );
}
