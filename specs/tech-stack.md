# FreeInBarna Technical Stack

FreeInBarna is a server-side TypeScript application. All rendering happens on the server, and the browser receives plain HTML that is fast, accessible, and easy to style. This keeps the product simple, reliable, and well-suited to a catalog of free cultural events and places.

## Core

| Layer | Choice | Rationale |
| --- | --- | --- |
| Language | TypeScript | Type safety end-to-end; satisfies Mary's requirement |
| Runtime | Node.js | Stable, well-supported, vast ecosystem |
| Server framework | Hono | Lightweight, TypeScript-first, fast, excellent DX; routes and middleware feel natural |
| Templating | Hono JSX (server-side) | JSX without React overhead; components are just functions |
| CSS | Plain CSS + CSS custom properties | No build step required; Steve gets a modern, attractive result |

## Recommended: Hono

Hono is chosen over Express or Fastify because it is:

- TypeScript-first with minimal setup
- built for server-rendered HTML workflows
- easy to compose with middleware and route handlers
- portable across Node, Deno, Bun, and edge runtimes

## Data

- SQLite via `better-sqlite3` for local development and early production
- plain SQL migrations for schema changes
- no ORM at this stage to keep the stack simple and explicit

## Testing

- Vitest for fast, TypeScript-native unit and integration tests

## Tooling

- `tsx` for local development and TypeScript execution
- `tsc` for production builds
- `prettier` for formatting

## What We Are Not Using

- No React, Vue, or Svelte
- No ORM
- No Docker for the MVP

## Architectural goals

- Server-rendered HTML for simplicity, speed, and accessibility
- TypeScript-based reliability to reduce runtime errors and improve maintainability
- A dashboard-oriented interface for quick browsing of free activities and museum details
- A small, incremental architecture that supports early validation before wider expansion

## Design considerations

- Favor a straightforward, modern visual style that meets Steve's expectation for attractiveness
- Keep the first release polished and easy to use without overbuilding infrastructure
- Maintain predictable component structure so the app can grow from a catalog into richer museum and event experiences

## MVP implementation direction

The first version should be a lean TypeScript application that focuses on:

- a landing page and backend-driven layout
- searchable or filterable free cultural listings
- event and place detail pages
- museum-specific metadata such as free days and schedules
- appointment requirement indicators
- responsive browser support across modern devices
