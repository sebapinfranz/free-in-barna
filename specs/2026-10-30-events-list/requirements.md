# Events List — Requirements

## Feature name
Events List

## Source phase
This work corresponds to Phase 3 in [specs/roadmap.md](../roadmap.md): "Events List".

## Purpose
The goal of this phase is to make free cultural activities discoverable in a simple catalog. Users should be able to browse the current set of Barcelona events and understand at a glance where they are, when they happen, and whether they require booking or preparation.

## Mission alignment
This feature directly supports the FreeInBarna mission: making free culture easier to discover and easier to trust. It reduces friction for local residents and visitors who want to find open, free cultural experiences without searching across disconnected websites.

## Scope
In scope:
- A SQLite-backed `events` table with realistic seed data for Barcelona.
- A server-rendered `/events` page showing a list of events.
- A server-rendered `/events/:id` detail page for a single event.
- Basic metadata such as title, date, location, status, and appointment requirement.
- Responsive HTML that remains easy to read on mobile and desktop.
- Simple linking between the list and detail views.

Out of scope:
- The full places catalog or event-to-place linking.
- Advanced search, filters, or multi-criteria query logic beyond a minimal sorting or browsing UX.
- User accounts, admin tools, or content editing flows.
- Payment, ticketing, or commerce workflows.
- Extensive visual polish beyond the mobile-first readable layout.

## Decisions
- Use SQLite for the first data layer because it is already aligned with the technical stack and keeps the project lightweight.
- Use plain SQL migration files, named in order such as `001_create_events.sql`, and run them via a simple startup bootstrap script so the schema is applied deterministically before the app serves requests.
- Keep rendering server-side with Hono JSX to match the architecture and avoid unnecessary frontend complexity.
- Use PicoCSS for UI styling so the app gets a modern, polished baseline without a heavy CSS build pipeline or custom design system.
- Prioritize clarity and trustworthiness over advanced search features in the first version.
- Build the event list and detail flow as the foundational content experience before adding richer place and event relationships in later phases.

## Context
The product roadmap intentionally moves from app foundation to content browsing. Event data is the first meaningful product domain for FreeInBarna and the first place where the app begins to serve a real user need. This phase establishes the core browsing model that later phases will extend with richer details, place metadata, and a more polished experience. The database layer should remain explicit and dependable: migration files are plain SQL, run in sequence at startup, and are easy to inspect or repair as the schema evolves. The presentation layer should stay lightweight and modern by using PicoCSS for consistent layouts, type scales, spacing, and form-like content blocks.
