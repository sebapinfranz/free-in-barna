# Hello Hono — Validation

## Definition of done
All of the following must be true before this branch is merged.

### 1. TypeScript compiles cleanly
```bash
npm run typecheck
```
Must exit with code 0 and produce no errors or warnings.

### 2. Automated validation passes
```bash
npm test
```
Must exit with code 0 and run successfully via Vitest. This confirms the app has a working validation entry point and supports regression checks as the project grows.

### 3. Server starts
```bash
npm run dev
```
Must start without errors. The terminal should show the server is listening on port 3000 or the logged port.

### 4. Route returns an HTML home page
```bash
curl -s http://localhost:3000
```
HTTP status must be `200 OK`. The response body must be HTML and must contain:
- An `<h1>` element with the text `FreeInBarna`
- A short tagline describing the product; the exact wording is implementation choice

### 4. The base layout remains responsive
The generated page should include mobile-first styling and adapt cleanly at smaller screen widths without breaking the page structure or readability.

## Validation steps
- Run `npm run typecheck` and confirm the command exits successfully.
- Run `npm test` and confirm the suite passes with a real Vitest check.
- Start the dev server with `npm run dev` and confirm the server binds to a port without crashing.
- Request the home page via `curl` and verify the HTML contains the heading and tagline.
- Check that the stylesheet includes responsive rules for smaller screens.
- Confirm the app remains in the intended baseline scope for the Hello Hono phase.

## Merge criteria
The feature is ready to merge when the TypeScript check passes, the dev server starts successfully, the HTML home page loads with the expected heading, and no extra scope is introduced beyond the baseline proof-of-stack requirement.

## Exit conditions
This phase is complete only when the project has demonstrated a working Hono + TypeScript runtime and a stable starting point for Phase 2.
