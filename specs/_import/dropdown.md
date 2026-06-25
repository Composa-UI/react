<!--
Source: Figma "Dropdown Guidelines" page — fileKey 4kilp0ShQiYsoUPJdleqEH, entry node 2327:48576
1:1 import — raw, pre-organization. Faithful capture, not synthesis. Re-organize into tabs later.
Frames transcribed: 2327:48579, 2327:48583, 2327:48624, 2327:48639
-->

# Dropdown — Guidelines (1:1 Figma import)

Page frame: `2327:48576` "Dropdown Guidelines" (1280 × 1805). Contains a `_Status` instance bar (`2359:67544`) and four content sections: a `_Section/Component` intro (`2327:48579`), a `_Section/Component` states matrix (`2327:48583`), and two `State` sections (`2327:48624`, `2327:48639`).

Doc text styles present across the page:
- `_doc/heading`: Whyte, Regular, size 18, weight 400, lineHeight 32, letterSpacing 1
- `_doc/description`: Whyte, Book, size 13, weight 350, lineHeight 22, letterSpacing 1
- `_doc/body/body.medium`: family `body/medium/fontFamily`, Medium, size `body/medium/fontSize`, weight `body/medium/fontWeight`, lineHeight `body/medium/lineHeight`, letterSpacing 0.5

---

## Section 1 — Component intro / Definition

Node: `2327:48579` (`_Section/Component`, 1280 × 216)

### Heading + description

Component Name (`2327:48581`, Whyte Regular 36px, color rgba(0,0,0,0.9), tracking 0.36px):

> Dropdown

Description (`2327:48582`, Whyte Regular 18px, color rgba(0,0,0,0.6), tracking 0.18px, width 412px), verbatim:

> Works a select / dropdown menu, to choose one option from a menu.

---

## Section 2 — States matrix (Default / Hover / Focus / Disabled) × icon-leading & icon-less, Light & Dark

Node: `2327:48583` (`_Section/Component`, 1280 × 433)

### Heading + description

Component Name (`2327:48585`, Whyte, **hidden** in source — `hidden="true"`, width 320).

Description (`2327:48586`, Whyte Book 13px, color rgba(0,0,0,0.6), tracking 0.13px, width 320), verbatim (with inline emphasis span on "value"):

> Similar to our value component, our option menus do not include a border by default. Instead, we only show borders on hover and focus states.

> Note (faithful capture): "value" is its own text span in the source (likely intended as a link/reference to the Value component). Preserved as plain inline text.

### Light / Dark context (`2327:48587`, 704px wide)

Two panels side by side: **Light** (`2327:48588`, bg `--color-bg` white, 1px rgba(0,0,0,0.1) border) labeled "LIGHT MODE" (`2327:48589`, text rgba(0,0,0,0.3)), and **Dark** (`2327:48606`, bg `--color-bg` #2c2c2c) labeled "DARK MODE" (`2327:48607`, text rgba(255,255,255,0.3)).

Each panel's Drop Zone (`2327:48590` light / `2327:48608` dark) lays out **two columns of four dropdown specimens** with redline state labels down the left.

The redline labels use `_Label/Redline/State-Left`, styled with `--color-bg-assistive-tertiary` (#ffe0fc light / #68275e dark) and text `--color-text-assistive` (#ea10ac light / #fc9ce0 dark), 11px Inter Medium, tracking 0.055px, with a small rotated arrow tail.

**Matrix axes (redline annotations, left, top→bottom):** **Default** (`2327:48602` / `2680:269421`), **Hover** (`2327:48603` / `2680:269422`), **Focus** (`2327:48604` / `2680:269423`), **Disabled** (`2327:48605` / `2680:269424`).

**Column A — icon-leading dropdowns** (`2327:48591` light / `2327:48609` dark): each row has a leading `icon.24.al.constrain-horiz` glyph, then a "Value" label, then `icon.24.chevron.down` trailing. 16px gap between rows.

| Row | Border | Label color | Dropdown node (light / dark) |
|-----|--------|-------------|------------------------------|
| Default | `--color-border` (#e6e6e6 / #444) | `--color-text` (rgba(0,0,0,0.9) / white) | `2327:48592` / `2327:48610` |
| Hover | `--color-border` (#e6e6e6 / #444) | `--color-text` | `2327:48593` / `2327:48611` |
| Focus | `--color-border-selected` (#0d99ff / #0c8ce9) | `--color-text` | `2327:48594` / `2327:48612` |
| Disabled | `--color-border` (#e6e6e6 / #444) | `--color-text-tertiary` (rgba(0,0,0,0.3) / rgba(255,255,255,0.4)) | `2327:48595` / `2327:48613` |

**Column B — icon-less dropdowns** (`2327:48596` light / `2327:48614` dark): no leading icon; left padding `--spacer-2` (8px), "Value" label, then `icon.24.chevron.down` trailing. 16px gap between rows.

| Row | Border | Label color | Dropdown node (light / dark) |
|-----|--------|-------------|------------------------------|
| Default | `--color-border` (#e6e6e6 / #444) | `--color-text` | `2327:48597` / `2327:48615` |
| Hover | `--color-border` (#e6e6e6 / #444) | `--color-text` | `2327:48598` / `2327:48616` |
| Focus | `--color-border-selected` (#0d99ff / #0c8ce9) | `--color-text` | `2327:48599` / `2327:48617` |
| Disabled | `--color-border` (#e6e6e6 / #444) | `--color-text-tertiary` | `2327:48600` / `2327:48618` |

> Note (faithful capture): The icon-leading column (A) sits visually below the icon-less column (B) in the source layout (Column A `top-[236px]`, Column B `top-[72px]`), but the redline state labels (Default→Hover→Focus→Disabled) run alongside Column B. Preserving node order as-is; reconcile alignment during clean-up.

### Dropdown component — variant axes (from component definition embedded in this frame)

Inferred from the specimen instances on this page (`DropdownProps`):
- `state`: `"Default" | "Hover" | "Focus" | "Disabled"`
- `leadingIcon`: boolean (true = `icon.24.al.constrain-horiz` shown at left; false = label starts after `--spacer-2` padding)
- `label`: string (rendered "Value")
- trailing `icon.24.chevron.down` always present

### Token / value capture (state styling — token-driven, captured)

Dropdown row is 24px high, width 117px (matrix specimens). Trailing chevron icon box 24×24px; chevron glyph 5×3px. Leading constrain-horiz glyph 11×6px in a 24px box. Radius `--radius-medium` (0.3125rem / 5px). Background `--color-bg` (white light / #2c2c2c dark).

| State | Border | Label color | Background |
|-------|--------|-------------|------------|
| Default | `--color-border` (#e6e6e6 / #444) | `--color-text` (rgba(0,0,0,0.9) / white) | `--color-bg` (white / #2c2c2c) |
| Hover | `--color-border` (#e6e6e6 / #444) | `--color-text` | `--color-bg` |
| Focus | `--color-border-selected` (#0d99ff / #0c8ce9) | `--color-text` | `--color-bg` |
| Disabled | `--color-border` (#e6e6e6 / #444) | `--color-text-tertiary` (rgba(0,0,0,0.3) / rgba(255,255,255,0.4)) | `--color-bg` |

> Note (faithful capture): Default and Hover render identically in the static export (same border token). The "borders on hover/focus only" rule in the description is not fully reflected by the captured token values for the Default row, which already shows `--color-border`. Preserving as-is; reconcile during clean-up.

`[Deferred: render — ref nodes 2327:48588 (light grid), 2327:48606 (dark grid)]` — component-dependent specimen layout (two columns × four states). Token/state data above captured non-deferred.

---

## Section 3 — Default (flexible width)

Node: `2327:48624` (`State`, 1280 × 352)

### Heading + description

Component Name (`2327:48626`, Whyte Regular 18px):

> Default

Description (`2327:48627`, Whyte Book 13px), verbatim:

> By default, dropdowns can have flexible width, adjusting their width based on text length

### Light / Dark context (`2327:48628`)

Light panel (`2327:48629`, "LIGHT MODE" `2327:48630`) and Dark panel (`2327:48634`, "DARK MODE" `2327:48635`). Each holds a vertical stack (gap 32px, centered) of two icon-less dropdowns:

- Light: `2327:48632` ("Value", hug width — no fixed width), `2327:48633` ("Longer value", 117px width). Dark mirror: `2680:269457` ("Value"), `2680:269458` ("Longer value").

Both Default state, `--color-border` border, `--color-text` label. The first specimen hugs its content (no `w-[…]`), the second is fixed at 117px — demonstrating flexible width adjusting to text length.

`[Deferred: render — ref nodes 2327:48629 (light), 2327:48634 (dark)]` — component-dependent flexible-width layout.

---

## Section 4 — Snap to grid

Node: `2327:48639` (`State`, 1280 × 352)

### Heading + description

Component Name (`2327:48641`, Whyte Regular 18px):

> Snap to grid

Description (`2327:48642`, Whyte Book 13px), verbatim:

> To create a consistent grid in our property panels, we can also snap these controls to our flexible grid, locking to either one, two, or three columns

### Light / Dark context (`2327:48643`)

Light panel (`2327:48644`, "LIGHT MODE" `2327:48645`) and Dark panel (`2327:48655`, "DARK MODE" `2327:48656`). Each Drop Zone (`2327:48646` light / `2327:48657` dark) is a vertical stack (gap 8px, centered) of three grid-snapped dropdowns, each preceded by a measure redline chip and separated by 24px Spacers.

Measure chips use `_Label/Redline/Text` on a `--color-bg-measure-tertiary` band (#ffe2e0 light / #60332a dark), text `--color-text-measure` (#dc3412 light / #fca397 dark), 11px Inter Medium:

| Grid lock | Measure chip + band | Dropdown width | Dropdown node (light / dark) |
|-----------|---------------------|----------------|------------------------------|
| col.1 | `2680:269483` / `2680:269475`; band `2680:269482` / `2680:269474` (88px) | 88px | `2327:48648` / `2327:48659` |
| col.2 | `2680:269481` / `2680:269479`; band `2680:269480` / `2680:269478` (184px) | 184px | `2327:48651` / `2327:48662` |
| col.3 | `2680:269485` / `2680:269477`; band `2680:269484` / `2680:269476` (184px) | 184px | `2327:48654` / `2327:48665` |

Spacers: light `2327:48649` (between col.1 / col.2) and `2327:48652` (between col.2 / col.3); dark `2680:269460` / `2680:269462` — both 24×24px.

All dropdowns Default state, `--color-border` border, `--color-text` label, gap `--spacer-1` (0.3rem) between label group and chevron (light) / `--spacer-0` (dark, per export).

> Note (faithful capture): col.2 and col.3 both render at 184px in this specimen set (col.3 measure chip is the same 184px band). The dark col.2 / col.3 dropdowns use `w-full` rather than a pixel width. Preserving as-is.

`[Deferred: render — ref nodes 2327:48644 (light), 2327:48655 (dark)]` — component-dependent snap-to-grid layout.

---

## Cross-section token summary (captured values)

Color variables referenced across the page (var → light fallback / dark fallback where both observed):

- `--color-bg`: white / #2c2c2c
- `--color-border`: #e6e6e6 / #444
- `--color-border-selected`: #0d99ff / #0c8ce9
- `--color-text`: rgba(0,0,0,0.9) / white
- `--color-text-tertiary`: rgba(0,0,0,0.3) / rgba(255,255,255,0.4)
- `--color-bg-assistive-tertiary`: #ffe0fc / #68275e
- `--color-text-assistive`: #ea10ac / #fc9ce0
- `--color-bg-measure-tertiary`: #ffe2e0 / #60332a
- `--color-text-measure`: #dc3412 / #fca397

Dimension/radius tokens:
- `--spacer-0`: 0rem (0px)
- `--spacer-1`: 0.3rem — label-to-chevron gap (snap-to-grid specimens)
- `--spacer-2`: 0.5rem (8px) — left padding on icon-less dropdowns
- `--radius-medium`: 0.3125rem (5px) — dropdown corner radius
- Dropdown row: 24px high; matrix width 117px; snap widths 88 / 184 / 184px
- Trailing chevron `icon.24.chevron.down`: 24px box, 5×3px glyph
- Leading `icon.24.al.constrain-horiz`: 24px box, 11×6px glyph

Body label text style: `body/medium` (Inter Medium 11px, weight 450, lineHeight 16px, tracking 0.055px), rendered "Value" / "Longer value" on specimens.
