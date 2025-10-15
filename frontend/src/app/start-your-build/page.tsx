import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { StartBuildForm } from "@/components/forms/start-build-form";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Start Your Build | Orbit Collective",
  description:
    "Share your goals, timeline, and requirements to kick off an Orbit build sprint. We’ll respond inside 24 hours with a tailored plan."
};

const supportItems = [
  {
    title: "Email",
    value: "nick@orbit.build",
    href: "mailto:nick@orbit.build"
  },
  {
    title: "Direct line",
    value: "+1 (424) 835-7356",
    href: "tel:+14248357356"
  },
  {
    title: "Office hours",
    value: "Weekly founder calls, Thursdays @ 11am PT",
    href: "https://cal.com/nickbrooks/orbit-intro"
  }
];

export default function StartYourBuildPage() {
  return (
    <main className="relative min-h-screen overflow-hidden pb-24 pt-24 sm:pt-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(100%_90%_at_15%_10%,rgba(93,28,170,0.65),transparent_60%),radial-gradient(95%_75%_at_82%_20%,rgba(255,145,0,0.35),transparent_70%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(160deg,rgba(12,8,28,0.65),transparent_60%)]" />
      <div className="absolute left-0 top-0 z-20 flex w-full justify-start px-[clamp(1rem,5vw,3rem)] pt-11">
        <Button
          asChild
          variant="outline"
          size="sm"
          className="rounded-full border-white/25 bg-white/8 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-white/75 shadow-[0_12px_40px_rgba(20,9,40,0.35)] transition hover:border-white/35 hover:bg-white/12 hover:text-white"
        >
          <Link href="/">← Back to Orbit</Link>
        </Button>
      </div>
      <figure className="pointer-events-none absolute -left-48 -top-6 hidden h-[620px] w-[620px] overflow-hidden rounded-full border-0 bg-white/3 shadow-[0_60px_180px_rgba(59,16,110,0.35)] mix-blend-screen sm:block lg:-left-40">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_30%,rgba(255,200,128,0.28),transparent_65%),radial-gradient(circle_at_75%_80%,rgba(93,28,170,0.32),transparent_78%)] blur-[3px] opacity-60" />
        <Image
          src="/brand/planet_image.jpg"
          alt="Nebula planet"
          fill
          className="object-cover opacity-60"
          sizes="(max-width: 1200px) 420px, 620px"
          priority
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_55%_40%,rgba(255,255,255,0.14),transparent_75%)] mix-blend-screen opacity-55" />
      </figure>
      <div className="container relative z-10 space-y-12">
        <div className="grid gap-16 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:items-center xl:gap-24">
          <section className="space-y-10 text-white/85">
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.4em] text-white/70">
              Start Your Build
            </span>
            <h1 className="text-balance text-4xl font-semibold text-white sm:text-5xl lg:text-6xl">
              Shape the launch you need— Orbit ships it at sprint speed.
            </h1>
            <p className="max-w-2xl text-base text-white/70 sm:text-lg">
              Answer a few questions so we can craft a tailored sprint plan, align scope, and drop a
              kickoff calendar hold inside 24 hours. The more detail you share, the faster we can
              get to build mode.
            </p>
          </div>

          <div className="grid gap-6 rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-[0_18px_70px_rgba(20,9,40,0.55)] backdrop-blur-xl sm:grid-cols-2">
            <div className="space-y-4">
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-white/60">
                What you’ll get
              </p>
              <ul className="space-y-3 text-sm text-white/80 sm:text-base">
                <li className="flex gap-3">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-accent" />
                  <span>A written game plan covering timeline, scope, and collaboration cadence.</span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-accent" />
                  <span>Proposed stack + automation architecture tuned to your stage.</span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-accent" />
                  <span>Kickoff availability with live design/system reviews in the first week.</span>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-white/60">
                Quick contact
              </p>
              <ul className="space-y-3 text-sm text-white/80 sm:text-base">
                {supportItems.map(({ title, value, href }) => (
                  <li key={title}>
                    <span className="text-white/55">{title}</span>
                    <div>
                      <Link href={href} className="text-white transition hover:text-accent">
                        {value}
                      </Link>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-white/55">
            <div className="flex items-center gap-3 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.35em]">
              <Image
                src="/brand/Just_logo.png"
                alt="Orbit badge"
                width={32}
                height={32}
                className="h-8 w-8 rounded-full border border-white/20 bg-white/10 p-1"
              />
              Orbit collective
            </div>
            <p className="text-xs sm:text-sm">
              Need NDA or procurement documents first?{" "}
              <Link
                href="mailto:nick@orbit.build?subject=Orbit%20Studio%20NDA%20request"
                className="text-white hover:text-accent"
              >
                Email Nick directly
              </Link>
              .
            </p>
          </div>
          </section>

          <StartBuildForm />
        </div>
    </div>
      <div className="container relative z-10 mt-16 rounded-[2rem] border border-white/10 bg-white/5 p-6 text-sm text-white/70 backdrop-blur-lg sm:p-8 lg:mt-20">
        <p>
          Prefer a live walkthrough?{" "}
          <Button asChild variant="link" size="sm" className="p-0 text-white hover:text-accent">
            <Link href="https://cal.com/nickbrooks/orbit-intro" rel="noopener noreferrer">
              Book a 20-minute intro call
            </Link>
          </Button>
          . We’ll scope the sprint and align on collaboration rhythm in real time.
        </p>
      </div>
    </main>
  );
}
