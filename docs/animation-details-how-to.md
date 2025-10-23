# Animation Details Extraction — How-To

Use these steps to capture Webflow animation sources so Codex (or any implementation agent) can reproduce them exactly.

## 1. Publish the Webflow Site

- Open the project in Webflow Designer and publish it to the staging domain (e.g. `https://nicks-main-site.webflow.io/`).
- Without a published page, Webflow’s CDN assets (HTML/CSS/JS) won’t be accessible.

## 2. Download the Rendered HTML

- Run from the local workspace (adjust paths if needed):
  ```bash
  /bin/sh -c 'cd /Users/nickbrooks/orbit && curl -Ls https://nicks-main-site.webflow.io/ -o orbit/docs/webflow-home.html && echo "[done]"'
  ```
- This captures the published markup, including every `data-w-id` attribute that ties DOM elements to animations.

## 3. Identify Webflow JS Bundles

- Open `orbit/docs/webflow-home.html` and locate the `<script src="...webflow...js">` tags near the bottom.
- For Nick’s Main Site the interaction bundles were:
  - `https://cdn.prod.website-files.com/68f93164bb03f1f44689f2c4/js/webflow.schunk.04af0614e1eac9d7.js`
  - `https://cdn.prod.website-files.com/68f93164bb03f1f44689f2c4/js/webflow.schunk.3b44982be2347a20.js`
  - `https://cdn.prod.website-files.com/68f93164bb03f1f44689f2c4/js/webflow.fc9b120a.cc94486327d1acb6.js`

## 4. Download the Animation Bundles

- Save each bundle into the docs folder (one command per file):
  ```bash
  /bin/sh -c 'cd /Users/nickbrooks/orbit && curl -Ls https://cdn.prod.website-files.com/.../webflow.schunk.04af0614e1eac9d7.js -o orbit/docs/webflow-home-anim-1.js && echo "[done]"'
  /bin/sh -c 'cd /Users/nickbrooks/orbit && curl -Ls https://cdn.prod.website-files.com/.../webflow.schunk.3b44982be2347a20.js -o orbit/docs/webflow-home-anim-2.js && echo "[done]"'
  /bin/sh -c 'cd /Users/nickbrooks/orbit && curl -Ls https://cdn.prod.website-files.com/.../webflow.fc9b120a.cc94486327d1acb6.js -o orbit/docs/webflow-home-anim-3.js && echo "[done]"'
  ```
- `webflow-home-anim-3.js` contains the GSAP/ScrollTrigger timelines tied to `data-w-id` values; the other two files handle sliders, lightboxes, and utility interactions.

## 5. Optional GSAP Libraries

- Webflow loads GSAP from its CDN. Provide these links (or download equivalents) if the build environment can’t access the CDN:
  - `https://cdn.prod.website-files.com/gsap/3.13.0/gsap.min.js`
  - `https://cdn.prod.website-files.com/gsap/3.13.0/ScrollTrigger.min.js`
  - `https://cdn.prod.website-files.com/gsap/3.13.0/SplitText.min.js`

## 6. Hand-Off Notes for Codex

- `webflow-home.html`: Inspect `data-w-id` attributes to map animation targets.
- `webflow-home-anim-1.js` & `webflow-home-anim-2.js`: Slider/lightbox/utility behaviors.
- `webflow-home-anim-3.js`: GSAP timelines and ScrollTrigger configurations (primary animation logic).
- Mention these files in `codex-instructions.md` so the agent recreates animations after building the static layout.
