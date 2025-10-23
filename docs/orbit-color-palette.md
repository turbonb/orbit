# Task Brief: Recolor Orbit Website

## Goal
Replace the legacy orange / purple Orbit palette with the warm red / yellow
scheme from the provided reference swatch (Ceramic Yellow, Pastel Beige, Red
Carriage, Mahogany, Bordeaux). Update design tokens and UI components so the
new palette drives the entire brand experience.

## Reference Assets
- Swatch image: Ceramic Yellow, Pastel Beige, Red Carriage, Mahogany, Bordeaux.
- Existing Tailwind/CSS token files in the Orbit repo.
- Accessibility requirements: WCAG 2.1 AA (contrast ≥4.5:1 for body text).

## Tasks
1. Introduce color tokens for the five swatch colors (HEX/RGB/CMYK values):
   - Ceramic Yellow `#F8D794` (primary accent, CTAs, highlights)
   - Pastel Beige `#FEEACD` (light backgrounds / cards)
   - Red Carriage `#9C0512` (secondary accent, badges, alerts)
   - Mahogany `#64090C` (headings/text on light backgrounds)
   - Bordeaux `#0E0000` (dark backgrounds, footer, overlays)
2. Update global styles / Tailwind config (or theme file) so these tokens are
   available to every component.
3. Apply the new palette to:
   - Primary & secondary buttons
   - Headings, body text, links
   - Cards, modals, banners, footer backgrounds
   - Icons/illustrations (switch to warm gradients where relevant)
4. Ensure CTAs meet contrast rules (e.g., Ceramic Yellow button with Mahogany
   text/border; Pastel Beige sections with Mahogany or Bordeaux text).
5. Run accessibility checks (Lighthouse/Axe) and note any required tweaks in
   the PR.

## Deliverables
- Updated design tokens / Tailwind config.
- Component styles reflecting the new palette.
- Accessibility notes (any exceptions or alternates).
- Screenshot comparison (before/after) if possible.

Use this document as the prompt for tomorrow’s Codex session to apply the new
color palette end to end.
