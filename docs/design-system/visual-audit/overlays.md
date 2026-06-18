# Visual / Layout Fidelity Audit — Overlays cluster

**Scope:** Dialog, Tooltip, Menu, MenuRow. Storybook @ `http://127.0.0.1:6011`, light mode.
**Method:** Live screenshots + zoom + `getComputedStyle()` measurement of the rendered DOM. This complements the value-diff audit (`docs/design-system/fidelity-overlays.md`) by checking what hex/px diffing cannot: centering, alignment, padding geometry, missing borders/dividers, and perceptual color.
**Read-only:** no source files were modified.

## Headline result

The two issues this audit was specifically asked to confirm — **Dialog header missing its bottom underline** and **Dialog header top padding too large** — are **already fixed in the current source** and render correctly. `styles/80-dialog.css` now carries the corrected geometry (`border-bottom` on `.composa-dialog-header`, `padding: var(--composa-space-2)` = 8px, `min-height: var(--composa-space-6)` = 40px, title at `body-medium` strong). Several other previously-flagged items (tooltip solid bg + elevation, menu full-bleed padding/gap, menu divider color, menu-row radius/padding) are also already corrected in the rendered output.

Only **one real visible defect** remains, plus two cosmetic near-imperceptible drifts. Details below.

---

## Defects

### 1. Dialog header renders ~48px tall instead of the Figma 40px

| Field | Value |
|---|---|
| Component | Dialog |
| State/variant | All header stories (`--structured`, `--header`, `--playground`); most visible in `--structured` |
| Issue | The header's own box is correct (8px padding, 40px `min-height`, bottom border present), but it **wraps a `composa-list-cell composa-list-cell-level-1` cell whose `min-height` is 32px**. 32px cell + 8px+8px header padding = 48px, so the header measures **49px** rendered vs the Figma Modal-header spec of **40px**. The header is ~20% taller than spec — visible as extra vertical space around the title and a taller divider-to-title gap. |
| Severity | **med** |
| Suspected source | The header cell is `.composa-dialog-header-cell` which also carries `.composa-list-cell-level-1`. Level-1 height comes from `styles/*list-cell*` (`.composa-list-cell-level-1 { min-height: 32px }`). The dialog header in `styles/80-dialog.css` (`.composa-dialog-header`) sets `min-height: var(--composa-space-6)` (40px) but cannot shrink the 32px inner cell + its own 16px padding below 48px. |
| Suggested fix | In `styles/80-dialog.css`, neutralize the inner cell's min-height inside the header so the 40px header governs: add `.composa-dialog-header .composa-dialog-header-cell { min-height: 0; }` (or set the header-cell to a 24px content height). Header padding stays 8px; this drops total header height to 8+24+8 = 40px and matches Figma. Confirmed measurement: header `getBoundingClientRect().height` = 49, inner cell height = 32, cell `min-height` = 32px. |

### 2. Menu surface background is `#1f1f1f`, Figma is `#1e1e1e`

| Field | Value |
|---|---|
| Component | Menu (container) |
| State/variant | `--playground`, `--heading` |
| Issue | Rendered `background-color: rgb(31,31,31)` (#1f1f1f). Figma `color-bg-menu` = #1e1e1e. One level off on every channel — **perceptually imperceptible** against the dark surface. |
| Severity | **low** |
| Suspected source | `--composa-menu-surface-bg` token (resolves to #1f1f1f) consumed by `.composa-menu` in `styles/86-menu.css` line ~10 (`background: var(--composa-menu-surface-bg)`). |
| Suggested fix | Set `--composa-menu-surface-bg: #1e1e1e` in the token layer. Cosmetic only. |

### 3. Tooltip max-width is 240px, Figma is 200px

| Field | Value |
|---|---|
| Component | Tooltip |
| State/variant | `--playground` (all placements) |
| Issue | Rendered `max-width: 240px`. Figma tooltip max width = 200px. Only visible on long-text tooltips that would wrap differently; the short demo string does not reveal it. No alignment/centering impact. |
| Severity | **low** |
| Suspected source | `styles/75-tooltip.css` line 4: `.composa-tooltip { max-width: 240px; }` (hardcoded). |
| Suggested fix | `max-width: 200px;` on `.composa-tooltip`. |

---

## Verified correct (explicit pass list)

**Dialog**
- Header **bottom border / underline IS present and correct**: `border-bottom: 1px solid rgb(230,230,230)` (#e6e6e6) on `.composa-dialog-header`. Visible as a divider separating header from body in `--structured` and `--playground`. (This was the headline flagged issue — now fixed.)
- Header **top padding is correct at 8px** (not the old oversized 12px): computed `padding: 8px`. (Second headline flagged issue — fixed.)
- Header title type correct: `font-size: 11px / line-height: 16px / font-weight: 550` (body-medium strong), not the old body-large 13px.
- Header title vertically centered; close (X) button right-aligned via `justify-content: space-between` + `align-items: center`.
- Footer: top border `1px solid #e6e6e6` present; Cancel/Apply right-aligned with 8px gap. (`--footer`, `--playground`).
- Body: padding `16px` (spacer-3), correct inset.
- Row (`--row`): leading image icon, title, description stack, and trailing "Choose" button all aligned correctly; leading and trailing top-aligned with the stacked content as intended.
- Window: radius 8px, border 1px #e6e6e6, `elevation-500-modal` shadow bound and rendering (multi-layer drop shadow visible).

**Tooltip**
- Background is **solid #1e1e1e** (`rgb(30,30,30)`), not the old translucent `rgba(0,0,0,0.9)`. Fixed.
- Elevation is **elevation-300-tooltip** (`0 1 3 .10 / 0 5 12 .13 / 0 0 .5 .15`), not the old canvas elevation. Fixed.
- Radius 5px, padding `4px 8px`, gap 4px — correct.
- **Arrow attaches cleanly to the bubble edge**: 8px rotated square, same fill as bubble (#1e1e1e), centered on the edge, no gap or detachment. The arrow-to-bubble seam is seamless. Pass.

**Menu**
- Surface: vertical padding `8px`, horizontal padding `0` (rows full-bleed) — fixed; inter-row `gap: 0` — fixed (was 2px). Radius 13px, `elevation-400-menu-panel` shadow correct.
- **Divider renders correctly**: solid `#383838` (`rgb(56,56,56)`) 1px line, fixed (was translucent white). Visible separating "Move to page" from "Snap to grid".
- Selected row ("Snap to grid"): full-bleed blue `#0d99ff`, check glyph left-aligned, row spans full menu width. Correct.
- Heading ("Layer"): left-aligned, 24px min-height, 10px inline padding, vertically centered.
- Footer ("Open library"): bordered button, full-width, correct.

**MenuRow**
- **Row vertical alignment of leading / label / trailing is pixel-perfect**: row centerY = 410, leading centerY = 410, trailing centerY = 410 — all on the same axis. `align-items: center` throughout.
- Geometry: min-height 24px, padding `0 4px 0 8px` (pl:8 pr:4 — fixed, was `0 6px`), gap 4px (fixed, was 2px), radius 5px (fixed, was 3px).
- Note: in the `--playground` story the row sits on the grey Storybook page (not a dark menu surface), so its white/secondary text is faint. This is a **story-harness artifact**, not a component defect — the row is designed to live on the #1f1f1f menu surface.

---

## Summary table

| Component | State/variant | Issue | Severity | Suspected source | Suggested fix |
|---|---|---|---|---|---|
| Dialog | header (all, esp. `--structured`) | Header renders ~49px vs Figma 40px because inner level-1 ListCell forces 32px min-height | med | `styles/80-dialog.css` `.composa-dialog-header-cell` + ListCell level-1 32px min-height | Add `.composa-dialog-header .composa-dialog-header-cell { min-height: 0 }` so 8+24+8=40px |
| Menu | `--playground`, `--heading` | Surface bg #1f1f1f vs Figma #1e1e1e (imperceptible) | low | `--composa-menu-surface-bg` token → `.composa-menu` background | Set token to `#1e1e1e` |
| Tooltip | `--playground` | max-width 240px vs Figma 200px | low | `styles/75-tooltip.css` `.composa-tooltip { max-width: 240px }` | `max-width: 200px` |

**No defects found in:** Dialog header underline (present/correct), Dialog header top padding (8px/correct), Dialog header title type, Dialog footer/body, Dialog row alignment, Tooltip color/elevation/arrow attachment, Menu divider, Menu padding/gap, Menu selected row, MenuRow leading/label/trailing vertical alignment.
