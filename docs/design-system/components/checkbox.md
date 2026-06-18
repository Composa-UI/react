# Checkbox

Checkbox toggles a single option on or off. It supports a third indeterminate (mixed) state for parent-of-many selections.

## Overview

Checkbox is the control for binary and tri-state choices. Use it for opt-in settings, multi-select lists, and "select all" rows where the parent reflects a partial child selection. The visible mark carries the state: empty, a check, or a minus.

Reach for a sibling instead when the shape does not fit:

| Use instead | When |
|---|---|
| Switch | The setting applies immediately and reads as on/off hardware. |
| Radio | The user picks one option from a mutually exclusive set. |
| SegmentedControl | The choice is one of a few visible, equal-weight options. |

**Source**

| | |
|---|---|
| Composa code | `src/react/factory.js` (`function Checkbox`) |
| Composa CSS | `styles/70-selection-controls.css` |
| Published exports | `@composa-ui/react`: `Checkbox` |

**Figma source** (file `4kilp0ShQiYsoUPJdleqEH`, "Figma's UI Kit")

| Family | Figma component set | Node id |
|---|---|---|
| Checkbox | Checkbox | `2012:55461` |

The Figma Checkbox set carries 12 variants across Type (Checked / Unchecked / Mixed), State (Default / Focused), Disabled, Muted, and Ghost. The Composa component reproduces this surface through props.

## Anatomy

Checkbox renders a native `<button>` with up to two children, in order:

1. **Mark** (always rendered). A 14px box. Holds the glyph when checked or mixed; empty otherwise.
2. **Copy** (optional). A `<span>` stack with the label and an optional description, shown only when `label` is not `false`.

The mark glyph is a Material Symbols check or minus, drawn from `BUILTIN_GLYPHS.check` and `BUILTIN_GLYPHS.minus`, not a Unicode character. Checked shows the check; mixed shows the minus; unchecked shows nothing.

Container: `inline-flex`, 24px min-height, 8px gap between mark and copy. The mark is `inline-grid` with the glyph centered. When `label` is `false` the control is mark-only and the layout centers (`is-icon-only`).

## Props

From `function Checkbox({ ... })` in `src/react/factory.js` and the `Checkbox` family in `design/component-api.json`.

| Prop | Type | Default | Description |
|---|---|---|---|
| `label` | `boolean \| string` | `true` | Shows the label. `false` renders a mark-only control. A string sets the label text inline. |
| `labelText` | `string` | `"Option"` | Label text when `label` is `true` (not a string). |
| `description` | `boolean` | `false` | Shows a secondary description line under the label. |
| `descriptionText` | `string` | `"Description"` | Description text when `description` is `true`. |
| `type` | `"Unchecked" \| "Checked" \| "Mixed"` | none | Controlled state. Overrides internal state. |
| `checked` | `boolean \| "checked" \| "mixed" \| "unchecked"` | none | Controlled state alias. Resolved through the same normalizer as `type`. |
| `defaultType` | `"Unchecked" \| "Checked" \| "Mixed"` | none | Uncontrolled initial state. Takes precedence over `defaultChecked`. |
| `defaultChecked` | `"unchecked" \| "checked" \| "mixed"` | `"unchecked"` | Uncontrolled initial state. |
| `muted` | `boolean` | `false` | Low-emphasis treatment. Dims the mark and uses secondary label text. |
| `ghost` | `boolean` | `false` | Borderless and fill-free until checked. |
| `state` | `"Default" \| "Focused"` | `"Default"` | Forces a visual state for docs and screenshots. Real interaction is browser-driven. |
| `disabled` | `boolean` | `false` | Disables the control. Sets the native `disabled` attribute. |
| `onCheckedChange` | `(next, event) => void` | none | Fires with the next state string (`"checked"` / `"unchecked"`). |
| `className` | `string` | `""` | Extra classes, appended to the Composa classes. |

Any other prop spreads onto the root `<button>` (for example `onClick`, `id`, `aria-*`).

Notes on the API:

- `type` and `checked` are interchangeable controlled inputs. Both pass through `checkedValue`, which accepts `true`, `"checked"`, `"mixed"`, or `"unchecked"`.
- `defaultType` and `defaultChecked` set only the initial uncontrolled value; `defaultType` wins if both are passed.
- Clicking toggles between `"checked"` and `"unchecked"` only. A `"mixed"` mark resolves to `"checked"` on the next click (mixed is a display state, not a click target).
- `label` is overloaded: a boolean toggles the label, a string sets its text. There is no separate "show label" boolean beyond this.

## Variants

Checkbox has no `variant` axis. Its modifiers are `muted` and `ghost`, set as booleans.

| Modifier | Use when | Notes |
|---|---|---|
| `muted` | The option is low-emphasis or contextually de-prioritized. | Mark dims to the disabled tokens; label uses secondary text. |
| `ghost` | The control sits in a dense surface and should disappear until checked. | Transparent border and background until checked or mixed. |

One divergence from the Figma source, recorded in `docs/design-system/fidelity-controls.md`:

- **`muted` uses opacity, not a color token.** Composa applies `opacity` and the disabled tokens to the mark. Figma encodes Muted as a distinct color treatment. The rendered result is close; the mechanism differs. Treat as a known fidelity note, not a defect.

## Sizes & width

Checkbox has no size or width prop. The control is a fixed shape.

| Token | Value | Note |
|---|---|---|
| Mark box (`--composa-selection-control-size`) | 14px | Square. |
| Mark radius (`--composa-radius-small`) | 2px | Matches Figma. |
| Container min-height | 24px | The row height; the label sits beside the mark. |
| Mark/copy gap (`--composa-space-2`) | 8px | |

The width is determined by content (`inline-flex`). There is no `wide` mode.

## States

The mark's resting colors come from the selection-control tokens. Checked and mixed bind the accent.

| State | Reached by | Treatment |
|---|---|---|
| Unchecked | resting | Border `--composa-selection-control-border` `#e6e6e6`, white background, empty mark. |
| Checked | `type="Checked"` / `checked` | Border and background `--composa-color-accent` `#0d99ff`. White check glyph. |
| Mixed | `type="Mixed"` | Same blue fill as checked. White minus glyph. |
| Focus-visible | keyboard focus, or `state="Focused"` | Global 2px blue ring (`#0d99ff`), 2px offset, from `button:focus-visible`. |
| Disabled | `disabled` prop | Native `disabled`, dimmed mark, `cursor: default`. |
| Muted | `muted` prop | Mark border/background swap to disabled tokens; label uses secondary text. |
| Ghost (unchecked) | `ghost` prop | Transparent border and background until checked. |

The selection-control marks use the accent blue `#0d99ff`, the raw primitive. They do not pick up the Composa brand orange `#ff5c16`. This keeps every selection control blue and aligned with Figma.

The `state` prop forces a visual state for documentation and screenshots. It does not replace real browser interaction. Disabled is a real prop, not a forced visual state, and it suppresses click events.

## Usage

**Do**

- Use a checkbox for an option that does not apply until the surrounding form is submitted.
- Use `Mixed` on a parent row when some but not all children are selected.
- Write labels as the positive of the option ("Show outlines", not "Hide outlines").
- Pair the label with a `description` when the option needs a one-line explanation.
- Use `ghost` only in dense surfaces where a resting border would add noise.

**Don't**

- Use a checkbox for a setting that takes effect immediately; use Switch.
- Use a checkbox for a one-of-many choice; use Radio.
- Phrase a label so that "checked" is ambiguous about what it enables.
- Rely on `muted` to communicate disabled state; use the `disabled` prop.

## Accessibility

- **Role.** Checkbox renders a native `<button>` with `role="checkbox"`.
- **Keyboard.** Tab moves focus to the control. Enter and Space activate it.
- **Checked state.** The factory sets `aria-checked` to `"true"`, `"false"`, or `"mixed"` from the resolved state, so assistive tech announces all three.
- **Accessible label.** A visible label provides the name. **When `label` is `false`, the factory sets `aria-label` from `labelText`** so the mark-only control still has a name.
- **Focus ring.** Focus shows the global 2px blue ring at 2px offset, visible against the white mark.
- **Disabled.** The `disabled` prop sets the native `disabled` attribute, removing the control from the tab order and suppressing clicks.

## Code

```jsx
import { Checkbox } from "@composa-ui/react";
```

Controlled checkbox with a label and change handler:

```jsx
<Checkbox
  label="Show outlines"
  checked={showOutlines}
  onCheckedChange={(next) => setShowOutlines(next === "checked")}
/>
```

A parent "select all" in the mixed state, with a description:

```jsx
<Checkbox
  label="Select all layers"
  description
  descriptionText="3 of 8 selected"
  type="Mixed"
/>
```

A mark-only checkbox (note the required label text for the accessible name) and a ghost variant:

```jsx
<Checkbox label={false} labelText="Toggle visibility" checked={isVisible} />

<Checkbox label="Snap to pixel grid" ghost defaultChecked="checked" />
```
