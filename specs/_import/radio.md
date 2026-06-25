<!--
Source: Figma "Radio Button Guidelines" page — fileKey 4kilp0ShQiYsoUPJdleqEH, entry node 2015:20311
1:1 import — raw, pre-organization. Faithful capture, not synthesis. Re-organize into tabs later.
Frames transcribed: 2015:20314, 2015:20319, 2015:20346
-->

# Radio Button — Guidelines (1:1 Figma import)

Page frame: `2015:20311` "Radio Button Guidelines" (1280 × 1240). Contains a `_Status` instance bar (`2359:115795`) and a content frame "Frame 3" (`2015:20313`, 1280 × 1048) holding three `_Section/Component` sections.

Doc text styles present across the page:
- `_doc/heading`: Whyte, Regular, size 18, weight 400, lineHeight 32, letterSpacing 1
- `_doc/description`: Whyte, Book, size 13, weight 350, lineHeight 22, letterSpacing 1
- `_doc/body/body.medium`: family `body/medium/fontFamily`, Medium, size `body/medium/fontSize`, weight `body/medium/fontWeight`, lineHeight `body/medium/lineHeight`, letterSpacing 0.5

---

## Section 1 — Component intro / Definition

Node: `2015:20314` (`_Section/Component`, 1280 × 216)

### Heading + description

Component Name (`2015:20316`, Whyte Regular 36px, color rgba(0,0,0,0.9), tracking 0.36px):

> Radio Button

Description (`2015:20317`, Whyte Regular 18px, color rgba(0,0,0,0.6), tracking 0.18px, width 412px), verbatim:

> Used to represent a list of choices where a user can only choose one option.

---

## Section 2 — States matrix (On / Off × Default / Focus), Light & Dark

Node: `2015:20319` (`_Section/Component`, 1280 × 352)

### Heading + description

Component Name (`2015:20321`, Whyte Regular 18px):

> Radio Button

Description (`2015:20322`, Whyte Book 13px), verbatim:

> Unlike a list of checkboxes (where users can toggle checkboxes independently), radio buttons only allow one option to be selected at a time.

### Light / Dark context (`2015:20323`, 704px wide)

Two panels side by side: **Light** (`2015:20324`, bg `--color-bg` white, 1px rgba(0,0,0,0.1) border) labeled "LIGHT MODE" (`2015:20325`, color rgba(0,0,0,0.3)), and **Dark** (`2015:20335`, bg `--color-bg` #2c2c2c) labeled "DARK MODE" (`2015:20345`, color rgba(255,255,255,0.3)).

Each panel contains a Drop Zone ("DZ", `2015:20326` light / `2015:20336` dark) laying out a 2×2 grid of radio-button specimens with redline labels. The redline labels use `_Label/Redline/State-Left` (row labels) and `_Label/Redline/State-Above` (column labels), styled with `--color-bg-assistive-tertiary` (#ffe0fc light / #68275e dark) and text `--color-text-assistive` (#ea10ac light / #fc9ce0 dark).

**Matrix axes (redline annotations):**

- Row labels (left, top→bottom): **On** (`2015:20333` light / `2015:20343` dark), **Off** (`2015:20334` light / `2015:20344` dark)
- Column labels (above): col 2 = **Focus** (`2015:20332` light / `2015:20342` dark). Col 1 is the default/normal column (unlabeled).

**The 4 radio-button specimens (light, in "Group 1" `2015:20327`; dark, in "Group 2" `2425:29445`), by grid cell — all `label="False"`:**

| Cell | on | state | Radio node (light / dark) |
|------|------|-------|----------------------------|
| On / Default | true | Default | `2015:20328` / `2425:29446` |
| Off / Default | false | Default | `2015:20329` / `2425:29447` |
| On / Focus | true | Focused | `2015:20330` / `2425:29448` |
| Off / Focus | false | Focused | `2015:20331` / `2425:29449` |

### Radio Button component — variant axes (from component definition embedded in this frame)

`RadioButtonProps` (label="False" form):
- `variant`: `"Input"` (default `"Input"`)
- `state`: `"Default" | "Focused"` (default `"Default"`)
- `on`: boolean (default true)
- `label`: `"False"` (this section's specimens are unlabeled)

### Token / value capture (state styling — token-driven, captured)

Radio control box is 16×16px (`size-[16px]`), background `--color-bg` (white / #2c2c2c), radius `--radius-medium` (0.3125rem / 5px), `overflow-clip`. The control is composed of:
- a "Container" layer (16×16px, centered) rendering the ring/border SVG, and
- an "On" layer (8×8px, centered) rendering the filled dot — present only when `on` is true (`variant === "Input" && on && label === "False"`).

| State | Container ring | On dot | Notes |
|-------|----------------|--------|-------|
| On, Default | default ring SVG (`imgContainer`) | 8px filled dot (`imgOn`) | selected |
| Off, Default | default ring SVG (`imgContainer`) | — | empty ring |
| On, Focused | focus ring SVG (`imgContainer1`) | 8px filled dot | focus uses `--color-border-fs-selected-strong` #007be5 |
| Off, Focused | focus ring SVG (`imgContainer1`) | — | focus ring, empty |

> Focus ring color token: `--color-border-fs-selected-strong` = #007be5 (light). The Container SVG asset switches to the focus variant when `state === "Focused"` (`imgContainer1` in light, `imgContainer3` in dark).

`[Deferred: render — ref nodes 2015:20324 (light grid), 2015:20335 (dark grid)]` — component-dependent specimen layout (full 2×2 redline matrix; ring/dot are SVG assets). Token/state data above captured non-deferred.

---

## Section 3 — Radio Button with Label

Node: `2015:20346` (`_Section/Component`, 1280 × 352)

### Heading + description

Component Name (`2015:20348`, Whyte Regular 18px):

> Radio Button with Label

Description (`2015:20349`, Whyte Book 13px), verbatim:

> Usually, radio buttons are accompanied with a label describing a distinct option.

### Light / Dark context (`2015:20350`)

Light panel (`2015:20351`, "LIGHT MODE" `2015:20352`) and Dark panel (`2015:20358`, "DARK MODE" `2015:20359`).

Specimens are labeled radio buttons arranged in a **single vertical stack** ("Container" `2015:20353` light / `2425:29534` dark, 119 × 168px), four rows at 48px vertical pitch (top 0 / 48 / 96 / 144).

**Radio Button component for this section** — `label="True"`; `variant`: `"Input"`; `state`: `"Default" | "Focused"`; `on` boolean. Each specimen is a row: 16px radio control + 8px gap + label text. Row padding `pl-[4px] pr-[--spacer-1] py-[4px]`, radius 5px, gap `--spacer-1` (4px / 0.3rem).

Light stack (`2015:20353`):
- `2015:20354`: On, Normal (on=true, Default) — label "On, Normal"
- `2015:20355`: Off, Normal (on=false, Default) — label "Off, Normal"
- `2015:20356`: On, Focused (on=true, Focused) — label "On, Focused"
- `2015:20357`: Off, Focused (on=false, Focused) — label "Off, Focused"

Dark stack (`2425:29534`):
- `2425:29535`: On, Normal (`imgRadioButton4`)
- `2425:29536`: Off, Normal (`imgRadioButton5`)
- `2425:29537`: On, Focused (`imgRadioButton6`)
- `2425:29538`: Off, Focused (`imgRadioButton7`)

**Label text + color (token capture):**
- Label uses `body/medium` (Inter Medium, fontSize 11px, fontWeight 450, lineHeight 16px, tracking 0.055px), `text-ellipsis` / `overflow-hidden` / `whitespace-nowrap`.
- Label color: `--color-text` (rgba(0,0,0,0.9) / #000000e5 light; white dark).
- Label strings shown: "On, Normal", "Off, Normal", "On, Focused", "Off, Focused".

`[Deferred: render — ref nodes 2015:20351 (light), 2015:20358 (dark)]` — component-dependent labeled-radio layout; radio control box is an SVG asset per specimen.

---

## Cross-section token summary (captured values)

Color variables referenced across the page (var → light fallback / dark fallback where both observed):

- `--color-bg`: #ffffff (white) / #2c2c2c
- `--color-icon`: #000000e5
- `--color-text`: #000000e5 (rgba(0,0,0,0.9)) / white
- `--color-bg-assistive-tertiary`: #ffe0fc / #68275e
- `--color-text-assistive`: #ea10ac / #fc9ce0
- `--color-border-fs-selected-strong`: #007be5 (focus ring)
- `light/border/default/strong`: #2C2C2C (style reference present on Light/Dark sections)

Dimension/radius/type tokens:
- `--radius-medium`: 0.3125rem (5px) — radio control box radius
- `--spacer-1`: 0.3rem (4px) — labeled-row gap / right+vertical padding
- Radio control box: 16 × 16px; On dot: 8 × 8px (centered)
- `body/medium`: family Inter, fontSize 11px, fontWeight 450, lineHeight 16px (label text)

> Note (faithful capture): The radio control's ring and filled dot are exported as SVG image assets (`imgContainer*`, `imgOn*`, `imgRadioButton*`), not as token-styled vector primitives in the extracted code; the focus state swaps the Container SVG asset rather than applying a separate CSS ring. Preserve as-is; reconcile during clean-up.
