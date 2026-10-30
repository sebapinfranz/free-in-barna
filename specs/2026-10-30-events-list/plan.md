# Events List — Plan

## Group 1 — Data Model and Seed Data
1. Add the `events` table to SQLite using plain SQL migration files, for example `001_create_events.sql` and any follow-up migration files needed for schema changes.
2. Place migration files in a dedicated SQL directory and run them in numeric order via a simple startup bootstrap script so the database is ready before routes access it.
3. Seed a small set of Barcelona events such as Oktoberfest, a museum free day, and a neighborhood cultural event so the app has realistic content on day one.

## Group 2 — Data Access Layer
1. Add a small query layer for listing events in chronological order.
2. Add a query for fetching a single event by id.
3. Shape the returned data clearly so the route and page components can render it without hidden assumptions.
4. Keep the database access pattern explicit and testable, with no ORM abstraction layered on top.

## Group 3 — Route Handlers
1. Add a `GET /events` route that loads the event list and renders the catalog page.
2. Add a `GET /events/:id` route that loads a single event and renders the detail page.
3. Ensure both routes keep server-rendered HTML output and simple error handling for missing records.

## Group 4 — Event List UI
1. Create an `Events` page component that renders each event as a card or row with title, date, location, and status.
2. Use PicoCSS utilities and semantic HTML to keep the catalog modern, readable, and consistent without custom CSS bloat.
3. Add clear labels for free access, appointment requirements, and event timing.
4. Include a link from each card to its detail page.
5. Keep the layout mobile-first and easy to scan at small breakpoints.

## Group 5 — Event Detail UI
1. Create the single-event page with a clear heading, date, location, status, and description.
2. Use PicoCSS layouts and forms-style styling to present event metadata clearly and consistently.
3. Surface booking or appointment notes prominently so users know whether they need to plan ahead.
4. Include a simple navigation action back to the list view.
5. Confirm the page remains readable and stable across common browser widths.

## Group 6 — Automated and Manual Validation
1. Run `tsc --noEmit` and confirm the app compiles cleanly with no errors before merging.
2. Add Vitest tests for database seed integrity, route responses, and rendered HTML content.
3. Run `npm test` and confirm the event list and event detail flows pass the test suite.
4. Perform a manual smoke-test checklist: start the server, hit each URL, and verify pages render with the expected seeded data.
5. Confirm the detail route returns the correct event data for a known id and the page loads without errors.
