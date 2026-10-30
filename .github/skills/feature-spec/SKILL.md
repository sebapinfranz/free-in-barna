---
name: feature-spec
description: "Use when: starting a new feature spec, identifying the next roadmap phase, creating a feature folder under specs, and turning product goals into a plan, requirements document, and validation checklist."
---

# Feature spec skill

Use this skill when the repository needs a new feature specification derived from the roadmap and grounded in the product mission and technical stack.

## Goal
Create a focused specification package for the next product feature without rushing into implementation. The work should be reviewable, scoped, and aligned with the repository's mission and technical standards.

## Required workflow

1. Read `specs/roadmap.md` and identify the next not-yet-completed phase.
2. Read `specs/mission.md` and `specs/tech-stack.md` to confirm product intent, audience, and technical constraints.
3. Before writing any files to disk, use the `AskUserQuestion` tool with a single grouped set of exactly 3 questions:
   - What should this feature be called, and what problem does it solve?
   - What should be in scope for this feature, and what should stay out of scope?
   - How will we know the feature is complete and ready to merge?
4. Wait for the user's answers before continuing.
5. Create a git branch using the current date and a short feature slug, for example:
   `git checkout -b feature/2026-10-30-events-detail`
6. Create a new directory named `specs/YYYY-MM-DD-feature-name/` for the feature work.
7. Inside that directory, create these files:
   - `plan.md` as a numbered list of task groups
   - `requirements.md` for scope, decisions, and context
   - `validation.md` for how to know the implementation succeeded and can be merged
8. Keep the content aligned with the mission and technical stack docs, and avoid unrelated expansion.
9. Finish with a concise summary of the selected roadmap phase, the branch name, and the main decisions captured in the spec.

## File expectations

### `plan.md`
- Use numbered task groups, such as:
  1. Discovery and data model
  2. UI and interaction design
  3. Validation and regression checks
- Keep each group action-oriented and implementation-ready.
- Prefer practical steps over abstract planning language.

### `requirements.md`
- State the feature goal and why it matters to the user.
- Include in-scope and out-of-scope items.
- Record key product decisions, assumptions, and technical constraints.
- Reference the mission and stack guidance where relevant.

### `validation.md`
- List concrete checks that prove the feature works.
- Define a clear merge bar for code review and QA.
- Include both manual and automated validation where appropriate.
- State what success looks like in user-facing terms.

## Rules
- Do not create the feature directory before the grouped 3-question prompt has been answered.
- Do not write any spec files before the `AskUserQuestion` call is complete.
- If there is no next roadmap phase, explain that clearly and stop instead of inventing one.
- Keep the feature focused on the repository's mission: discover free cultural activities easily, reliably, and clearly.
- Favor repository-friendly, concise writing over long, generic project-planning prose.
