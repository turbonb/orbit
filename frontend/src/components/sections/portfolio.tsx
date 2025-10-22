import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const caseStudies = [
  {
    client: "QUOTR.ai",
    type: "Insurance automation platform",
    description:
      "Supabase quoting engine with VoltAgent outreach and documented API surface, launched in under ten days.",
    metrics: ["10 day sprint", "Automated lead nurture", "Documented API suite"],
    accent: "from-brand-indigo/65 via-brand-tekhelet/40 to-transparent",
    letter: "IA"
  },
  {
    client: "Turbo Labs Studio",
    type: "AI studio marketing experience",
    description:
      "Motion-rich storytelling microsite with Supabase lead intake, calibrated for rapid campaign experiments.",
    metrics: ["14 day launch", "43% opt-in lift", "Framer motion choreography"],
    accent: "from-brand-tekhelet/45 via-brand-amethyst/35 to-transparent",
    letter: "AI"
  },
  {
    client: "STRAATA Intelligence",
    type: "Payment intelligence dashboards",
    description:
      "Revenue intelligence dashboards with Supabase views, impersonation-ready controls, and real-time reporting.",
    metrics: ["21 day overhaul", "Lighthouse A", "Role-aware dashboards"],
    accent: "from-brand-indigo/55 via-brand-amethyst/35 to-transparent",
    letter: "BI"
  }
];

export function PortfolioSection() {
  return (
    <section id="work" className="section-shell relative py-24">
      <div className="container relative space-y-14">
        <header className="orbit-text-card max-w-2xl space-y-5 px-6 py-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-accent">Selected Work</p>
          <h2 className="display-subheading mt-4 text-balance text-3xl font-semibold text-foreground sm:text-4xl">
            <span className="inline-block text-gradient-soft">
              Real-world launches that show how Orbit Collective ships Orbit-fast.
            </span>
          </h2>
          <p className="mt-4 text-base text-white/90 sm:text-lg">
            Each sprint merges narrative craft, automation-native engineering, and Supabase
            infrastructure so teams earn momentum without pausing to replatform later.
          </p>
        </header>
        <div className="grid gap-6 lg:grid-cols-3">
          {caseStudies.map(({ client, type, description, metrics, accent, letter }) => (
            <Card
              key={client}
              className="flex flex-col overflow-hidden"
            >
              <div
                className={`relative aspect-[3/2] overflow-hidden bg-gradient-to-br ${accent}`}
              >
                <div className="absolute inset-0 bg-orbit-card-sheen" />
                <div className="absolute bottom-6 left-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-card/90 text-sm font-semibold uppercase tracking-wide text-accent shadow shadow-primary/40">
                  {letter}
                </div>
              </div>
              <CardHeader>
                <CardTitle className="inline-block text-xl capitalize text-gradient-brand">{type}</CardTitle>
                <CardDescription className="leading-relaxed text-white/85">
                  For {client}. {description}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-2">
                <ul className="flex flex-wrap gap-2 text-xs uppercase tracking-wide text-white/75">
                  {metrics.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-white/30 bg-white/10 px-3 py-1 text-white shadow-inner shadow-black/20"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
