# ListCell

ListCell is the shared horizontal row primitive for editor surfaces. It lays out an optional leading slot, a required content slot, and an optional trailing slot at a fixed row height.

## Overview

ListCell is the building block under panel rows, property rows, layer rows, dialog rows, and section headers in Composa UI. It does one job: arrange a leading slot, a content slot, and a trailing slot in a row with consistent height, padding, and gap. It carries no text styling of its own. The content you pass decides what the row reads as.

Reach for a part of the family instead when the shape is more specific:

| Use instead | When |
|---|---|
| Header | The row is a section/panel header with a title, disclosure, and actions. |
| ContentStack | You need a vertical stack of swappable rows inside the content slot. |
| TextPair | The content is a title with an optional secondary description line. |
| MetaLabel | You need a single quiet, hierarchical label (eyebrow, section label). |
| MenuRow | The row is a command inside a Menu surface. |

This doc covers ListCell and its content-side parts: Header, ContentStack, TextPair, MetaLabel, and HeaderActions.

**Source**

| | |
|---|---|
| Composa code | `src/react/factory.js` (`function ListCell`, `Header`, `ContentStack`, `TextPair`, `MetaLabel`, `HeaderActions`) |
| Composa CSS | `styles/10-list-cell.css` |
| Published exports | `@composa-ui/react`: `ListCell`, `Header`, `ContentStack`, `TextPair`, `MetaLabel`, `HeaderActions` |

**Figma source** (file `4kilp0ShQiYsoUPJdleqEH`, "Figma's UI Kit")

ListCell has no 1:1 published Figma component. It is a Composa abstraction. It is audited against the Figma text styles and row geometry it composes from: menu-row text, modal-header title, `body/medium`, `body/medium/strong`, `body/small/strong`. The related Header section uses Modal header `2327:122027` as its title-style anchor. This is documented in `docs/design-system/fidelity-overlays.md`.

## Anatomy

ListCell renders a `<div>` with up to three slots, in order:

1. **Leading** (optional). Rendered only when `leading` (or its alias `leadingContent`) is set. A fixed 24px-wide, center-justified gutter. Holds an icon, a disclosure control, or an avatar.
2. **Content** (required). The flexible middle slot. Holds whatever you pass: a TextPair, a MetaLabel, a ContentStack, or plain text.
3. **Trailing** (optional). Rendered only when `trailing` is set. A content-hugging action group, right-justified. ListCell wraps it in a HeaderActions group automatically.

Container: full width, 24px min-height by default, 8px horizontal padding, 8px gap between slots. The `underline` prop adds a 1px bottom border (`#e6e6e6`).

Family anatomy:

- **Header** composes ListCell. It generates a leading disclosure control, a title in a heading element, and a trailing actions group.
- **TextPair** renders a title element plus an optional description, stacked with a 2px gap, for the content slot.
- **ContentStack** renders a vertical grid of children with a configurable gap and alignment, for the content slot.
- **MetaLabel** renders a single quiet label element. It truncates with an ellipsis.
- **HeaderActions** renders a right-aligned, content-hugging group of action controls.

## Props

### ListCell

From `function ListCell({ ... })` in `src/react/factory.js` and the `ListCell` entry in `design/component-api.json`.

| Prop | Type | Default | Description |
|---|---|---|---|
| `content` | `ReactNode` | Required | The middle slot content. The only slot always rendered. |
| `leading` | `ReactNode` | `null` | Leading slot content. Renders a 24px gutter when set. |
| `leadingContent` | `ReactNode` | `null` | Alias for `leading`. `leading` wins when both are set. |
| `trailing` | `ReactNode` | `null` | Trailing action(s). Wrapped in HeaderActions. Accepts a node or an array. |
| `level` | `1 \| 2 \| 3` | `3` | Row height step. Clamped to 1–3. See Sizes & width. |
| `hierarchy` | `"panel" \| "layer" \| "property"` | `"property"` | Sets the `composa-list-cell-${hierarchy}` class and `data-hierarchy`. Drives text color through the content parts. |
| `underline` | `boolean` | `false` | Adds a 1px bottom border. |
| `componentName` | `string` | `"ListCell"` | Sets `data-composa-component`. Header passes `"Header"`. |
| `className` | `string` | `""` | Extra classes, appended. |

`component-api.json` lists `hierarchy` as `panel | layer | property`. The factory does not validate it, so any string flows through to the class and data attribute.

### Header

| Prop | Type | Default | Description |
|---|---|---|---|
| `title` | `string` | none | Header text. Rendered in an `h${level}` element. |
| `level` | `number` | `3` | Drives both the heading element (`h1`–`h6`) and the ListCell height step (clamped 1–3). |
| `hierarchy` | `"panel" \| "layer" \| "property"` | `"property"` | Passed to ListCell. `layer` defaults `underline` on. |
| `expanded` | `boolean` | `undefined` | Disclosure state. Sets `aria-pressed` on the disclosure and switches its label between Expand/Collapse. |
| `actions` | `ReactNode` | none | Trailing actions. Alias of `trailing`; `trailing` wins when both are set. |
| `leading` | `"auto" \| "none" \| "icon"` | `"auto"` | Disclosure mode. `auto` shows a disclosure only when `expanded` is defined. `icon` renders a static glyph. `none` hides it. |
| `leadingIcon` | `IconName` | `"chevronDown"` | The disclosure/leading glyph. |
| `onToggle` | `function` | none | Click handler on the generated disclosure IconButton. |
| `content` | `ReactNode` | none | Overrides the generated title element. |
| `underline` | `boolean` | `hierarchy === "layer"` | Bottom border. Defaults on for `layer`. |

### ContentStack

| Prop | Type | Default | Description |
|---|---|---|---|
| `children` | `ReactNode` | `[]` | Stacked rows. |
| `gap` | `string` | `"2px"` | CSS gap between children. |
| `align` | `"stretch" \| "start" \| "center" \| "end"` | `"stretch"` | `justify-items` for the stack. |

### TextPair

| Prop | Type | Default | Description |
|---|---|---|---|
| `title` | `ReactNode` | none | The primary line. Truncates with an ellipsis. |
| `description` | `ReactNode` | `null` | Optional secondary line. Renders only when set. |
| `titleAs` | `IntrinsicElement` | `"strong"` | The title element tag. |
| `titleClassName` | `string` | `""` | Extra classes on the title. |
| `descriptionClassName` | `string` | `""` | Extra classes on the description. |

### MetaLabel

| Prop | Type | Default | Description |
|---|---|---|---|
| `children` | `ReactNode` | none | Label text. |
| `hierarchy` | `"menu" \| "section" \| "property" \| "layer"` | `"menu"` | Sets the color treatment. `menu`/`section` are secondary-on-dark; `property` is tertiary-on-light. |
| `as` | `IntrinsicElement` | `"span"` | The element tag. |

### HeaderActions

| Prop | Type | Default | Description |
|---|---|---|---|
| `children` | `ReactNode` | `[]` | Action controls. |
| `label` | `string` | `"Header actions"` | The group's `aria-label`. |

Any other prop spreads onto each component's root element (for example `onClick`, `style`, `id`, `aria-*`).

Notes on the API:

- ListCell wraps `trailing` in a HeaderActions group, so trailing actions get a labeled `role="group"` automatically.
- `leading` and `leadingContent` are aliases. `leading` takes priority. Header also accepts `leadingContent`, which overrides its generated disclosure.
- Header's `level` is overloaded: it picks both the heading element (`h1`–`h6`, clamped 1–6) and the ListCell height step (clamped 1–3).
- `data-has-leading` and `data-has-trailing` are emitted from whether those slots resolve to renderable content.

## Variants

ListCell has no `variant` axis. Its two descriptive axes are `level` (height) and `hierarchy` (text color through the content parts).

`hierarchy` is the closest thing to a variant. It does not change ListCell's own geometry. It changes the color of MetaLabel and other text parts placed inside:

| Hierarchy | Use when | Notes |
|---|---|---|
| `property` | Property rows on a light panel. | Default. MetaLabel renders tertiary-on-light (`rgba(0,0,0,0.3)`). |
| `panel` | Top-level panel rows and headers. | Geometry only; color comes from the content parts. |
| `layer` | Layer-list rows. | Header defaults `underline` on for this hierarchy. |
| `menu`, `section` | Quiet labels on a dark menu surface (via MetaLabel). | MetaLabel renders secondary-on-dark (`rgba(255,255,255,0.7)`). |

The `level`×`hierarchy` matrix is a Composa information-architecture layer with no direct Figma component set. The geometry maps cleanly onto menu, dialog, and panel rows. This is a deliberate divergence, flagged in `docs/design-system/fidelity-overlays.md`, not a defect.

## Sizes & width

`level` is the height axis. There is no width axis. ListCell is always full width (`width: 100%`).

**Level** (min-height). Default is `3`.

| Level | Min-height | Anchor |
|---|---|---|
| `1` | 32px | Section/panel headers. |
| `2` | 28px | Dialog rows. |
| `3` | 24px | Menu/list rows. Matches `--composa-menu-row-height`. |

Level-1 also lifts the contained title (Header title / TextPair title) from `body/medium` to `body/large` (`13px/22px/550`).

Geometry notes:

- The leading slot is a fixed 24px gutter. The Figma menu lead icon sits in a 16px slot; Composa uses a wider 24px gutter for panel alignment. Flagged in the fidelity audit.
- The level-1 title type scale is a Composa decision. Figma's modal header title is `body/medium/strong` (`11px/16px/550`), a step smaller than Composa's level-1 `13px`. This is the one ListCell MISMATCH in the fidelity audit. Same root cause as the Header title note.
- **The 32px level-1 min-height is overridden to 0 in the dialog header.** `.composa-dialog-header-cell` sets `padding: 0; min-height: 0` so the dialog header resolves to 24px content + 8px + 8px = 40px (the Figma modal-header height) rather than stacking the 32px floor on top.

## States

ListCell is a layout primitive, not an interactive control. It has no hover/active/focus/disabled treatment of its own. Interactive state lives in the controls you place in the slots (an IconButton in the leading or trailing slot, a MenuRow inside a Menu).

Header is the one part with a state-bearing prop:

| State | Reached by | Treatment |
|---|---|---|
| Collapsed | `expanded={false}` | Disclosure IconButton with `aria-pressed="false"`; label reads "Expand {title}". |
| Expanded | `expanded={true}` | Disclosure IconButton with `aria-pressed="true"`; label reads "Collapse {title}". |
| No disclosure | `expanded` undefined and `leading="auto"` | Leading slot is empty; no disclosure control. |

## Usage

ListCell is a primitive. Most usage guidance is about which content part to put inside.

**Do**

- Use TextPair when a row needs a title plus a quiet secondary line.
- Use MetaLabel for eyebrows and section labels; match `hierarchy` to the surface.
- Use Header (not raw ListCell) when the row is a section or panel header with a title.
- Set `level` from the surface: 3 for menu/list rows, 2 for dialog rows, 1 for headers.
- Put interactive controls (IconButton, ToggleButton) in the leading or trailing slot, not raw text.
- Let `trailing` wrap actions; pass an array for multiple actions.

**Don't**

- Put body styling on ListCell itself; it carries layout, not type.
- Use `level="1"` for an ordinary list row; it is for headers.
- Hand-build a section header out of raw slots; use Header so the disclosure and ARIA come for free.
- Mix a dark-surface `hierarchy` (`menu`/`section`) into a light panel row.

## Accessibility

- **Element.** ListCell, ContentStack, TextPair, and MetaLabel render plain elements (`div`, `strong`/`span`). They add no roles, so they stay semantically neutral. Put semantics on the content.
- **Trailing group.** ListCell wraps `trailing` in HeaderActions, which renders `role="group"` with an `aria-label` (default "Header actions"). Set a clearer `label` when the group's purpose is specific.
- **Header.** The title renders in a real heading element (`h1`–`h6`) chosen by `level`, so headers participate in the document outline. Pick `level` for outline order, not only for height.
- **Disclosure.** Header's generated disclosure is an IconButton with `aria-pressed` from `expanded` and a label that switches between "Expand {title}" and "Collapse {title}", so assistive tech announces the toggle and its target.
- **MetaLabel.** It is a label, not a heading. Use Header (or a heading element via `as`) when the text is a structural heading.

## Code

```jsx
import {
  ListCell,
  Header,
  ContentStack,
  TextPair,
  MetaLabel,
} from "@composa-ui/react";
```

A property row with a title/description pair and a trailing control:

```jsx
<ListCell
  level={3}
  hierarchy="property"
  content={<TextPair title="Opacity" description="Layer transparency" />}
  trailing={<IconButton icon="more" label="Opacity options" variant="ghost" />}
/>
```

A collapsible section header:

```jsx
<Header
  title="Layers"
  level={1}
  hierarchy="layer"
  expanded={isOpen}
  onToggle={() => setOpen((v) => !v)}
  actions={<IconButton icon="plus" label="Add layer" variant="ghost" />}
/>
```

A content stack of labels and a quiet eyebrow:

```jsx
<ListCell
  content={
    <ContentStack gap="4px" align="start">
      <MetaLabel hierarchy="property">Position</MetaLabel>
      <TextPair title="X 240  Y 120" />
    </ContentStack>
  }
/>
```
