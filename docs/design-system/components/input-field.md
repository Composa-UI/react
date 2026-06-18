# InputField

InputField is the text-entry control family. It takes a value, an optional label, and a variant that selects the shell shape: plain text, numeric, multi-cell numeric, color, or combo.

## Overview

InputField is the base single-line input in Composa UI. Use it to collect typed text, a number, a color value, or a value paired with a dropdown. The variant carries the shape: a plain text shell, a gray numeric shell, a multi-cell numeric row, a color row with a swatch, or a combo of value plus chevron.

This doc covers the InputField family: the base Text input and the variants Numeric, NumericMulti, Color, and Combo. They share one height, one radius, and one type scale; they differ in shell layout and default fill.

Reach for a sibling instead when the shape does not fit:

| Use instead | When |
|---|---|
| Dropdown | The user picks from a fixed list with no free text. |
| ComboInput variant | The user types a value and can also open a menu. |
| ColorInput variant | The value is a color with a swatch and opacity. |
| Switch / Checkbox | The input is a boolean, not a typed value. |

**Source**

| | |
|---|---|
| Composa code | `src/react/factory.js` (`function InputField`, `function NumericInput`, `function NumericInputMulti`, `function ColorInput`, `function ComboInput`, `function ComboInputDropdown`) |
| Composa CSS | `styles/50-input.css`, `styles/55-color-input.css`, `styles/84-combo-input.css`, `styles/60-fill-chit-input.css` |
| Published exports | `@composa-ui/react`: `InputField`, `NumericInput`, `NumericInputMulti`, `ColorInput`, `ComboInput` |

**Figma source** (file `4kilp0ShQiYsoUPJdleqEH`, "Figma's UI Kit"), Inputs page node `2028:75376`.

| Variant | Figma component set | Node id |
|---|---|---|
| Text | Text input | `2028:79255` |
| Numeric | Numeric input | `2028:79190` |
| NumericMulti | Numeric input multi | `2028:79619` |
| Color | Color input | `2028:79525` |
| Combo | Combo input | `2028:79408` |
| Combo dropdown (sub-part) | _Combo input dropdown | `2028:79874` |

The Figma Inputs set carries 119 variants across the six sets. The Composa React components reproduce this surface through props rather than as flattened variants.

## Anatomy

All variants build on the InputField shell. The base `InputField` renders a native `<label>` wrapping an optional label span and a shell span; the shell holds the control and any trailing parts, in order:

1. **Label** (optional). A 14px-wide `<span>` left of the shell, shown only when `label` is set. Hidden on the Numeric variant by CSS.
2. **Shell** (`.composa-input-shell`). The bordered box. Holds the rest.
3. **Leading icon** (optional). Rendered when `iconLead` is set. Sits at the shell's left edge.
4. **Variable pill** (optional). A `var` badge shown when `variable` is true.
5. **Control** (required). The `<input>`, or a `<textarea>` when `multiline` is true.
6. **Suffix** (optional). A trailing unit string (for example `%`), shown when `suffix` is set.
7. **Clear button** (optional). An IconButton shown when `closeButton` is true.
8. **Dropdown chevron** (optional). A trailing `chevronDown` glyph shown when `dropdown` is true.

Per-variant anatomy differs:

- **Numeric** delegates to InputField with `variant: "Numeric"`. Same shell, but gray by default, label hidden. `varIcon` adds a `styles` leading glyph; `varPill` turns the value into a variable pill.
- **NumericMulti** is its own `<div>`, not the shell. It renders a CSS grid: an optional leading icon cell plus four value cells, separated by 1px white dividers. Fixed 160px wide.
- **Color** is its own `<label>` grid: a swatch chip, a value `<input>`, and an opacity column (`<input>` plus `%` suffix). Fixed 144px wide.
- **Combo** is its own `<div>` grid with two real `<button>` elements: a value segment on the left and a chevron segment (`ComboInputDropdown`) on the right, separated by a 1px gap. Fixed 117px wide.

## Props

### InputField (base)

From `function InputField({ ... })` and the `InputField` family in `design/component-api.json`.

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | `string` | `""` | The control's value. |
| `label` | `string` | none | Label text and accessible name. The 14px label slot. |
| `placeholder` | `string` | `""` | Placeholder text when empty. |
| `variant` | `"single-line" \| "multi-line" \| "Numeric"` | `"single-line"` | Shell shape. `"multi-line"` renders a `<textarea>`. |
| `size` | `"default" \| "large"` | `"default"` | Height axis. See Sizes & width. |
| `state` | `"default" \| "hover" \| "active" \| "focus" \| "focused" \| "empty" \| "disabled" \| "disabled-secondary" \| "disabled-tertiary" \| "variable" \| "active-empty" \| "active-filled" \| "selected-input" \| "selected-chevron"` | `"default"` | Forces a visual state for docs and screenshots. Real interaction is browser-driven. |
| `mixed` | `boolean` | `false` | Mixed-value mode. Shows a "Mixed" placeholder and forces `state="mixed"`. |
| `disabled` | `boolean` | `false` | Disables the control. Also set by the `disabled*` state tiers. |
| `dropdown` | `boolean` | `false` | Adds a trailing chevron glyph. |
| `variable` | `boolean` | `false` | Shows a `var` pill before the control. |
| `iconLead` | `false \| true \| string` | `false` | Leading icon. A string is an icon name; `true` uses `icon`. |
| `icon` | `IconName` | none | Leading icon name, paired with `iconLead`. |
| `suffix` | `string` | none | Trailing unit string. |
| `closeButton` | `boolean` | `false` | Adds a clear IconButton. |
| `multiline` | `boolean` | `false` | Renders a `<textarea>` instead of `<input>`. |
| `onClear` | `function` | none | Click handler for the clear button. |
| `onChange` / `onInput` | `function` | none | Value handlers. When neither is set, the control is `readOnly`. |
| `className` | `string` | `""` | Extra classes, appended to the Composa classes. |

Any other prop spreads onto the root `<label>`.

### Variant components

These wrap or replace InputField. They each spread extra props onto their root.

| Component | Notable props | Defaults |
|---|---|---|
| `NumericInput` | `value`, `state`, `disabled`, `varIcon`, `varPill`, `dropdown`, `iconLead`, `label` | `value="0"`, `state="Default"` |
| `NumericInputMulti` | `values` (array of 4), `state`, `variant` (`"Default" \| "partial-disable"`), `disabled`, `iconLead`, `partialDisable` | `values=["0","0","0","0"]`, `variant="Default"` |
| `ColorInput` | `type` (`"Fill" \| "Opacity" \| "Image" \| "Gradient" \| "Variable" \| "Instance"`), `shape` (`"square" \| "circle"`), `value`, `opacityValue`, `state`, `disabled`, `onChange`/`onOpacityChange` | `type="Fill"`, `shape="square"`, `state="Default"` |
| `ComboInput` | `value`, `label`, `state` (`"Default" \| "hover" \| "selected-input" \| "selected-chevron"`), `iconLead`, `variable`, `disabled`, `dropdownState` | `value="16"`, `state="Default"` |

Notes on the API:

- **Numeric is spelled with a capital N as a variant token** (`variant: "Numeric"`), unlike the lowercase `single-line` / `multi-line`. `NumericInput` passes it through; the value normalizes to the `composa-input-numeric` class.
- `NumericInput.varPill` controls both the variable pill and whether the `label` renders; with `varPill` false the label is dropped.
- `NumericInputMulti` always renders exactly four cells. Extra `values` are ignored; missing ones become empty strings. `partialDisable` on the `partial-disable` variant disables the last cell.
- `ColorInput` reads `onChange`/`onInput` for the value field and separate `onOpacityChange`/`onOpacityInput` for the opacity field. Without handlers the inputs are `readOnly`.
- `ComboInput` derives the chevron's state from its own `state` unless `dropdownState` is passed explicitly.

## Variants

Variant selects the shell. The family shares the 24px height, 5px radius, and 11px Inter type scale.

| Variant | Use when | Notes |
|---|---|---|
| Text (`single-line`) | Free text entry. | Default. Transparent shell; see States. |
| Multi-line | Multi-row text. | Renders a `<textarea>`, 56px tall, gray shell. |
| Numeric | A single number, often with a unit suffix. | Gray shell by default. Optional `styles` icon and variable pill. |
| NumericMulti | Four related numbers in a row (for example padding L/T/R/B). | Fixed 160px grid with white cell dividers. |
| Color | A color value with swatch and opacity. | Fixed 144px grid. `type` selects fill/opacity/image/gradient/instance. |
| Combo | A typed value plus a dropdown menu. | Fixed 117px, value button plus chevron button. |

Two deliberate divergences from the Figma source, documented in `docs/design-system/fidelity-inputs.md`. Neither is a defect:

- **The single-line Text shell is transparent by default; gray is a hover affordance.** The base `.composa-input-shell` sets `background: transparent`. Gray (`--composa-color-bg-secondary` = `#f5f5f5`) is painted only on hover, on the inherently gray Numeric and Multi-line variants, or when active. This matches Figma's Text input, where Default and Empty render on a transparent shell while Numeric default is gray.
- **The Combo chevron has no always-on blue border.** `.composa-combo-input-dropdown` uses a transparent border at rest; the `border-selected` blue (`#0d99ff`) appears only on the active/selected-chevron state. This corrects an earlier always-blue chevron.

## Sizes & width

Height and width are separate concerns. Most variant shells are fixed-width by design.

**Size** (height). Default is `default`. Only the base InputField (Text, Numeric, Multi-line) exposes a `size` prop.

| Size | Height |
|---|---|
| `default` | 24px (`--composa-height-input`) |
| `large` | 32px |

Multi-line is taller regardless of size: the shell is 56px with top-aligned content, and the `<textarea>` has a 44px minimum height.

**Width.** Width is fixed per variant, not a prop:

| Variant | Width |
|---|---|
| Text / Numeric / Multi-line | Fills its container (`flex: 1 1 auto`). |
| NumericMulti | 160px. |
| Color | 144px (156px inside a fill row). |
| Combo | 117px. |

## States

State is reached by CSS pseudo-classes, the `state` prop, or a boolean like `disabled`. The `state` prop forces a visual state for docs and screenshots; it does not replace real interaction.

**Base shell** (Text, Numeric, Multi-line):

| State | Reached by | Treatment |
|---|---|---|
| Default | resting | Transparent shell for Text; gray `#f5f5f5` for Numeric and Multi-line. |
| Hover | `.is-hover` | Gray `#f5f5f5` fill on the Text shell. |
| Active / Focus | `.is-active`, `:focus-within`, `state="active"` / `"focused"` | White fill `#ffffff` plus a 1px `border-selected` (`#0d99ff`) inset ring. |
| Empty | `.is-empty`, `state="empty"` | Tertiary text color `rgba(0,0,0,0.3)` for placeholder. |
| Variable | `.has-variable` | Light-blue fill `#eef7ff` and a `var` pill. |
| Disabled | `disabled` prop or `disabled*` states | Disabled surface and text, disabled border, `cursor: default`, native `disabled`. Secondary and tertiary tiers fade further. |

**NumericMulti**: `.is-focused` adds the blue ring; the `default` variant when disabled gets a white shell with a `#e6e6e6` border; partially disabled cells take tertiary text.

**Color**: `.is-focus` / `.is-focused` add the blue ring; `.is-disabled` gives a white shell, `#e6e6e6` border, and tertiary text.

**Combo**: the value segment takes a `#e6e6e6` border on hover and a blue border when `selected-input`; the chevron segment takes a gray hover background and a blue fill plus border when active/selected-chevron.

## Usage

Grounded in the Figma Inputs sets (Text, Numeric, Color, Combo) on Inputs page node `2028:75376`.

**Do**

- Choose the variant by data type: Text for free text, Numeric for one number, NumericMulti for a set of four, Color for colors, Combo for value-plus-menu.
- Add a `suffix` for units (`px`, `%`, `deg`) instead of putting the unit in the value.
- Use `placeholder` for guidance and the tertiary empty state for an unset value.
- Give every input an accessible name through `label`, `placeholder`, or `aria-label`.
- Pass `onChange`/`onInput` when the field is editable; leave them off for read-only display.

**Don't**

- Stretch the fixed-width Color, Combo, or NumericMulti variants; they are sized to their content.
- Use NumericMulti for anything other than four related values; it always renders four cells.
- Rely on the gray Text fill to signal editability; the Text shell is transparent until hover or focus.
- Use `state` to model real interactivity; it is a display override only.

## Accessibility

- **Element.** Text, Numeric, and Color render real `<input>` elements (Multi-line a `<textarea>`). Combo renders two real `<button>` elements (value and chevron). Native semantics throughout.
- **Accessible label.** The base control sets `aria-label` from `label`, falling back to `placeholder`, then `"Input"`. ColorInput labels its two inputs `"{type} value"` and `"{type} opacity"`. ComboInput's value button uses `label` (default `"Combo input value"`); its chevron is labeled `"Open combo input menu"`.
- **Keyboard.** Tab reaches each input and button. Typing edits the value; Enter/Space activate the combo buttons. No custom handling.
- **Read-only.** When no `onChange`/`onInput` is provided, the control is `readOnly`, so it is focusable but not editable.
- **Focus ring.** Focus shows a 1px blue inset ring on the shell or segment, visible against any fill.
- **Disabled.** The `disabled` prop sets native `disabled`, removing the control from the tab order and suppressing input. The `disabled-secondary` and `disabled-tertiary` state tiers fade further.

## Code

```jsx
import {
  InputField,
  NumericInput,
  NumericInputMulti,
  ColorInput,
  ComboInput,
} from "@composa-ui/react";
```

Editable text input with a label and handler:

```jsx
<InputField
  label="Name"
  placeholder="Layer name"
  value={name}
  onChange={(e) => setName(e.target.value)}
/>
```

Numeric input with a unit suffix, and a four-cell numeric row:

```jsx
<NumericInput value="16" suffix="px" onChange={handleSize} />

<NumericInputMulti
  values={["0", "0", "0", "0"]}
  iconLead="padding"
/>
```

Color input and a combo input with a dropdown:

```jsx
<ColorInput type="Fill" value="F7F5F1" opacityValue="100" onChange={handleColor} />

<ComboInput value="16" label="Font size" />
```
