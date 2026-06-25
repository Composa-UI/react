# Import queue — Figma guideline pages → specs/_import/

fileKey: `4kilp0ShQiYsoUPJdleqEH`. 1:1 faithful import (see `_PLAN.md`); re-org into tabs later.
Status: `pilot` (validating format) · `queued` (fan out after pilot) · `done` · `have` (already curated).

## Visual foundations
| Topic | Entry node | Status |
|---|---|---|
| Iconography (uses Material Symbols, not Figma assets) | 2656:34014, 2656:34013, 2656:34012 | pilot |
| Cursors | 2012:308131 | queued |

## Components
| Topic | Entry node | Status |
|---|---|---|
| Buttons | 2012:46721 | pilot |
| Switches | 2015:24606 | pilot |
| Avatars | 2012:31795 | queued |
| Badges | 2012:34868 | queued |
| Checkbox | 2012:55362 | queued |
| Comments | 2012:56281 | queued |
| Dropdown | 2327:48576 | queued |
| Input | 2028:75376 | queued |
| Menus | 2327:95726 | queued |
| Modals / dialogs | 2028:91765 | queued |
| Notifications | 2028:111193 | queued |
| Radio | 2015:20311 | queued |
| Segmented control | 2015:20827 | queued |
| Sliders | 2015:23027 | queued |
| Tabs | 2015:27601 | queued |
| Tooltip | 2015:39039 | have (curated: atoms/tooltip.md) |
| Visual Bells | 2015:40421 | queued |

## Curated foundations (target shape — do not re-import)
typography (1:547050) · grid (1:530439) · color (2012:298199). elevation: values in hand, spec pending.

## Still need entry nodes from founder
accessibility · borders · opacity

## Import sweep result (2026-06-20)

All 18 guideline pages imported to `specs/_import/` and committed.

- **Complete:** badges · buttons · checkbox · comments · dropdown · iconography · input ·
  radio · segmented-control · sliders · switches · tabs
- **Partials — ALL RESOLVED (re-run 2026-06-20, throttled 3-at-a-time):** avatars ·
  cursors · menus · visual-bells filled their blocked sections; modals-dialogs verified
  already-complete. menus/cursors re-runs also CORRECTED wrong metadata guesses (menus
  section titles; cursor chat heading + ramp tokens). The only markers left anywhere are
  intentional `[Deferred: render]` *visual* specimens — for the rendering phase, not gaps.
  (`input` redline row-label strings still deferred — minor.)

**Import phase: COMPLETE — 19 pages fully captured** (18 component/foundation + elevation),
plus 3 curated foundations (typography/grid/color) + the tooltip atom. Next: the
content-preserving re-org into Storybook DocTabs (Switch pilot done, awaiting verify).

### Re-run plan (throttled)
- Re-fetch ONLY the `[Blocked:]` / `[Deferred: verbatim]` / `[metadata-only]` node ids
  flagged inside each partial file. 1–2 agents at a time, sequential — **never** a big
  parallel burst (that caused both the MCP rate-limit AND the root-volume ENOSPC).
- Clean `/private/tmp` transcripts between waves: `find /private/tmp/claude-501 -name '*.output' -mmin +5 -delete`.

### Re-organize pass: COMPLETE (2026-06-20)
All imports restructured directly into Storybook DocTabs MDX (`src/react/stories/*.mdx`) —
NOT a separate `specs/<tier>/` layer (founder ruling: the rendered Storybook doc IS the
curated home). Carbon-aligned 4-tab shape (Usage / Style / Code / Accessibility),
content-preserving, de-Figma-ified, user-facing voice. `switch.mdx` + `segmented-control.mdx`
are the locked exemplars.

- **Components (4-tab, story-backed):** switch · checkbox · radio · dropdown · tabs ·
  segmented-control · buttons · badges · comments · input · avatars · menus ·
  modals-dialogs · notifications · visual-bells · tooltip (curated earlier).
- **Components (4-tab, live story deferred):** sliders (`[Deferred: ref node 2015:23027]`).
- **Foundations:** colors · typography · spacing · sizing · accessibility (pre-existing) +
  iconography · cursors (story deferred) · elevation (live shadow specimens) added this pass.

Each pass `build-storybook` exit 0 + GFM tables render. Committed in 3 batches
(+ a dropdown MDX2 fix: a stray `</content>` wrapper tag the agent appended broke the build).

NEXT: founder visual QA of the rendered docs (browser automation is broken in this env —
see `_PLAN.md` "Verification reality"). Then wire the sidebar tier restructure
(Foundations/Atoms/Molecules/Organisms) and backfill the two deferred stories
(Slider, cursor specimens).
