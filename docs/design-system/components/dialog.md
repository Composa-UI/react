# Dialog

Dialog is a modal window with a header, a body, and a footer of actions. It interrupts the flow to confirm a choice, edit a setting, or run a focused task.

## Overview

Use Dialog for a self-contained task that should block the rest of the UI until it is done or dismissed: rename a layer, create a project, confirm a delete. It renders a `role="dialog"` section with `aria-modal="true"`.

`Dialog` is a one-shot composer: pass `title`, `description`, and the two button labels, and it assembles the header, body, and footer for you. For richer layouts, drop the sub-components (`DialogHeader`, `DialogBody`, `DialogFooter`, `DialogRow`) into `children` and compose by hand.

Reach for a different component when the shape does not fit:

| Use instead | When |
|---|---|
| Menu | A list of actions or options, anchored to a trigger, not modal. |
| Tooltip | A passive one-line label or hint. |
| InputField | An inline edit that does not need to block the view. |

**Source**

| | |
|---|---|
| Composa code | `src/react/factory.js` (`function Dialog`, `DialogHeader`, `DialogHeaderCell`, `DialogBody`, `DialogFooter`, `DialogRow`) |
| Composa CSS | `styles/80-dialog.css` |
| Published exports | `@composa-ui/react`: `Dialog`, `DialogHeader`, `DialogBody`, `DialogFooter`, `DialogRow` |

**Figma source** (file `4kilp0ShQiYsoUPJdleqEH`, "Figma's UI Kit")

| Region | Figma node |
|---|---|
| Modal header | `2327:122027` |
| Modal footer | `2327:122061` |
| Modal body (Input) | `2327:122018` |
| Assembled template | `2327:121900` |

The library also ships a "Dialog (modal) TEMPLATE" component in "UI2: Figma's Design System". Dialog draws geometry from the Modal header/body/footer parts; there is no single Modal container component, so the window is assembled from those parts plus the template.

## Anatomy

`Dialog` renders a `<section role="dialog" aria-modal="true">` with three children, in order:

1. **Header** (`DialogHeader`, a `<header>`). Holds a `DialogHeaderCell` with the title and a close `IconButton` (a rotated plus glyph) on the trailing side. Has a bottom border.
2. **Body** (`DialogBody`, a `<div>`). Renders the `description` as a `<p>`, or your `children` when provided.
3. **Footer** (`DialogFooter`, a `<footer>`). Right-aligned actions: a Secondary button (`secondaryLabel`) and a Primary button (`primaryLabel`). Has a top border.

Header geometry: 40px tall (`min-height: var(--composa-space-6)`), 8px padding, bottom border `#e6e6e6`. The header cell drops its list-cell `min-height` to 0 so the row resolves to 24 (content) + 8 + 8 = 40px. The title is `body-medium-strong` (11px/16px/550).

Body geometry: 16px padding, 16px row gap, secondary text color.

Footer geometry: 40px tall, 8px padding, top border `#e6e6e6`, actions right-aligned with an 8px gap.

`DialogRow` is a `ListCell` preset (hierarchy `property`, level 3, top-aligned, no underline) for laying out labeled rows inside the body.

## Props

From `function Dialog({ ... })` in `src/react/factory.js` and the `Dialog` family in `design/component-api.json`.

| Prop | Type | Default | Description |
|---|---|---|---|
| `title` | `string` | `"Dialog title"` | Header title. Also used as the dialog's `aria-label`. |
| `description` | `string` | `"Dialog body text"` | Body text. Rendered as a `<p>` when no `children` are passed. |
| `size` | `"320" \| "480" \| "small" \| "default" \| "large"` | `"default"` | Window width. See Sizes & width. |
| `variant` | `"basic" \| "advanced" \| "embed" \| "create-project" \| "create-team" \| "sharing"` | none | Names a Figma template. Applied as a class only; see Variants. |
| `tone` | `"default" \| "destructive"` | `"default"` | `destructive` swaps the primary button to the `destructive` variant. |
| `primaryLabel` | `string` | `"Done"` | Label of the footer's primary (confirm) button. |
| `secondaryLabel` | `string` | `"Cancel"` | Label of the footer's secondary (cancel) button. |
| `className` | `string` | `""` | Extra classes, appended to the Composa classes. |
| `children` | `ReactNode` | none | Replaces the default `description` paragraph in the body. |

Any other prop spreads onto the root `<section>` (for example `id`, `onKeyDown`, `aria-*`).

The sub-components (`DialogHeader`, `DialogBody`, `DialogFooter`) each take `children` and `className` and spread the rest to their root element. `DialogRow` takes `leading`, `leadingContent`, `content`, `trailing`, and `className`. `DialogHeaderCell` takes `title`, `content`, and `trailing`.

Notes on the API:

- **`variant` is decorative.** The factory applies `composa-dialog-{variant}` to the root, but `styles/80-dialog.css` defines no rules for those classes. Naming a template variant changes nothing visually today. It is a labeling hook, not a layout switch.
- **`tone` has one effect.** `tone="destructive"` sets the primary button's variant to `destructive`. The `composa-dialog-{tone}` class itself has no CSS.
- Passing `children` replaces the body paragraph. Compose with `DialogBody` / `DialogRow` inside `children` for structured content.
- The close button is always rendered in the header with `label="Close dialog"`. It is presentational; wire its `onClick` by composing the header yourself if you need a handler.

## Variants

`variant` names one of the six Figma modal templates (Basic, Advanced, Embed, Create Project, Create Team, Sharing). The factory passes it through as a class.

| Variant | Figma template | Notes |
|---|---|---|
| `basic` | 320 Basic | Class only; no CSS today. |
| `advanced` | 320 Advanced | Class only; no CSS today. |
| `embed` | 480 Embed | Class only; no CSS today. |
| `create-project` | 480 Create Project | Class only; no CSS today. |
| `create-team` | 480 Create Team | Class only; no CSS today. |
| `sharing` | 480 Sharing | Class only; no CSS today. |

**Divergence:** Figma models these as distinct template layouts. Composa exposes them as named hooks but does not yet style them, so the body content is the caller's responsibility. Treat `variant` as documentation of intent, not a finished layout.

## Sizes & width

Dialog has a single axis: window width. Height is content-driven. Default is `default` (360px).

| Size | Width | Source |
|---|---|---|
| `small` | 300px | Composa addition |
| `default` | 360px | Composa addition |
| `large` | 480px | Composa addition |
| `320` | 320px | Figma template width |
| `480` | 480px | Figma template width |

Width uses `min(<width>, 100%)`, so the dialog shrinks on narrow viewports.

**Divergence:** the `320` and `480` sizes match the Figma template widths. The `small` (300) and `default` (360) sizes are **Composa additions with no Figma source**, flagged in `docs/design-system/fidelity-overlays.md`. Prefer `320` / `480` when matching the Figma templates.

## States

Dialog has no interactive state axis. It is a static container; the buttons it renders carry their own states (see button.md). Open and close are the caller's responsibility. The component does not portal, trap focus, manage a backdrop, or animate.

The header/footer borders and the body padding are fixed, not stateful.

## Usage

Grounded in the Modal header/body/footer geometry (nodes `2327:122027`, `2327:122061`, `2327:122018`).

**Do**

- Use a dialog for a focused, blocking task and give it a clear title.
- Write the primary label as a verb that names the action ("Rename", "Create team"), not "OK".
- Keep one primary and one secondary action in the footer.
- Use `tone="destructive"` to confirm an irreversible action.
- Use `DialogRow` to lay out labeled fields inside the body.
- Match `size="320"` or `size="480"` to the Figma templates.

**Don't**

- Stack multiple primary buttons in the footer.
- Use a dialog for a passive message; use a Tooltip or inline text.
- Rely on `variant` to produce a finished template layout; it is a class hook only today.
- Assume the component manages focus or a backdrop; wire those at the call site.

## Accessibility

- **Role.** Renders `<section role="dialog" aria-modal="true">`. The `aria-label` is set from `title`, so the dialog is named.
- **Focus management is the caller's job.** The component does not trap focus, move focus on open, or restore it on close. Wrap it in your app's focus-trap and move focus to the dialog when it opens.
- **Dismissal.** There is no built-in Escape handler. Wire `onKeyDown` (spread onto the root) or your overlay layer to close on Escape and on backdrop click.
- **Close button.** The header close `IconButton` has `label="Close dialog"`, so it is named for assistive tech. It needs an `onClick` wired by the caller (compose the header to attach one).
- **Buttons.** The footer renders real `<button>` elements with their visible labels as accessible names.

## Code

```jsx
import { Dialog, DialogBody, DialogRow } from "@composa-ui/react";
```

Simple confirm dialog at a Figma template width:

```jsx
<Dialog
  size="320"
  title="Rename layer"
  description="Update this layer name for everyone in the file."
  primaryLabel="Rename"
  secondaryLabel="Cancel"
/>
```

Destructive confirm (primary button becomes destructive):

```jsx
<Dialog
  title="Delete project"
  description="This removes the project for everyone. This cannot be undone."
  tone="destructive"
  primaryLabel="Delete"
  secondaryLabel="Cancel"
/>
```

Structured body with rows, composed via `children`:

```jsx
<Dialog title="Replace poster frame" size="default" primaryLabel="Apply">
  <DialogBody>
    <DialogRow
      leading={<IconButton icon="image" label="Asset preview" />}
      content={<TextPair title="Poster frame" description="Swap the still image." />}
      trailing={<Button label="Choose" variant="secondary" />}
    />
  </DialogBody>
</Dialog>
```
