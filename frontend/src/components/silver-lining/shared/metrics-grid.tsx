'use client';

import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

export interface MetricItem {
  value: string;
  label: string;
  hint?: string;
}

interface MetricsGridProps {
  items: MetricItem[];
  className?: string;
}

export function MetricsGrid({ items, className }: MetricsGridProps) {
  return (
    <div className={cn("grid gap-6 sm:grid-cols-2 lg:grid-cols-4", className)}>
      {items.map((metric, index) => (
        <Reveal
          key={metric.label}
          delay={0.1 * index}
          className="rounded-3xl border border-black/5 bg-white p-6 shadow-[0_16px_32px_rgba(15,15,20,0.08)]"
        >
          <div className="space-y-2">
            <p className="text-4xl font-semibold tracking-tight text-gradient-clean sm:text-5xl">
              {metric.value}
            </p>
            <p className="text-sm text-[rgba(28,28,28,0.7)]">{metric.label}</p>
            {metric.hint ? (
              <p className="text-xs uppercase tracking-[0.3em] text-[rgba(28,28,28,0.45)]">
                {metric.hint}
              </p>
            ) : null}
          </div>
        </Reveal>
      ))}
    </div>
  );
}
