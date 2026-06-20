# Tabs

Tabs switch between sibling content regions in the same view. One tab is selected at a time.

## Overview

Use Tabs to organize page-level or panel-level content into mutually exclusive regions the user moves between: an inspector's Design / Prototype / Inspect, a settings panel's sections. Tabs sit at the top of the region they control and carry a bottom rule that anchors the row.

Reach for a sibling instead when the shape does not fit:

| Use instead | When |
|---|---|
| SegmentedControl | The choice is an inline mode toggle, not a page-level content switch. |
| Dropdown | There are too many regions to show as a row of tabs. |
| Radio | The options are a form choice, not navigation between content. |

**Source**

| | |
|---|---|
| Composa code | `src/react/factory.js` (`function Tabs`, with the per-tab `Tab`) |
| Composa CSS | `styles/96-tabs.css` |
| Published exports | `@composa-ui/react`: `Tabs` |

**Figma source** (file `4kilp0ShQiYsoUPJdleqEH`, "Figma's UI Kit")

| Family | Figma component set | Node id |
|---|---|---|
| Tabs | Tabs (wrapper) | `2015:27780` |
| _Tab | _Tab (atom) | `2015:27758` |

The `_Tab` atom carries axes `Single Tab=True/False`, `Selected=True/False`, `State=Default/Focused/Hover`. The `Tabs` wrapper composes a row of `_Tab` atoms. Composa reproduces this through a `tabs` array plus `variant` and `size`.

## Anatomy

Tabs renders a `<div>` with `role="tablist"`, holding one `Tab` per entry, in array order:

1. **Container** (the tablist row). Carries a 1px bottom border and 8px padding.
2. **Tabs** (one per `tabs` entry). Each `Tab` renders a `<button role="tab">` wrapping a `<span class="composa-tab-label">` that truncates with an ellipsis.
3. **Selected indicator.** In the pill variant the selected tab is a filled gray chip. In the underline variant the selected tab draws a 1px bottom rule that sits on the container's baseline rule.

A single-tab row (`tabs.length === 1`) renders that tab full-width with strong weight, matching the Figma `Single Tab=True` atom.

## Props

From `function Tabs({ ... })` in `src/react/factory.js` and the `Tabs` entry in `design/component-api.json`.

| Prop | Type | Default | Description |
|---|---|---|---|
| `tabs` | `TabItem[]` | `[]` | The tabs. Each item carries `label`, optional `id`, `value`, `selected`, and `onClick`. |
| `variant` | `"underline" \| "pill"` | `"underline"` | Selected-indicator style. See Variants. |
| `size` | `"default" \| "compact"` | `"default"` | Row height axis. See Sizes & width. |
| `value` | `string` | none | Controlled selected value. Pair with `onValueChange`. |
| `defaultValue` | `string` | none | Uncontrolled initial selected value. Falls back to the first tab marked `selected`, else the first tab. |
| `onValueChange` | `(value, tab, index, event) => void` | none | Fires on tab change. |
| `state` | `"default" \| "focused" \| "hover"` | `"default"` | Forces a visual state for docs and screenshots. Real interaction is browser-driven. Passed down to each `Tab`. |
| `divider` | `boolean` | `true` | Full-width baseline rule below the tab row. Set `false` to remove it (e.g. inspector tabs, which per Figma carry no underline). Adds `.composa-tabs-no-divider`, which zeroes the container `border-bottom`. Independent of the underline variant's per-tab selected indicator. |
| `label` | `string` | `"Tabs"` | Accessible name for the tablist. Set to `aria-label`. |
| `className` | `string` | `""` | Extra classes, appended to the Composa classes. |

Any other prop spreads onto the root `<div>` (for example `id`, `data-*`).

Notes on the API:

- The factory default `variant` is `"underline"`. `component-api.json` lists `underline` and `pill` in that order, matching the factory.
- The `pill` variant has no dedicated CSS class. The base `.composa-tab.is-selected` rule already paints the filled-chip pill; the `underline` variant is the override that strips the chip and adds the bottom rule.
- Selection is uncontrolled by default. Pass `value` + `onValueChange` to control it.
- `state` is forwarded to every `Tab`, so a forced state applies across the row, not to one tab.

## Variants

| Variant | Use when | Notes |
|---|---|---|
| `pill` | The selected tab should read as a filled chip. | Matches the Figma `_Tab` atom: selected = `bg-secondary` chip, strong weight. |
| `underline` | The selected tab should read as an underlined heading. | The Composa default. Selected tab is transparent with a 1px bottom rule. |

Two structural divergences from the Figma source, both flagged in the controls fidelity audit. Neither is a defect:

- **The `underline` variant has no Figma source.** Figma's `_Tab` atom is a pill: the selected indicator is a filled `bg-secondary` chip, with no underline atom in the set. Composa's pill variant matches Figma exactly; the underline variant is the Composa addition. The underline sits on the container baseline rule by design: `.composa-tabs-underline` bottom-aligns the tabs (`align-items: flex-end`) so each tab's `::after` bottom rule meets the container's 1px border instead of floating above it.
- **The container carries a default 1px bottom border, but it is removable.** The standalone Figma `Tabs` wrapper (`2015:27780`) is a bare row of `_Tab` chips on a transparent background; the bottom rule appears only as a separate border element in the in-context usage frame. Composa sets `border-bottom: 1px solid` on `.composa-tabs` as default chrome and exposes `divider={false}` (`.composa-tabs-no-divider`) to remove it — required for inspector tabs, which per Figma have no underline.

## Sizes & width

**Size** (row height). Default is `default`.

| Size | Row height | Notes |
|---|---|---|
| `default` | 40px container (`--composa-tabs-height`), 24px tabs (`--composa-tab-height`) | Standard padding (8px). |
| `compact` | 24px container | `padding-block: 0`. Tabs stay 24px. |

**Width.** Tabs has no `width` prop. The row sizes to its content (`width: max-content`, capped at `max-width: 100%`). Inside a right panel or inspector the row goes full-width (`width: 100%`). Each tab has a 64px minimum width (`--composa-tab-min-width`) in the multi-tab case; a single tab fills the row.

## States

| State | Reached by | Treatment |
|---|---|---|
| Default (unselected) | resting | Text is `text-secondary`. |
| Selected | the selected `value` | Pill: `bg-secondary` chip, primary text, strong weight (550). Underline: transparent background, primary text, strong weight, 1px bottom rule on the baseline. |
| Hover | `:hover`, `.is-hover`, or `state="hover"` | `bg-secondary` fill on the tab. |
| Focus-visible | keyboard focus, `.is-focused`, or `state="focused"` | 1px focus ring (`--composa-control-focus-ring`, blue), offset `-1px`. |
| Single tab | `tabs.length === 1` | Full-width, left-aligned, strong weight. |

The `state` prop forces a visual state for documentation and screenshots and is forwarded to every tab. It does not replace real browser interaction. The fidelity audit confirms all color states (default, selected, hover, focus) match Figma; the divergences are structural (underline variant and the container border), not color.

## Usage

Grounded in the Figma Tabs wrapper (`2015:27780`), the `_Tab` atom (`2015:27758`), and the controls fidelity audit.

**Do**

- Use Tabs for mutually exclusive content regions at the top of the view they control.
- Keep one tab selected at all times.
- Write short noun labels ("Design", "Comments", "Versions").
- Use the pill variant when matching the Figma source exactly; use underline for a heading-style row.
- Provide a `label` so the tablist has an accessible name beyond the default `"Tabs"`.

**Don't**

- Use Tabs for an inline mode toggle; use SegmentedControl.
- Overflow the row with more tabs than fit; consolidate or use a Dropdown.
- Use long, sentence-length labels; tabs truncate.
- Use `state` to model real interactivity; it is a display override only.

## Accessibility

- **Role.** The container renders `role="tablist"`. Each tab renders a native `<button role="tab">` with `aria-selected` reflecting the current selection.
- **Accessible name.** The tablist takes its name from the `label` prop (`aria-label`), defaulting to `"Tabs"`. Each tab's name is its visible `label` text.
- **Keyboard.** Tab moves focus to a tab; Enter and Space activate it. Native button semantics.
- **Focus ring.** Focus shows a 1px blue ring inset by 1px, visible against the row.
- **Note.** Tabs does not wire arrow-key roving focus between tabs. Navigation is the browser's default Tab-key order across the `role="tab"` buttons.

## Code

```jsx
import { Tabs } from "@composa-ui/react";
```

Underline tabs (the default), uncontrolled:

```jsx
<Tabs
  label="Inspector"
  tabs={[
    { label: "Design", selected: true },
    { label: "Prototype" },
    { label: "Inspect" },
  ]}
/>
```

Pill tabs, controlled:

```jsx
<Tabs
  variant="pill"
  label="Panel"
  value={section}
  onValueChange={(next) => setSection(next)}
  tabs={[
    { label: "Layers", value: "layers" },
    { label: "Assets", value: "assets" },
  ]}
/>
```

Compact single tab (full-width, strong weight):

```jsx
<Tabs size="compact" tabs={[{ label: "Comments" }]} />
```
