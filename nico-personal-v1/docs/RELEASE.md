# Pre-launch release preparation

Stable checkpoint: `57c7bf3`, tag `pre-launch-stable`.

## Completed

- Five Selected Work covers are stored locally under `public/assets/selected-work/`. Four YouTube thumbnails are valid 1280×720 max-resolution files.
- Original Instagram screenshot copied unchanged; SHA-256 verified against the supplied file. The CSS 3:4 frame uses object-position 50% 35%, preserving the creator, fridge and purple tray without stretching. Confirmed 800K+ metric unchanged.
- Cover and VIEW WORK links use new tabs and noopener/noreferrer. All five VIEW WORK clicks tested and navigated to the exact requested URLs, including the third video's timestamp. Playback/login requirements remain controlled by the source platforms.
- Lazy covers do not exist in the DOM before the modal opens. Valid alt text, light 1.025 cover hover and 44px link hit targets added. KOC tags added without metrics.
- Desktop 1440×900 / 1920×1080 and mobile 390×844 screenshots checked. No broken covers, modal horizontal overflow or page errors. Sticky close and body-scroll restoration verified. AI and Ending designs unchanged.
- Production build and TypeScript check passed. No npm lint script exists. Visual lint run; existing animated-crop and decorative-image warnings plus low-contrast pink display emphasis are unchanged, not a clean accessibility audit.

## Deployment configuration

Vercel preset Vite; root `nico-personal-v1` when importing the enclosing Git repository; install `npm install`; build `npm run build`; output `dist`. `vercel.json` includes SPA fallback without adding a router. No secret environment variables or paid domains are needed.

## Pending external steps

Vercel browser currently requires login. GitHub connector recognizes the owner account but reports no accessible repositories; local Git has no remote or authenticated account. Await a target repository URL and Vercel authorization before pushing/importing. No production URL or automatic deployment is claimed yet.

After setup: edit → local review → commit → push production branch → automatic Vercel deployment. Keep source assets in Git; exclude node_modules, dist, credentials, temporary logs and reference/QA screenshots.
