---
name: changelog-maintainer
description: Maintain a dated project changelog from git history before merges.
---

# Changelog maintenance skill

Use this skill before merging work so the project keeps a clear, dated changelog of completed changes.

## Goal
Keep the root CHANGELOG.md file organized by date and summarizing significant project progress in short bullet points.

## Workflow
1. Check whether CHANGELOG.md exists at the repository root.
2. Inspect recent git history with:
   `git --no-pager log --date=short --pretty=format:'%ad %h %s' --decorate`
3. If the file does not exist, create it with a top-level `# Changelog` heading.
4. For each unique date in the commit history, create a `## YYYY-MM-DD` section.
5. Add bullet points under each date, using short summaries of the commit messages.
6. Keep entries in reverse chronological order (newest first).
7. If the changelog already exists, append only new, not-yet-recorded items.
8. Avoid raw commit hashes and keep the summary readable for project stakeholders.
9. Prefer action-oriented bullets such as `feat: add responsive layout` or `docs: capture testing workflow`.
10. Refresh the changelog before merge and keep it consistent with the current branch history.

## Formatting rules
- Use a single `# Changelog` heading at the top.
- Use `## YYYY-MM-DD` headings for each date.
- Use `-` bullets underneath each date heading.
- Keep bullets brief and user-facing.
- Do not repeat the same entry twice.

## Example

# Changelog

## 2026-10-30
- feat: add testing and validation scripts
- feat: improve mobile responsiveness

## 2026-10-27
- docs: add project specs
