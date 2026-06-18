# Button

Button triggers an action. It carries a text label, an optional icon, and a variant that signals intent.

## Overview

Button is the primary action control in Composa UI. Use it to start an action, submit a form, confirm a choice, or open a dialog. The variant carries the meaning: Primary for the main action, Secondary for supporting actions, Destructive for irreversible ones.

Reach for a sibling instead when the shape does not fit:

| Use instead | When |
|---|---|
| IconButton | The control is icon-only with no text label. |
| ToggleButton | The control turns a setting on or off and stays pressed. |
| SplitButton | One default action plus a menu of alternates. |
| Link variant | The action reads as inline navigation, not a button surface. |

This doc covers Button and the shared button-family controls (IconButton, ToggleButton, SplitButton) where they share Button's vocabulary.

**Source**

| | |
|---|---|
| Composa code | `src/react/factory.js` (`function Button`) |
| Composa CSS | `styles/30-button-family.css` |
| Published exports | `@composa-ui/react`: `Button`, `IconButton`, `ToggleButton`, `SplitButton` |

**Figma source** (file `4kilp0ShQiYsoUPJdleqEH`, "Figma's UI Kit")

| Family | Figma component set | Node id |
|---|---|---|
| Button | Button | `2012:46721` |
| IconButton | Button icon | `2324:46757` |
| ToggleButton | Button icon toggle | `2324:46776` |
| DialogToggle | Button icon dialog toggle | `2324:46817` |
| SplitButton | Button icon split | `2324:46856` |

The Figma Button set carries 184 variants. The full family carries 553 across the four sets. The Composa React components reproduce this surface through props rather than as flattened variants.

## Anatomy

Button renders a native `<button>` with up to three children, in order:

1. **Leading icon** (optional). Rendered only when `icon` is set and `iconLead` is not `false`. Sits left of the label.
2. **Label** (required). The text, in a `<span>`. Truncates with an ellipsis when space is tight.
3. **Hotkey hint** (optional). A `<kbd>` badge shown when `hotkey` is true.

Container: `inline-flex`, 1px border, 5px radius, 8px horizontal padding, 4px gap between icon and label.

Family anatomy differs:

- **IconButton** is a square box with a single centered glyph and no label slot. The `label` prop becomes the accessible name, not visible text.
- **SplitButton** is a container with two halves: an action button (icon + label) on the left and a chevron menu button on the right, separated by a 1px divider.
- **DialogToggle** is a ToggleButton with a 4px dot in the bottom-right corner, marking that it opens a dialog or popover.

## Props

From `function Button({ ... })` in `src/react/factory.js` and the `Button` family in `design/component-api.json`.

| Prop | Type | Default | Description |
|---|---|---|---|
| `label` | `string` | Required | Button text. Also the truncation target. |
| `variant` | `"primary" \| "secondary" \| "ghost" \| "link" \| "link-danger" \| "destructive" \| "secondary-destruct" \| "inverse" \| "success"` | `"secondary"` | Visual intent. See Variants. |
| `size` | `"small" \| "default" \| "large"` | `"default"` | Height axis. See Sizes & width. |
| `width` | `"default" \| "wide"` | `"default"` | Width axis. `wide` fixes the button to 256px. |
| `state` | `"default" \| "hover" \| "active" \| "focused"` | `"default"` | Forces a visual state for docs and screenshots. Real interaction is driven by the browser. |
| `disabled` | `boolean` | `false` | Disables the button. Sets the native `disabled` attribute. |
| `iconLead` | `false \| "left-aligned" \| "center-aligned"` | `false` | Controls the leading icon and label alignment. `false` hides the icon. `true` is accepted and maps to `"left-aligned"`. |
| `icon` | `IconName` | none | Leading icon name. Only renders when `iconLead` is not `false`. |
| `hotkey` | `boolean` | `false` | Shows a keyboard-hint badge after the label. |
| `tone` | `"brand" \| variant` | none | Back-compat alias. `tone="brand"` maps to `variant="primary"`; any other `tone` overrides `variant`. |
| `className` | `string` | `""` | Extra classes, appended to the Composa classes. |
| `children` | `ReactNode` | none | Overrides the default icon/label/hotkey content when provided. |

Any other prop spreads onto the root `<button>` (for example `onClick`, `type`, `aria-*`, `id`).

Notes on the API:

- `tone` is in the factory signature but absent from `component-api.json`. It is a back-compat shim: `tone === "brand"` resolves to the Primary variant. Prefer `variant`.
- `children` overrides the composed content. Passing `children` bypasses `icon`, `label`, and `hotkey` rendering.
- Legacy `size="wide"` is normalized to `size="default"` + `width="wide"` inside the factory.
- `iconLead` doubles as the icon toggle and the label alignment. There is no separate "show icon" boolean.

## Variants

All nine values map to the same semantic color tokens used across the button family. The variant carries intent.

| Variant | Use when | Notes |
|---|---|---|
| `primary` | The single main action in a view or dialog. | Brand fill. One per group. |
| `secondary` | Supporting actions next to a primary. | The Composa default. White surface, bordered. |
| `ghost` | Low-emphasis actions, toolbars, dense UI. | Transparent until hovered. |
| `link` | The action reads as inline navigation. | Text-colored, no surface. |
| `link-danger` | An inline, text-style destructive action. | Danger-colored text, no surface. |
| `destructive` | An irreversible action (delete, remove). | Solid danger fill, white text. |
| `secondary-destruct` | A lower-emphasis destructive action. | Danger text and border, white surface. |
| `inverse` | A button on a dark or photographic surface. | Dark fill, light text. |
| `success` | Confirming a positive outcome. | Solid success-green fill. |

Two deliberate divergences from the Figma source, documented in `docs/design-system/fidelity-buttons.md`. Neither is a defect:

- **Primary fill is brand orange `#ff5c16`, not the accent blue `#0d99ff`.** This is the Composa brand, formalized as the `composa.color.brand-default` primitive. Link text and the focus ring deliberately stay blue.
- **The variant vocabulary is shared across the whole family.** IconButton, ToggleButton, and SplitButton accept the same nine `variant` values as Button. Figma's icon-button set ships only `Default` and `Secondary`. Composa diverges to give the family one predictable vocabulary. The legacy `highlighted` keyword is retained for back-compat in the icon-button family.

## Sizes & width

Size and width are two separate axes. Figma conflates them into one "Size" property; Composa splits them so height and fill-width vary independently.

**Size** (height). Default is `default`.

| Size | Height | Horizontal padding |
|---|---|---|
| `small` | 20px | 4px, 2px gap |
| `default` | 24px | 8px |
| `large` | 32px | 12px |

**Width**. Default is `default`.

| Width | Behavior |
|---|---|
| `default` | Hugs its content (`inline-flex`). |
| `wide` | Fixed 256px. Use for stacked, equal-width buttons in dialogs and sidebars. |

Family notes:

- **SplitButton** keeps both axes and defaults to `size="small"`.
- **IconButton and ToggleButton stay square and have no `width` prop.** Width equals height equals the icon box, so a width axis there is meaningless.
- The IconButton/ToggleButton size scale (`small` 20px / `default` 24px / `large` 28px) is a **Composa addition**, flagged in the fidelity audit. Figma's icon-button set has no size axis (every node is 24px). Replace these with sourced values if Figma later defines official icon-button sizes.

## States

| State | Reached by | Treatment |
|---|---|---|
| Default | resting | Variant fill and border. |
| Hover | `:hover`, `.is-hover`, or `state="hover"` | Variant-specific. Primary darkens to the brand-pressed fill; Secondary/Ghost take a subtle surface fill. |
| Active | `:active`, `.is-active`, or `state="active"` | Pressed treatment. Shares Primary's brand-pressed fill. |
| Focus-visible | keyboard focus, `.is-focused`, or `state="focused"` | 1px blue ring (`#0d99ff`) inset by 1px, plus a 2px inner white ring. |
| Disabled | `disabled` prop | Solid disabled surface `#d9d9d9`, dimmed text and border, `cursor: default`, native `disabled`. |

Toggle-specific states (ToggleButton / DialogToggle), driven by the `pressed` prop, which sets `aria-pressed`:

| State | Treatment |
|---|---|
| Off (`pressed={false}`) | Plain: transparent surface, default icon color. Hover adds a translucent fill. |
| On (`pressed={true}`) | Adopts the variant color. Default/Secondary toggles use the selected blue tint `#e5f4ff`; on-hover lightens to `#f2f9ff`. |
| On + disabled | Dims to the disabled surface. |

The `state` prop forces a visual state for documentation and screenshots. It does not replace real browser interaction. Disabled is a real prop, not a forced visual state, and it suppresses click events.

## Usage

Grounded in the Figma Button guideline blocks (Primary, Secondary, Ghost, Destructive, and the per-variant notes on node `2012:46721`).

**Do**

- Use one Primary button per view or dialog to mark the main action.
- Pair a Primary with Secondary or Ghost buttons for supporting actions.
- Write labels as a verb or verb phrase ("Save changes", "Create team").
- Use `destructive` or `secondary-destruct` for delete and remove, and confirm irreversible actions.
- Use `width="wide"` for stacked, equal-width buttons in dialogs and sidebars.
- Give every icon a matching label; keep the leading icon decorative.

**Don't**

- Stack multiple Primary buttons in the same group.
- Use a Button for inline navigation; use the `link` variant or a real link.
- Write vague labels like "OK" or "Click here".
- Rely on color alone to signal a destructive action; the label must also be clear.
- Use `state` to model real interactivity; it is a display override only.

## Accessibility

- **Role.** Button renders a native `<button>`, so it is keyboard- and screen-reader-accessible by default. SplitButton renders two real `<button>` elements (action and menu).
- **Keyboard.** Tab moves focus to the button. Enter and Space activate it. Native semantics, no custom handling.
- **Accessible label.** Button uses its visible `label` text. **IconButton has no visible text, so its `label` prop is required**; the factory maps it to `aria-label` and `title`. SplitButton's menu half derives its name from `menuLabel`, defaulting to `"{label} options"`.
- **Pressed state.** ToggleButton sets `aria-pressed` from the `pressed` prop so assistive tech announces on/off.
- **Focus ring.** Focus shows a 1px blue ring plus a 2px inner white ring, visible against any variant fill. Driven by `.is-focused` / focus styles, not removed on mouse focus.
- **Disabled.** The `disabled` prop sets the native `disabled` attribute, which removes the button from the tab order and suppresses click events.

## Code

```jsx
import { Button, IconButton, ToggleButton, SplitButton } from "@composa-ui/react";
```

Primary action with a click handler:

```jsx
<Button variant="primary" label="Save changes" onClick={handleSave} />
```

Large secondary button with a leading icon:

```jsx
<Button
  variant="secondary"
  size="large"
  label="Add layer"
  icon="plus"
  iconLead="left-aligned"
/>
```

Destructive confirm, plus an icon-only button (note the required label) and a toggle:

```jsx
<Button variant="destructive" label="Delete project" onClick={handleDelete} />

<IconButton icon="move" label="Move" variant="secondary" />

<ToggleButton
  icon="lock"
  label="Lock layer"
  pressed={isLocked}
  onClick={() => setLocked((v) => !v)}
/>
```

Split button (default action plus a menu):

```jsx
<SplitButton
  label="Insert"
  icon="plus"
  onClick={handleInsert}
  onMenuClick={openInsertMenu}
/>
```
