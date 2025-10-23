# Codex Build Instructions — Flashpoint Energy V2 Webflow Port

## Purpose

Provide Codex with a step-by-step plan to recreate the Flashpoint Energy V2 experience using the Webflow reference for `Nick's Main Site`. Follow the sequence below to ensure fidelity and maintain V2 architectural principles (TypeScript, MUI/Toolpad alignment, responsive layout).

## General Workflow

- Work **section by section**; finish one area (structure + styling + content) before moving to the next.
- Use the published Webflow artifacts and extracted docs as your source of truth. Cross-reference assets, classes, and layout notes.
- Confirm responsive behavior at each breakpoint (1280, 992, 768, 480) using the CSS reference.
- Preserve Webflow class names where helpful for styling parity, but map to V2 component architecture (hooks, theming) as needed.
- Capture animations/interactions after static layout is complete.

## Reference Files

- Overview & roadmap: `orbit/docs/landing-page.md` (entry point)
- Section markup snippets: `orbit/docs/landing-page-sections.md`
- Forms markup and messaging: `orbit/docs/landing-page-forms.md`
- Asset IDs + CDN URLs: `orbit/docs/landing-page-assets.md`
- CSS classes, typography, colors, breakpoints: `orbit/docs/landing-page-styles.md`
- Published HTML snapshot: `orbit/docs/webflow-home.html`
- Additional page snapshots: `page-404.html`, `page-401.html`, `page-changelog.html`, `page-licenses.html`, `page-style-guide.html`
- Published CSS bundle: `orbit/docs/webflow-home.css`
- Interaction follow-ups: `orbit/docs/landing-page-styles.md` notes + animation bundles (`orbit/docs/webflow-home-anim-1.js`, `webflow-home-anim-2.js`, `webflow-home-anim-3.js`)

## Build Sequence

### Phase 1 — Foundations _(complete)_

- Import Webflow palette/typography tokens into the Next.js theme layer.
- Recreate navigation + hero scaffolding with Orbit copy and layout parity.

### Phase 2 — Core Content Sections _(in progress)_

- About section two-column copy and supporting typography (`landing-page-sections.md`).
- Services accordion, bullet lists, and imagery; wire semantic classes + motion hooks for later.
- Metrics block (`by the numbers`) with stat styling from `landing-page-styles.md`.

### Phase 3 — Showcase & Social Proof

- Projects showcase with floating imagery, metadata pills, and description copy.
- Press logos strip and gallery intro headings.
- Gallery grid/lightbox assets using `landing-page-assets.md` for sourcing.
- Testimonials slider including repeated testimonial copy and portrait assets.

### Phase 4 — Conversion & Polish

- Contact CTA form and newsletter module, matching Webflow states (`landing-page-forms.md`).
- Footer link groups, legal copy, and responsive stacking.
- Interactions: replicate slider behavior, hover effects, and scroll reveals using GSAP/ScrollTrigger timelines (`webflow-home-anim-*.js`).
- Verify responsive adjustments at 1280/992/768/480 breakpoints per `landing-page-styles.md`.

### Phase 5 — Animation & Additional Pages

- Map `data-w-id` attributes in `webflow-home.html` to timelines inside `webflow-home-anim-3.js` (primary GSAP sequences) and support bundles (`webflow-home-anim-1.js`, `webflow-home-anim-2.js`).
- Load GSAP libraries (`https://cdn.prod.website-files.com/gsap/3.13.0/gsap.min.js`, `ScrollTrigger.min.js`, `SplitText.min.js`) or local equivalents.
- Recreate scroll-triggered overlays, hero reveals, card slides, and slider timing to match Webflow behavior; document any deviations in `progress.md`.
- For secondary pages (404, 401, Changelog, Licenses, Style Guide), use `page-*.html` snapshots to port layout/content and repeat the asset capture workflow as needed.

## Implementation Tips

- Align components with Flashpoint V2 architecture (MUI/Toolpad, theming). Use extracted class values as tokens.
- Centralize color palette/typography in the theme layer using values from `landing-page-styles.md`.
- Store asset URLs or download assets locally as required; reference `landing-page-assets.md` for mapping.
- Keep forms integrated with V2 form handling but match Webflow structure/states.
- Update documentation (`progress.md`) after completing each section.

## Deliverables Checklist

- [ ] Responsive layout matches Webflow design at key breakpoints.
- [ ] All sections completed in order and validated against source docs.
- [ ] Forms wired with correct labels, success/error states.
- [ ] Assets referenced or bundled per build plan.
- [ ] Interaction parity achieved or documented.
- [ ] Documentation updated with deviations/decisions.
