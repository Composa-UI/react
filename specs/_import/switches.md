<!--
Source: Figma "Switch Guidelines" page — fileKey 4kilp0ShQiYsoUPJdleqEH, entry node 2015:24606
1:1 import — raw, pre-organization. Faithful capture, not synthesis. Re-organize into tabs later.
Frames transcribed: 2015:24609, 2015:24616, 2015:24655, 2015:24682
-->

# Switch — Guidelines (1:1 Figma import)

Page frame: `2015:24606` "Switch Guidelines" (1280 × 1656). Contains a `_Status` instance bar (`2359:118664`) and a content frame "Frame 3" (`2015:24608`) holding four `_Section/Component` sections.

Doc text styles present across the page:
- `_doc/heading`: Whyte, Regular, size 18, weight 400, lineHeight 32, letterSpacing 1
- `_doc/description`: Whyte, Book, size 13, weight 350, lineHeight 22, letterSpacing 1
- `_doc/body/body.medium`: family `body/medium/fontFamily`, Medium, size `body/medium/fontSize`, weight `body/medium/fontWeight`, lineHeight `body/medium/lineHeight`, letterSpacing 0.5

---

## Section 1 — Component intro / Definition

Node: `2015:24609` (`_Section/Component`, 1280 × 216)

### Heading + description

Component Name (`2015:24611`, Whyte Regular 36px, color rgba(0,0,0,0.9), tracking 0.36px):

> Switch

Description (`2015:24612`, Whyte Regular 18px, color rgba(0,0,0,0.6), tracking 0.18px, width 412px), verbatim:

> Represents a physical toggle to turn a setting "on" or "off". Unlike checkboxes, toggling a switch should take immediate effect without a need for additional confirmation steps ("save").

### Related Component callout

Node: `2661:12565` (`_Label/Related Component`, 352 × 92). Card with background `--color-bg-component-tertiary` (#f1e5ff), radius 6px, padding 40px/8px. Has a 16px component icon (`2661:12569` `icon.16.component`, top-left).

- Title (`2661:12567`, Inter Semi Bold 11px, color `--color-text-component` #8638e5, ss02 enabled): **Checkbox**
- Description (`2661:12568`, Whyte Book 13px, color rgba(0,0,0,0.6)), verbatim:

  > If changing this state doesn't take immediate effect, you may want to use a checkbox instead.

---

## Section 2 — States matrix (On / Mixed / Off × Focus / Disabled), Light & Dark

Node: `2015:24616` (`_Section/Component`, 1280 × 352)

### Heading + description

Component Name (`2015:24618`, Whyte Regular 18px):

> Switch

Description (`2015:24619`, Whyte Book 13px), verbatim:

> In addition to the "on" and "off" state, we also use a mixed state when a switch has an indeterminate state.

### Light / Dark context (`2015:24620`, 704px wide)

Two panels side by side: **Light** (`2015:24621`, bg `--color-bg` white, 1px rgba(0,0,0,0.1) border) labeled "LIGHT MODE" (`2015:24622`), and **Dark** (`2015:24638`, bg `--color-bg` #2c2c2c) labeled "DARK MODE" (`2015:24639`).

Each panel contains a Drop Zone (`2015:24623` light / `2419:115552` dark) laying out a 3×3 grid of switch specimens with redline labels. The redline labels use `_Label/Redline/State-Left` (row labels) and `_Label/Redline/State-Above` (column labels), styled with `--color-bg-assistive-tertiary` (#ffe0fc light / #68275e dark) and text `--color-text-assistive` (#ea10ac light / #fc9ce0 dark).

**Matrix axes (redline annotations):**

- Row labels (left, top→bottom): **On** (`2015:24624`), **Mixed** (`2015:24625`), **Off** (`2015:24626`)
- Column labels (above): col 2 = **Focus** (`2015:24636`), col 3 = **Disabled** (`2015:24637`). Col 1 is the default/normal column (unlabeled).

**The 9 switch specimens (light, `2015:24627`–`2015:24635`), by grid cell — all `label={false}`:**

| Cell | type | state | disabled | Switch node (light / dark) |
|------|------|-------|----------|----------------------------|
| On / Default | On | Default | false | `2015:24627` / `2419:115556` |
| On / Focus | On | Focused | **disabled** | `2015:24630` / `2419:115559` |
| On / Disabled | On | Default | disabled | `2015:24633` / `2419:115562` |
| Mixed / Default | Mixed | Default | false | `2015:24628` / `2419:115557` |
| Mixed / Focus | Mixed | Focused | false | `2015:24631` / `2419:115560` |
| Mixed / Disabled | Mixed | Default | disabled | `2015:24634` / `2419:115563` |
| Off / Default | Off | Default | false | `2015:24629` / `2419:115558` |
| Off / Focus | Off | Focused | false | `2015:24632` / `2419:115561` |
| Off / Disabled | Off | Default | disabled | `2015:24635` / `2419:115564` |

> Note (faithful capture): The "On / Focus" specimen is authored with `state="Focused"` AND `disabled` set (per source props on `2015:24630`). The "Off / Focus" and "Mixed / Focus" specimens are focused + not-disabled. Preserving as-is; reconcile during clean-up.

### Switch component — variant axes (from component definition embedded in this frame)

`SwitchProps`:
- `state`: `"Default" | "Focused"` (default `"Default"`)
- `type`: `"On" | "Off" | "Mixed"` (default `"On"`)
- `disabled`: boolean (default false)
- `label`: boolean (default true)
- `description`: boolean (default false)

### Token / value capture (state styling — token-driven, captured)

Switch track is 32×16px. Knob is 14×14px. Container row height 24px, gap `--spacer-2` (0.5rem / 8px).

| State | Track bg / border | Radius | Knob | Light fallback | Dark fallback |
|-------|-------------------|--------|------|----------------|---------------|
| On, Default | `--color-bg-brand` | `--radius-full` (9999px) | `--color-icon-onbrand`, right | #0d99ff / white | #0c8ce9 / white |
| On, Disabled | `--color-bg-tertiary` | `--radius-full` | `--color-icon-ondisabled`, right | #e6e6e6 / white | #444 / #2c2c2c |
| On, Focused (disabled) | border `--color-border-selected-strong`, inner bg `--color-bg-brand`, inset 0 0 0 2px white shadow | `--radius-full` | `--color-icon-onbrand`, left 17px | #007be5 border / #0d99ff | #7cc4f8 border / #0c8ce9 |
| Off, Default | `--color-bg-tertiary` | `--radius-large` (0.8125rem) | `--color-icon-onbrand`, left | #e6e6e6 / white | #444 / white |
| Off, Disabled | `--color-bg-disabled` | `--radius-large` | `--color-icon-ondisabled`, left | #d9d9d9 / white | #757575 / #2c2c2c |
| Off, Focused | border `--color-border-selected`, inner bg `--color-bg-tertiary`, inset 0 0 0 2px white shadow | `--radius-large` | `--color-icon-onbrand`, left 1px | #0d99ff border / #e6e6e6 | #0c8ce9 border / #444 |
| Mixed, Default | `--color-bg-brand`, `icon.16.mixed` glyph centered | `--radius-large` | (no knob — mixed icon) | #0d99ff | #0c8ce9 |
| Mixed, Disabled | `--color-bg-disabled`, mixed icon | `--radius-large` | (mixed icon) | #d9d9d9 | #757575 |
| Mixed, Focused | border `--color-border-selected-strong`, inner bg `--color-bg-brand`, mixed icon, inset 0 0 0 2px white shadow | `--radius-large` | (mixed icon) | #007be5 border / #0d99ff | #7cc4f8 border / #0c8ce9 |

Mixed-state glyph: `icon.16.mixed` — a horizontal dash, 8px × 1px, centered in the 16px icon box.

State label strings used by the component (Inter Medium 11px via `body/medium`, tracking 0.055px). Normal/Focused use `--color-text` (rgba(0,0,0,0.9) light / white dark); Disabled uses `--color-text-disabled` (rgba(0,0,0,0.3) light / rgba(255,255,255,0.4) dark):
- "On, Normal" / "On, Focused" / "On, Disabled"
- "Off, Normal" / "Off, Focused" / "Off, Disabled"
- "Mixed, Normal" / "Mixed, Focused" / "Mixed, Disabled"

`[Deferred: render — ref nodes 2015:24621 (light grid), 2015:24638 (dark grid)]` — component-dependent specimen layout (full 3×3 redline matrix). Token/state data above captured non-deferred.

---

## Section 3 — Switch with Label

Node: `2015:24655` (`_Section/Component`, 1280 × 352)

### Heading + description

Component Name (`2015:24657`, Whyte Regular 18px):

> Switch with Label

Description (`2015:24658`, Whyte Book 13px), verbatim:

> Usually, switches are accompanied with a label. Note that if a switch is disabled, the label is disabled as well.

### Light / Dark context (`2015:24659`)

Light panel (`2015:24660`, "LIGHT MODE" `2015:24661`) and Dark panel (`2015:24671`, "DARK MODE" `2015:24672`).

Specimens are labeled switches arranged in **two columns** (On column + Off column), gap 32px, each column stacked with 16px gap.

**Switch component for this section** — `type` is boolean here (`true` = On, `false` = Off); `state`: `"Default" | "Focused"`; `disabled` boolean; `label` true; `description` false.

Light column 1 (`2015:24663` — On):
- `2015:24664`: On, Default (type=true)
- `2015:24665`: On, Focused + disabled (state="Focused", disabled)
- `2015:24666`: On, Disabled (disabled)

Light column 2 (`2015:24667` — Off):
- `2015:24668`: Off, Default (type=false)
- `2015:24669`: Off, Focused (state="Focused", type=false)
- `2015:24670`: Off, Disabled (disabled, type=false)

Dark column On (`2419:115714`): `2419:115715` On Normal, `2419:115716` On Focused, `2419:115717` On Disabled.
Dark column Off (`2419:115718`): `2419:115719` Off Normal, `2419:115720` Off Focused, `2419:115721` Off Disabled.

**Label text + color (token capture):**
- Label uses `body/medium` (Inter Medium 11px, tracking 0.055px).
- Normal/Focused label color: `--color-text` (rgba(0,0,0,0.9) light / white dark).
- Disabled label color: `--color-text-disabled` (rgba(0,0,0,0.3) light / rgba(255,255,255,0.4) dark) — confirming the rule "if a switch is disabled, the label is disabled as well."
- Label strings shown: "On, Normal", "On, Focused", "On, Disabled", "Off, Normal", "Off, Focused", "Off, Disabled".

> Note (faithful capture): "On, Focused" specimen (`2015:24665`) is authored with both `state="Focused"` and `disabled`. Preserved as-is.

`[Deferred: render — ref nodes 2015:24660 (light), 2015:24671 (dark)]` — component-dependent labeled-switch layout.

---

## Section 4 — Switch with Description

Node: `2015:24682` (`_Section/Component`, 1280 × 352)

### Heading + description

Component Name (`2015:24684`, Whyte Regular 18px):

> Switch with Description

Description (`2015:24685`, Whyte Book 13px), verbatim:

> In cases where we might need more room to add context to a setting, we can add a description aligned with the label.

### Light / Dark context (`2015:24686`)

Light panel (`2015:24687`, "LIGHT MODE" `2015:24688`) and Dark panel (`2015:24692`, "DARK MODE" `2015:24693`).

Drop Zone is a vertical stack (gap `--spacer-2` 8px) of two switches, each with label + description.

Light (`2015:24689`):
- `2015:24690`: On, Normal + description (type=true, `description`)
- `2015:24691`: Off, Normal + description (type=false, `description`)

Dark (`2419:115756`):
- `2419:115757`: On, Normal + description
- `2419:115758`: Off, Normal + description

**Description sub-element (token capture):**
- Container: `pl-[40px]`, width 252px (min/max 252px) — description is left-aligned under the label, indented 40px (track 32px + gap 8px), so it aligns with the label text.
- Text style: `body/medium` (Inter Medium 11px, tracking 0.055px, lineHeight 16px).
- Description color: `--color-text-secondary` (rgba(0,0,0,0.5) light / rgba(255,255,255,0.7) dark).
- Label color: `--color-text` (rgba(0,0,0,0.9) light / white dark).
- Description text (verbatim, repeated placeholder for both On and Off specimens):

  > Helpful description of the setting which may briefly highlight side effects or conditions of the setting.

`[Deferred: render — ref nodes 2015:24687 (light), 2015:24692 (dark)]` — component-dependent label+description layout.

---

## Cross-section token summary (captured values)

Color variables referenced across the page (var → light fallback / dark fallback where both observed):

- `--color-bg`: white / #2c2c2c
- `--color-bg-brand`: #0d99ff / #0c8ce9
- `--color-bg-tertiary`: #e6e6e6 / #444
- `--color-bg-disabled`: #d9d9d9 / #757575
- `--color-bg-component-tertiary`: #f1e5ff
- `--color-bg-assistive-tertiary`: #ffe0fc / #68275e
- `--color-icon-onbrand`: white
- `--color-icon-ondisabled`: white / #2c2c2c
- `--color-border-selected`: #0d99ff / #0c8ce9
- `--color-border-selected-strong`: #007be5 / #7cc4f8
- `--color-text`: rgba(0,0,0,0.9) / white
- `--color-text-secondary`: rgba(0,0,0,0.5) / rgba(255,255,255,0.7)
- `--color-text-disabled`: rgba(0,0,0,0.3) / rgba(255,255,255,0.4)
- `--color-text-component`: #8638e5
- `--color-text-assistive`: #ea10ac / #fc9ce0

Dimension/radius tokens:
- `--spacer-2`: 0.5rem (8px) — switch container gap
- `--radius-full`: 9999px — On-state track radius
- `--radius-large`: 0.8125rem (~13px, rendered 9999px in pill context) — Off/Mixed track radius
- Track: 32 × 16px; Knob: 14 × 14px; Container row: 24px high
- Description indent: 40px left padding, 252px width
