# Real Data Migration — Requirements

## Feature name
Real Data Migration

## Source phase
This work corresponds to Phase 6 in [specs/roadmap.md](../roadmap.md): "Real Data Migration".

## Purpose
The goal of this phase is to replace the current seeded sample content with a small, credible set of real Barcelona events and places. The app should feel genuinely useful, not like a demo with placeholder data, while staying within the project's lightweight and pragmatic MVP constraints.

## Mission alignment
This feature directly supports the FreeInBarna mission of making free culture easier to discover and easier to trust. Better data makes the product more valuable to residents and visitors who want reliable cultural options without checking multiple sources.

## Scope
In scope:
- a small curated catalog of real events and places that matches the app's current structure
- a repeatable data update path for future refreshes
- better-than-seeded content for at least a few event and place views
- validation that the real data renders correctly in the app's list and detail pages
- documentation of trusted sources and maintenance steps

Out of scope:
- a full-on scraping pipeline or production-grade ingestion system
- user-generated content or administrative editing tools
- real-time event syncing or automatic cron jobs
- large-scale data normalization beyond the MVP needs
- expanding beyond the current product scope into bookings, subscriptions, or commerce flows

## MVP definition
The MVP should surface a realistic set of real cultural content, including at least:
- 3 real events with fields the app already understands, such as name, date, location, and status
- 3 real places with accurate names and relevant cultural metadata
- enough contextual notes to make the app useful for discovery and browsing

This is the minimum credible release to demonstrate that the app is not powered only by demos and placeholders.

## Decisions
- Keep the existing SQLite and SQL-migration approach; do not introduce a heavier stack for this feature.
- Favor trusted public sources and curated entries over broad, noisy scraping.
- Use the official Barcelona cultural ecosystem as the first source layer: MACBA, MUHBA, CaixaForum, and the Barcelona city agenda.
- Use a lightweight import or data update workflow that is small enough to maintain in a single project.
- Prioritize a handful of dependable records over a large but low-quality catalog.
- Keep the app content readable and consistent with the current server-rendered architecture.
- Treat the annual refresh problem as a product concern: the project should be able to update data without a major rewrite.
- For the MVP, prefer 3–5 real entries that are easy to verify and easy to explain in the product.

## Context
The app already has the shape needed for event and place browsing, but the current content is still seed data. That makes the experience useful for development and testing, but not yet convincing as a real product. This phase is the bridge between a working prototype and a genuinely useful local discovery app.

The real-data MVP should be credible enough to show users that FreeInBarna can surface actual cultural options in Barcelona, while still fitting the project's simple architecture and low-overhead development style. The focus is not breadth; it is trust, clarity, and a repeatable update path.

## Expected content characteristics
Real records should be:
- understandable to a user browsing the site
- clearly labeled with status or availability notes
- consistent with the app's current page layouts
- easy to maintain by a contributor without deep ORM or infrastructure knowledge

If internet access is unavailable or the data source is not easily fetchable, the project should ask the user for a curated list of real venues and events or a small dataset to import.
