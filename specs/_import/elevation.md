<!--
Source: Figma "Elevations" page — fileKey 4kilp0ShQiYsoUPJdleqEH, entry node 2012:307470
1:1 import — raw, pre-organization. Faithful capture, not synthesis. Re-organize into tabs later.
Frames transcribed: 2012:307473 (intro), 2012:307477 (Component Context), 2012:307481 (scale overview),
2012:307509 (E100), 2012:307528 (E200), 2012:307549 (E300), 2012:307570 (E400), 2012:307591 (E500)
-->

# Elevations — Guidelines (1:1 Figma import)

Page frame: `2012:307470` "Elevations" (1280 × 3468). Contains a `_Status` instance bar (`2359:49724`), a `Content` frame (`2012:307472`) with the intro `_Section/Component`, a `Component Context` frame (`2012:307477`), an `Elevation` scale-overview frame (`2012:307481`), and a `Frame 8` (`2012:307508`) holding the five per-level detail `Elevation` sections.

Doc text styles present across the page:
- `_doc/heading`: Whyte, Regular, size 18, weight 400, lineHeight 32, letterSpacing 1
- Component Name (intro): Whyte Regular 36px, color rgba(0,0,0,0.9), tracking 0.36px
- Section heading (per-level): Whyte Regular 18px, color rgba(0,0,0,0.9), tracking 0.18px
- Description body: Whyte Book 13px, color rgba(0,0,0,0.6), lineHeight 22, tracking 0.13px (bold lead-ins use Whyte Bold)
- Token chip code: SF Mono Medium 13px, lowercase, lineHeight 18, color `_/Light/Green 700` #008043 on `_/Light/Green 100` #EBFFEE chip

---

## Section 1 — Component intro / Definition

Node: `2012:307473` (`_Section/Component`, 1280 × 216)

### Heading + description

Component Name (`2012:307475`, Whyte Regular 36px, color rgba(0,0,0,0.9), tracking 0.36px):

> Elevations

Description (`2012:307476`, Whyte Regular 18px, color rgba(0,0,0,0.6), tracking 0.18px, width 412px), verbatim:

> In order to create a consistent appearance for shadows, we've created a range of preset elevations that shift automatically based on user theme and screen resolution.

---

## Section 2 — Component Context (usage doctrine, two columns)

Node: `2012:307477` (`Component Context`, 1280 × 308). Two Whyte Book 13px text columns (color rgba(0,0,0,0.6), lineHeight 22, tracking 0.13px), each 320px wide; left at x=64, right at x=448.

### Left column (`2012:307479`), verbatim

> **Applying Elevations**
>
> Rather than manually creating new shadows, in order to create consistency between how shadows appear across Figma, we have five levels of elevations that correspond to different levels of z-index. We intentionally use numeric levels, in order to also make it easy to bump up or down a level to create states like "hovering" or "dragging" an object.
>
> It's important to note that there's no more need for an outer border for elements like modals. (With these new elevations, we've baked in a subtle outer border into the shadow itself, so an additional border is no longer necessary.)

(Bold lead-in "Applying Elevations" is Whyte Bold.)

### Right column (`2012:307480`), verbatim

> **Here's what the system handles for you**
>
> <u>Adjusting shadows based on theme</u>
> When presented against dark backgrounds, our elevations make use of a darker shadow, and a slight inset highlight in order to create contrast against the background.
>
> <u>Screen resolution</u>
> In the past, 0.5px strokes have looked blurry on lower resolution screens. We've baked in some smarter defaults, where our elevations will round to the nearest pixel depending on screen resolution.

(Bold lead-in "Here's what the system handles for you" is Whyte Bold; the two sub-headers "Adjusting shadows based on theme" and "Screen resolution" are underlined.)

---

## Section 3 — Elevation scale overview (E100–E500, Light row over Dark row)

Node: `2012:307481` (`Elevation`, 1280 × 512). A single 1152 × 512 card (`2012:307482`, bg white, 1px rgba(0,0,0,0.1) border) split top/bottom: top half is light context (bg white), bottom half (`2012:307483`, `--color-bg` #2c2c2c) is dark context. Each half shows a row of five 128 × 128 swatches at radius `--radius-large` (~13px), gap 64px, with column labels above.

Column labels (Whyte Book 13px): light row uses color rgba(0,0,0,0.3) (`2012:307496`), dark row uses rgba(255,255,255,0.3) (`2012:307502`). Both read left→right:

> E 100   E 200   E 300   E 400   E 500

The 10 swatches and their inline box-shadow stacks (light `2012:307485`–`2012:307489`, dark `2012:307491`–`2012:307495`):

| Level | Light swatch box-shadow (inline) | Dark swatch box-shadow (inline) |
|-------|----------------------------------|----------------------------------|
| E100 | `0 0 0.5px rgba(0,0,0,0.3)`, `0 1px 3px rgba(0,0,0,0.15)` | `0 0 0.5px rgba(0,0,0,0.5)`, `0 1px 3px rgba(0,0,0,0.4)` + insets `inset 0 0.5px 0 rgba(255,255,255,0.1)`, `inset 0 0 0.5px rgba(255,255,255,0.3)` |
| E200 | `0 0 0.5px rgba(0,0,0,0.18)`, `0 3px 8px rgba(0,0,0,0.1)`, `0 1px 3px rgba(0,0,0,0.1)` | `0 3px 8px rgba(0,0,0,0.35)`, `0 1px 3px rgba(0,0,0,0.5)` + insets `inset 0 0.5px 0 rgba(255,255,255,0.08)`, `inset 0 0 0.5px rgba(255,255,255,0.3)` |
| E300 | `0 0 0.5px rgba(0,0,0,0.15)`, `0 5px 12px rgba(0,0,0,0.13)`, `0 1px 3px rgba(0,0,0,0.1)` | `0 5px 12px rgba(0,0,0,0.35)`, `0 1px 3px rgba(0,0,0,0.5)` + insets `inset 0 0.5px 0 rgba(255,255,255,0.08)`, `inset 0 0 0.5px rgba(255,255,255,0.3)` |
| E400 | `0 0 0.5px rgba(0,0,0,0.12)`, `0 10px 16px rgba(0,0,0,0.12)`, `0 2px 5px rgba(0,0,0,0.15)` | `0 10px 16px rgba(0,0,0,0.35)`, `0 2px 5px rgba(0,0,0,0.35)` + insets `inset 0 0.5px 0 rgba(255,255,255,0.08)`, `inset 0 0 0.5px rgba(255,255,255,0.35)` |
| E500 | `0 10px 24px rgba(0,0,0,0.45)`, `0 3px 5px rgba(0,0,0,0.35)` + insets `inset 0 0.5px 0 rgba(255,255,255,0.08)`, `inset 0 0 0.5px rgba(255,255,255,0.35)` | `0 10px 24px rgba(0,0,0,0.45)`, `0 3px 5px rgba(0,0,0,0.35)` + insets `inset 0 0.5px 0 rgba(255,255,255,0.08)`, `inset 0 0 0.5px rgba(255,255,255,0.35)` |

> Note (faithful capture): In this overview, the **light** E500 swatch (`2012:307489`) is authored with the same dark-shadow + inset-highlight treatment as the dark swatches (it is a `pointer-events-none` overlay variant), not the lighter modal shadow shown in the per-level detail section below. The light E100–E400 swatches here are simple drop-shadow-only. Preserving as-is; reconcile during clean-up.

### Named effect styles (from this frame's style table — authoritative shadow definitions)

Figma effect styles, with usage suffix encoded in the style name. Each layer is `type @ color, offset (x,y), radius, spread`:

**Light:**
- `light/elevation-100-canvas`: DROP_SHADOW #00000026 (0,1) r3 s0; DROP_SHADOW #0000004D (0,0) r0.5 s0
- `light/elevation-200-canvas`: DROP_SHADOW #0000001A (0,1) r3 s0; DROP_SHADOW #0000001A (0,3) r8 s0; DROP_SHADOW #0000002E (0,0) r0.5 s0
- `light/elevation-300-tooltip`: DROP_SHADOW #0000001A (0,1) r3 s0; DROP_SHADOW #00000021 (0,5) r12 s0; DROP_SHADOW #00000026 (0,0) r0.5 s0
- `light/elevation-400-menu-panel`: DROP_SHADOW #00000026 (0,2) r5 s0; DROP_SHADOW #0000001F (0,10) r16 s0; DROP_SHADOW #0000001F (0,0) r0.5 s0
- `light/elevation-500-modal-window`: DROP_SHADOW #00000026 (0,2) r5 s0; DROP_SHADOW #0000002E (0,10) r24 s0; DROP_SHADOW #00000014 (0,0) r0.5 s0; DROP_SHADOW #0000000D (0,3) r12 s0

**Dark:**
- `dark/elevation-100-canvas`: DROP_SHADOW #00000066 (0,1) r3 s0; INNER_SHADOW #FFFFFF4D (0,0) r0.5 s0; INNER_SHADOW #FFFFFF1A (0,0.5) r0 s0; DROP_SHADOW #00000080 (0,0) r0.5 s0
- `dark/elevation-200-canvas`: DROP_SHADOW #00000080 (0,1) r3 s0; INNER_SHADOW #FFFFFF4D (0,0) r0.5 s0; DROP_SHADOW #00000059 (0,3) r8 s0; INNER_SHADOW #FFFFFF14 (0,0.5) r0 s0
- `dark/elevation-300-tooltip`: DROP_SHADOW #00000080 (0,1) r3 s0; INNER_SHADOW #FFFFFF4D (0,0) r0.5 s0; DROP_SHADOW #00000059 (0,5) r12 s0; INNER_SHADOW #FFFFFF14 (0,0.5) r0 s0
- `dark/elevation-400-menu-panel`: DROP_SHADOW #00000059 (0,2) r5 s0; INNER_SHADOW #FFFFFF59 (0,0) r0.5 s0; DROP_SHADOW #00000059 (0,10) r16 s0; INNER_SHADOW #FFFFFF14 (0,0.5) r0 s0
- `dark/elevation-500-modal-window`: DROP_SHADOW #00000059 (0,3) r5 s0; INNER_SHADOW #FFFFFF59 (0,0) r0.5 s0; DROP_SHADOW #00000073 (0,10) r24 s0; INNER_SHADOW #FFFFFF14 (0,0.5) r0 s0

> Note (faithful capture — named style vs. rendered swatch): The named effect styles above are the source-of-truth definitions. The inline swatch shadows in the table differ slightly in a few places (e.g. `light/elevation-500-modal-window` defines four layers including a `#0000000D (0,3) r24→12` haze layer, whereas the light E500 swatch is rendered with the dark-style treatment as noted; `dark/elevation-500-modal-window` defines a `#FFFFFF59 (0,0) r0.5` inner highlight not present in the inline dark E500 swatch). Both captured verbatim; reconcile during clean-up.

`[Deferred: render — ref nodes 2012:307484 (light row), 2012:307490 (dark row)]` — component-dependent swatch layout. Shadow/token data above captured non-deferred.

---

## Section 4 — Elevation 100 (Shapes)

Node: `2012:307509` (`Elevation`, 1280 × 384)

### Heading + description

Section heading (`2012:307511`, Whyte Regular 18px):

> Elevation - 100, Shapes

Description (`2012:307512`, Whyte Book 13px), verbatim:

> Elements that look like they are sitting as part of the canvas, with minimal shadow.
>
> FigJam shapes
> FigJam sections
> FigJam image shadows

### Light / Dark preview panels

Light panel (`2012:307513`, "LIGHT MODE" `2012:307516`, dashed 1px rgba(0,0,0,0.1) border): one 100 × 100 swatch (`2012:307515`, radius `--radius-large`) with light E100 shadow. Token chips (`2012:307517`, bottom-right):
- `0 0 0.5px rgba(0,0,0,0.3)`
- `0 1px 3px rgba(0,0,0,0.15)`

Dark panel (`2012:307520`, bg `--color-bg` #2c2c2c, "DARK MODE" `2012:307527`): one 100 × 100 swatch (`2012:307521`) with dark E100 shadow + inset highlights. Token chips (`2012:307522`):
- `inset 0 .5px 0 rgba(255,255,255,0.1)`
- `inset 0 0 0.5px rgba(255,255,255,0.3)`
- `0 0 0.5px rgba(0,0,0,0.5)`
- `0 1px 3px rgba(0,0,0,0.4)`

Named effect styles: `light/elevation-100-canvas`, `dark/elevation-100-canvas` (full layer stacks in Section 3).

`[Deferred: render — ref nodes 2012:307513 (light), 2012:307520 (dark)]` — preview swatch layout. Token data above captured non-deferred.

---

## Section 5 — Elevation 200 (Stickies, Comments)

Node: `2012:307528` (`Elevation`, 1280 × 384)

### Heading + description

Section heading (`2012:307530`, Whyte Regular 18px):

> Elevation - 200, Stickies, Comments

Description (`2012:307531`, Whyte Book 13px), verbatim:

> Elements that appear on the canvas, but are distinctly sitting "on top" of the canvas
>
> FigJam stickies
> Comment pins

### Light / Dark preview panels

Light panel (`2012:307532`, "LIGHT MODE" `2012:307536`): swatch `2012:307535` with light E200 shadow. Token chips (`2012:307537`):
- `0 0 0.5px rgba(0,0,0,0.18)`
- `0 1px 3px rgba(0,0,0,0.1)`
- `0 3px 8px rgba(0,0,0,0.1)`

Dark panel (`2012:307541`, "DARK MODE" `2012:307548`): swatch `2012:307542` with dark E200 shadow + insets. Token chips (`2012:307543`):
- `inset 0 .5px 0 rgba(255,255,255,0.08)`
- `inset 0 0 .5px rgba(255,255,255,0.3)`
- `0 1px 3px rgba(0,0,0,0.35)`
- `0 3px 8px rgba(0,0,0,0.4)`

Named effect styles: `light/elevation-200-canvas`, `dark/elevation-200-canvas` (full stacks in Section 3).

`[Deferred: render — ref nodes 2012:307532 (light), 2012:307541 (dark)]`.

---

## Section 6 — Elevation 300 (Tooltips)

Node: `2012:307549` (`Elevation`, 1280 × 384)

### Heading + description

Section heading (`2012:307551`, Whyte Regular 18px):

> Elevation - 300, Tooltips

Description (`2012:307552`, Whyte Book 13px), verbatim:

> Elements that appear on the canvas, but are distinctly sitting "on top" of the canvas
>
> Tooltips
> Dragged objects
> Comment pin previews

### Light / Dark preview panels

Light panel (`2012:307553`, "LIGHT MODE" `2012:307557`): swatch `2012:307556` with light E300 shadow. Token chips (`2012:307558`):
- `0 0 0.5px rgba(0,0,0,0.15)`
- `0 1px 3px rgba(0,0,0,0.1)`
- `0 5px 12px rgba(0,0,0,0.13)`

Dark panel (`2012:307562`, "DARK MODE" `2012:307569`): swatch `2012:307563` with dark E300 shadow + insets. Token chips (`2012:307564`):
- `inset 0 .5px 0 rgba(255,255,255,0.08)`
- `inset 0 0 .5px rgba(255,255,255,0.3)`
- `0 1px 3px rgba(0,0,0,0.5)`
- `0 5px 12px rgba(0,0,0,0.35)`

Named effect styles: `light/elevation-300-tooltip`, `dark/elevation-300-tooltip` (full stacks in Section 3).

`[Deferred: render — ref nodes 2012:307553 (light), 2012:307562 (dark)]`.

---

## Section 7 — Elevation 400 (Menus, Panels)

Node: `2012:307570` (`Elevation`, 1280 × 384)

### Heading + description

Section heading (`2012:307572`, Whyte Regular 18px):

> Elevation - 400, Menus, Panels

Description (`2012:307573`, Whyte Book 13px), verbatim:

> UI elements that appear above the canvas
>
> Panels
> Menus
> Visual Bells
> Notifications Shade

### Light / Dark preview panels

Light panel (`2012:307574`, "LIGHT MODE" `2012:307578`): swatch `2012:307577` with light E400 shadow. Token chips (`2012:307579`):
- `0 0 0.5px rgba(0,0,0,0.12)`
- `0 2px 5px rgba(0,0,0,0.15)`
- `0 10px 16px rgba(0,0,0,0.12)`

Dark panel (`2012:307583`, "DARK MODE" `2012:307590`): swatch `2012:307584` with dark E400 shadow + insets. Token chips (`2012:307585`):
- `inset 0 .5 0px rgba(255,255,255,0.08)` *(chip text as authored — note the malformed `.5 0px`)*
- `inset 0 0 .5px rgba(255,255,255,.35)`
- `0 2px 5px rgba(0,0,0,0.35)`
- `0 10px 16px rgba(0,0,0,0.35)`

Named effect styles: `light/elevation-400-menu-panel`, `dark/elevation-400-menu-panel` (full stacks in Section 3).

`[Deferred: render — ref nodes 2012:307574 (light), 2012:307583 (dark)]`.

---

## Section 8 — Elevation 500 (Modals, Dialogs)

Node: `2012:307591` (`Elevation`, 1280 × 384)

### Heading + description

Section heading (`2012:307593`, Whyte Regular 18px):

> Elevation - 500, Modals, Dialogs

Description (`2012:307594`, Whyte Book 13px), verbatim:

> Larger views that appear on top of the broader view
>
> Modals
> Dialogs

### Light / Dark preview panels

Light panel (`2012:307595`, "LIGHT MODE" `2012:307599`): swatch `2012:307598` with light E500 shadow (inline: `0 0 0.5px rgba(0,0,0,0.08)`, `0 10px 24px rgba(0,0,0,0.18)`, `0 2px 5px rgba(0,0,0,0.15)`). Token chips (`2012:307600`):
- `0 0 .5px rgba(0,0,0,0.08)`
- `0 2px 5px rgba(0,0,0,0.15)`
- `0 10px 24px rgba(0,0,0,0.18)`

Dark panel (`2012:307604`, "DARK MODE" `2012:307611`): swatch `2012:307605` with dark E500 shadow + insets (inline: `0 10px 24px rgba(0,0,0,0.45)`, `0 3px 5px rgba(0,0,0,0.35)` + `inset 0 0.5px 0 rgba(255,255,255,0.08)`, `inset 0 0 0.5px rgba(255,255,255,0.35)`). Token chips (`2012:307606`):
- `inset 0 .5px 0 rgba(255,255,255,0.08)`
- `inset 0 0 .5px rgba(255,255,255,.35)`
- `0 3px 5px rgba(0,0,0,0.35)`
- `0 10px 24px rgba(0,0,0,0.45)`

Named effect styles: `light/elevation-500-modal-window`, `dark/elevation-500-modal-window` (full stacks in Section 3).

> Note (faithful capture): The per-level light E500 swatch here uses the lighter modal treatment (max alpha 0.18) — distinct from the dark-style E500 swatch rendered in the Section 3 overview row. The `light/elevation-500-modal-window` named style additionally carries a fourth `#0000000D (0,3) r12` haze layer not present in this swatch's token chips. Preserved as-is.

`[Deferred: render — ref nodes 2012:307595 (light), 2012:307604 (dark)]`.

---

## Cross-section token / value summary (captured values)

### Elevation scale — usage mapping (from named effect-style suffixes + section headings)

| Level | Named style suffix | Section heading | Usage examples (verbatim) |
|-------|--------------------|-----------------|---------------------------|
| E100 | `-canvas` | Shapes | FigJam shapes, FigJam sections, FigJam image shadows |
| E200 | `-canvas` | Stickies, Comments | FigJam stickies, Comment pins |
| E300 | `-tooltip` | Tooltips | Tooltips, Dragged objects, Comment pin previews |
| E400 | `-menu-panel` | Menus, Panels | Panels, Menus, Visual Bells, Notifications Shade |
| E500 | `-modal-window` | Modals, Dialogs | Modals, Dialogs |

### Box-shadow stacks (authoritative — named effect styles)

| Level | Light (DROP unless noted) | Dark (DROP + INNER highlights) |
|-------|---------------------------|--------------------------------|
| E100 | #00000026 (0,1) r3; #0000004D (0,0) r0.5 | #00000066 (0,1) r3; inset #FFFFFF4D (0,0) r0.5; inset #FFFFFF1A (0,0.5) r0; #00000080 (0,0) r0.5 |
| E200 | #0000001A (0,1) r3; #0000001A (0,3) r8; #0000002E (0,0) r0.5 | #00000080 (0,1) r3; inset #FFFFFF4D (0,0) r0.5; #00000059 (0,3) r8; inset #FFFFFF14 (0,0.5) r0 |
| E300 | #0000001A (0,1) r3; #00000021 (0,5) r12; #00000026 (0,0) r0.5 | #00000080 (0,1) r3; inset #FFFFFF4D (0,0) r0.5; #00000059 (0,5) r12; inset #FFFFFF14 (0,0.5) r0 |
| E400 | #00000026 (0,2) r5; #0000001F (0,10) r16; #0000001F (0,0) r0.5 | #00000059 (0,2) r5; inset #FFFFFF59 (0,0) r0.5; #00000059 (0,10) r16; inset #FFFFFF14 (0,0.5) r0 |
| E500 | #00000026 (0,2) r5; #0000002E (0,10) r24; #00000014 (0,0) r0.5; #0000000D (0,3) r12 | #00000059 (0,3) r5; inset #FFFFFF59 (0,0) r0.5; #00000073 (0,10) r24; inset #FFFFFF14 (0,0.5) r0 |

(All layers spread 0. 8-digit hex is #RRGGBBAA: e.g. #00000026 ≈ rgba(0,0,0,0.15), #0000004D ≈ 0.30, #00000066 ≈ 0.40, #00000080 ≈ 0.50, #00000073 ≈ 0.45, #00000059 ≈ 0.35, #FFFFFF4D ≈ rgba(255,255,255,0.30), #FFFFFF59 ≈ 0.35, #FFFFFF14 ≈ 0.08, #FFFFFF1A ≈ 0.10.)

### Color / dimension tokens referenced

- `--color-bg`: white (light context) / #2c2c2c (dark context)
- `--radius-large`: ~0.8125rem (13px) — all elevation swatch corner radius
- Token chip palette: `_/Light/Green 100` #EBFFEE (chip bg), `_/Light/Green 700` #008043 (chip text)
- Overview swatch: 128 × 128px, gap 64px; per-level preview swatch: 100 × 100px
- Preview panels: 352 × 384px each; dashed light-panel border 1px rgba(0,0,0,0.1); dark-panel bg `--color-bg` #2c2c2c
- Redline/mode labels: rgba(0,0,0,0.3) (light) / rgba(255,255,255,0.3) (dark)

### Anomalies flagged (faithful capture)

1. **Light E500 swatch in overview row vs. detail section** — overview `2012:307489` renders the dark-style treatment (dark shadow + white inset highlight); detail-section `2012:307598` renders the lighter modal shadow (max alpha 0.18). Two different treatments for "light E500."
2. **Named style vs. rendered swatch (E500)** — `light/elevation-500-modal-window` defines 4 layers (extra `#0000000D (0,3) r12` haze); `dark/elevation-500-modal-window` defines a `#FFFFFF59 (0,0) r0.5` inner highlight — neither fully matches the inline swatch / token-chip stacks.
3. **Malformed token-chip string (E400 dark)** — chip authored as `inset 0 .5 0px rgba(255,255,255,0.08)` (missing `px` on the `.5`, stray `0px`). Captured verbatim.
4. **Inconsistent chip abbreviation** — alpha values appear as both `0.5px` and `.5px`, and `0.35`/`.35`, across chips. Captured as authored per section.
