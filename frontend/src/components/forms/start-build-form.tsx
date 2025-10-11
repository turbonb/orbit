"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type SubmissionState = "idle" | "loading" | "success" | "error";

const fieldStyles =
  "w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/90 placeholder:text-white/40 focus:border-white/30 focus:outline-none focus:ring-2 focus:ring-white/30 transition";

const selectStyles =
  "w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/90 placeholder:text-white/40 focus:border-white/30 focus:outline-none focus:ring-2 focus:ring-white/30 transition appearance-none";

const textareaStyles =
  "w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/90 placeholder:text-white/40 focus:border-white/30 focus:outline-none focus:ring-2 focus:ring-white/30 transition min-h-[140px] resize-vertical";

const projectTypes = [
  "Marketing / Brand Experience",
  "Product Launch Surface",
  "Web Application / Dashboard",
  "Automation or Internal Tool",
  "Design System / Component Library",
  "Other"
];

const timelines = [
  "ASAP — launch inside 2 weeks",
  "This month",
  "This quarter",
  "Flexible / exploring options"
];

const budgets = ["$6k – $10k", "$10k – $20k", "$20k – $35k", "$35k+", "Unsure"];

interface FormValues {
  fullName: string;
  email: string;
  company: string;
  projectType: string;
  goals: string;
  timeline: string;
  budget: string;
  integrations: string;
  communication: string;
}

const initialValues: FormValues = {
  fullName: "",
  email: "",
  company: "",
  projectType: "",
  goals: "",
  timeline: "",
  budget: "",
  integrations: "",
  communication: ""
};

export function StartBuildForm() {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [status, setStatus] = useState<SubmissionState>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");
    setErrorMessage(null);

    try {
      const response = await fetch("/api/start-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(values)
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data?.error ?? "We couldn’t send your request. Try again in a moment.");
      }

      setStatus("success");
      setValues(initialValues);
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Something went wrong. Please try again."
      );
    }
  };

  return (
    <div className="relative rounded-[2.5rem] border border-white/10 bg-white/5 p-8 shadow-[0_32px_120px_hsla(272,82%,18%,0.45)] backdrop-blur-lg sm:p-10">
      <div className="pointer-events-none absolute inset-0 rounded-[2.5rem] border border-white/5 opacity-30" />
      <form className="relative space-y-6 text-white" onSubmit={handleSubmit}>
        <header className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/60">
            Project Intake
          </p>
          <h1 className="text-3xl font-semibold text-white sm:text-4xl">
            Tell us about the experience you want to launch.
          </h1>
          <p className="text-sm text-white/70 sm:text-base">
            Share a few details and we’ll follow up within 24 hours with a tailored plan, scope, and
            kickoff availability.
          </p>
        </header>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="fullName" className="text-xs font-medium uppercase tracking-[0.3em] text-white/60">
              Full name
            </label>
            <input
              id="fullName"
              name="fullName"
              placeholder="Ari Launchwell"
              value={values.fullName}
              onChange={handleChange}
              className={fieldStyles}
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="text-xs font-medium uppercase tracking-[0.3em] text-white/60">
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="you@company.com"
              value={values.email}
              onChange={handleChange}
              className={fieldStyles}
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="company" className="text-xs font-medium uppercase tracking-[0.3em] text-white/60">
              Company or team
            </label>
            <input
              id="company"
              name="company"
              placeholder="Orbit Collective"
              value={values.company}
              onChange={handleChange}
              className={fieldStyles}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="projectType" className="text-xs font-medium uppercase tracking-[0.3em] text-white/60">
              What are we building?
            </label>
            <div className="relative">
              <select
                id="projectType"
                name="projectType"
                value={values.projectType}
                onChange={handleChange}
                className={cn(selectStyles, "pr-11")}
                required
              >
                <option value="" disabled>
                  Select a project type
                </option>
                {projectTypes.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <span className="pointer-events-none absolute inset-y-0 right-4 grid h-full place-items-center text-white/40">
                ▾
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="goals" className="text-xs font-medium uppercase tracking-[0.3em] text-white/60">
            What outcomes are you targeting?
          </label>
          <textarea
            id="goals"
            name="goals"
            placeholder="Tell us about the experience, KPIs, or launch milestones you’re chasing."
            value={values.goals}
            onChange={handleChange}
            className={textareaStyles}
            required
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="timeline" className="text-xs font-medium uppercase tracking-[0.3em] text-white/60">
              Desired timeline
            </label>
            <div className="relative">
              <select
                id="timeline"
                name="timeline"
                value={values.timeline}
                onChange={handleChange}
                className={cn(selectStyles, "pr-11")}
                required
              >
                <option value="" disabled>
                  Select a timeline
                </option>
                {timelines.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <span className="pointer-events-none absolute inset-y-0 right-4 grid h-full place-items-center text-white/40">
                ▾
              </span>
            </div>
          </div>
          <div className="space-y-2">
            <label htmlFor="budget" className="text-xs font-medium uppercase tracking-[0.3em] text-white/60">
              Project investment
            </label>
            <div className="relative">
              <select
                id="budget"
                name="budget"
                value={values.budget}
                onChange={handleChange}
                className={cn(selectStyles, "pr-11")}
                required
              >
                <option value="" disabled>
                  Select a range
                </option>
                {budgets.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <span className="pointer-events-none absolute inset-y-0 right-4 grid h-full place-items-center text-white/40">
                ▾
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="integrations" className="text-xs font-medium uppercase tracking-[0.3em] text-white/60">
            Integrations, stack, or constraints
          </label>
          <textarea
            id="integrations"
            name="integrations"
            placeholder="Supabase backend, Stripe billing, CRM handoffs, compliance, etc."
            value={values.integrations}
            onChange={handleChange}
            className={textareaStyles}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="communication" className="text-xs font-medium uppercase tracking-[0.3em] text-white/60">
            Preferred follow-up
          </label>
          <input
            id="communication"
            name="communication"
            placeholder="Share a Calendly link, phone number, or note"
            value={values.communication}
            onChange={handleChange}
            className={fieldStyles}
          />
        </div>

        <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
          {status === "success" ? (
            <p className="text-sm font-semibold text-white/80">
              Received! We’ll respond within a day. Watch your inbox.
            </p>
          ) : (
            <p className="text-xs text-white/55">
              We keep your details private and respond within 24 hours.
            </p>
          )}
          <Button
            type="submit"
            size="lg"
            className="w-full rounded-full px-10 sm:w-auto"
            disabled={status === "loading"}
          >
            {status === "loading" ? "Sending…" : "Send Request"}
          </Button>
        </div>

        {status === "error" && errorMessage && (
          <p className="text-sm font-medium text-[#FFB4B4]">{errorMessage}</p>
        )}
      </form>
    </div>
  );
}

