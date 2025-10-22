import Link from "next/link";

import { ContactCTA } from "@/components/silver-lining/sections/contact-cta";
import { MetricsGrid } from "@/components/silver-lining/shared/metrics-grid";
import { Reveal } from "@/components/motion/reveal";

const JOURNEY_STEPS = [
  {
    year: "2012",
    title: "First clients & personalised checklists.",
    detail: "Silver Lining launched with a two-person crew and handcrafted routines for loft apartments."
  },
  {
    year: "2015",
    title: "Introduced eco-friendly supply standards.",
    detail: "We replaced every harsh chemical with hypoallergenic concentrates and began recycling microfiber rotations."
  },
  {
    year: "2018",
    title: "Expanded into commercial studios & coworking.",
    detail: "Our teams now service boutique offices and creative suites after-hours with the same hospitality-first playbook."
  },
  {
    year: "2023",
    title: "Launched satisfaction guarantee + photo follow-up.",
    detail: "Every visit now includes photographic proof, a 48-hour touch-up window, and text-based status updates."
  }
];

const VALUES = [
  {
    title: "Reliability",
    description: "Consistent teams and checklists tailored to each client."
  },
  {
    title: "Safety",
    description: "EPA-approved, child & pet-safe products only."
  },
  {
    title: "Transparency",
    description: "Photo proof, text updates, and post-visit feedback."
  },
  {
    title: "Community",
    description: "Partnering with local shelters for donation pickups."
  }
];

const LEADERSHIP = [
  {
    name: "Elena Vargas",
    role: "Founder & Chief Cleanliness Officer",
    bio: "Certified House Cleaning Technician with a decade in luxury hospitality. Elena shapes every checklist and training module.",
    stat: "Certified HCT · IWCA Member"
  },
  {
    name: "Marcus Bell",
    role: "Operations Lead",
    bio: "Logistics specialist overseeing scheduling, training, and quality assurance across 12 cities.",
    stat: "Leads 35 specialists · 4.9/5 client rating"
  }
];

const IMPACT_METRICS = [
  { value: "4.9/5", label: "Average review score", hint: "Across 1,200 appointments" },
  { value: "1 hr", label: "Average response time", hint: "During business hours" },
  { value: "48h", label: "Happiness guarantee", hint: "Complimentary touch-ups" },
  { value: "12", label: "Communities served", hint: "Residential & commercial" }
];

export default function AboutPage() {
  return (
    <>
      <HeroSection />
      <JourneyShowcase />
      <ImpactBanner />
      <ValuesGrid />
      <LeadershipSection />
      <ContactCTA />
    </>
  );
}

function HeroSection() {
  return (
    <section className="section-shell bg-white py-24">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 px-5 text-center sm:px-8">
        <Reveal className="sl-badge inline-flex">
          Silver Lining Cleaning
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="text-[clamp(3rem,5.55vw,4.5rem)] font-semibold uppercase tracking-[0.28em] text-[rgb(28,28,28)]">
            Our Story
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="max-w-2xl text-base leading-relaxed text-[rgba(28,28,28,0.7)]">
            Started as a two-person crew in 2012, Silver Lining now serves homes, studios, and commercial suites
            across the metro area. We deliver meticulous results with transparency, eco-conscious supplies, and
            concierge-level hospitality.
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <Link
            href="#journey"
            className="inline-flex items-center gap-3 rounded-full bg-[hsl(var(--primary))] px-6 py-3 text-xs font-semibold uppercase tracking-[0.32em] text-[hsl(var(--secondary))] shadow-soft transition hover:bg-[hsl(var(--primary)/0.85)]"
          >
            Meet our journey
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

function JourneyShowcase() {
  return (
    <section id="journey" className="section-shell bg-white py-24">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 sm:px-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:items-start lg:px-10">
        <div className="grid grid-cols-2 gap-4 lg:sticky lg:top-32 lg:h-[640px]">
          <div className="col-span-2 aspect-[4/3] rounded-[2.5rem] border border-black/6 bg-[linear-gradient(160deg,rgba(255,255,255,0.96)0%,rgba(231,231,233,1)60%,rgba(219,236,98,0.25)100%)] shadow-[0_24px_60px_rgba(12,12,16,0.12)]" />
          <div className="aspect-[3/4] rounded-[2.5rem] border border-black/6 bg-[linear-gradient(160deg,rgba(28,28,28,0.92)0%,rgba(28,28,28,0.86)100%)] shadow-[0_26px_60px_rgba(12,12,16,0.18)]" />
          <div className="aspect-[3/4] rounded-[2.5rem] border border-black/6 bg-[linear-gradient(160deg,rgba(255,255,255,0.95)0%,rgba(231,231,233,1)70%)] shadow-[0_22px_50px_rgba(12,12,16,0.12)]" />
        </div>
        <div className="space-y-10">
          {JOURNEY_STEPS.map((step, index) => (
            <Reveal key={step.year} delay={0.08 * index}>
              <div className="space-y-2 rounded-[2.5rem] border border-black/5 bg-white px-6 py-7 shadow-[0_18px_45px_rgba(12,12,16,0.1)] sm:px-8">
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[rgba(28,28,28,0.55)]">{step.year}</p>
                <h3 className="text-2xl font-semibold text-[rgb(28,28,28)]">{step.title}</h3>
                <p className="text-sm leading-relaxed text-[rgba(28,28,28,0.68)]">{step.detail}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ImpactBanner() {
  return (
    <section className="section-shell bg-white py-20">
      <div className="mx-auto max-w-6xl rounded-[3rem] border border-black/6 bg-black px-8 py-12 text-white shadow-[0_32px_72px_rgba(12,12,16,0.18)] sm:px-12 md:flex md:items-center md:justify-between">
        <Reveal>
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/65">Impact Metric</p>
            <h2 className="text-6xl font-semibold text-gradient-clean">4.9<sup>/5</sup></h2>
            <p className="text-sm text-white/75">Average review score across 1,200 appointments.</p>
          </div>
        </Reveal>
        <Reveal delay={0.1} className="mt-8 flex flex-col gap-3 text-sm text-white/75 md:mt-0 md:text-right">
          <span>Response time — Less than 1 business hour</span>
          <span>Happiness guarantee — 48 hour touch-up window</span>
        </Reveal>
      </div>
    </section>
  );
}

function ValuesGrid() {
  return (
    <section className="section-shell bg-black py-24 text-white">
      <div className="mx-auto max-w-6xl space-y-8 px-5 sm:px-8 lg:px-10">
        <Reveal>
          <h2 className="text-3xl font-semibold sm:text-4xl">Values that guide every visit.</h2>
        </Reveal>
        <div className="grid gap-6 md:grid-cols-2">
          {VALUES.map((value, index) => (
            <Reveal
              key={value.title}
              delay={0.08 * index}
              className="rounded-[2.5rem] border border-white/12 bg-white/6 p-6"
            >
              <h3 className="text-xl font-semibold text-white">{value.title}</h3>
              <p className="mt-3 text-sm text-white/75">{value.description}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function LeadershipSection() {
  return (
    <section id="team" className="section-shell bg-white py-24">
      <div className="mx-auto max-w-6xl space-y-12 px-5 sm:px-8 lg:px-10">
        <Reveal className="space-y-3 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[rgba(28,28,28,0.55)]">Leadership</p>
          <h2 className="text-3xl font-semibold text-[rgb(28,28,28)] sm:text-4xl">
            People powering the polish.
          </h2>
        </Reveal>
        <div className="grid gap-8 md:grid-cols-2">
          {LEADERSHIP.map((leader, index) => (
            <Reveal
              key={leader.name}
              delay={0.1 * index}
              className="flex h-full flex-col justify-between rounded-[3rem] border border-black/6 bg-white px-7 py-8 shadow-[0_20px_48px_rgba(12,12,16,0.12)]"
            >
              <div className="space-y-4">
                <div className="h-48 w-full rounded-[2rem] border border-black/6 bg-[linear-gradient(140deg,rgba(231,231,233,1)0%,rgba(219,236,98,0.22)80%)] shadow-[0_16px_40px_rgba(12,12,16,0.1)]" />
                <div>
                  <h3 className="text-2xl font-semibold text-[rgb(28,28,28)]">{leader.name}</h3>
                  <p className="text-sm uppercase tracking-[0.3em] text-[rgba(28,28,28,0.55)]">{leader.role}</p>
                </div>
                <p className="text-sm leading-relaxed text-[rgba(28,28,28,0.7)]">{leader.bio}</p>
              </div>
              <div className="mt-6 text-xs uppercase tracking-[0.32em] text-[rgba(28,28,28,0.55)]">
                {leader.stat}
              </div>
            </Reveal>
          ))}
        </div>
        <MetricsGrid items={IMPACT_METRICS} />
      </div>
    </section>
  );
}
