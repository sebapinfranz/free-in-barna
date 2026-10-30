# Places Catalog — Requirements

## Feature name
Places Catalog

## Source phase
This work corresponds to Phase 5 in [specs/roadmap.md](../roadmap.md): "Places Catalog".

## Purpose
The goal of this phase is to make cultural venues and places easier to browse in a simple catalog. Users should be able to discover where free cultural activities take place, what the place is, when it is free, and whether they need to book ahead.

## Mission alignment
This feature supports the product’s mission by helping people discover free cultural options with confidence. It turns FreeInBarna from a list of events into a more complete local discovery experience that combines event and venue information in a way that feels trustworthy and easy to navigate.

## Scope
In scope:
- A SQLite-backed `places` table with realistic seed data.
- A server-rendered `/places` list page for browsing places.
- A place profile page if the implementation adds a detail view for individual venues.
- Clear metadata such as name, location, access notes, days when free, and appointment requirement.
- Responsive, accessible HTML that remains easy to read on mobile and desktop.
- A simple relationship layer between events and places where it provides useful context, if scope allows.

Out of scope:
- A full map, geolocation, or search-by-distance experience.
- User accounts, reviews, or content management.
- Booking workflows or commerce features.
- A full location graph or advanced relationship model beyond the initial simple linking model.
- Overbuilt design systems or client-side app logic.

## Decisions
- Use SQLite and plain SQL migrations for the data layer, consistent with the current stack and repository conventions.
- Keep the feature server-rendered to align with the technical stack and maintain a simple architecture for the MVP.
- Prioritize clarity over complexity: the catalog should answer the most important user questions quickly.
- Use explicit labels for free days, appointment requirements, and access notes so users understand practical planning constraints.
- Keep the first version focused on a basic catalog that is easy to extend in later phases.

## Context
The roadmap moves from events to places so the product can present a richer picture of free cultural discovery. The event list establishes the activity layer; the places catalog adds the venue layer. Together, they create a stronger understanding of where cultural experiences happen and whether they require planning. This phase should remain grounded in the project mission: free culture should be visible, understandable, and dependable without forcing users to cross-check multiple sources. The implementation should stay modest and explicit, with practical field names and readable output rather than an overengineered data model.
