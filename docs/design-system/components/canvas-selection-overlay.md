# CanvasSelectionOverlay

CanvasSelectionOverlay draws the selection chrome over a layer on a canvas: the bounding outline, corner handles, a size badge, a type name, and the smart-selection and auto-layout cues. It is a presentational decoration, not an interactive control.

## Overview

Use CanvasSelectionOverlay to render the "selected object" treatment in a canvas mockup: the colored outline, the resize handles, the dimension badge, and the type label. The `type` prop picks the layer kind, which sets the accent color and which extras appear.

It is decorative only. It renders `aria-hidden="true"`, has `pointer-events: none`, and does no hit-testing, dragging, or resizing. The host canvas owns geometry and interaction; this component only paints the chrome.

Reach for a different component when the shape does not fit:

| Use instead | When |
|---|---|
| Dialog / Menu | The overlay needs to hold actionable controls. |
| Tooltip | A passive label on a normal UI control, not canvas chrome. |

**Source**

| | |
|---|---|
| Composa code | `src/react/factory.js` (`function CanvasSelectionOverlay`) |
| Composa CSS | `styles/92-canvas.css` (`.canvas-selection-*`, `.canvas-smart-*`, `.canvas-auto-layout-cue`) |
| Published exports | `@composa-ui/react`: `CanvasSelectionOverlay` |

**Figma source.** `design/component-api.json` lists `UI2 Canvas decorations`, node `0:20495`. This is a UI2 canvas-decoration set, not a published Figma component, and it is not covered by `docs/design-system/fidelity-overlays.md` (that audit scopes Tooltip, Dialog, Menu, and friends). The values below are documented from the factory and `styles/92-canvas.css`. Accent colors resolve from `design/generated/composa-core-tokens.css`: blue `#18a0fb`, component `#9747ff`, measure `#f24822`, spacing `#f531b3`.

## Anatomy

CanvasSelectionOverlay renders a `<div class="canvas-selection-overlay" aria-hidden="true">` positioned `inset: 0` over its relatively-positioned parent. Its children depend on `type`:

For standard selections (everything except the smart-selection types):

1. **Outline** (the container border). Color follows `type`.
2. **Four corner handles** (`.canvas-selection-handle`). 8px squares at the corners.
3. **Size badge** (optional, `.canvas-selection-badge.is-size`). Centered below the box. Shown when `showDimensions` is true and a dimension string resolves.
4. **Type name** (optional, `.canvas-selection-name`). Above the box, naming the layer kind.
5. **Auto-layout cue** (`autoLayout` + `direction` only). Inset lines marking the layout axis.

For the smart-selection types (`smartSelectionHorizontal`, `smartSelectionVertical`, `smartSelectionGrid`), the handles are replaced by smart markers and spacing ticks (`.canvas-smart-marker`, `.canvas-smart-space`), plus the same badges.

## Props

From `function CanvasSelectionOverlay({ ... })` in `src/react/factory.js` and the `CanvasSelectionOverlay` family in `design/component-api.json`.

| Prop | Type | Default | Description |
|---|---|---|---|
| `type` | `"standard" \| "textEdit" \| "component" \| "instance" \| "autoLayout" \| "smartSelectionHorizontal" \| "smartSelectionVertical" \| "smartSelectionGrid" \| "imageCrop" \| "vector" \| "slice" \| "reparenting" \| "cover"` | `"standard"` | Layer kind. Sets accent color, extras, and the type-name label. |
| `label` | `string` | none | Overrides the size badge text. When unset, the badge falls back to `width x height`. |
| `width` | `number` | none | Layer width, in px. Used to build the dimension string. |
| `height` | `number` | none | Layer height, in px. Used to build the dimension string. |
| `direction` | `"horizontal" \| "vertical" \| "both"` | none | Auto-layout axis. Only rendered when `type="autoLayout"`. |
| `showDimensions` | `boolean` | `true` | Whether to render the size badge. |
| `className` | `string` | `""` | Extra classes, appended to the Composa classes. |

Any other prop spreads onto the root `<div>` (for example `style`, `id`).

Notes on the API:

- **`label` is the badge override.** If `label` is set, the size badge shows it verbatim. Otherwise, if both `width` and `height` are set, the badge shows `${Math.round(width)} x ${Math.round(height)}`. If neither resolves, no size badge renders.
- **The type name comes from a fixed map**, not from `label`. Only these types get a name: component → "Component", instance → "Instance", autoLayout → "Frame", textEdit → "Text", imageCrop → "Crop", slice → "Slice", vector → "Vector", reparenting → "Reparent", cover → "Cover". `standard` and the smart-selection types render no type name.
- **`tone` is derived, not a prop.** Internally `component` and `instance` collapse to a `component` tone class (`is-component`); other types pass through. This drives the accent color and is exposed as `data-tone`.
- The overlay does not size itself to the layer. It fills its positioned parent (`inset: 0`); the caller sizes that parent.

## Variants

`type` is the variant axis. It maps to an accent color and a set of extras:

| Type | Accent color | Outline | Extras |
|---|---|---|---|
| `standard` | blue `#18a0fb` | solid | handles, size badge |
| `textEdit` | blue `#18a0fb` | dashed | handles, "Text" name |
| `component` / `instance` | purple `#9747ff` | solid | handles, "Component"/"Instance" name |
| `autoLayout` | blue `#18a0fb` | solid, `inset: -1px` | handles, "Frame" name, axis cue |
| `smartSelectionHorizontal` / `-Vertical` / `-Grid` | pink `#f531b3` | solid | smart markers + spacing ticks |
| `imageCrop` / `vector` / `slice` / `reparenting` / `cover` | red `#f24822` | solid | handles, type name (where mapped) |

The accent palette is the standard Figma canvas-decoration set: blue for plain selection, purple for components, red for measure-style tools, pink for spacing/smart selection.

## Sizes & width

There is no size axis. The overlay fills its positioned parent via `inset: 0`. Pass `width` and `height` only to feed the dimension badge text; they do not size the box. The handles are a fixed 8px and the badges a fixed 16px tall regardless of layer size.

## States

CanvasSelectionOverlay has no interactive states. It is `aria-hidden` and `pointer-events: none`, so it never hovers, focuses, or presses. Its appearance is fully determined by `type`, `direction`, `showDimensions`, and the dimension inputs. There is no `state` prop.

The visual variation that exists is structural, not stateful: the outline style (solid vs dashed for `textEdit`), the accent color per type, and the presence of the auto-layout cue or smart markers.

## Usage

**Do**

- Wrap the overlay in a `position: relative` parent sized to the layer; the overlay fills it.
- Set `type` to match the selected layer kind so the accent color reads correctly.
- Pass `width` and `height` to show a live dimension badge, or `label` to override the text.
- Use `direction` with `type="autoLayout"` to show the layout axis cue.
- Treat it as pure chrome; drive selection state from the host canvas.

**Don't**

- Put interactive controls inside it; it is `aria-hidden` and ignores pointer events.
- Rely on it to size or position the layer; it only paints over its parent.
- Expect a type name for `standard` or smart-selection types; those render none by design.

## Accessibility

- **Hidden by design.** The root is `aria-hidden="true"` and `pointer-events: none`. It is decoration; assistive tech skips it and it never receives focus or clicks.
- **No semantic content.** The dimension badge and type name are visual only. If the underlying selection state must be announced, expose it through the host canvas's own semantics, not this overlay.

## Code

```jsx
import { CanvasSelectionOverlay } from "@composa-ui/react";
```

Standard selection with a live dimension badge (parent is positioned and sized):

```jsx
<div style={{ position: "relative", width: 320, height: 140 }}>
  <CanvasSelectionOverlay type="standard" width={320} height={140} />
</div>
```

Component selection (purple accent, "Component" name) with a custom badge label:

```jsx
<CanvasSelectionOverlay type="component" label="Card / Large" />
```

Auto-layout frame showing the horizontal axis cue, no dimension badge:

```jsx
<CanvasSelectionOverlay
  type="autoLayout"
  direction="horizontal"
  showDimensions={false}
/>
```
