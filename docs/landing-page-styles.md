# Landing Page — CSS Reference

## Global Foundations (`webflow-home.css`)

- Base font: `"General Sans", sans-serif` (set on `body`), fallback `sans-serif`.
- Body background: `#f5f3ef`; base text color `#111`.
- Root font size: stays at 16px (rem == px).
- Section padding: `section { padding: 120px 0; }`, decreasing to 96px ≤991px, 80px ≤767px, 64px ≤479px.

## Navigation & Hero

- `.nav-link`: uppercase, `letter-spacing: 0.2em`, `font-size: 0.875rem`, `color: #111`, `padding: 0.75rem 0`; hover/current states keep `color: #111`. Collapses to column ≤991px with centered text.
- `.menu-button` (`.w-nav-button`): hidden above 991px; mobile shows circular hamburger (`background: #ffffff00`, `border-radius: 999px`).
- `.large-title`: `font-size: 14.5vw`, `line-height: 1`, `font-weight: 600`; breakpoints adjust to `15.5vw` ≤991px, `96px` ≤767px, `72px` ≤479px.
- Hero overlays: `.hero-image-background`/`foreground` use layered gradients (#ded8cf) + absolute positioning for split layout.

## Typography Scale

- `h2`: `font-size: 3rem`, `line-height: 1.1`; reduces to 2.5rem (≤991px), 2rem (≤767px), 1.75rem (≤479px).
- `h3`: `font-size: 1.5rem`, `font-weight: 500`.
- `.uppercase-small-heading`: `font-size: 0.875rem`, `letter-spacing: 0.3em`, `text-transform: uppercase`, `color: #888`.
- `.uppercase-large-heading`: `font-size: 3rem`, uppercase, `letter-spacing: 0.2em`.
- `.about-block p`: `font-size: 1.125rem`, `line-height: 1.6`, `color: #3d3d3d`.
- `.testimonial-text`: `font-size: 1.5rem`, `line-height: 1.6`, `color: #f5f3ef`.

## Services Accordion

- `.services-list`: flex column with `.separator-line` (`height: 1px`, `background: rgba(17,17,17,0.08)`).
- `.single-service-grid`: two-column grid (number + accordion wrapper) with gap `3rem`; stacks ≤767px.
- `.number`: `font-size: 1.5rem`, `font-weight: 600`, `color: #b3a38a`.
- `.accordion-content`: grid with text and `.animated-grid-image` (576px width, `border-radius: 24px`, subtle box shadow).
- `.service-bullet-point`: flex row, gap `0.75rem`; `.bullet-indicator`: 8px circle `#111`.

## Projects & Gallery

- `.project-thumbnail`: flex align center with `.floating-image` (border-radius `24px`, `box-shadow: 0 24px 80px rgba(10,10,10,0.12)`, `overflow: hidden`). Hover transforms move image `translateY(-8px)`.
- `.project-label`: uppercase pill, background `#111`, text `#f5f3ef`, `padding: 0.35rem 0.9rem`, `border-radius: 999px`, `font-size: 0.75rem`.
- `.images-wrapper`: CSS grid (3 columns) with `gap: 1.5rem`; reduces to 2 columns ≤767px and single column ≤479px. Lightbox data stored inline for each anchor.

## Stats & Testimonials

- `.stats-block`: horizontal flex with `gap: 3rem`; becomes column ≤767px.
- `.stat`: `font-size: 3.5rem`, `font-weight: 600`; `.grey-text`: uppercase, `letter-spacing: 0.4em`, `color: #888`.
- Slider uses `.w-slider`; arrows load `left-arrow.svg` / `right-arrow.svg`; slide nav uses Webflow numeric dots.

## Forms & Buttons

- `.primary-button`: `background: #111`, `color: #f5f3ef`, `padding: 1rem 1.75rem`, `border-radius: 999px`, `transition: all 200ms`; hover flips to transparent background and dark text border.
- `.form-field`: background `#f5f3ef`, `border: 1px solid rgba(17,17,17,0.08)`, `padding: 1rem 1.25rem`, `border-radius: 999px`; textarea variant uses `border-radius: 24px` and min-height 160px.
- `.form-label`/`.form-label-2`: uppercase, `letter-spacing: 0.2em`, `font-size: 0.75rem`, `color: #888`.
- Webflow success/error blocks styled with neutral background, no additional animation.

## Footer & Utility Links

- `.footer-grid-top`: four-column grid; collapses to two columns ≤991px and stacked ≤767px.
- `.footer-link`: `color: rgba(245,243,239,0.64)`; hover sets `color: #f5f3ef`.
- `.dark-footer-links-wrapper`: flex for legal attribution; stacks on mobile.

## Color Palette (hex)

- Body BG `#f5f3ef`
- Primary text `#111111`
- Secondary text `#888888`
- Accent `#b3a38a`
- Dark section BG `#111111` (with white text)
- Divider `rgba(17,17,17,0.08)`
- Card BGs `#e8e1d7`

## Breakpoint Summary

- 1280px (max-width: 1279px): hero title increases to `15.5vw`, container padding shrinks.
- 992px (max-width: 991px): nav collapses to hamburger, services/projets/galleries stack, section padding 96px.
- 768px (max-width: 767px): typography scales down, stats block vertical, forms widen to full width.
- 480px (max-width: 479px): hero title 72px, headings 1.75rem, gallery single column, buttons full width.

## Interaction Scripts

- Bundled JS loads GSAP (`gsap.min.js`, `ScrollTrigger`, `SplitText`) for hero overlay slides, card fade/translate animations, and counter reveals (logic inside `webflow.fc9b120a.cc94486327d1acb6.js`).
- Webflow slider handles testimonials; no additional custom JS required to replicate beyond including the slider component.

## Follow-Ups

- Map GSAP animation hooks if recreating interactions; inspect `data-w-id` attributes in HTML to match timeline targets.
- If porting to React/Next, replicate `w-nav` behavior or swap to headless nav while keeping CSS classes.
