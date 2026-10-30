# Places Catalog — Validation

## Definition of done
All of the following must be true before this branch is merged.

### 1. TypeScript baseline is clean
```bash
tsc --noEmit
```
This must exit with code 0 and show no TypeScript errors.

### 2. Automated tests pass
```bash
npm test
```
The test suite must pass and include coverage for:
- the `places` seed data and database integrity,
- the `/places` route response,
- rendered content for the places catalog,
- and any detail route behavior included in scope.

### 3. Places list renders successfully
The server must respond with HTTP 200 for `/places` and the HTML must include expected place names and visible access metadata.

### 4. Place detail page works when included in scope
If a detail route is implemented, it must return the expected place data for a known id and show the venue’s key information clearly.

### 5. Users can understand free access and booking requirements
The page should clearly communicate whether a place is free, whether access is daily or restricted by days, and whether an appointment or booking is required. The user should not have to infer this from vague text.

### 6. The experience remains responsive and readable
The pages should remain legible at small screen sizes without layout overflow, broken cards, or unclear grouping.

## Vitest test expectations
The implementation should add automated checks that confirm:
- the `places` table contains expected seeded records with valid required fields,
- the `/places` route returns the list page and includes expected titles,
- the rendered HTML contains visible place details relevant to a user,
- the page remains stable when the route and database data are used together.

## Manual smoke test checklist
- [ ] Start the app successfully.
- [ ] Visit `/places` in the browser.
- [ ] Verify the list page renders with the seeded places and core metadata.
- [ ] Check that the page clearly communicates free access or booking requirements.
- [ ] Open a known place detail page if implemented.
- [ ] Confirm the selected place’s name, location, and access details appear correctly.
- [ ] Inspect the layout on a narrow viewport to ensure it remains readable and mobile-friendly.
- [ ] Confirm no placeholder content, broken links, or empty fields remain.

## Merge criteria
The feature is ready to merge when:
- the TypeScript check passes,
- the test suite passes,
- the places catalog renders valid seed data,
- the metadata remains clear and practical for the user,
- and the implementation stays consistent with the mission of making free cultural discovery easier and more trustworthy.

## Exit conditions
This phase is complete only when the app has a working places catalog experience backed by plain SQL migrations, a repeatable startup bootstrap, and reliable validation through both automated tests and a manual smoke test.
