# Power Rangers Task Board

## Mission Overview
- **Product:** Orbit marketing site (`orbit/frontend`)
- **Visual reference:** `Landing-reference.webp`
- **Brand assets:** `Logo.png` (“Ahead of Orbit” logotype), `Just_logo.png` (glyph-only)
- **Palette:**  
  - Persian Indigo `#3C096C`  
  - Tekhelet `#5A189A`  
  - Amethyst `#9D4EDD`  
  - Sunset `#FFC880`  
  - Princeton Orange `#FF9100`
- **Goal:** Deliver a dark, motion-rich landing experience inspired by the reference while keeping shadcn/ui structure.

Coordinate often—many tasks rely on shared tokens. All Rangers should check in changes under dedicated terminals (`terminal-red`, `terminal-blue`, `terminal-green`, `terminal-yellow`).

---

## Red Ranger — Brand Palette Lead (`terminal-red`)
Focus on tokenizing and propagating the color system.
- [ ] Audit current Tailwind theme (`src/app/globals.css`, `tailwind.config.ts`) and ensure all key palette colors have semantic tokens (primary/secondary/accent, gradients, text).
- [ ] Update component variants (buttons, badges, cards, nav links) to consistently reference the new tokens. Avoid hard-coded hex values in components; prefer CSS variables.
- [ ] Confirm hover/active/focus states use palette-friendly contrasts (WCAG AA where practical).
- [ ] Provide a quick swatch reference (e.g., comment or md snippet) so other Rangers know which variable matches which hex.

**Deliverables:** Updated theme variables, consistent palette usage across UI elements, notes for other Rangers.

> **Palette Tokens**
> - `--brand-void` → `#150326` (Orbit void background / deep surfaces)
> - `--brand-persian-indigo` → `#3C096C` (Primary secondary surfaces)
> - `--brand-tekhelet` → `#5A189A` (Primary brand tone / buttons)
> - `--brand-amethyst` → `#9D4EDD` (Accent gradients / rings)
> - `--brand-sunset` → `#FFC880` (Warm accents / stats)
> - `--brand-princeton` → `#FF9100` (Glow accents / CTA highlights)

---

## Blue Ranger — Hero & Layout Vanguard (`terminal-blue`)
Own the macro layout and page-level background aesthetics.
- [ ] Shift the global background to deep charcoal/black while retaining subtle texture; blend in indigo/orange ambient glows referencing `Landing-reference.webp`.
- [ ] Redesign the hero section to echo the inspiration:  
  - Oversized typographic treatment with **“ORBIT”** as the dominant wordmark (apply gradient treatments per Green Ranger’s guidance).  
  - Arrange supporting copy, CTA buttons, and stat blocks to feel cinematic and asymmetrical.  
  - Integrate the `Logo.png` or `Just_logo.png` as appropriate (coordinate with Yellow Ranger).  
- [ ] Ensure sticky header/body interplay still works (no layout shift, proper spacing).
- [ ] Update body background + section dividers so the rest of the site inherits the dark theme gracefully.

**Deliverables:** New hero layout, updated global background styles, documented structure for animation hooks.

---

## Green Ranger — Typography & Gradient Maestro (`terminal-green`)
Handle typographic hierarchy and gradient accents.
- [ ] Apply palette-based gradients to marquee text (hero headline “ORBIT”, section headings, key stats). Use Tailwind utilities or custom CSS modules for gradient text (`bg-clip-text`, `text-transparent`).
- [ ] Define a reusable utility/class for gradient text so multiple sections stay consistent.
- [ ] Enhance typographic rhythm: adjust tracking, line heights, and scale to match the luxe vibe of the reference.
- [ ] Coordinate with Red Ranger to ensure gradient stops match color tokens; collaborate with Blue on hero layout specifics.

**Deliverables:** Gradient text utilities, updated headings/stat blocks, notes on typography choices.

---

## Yellow Ranger — Interaction & Assets Ops (`terminal-yellow`)
Bring motion and branding polish.
- [ ] Replace existing header/hero imagery with new assets:  
  - Use `Logo.png` for primary logotype (header/hero).  
  - Use `Just_logo.png` where only the glyph is needed (e.g., floating badge).  
  - Compress/crop as needed via Next.js Image component.
- [ ] Implement scroll-triggered animations for major sections (hero stat card, services, process, portfolio, testimonials, CTA). Prefer Framer Motion or Intersection Observer wrappers that keep bundle impact reasonable.
- [ ] Ensure animations respect accessibility: reduced-motion preference, subtle easing, no blocking content.
- [ ] Tie animation timing to layout classes so future edits stay maintainable.

**Deliverables:** Animation utilities/components, updated asset usage, reduced-motion support.

---

### Coordination Notes
- Kick off with Red Ranger updating tokens; Blue and Green should branch after palette variables are ready.
- Share a quick snippet in this file (or comments) when new utilities (gradients, motion hooks) are introduced.
- **Blue Ranger update:** Global backdrop now lives in the `body::before/::after` glows and every major section should include the `.section-shell` class to pick up the gradient dividers. The hero wordmark leans on the shared `.text-gradient-brand` utility and anchors a logomark capsule built with `Logo.png`/`Just_logo.png`.
- **Green Ranger update:** Dropped `.text-gradient-brand` & `.text-gradient-soft` utilities plus `.display-heading` / `.display-subheading` typographic helpers in `src/app/globals.css`; wired into the hero wordmark, section headings, and stat highlights.
- Keep an eye on performance—lazy-load heavy assets, avoid over-layering shadows.
- Final review pass should confirm theme coherence, animation smoothness, and consistent branding.
