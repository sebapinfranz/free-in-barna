# Real Data Migration — Validation

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
The existing suite must continue to pass after the real-data update, and any new assertions for required records must pass as well.

### 3. The app includes real data, not only seeded demo content
The database should include a small, credible set of real events and places. At minimum the app should contain a few real entries that can be clearly identified as actual cultural offerings rather than placeholder examples.

### 4. The real data renders in list and detail views
The server must still respond successfully for the core pages:
- `/`
- `/events`
- `/events/:id`
- `/places`
- `/places/:id`

The list and detail views should include the real data fields expected by users, including titles, dates, locations, descriptions, and status notes where relevant.

### 5. The content remains trustworthy and easy to browse
The updated pages should still be legible, mobile-friendly, and clearly structured. Real-world records with inconsistent formatting should be normalized enough that the UI stays clean and understandable.

### 6. A refresh path exists
There must be a documented or script-backed way to update the data later without reworking the app architecture. The project should clearly describe where the real-data list came from and how a future contributor can refresh it.

## Vitest test expectations
The implementation should add or update automated checks to confirm:
- the database contains the required real records or a clearly documented import result,
- the application still serves the expected pages and data structures,
- required fields for real events and places are present and valid,
- a route using a known event/place id still resolves successfully,
- the HTML output still contains meaningful, user-visible content.

## Manual smoke test checklist
Use this checklist during manual validation:

- [ ] Start the app with the local dev server.
- [ ] Confirm the app starts without runtime errors.
- [ ] Open the home page and verify the app still looks coherent.
- [ ] Open `/events` and confirm the real entries appear as expected.
- [ ] Open `/places` and confirm the real venues appear as expected.
- [ ] Open at least one real event detail page and one real place detail page.
- [ ] Check that the content is readable and any availability or booking notes are clear.
- [ ] Confirm there are no broken placeholders or empty fields in the key pages.
- [ ] Review the data source and refresh notes to confirm they are understandable.

## Merge criteria
The feature is ready to merge when:
- the TypeScript baseline passes,
- the Vitest suite passes,
- the app contains a small, real-world content set that improves product usefulness,
- the real data renders correctly in list and detail pages,
- and the project includes a repeatable path for updating the data again in the future.

## Exit conditions
This phase is complete only when the product feels like a credible, locally useful free culture app rather than a seeded demo, and the data can be refreshed without rebuilding the application around a new stack.
