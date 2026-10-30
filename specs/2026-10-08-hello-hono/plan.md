# Hello Hono — Plan

## Group 1 — Package Setup
1. Install `hono` and pin the exact version with no `^` prefix.
2. Install `tsx` as a dev dependency.
3. Verify `tsconfig.json` has `"strict": true` and a sensible `target`/`module` for Node.

## Group 2 — Application Entry Point
1. Replace the `src/index.ts` placeholder with a minimal Hono app.
2. Add a single `GET /` route returning `"FreeInBarna is ready"`.
3. Call `serve()` to bind the app to a port, defaulting to 3000.

## Group 3 — Dev and Validation Scripts
1. Add `"dev": "tsx src/index.tsx"` (or `tsx watch`) to `package.json` scripts.
2. Add `"typecheck": "tsc --noEmit"` to `package.json` scripts.
3. Add `"test": "vitest run"` and `"test:watch": "vitest"` so validation is automated and repeatable.

## Group 4 — Home Page
1. Create a Hono JSX component for the home page at `src/pages/Home.tsx`.
2. Render an `h1` with `FreeInBarna` and a short tagline.
3. Update the `GET /` route to return the rendered JSX instead of a plain string.

## Group 5 — Layout Component
1. Create `src/components/Layout.tsx` with a top-level shell (`<html>`, `<head>`, `<body>`); it imports `<Header>`, `<Main>`, and `<Footer>` from their own files.
2. Create `src/components/Header.tsx`, `src/components/Main.tsx`, and `src/components/Footer.tsx` as separate files, one component each.
3. Add a `<head>` link to `/static/style.css`.
4. Create `static/style.css` with minimal base styles.
5. Serve the `static/` directory via `@hono/node-server/serve-static` in `src/index.tsx`.
6. Update `src/pages/Home.tsx` to use `<Layout>` and place page content inside `<Main>`.

## Group 6 — Verify
1. Run `npm run typecheck` and confirm it exits with code 0 and no errors.
2. Run `npm run dev` and confirm `curl localhost:3000` returns HTML containing the heading.
3. Confirm `curl localhost:3000/static/style.css` returns the CSS file.
