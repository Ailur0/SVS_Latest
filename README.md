# SVS Polymer Website

A React + TypeScript website for SVS Polymer, built with Vite, Tailwind CSS, and shadcn/ui components. Deployed on Vercel at [www.svspolymerinds.com](https://www.svspolymerinds.com).

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- React Router
- Decap CMS (content editing, see below)

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Install and Run

```sh
npm install
npm run dev
```

The app runs locally on [http://localhost:8080](http://localhost:8080) by default.

## Available Scripts

- `npm run dev`: Start development server.
- `npm run build`: Build production bundle.
- `npm run build:dev`: Build in development mode.
- `npm run preview`: Preview production build locally.
- `npm run lint`: Run ESLint.
- `npm run cms`: Start the local Decap CMS proxy (`decap-server`) for editing content without GitHub login — see [Content & CMS](#content--cms).

## Project Structure

- `src/components/home/`
- `src/components/layout/`
- `src/components/ui/`
- `src/hooks/`
- `src/lib/`
- `src/pages/`
- `src/data/` — typed loaders that read `content/` at build time
- `src/App.tsx`
- `src/main.tsx`
- `content/` — blog posts, products, and page copy (edited via `/admin` or by hand)
- `public/admin/` — Decap CMS configuration (`config.yml`) and admin UI
- `api/` — Vercel serverless functions (GitHub OAuth for the CMS)

## Content & CMS

Blog posts, products, and static page copy live as data files under `content/` and are loaded at build time (`src/data/*.ts`), not fetched at runtime — this keeps everything statically baked into the site for SEO.

- `content/blog/*.md` — blog posts (frontmatter + markdown body)
- `content/products/*.md` — product catalog
- `content/pages/*.json` — About / Quality / Customization / Contact page copy

These can be edited directly as files, or through **Decap CMS** at `/admin` — a dashboard non-technical staff can use without touching code or git.

### Editing content locally (no GitHub login needed)

```sh
npm run dev   # terminal 1 — the site itself
npm run cms   # terminal 2 — local CMS proxy (decap-server)
```

Then open `http://localhost:8080/admin/index.html` and click **Login** — it reads and writes real files under `content/` on disk via the local proxy, no auth required.

### Editing content in production (`/admin`)

Requires the one-time GitHub OAuth App setup below. Editors log in with a GitHub account that has collaborator access to this repo; every save is a real git commit to `main`, which triggers a Vercel redeploy.

### One-time setup: GitHub OAuth App

Decap's GitHub backend needs an OAuth App so editors can log in. This repo already includes the two serverless functions that handle the exchange (`api/auth.ts`, `api/callback.ts`) — you just need to register the app and set two environment variables.

1. Go to [github.com/settings/applications/new](https://github.com/settings/applications/new) (signed in to GitHub).
2. Fill in:
   - **Application name**: `SVS Polymer CMS` (anything recognizable)
   - **Homepage URL**: `https://www.svspolymerinds.com`
   - **Authorization callback URL**: `https://www.svspolymerinds.com/api/callback`
3. Click **Register application**.
4. Copy the **Client ID** shown on the app page.
5. Click **Generate a new client secret** and copy it immediately — GitHub only shows it once.
6. In Vercel → this project → **Settings → Environment Variables**, add for **Production**:
   - `GITHUB_OAUTH_CLIENT_ID`
   - `GITHUB_OAUTH_CLIENT_SECRET`
7. Redeploy (or push any commit) so the new variables take effect.
8. Visit `https://www.svspolymerinds.com/admin`, click **Login with GitHub**, and authorize the app.

Anyone who needs editor access must be added as a collaborator on this GitHub repo — Decap has no separate login system of its own.

## Deployment

```sh
npm run build
```

Hosted on Vercel, auto-deploys on push to `main`. `vercel.json` rewrites all routes to `index.html` for client-side routing (React Router), except `/admin` and `/api`.

## Notes

- Public assets are stored in the `public/` directory.
- Route pages are located in `src/pages/`.
- Shared UI primitives are in `src/components/ui/`.
