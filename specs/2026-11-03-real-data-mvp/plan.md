# Real Data Migration — Plan

## Group 1 — Audit the Current Content Model
1. Review the existing `events` and `places` tables, migration files, and related UI assumptions so the real-data work fits the current app structure.
2. Confirm the required fields the app relies on today: title, summary, date, location, status, free/booking notes, and links where relevant.
3. Identify the minimum real-data set needed for an MVP and map it to the existing product pages.

## Group 2 — Define a Reliable Source Strategy
1. Use a small set of official Barcelona sources as the primary evidence base: MACBA, MUHBA, CaixaForum, and the Barcelona city agenda / cultural guides.
2. Prefer sources with clear dates, location information, and accessibility or free-entry notes so the app stays trustworthy.
3. Use a short list of real records for the MVP rather than a broad crawl: a handful of museums, galleries, and free cultural events is enough to validate the product experience.
4. If internet access is blocked or scraping is not practical, ask the user for a curated list of URLs, CSV entries, or a short dataset to import.
5. Document the chosen source(s) and the expected fields to avoid inconsistent data quality.

### Candidate MVP data sources
- MACBA (Museum of Contemporary Art of Barcelona) for real exhibitions and special events
- MUHBA / Barcelona municipal history sites for free access and cultural context
- CaixaForum Barcelona for free-entry cultural programming and architecture-led public events
- Barcelona.cat agenda / Guia BCN for citywide, real-time events and community programming

### Candidate MVP records
- MACBA: modern art exhibition or guided event with a date, location, and free/booking notes
- MUHBA: a historical site or public cultural walk with clear open hours and relevant location data
- CaixaForum Barcelona: a public cultural event or exhibition with a free-entry or low-friction schedule
- Barcelona city agenda: one additional free public event with a real date and neighborhood location

## Group 3 — Define the Data Contract for MVP
1. Establish a minimum record shape for event and place entries that matches existing route and page rendering.
2. Add a small set of real records that cover the key experience: at least a few free cultural events and a few places with real context.
3. Ensure each record includes enough metadata to render cleanly in list and detail views without placeholder content.
4. Keep the schema stable while the app moves from curated seed data to real-world content.

## Group 4 — Build the Ingestion and Migration Flow
1. Use the existing migration pattern and SQLite approach so changes are explicit, repeatable, and easy to review.
2. Add a lightweight import or manual migration path that can replace or supplement the seeded records without rewriting the rest of the app.
3. Keep the migration and data maintenance process simple enough to run locally and explain to a future contributor.
4. If a full automated scraper is not in scope for the MVP, prioritize a curated import script or hand-maintained JSON/SQL update flow.

## Group 5 — Update the Data Layer and UI
1. Replace or overwrite the seed content with the curated real-data set, but preserve the app's current route and page structure.
2. Verify that event and place list pages still render correctly with the new data and that detail pages show the proper metadata.
3. Ensure all fields that the app currently expects are present and readable: status, free/booking notes, dates, locations, and descriptions.
4. Keep the pages clear, trustworthy, and easy to scan even when real data varies in quality across sources.

## Group 6 — Automated and Manual Validation
1. Run the existing TypeScript and Vitest checks to confirm no regressions in the app after replacing the seeded data.
2. Add targeted assertions for the real-data set so the app fails loudly if required fields are missing.
3. Perform a smoke-test pass on the key routes: home, events, places, and the detail pages for the real records.
4. Verify the app still feels consistent and useful to a user browsing free cultural information.
5. Confirm the update process is documented well enough for a later yearly refresh.

## Group 7 — MVP Delivery Notes
1. Treat this as a content migration milestone rather than a full data platform project.
2. Aim for a small but credible set of real events and places that make the app genuinely useful.
3. Keep the implementation realistic for the current stack: explicit SQLite migrations, lightweight import scripts, and readable content.
4. Document the source list and refresh path so future contributors can update the catalog without extra context.
