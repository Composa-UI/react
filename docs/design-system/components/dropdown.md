# Dropdown

Dropdown is a closed select trigger. It shows the current value and a chevron. For simple value lists it can also own the anchored menu and selected value.

## Overview

Use Dropdown to pick one value from a list that is too long for a SegmentedControl or a row of radios. It is styled as an input, not a button: a white surface with a 1px border, a value on the left, and a chevron on the right. Pass `options` for simple one-value menus; use a custom Menu only when the open surface needs search, grouped commands, or custom rows.

Reach for a sibling instead when the shape does not fit:

| Use instead | When |
|---|---|
| SegmentedControl | The options are few and fit on one row. |
| Radio | The options are a short, always-visible form choice. |
| InputField | The user types a free value rather than selecting one. |
| Button | The control triggers an action, not a value selection. |

**Source**

| | |
|---|---|
| Composa code | `src/react/factory.js` (`function Dropdown`) |
| Composa CSS | `styles/40-dropdown.css` |
| Published exports | `@composa-ui/react`: `Dropdown` |

**Figma source** (file `4kilp0ShQiYsoUPJdleqEH`, "Figma's UI Kit")

| Family | Figma component set | Node id |
|---|---|---|
| Dropdown | Dropdown | `2028:36589` |

The Figma set carries 16 variants across `Size=Default/Large`, `State=Default/Focused/Active`, `Disabled`, `Stroke`, and `Icon Lead`. Composa reproduces this through props.

## Anatomy

Dropdown renders a native `<button>` with `aria-haspopup="menu"`, holding up to three named slots in order:

1. **Leading icon** (optional). Rendered only when both `icon` and `iconLead` are set. Sits left of the value.
2. **Value** (required). The current selection, in a `<span>`. Truncates with an ellipsis when space is tight.
3. **Chevron** (always). A trailing `chevronDown` glyph in a fixed icon slot. The chevron hugs the right edge: the value↔chevron gap and the right padding are both `space-1` (4px), matching NumericInput's dropdown-variant chevron placement. The left padding stays `space-2` (8px) for the value.

The trigger keeps a minimum "preview" width (`--composa-dropdown-min-width`) so a short value still presents a trigger wide enough that its left-anchored menu is not clipped or cut off.

When `options` are passed, Dropdown wraps the trigger in a small local root and renders a dark `DropdownMenu` below or above the trigger. Inside an `OverlayHost`, the menu renders through `OverlayPortal` so it can escape rail scroll clipping. Without an overlay host, it falls back to local positioning.

This built-in menu is intentionally simple: it supports direct single-value menus, outside click dismissal, and value updates. It does not yet provide full keyboard navigation, typeahead, or app-level collision routing.

## Props

From `function Dropdown({ ... })` in `src/react/factory.js` and the `Dropdown` entry in `design/component-api.json`.

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | `string` | none | The current value text shown in the trigger. |
| `defaultValue` | `string` | first option | Uncontrolled starting value for option menus. |
| `options` | `(string \| { label, value?, shortcut?, disabled? })[]` | none | Enables the built-in one-value menu. |
| `label` | `string` | none | Accessible name for the trigger. Set to `aria-label`. |
| `size` | `"default" \| "large"` | `"default"` | Height axis. `large` sets a 32px minimum height. |
| `icon` | `IconName` | none | Leading icon name. Only renders when `iconLead` is set. |
| `iconLead` | `boolean` | `false` | Toggles the leading icon. Both `icon` and `iconLead` must be set for the icon to render. |
| `stroke` | `boolean` | `true` | Draws the 1px border. `false` adds `.is-borderless` (transparent border). |
| `open` | `boolean` | none | Controlled open state. When set, the component does not manage its own open state. |
| `defaultOpen` | `boolean` | `false` | Uncontrolled starting open state when using `options`. |
| `onOpenChange` | `(open, event) => void` | none | Fires when the open state would change. |
| `onValueChange` | `(value, option, event) => void` | none | Fires when an option row is selected. |
| `onClick` | `(event) => void` | none | Fires on click, after the open toggle. |
| `state` | `"default" \| "focused" \| "active"` | `"default"` | Forces a visual state. Overridden to `active` while open. Real interaction is browser-driven. |
| `disabled` | `boolean` | `false` | Disables the trigger. Sets the native `disabled` attribute. |
| `className` | `string` | `""` | Extra classes, appended to the Composa classes. |
| `children` | `ReactNode` | none | Overrides the default icon/value/chevron content when provided. |

Any other prop spreads onto the root `<button>` (for example `id`, `aria-*`).

Notes on the API:

- Open state is uncontrolled by default. Pass `open` + `onOpenChange` to control it. While open, the resolved state is forced to `active` and `aria-expanded` is `"true"`.
- The built-in menu is for simple single-value lists only. Rich menu surfaces should still compose `Menu` / `MenuRow` explicitly.
- `disabled` short-circuits the click handler, so neither the open toggle nor `onClick` fires.
- `children` overrides the composed content. Passing `children` bypasses `icon`, `value`, and the chevron.
- The icon renders only when both `icon` and `iconLead` are truthy; either alone hides it.

## Option Menu Contract

Use `options` when the menu is a plain single-value list. Current inspector examples:

| Context | Options |
| --- | --- |
| Canvas zoom presets | `50%`, `100%`, `200%`, plus command rows where needed |
| Export format | `PNG`, `SVG`, `JPEG`, `PDF` |
| Stroke position | `Inside`, `Center`, `Outside` |
| Stroke style | `Solid`, `Dashed` |

Dropdown-owned option menus must:

- keep the trigger value and chevron vertically centered;
- keep value text unselected while the menu is open;
- avoid a filled active background unless the dropdown variant explicitly calls for it;
- render through `OverlayPortal` when used in a scrollable inspector;
- choose a menu width from content or tokenized menu width, not the full overlay host;
- call `onValueChange` with the selected value and close the menu after selection.

If a menu needs grouped commands, checkmark-plus-leading-icon rows, shortcuts, dividers, or custom content, compose `Menu` and `MenuRow` rather than overloading Dropdown options.

## Variants

Dropdown has no `variant` prop. Its visual axes are `size`, `stroke`, and `iconLead`.

| Axis | Values | Notes |
|---|---|---|
| `stroke` | `true` (default) / `false` | `false` removes the visible border for borderless, in-cell use. |
| `iconLead` | `false` (default) / `true` | Adds a leading glyph (requires `icon`). |

Dropdown is styled as an **input**, not a button. This is the key divergence the fidelity audit records: Figma never fills the dropdown surface on interaction, while the shared button/menu control rules (which `.composa-dropdown` is currently swept into) paint a gray fill. The Figma-correct treatment is white surface throughout, a blue border on active, a label text-highlight on active, and white surface with tertiary text on disabled. The Variants and States below describe the Figma-correct input behavior; see the audit for the open mismatches still carried by the shared rules.

## Sizes & width

**Size** (height). Default is `default`.

| Size | Minimum height |
|---|---|
| `default` | 24px (`--composa-height-input`) |
| `large` | 32px |

**Width.** `width="auto"` hugs content. `width="fill"` stretches the trigger and option-menu root to the available width.

## States

Dropdown is an input. The Figma source treats interaction as border and text changes, not surface fills.

| State | Reached by | Figma-correct treatment |
|---|---|---|
| Default | resting | White surface, 1px `--composa-color-border`, value text. |
| Focused | keyboard focus or `state="focused"` | Border swaps to the selected blue (`#0d99ff`). No surface fill. |
| Active / open | `open`, click, or `state="active"` | White surface, blue border, and a text-selection highlight on the value. `aria-expanded="true"`. |
| Disabled | `disabled` prop | White surface, tertiary text, dimmed chevron. `cursor: default`, native `disabled`. |
| Borderless | `stroke={false}` | Transparent border (`.is-borderless`). |

The fidelity audit records four open mismatches, all from the shared control rules rather than this component's own stylesheet:

- **Hover and active paint a gray fill** (`#f5f5f5`) the Figma dropdown never uses; Figma keeps the surface white.
- **Active does not swap the border to blue or apply the value text-highlight** in the shared rule.
- **Focus adds an inner 2px white ring** Figma does not use; the blue ring color itself is correct.
- **Disabled uses a gray fill** (`#d9d9d9`) instead of the Figma white surface with tertiary text.

The fix named in the audit is to remove `.composa-dropdown` from the shared button/menu hover/active/disabled selectors and give it input semantics. The `state` prop forces a visual state for documentation and screenshots; it does not replace real browser interaction.

## Usage

Grounded in the Figma Dropdown set (`2028:36589`) and the controls fidelity audit.

**Do**

- Use Dropdown when the option list is too long for a SegmentedControl or radio group.
- Show the current value as the trigger text.
- Pass `options` for simple value menus such as export format, stroke position, and stroke style.
- Use `stroke={false}` for borderless dropdowns embedded in property rows.
- Use `size="large"` to match a 32px input row.
- Provide a `label` so the trigger has an accessible name.

**Don't**

- Use Dropdown for an action; use a Button.
- Paint a hover or active surface fill; the dropdown stays white like an input.
- Use it for free text entry; use InputField.
- Show an icon without setting both `icon` and `iconLead`.

## Accessibility

- **Role.** Dropdown renders a native `<button>` with `aria-haspopup="menu"` and `aria-expanded` reflecting the open state. It is keyboard- and screen-reader-accessible by default.
- **Accessible name.** The trigger takes its name from the `label` prop (`aria-label`). The visible `value` is the content, so set `label` to name the field itself.
- **Keyboard.** Tab moves focus to the trigger; Enter and Space activate it. Native button semantics, no custom handling.
- **Disabled.** The `disabled` prop sets the native `disabled` attribute, which removes the trigger from the tab order and suppresses click events (including the open toggle).
- **Focus ring.** Focus shows the control focus ring (blue). The Figma source uses border-only focus; the shared rule adds an inner white ring the audit flags as extra.

## Code

```jsx
import { Dropdown } from "@composa-ui/react";
```

Uncontrolled dropdown with a value and a click handler:

```jsx
<Dropdown
  label="Font weight"
  value="Regular"
  onOpenChange={(open) => console.log("open:", open)}
/>
```

Controlled open state, large size, with a leading icon:

```jsx
<Dropdown
  label="Layer blend"
  value="Normal"
  size="large"
  icon="blend"
  iconLead
  open={isOpen}
  onOpenChange={(next) => setOpen(next)}
/>
```

Borderless dropdown for a property row:

```jsx
<Dropdown label="Units" value="Pixels" stroke={false} />
```
