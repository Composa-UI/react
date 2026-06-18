# Tooltip

Tooltip is a small dark bubble that labels a control on hover or focus. It carries a short text label and points at its target with an arrow.

## Overview

Use Tooltip to name an icon-only control, show a keyboard shortcut, or give a one-line hint. Keep the content to a short phrase. It is a passive label, not an interactive surface.

Reach for a different component when the shape does not fit:

| Use instead | When |
|---|---|
| Menu | The overlay holds actionable rows, not a label. |
| Dialog | The content needs a title, body, and buttons. |
| InputField helper text | The hint belongs inline under a field, always visible. |

**Source**

| | |
|---|---|
| Composa code | `src/react/factory.js` (`function Tooltip`) |
| Composa CSS | `styles/75-tooltip.css` |
| Published exports | `@composa-ui/react`: `Tooltip` |

**Figma source** (file `4kilp0ShQiYsoUPJdleqEH`, "Figma's UI Kit")

| Family | Figma component set | Node id |
|---|---|---|
| Tooltip | Tooltip (page "Tooltips") | `2015:39095` |

The Figma set carries 16 variants: one tone (dark) by 8 placements, plus a hotkey-on/off split. Geometry is identical across placements; only the arrow position changes.

## Anatomy

Tooltip renders a `<div>` with `role="tooltip"` and two children, in order:

1. **Label** (required). The text, in a `<span class="composa-tooltip-label">`. Truncates with an ellipsis when it exceeds the max width.
2. **Arrow** (always rendered). A rotated square in a `<span class="composa-tooltip-arrow">` that inherits the bubble background, so it attaches to the bubble edge. Its position follows the `placement` prop.

Container: `inline-flex`, `width: max-content`, 5px radius, 4px/8px padding, 4px gap, `min-height: 24px`. The default (inverse) tone has a solid `#1e1e1e` background, white text, and the `elevation-300-tooltip` shadow.

## Props

From `function Tooltip({ ... })` in `src/react/factory.js` and the `Tooltip` family in `design/component-api.json`.

| Prop | Type | Default | Description |
|---|---|---|---|
| `label` | `string` | `"Tooltip"` | Tooltip text. Also the truncation target. |
| `placement` | `"top" \| "right" \| "bottom" \| "left" \| "top-left" \| "top-right" \| "bottom-left" \| "bottom-right"` | `"top"` | Which side the arrow points from. See Placements. |
| `tone` | `"default" \| "inverse"` | `"inverse"` | Surface tone. `inverse` is the dark bubble. `default` is a light bubble. See Tones. |
| `className` | `string` | `""` | Extra classes, appended to the Composa classes. |

Any other prop spreads onto the root `<div>` (for example `id`, `style`, `aria-*`).

Notes on the API:

- The factory always renders the arrow `<span>`. There is no prop to hide it.
- There is no `hotkey` prop. To show a shortcut, include it in the `label` text. The fidelity audit reserves a `--composa-tooltip-fg-secondary` token for hotkey text, but the component renders the whole label in one color.
- The component is presentational. It does not position itself against a trigger, manage hover state, or portal. The caller owns placement and visibility.

## Variants

Tooltip has no `variant` prop. Its two axes are `tone` and `placement`.

## Tones

| Tone | Use when | Notes |
|---|---|---|
| `inverse` | The standard case, over any UI. | The Composa default. Solid `#1e1e1e` surface, white text, `elevation-300-tooltip`. |
| `default` | A light surface is wanted. | White surface, `#e6e6e6` border, `rgba(0,0,0,0.9)` text. |

The `default` light tone is a **deliberate Composa addition**, flagged in `docs/design-system/fidelity-overlays.md`. Figma ships only the dark tooltip. Keep it as an extension or drop it; it has no Figma counterpart.

## Placements

`placement` sets which edge the arrow sits on and where along that edge. Default is `top`.

| Placement | Arrow position |
|---|---|
| `top` / `bottom` | Centered on the bubble edge. |
| `left` / `right` | Centered on the vertical edge. |
| `top-left` / `top-right` | On the top or bottom edge, inset from the near horizontal end. |
| `bottom-left` / `bottom-right` | Same edges, mirrored. |

The corner inset is `--composa-tooltip-arrow-edge-offset`, set to `8px` in tokens, matching Figma. The arrow size is `8px` and its offset into the edge is `-4px`.

## Sizes & width

Tooltip has no size axis. Height is content-driven with a `min-height: 24px`. Width hugs content (`width: max-content`) up to `max-width: 240px`, after which the label truncates.

**Divergence (width):** Figma sets the tooltip max width to **`200px`**; Composa uses **`240px`**. Documented in the fidelity audit as a FLAG-FOR-OWNER. Not a defect; align if Figma is treated as the source of truth.

## States

Tooltip has no interactive states. It does not respond to hover, focus, or press. Visibility and placement are the caller's job. The only visual axes are `tone` and `placement`.

## Usage

**Do**

- Keep the label to a short phrase or a single shortcut.
- Use a tooltip to name icon-only controls that lack visible text.
- Point the arrow at the trigger using the matching `placement`.
- Prefer the `inverse` dark tone for consistency across the UI.

**Don't**

- Put actions, links, or form controls inside a tooltip; use a Menu or Dialog.
- Write multi-sentence copy; the label truncates past the max width.
- Rely on Tooltip alone for the accessible name of a control; set the control's own label too (see Accessibility).
- Use a tooltip for content that must always be visible; use inline helper text.

## Accessibility

- **Role.** Renders a `<div role="tooltip">`. The browser does not associate it with a trigger automatically.
- **Association.** The caller must wire the trigger to the tooltip, typically with `aria-describedby` pointing at the tooltip's `id`. Pass `id` through the spread props.
- **Icon-only triggers.** A tooltip is a hint, not a replacement for an accessible name. Give the icon-only control its own `aria-label` or `label` so it is named even when the tooltip is not shown.
- **No focus management.** The component does not trap focus or take focus. It is inert.

## Code

```jsx
import { Tooltip } from "@composa-ui/react";
```

Default dark tooltip pointing up at its trigger:

```jsx
<Tooltip label="Wrap in auto layout" placement="top" />
```

Tooltip with a keyboard shortcut in the label, anchored to the right:

```jsx
<Tooltip label="Components  ⌘⌥K" placement="right" />
```

Light tone, associated with a trigger for assistive tech:

```jsx
<button aria-describedby="rename-tip">
  <Icon name="edit" />
</button>
<Tooltip id="rename-tip" tone="default" label="Rename" placement="bottom" />
```
