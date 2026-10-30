# Places Catalog — Plan

## Group 1 — Data Model and Seed Data
1. Add a `places` table to SQLite with fields for name, short description, location, free days or access notes, appointment requirement, and a link to more information.
2. Add a follow-up migration if any schema constraints or indexes are needed for stable sorting and lookup.
3. Seed a small set of Barcelona places such as CaixaForum, Pedralbes Monastery, and other free cultural locations so the page has realistic sample content.
4. Keep the data model explicit and easy to query from the server without introducing an ORM or extra layers of abstraction.

## Group 2 — Data Access Layer
1. Create a query for listing all places in a sensible order for browsing.
2. Add a query for fetching a single place by id, if the detail page is included in the phase scope.
3. Ensure every field needed by the UI is returned in a predictable shape.
4. Keep the query layer simple and testable so future enhancements can build on it without rework.

## Group 3 — Route Handlers
1. Add a `GET /places` route that loads the catalog and renders a place list page.
2. If detail pages are in scope, add a `GET /places/:id` route for a single place profile.
3. Keep server-rendered HTML and friendly error handling for missing records.
4. Preserve the project’s simple server-rendered architecture rather than shifting to a client-side app.

## Group 4 — Catalog UI
1. Create a page component that renders each place as a readable card or list item with name, location, free-day or access notes, and appointment status.
2. Use semantic HTML and the project’s styling conventions so the catalog is clear, mobile-friendly, and easy to scan.
3. Call out appointment requirements and free-access details prominently so users can understand whether the place is accessible immediately.
4. Add a clear link from each item to its detail view when the detail page is implemented.
5. Keep the layout consistent with the existing app shell and avoid introducing unnecessary custom styling complexity.

## Group 5 — Detail and Relationship View
1. Build a single-place page that summarizes essential metadata: name, location, free-day availability, appointment rules, and more information.
2. If time allows and the requirement calls for it, show how an event can connect to a place or a place can be linked to relevant cultural experiences.
3. Make the information trustworthy and easy to read, with explicit labels rather than vague descriptions.
4. Keep the detail experience focused on clarity and practical planning.

## Group 6 — Validation and Merge Readiness
1. Run `tsc --noEmit` and confirm the codebase still compiles cleanly.
2. Add Vitest checks for database seed data, route responses, and rendered content for the places catalog.
3. Run `npm test` and confirm the new coverage passes with no regressions to the event flows.
4. Perform a manual smoke test by starting the app, visiting `/places`, and verifying each item loads with expected content.
5. Confirm the page remains readable and stable across mobile and desktop widths before merge.
