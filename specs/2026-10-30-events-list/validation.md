# Events List — Validation

## Definition of done
All of the following must be true before this branch is merged.

### 1. TypeScript baseline is clean
```bash
tsc --noEmit
```
This must exit with code 0 and show no TypeScript errors.

### 2. Vitest validation passes
```bash
npm test
```
The test suite must pass and include coverage for the following behaviors:
- database seed data integrity for the seeded events,
- route responses for `/events` and `/events/:id`,
- rendered HTML content for event list and event detail pages.

### 3. Event list route renders successfully
The server must respond with HTTP 200 for `/events` and the HTML must include seeded event data such as a title or recognizable event field.

### 4. Event detail route renders correctly
The server must respond with HTTP 200 for `/events/:id` for a known event id, and the HTML must include the event's title and core metadata.

### 5. Event data is displayed clearly
The page should expose the core event fields in a clear, readable format: title, date, location, status, and appointment requirement notes. The user should not have to guess whether an event is free or requires planning ahead.

### 6. The experience remains responsive and readable
The pages should remain legible on mobile viewports and not break the layout with overflow or awkward stacking. PicoCSS should provide a clean, consistent visual rhythm without custom CSS conflicts.

## Vitest test expectations
The implementation should add automated tests that confirm:
- the SQLite seed data contains the expected number of Barcelona events and valid required fields,
- the `/events` route returns the list page and includes expected titles,
- the `/events/:id` route returns the correct event details for a valid id,
- the rendered HTML contains the visible event content expected by the user.

## Manual smoke test checklist
Use this checklist during manual validation:

- [ ] Start the app with the dev server.
- [ ] Confirm the server starts without runtime errors.
- [ ] Open `/events` in the browser or via an HTTP request.
- [ ] Verify the page renders with seeded event titles and basic metadata.
- [ ] Open a valid detail URL such as `/events/1`.
- [ ] Verify the selected event's name, date, location, and status appear in the page.
- [ ] Confirm appointment or booking notes are displayed when relevant.
- [ ] Check the layout on a narrow viewport to ensure the content remains readable and mobile-friendly.
- [ ] Confirm the page content matches the expected seeded data and no broken placeholders remain.

## Merge criteria
The feature is ready to merge when:
- the TypeScript baseline passes with `tsc --noEmit`,
- the Vitest suite passes for database, route, and HTML validation,
- the event catalog renders seeded data,
- the detail page works for a known event,
- and the content stays aligned with the mission of making free cultural discovery trustable and easy.

## Exit conditions
This phase is complete only when the app has a working event catalog experience backed by plain SQL migrations, a repeatable startup bootstrap, and reliable validation through both automated tests and a manual smoke test.
