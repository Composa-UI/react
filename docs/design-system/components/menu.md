# Menu

Menu is the floating command surface. It renders a dark panel of rows: commands, headings, dividers, and a footer.

## Overview

Menu is the dropdown/context-menu surface in Composa UI. Use it for a list of commands triggered from a button, a right-click, or a kebab control. It renders on a dark surface and composes its rows from MenuRow.

Reach for a sibling instead when the shape does not fit:

| Use instead | When |
|---|---|
| MenuMultiSelect | The menu is a multi-select picker with checkboxes. |
| Dropdown | The control is a single-value form select, not a command list. |
| Tooltip | You only need a short hint on a dark surface, with no rows. |
| ListCell | The row lives on a light editor panel, not a menu. |

This doc covers the Menu container, MenuRow (its row types, including the Heading row), and the Heading/Divider/Footer parts.

**Source**

| | |
|---|---|
| Composa code | `src/react/factory.js` (`function Menu`, `MenuRow`, `MenuHeadingCell`, `MenuMultiSelect`) |
| Composa CSS | `styles/86-menu.css` |
| Published exports | `@composa-ui/react`: `Menu`, `MenuRow`, `MenuMultiSelect`, `MenuHeadingCell` |

**Figma source** (file `4kilp0ShQiYsoUPJdleqEH`, "Figma's UI Kit")

| Part | Figma node | Node id |
|---|---|---|
| Menu container | "Menu example" | `2327:96374` |
| MenuRow | Menu row/Complex | `2327:96049` |
| Heading | Menu row/Heading | `2327:96347` |
| Divider | Menu row/Divider | `2327:96331` |
| Footer | Menu row/Footer | `2327:96342` |

`component-api.json` records the MenuRow family at `Menu`, page node `2028:86486`, with 63 variants. The Composa components reproduce that surface through props. Resolved Figma values and divergences are documented in `docs/design-system/fidelity-overlays.md`, which audits the menu group in depth.

## Anatomy

Menu renders a `<div role="menu">` containing a vertical run of rows. Each row is a MenuRow. The container owns the dark surface, the 13px radius, the elevation, and 8px top/bottom padding. Rows are full-bleed: each row owns its own horizontal inset, and there is no gap between rows.

MenuRow renders a `<button role="menuitem">` with three slots, in order:

1. **Leading** (optional). A 20px slot holding a checkmark, an icon, an avatar, a toggle glyph, or a spacer.
2. **Label** (required). The command text. Truncates with an ellipsis.
3. **Trailing** (optional). A shortcut `<kbd>`, a submenu chevron, a badge, a checkbox, a toggle switch, an expand `+/-`, or a mixed dash.

Several `type` values change the whole row rather than fill a slot:

- **`divider`** renders a 16px-tall rule (`#383838` 1px line), not a button.
- **`heading`** delegates to MenuHeadingCell: a `role="presentation"` row with a quiet MetaLabel and an optional trailing label.
- **`footer`** renders a wrapper holding a full-width secondary Button.
- **`toolbar`** renders a selectable tool/value row with a reserved checkmark slot, a leading icon slot, label, and optional shortcut. Use it when a menu needs both selection state and a semantic icon, such as stroke-side choices.

## Props

### Menu

From `function Menu({ ... })` in `src/react/factory.js`.

| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `"default" \| "label-only" \| "avatars" \| "mixed-icons"` | `"default"` | Picks a built-in demo row set when `items` is not passed. |
| `items` | `MenuRowProps[]` | none | The rows to render. Each entry is a MenuRow prop object. Falls back to the variant's demo rows. |
| `label` | `string` | `"Menu"` | The container's `aria-label`. |
| `className` | `string` | `""` | Extra classes, appended. |

### MenuRow

From `function MenuRow({ ... })` and the `MenuRow` family in `design/component-api.json`.

| Prop | Type | Default | Description |
|---|---|---|---|
| `type` | `"simple" \| "complex" \| "checkmark" \| "toggle" \| "toolbar" \| "heading" \| "divider" \| "expand" \| "footer"` | `"simple"` | The row kind. Drives which slots render. |
| `label` | `string` | `"Row text"` | Command text. Also the heading/footer label. |
| `state` | `"default" \| "hover" \| "disabled"` | `"default"` | Forces a visual state for docs. `disabled` also disables the button. |
| `selected` | `boolean` | `false` | Marks the row selected (full-bleed blue fill). Drives the checkmark for `checkmark` rows. |
| `submenu` | `boolean` | `false` | Shows a submenu chevron in the trailing slot. |
| `lead` | `"false" \| "avatar" \| "icon" \| string` | `"false"` | Leading content for rows. For `toolbar`, pass the icon name shown after the reserved checkmark slot. |
| `trail` | `"false" \| "shortcut" \| "badge" \| "checkbox" \| "mixed"` | `"false"` | Trailing content. `shortcut` renders a `<kbd>`. |
| `shortcut` | `string` | none | Shortcut text. Setting it forces the shortcut `<kbd>` even without `trail="shortcut"`. |
| `checkVariant` | `"check" \| "dot"` | `"check"` | The mark for `checkmark` rows: `✓` or `•`. |
| `toggleState` | `"on" \| "off"` | `"off"` | Switch position for `toggle` rows. |
| `hasIcon` | `boolean` | `false` | For `toggle` rows, shows a leading icon instead of a spacer. |
| `expanded` | `boolean` | `false` | For `expand` rows, shows `-` (expanded) or `+`. |
| `alignment` | `"default" \| "toggle"` | `"default"` | For `heading` rows, adds a trailing "On" label when `toggle`. |
| `disabled` | `boolean` | `state === "disabled"` | Disables the row button. |
| `className` | `string` | none | Extra classes, appended. |

### MenuHeadingCell (the `heading` row)

| Prop | Type | Default | Description |
|---|---|---|---|
| `label` | `ReactNode` | `"Layer"` | The heading label, rendered via MetaLabel. |
| `hierarchy` | `"menu" \| "section" \| "property" \| "layer"` | `"menu"` | MetaLabel color treatment. |
| `alignment` | `"default" \| "toggle"` | `"default"` | `toggle` adds a trailing "On" MetaLabel. |
| `trailing` | `ReactNode` | `null` | Overrides the trailing content. |
| `content` | `ReactNode` | none | Overrides the label MetaLabel. |

### MenuMultiSelect

| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `"default" \| "label-only" \| "avatars" \| "mixed-icons"` | `"default"` | Demo row set. |
| `label` | `string` | `"Multi select menu"` | The container's `aria-label`. |

Any other prop spreads onto the component's root element (`onClick` on a MenuRow, `id` on the Menu container, `aria-*`).

Notes on the API:

- `component-api.json` lists a `containerVariant` enum (`default | label-only | avatars | mixed-icons`) on the MenuRow family. In the factory this lives on `Menu`/`MenuMultiSelect` as `variant`, selecting a built-in demo row set; it is not a MenuRow prop.
- Passing `shortcut` is enough to render the trailing `<kbd>`; you do not also need `trail="shortcut"`.
- `disabled` defaults from `state`: `state="disabled"` disables the button.
- Use `type="toolbar"` when a row needs both a persistent checkmark column and a leading icon. Do not overload `checkmark` rows for that shape; checkmark rows reserve only the selection slot.

## Toolbar Rows

Toolbar rows are for menu choices where the row needs both:

- a reserved checkmark slot that does not shift labels; and
- a leading semantic icon that describes the option.

Use this shape for stroke-side and similar icon choices:

| Option | Material Symbol |
| --- | --- |
| All | `border_outer` |
| Top | `border_top` |
| Bottom | `border_bottom` |
| Left | `border_left` |
| Right | `border_right` |

The checkmark slot stays reserved whether the row is selected or not. The leading icon sits after that reserved slot and before the label. Do not put the semantic icon into the checkmark slot; it will make labels jump between selected and unselected rows.

The toolbar row shares the standard row's left inset (8px) and uses the same 20px leading slot for its reserved checkmark, so a toolbar row's checkmark lines up with the leading slot of every other row type. A toolbar "rectangle" row and a "snap to grid" toggle row therefore start on the same left line; the toolbar row simply adds the icon slot after its checkmark slot. Do not give the toolbar row a larger custom left padding or an absolutely positioned checkmark — that breaks left-edge alignment with sibling rows.

## Variants

Menu's `variant` is not a visual style. It selects a built-in demo row set used when you do not pass `items`. In production pass `items` (or compose MenuRow children) and let `variant` fall back.

| Variant | Built-in rows |
|---|---|
| `default` | Three checkmark rows (Design, Prototype, Dev mode). |
| `label-only` | Three plain command rows. |
| `avatars` | Three complex rows with avatars and checkboxes. |
| `mixed-icons` | Three complex rows with icons and shortcuts/badge. |

The real variation lives on MenuRow via `type`, `lead`, and `trail`. A single Menu mixes row types freely.

## Sizes & width

Menu has no size axis. The container is a fixed 180px wide (`--composa-menu-width`); rows are 24px tall (`--composa-menu-row-height`). There is no per-instance size or width prop.

| Token | Value |
|---|---|
| Container width | 180px |
| Row min-height | 24px |
| Leading slot | 20px |
| Lead icon | 16px |
| Container radius | 13px (`radius-large`) |
| Container padding | 8px top/bottom, 0 sides |
| Inter-row gap | 0 |
| Row radius | 5px (`radius-medium`) |
| Row inset | 8px left, 4px right |

## States

Container states do not apply; the Menu is a static surface. State lives on the row.

| State | Reached by | Treatment |
|---|---|---|
| Default | resting | Transparent row on the dark surface; text `#ffffff`, secondary text `rgba(255,255,255,0.7)`. |
| Hover | `:hover`, `.is-hover`, or `state="hover"` | Full-bleed blue fill (`#0d99ff`); trailing/secondary text flips to selected foreground. |
| Selected | `selected={true}` (`.is-selected`) | Same full-bleed blue fill as hover; marks the active choice. |
| Disabled | `disabled` / `state="disabled"` | Dimmed text (`rgba(255,255,255,0.32)`), `cursor: default`, native `disabled`. |

The `state` prop forces a visual state for documentation and screenshots. Real interaction is browser-driven. Hover and selected share the same blue fill by design.

## Usage

Grounded in the Figma menu group (`Menu row/Complex` `2327:96049` and the container `2327:96374`) and the fidelity audit.

**Do**

- Group related commands and separate groups with a `divider` row.
- Use a `heading` row to label a group; keep it quiet (it is non-interactive).
- Show keyboard shortcuts in the trailing slot for commands that have one.
- Use `checkmark` rows for single-choice settings and `toggle` rows for on/off settings.
- Use a `submenu` chevron only when the row opens a nested menu.
- Reserve the full-bleed blue fill for one selected/active row per choice group.

**Don't**

- Put long, wrapping labels in a row; rows truncate at 180px.
- Mix a light-surface component into the dark menu; the menu owns its own palette.
- Use `state` to model live interactivity; it is a display override.
- Stack two selected rows in the same single-choice group.

## Accessibility

- **Roles.** Menu renders `role="menu"` with an `aria-label` from `label`. Command rows render `<button role="menuitem">`. Divider and heading rows are non-interactive: heading is `role="presentation"`, divider is a plain `div`. Toolbar rows render `role="group"`.
- **Keyboard.** Each command row is a native `<button>`, so Tab reaches it and Enter/Space activate it. Composa does not add roving-tabindex arrow-key navigation; wire menu keyboard traversal at the trigger/menu manager if you need it.
- **Accessible name.** Rows use their visible `label`. Set a clear `label` on the Menu container so the surface is announced.
- **Selected/disabled.** Selected rows carry `data-selected` and the selected fill; for assistive announcement of a chosen item add `aria-checked` via spread props on `checkmark` rows. Disabled rows set the native `disabled` attribute, removing them from the tab order.
- **Contrast.** Text is `#ffffff` on `#1f1f1f`, secondary `rgba(255,255,255,0.7)`. The selected fill is `#0d99ff` with white text.

## Code

```jsx
import { Menu, MenuRow, MenuMultiSelect } from "@composa-ui/react";
```

A command menu built from explicit rows:

```jsx
<Menu
  label="Edit"
  items={[
    { type: "simple", label: "Copy", shortcut: "⌘C" },
    { type: "simple", label: "Paste", shortcut: "⌘V" },
    { type: "divider" },
    { type: "heading", label: "Arrange" },
    { type: "simple", label: "Bring to front", trail: "shortcut", shortcut: "]" },
    { type: "complex", label: "Group", lead: "icon", submenu: true },
  ]}
/>
```

A single selectable command row with a hover/selected fill and a shortcut:

```jsx
<MenuRow
  type="checkmark"
  label="Dev mode"
  selected
  shortcut="⇧D"
  onClick={enableDevMode}
/>
```

A multi-select menu falling back to its avatar demo rows:

```jsx
<MenuMultiSelect variant="avatars" label="Assignees" />
```
