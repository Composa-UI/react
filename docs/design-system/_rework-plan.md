# Composa rework plan — founder voice-dump (2026-06-19, pre-sleep)

> Master spec for the overnight rework. Source: founder's batched feedback. Pair with
> `_dialog-rework-critique.md`. Benchmark dialog = `LayoutGuideSettingsDialog`/`StrokeSettingsDialog`.
> Figma file `rMq1M35u1iyKB2QaQMipZb`. Sequence the DS waves (shared factory.js → no parallel).

## Figma references (new)
- Editor toolbar: node **86-5602** — Move, **Frame**, Shapes(Rect/Circle), **Text** are the four; build only has Move + Shape. ADD Text + Frame. Use **"Grid 3x3" icon for Frame** (toolbar AND layer-list).
- Left rail: node **103-10421** — current rail is NOT to spec; rebuild to this.
- Founder will share later: Tree child-highlight reference; symbols to replace the `#`/material-symbol leads.

---

## WAVE 1 — Dialog primitive + dialog consistency (root cause)
The inconsistency is a **primitive problem**. Fix the Dialog primitive, then re-fit every dialog to it.
- Dialog primitive: **divider in the header AND a divider in the footer** (the playground dialogs have them; ours don't). Real **X close glyph** (drop the `rotate(45deg)` plus hack), and per Figma the close **overlaps the top-right corner**.
- **Insets too large** in the dialog body — reduce; reference the **spacing primitive** (likely 12px, confirm the token, don't hardcode). Also tighten **spacing within each list / line item**.
- Dividers run **edge-to-edge**, not inside uniform padding. Figma uses **varied per-section padding (8/12/16)**, not a uniform grid gap.
- Re-fit Export, LayoutGuide, Color-picker, Typography dialogs to the primitive. Reference StrokeSettingsDialog as the good example.
- **Interactivity is broken** (carryover from Codex): Export dialog checkbox not clickable, menus don't open, no headline on "ignore overlapping layers", preview (1x) doesn't expand. Wire real interactivity.

## WAVE 2 — Color picker functional deep-dive (P0, founder-blocking)
- **Editable RGB/HSL/CSS** with bidirectional round-trip (currently only hex editable; others read-only). Parse+validate per format; typing `255,0,0` updates area/sliders/swatch.
- **Drag-to-pick** on the 2D area; **draggable hue + alpha sliders** (currently display-only).
- **Tabs, not a SegmentedPicker**, for Custom/Libraries.
- **Reticle is squished — make it a real circle** (aspect-ratio bug). 2D area reads too big; rebalance.
- Gradient body (linear/radial + stops list) and Image body (fill-mode + drop-zone + upload), swapped per paint type. Libraries panel content. Check-contrast action. `+` (not `styles`) for new.
- Real `EyeDropper` API when available.

## WAVE 3 — Core primitives
- **ControlGroup / MultiInput**: only the **outer edges** rounded — first segment rounds left (TL+BL), last rounds right (TR+BR), middles square → reads as one rounded rectangle. Apply to both.
- **Dropdown**: push **chevron further right**; **increase preview size so the menu doesn't cut off** (menu currently clips); reference **NumericInput's chevron position** (NumericInput is correct).
- **ComboInput**: menu **jumps position** on open (alignment bug). Toolbar-type menu rows (e.g. "snap to grid" vs "rectangle") **don't start on the same line** — align the reserved-icon/checkmark slot so toolbar rows line up with simple rows.
- **Tabs**: the visible **divider line below the tab** should be a variant / removable — official Figma inspector tabs have **no underline**. (Inspector use had to hide it.)
- **TextPair** (currently written wrongly): model as **slots** — `content`, `body`, `metadata`. Metadata slot has a prop to sit **above or below** the body. Default typography mapping: **large→content, medium→body, small→metadata**.
- **Label**: levels 1/2/3 currently look identical (no change between L2/L3). Map levels to **typography sizes large/medium/small**.
- **IconButton**: base component should reflect **overlay/tooltip behavior** — components like the alignment picker / icon buttons show a tooltip in a section but the base shows none. Tooltip should be intrinsic.
- **IconButton vs Toggle mental model**: two kinds — (a) a **persistent action/toggle** (click → state preserved), (b) a **dialog-opener** that is active ONLY while its dialog is open and **untoggles on outside-click**. Encode this distinction; dialog-opener buttons must reflect open/closed state.
- **Tree**: clicking a node whose children are exposed should **also highlight the children, in a less-visible color**. Replace `#`/material-symbol leads with founder's symbols (pending). "Components" entry: weak/unofficial — OK to keep but mark not-strongly-supported (or remove).

## WAVE 4 — Toolbar + templates + field + section interactivity
- **Editor toolbar**: ADD **Text** + **Frame** (Frame = Grid 3x3). Fix **tooltip+menu showing simultaneously** (tooltip on hover only; hide tooltip while a menu is open) — affects last two stories. Trim story count. Assume IconButton size 32. Material-symbol weight: some need **300** (not 200) — audit weights.
- **Editor shell + Slides editor templates**:
  - **Left rail** to spec (node 103-10421).
  - Rail items: keep only the **first two**; remove "Text" and "Notes".
  - **Navigator sidebar is smaller than its content → content clips** (both templates). Fix sizing so content fits.
  - **Sidebars (left+right) should be resizable.**
  - Navigator layer/tree area: **bottom-aligned, not top-aligned** (founder: "supposed to be bottom aligned").
  - Icon weight 300 where symbols look thin.
- **Field section** ("hidden value" story): when value hidden, **only the value text is disabled** (e.g. the "100"), NOT the whole color-picker split/input. Confirm **radius on top-right + bottom-right edges**.
- **Inspector section interactivity** (Effects, Export): the dialog-opener button + dropdown next to drop-shadow open nothing; Export 1x input shows no menu, preview doesn't expand. Wire per the toggle/dialog-opener model above.

## WAVE 5 — Docs / overview
- Reframe the **overview / "how it's built"**: the main point is **composability** — building blocks that build up to each other (tokens are *a* building block / the beauty-block / mental model), NOT "tokens+icons+slots drive everything." Consider **consolidating** the overview with the system-layout doc (or keep separate — founder unsure).
- **Module** definition: add that modules **combine [primitives] together to perform a SPECIFIC FUNCTION** (key term: specific function). Template definition ("a surface") is fine.

## Verification (every wave)
`node --check` per JS, `npm run check` (exit 0), never hand-edit generated styles.css. Commit to `composa/editor-foundation`, do NOT push. Visual fidelity is the bar — match Figma exactly; enumerate cited nodes and check off content blocks (skill lesson).
