# SVS Polymer Website

A React + TypeScript website for SVS Polymer, built with Vite, Tailwind CSS, and shadcn/ui components.

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- React Router

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

## Project Structure

- src/components/home/
- src/components/layout/
- src/components/ui/
- src/hooks/
- src/lib/
- src/pages/
- src/App.tsx
- src/main.tsx

## Deployment

Build the project:

```sh
npm run build
```

The production output will be generated in the `dist/` directory and can be deployed to any static hosting provider.

## Notes

- Public assets are stored in the `public/` directory.
- Route pages are located in `src/pages/`.
- Shared UI primitives are in `src/components/ui/`.
