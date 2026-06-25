<!--
Source: Figma "Checkbox Guidelines" page — fileKey 4kilp0ShQiYsoUPJdleqEH, entry node 2012:55362
1:1 import — raw, pre-organization. Faithful capture, not synthesis. Re-organize into tabs later.
Frames transcribed: 2012:55365, 2012:55372, 2012:55411, 2012:55446
-->

# Checkbox — Guidelines (1:1 Figma import)

Page frame: `2012:55362` "Checkbox Guidelines" (1280 × 1656). Contains a `_Status` instance bar (`2359:64306`) and a content frame "Frame 3" (`2012:55364`) holding four `_Section/Component` sections.

Doc text styles present across the page:
- `_doc/heading`: Whyte, Regular, size 18, weight 400, lineHeight 32, letterSpacing 1
- `_doc/description`: Whyte, Book, size 13, weight 350, lineHeight 22, letterSpacing 1
- `_doc/body/body.medium`: family `body/medium/fontFamily`, Medium, size `body/medium/fontSize`, weight `body/medium/fontWeight`, lineHeight `body/medium/lineHeight`, letterSpacing 0.5

---

## Section 1 — Component intro / Definition

Node: `2012:55365` (`_Section/Component`, 1280 × 216)

### Heading + description

Component Name (`2012:55367`, Whyte Regular 36px, color rgba(0,0,0,0.9), tracking 0.36px):

> Checkbox

Description (`2012:55368`, Whyte Regular 18px, color rgba(0,0,0,0.6), tracking 0.18px, width 412px), verbatim:

> Used for binary choices, like settings in our design editor, as well as for selecting individual rows in our admin interface.

### Related Component callout

Node: `2777:9907` (`_Label/Related Component`, 352 × 92). Card with background `--color-bg-component-tertiary` (#f1e5ff), radius 6px, padding 40px/8px. Has a 16px component icon (`2777:9911` `icon.16.component`, top-left).

- Title (`2777:9909`, Inter Semi Bold 11px, color `--color-text-component` #8638e5, ss02 enabled): **Switch**
- Description (`2777:9910`, Whyte Book 13px, color rgba(0,0,0,0.6)), verbatim:

  > If this state changes immediately, you may want to consider using a switch instead.

---

## Section 2 — States matrix (On / Mixed / Off × Focus / Disabled), Light & Dark

Node: `2012:55372` (`_Section/Component`, 1280 × 352)

### Heading + description

Component Name (`2012:55374`, Whyte Regular 18px):

> Checkbox

Description (`2012:55375`, Whyte Book 13px), verbatim:

> In addition to the "on" and "off" state, we also use a mixed state when a checkbox has nested checkboxes with a mix of "on" and "off" states.

### Light / Dark context (`2012:55376`, 704px wide)

Two panels side by side: **Light** (`2012:55377`, bg `--color-bg` white, 1px rgba(0,0,0,0.1) border) labeled "LIGHT MODE" (`2012:55378`), and **Dark** (`2012:55394`, bg `--color-bg` #2c2c2c) labeled "DARK MODE" (`2012:55395`).

Each panel contains a Drop Zone "DZ" (`2012:55379` light / `2012:55396` dark) laying out a 3×3 grid of checkbox specimens with redline labels. The redline labels use `_Label/Redline/State-Left` (row labels) and `_Label/Redline/State-Above` (column labels), styled with `--color-bg-assistive-tertiary` (#ffe0fc light / #68275e dark) and text `--color-text-assistive` (#ea10ac light / #fc9ce0 dark).

**Matrix axes (redline annotations):**

- Row labels (left, top→bottom): **On** (`2012:55380`), **Mixed** (`2012:55381`), **Off** (`2012:55382`)
- Column labels (above): col 2 = **Focus** (`2012:55392`), col 3 = **Disabled** (`2012:55393`). Col 1 is the default/normal column (unlabeled).

**The 9 checkbox specimens (light, `2012:55383`–`2012:55391`), by grid cell — all `label={false}`:**

| Cell | type | state | disabled / muted | Checkbox node (light / dark) |
|------|------|-------|------------------|------------------------------|
| On / Default | On (check) | Default | — | `2012:55383` / `2012:55400` |
| On / Focus | On (check) | Focused | — | `2012:55384` / `2012:55401` |
| On / Disabled | On (check) | Default | disabled | `2012:55385` / `2012:55402` |
| Mixed / Default | Mixed | Default | — | `2012:55390` / `2012:55407` |
| Mixed / Focus | Mixed | Focused | — | `2012:55388` / `2012:55405` |
| Mixed / Disabled | Mixed | Default | disabled | `2012:55386` / `2012:55403` |
| Off / Default | Off | Default | muted | `2012:55391` / `2012:55408` |
| Off / Focus | Off | Focused | muted | `2012:55389` / `2012:55406` |
| Off / Disabled | Off | Default | disabled | `2012:55387` / `2012:55404` |

> Note (faithful capture): grid layout positions (not node-id order) determine cell placement — Figma absolute `left`/`top` coordinates were used to map nodes to cells. The Off-column specimens carry `muted` (off-state styling), the Disabled column carries `disabled` styling. Preserving as-is; reconcile during clean-up.

### Checkbox component — variant axes (from component definition embedded in this frame; see Section 4)

`CheckboxProps`:
- `state`: `"Default"` (default `"Default"`) — Focused variant present in specimens via focus ring overlay
- `type`: boolean (default `true`) — `true` = On (check glyph), `false` = Off
- `disabled`: `"False"` (default `"False"`)
- `ghost`: `"False"` (default `"False"`)
- `label`: boolean (default `true`)
- `description`: boolean (default `false`)
- `muted`: boolean (default `false`)

Mixed state is rendered via the `icon.16.mixed` glyph (see token table) rather than a separate `type` enum value.

### Token / value capture (state styling — token-driven, captured)

Check box is 16×16px (`Check`), radius `--radius-medium` (0.3125rem / 5px). Container row gap `--spacer-2` (0.5rem / 8px). Specimen wrapper gap `--spacer-1` (0.3rem / 4px).

| State | Box bg | Border | Glyph | Light fallback | Dark fallback |
|-------|--------|--------|-------|----------------|---------------|
| On, Default | `--color-bg-brand` | `--color-border-selected-strong` | `icon.16.check` | #0d99ff / #007be5 | #0c8ce9 / #7cc4f8 |
| On, Focused | inner bg `--color-bg-brand`, border `--color-border-selected-strong`, inset 0 0 0 2px white shadow | — | `icon.16.check` | #0d99ff / #007be5 / white | #0c8ce9 / #7cc4f8 / #2c2c2c |
| On, Disabled | `--color-bg-disabled` | (none) | `icon.16.check` (disabled fill) | #d9d9d9 | #757575 |
| Mixed, Default | `--color-bg-brand` | `--color-border-selected-strong` | `icon.16.mixed` | #0d99ff / #007be5 | #0c8ce9 / #7cc4f8 |
| Mixed, Focused | inner bg `--color-bg-brand`, border `--color-border-selected-strong`, inset 0 0 0 2px white shadow | — | `icon.16.mixed` | #0d99ff / #007be5 / white | #0c8ce9 / #7cc4f8 / #2c2c2c |
| Mixed, Disabled | `--color-bg-disabled` | (none) | `icon.16.mixed` (disabled fill) | #d9d9d9 | #757575 |
| Off, Default (muted) | `--color-bg-secondary` | `--color-border` | (none) | #f5f5f5 / #e6e6e6 | #383838 / #444 |
| Off, Focused (muted) | `--color-bg-secondary` | `--color-border-selected-strong` | (none) | #f5f5f5 / #007be5 | #383838 / #7cc4f8 |
| Off, Disabled | (none) | `--color-border-disabled` | (none) | #e6e6e6 | #444 |

Mixed-state glyph: `icon.16.mixed` — a horizontal dash, 8px × 1px, centered in the 16px icon box. Check glyph: `icon.16.check` — 8px × 7px, offset left 4px / top 4px.

`[Deferred: render — ref nodes 2012:55377 (light grid), 2012:55394 (dark grid)]` — component-dependent specimen layout (full 3×3 redline matrix). Token/state data above captured non-deferred.

---

## Section 3 — Checkbox with Label

Node: `2012:55411` (`_Section/Component`, 1280 × 352)

### Heading + description

Component Name (`2012:55413`, Whyte Regular 18px):

> Checkbox with Label

Description (`2012:55414`, Whyte Book 13px), verbatim:

> Usually, checkboxes are accompanied with a label. Note that if a checkbox is disabled, the label is disabled as well.

### Light / Dark context (`2012:55415`)

Light panel (`2012:55416`, "LIGHT MODE" `2012:55417`) and Dark panel (`2012:55431`, "DARK MODE" `2012:55432`).

Specimens are labeled checkboxes arranged in **two columns**: a left column of 3 (`2012:55419`, gap 8px) and a right column of 6 (`2012:55424`, gap 8px).

**Checkbox component for this section** — `type` boolean (`true` = On check, `false` = Off); state Default or Focused; `muted` for off-state; `disabled` for disabled; `label` true; `description` false.

Light left column (`2012:55419`):
- `2012:55420`: On, Normal (type=true) — label "On, Normal"
- `2012:55421`: Mixed, Normal (mixed glyph) — label "Mixed, Normal"
- `2012:55422`: Off, Normal + Muted (type=false, muted) — label "Off, Normal + Muted"

Light right column (`2012:55424`):
- `2012:55425`: On, Focused — label "On, Focused"
- `2012:55426`: Mixed, Focused — label "Mixed, Focused"
- `2012:55427`: Off, Focused + Muted — label "Off, Focused + Muted"
- `2012:55428`: On, Disabled + Muted (disabled) — label "On, Disabled + Muted"
- `2012:55429`: Mixed, Disabled (disabled) — label "Mixed, Disabled"
- `2012:55430`: Off, Disabled + Muted (disabled) — label "Off, Disabled + Muted"

Dark left column (`2012:55434`): `2012:55435` On Normal, `2012:55436` Mixed Normal, `2012:55437` Off Normal + Muted.
Dark right column (`2012:55439`): `2012:55440` On Focused, `2012:55441` Mixed Focused, `2012:55442` Off Focused + Muted, `2012:55443` On Disabled + Muted, `2012:55444` Mixed Disabled, `2012:55445` Off Disabled + Muted.

**Label text + color (token capture):**
- Label uses `body/medium` (Inter Medium 11px, weight 450, lineHeight 16px, tracking 0.055px).
- Normal/Focused label color: `--color-text` (rgba(0,0,0,0.9) light / white dark).
- Disabled label color: `--color-text-disabled` (rgba(0,0,0,0.3) light / rgba(255,255,255,0.4) dark) — confirming the rule "if a checkbox is disabled, the label is disabled as well."
- Label strings shown: "On, Normal", "Mixed, Normal", "Off, Normal + Muted", "On, Focused", "Mixed, Focused", "Off, Focused + Muted", "On, Disabled + Muted", "Mixed, Disabled", "Off, Disabled + Muted".

`[Deferred: render — ref nodes 2012:55416 (light), 2012:55431 (dark)]` — component-dependent labeled-checkbox layout.

---

## Section 4 — Checkbox with Description

Node: `2012:55446` (`_Section/Component`, 1280 × 352)

### Heading + description

Component Name (`2012:55448`, Whyte Regular 18px):

> Checkbox with Description

Description (`2012:55449`, Whyte Book 13px), verbatim:

> In cases where we might need more room to add context to an option, we can add a description aligned with the checkbox label.

### Light / Dark context (`2012:55450`)

Light panel (`2012:55451`, "LIGHT MODE" `2012:55452`) and Dark panel (`2012:55456`, "DARK MODE" `2012:55457`).

Drop Zone is a stack of two checkboxes, each with label + description.

Light (`2012:55453`):
- `2012:55454`: Off, Normal + Muted + description (type=false, muted, `description`)
- `2012:55455`: On, Normal + description (type=true, `description`)

Dark (`2012:55458`):
- `2410:16060`: Off, Normal + Muted + description — label "Off, Normal + Muted"
- `2410:16068`: On, Normal + description — label "On, Normal"

### Checkbox component — variant axes (from component definition embedded in this frame)

`CheckboxProps`:
- `className`?: string
- `description`: boolean (default false)
- `disabled`: `"False"` (default `"False"`)
- `ghost`: `"False"` (default `"False"`)
- `label`: boolean (default true)
- `muted`: boolean (default false)
- `state`: `"Default"` (default `"Default"`)
- `type`: boolean (default true)

**Description sub-element (token capture):**
- Container: `pl-[24px]`, width 252px (min/max 252px) — description is left-aligned under the label, indented 24px (box 16px + gap 8px), so it aligns with the label text.
- Text style: `body/medium` (Inter Medium 11px, weight 450, lineHeight 16px, tracking 0.055px).
- Description color: `--color-text-secondary` (rgba(0,0,0,0.5) light / rgba(255,255,255,0.7) dark).
- Label color: `--color-text` (rgba(0,0,0,0.9) light / white dark).
- Description text (verbatim, repeated placeholder for both On and Off specimens):

  > Helpful description of the setting which may briefly highlight side effects or conditions of the setting.

`[Deferred: render — ref nodes 2012:55451 (light), 2012:55456 (dark)]` — component-dependent label+description layout.

---

## Cross-section token summary (captured values)

Color variables referenced across the page (var → light fallback / dark fallback where both observed):

- `--color-bg`: white / #2c2c2c
- `--color-bg-brand`: #0d99ff / #0c8ce9
- `--color-bg-secondary`: #f5f5f5 / #383838
- `--color-bg-disabled`: #d9d9d9 / #757575
- `--color-bg-component-tertiary`: #f1e5ff
- `--color-bg-assistive-tertiary`: #ffe0fc / #68275e
- `--color-border`: #e6e6e6 / #444
- `--color-border-disabled`: #e6e6e6 / #444
- `--color-border-selected-strong`: #007be5 / #7cc4f8
- `--color-text`: rgba(0,0,0,0.9) / white
- `--color-text-secondary`: rgba(0,0,0,0.5) / rgba(255,255,255,0.7)
- `--color-text-disabled`: rgba(0,0,0,0.3) / rgba(255,255,255,0.4)
- `--color-text-component`: #8638e5
- `--color-text-assistive`: #ea10ac / #fc9ce0

Dimension/radius tokens:
- `--spacer-1`: 0.3rem (4px) — specimen wrapper gap / padding
- `--spacer-2`: 0.5rem (8px) — checkbox container gap (box→label)
- `--radius-medium`: 0.3125rem (5px) — checkbox box radius
- Box (`Check`): 16 × 16px; check glyph 8 × 7px; mixed glyph 8 × 1px
- Description indent: 24px left padding, 252px width
