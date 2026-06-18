# Radio

Radio picks one option from a mutually exclusive set. It ships in two shapes: a circular input mark and a pill button.

## Overview

Radio is the control for a single choice among several. Group radios so that selecting one clears the rest. Use the `input` variant for standard radio lists and the `button` variant when the choice reads as a selectable pill or mode switch.

Reach for a sibling instead when the shape does not fit:

| Use instead | When |
|---|---|
| Checkbox | The user can select more than one option. |
| Switch | The control is a single on/off setting, not a choice among many. |
| SegmentedControl | The few options should sit together in one connected track. |
| Dropdown | The option list is long or space is tight. |

**Source**

| | |
|---|---|
| Composa code | `src/react/factory.js` (`function Radio`) |
| Composa CSS | `styles/70-selection-controls.css` (`.composa-radio`, `.composa-radio-button`, `.composa-selection-label`) |
| Published exports | `@composa-ui/react`: `Radio` |

**Figma source** (file `4kilp0ShQiYsoUPJdleqEH`, "Figma's UI Kit")

| Family | Figma component set | Node id |
|---|---|---|
| Radio | Radio | `2015:20365` |

The Figma Radio set carries 20 variants across Variant (Input / Button), State (Default / Active / Focused / Disabled), On (On / Off), and Label.

## Anatomy

Radio renders a native `<button>`. The children depend on the variant.

**Input variant** (`variant="input"`), in order:

1. **Mark** (always rendered). A 14px circle. When checked, a 6px center dot is drawn via `::after`.
2. **Label**. A `<span class="composa-selection-label">`.

**Button variant** (`variant="button"`):

1. **Label only**. The whole control is a bordered pill; there is no separate mark.

Container: `inline-flex`, 24px min-height, 8px gap, center-aligned. The dot uses `currentColor`; on a checked (blue) mark the mark's text color is white, so the dot reads as a filled ring matching Figma.

## Props

From `function Radio({ ... })` in `src/react/factory.js` and the `Radio` family in `design/component-api.json`.

| Prop | Type | Default | Description |
|---|---|---|---|
| `label` | `string` | `"Option"` | Radio text. |
| `variant` | `"input" \| "button"` | `"input"` | Shape. `input` is the circle-and-label; `button` is the pill. See Variants. |
| `checked` | `boolean` | none | Controlled selection. When set, overrides internal state. |
| `defaultChecked` | `boolean` | `false` | Uncontrolled initial selection. |
| `state` | `"default" \| "hover" \| "active" \| "focused" \| "disabled"` | `"default"` | Forces a visual state for docs and screenshots. Real interaction is browser-driven. |
| `disabled` | `boolean` | `false` | Disables the control. Sets the native `disabled` attribute. |
| `onCheckedChange` | `(checked, event) => void` | none | Fires with `true` on selection. Radio only selects; it does not toggle off. |
| `className` | `string` | `""` | Extra classes, appended to the Composa classes. |

Any other prop spreads onto the root `<button>` (for example `onClick`, `name`, `id`, `aria-*`).

Notes on the API:

- `variant` is normalized through `propToken` (lower-cased, whitespace to dashes), so `"Button"` and `"button"` both resolve.
- Radio selects but does not deselect. Clicking a checked radio keeps it checked and re-fires `onCheckedChange(true)`. Grouping logic (clearing siblings) lives with the consumer; the factory drives one control.
- There is no group wrapper component. Render a set of `Radio` controls and manage the selected value in the parent.

## Variants

| Variant | Use when | Notes |
|---|---|---|
| `input` | Standard radio lists and forms. | Circle mark plus label. The default. |
| `button` | The choice reads as a selectable pill or mode switch. | Bordered pill, no mark; selected state fills the pill. |

Two notes from `docs/design-system/fidelity-controls.md`:

- **Button-radio selected surface diverges from Figma.** Figma's selected pill is a pale-blue surface `#e5f4ff` with a `#bde3ff` border and dark text. The current Composa rule fills the pill with `--composa-color-accent` `#0d99ff` and white text. The audit recorded an earlier orange fill (`#ff5c16`); the present CSS uses the accent blue, which is closer to Figma but still a solid fill rather than the pale surface. Flagged for owner intent (filled pill vs subtle surface), not asserted as a defect.
- **Button-radio resting border.** Figma uses a translucent border `rgba(0,0,0,0.1)`; the CSS binds `--composa-color-border-translucent`. This matches the intent.

The input-variant mark matches Figma: blue ring and dot at `#0d99ff` when checked.

## Sizes & width

Radio has no size or width prop. The input mark is a fixed shape; the button pill hugs its label.

| Token | Value | Note |
|---|---|---|
| Mark circle (`--composa-selection-control-size`) | 14px | Input variant. |
| Mark dot (`--composa-selection-control-mark-size`) | 6px | Drawn via `::after`. |
| Container min-height | 24px | Input variant row height. |
| Pill min-height (`--composa-height-input`) | 24px | Button variant. |
| Pill horizontal padding (`--composa-space-2`) | 8px | Button variant. |
| Pill radius (`--composa-radius-medium`) | 5px | Button variant. |

## States

| State | Reached by | Treatment |
|---|---|---|
| Unchecked (input) | resting | Mark border `--composa-selection-control-border` `#e6e6e6`, white background, no dot. |
| Checked (input) | `checked` | Mark border and background `--composa-color-accent` `#0d99ff`. White 6px dot. |
| Active (input) | `state="active"` | Mark border swaps to the selected blue `#0d99ff`. |
| Focus-visible | keyboard focus, or `state="focused"` | Global 2px blue ring (`#0d99ff`), 2px offset, from `button:focus-visible`. |
| Disabled | `disabled` prop | Native `disabled`, dimmed, `cursor: default`. |
| Default (button) | resting | White surface, translucent border. |
| Checked (button) | `checked` | Pill fills `--composa-color-accent` `#0d99ff`, transparent border, white text. |
| Active (button) | `state="active"` | Pill background `--composa-color-bg-on-selected` `#ffdfcc`. |

The selection-control marks use the accent blue `#0d99ff` (the raw primitive), not the Composa brand orange `#ff5c16`.

The `state` prop forces a visual state for documentation and screenshots. It does not replace real browser interaction. Disabled is a real prop, not a forced visual state, and it suppresses click events.

## Usage

**Do**

- Use radios in groups of two or more; a single radio should be a checkbox or switch.
- Manage one selected value per group in the parent so selecting one clears the others.
- Order options logically (by frequency, magnitude, or alphabetically), with the safest default first.
- Use the `button` variant when the choices read as modes or pills, not a vertical list.
- Write labels as parallel noun or verb phrases across the group.

**Don't**

- Use a radio for a multi-select question; use Checkbox.
- Pre-select nothing when the question requires an answer; pick a sensible default.
- Mix `input` and `button` variants within one group.

## Accessibility

- **Role.** Radio renders a native `<button>` with `role="radio"`.
- **Keyboard.** Tab moves focus to the control. Enter and Space select it.
- **Checked state.** The factory sets `aria-checked` to `"true"` or `"false"` so assistive tech announces selection.
- **Accessible label.** The visible `label` provides the name in both variants.
- **Grouping.** The factory renders individual controls; wrap a related set in a container with `role="radiogroup"` and a group label to expose the relationship to assistive tech.
- **Focus ring.** Focus shows the global 2px blue ring at 2px offset.
- **Disabled.** The `disabled` prop sets the native `disabled` attribute, removing the control from the tab order and suppressing clicks.

## Code

```jsx
import { Radio } from "@composa-ui/react";
```

A controlled radio group (parent owns the selected value):

```jsx
{["Design mode", "Prototype", "Dev mode"].map((mode) => (
  <Radio
    key={mode}
    label={mode}
    checked={selected === mode}
    onCheckedChange={() => setSelected(mode)}
  />
))}
```

A single input radio with an uncontrolled default:

```jsx
<Radio label="Email me updates" defaultChecked />
```

The button (pill) variant:

```jsx
<Radio variant="button" label="Auto" checked={fit === "auto"} onCheckedChange={() => setFit("auto")} />
```
