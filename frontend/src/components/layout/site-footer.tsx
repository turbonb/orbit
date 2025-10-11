export function SiteFooter() {
  return (
    <footer className="relative border-t border-border/60 py-10">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      <div className="container flex flex-col gap-4 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Orbit Collective. Orbit sprint studio.</p>
        <div className="flex flex-wrap items-center gap-4">
          <a href="mailto:orbit@blinkbuild.studio" className="transition hover:text-accent">
            orbit@blinkbuild.studio
          </a>
          <a href="#services" className="transition hover:text-accent">
            Services
          </a>
          <a href="#work" className="transition hover:text-accent">
            Case Studies
          </a>
        </div>
      </div>
    </footer>
  );
}
