# MetaLabel

MetaLabel is a quiet hierarchical text label. It renders subdued supporting text at one of four levels: menu heading, section label, property label, or layer label.

## Overview

MetaLabel is a label primitive in Composa UI. Use it for the small, muted text that names a group rather than carries the main content: a menu heading, a section title in a panel, a property name in a property row, or a layer name. The `hierarchy` prop selects the level and its color treatment.

It is a support primitive, not a top-level interactive component. Other components compose it. `MenuHeadingCell`, for example, is a semantic menu heading row built from MetaLabel while `MenuRow` stays specialized for commands.

Reach for a sibling instead when the shape does not fit:

| Use instead | When |
|---|---|
| Header / `composa-header-title` | The text is a primary, full-weight title. |
| TextPair | You need a title plus a description line. |
| MenuRow | The row is an interactive command, not a label. |

**Source**

| | |
|---|---|
| Composa code | `src/react/factory.js` (`function MetaLabel`) |
| Composa CSS | `styles/10-list-cell.css` (`.composa-meta-label`) |
| Published export | `@composa-ui/react`: `MetaLabel` |

**Figma source.** MetaLabel is a Composa code primitive with no dedicated Figma component set. `search_design_system` on the Figma file (`4kilp0ShQiYsoUPJdleqEH`) returns no first-party MetaLabel component; the label patterns it serves live inside menu and panel compositions rather than as a standalone set. The `component-api.json` entry lists it under `supportComponents`, not `componentFamilies`, with `source: src/react/factory.js`.

## Anatomy

MetaLabel renders a single element with text children. There are no slots, icons, or dividers.

1. **Container** (the element). One tag, defaulting to `<span>` and settable via `as`. Carries the `composa-meta-label` class plus a per-hierarchy modifier.
2. **Children** (required). The label text. Truncates with an ellipsis when space is tight (`overflow: hidden`, `text-overflow: ellipsis`, `white-space: nowrap`).

## Props

From `function MetaLabel({ ... })` and the `MetaLabel` entry in `design/component-api.json`.

| Prop | Type | Default | Description |
|---|---|---|---|
| `children` | `ReactNode` | Required | The label text. |
| `hierarchy` | `"menu" \| "section" \| "property" \| "layer"` | `"menu"` | The level. Selects the color treatment. See Variants. |
| `as` | `IntrinsicElement` | `"span"` | The rendered tag. Use a heading tag for semantic headings. |
| `className` | `string` | `""` | Extra classes, appended to the Composa classes. |

Any other prop spreads onto the root element (for example `id`, `title`, `aria-*`).

## Variants

The `hierarchy` prop is the only variant axis. All four levels share the base type: 11px small Inter at the medium-strong weight, single-line, ellipsis-truncated. They differ only in color.

| Hierarchy | Use when | Color |
|---|---|---|
| `menu` | A heading inside a menu surface. | Dark-menu foreground `--composa-menu-row-fg-secondary` (white at 70%). |
| `section` | A section label inside a menu surface. | Same dark-menu foreground as `menu`. |
| `property` | A property name in a property row or panel. | `--composa-color-text-tertiary` (`rgba(0,0,0,0.3)`). |
| `layer` | A layer name. | Base `--composa-color-text-secondary` (`rgba(0,0,0,0.5)`), inherited from `.composa-meta-label`. |

The **`menu` and `section` levels use the dark-menu-surface foreground token**, which is near-white (`rgba(255,255,255,0.7)`). They are meant to sit on a dark menu surface (`--composa-menu-surface-bg`). On a light background they read as white-on-white. The MetaLabel story wraps these two levels in a dark surface so the label is legible; do the same in any light-canvas usage.

`property` and `layer` use dark text and sit on light surfaces without a wrapper.

## Sizes & width

MetaLabel has no size or width prop.

- **Type size** is fixed: `--composa-body-small-size` / `--composa-body-small-line`, weight `--composa-body-medium-strong-weight`. Hierarchy does not change the size, only the color.
- **Width** follows the container. The element is `display: inline-block` with `min-width: 0` and truncates rather than wrapping. To cap its width, constrain the parent.

## States

MetaLabel is non-interactive and has no states. It carries no hover, focus, active, or disabled treatment. Its only visual axis is `hierarchy`, which sets the color.

## Usage

**Do**

- Use `menu` and `section` only on a dark menu surface; the token is near-white text.
- Use `property` for property-row names and `layer` for layer names on light surfaces.
- Pass a semantic tag through `as` when the label is a real heading (for example `as="h3"`).
- Keep the text short; it truncates to one line.

**Don't**

- Use `menu` or `section` on a light background; the white text will disappear.
- Use MetaLabel for primary titles; use Header or TextPair.
- Rely on it for interaction; it renders plain text with no handlers.

## Accessibility

- **Element.** MetaLabel renders whatever `as` specifies, defaulting to a non-semantic `<span>`. Pass a heading tag (`as="h2"`, `as="h3"`) when the label is a section or menu heading so assistive tech announces structure.
- **Contrast.** The `menu` and `section` colors are light text intended for a dark surface. Placing them on a light surface fails contrast and hides the text; pair them with `--composa-menu-surface-bg` or an equivalent dark background.
- **No interaction.** There is no focus or keyboard behavior. Wrap or compose with an interactive element when the label needs to be actionable.
- **Truncation.** Text truncates with an ellipsis. Provide the full text through `title` or an accessible label if truncation could hide meaning.

## Code

```jsx
import { MetaLabel } from "@composa-ui/react";
```

A property label on a light surface:

```jsx
<MetaLabel hierarchy="property">Opacity</MetaLabel>
```

A menu heading as a semantic tag, on a dark menu surface:

```jsx
<div style={{ background: "var(--composa-menu-surface-bg)", padding: "6px 8px" }}>
  <MetaLabel hierarchy="menu" as="h3">
    Layers
  </MetaLabel>
</div>
```

A layer label:

```jsx
<MetaLabel hierarchy="layer">Frame 1</MetaLabel>
```
