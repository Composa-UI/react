<!--
Source: Figma "Segmented Control Guidelines" page — fileKey 4kilp0ShQiYsoUPJdleqEH, entry node 2015:20827
1:1 import — raw, pre-organization. Faithful capture, not synthesis. Re-organize into tabs later.
Frames transcribed: 2015:20830, 2015:20835, 2015:20864, 2015:20889, 2015:20922, 2015:20937
-->

# Segmented Control — Guidelines (1:1 Figma import)

Page frame: `2015:20827` "Segmented Control Guidelines" (1280 × 2332). Contains a `_Status` instance bar (`2359:117660`) and a content frame "Frame 3" (`2015:20829`) holding six `_Section/Component` sections.

Doc text styles present across the page:
- `_doc/heading`: Whyte, Regular, size 18, weight 400, lineHeight 32, letterSpacing 1
- `_doc/description`: Whyte, Book, size 13, weight 350, lineHeight 22, letterSpacing 1
- `_doc/body/body.medium`: family `body/medium/fontFamily`, Medium, size `body/medium/fontSize`, weight `body/medium/fontWeight`, lineHeight `body/medium/lineHeight`, letterSpacing 0.5

---

## Section 1 — Component intro / Definition

Node: `2015:20830` (`_Section/Component`, 1280 × 216)

### Heading + description

Component Name (`2015:20832`, Whyte Regular 36px, color rgba(0,0,0,0.9), tracking 0.36px):

> Segmented Control

Description (`2015:20833`, Whyte Regular 18px, color rgba(0,0,0,0.6), tracking 0.18px, width 412px), verbatim:

> A "segmented control" which uses icons to choose between a set of independent states. Formerly known as "Option Strip"

---

## Section 2 — Variants (tab counts × icon-set types), Light & Dark

Node: `2015:20835` (`_Section/Component`, 1280 × 540)

### Heading + description

Component Name (`2015:20837`, Whyte Regular 18px):

> Segmented Control

Description (`2015:20838`, Whyte Book 13px), verbatim (multi-paragraph):

> Our option strip has several different variants. It typically sizes to fit our wide and narrow grid system, occupying either 88px or 168px of width depending on the overall panel width.
>
> Note that when we need to present a "default" state, we use a horizontal bar to represent that "no modification was made".

### Light / Dark context (`2015:20839`, 704px wide)

Two panels side by side: **Light** (`2015:20840`, bg `--color-bg` white, 1px rgba(0,0,0,0.1) border) labeled "LIGHT MODE" (`2015:20841`), and **Dark** (`2015:20842`, bg `--color-bg` #2c2c2c) labeled "DARK MODE" (`2015:20843`).

Each panel contains a Drop Zone (`2015:20854` light / `2015:20844` dark) laying out a vertical stack of six `_Common segmented controls` specimens (gap 32px). Light specimens `2015:20856`–`2015:20861`; dark `2015:20846`–`2015:20851`. Two `_Label/Redline/State-Left` labels are positioned at the bottom of each drop zone (light `2015:20862`/`2015:20863`, dark `2015:20852`/`2015:20853`), both reading **Default** — styled with `--color-bg-assistive-tertiary` (#ffe0fc light / #68275e dark) and text `--color-text-assistive` (#ea10ac light / #fc9ce0 dark).

**The 6 specimens (by stack order, applies to both panels) — derived from `CommonSegmentedControls` props:**

| # | tabCount | type | width | Icon glyphs (in order) |
|---|----------|------|-------|------------------------|
| 1 | 2 | Autolayout | 88px | `al.layout-vertical`, `al.layout-horizontal` |
| 2 | 3 | Autolayout | 88px | `al.layout-vertical`, `al.layout-horizontal`, `al.layout-wrap` |
| 3 | 3 | Autolayout | 168px | `al.layout-vertical`, `al.layout-horizontal`, `al.layout-wrap` |
| 4 | 4 | Text Alignment | 168px | `text.align-left`, `text.align-center`, `text.align-right`, `text.align-justified` |
| 5 | 5 | Number Transform | 168px | `minus`, `proportional-uppercase-number`, `monospace-uppercase-number`, `proportional-lowercase-number`, `monospace-lowercase-number` |
| 6 | 6 | Text Transform | 168px | `minus`, `text.caps-small`, `lowercase` (ag), `title-case`, `small-caps`, `uppercase` |

> Note (faithful capture): the leading `minus` glyph in the Number Transform (5) and Text Transform (6) specimens is the horizontal-bar "default / no modification" state described in the section prose. In the standalone component definition the first tab also renders `minus` for tabCount 5/6; in the light Drop Zone instance (`2015:20861`) the 6-tab specimen's first tab also resolves to `minus`. Preserved as authored.

### `_Common segmented controls` — variant axes (from component definition `2015:21064` embedded in this frame)

`CommonSegmentedControlsProps`:
- `state`: `"Default"` (only value present in this section's definition)
- `tabCount`: `"2" | "3" | "4" | "5" | "6"` (default `"2"`)
- `type`: `"Autolayout" | "Text Alignment" | "Text Transform" | "Number Transform"` (default `"Autolayout"`)

Container sizing rule (from props): width 88px for the 2-tab Autolayout cases; 168px once tabCount ≥ 3 (3-Autolayout, 4-Text Alignment, 5-Number Transform, 6-Text Transform).

### Token / value capture (track + tab styling — token-driven, captured)

Each tab is a flex `1 0 0`, height 24px, min-width 1px, centered, radius `--radius-medium` (0.3125rem / 5px). Strip container radius `--radius-medium`, `overflow-clip`. Icons are 24px boxes.

| Element | Light fallback | Dark fallback |
|---------|----------------|---------------|
| Strip bg `--color-bg-secondary` | #f5f5f5 | #383838 |
| Selected tab bg `--color-bg` | white | #2c2c2c |
| Selected tab border `--color-border` | #e6e6e6 | #444 |
| Unselected tab bg `--color-bg-secondary` | #f5f5f5 | #383838 |

> In this section the first tab ("Tab 01") carries the selected styling (bg `--color-bg` + 1px `--color-border` border); remaining tabs use the secondary track bg with no border.

`[Deferred: render — ref nodes 2015:20854 (light drop zone), 2015:20844 (dark drop zone)]` — component-dependent specimen layout (six-variant stack). Variant axes + token data above captured non-deferred.

---

## Section 3 — Focus Behaviors

Node: `2015:20864` (`_Section/Component`, 1280 × 244)

### Heading + description

Component Name (`2015:20866`, Whyte Regular 18px):

> Focus Behaviors

Description (`2015:20867`, Whyte Book 13px), verbatim:

> Each individual tab within the segmented control is designed to be focusable, allowing for refined, precise interaction using a keyboard.
>
> Directional keys function in a manner that closely mirrors the native behavior of a web browser.

### Light / Dark context (`2015:20868`)

Light panel (`2015:20869`, "LIGHT MODE" `2015:20870`) and Dark panel (`2015:20879`, "DARK MODE" `2015:20880`).

Each Drop Zone holds a single redline label group (`2015:20872` light / `2015:20882` dark) reading **Focus State**, plus a vertical stack (gap 14px) of four 4-tab Text-Alignment segmented controls demonstrating the focus ring walking across the tabs:

| Stack position | Focused tab (gets selected/focus styling) | Specimen node (light / dark) |
|----------------|-------------------------------------------|------------------------------|
| 1 | Tab 01 (align-left) | `2015:20875` / `2425:39661` |
| 2 | Tab 02 (align-center) | `2015:20876` / `2425:39662` |
| 3 | Tab 03 (align-right) | `2015:20877` / `2425:39663` |
| 4 | Tab 04 (align-justified) | `2015:20878` / `2425:39664` |

### Focus-state token capture

The focused tab differs from Section 2's "selected" tab: it uses bg `--color-bg` (white / #2c2c2c) with a `--color-border-selected` border (#0d99ff light / #0c8ce9 dark) — not `--color-border`. The focused tab also carries inner gap/padding tokens `--spacer-1` (0.3rem / 0px) and horizontal padding `--spacer-2` (0.5rem / 8px). Unfocused tabs sit on the `--color-bg-secondary` track with no border.

`[Deferred: render — ref nodes 2015:20871 (light drop zone), 2015:20881 (dark drop zone)]` — component-dependent focus-walk layout.

---

## Section 4 — Keyboard interaction (list semantics)

Node: `2015:20889` (`_Section/Component`, 1280 × 244)

### Heading + description

Component Name (`2015:20891`, Whyte Regular 18px) — **hidden in source** (`hidden="true"`), no visible heading rendered.

Description (`2015:20892`, Whyte Book 13px), verbatim (multi-paragraph):

> A segmented control is treated like a list where each list item contains a button.
>
> Tab behaves just like it would in a list of focusable elements.
>
> Pressing Enter or Space while focused on a deselected button selects that button. This is the default behavior for buttons.
>
> If the focused button is already selected, pressing Enter or Space should not deselect the button.

### Light / Dark context (`2015:20893`)

Light panel (`2015:20894`, "LIGHT MODE" `2015:20895`) and Dark panel (`2015:20908`, "DARK MODE" `2015:20909`).

Each Drop Zone has a column of four redline labels (light `2015:20897`, dark `2015:20911`; gap 22px) annotating four stacked specimens. Labels (top→bottom): **Default**, **Focus**, **Disabled**, **Focus, Segment**.

The specimens (light / dark node pairs):

| Redline | Specimen | Description | Light / Dark node |
|---------|----------|-------------|-------------------|
| Default | 4-tab Text Alignment, Default | default strip, Tab 01 selected (`--color-border`) | `2015:20902` / `2015:20916` |
| Focus | 4-tab Text Alignment | Tab 01 focused (`--color-border-selected`) | `2015:20903` / `2015:20917` |
| Disabled | 4-tab Text Alignment, Disabled | all tabs disabled (no bg/border, dimmed icons) | `2015:20904` / `2015:20918` |
| Focus, Segment (a) | 2-tab Autolayout | Tab 01 focused/selected | `2015:20905` / `2015:20919` |
| Focus, Segment (b) | 2-tab Autolayout | Tab 02 focused/selected | `2015:20907` / `2015:20921` |
| Focus, Segment (c) | 2-tab Autolayout | Tab 02 selected (`--color-border`, non-focus) | `2015:20906` / `2015:20920` |

> Note (faithful capture): the "Focus, Segment" redline spans three 2-tab Autolayout specimens (`2015:20905`, `2015:20907`, `2015:20906`) authored at staggered `top` positions (182/220/258px) showing focus on tab 1, focus on tab 2, and a plain-selected tab 2. Preserved as-is.

### `_Common segmented controls` — variant axes (definition `2015:21064` embedded here)

This section's definition exposes a **Disabled** state, narrower axes than Section 2:
- `state`: `"Default" | "Disabled"` (default `"Default"`)
- `tabCount`: `"2" | "4"` (default `"2"`)
- `type`: `"Autolayout" | "Text Alignment"` (default `"Autolayout"`)

### Token capture (Default / Focus / Disabled)

- **Default selected tab**: bg `--color-bg` + 1px `--color-border` (#e6e6e6 / #444).
- **Focus tab**: bg `--color-bg` + 1px `--color-border-selected` (#0d99ff / #0c8ce9); inner `--spacer-1` gap, `--spacer-2` horizontal padding.
- **Disabled strip**: all tabs lose bg and border (transparent over the secondary track); icons take dimmed/disabled rendering.

`[Deferred: render — ref nodes 2015:20896 (light drop zone), 2015:20910 (dark drop zone)]` — component-dependent default/focus/disabled/focus-segment layout.

---

## Section 5 — Disabled Options

Node: `2015:20922` (`_Section/Component`, 1280 × 244)

### Heading + description

Component Name (`2015:20924`, Whyte Regular 18px):

> Disabled Options

Description (`2015:20925`, Whyte Book 13px), verbatim (multi-paragraph):

> In rare cases, we'll run into disabled choices within the segmented control. In particular, this tends to happen when a font doesn't support small caps in the Text properties panel.
>
> In this instance, the disabled option will take on associated 'disabled' color tokens, and be supplemented with a detailed tooltip.

### Light / Dark context (`2015:20926`)

Light panel (`2015:20927`, "LIGHT MODE" `2015:20928`) and Dark panel (`2015:20932`, "DARK MODE" `2015:20933`).

Each DZ holds one 6-tab Text-Transform segmented control (light `2015:20930` / dark `2015:20935`) with a `Tooltip/Default/BottomCenter` (light `2015:20931` / dark `2015:20936`) anchored above it.

Strip tabs (in order): `minus`, `text.caps-small`, `lowercase` (ag), `title-case`, `small-caps`, then Tab 06. In the **light** strip Tab 06 is the disabled option — it renders `icon.24.text.caps-all` (Union glyph) and carries the inner `--spacer-1` gap + `--spacer-2` padding tokens but no track bg, representing the disabled treatment. In the **dark** strip Tab 06 renders `icon.24.uppercase` on the normal secondary track.

> Note (faithful capture): light Tab 06 (`I2015:20930;2015:21135`) uses `text.caps-all` (Union) while dark Tab 06 (`I2015:20935;2015:21135`) uses `uppercase`; the light variant is the one styled as the disabled segment. Preserved as authored.

### Tooltip token capture (`2015:20931` / `2015:20936`)

- Container: bg `--color-bg-tooltip` (#1e1e1e), radius `--radius-medium`, padding `--spacer-2` horizontal / `--spacer-0` (0rem) vertical, max-width 200px, drop-shadow `light/elevation-300-tooltip` (three stacked drop shadows: 0/1/3 #0000001A, 0/5/12 #00000021, 0/0/0.5 #00000026).
- Label row: `body/medium` (Inter Medium 11px, weight `body/medium/fontWeight` 450, lineHeight `body/medium/lineHeight` 16px, tracking 0.055px), height 24px, gap `--spacer-1`, width 182px.
- Primary label text `--color-text-tooltip` (white): verbatim **Tooltip text**
- Secondary/shortcut text `--color-text-tooltip-secondary` (rgba(255,255,255,0.7)): verbatim **⌘V**

`[Deferred: render — ref nodes 2015:20929 (light DZ), 2015:20934 (dark DZ)]` — component-dependent disabled-segment-plus-tooltip layout.

---

## Section 6 — Text Labels

Node: `2015:20937` (`_Section/Component`, 1280 × 244)

### Heading + description

Component Name (`2015:20939`, Whyte Regular 18px):

> Text Labels

Description (`2015:20940`, Whyte Book 13px), verbatim (multi-paragraph):

> Occasionally, segmented controls will often show up in label-only form. In these cases, we offer a variant of our segmented controls with text labels.
>
> Segmented controls should be sized to fit their parent container. If the label is too big for the container, it should truncate.

### Light / Dark context (`2015:20941`)

Light panel (`2015:20942`, "LIGHT MODE" `2015:20943`) and Dark panel (`2015:20951`, "DARK MODE" `2015:20952`).

Each panel groups three 3-segment "Segmented control" (label) specimens (width 240px), each wrapped in its own DZ:

| # | DZ (light / dark) | Strip (light / dark) | Segment 1 label (active) |
|---|-------------------|----------------------|--------------------------|
| 1 | `2015:20945` / `2425:39967` | `2015:20946` / `2425:39968` | Label |
| 2 | `2015:20947` / `2425:39969` | `2015:20948` / `2425:39970` | Long Label |
| 3 | `2015:20949` / `2425:39971` | `2015:20950` / `2425:39972` | Truncation.. |

Segments 2 and 3 of each strip carry the inactive label string **Label**.

> Note (faithful capture): the third specimen's first segment reads **Truncation..** (with trailing ellipsis dots) demonstrating the truncation rule from the prose. Preserved verbatim.

### `_Segment label` — variant axes (from `SegmentLabel` definition `2015:21148` embedded here)

`SegmentLabelProps`:
- `state`: `"Default"` (only value present)
- `active`: boolean (default true) — active = selected segment
- `label`: string (default `"Label"`)

### Token capture (label segment)

Each segment: padding 8px / 4px, radius `--radius-medium`, flex `1 0 0`, min-width 1px, `overflow-hidden` with `text-ellipsis` for truncation.

| Element | Light fallback | Dark fallback |
|---------|----------------|---------------|
| Active segment bg `--color-bg` + border `--color-border` | white / #e6e6e6 | #2c2c2c / #444 |
| Inactive segment bg `--color-bg-secondary` | #f5f5f5 | #383838 |
| Active label text `--color-text` | rgba(0,0,0,0.9) | white |
| Inactive label text `--color-text-secondary` | rgba(0,0,0,0.5) | rgba(255,255,255,0.7) |

Label text style: `body/medium` (Inter Medium 11px, weight 450, lineHeight 16px, tracking 0.055px).

`[Deferred: render — ref nodes 2015:20944 (light Group 1), 2425:39966 (dark Group 2)]` — component-dependent labeled-segment layout.

---

## Cross-section token summary (captured values)

Color variables referenced across the page (var → light fallback / dark fallback where both observed):

- `--color-bg`: white / #2c2c2c
- `--color-bg-secondary`: #f5f5f5 / #383838
- `--color-bg-tooltip`: #1e1e1e
- `--color-bg-assistive-tertiary`: #ffe0fc / #68275e
- `--color-border`: #e6e6e6 / #444
- `--color-border-selected`: #0d99ff / #0c8ce9
- `--color-text`: rgba(0,0,0,0.9) / white
- `--color-text-secondary`: rgba(0,0,0,0.5) / rgba(255,255,255,0.7)
- `--color-text-tooltip`: white
- `--color-text-tooltip-secondary`: rgba(255,255,255,0.7)
- `--color-text-assistive`: #ea10ac / #fc9ce0

Dimension / radius / spacer tokens:
- `--radius-medium`: 0.3125rem (5px) — strip + tab + tooltip radius
- `--spacer-0`: 0rem (0px) — tooltip vertical padding
- `--spacer-1`: 0.3rem (rendered 0px gap / 4px in tooltip) — inner tab gap
- `--spacer-2`: 0.5rem (8px) — inner tab horizontal padding; tooltip horizontal padding
- Tab height: 24px; icon box: 24px; strip widths: 88px (narrow / 2-tab) or 168px (wide / ≥3-tab); label strip: 240px
- Tooltip: max-width 200px, label row width 182px, height 24px; drop-shadow `light/elevation-300-tooltip`

Component definitions embedded across the page (note: same name, different prop sets per section):
- Section 2 `CommonSegmentedControls`: `state="Default"`; `tabCount` 2–6; `type` Autolayout / Text Alignment / Text Transform / Number Transform
- Section 4 `CommonSegmentedControls`: `state` Default/Disabled; `tabCount` 2/4; `type` Autolayout / Text Alignment
- Section 6 `SegmentLabel`: `state="Default"`; `active` boolean; `label` string

Icon glyphs referenced (24px set): `al.layout-vertical`, `al.layout-horizontal`, `al.layout-wrap`, `text.align-left`, `text.align-center`, `text.align-right`, `text.align-justified`, `minus`, `proportional-uppercase-number`, `monospace-uppercase-number`, `proportional-lowercase-number`, `monospace-lowercase-number`, `text.caps-small`, `lowercase` (ag), `title-case`, `small-caps`, `uppercase`, `text.caps-all` (Union).
