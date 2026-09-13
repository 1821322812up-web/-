# Nico Cao — Personal Website

React + Vite + TypeScript + GSAP. Personal portfolio, with locally stored covers and no runtime thumbnail-server dependency.

## Local review

```sh
npm install
npm run build
npm run preview -- --host 0.0.0.0 --port 4173
```

## GitHub → Vercel

Import the GitHub repository in Vercel. This app lives in `nico-personal-v1`, so set **Root Directory** to `nico-personal-v1` when importing the enclosing repository. Framework: Vite; install: `npm install`; build: `npm run build`; output: `dist`. No environment secrets are required. Use the free personal plan and a Vercel-provided domain; no paid custom domain is configured.

The Git integration must be authorized and connected before automatic deployments work. Production URL is not assigned yet.

After connection: edit → local review → commit → push the configured production branch → Vercel automatically builds and deploys. Do not upload `dist` manually. For previews, use another branch and a pull request.

## Assets and data

Selected Work covers: `public/assets/selected-work/`. Four official YouTube max-resolution thumbnails and the user's original Instagram screenshot. The screenshot is not altered on disk; a 3:4 CSS viewport frames the creator, fridge and popsicle tray. Portfolio metrics remain user-confirmed figures, independent of current platform counters.

Case copy and media mappings: `src/data/experience.ts`. No resume PDF, credentials, local QA logs or reference screenshots belong in the published repository.

Stable pre-cover snapshot: Git tag `pre-launch-stable`.
