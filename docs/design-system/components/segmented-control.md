# SegmentedControl

SegmentedControl is a single-select control: a row of mutually exclusive segments on a shared track, with one selected at a time.

## Overview

Use SegmentedControl to switch between a small set of mutually exclusive views or modes inside one surface. It suits 2 to 6 options that fit on one row: alignment modes, view toggles, a compact filter. The selected segment is a white raised pill on a gray track, so the choice reads at a glance.

Reach for a sibling instead when the shape does not fit:

| Use instead | When |
|---|---|
| Tabs | The options switch page-level content regions, not an inline mode. |
| Radio | The options stack vertically or need long labels and descriptions. |
| Dropdown | There are too many options to show on one row. |
| ToggleButton | The control is a single on/off toggle, not a choice among several. |

**Source**

| | |
|---|---|
| Composa code | `src/react/factory.js` (`function SegmentedControl`) |
| Composa CSS | `styles/88-segmented.css` |
| Published exports | `@composa-ui/react`: `SegmentedControl` |

**Figma source** (file `4kilp0ShQiYsoUPJdleqEH`, "Figma's UI Kit")

| Family | Figma component set | Node id |
|---|---|---|
| SegmentedControl | Segmented control | `2015:20960` |

The Figma set carries 20 variants across `Variant=Icon/Label`, `Tab Count=02..06`, and `State=Default/Disabled`. The Composa component reproduces this through props: `variant` plus an `options` array.

## Anatomy

SegmentedControl renders a `<div>` track with `role="tablist"`, holding one segment per option, in array order:

1. **Track** (container). Gray surface (`bg-secondary`), 5px radius, 1px padding. Sizes to its content.
2. **Segments** (one per `options` entry). Each is a `role="tab"` button.
   - In the **icon** variant each segment is an `IconButton` glyph.
   - In the **label** variant each segment is a `<button>` carrying text.
3. **Selected pill** (the selected segment). The selected segment gets a white fill, a 1px border, and primary text color, raising it off the track.

There is no divider between segments. Separation comes from the selected pill and the track padding.

## Props

From `function SegmentedControl({ ... })` in `src/react/factory.js` and the `SegmentedControl` entry in `design/component-api.json`.

| Prop | Type | Default | Description |
|---|---|---|---|
| `options` | `SegmentedOption[]` | `[]` | The segments. Each option carries `label`, `icon`, optional `id`, `value`, `selected`, `disabled`, and `onClick`. |
| `variant` | `"icon" \| "label"` | `"icon"` | Render each segment as an icon glyph or a text button. See Variants. |
| `value` | `string` | none | Controlled selected value. Pair with `onValueChange`. |
| `defaultValue` | `string` | none | Uncontrolled initial selected value. Falls back to the first option marked `selected`, else the first option. |
| `onValueChange` | `(value, option, index, event) => void` | none | Fires on selection. |
| `state` | `"default" \| "disabled"` | `"default"` | Forces a visual state. Real interaction is browser-driven. |
| `disabled` | `boolean` | `false` | Disables the whole control. |
| `label` | `string` | none | Accessible name for the tablist. Set to `aria-label`. |
| `className` | `string` | `""` | Extra classes, appended to the Composa classes. |

Any other prop spreads onto the root `<div>` (for example `id`, `data-*`).

Notes on the API:

- Selection is uncontrolled by default. Pass `value` + `onValueChange` to control it.
- Per-option `disabled` disables a single segment; the top-level `disabled` disables all of them.
- The selected value resolves through `value ?? internalValue`. The internal initial value comes from `defaultValue`, then any option marked `selected`, then the first option.
- The control writes `data-tab-count` (zero-padded, for example `"04"`), which the CSS uses to size icon segments.

## Variants

| Variant | Use when | Notes |
|---|---|---|
| `icon` | Segments read as glyphs (alignment, view modes). | The default. Each segment is an `IconButton`. |
| `label` | Segments need short text labels. | Label segments share the track width; the 2-count case fixes the track to 160px, others to 240px. |

The selected segment is styled as a **white raised pill**, not a brand-colored fill. The selected segment carries `.is-selected`, which the button-family rule would otherwise paint with the selected blue. The segmented stylesheet overrides it back to white surface plus a 1px border at matching specificity, so the later source order wins. This is a deliberate divergence from the shared icon-button selected treatment, matched to the Figma source where the selected segment is a white chip on the gray track.

## Sizes & width

SegmentedControl has no `size` prop. Height is fixed; width derives from the variant and option count.

**Height.** The track is 24px (`--composa-segmented-height`) with 1px padding, so each segment is 22px (`--composa-segmented-item-height`). 22 + 2x1 padding = 24.

**Width.**

| Case | Width |
|---|---|
| `icon` variant | Hugs its content (`width: max-content`). |
| Icon segment, 2 options | 42px per segment (`--composa-segmented-icon-width-2`). |
| Icon segment, 3 to 6 options | 28px per segment (`--composa-segmented-icon-width`). |
| `label` variant | Track fixed at 240px; segments share it (`flex: 1 1 0`). |
| `label` variant, 2 options | Track fixed at 160px. |

The per-segment icon widths and the fixed label-track widths are Composa layout decisions, not a Figma size axis. Figma's set varies only `Tab Count` and `Variant`.

## States

| State | Reached by | Treatment |
|---|---|---|
| Default (unselected) | resting | Segment sits on the gray track. Text is `text-secondary`; icon is `icon-secondary`. |
| Selected | the selected `value` | White fill, 1px border (`--composa-color-border`), primary text/icon color. Raised pill. |
| Hover | `:hover` on the segment | Inherited from the IconButton/button base; the track itself does not change. |
| Focus-visible | keyboard focus on a segment | Segment shows the control focus ring. Driven by the underlying button. |
| Disabled | `disabled` prop or `state="disabled"` | Whole track dims to the disabled surface; segment labels drop to `text-disabled`; `cursor: default`. |

The fidelity audit flags one divergence: Figma's disabled state swaps each segment to a tertiary-text token and drops the white fill, while Composa darkens the whole track to the disabled surface and recolors labels to `text-disabled`. The selection itself stays accurate (white pill vs Figma white chip).

## Usage

Grounded in the Figma Segmented control set (`2015:20960`) and the controls fidelity audit.

**Do**

- Use it for 2 to 6 mutually exclusive options that fit on one row.
- Keep labels short; segments share a fixed track width in the label variant.
- Use the icon variant when a glyph is unambiguous (alignment, view density).
- Keep exactly one segment selected at all times.
- Provide a `label` so the tablist has an accessible name.

**Don't**

- Use it for more options than fit on one row; reach for Dropdown.
- Mix icon and text segments to mean different kinds of thing.
- Use it for multi-select; segments are mutually exclusive.
- Use it for page-level navigation; use Tabs.

## Accessibility

- **Role.** The track renders `role="tablist"`. Each segment renders `role="tab"` with `aria-selected` reflecting the current selection. Icon segments come from `IconButton`; label segments are native `<button>` elements.
- **Accessible name.** The tablist takes its name from the `label` prop (`aria-label`). Icon segments derive their name from each option's `label`, mapped to `aria-label` and `title` on the underlying IconButton.
- **Keyboard.** Tab moves focus to a segment; Enter and Space activate it. Native button semantics.
- **Disabled.** The `disabled` prop (top-level or per-option) sets the native `disabled` attribute on the affected segments, removing them from the tab order and suppressing clicks.
- **Focus ring.** Focus shows the shared control focus ring on the focused segment.

## Code

```jsx
import { SegmentedControl } from "@composa-ui/react";
```

Icon segments (the default), uncontrolled:

```jsx
<SegmentedControl
  label="Text alignment"
  options={[
    { icon: "alignLeft", label: "Align left", selected: true },
    { icon: "alignCenter", label: "Align center" },
    { icon: "alignRight", label: "Align right" },
  ]}
/>
```

Label segments, controlled:

```jsx
<SegmentedControl
  variant="label"
  label="View mode"
  value={mode}
  onValueChange={(next) => setMode(next)}
  options={[
    { label: "Design", value: "design" },
    { label: "Prototype", value: "prototype" },
    { label: "Inspect", value: "inspect" },
  ]}
/>
```

With a disabled segment:

```jsx
<SegmentedControl
  label="Density"
  options={[
    { icon: "listDense", label: "Compact" },
    { icon: "list", label: "Comfortable" },
    { icon: "grid", label: "Grid", disabled: true },
  ]}
/>
```
