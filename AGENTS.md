# Instructions for any AI coding assistant

Read HANDOFF.md, README.md, AI_CONTEXT.md and CHANGELOG.md before editing. Claude should follow these instructions too. This file is repository guidance, not app content.

## Baseline and scope
- Feature baseline: Shin routine M3.3.20, 14 habits. This package is the final 5S.2 edition with the seven revised illustrations approved by the user, including 6A and 7B. Curriculum and progress calculations remain unchanged. The M3.3.21 visual how-to prototype was shelved; do not import or resume it without a new user request.
- Work from this exact folder/ZIP, not from similarly named older releases. Start each change on a separate copy or branch.
- Make the user's requested change; avoid unrelated UI, curriculum or data changes.
- Do not claim that every legacy override is dead or that this is a full architectural rewrite. See known debt in AI_CONTEXT.md.

## Editing sources
- The files under scripts/ and styles/ are the canonical, directly loaded sources. There is no build process and no second hidden copy.
- SECTION markers name the old source location for search/provenance. They are not imports. Do not recreate all the old files.
- Classic scripts share globals. Preserve index.html script order. Do not change to modules/IIFEs or shuffle declarations without tracing dependencies.
- Many extensions capture earlier functions in aliases and wrap them. A later assignment does NOT prove the earlier function is unused. Do not delete wrappers using text search alone.
- Shared typography/components belong in design-system.css and design-system.js. Game document styling is in design-game.css. Do not reintroduce per-element runtime font scaling.
- Prefer changing the responsible source section over appending another global override. Avoid broad .x or .back rules; these class names also occur in status legends.

## Data and progress
- Storage keys must remain shin-curriculum16-v1-data, shin-curriculum16-v1-demo and shin-curriculum16-v1-mode unless a deliberate migration is part of the task.
- Preserve validation, export/import and existing data when changing schemas. Do not reset learner data or silently replace it with Demo.
- Days/opportunities, partial outcomes, weekly targets, level thresholds and XP are distinct concepts. Interface step progress must not alter learning progress.
- Notes and check-in drafts are separate from committed records. Do not change commit timing merely to match a button label.
- Tests must use isolated synthetic/Demo data, never the user's live learner profile.

## Releases and verification
- Keep APP_VER in scripts/core.js as the feature version (M3.3.20). sw.js VERSION and all local JS/CSS ?v= tags identify the cache build and must agree (currently M3.3.20-5S.2).
- Register new offline assets in sw.js CORE. Keep URLs relative so GitHub Pages subdirectories work. Keep licenses with assets.
- Run node tools/verify.mjs. Check both pages (index and habit-game), fresh/returning learner, both card faces, all 14 how-to flows, 5 lessons, custom card, goal 1–7, note/check-in drafts, save/undo, Back, import/export and offline reload.
- Prioritize 320–430px phone widths. Also test long text, reduced height/keyboard, 200% zoom, Chrome and WebKit. State honestly whether physical phones were used.
- If behavior-preserving work is requested, compare against the baseline, not just whether the new build starts.

## Handoff
- Update HANDOFF.md, AI_CONTEXT.md, CHANGELOG.md and VALIDATION.json after each completed change: feature/cache version, actual files changed, rationale, tests actually run, known limitations, next action.
- Never mark unrun tests as passed. Explain unfinished work.
- Deliver the complete folder as one ZIP, with index.html at the package root and intact assets/. Keep the file count below 100 where feasible. Do not include node_modules, browser caches, real learner exports or credentials.

## Card faces (M3.3.20)
- shinCardFaces mounts both faces once; touchFlipCard rotates their shared turner without drawCard() at completion. Do not reintroduce whole-dialog redraw for flips.
- Inactive faces are inert and aria-hidden. Use shinActivePaper() instead of the first .flow-paper; two are present.
- Each face keeps its own scroll; the illustrated back scrolls .shin-back-copy. Its illustration occupies 25% of the paper height.
- SHIN_BACK_ART contains 14 inline SVG illustrations in design-system.js. No external image assets are required. Preserve voice/Senpai data-act controls.
- SHIN_BACK_ART_VIEWBOX selects 480×220 for the seven revised artworks; other seven use the 340×150 fallback. Keep each native aspect ratio. Gradient IDs are namespaced by habit. The final approved subjects are recorded in HANDOFF.md and source-map.json; do not substitute earlier rejected candidates.
