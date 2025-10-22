"use client";

import { FormEvent, useState } from "react";

import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";

export function ContactCTA() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="section-shell py-20 md:py-24">
      <div className="mx-auto max-w-6xl rounded-[3rem] border border-black/8 bg-[hsl(var(--primary)/0.12)] px-6 py-16 shadow-[0_24px_60px_rgba(12,12,16,0.12)] sm:px-10 md:px-16">
        <div className="grid gap-12 md:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] md:items-center">
          <div className="space-y-6 text-left">
            <Reveal className="sl-badge inline-flex">
              Ready to meet your crew?
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="text-balance text-3xl font-semibold tracking-tight text-[rgb(28,28,28)] sm:text-4xl md:text-5xl">
                Book a complimentary <span className="italics">walkthrough</span> and receive a curated cleaning plan.
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="max-w-xl text-base leading-relaxed text-[rgba(28,28,28,0.72)]">
                Tell us about your space, your schedule, and any sensitivities we should know about.
                A Silver Lining specialist will respond within one business hour with next steps.
              </p>
            </Reveal>
            <Reveal delay={0.25}>
              <div className="text-xs uppercase tracking-[0.32em] text-[rgba(28,28,28,0.55)]">
                48-hour happiness guarantee · Eco-certified supplies
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.35} className="rounded-[2rem] border border-black/5 bg-white p-6 shadow-[0_18px_45px_rgba(12,12,16,0.12)] sm:p-8">
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label htmlFor="cta-name" className="text-xs font-semibold uppercase tracking-[0.3em] text-[rgba(28,28,28,0.55)]">
                  Name
                </label>
                <input
                  id="cta-name"
                  name="name"
                  type="text"
                  required
                  className="w-full rounded-2xl border border-black/10 bg-white/90 px-4 py-3 text-sm text-[rgba(28,28,28,0.85)] shadow-sm outline-none transition focus:border-[hsl(var(--primary))] focus:ring-2 focus:ring-[hsl(var(--primary)/0.45)]"
                  placeholder="Jordan Smith"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="cta-email" className="text-xs font-semibold uppercase tracking-[0.3em] text-[rgba(28,28,28,0.55)]">
                  Email
                </label>
                <input
                  id="cta-email"
                  name="email"
                  type="email"
                  required
                  className="w-full rounded-2xl border border-black/10 bg-white/90 px-4 py-3 text-sm text-[rgba(28,28,28,0.85)] shadow-sm outline-none transition focus:border-[hsl(var(--primary))] focus:ring-2 focus:ring-[hsl(var(--primary)/0.45)]"
                  placeholder="you@example.com"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="cta-notes" className="text-xs font-semibold uppercase tracking-[0.3em] text-[rgba(28,28,28,0.55)]">
                  What should we know?
                </label>
                <textarea
                  id="cta-notes"
                  name="notes"
                  rows={3}
                  className="w-full rounded-2xl border border-black/10 bg-white/90 px-4 py-3 text-sm text-[rgba(28,28,28,0.85)] shadow-sm outline-none transition focus:border-[hsl(var(--primary))] focus:ring-2 focus:ring-[hsl(var(--primary)/0.45)]"
                  placeholder="Preferred days, pets, access instructions..."
                />
              </div>
              <Button
                type="submit"
                size="lg"
                className="w-full rounded-full bg-[hsl(var(--primary))] px-6 py-3 text-xs font-semibold uppercase tracking-[0.35em] text-[hsl(var(--secondary))] shadow-soft transition hover:bg-[hsl(var(--primary)/0.85)]"
              >
                Book my walkthrough
              </Button>
              {submitted ? (
                <p className="text-center text-xs text-[rgba(28,28,28,0.6)]">
                  Thanks! A specialist will reach out shortly to confirm your walkthrough time.
                </p>
              ) : (
                <p className="text-center text-xs uppercase tracking-[0.3em] text-[rgba(28,28,28,0.45)]">
                  We reply within one business hour.
                </p>
              )}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
