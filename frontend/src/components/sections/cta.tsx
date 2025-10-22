import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function CTASection() {
  return (
    <section id="contact" className="section-shell relative overflow-hidden py-24">
      <div className="container relative">
        <Card className="mx-auto max-w-3xl p-10 text-center">
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-wide text-accent">
              Ready to pick your launch window?
            </p>
            <h2 className="display-subheading text-balance text-3xl font-semibold text-foreground sm:text-4xl">
              <span className="inline-block text-gradient-soft">
                Reserve an Orbit sprint and preview your launch-ready experience inside two weeks.
              </span>
            </h2>
            <p className="text-base text-white/85 sm:text-lg">
              Share your vision, timeline, and growth goals. We’ll shape the right package, confirm
              the Supabase architecture, and lock a kickoff within 24 hours of alignment.
            </p>
            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button
                size="lg"
                className="min-w-[200px] rounded-full bg-primary px-8 text-base font-semibold shadow-lg shadow-primary/30 hover:bg-primary/80"
              >
                Book Discovery Call
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="min-w-[200px] rounded-full border-white/40 bg-white/10 text-white hover:bg-white/20"
              >
                Download Service Deck
              </Button>
            </div>
            <p className="text-xs uppercase tracking-wide text-white/70">
              Two sprint windows remain open this quarter.
            </p>
          </div>
        </Card>
      </div>
    </section>
  );
}
