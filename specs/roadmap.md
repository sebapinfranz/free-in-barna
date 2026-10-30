# FreeInBarna Roadmap

## Phase 1 — Hello Hono (Complete)
- Install and configure Hono with `tsx` dev server
- Single `/` route returning "FreeInBarna is ready"
- Confirm TypeScript types work end-to-end
- Verified with a working local app shell and successful TypeScript check

## Phase 2 — Base Layout (Complete)
- Server-side JSX layout component (header, nav, main, footer)
- Basic CSS (custom properties, reset, typography, responsive rules)
- All routes render inside the shared layout
- Layout is mobile-first and adapts cleanly to larger screens

## Phase 3 — Events List (In Progress)
- SQLite database + first migration (`events` table)
- Seed a handful of events happening in Barcelona for October (e.g.: Oktoberfest, 48hs Open House)
- `/events` page listing all events

## Phase 4 — Events Detail
- `/events/:id` page showing a single event's profile
- Name, date, current status, location, needs appointment, more info

## Phase 5 — Places Catalog
- `places` table + seed data (e.g., "CaixaForum", "Pedralbes Monastery")
- `/places` list page
- Link events can also be linked to one or more places (for example, La Mercé is an event where you can go to CaixaForum for free)
- Name, location, days when free, needs appointment, more info

## Phase 6 — Polish & Accessibility
- Responsive layout for Steve's modern-browser requirement
- Semantic HTML audit
- Keyboard navigation and focus styles

## Phase 7 — Hardening
- Error pages (404, 500)
- Basic logging middleware
