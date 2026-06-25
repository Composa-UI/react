# Night loop log — autonomous run started 2026-06-20 (eve)

Samuel asked me to work out of the loop overnight: finish the doc passes, add the media
(AI-readable + human-beautiful specimens), then stage component rework. Methodology he set:
where Figma is thin, **infer** principled defaults; use **IBM Carbon** (read from its raw
GitHub MDX) as the oracle for *what category* of info is missing; **mark every inferred
addition** as proposed so nothing inferred reads as sourced fact.

This file is the trail to read on waking. Each pass commits separately so any batch can be
reverted independently.

## Program

1. **Spacing completeness** — relational spacing (stack/inset/inline) + property-panel
   column grid + reconcile the "no column grid" overstatement.
2. **Carbon gap-analysis sweep** — per component, diff our doc vs Carbon's raw MDX; append a
   marked *Proposed (inferred / Carbon-benchmarked)* section. Additive only — never rewrite
   the locked 4-tab prose.
3. **Media pass** — build `<Anatomy>` + `<ColorRamp>` doc helpers; wire live specimens;
   retire `[Deferred: render]` markers where a component + story exist.
4. **Component rework** — apply only unambiguous, build-verified spec→code fixes; write a
   staged plan for anything that needs your ruling.

Conventions: inferred content tagged `_(proposed)_` inline or parked under `## Open
decisions`. Every pass ends on `build-storybook` exit 0. Browser visual QA is yours
(automation is broken in this env).

---

## Log

### Pass 1 — Spacing completeness — IN PROGRESS
Findings before edits:
- **Col anomaly is a real gap.** dropdown.md import quotes UI3 verbatim: *"snap these
  controls to our flexible grid, locking to either one, two, or three columns"* — UI3 has a
  **property-panel column grid** (1/2/3 cols for inspector controls). `grid.md` overstated
  it as *"No column/layout grid exists."* True statement is narrower: no **page-layout /
  responsive** grid; thereis a property-panel column grid. Restoring it.
- **No relational-spacing doctrine.** Evidence scattered in component imports (toast zones
  8px; input↔button 8px; menu parent↔child 4px; dropdown rows 16px apart; row element gaps
  spacer-1). Carbon names these **Stack** (vertical between components) + **Inset** (padding);
  it gives a scale + proximity principle, no prescriptive numbers. Composa can be more
  prescriptive (dense desktop). Authoring a proposed stack/inset/inline layer.

**Pass 1 DONE** (commit 131a3a2): foundations-spacing.mdx gained Relational spacing
(stack/inset/inline table) + Property-panel columns + Open decisions; grid.md reconciled.
Build clean.

### Pass 2 — Carbon gap-analysis sweep — DONE
14 components diffed vs Carbon raw MDX, 3 waves of agents, all pages fetched cleanly (only
`components/menus/*` 404'd → singular `components/menu/`). Reports in `specs/_gap-analysis/`
+ `_SUMMARY.md` synthesis. Dominant finding: **we document the happy path** — read-only /
error / warning states, group semantics, validation/helper-text, and roving-focus keyboard
models are missing across most form controls. Six items need Samuel's ruling (a11y
semantics conflicts on SegmentedControl + Tooltip; modal danger variant; notification focus
model; tabs activation mode; menu danger row) — queued in `_SUMMARY.md`. Next: apply the
high-confidence additive fills (marked proposed), then the media pass.

### Pass 2b — apply fills — INTERRUPTED by usage limit (~08:11 PDT 2026-06-20)
Launched 5 fill agents (checkbox/radio/input/dropdown/switch); the session hit its usage
limit (resets 5am PDT) and they died returning 0 tokens. Partial uncommitted edits on disk:
checkbox.mdx (+10 lines — likely read-only/error state rows), iconography.mdx + sliders.mdx
(1 line each — probably junk). **On resume: `git diff` each; keep checkbox if clean,
`git checkout` iconography.mdx + sliders.mdx if junk; then redo the full fill pass.** Nothing
from 2b is committed.

### Untracked files — NOT mine, leave alone (founder's, dated 2026-06-19)
- `docs/design-system/_rework-plan.md` — Samuel's pre-sleep rework voice-dump. **Read for
  Pass 4** — names the real targets (Figma file `rMq1M35u1iyKB2QaQMipZb`, editor toolbar node
  86-5602, left rail 103-10421; shared factory.js → no parallel waves there).
- `docs/architecture/_ai-interaction-patterns.md` — founder AI-direction notes.
- `.storybook/fonts/ABCWhytePlusVariableTrial.ttf` — Whyte trial font (we moved display type
  to IBM Plex; don't re-wire Whyte without asking).
- `tools/.figma-ref/{dropdown,segmented,toggle}_*.png` — prior Figma screenshot refs.

### Resume scheduled
Two schedules set for 05:10 PDT 2026-06-21 (after the 5am limit reset): session cron
`eab0db2e` (session-only) + a disk-persistent scheduled task `composa-night-loop-resume`
(survives app restart; runs on next launch if the app was closed). Caveat: the resume uses
Claude-in-Chrome + Figma MCP — first autonomous run may pause on tool-permission prompts.
If neither fires, Samuel: say "resume the night loop" and I'll read this log + _SUMMARY.

### New capability for resume
Samuel enabled **Claude-in-Chrome** — visually verify rendered Storybook docs with it, and
**`mcp__figma__get_screenshot`** to compare components vs Figma (fileKey
`4kilp0ShQiYsoUPJdleqEH`, one page per component; node IDs in `_import/_QUEUE.md`). A prior
Figma analysis exists; improve only on concrete findings.

---

## Morning session (2026-06-20, ~08:20 PDT) — resumed live (limit reset; schedules cancelled)

- **Pass 2b DONE** (commits b3d8175 + 65ea72b): all 11 component docs got the high-confidence
  Carbon-gap fills — read-only/error/warning states, group semantics (fieldset/legend),
  validation/helper/required content, roving-focus keyboard, button loading + paired-button
  order, tabs overflow, status axis, auto-dismiss timing, truncation, live-regions. Every
  addition tagged `_(proposed)_`; the 6 ruling-required items routed to Open-decisions
  comments (still in `_gap-analysis/_SUMMARY.md`). Build clean.
- **Pass 3 (media) — Anatomy helper built + piloted** (commit 3d5cbf2): new
  `src/react/stories/_doc-helpers.js` exports `<Anatomy>` (live component + numbered marker
  pins + AI-readable `<ol>` legend + `scale` via CSS zoom). Piloted on switch.mdx (Track/Knob
  markers, label-as-accessible-name note). **Visually verified in Chrome** — renders well.
  NOTE: `.js` doc helpers must use `React.createElement` (the build does NOT transform JSX in
  `.js`; only `.mdx` compiles JSX). Switch prop is `onCheckedChange`, not `onChange`.
  ROLLOUT to other components is PENDING founder review of the shape (pilot-before-scale).
- **Autodocs-shadowing fix** (commit 43a35a5): discovered via Chrome that 8 component MDX
  whose filename ≠ their stories-file basename were stranded at secondary docs entries while
  **autodocs shadowed the default `--docs`** the sidebar links to. Renamed them
  (buttons→button, input→input-field, badges→badge, avatars→avatar, menus→menu,
  modals-dialogs→dialog, notifications→notification, visual-bells→visual-bell). Verified via
  the clean `storybook-static/index.json`: every component `--docs` now resolves to its
  curated MDX. **Mechanism: an MDX `<Meta of={X}/>` only REPLACES autodocs when the MDX
  filename matches the stories-file basename** — otherwise it becomes a secondary page and
  autodocs (global `tags=["autodocs"]` in preview.js) keeps `--docs`. Remember this for any
  new component MDX. (The running :6011 dev server may show a stale index until restarted;
  the static build is authoritative.)

### Pass 3 (media) — CALLED OFF (founder, 2026-06-20)
Founder reviewed the Switch Anatomy pilot and called off **component-specific visual
annotations** — the numbered markers crowd small dense controls and per-component placement
is fussy/low-value. Reverted (commit cece66c): `_doc-helpers.js` deleted, Switch pilot
removed. **Prose `### Anatomy` sections (text part-lists) stay** — those are normal docs, not
the annotation diagram. Don't rebuild the `<Anatomy>` helper.

### Foundation visuals — Figma-match pass DONE (2026-06-20)
Founder approved foundation/token-specimen visuals (elevation model) and asked for a full
Figma-match pass. Pulled each Figma frame via `get_screenshot`, compared to our render in
Chrome, aligned, build-verified + screenshot-verified each, committed per foundation:
- **iconography** (6dde82b): size-scale + 3 sizing-guide templates ← Figma "Icon Guidelines" 1:542181.
- **typography** (5dc6107): two-column role+description layout, per-role descriptions, Body
  Strong specimens beside regular ← Figma type frame 1:547050. Plex kept for display (intentional).
- **spacing** (c6b7c32): per-token example is now a square swatch (2D increment) ← Figma 1:530453.
- **sizing/radius** (1cd743e): added the concentric radius-nesting visual (5+8=13) ← Figma 1:530546.
- **colors**: NO change needed — already renders every role category Figma has (Text/Icon/
  Background/Border/Status/Modes) as light+dark swatches. Composa is **semantic-only**: the
  `--figma-composa-color-*` tokens mirror the semantic names, there is **no primitive ramp
  layer** to render, so Figma's "System Overview" ramps don't map to our token model. The
  earlier "beautiful ramps" idea would require inventing a primitive scale we don't ship.
- **elevation**: already founder-approved (live shadow cards) — left as-is.
Verification note: the running :6011 dev server's MDX HMR worked for these; renames from
earlier still need a dev-server restart for those component URLs.

### Still open (need founder)
- The **6 rulings** in `_gap-analysis/_SUMMARY.md` (SegmentedControl a11y; Tooltip vs
  Toggletip; modal danger variant; notification focus model; tabs activation; menu danger row).
- **Pass 4 component rework** per `docs/design-system/_rework-plan.md` (separate Figma file
  `rMq1M35u1iyKB2QaQMipZb`; editor toolbar/left-rail; shared factory.js — NOT started;
  confirm scope before editing the factory).
