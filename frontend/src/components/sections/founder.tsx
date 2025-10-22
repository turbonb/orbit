import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const credentials = [
  "Principal builder with 2+ years steering end-to-end launches",
  "Supabase-first, automation-native stack across web and API layers",
  "Transparent rituals: live reviews, async Looms, and shared Notion/Linear"
];

const signals = [
  { label: "Stack Mastery", value: "Next.js 15 · Supabase · Tailwind/shadcn" },
  { label: "Average timeline", value: "10–21 day launch" },
  { label: "Delivery NPS", value: "97+" }
];

export function FounderSection() {
  return (
    <section id="about" className="section-shell relative py-24">
      <div className="container relative grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center">
        <div className="orbit-text-card space-y-6 px-6 py-8 sm:px-10">
          <Badge className="bg-primary/20 text-primary shadow shadow-primary/40">Founder</Badge>
          <h2 className="display-subheading text-balance text-3xl font-semibold text-foreground sm:text-4xl">
            <span className="inline-block text-gradient-soft">
              Led by Nick Brooks — the builder who turns strategy into shipped outcomes.
            </span>
          </h2>
          <p className="text-base text-white/85 sm:text-lg">
            Orbit Collective is helmed by Nick Brooks, the principal builder who pairs relentless
            curiosity with accountable ownership. He bridges strategy, design, and engineering so
            every sprint moves with clarity, polish, and measurable lift.
          </p>
          <ul className="grid gap-3 text-sm text-white/85 sm:text-base">
            {credentials.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-white/70" aria-hidden />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="inline-block text-gradient-brand">Signals &amp; Outcomes</CardTitle>
            <CardDescription className="text-white/80">
              Orbit’s scorecard spotlights the velocity, satisfaction, and stack mastery clients rely on.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {signals.map(({ label, value }) => (
              <div
                key={label}
                className="space-y-1 rounded-xl border border-white/20 bg-white/5 p-4 shadow-inner shadow-black/20"
              >
                <p className="text-xs uppercase tracking-wide text-accent">
                  {label}
                </p>
                <p className="inline-block text-base font-semibold text-gradient-soft">{value}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
