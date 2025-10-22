import Link from "next/link";

import { ContactCTA } from "@/components/silver-lining/sections/contact-cta";
import { MetricsGrid } from "@/components/silver-lining/shared/metrics-grid";
import { Reveal } from "@/components/motion/reveal";

const HERO_FEATURES = [
  "Eco-friendly cleaning",
  "Flexible scheduling",
  "48-hour follow-up",
  "Photo proof every visit",
  "Dedicated two-person teams",
  "Supervisor quality checks"
];

const HERO_STATS = [
  { label: "2.5K+ homes cleaned", detail: "Across 12 cities with recurring plans" },
  { label: "98% 5-star feedback", detail: "Measured via 350 post-service surveys" },
  { label: "35 cleaning pros", detail: "Trained, bonded, and background checked" }
];

const PARTNER_LOGOS = ["Thumbtack Elite", "Google Reviews", "Angi Pros", "Local Chamber", "Eco-Clean Certified"];

const HIGHLIGHT_CARDS = [
  {
    title: "Full-Suite Home Reset",
    description: "Deep cleaning for kitchens, baths, and high-touch surfaces in a single visit.",
    variant: "primary"
  },
  {
    title: "Recurring Care",
    description: "Weekly or bi-weekly shine plans with consistent teams."
  },
  {
    title: "Move-In / Move-Out",
    description: "Top-to-bottom checklist ensuring deposits are returned."
  },
  {
    title: "Commercial Suites",
    description: "After-hours cleaning for studios and boutique offices."
  }
];

const PERFORMANCE_POINTS = [
  "Personalised checklists for every room and request.",
  "Photo verification after each visit, stored for 60 days.",
  "Supervisor QA with follow-up call inside 24 hours."
];

const BLOG_POSTS = [
  {
    title: "How to prepare for your first Silver Lining clean",
    summary: "A 24-hour checklist to get the most out of your initial walkthrough.",
    category: "Home Prep",
    readTime: "6 min read"
  },
  {
    title: "Our eco-supply kit: every product we bring into your space",
    summary: "From hypoallergenic detergents to microfiber rotations, here is the full inventory.",
    category: "Products",
    readTime: "5 min read"
  },
  {
    title: "Commercial studios: sanitising schedules that keep teams healthy",
    summary: "How we customise after-hours cleaning for coworking and creative suites.",
    category: "Commercial",
    readTime: "7 min read"
  }
];

const METRICS = [
  { value: "2500+", label: "Homes detailed" },
  { value: "98%", label: "5-star feedback" },
  { value: "35", label: "Cleaning pros" },
  { value: "12", label: "Cities served" }
];

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <PartnerStrip />
      <ServiceHighlights />
      <PerformanceSnapshot />
      <SafetyBanner />
      <TeamSpotlight />
      <ImpactMetrics />
      <BlogPreview />
      <ContactCTA />
    </>
  );
}

function HeroSection() {
  return (
    <section className="section-shell relative overflow-hidden bg-white py-20 md:py-28">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-16 px-5 sm:px-8 lg:flex-row lg:items-start lg:gap-20 lg:px-10">
        <div className="flex-1 space-y-8">
          <Reveal className="sl-badge inline-flex">
            Sparkling Results
          </Reveal>
          <div className="flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-[0.35em] text-[rgba(28,28,28,0.55)]">
            <span className="rounded-full border border-black/10 bg-black/5 px-4 py-2 text-[rgba(28,28,28,0.75)]">Residential</span>
            <span className="rounded-full border border-black/10 bg-black/5 px-4 py-2 text-[rgba(28,28,28,0.75)]">Commercial</span>
          </div>
          <Reveal delay={0.05}>
            <h1 className="text-balance text-[clamp(2.8rem,5.55vw,4.8rem)] font-semibold leading-[1.05] text-[rgb(28,28,28)]">
              Refresh your <span className="italics">space</span> without lifting a finger.
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-xl text-base leading-relaxed text-[rgba(28,28,28,0.72)]">
              Silver Lining delivers concierge-level cleaning for homes, studios, and boutique offices. Our
              bonded specialists bring eco-certified supplies, tailor checklists to every room, and stay on-call
              for anything you need between visits.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/#contact"
                className="inline-flex items-center gap-3 rounded-full bg-[hsl(var(--primary))] px-6 py-3 text-xs font-semibold uppercase tracking-[0.32em] text-[hsl(var(--secondary))] shadow-soft transition hover:bg-[hsl(var(--primary)/0.85)]"
              >
                Book a walkthrough
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center gap-3 rounded-full border border-black/10 bg-black/5 px-5 py-3 text-xs font-semibold uppercase tracking-[0.32em] text-[rgba(28,28,28,0.75)] transition hover:border-black/20 hover:text-black"
              >
                View services
              </Link>
            </div>
          </Reveal>
          <Reveal delay={0.25}>
            <div className="grid gap-5 sm:grid-cols-2">
              {HERO_STATS.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-3xl border border-black/5 bg-white p-5 shadow-[0_18px_40px_rgba(12,12,16,0.08)]"
                >
                  <p className="text-lg font-semibold text-[rgb(28,28,28)]">{stat.label}</p>
                  <p className="mt-2 text-sm text-[rgba(28,28,28,0.65)]">{stat.detail}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
        <Reveal delay={0.2} direction="right" className="relative flex-1">
          <div className="relative h-[520px] w-full overflow-hidden rounded-[3rem] border border-black/5 bg-[radial-gradient(circle_at_20%_20%,rgba(219,236,98,0.18),transparent_65%),linear-gradient(160deg,rgba(245,245,247,1)0%,rgba(235,235,238,1)60%,rgba(220,220,224,0.9)100%)] shadow-[0_28px_60px_rgba(12,12,16,0.16)]">
            <div className="absolute inset-x-8 bottom-8 rounded-[2rem] border border-black/5 bg-white/85 p-5 backdrop-blur-md">
              <p className="text-sm font-medium text-[rgb(28,28,28)]">“They transformed our loft in three hours. The photos afterwards are a lifesaver.”</p>
              <p className="mt-3 text-xs uppercase tracking-[0.3em] text-[rgba(28,28,28,0.55)]">Client since 2020 · weekly care</p>
            </div>
            <div className="absolute left-6 top-6 inline-flex items-center gap-3 rounded-full border border-black/10 bg-white/90 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-[rgba(28,28,28,0.7)] shadow-[0_12px_30px_rgba(12,12,16,0.12)]">
              Since 2012
            </div>
          </div>
        </Reveal>
      </div>
      <div className="mx-auto mt-16 max-w-7xl px-5 sm:px-8 lg:px-10">
        <Reveal delay={0.3}>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {HERO_FEATURES.map((feature) => (
              <div
                key={feature}
                className="rounded-2xl border border-black/5 bg-white px-5 py-4 text-sm font-medium text-[rgba(28,28,28,0.75)] shadow-[0_14px_28px_rgba(12,12,16,0.08)]"
              >
                {feature}
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function PartnerStrip() {
  return (
    <section className="section-shell py-14">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-center gap-6 px-5 text-xs uppercase tracking-[0.35em] text-[rgba(28,28,28,0.45)] sm:px-8 lg:px-10">
        {PARTNER_LOGOS.map((logo) => (
          <span
            key={logo}
            className="flex h-14 min-w-[160px] items-center justify-center rounded-2xl border border-black/5 bg-white px-4 text-center shadow-[0_12px_26px_rgba(12,12,16,0.08)]"
          >
            {logo}
          </span>
        ))}
      </div>
    </section>
  );
}

function ServiceHighlights() {
  return (
    <section className="section-shell bg-white py-24">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:items-start lg:px-10">
        <Reveal className="rounded-[3rem] border border-black/8 bg-black text-white shadow-[0_28px_70px_rgba(12,12,16,0.18)]">
          <div className="space-y-6 px-8 py-10 sm:px-10 sm:py-12">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/70">
              Signature package
            </p>
            <h2 className="text-3xl font-semibold leading-tight sm:text-4xl">
              Full-Suite Home Reset
            </h2>
            <p className="text-sm leading-relaxed text-white/80">
              Designed for seasonal refreshes or pre-guest prep. Our crew handles appliances,
              baseboards, vents, grout, mirrors, and upholstered pieces in one orchestrated visit.
            </p>
            <ul className="space-y-3 text-sm text-white/75">
              <li>• Custom room-by-room checklist designed during walkthrough</li>
              <li>• HEPA-filter vacuums + steam sanitation for high-touch surfaces</li>
              <li>• Laundry reset: linens laundered, folded, and beds refreshed</li>
            </ul>
            <Link
              href="/services#packages"
              className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.32em] text-[hsl(var(--primary))]"
            >
              Explore full package →
            </Link>
          </div>
        </Reveal>
        <div className="grid gap-6">
          {HIGHLIGHT_CARDS.slice(1).map((card) => (
            <Reveal
              key={card.title}
              delay={card.title === "Move-In / Move-Out" ? 0.1 : 0}
              className="rounded-[2.5rem] border border-black/6 bg-white px-7 py-8 shadow-[0_20px_48px_rgba(12,12,16,0.1)]"
            >
              <h3 className="text-2xl font-semibold text-[rgb(28,28,28)]">{card.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[rgba(28,28,28,0.68)]">
                {card.description}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function PerformanceSnapshot() {
  return (
    <section className="section-shell bg-white py-24">
      <div className="mx-auto grid max-w-7xl gap-10 rounded-[3rem] border border-black/5 bg-[linear-gradient(150deg,rgba(28,28,28,0.96)0%,rgba(28,28,28,0.92)45%,rgba(28,28,28,0.88)100%)] px-6 py-12 text-white shadow-[0_32px_80px_rgba(12,12,16,0.18)] sm:px-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:items-center lg:px-14">
        <Reveal>
          <div className="space-y-6">
            <p className="text-xs uppercase tracking-[0.35em] text-white/70">
              Client Satisfaction
            </p>
            <h2 className="text-5xl font-semibold text-gradient-clean">98%</h2>
            <p className="text-sm text-white/75">
              Based on 350 post-service surveys from recurring clients. We keep every response and refine our
              checklists weekly.
            </p>
          </div>
        </Reveal>
        <Reveal delay={0.1} className="space-y-5 rounded-[2.5rem] border border-white/10 bg-white/6 p-6 backdrop-blur">
          <h3 className="text-2xl font-semibold text-white">What makes the difference?</h3>
          <ul className="space-y-3 text-sm text-white/80">
            {PERFORMANCE_POINTS.map((point) => (
              <li key={point} className="flex gap-3">
                <span className="mt-[0.35rem] inline-block h-2 w-2 rounded-full bg-[hsl(var(--primary))]" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

function SafetyBanner() {
  return (
    <section className="section-shell bg-black py-20 text-white">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 sm:px-8 md:grid-cols-2 md:items-center lg:px-10">
        <Reveal>
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/65">Safe Products</p>
            <h2 className="text-3xl font-semibold leading-tight sm:text-4xl">
              EPA-approved, kid &amp; pet-safe solutions every single visit.
            </h2>
            <p className="text-sm text-white/75">
              We stock allergen-free concentrates, microfiber rotations, and colour-coded tools to prevent cross-contamination.
              Every supply is logged and refreshed weekly.
            </p>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="space-y-4 rounded-[2.5rem] border border-white/10 bg-white/5 p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/65">Fast response</p>
            <h3 className="text-2xl font-semibold text-white">
              Reply within one business hour for rescheduling, add-ons, or post-clean support.
            </h3>
            <p className="text-sm text-white/75">
              Need us back for a quick touch-up? Happiness guarantee covers it within 48 hours.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function TeamSpotlight() {
  return (
    <section className="section-shell bg-white py-24">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 md:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] md:items-center lg:px-10">
        <Reveal className="space-y-6">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[rgba(28,28,28,0.6)]">
            Meet the crew
          </p>
          <h2 className="text-3xl font-semibold leading-tight text-[rgb(28,28,28)] sm:text-4xl">
            Our specialists, trained &amp; <span className="italics">trusted.</span>
          </h2>
          <p className="text-sm leading-relaxed text-[rgba(28,28,28,0.68)]">
            Every cleaner on the Silver Lining roster completes 120 hours of onboarding: surface science, hospitality service,
            eco-supply handling, and discretion coaching. Supervisors shadow new team members for their first ten visits.
          </p>
          <Link
            href="/about#team"
            className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.32em] text-[hsl(var(--primary))]"
          >
            Meet the team →
          </Link>
        </Reveal>
        <Reveal delay={0.1} direction="right">
          <div className="relative h-[420px] w-full overflow-hidden rounded-[3rem] border border-black/6 bg-[linear-gradient(135deg,rgba(255,255,255,0.95)0%,rgba(231,231,233,1)100%)] shadow-[0_24px_60px_rgba(12,12,16,0.14)]">
            <div className="absolute bottom-6 left-6 right-6 rounded-3xl border border-black/6 bg-white/85 p-5 backdrop-blur">
              <p className="text-sm font-medium text-[rgb(28,28,28)]">“Our dedicated team works in pairs, so you see the same faces each visit.”</p>
              <p className="mt-2 text-xs uppercase tracking-[0.3em] text-[rgba(28,28,28,0.55)]">Elena Vargas · Founder</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ImpactMetrics() {
  return (
    <section className="section-shell bg-white py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <Reveal className="mb-10 space-y-4 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[rgba(28,28,28,0.55)]">
            Impact Metrics
          </p>
          <h2 className="text-3xl font-semibold text-[rgb(28,28,28)] sm:text-4xl">
            Proof in every polish.
          </h2>
        </Reveal>
        <MetricsGrid items={METRICS} />
      </div>
    </section>
  );
}

function BlogPreview() {
  return (
    <section id="blog" className="section-shell bg-black py-24 text-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-5 sm:px-8 lg:px-10">
        <div className="space-y-4">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/65">
              Fresh Tips
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="text-3xl font-semibold sm:text-4xl">
              Insights to keep your space sparkling.
            </h2>
          </Reveal>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {BLOG_POSTS.map((post, index) => (
            <Reveal
              key={post.title}
              delay={0.08 * index}
              className="flex h-full flex-col justify-between rounded-[2rem] border border-white/10 bg-white/5 p-6"
            >
              <div className="space-y-4">
                <span className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[0.7rem] uppercase tracking-[0.35em] text-white/70">
                  {post.category}
                </span>
                <h3 className="text-xl font-semibold text-white">{post.title}</h3>
                <p className="text-sm text-white/75">{post.summary}</p>
              </div>
              <div className="mt-6 flex items-center justify-between text-xs uppercase tracking-[0.3em] text-white/60">
                <span>{post.readTime}</span>
                <Link href="/blog" className="text-[hsl(var(--primary))]">
                  Read →
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
