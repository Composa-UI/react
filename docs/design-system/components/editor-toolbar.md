# Editor toolbar

`EditorToolbar` is the floating canvas creation toolbar for the design editor. It floats over the canvas (rounded, shadowed) and exposes the supported creation tools as split-button groups. It is purely presentational and controlled: it reflects the active tool and emits `onToolChange`, owning no canvas engine, selection, or document model.

Figma reference: `rMq1M35u1iyKB2QaQMipZb` node `86-5602` (simplified). The fuller reference (`99-10318`) is context only.

## Classification

| Layer | Component | Responsibility |
| --- | --- | --- |
| Base/support | `SplitButton` | Primary action half + caret half + tooltips for each tool group. |
| Base/support | `IconButton` | The caret half (chevron) inside `SplitButton`. |
| Base/support | `MenuRow` (`type="toolbar"`) | Tool-picker radio rows: leading check when selected, tool icon, label, shortcut. |
| Base/support | `OverlayHost` / `OverlayPortal` / `OverlayLayer` | Anchored placement of the tool-picker menus. |
| Module | `EditorToolbar` | The tool group set, active-tool contract, and floating-container chrome. |
| Template | `EditorShell` | Renders the toolbar through its `canvasToolbar` slot (a canvas-anchored overlay, not a shell row). |

## Anatomy

1. **Container.** A 48px-tall, rounded (13px), shadowed bar with 8px padding and an 8px gap between groups. It floats over the canvas.
2. **Tool group.** Each group is a `SplitButton`: a 32px primary icon action half plus a 16px caret half, separated by a 1px hairline, each half with a 5px radius.
3. **Action half.** Shows the group's current tool icon and activates it on click. When the group owns the active tool it is brand-blue with an on-brand glyph; otherwise it is quiet (ghost) on the white surface.
4. **Caret half.** Opens the group's tool-picker menu through `OverlayPortal`.
5. **Tool-picker menu.** A compact popover of `MenuRow type="toolbar"` radio rows. The active tool carries the leading check.

## Scope

The toolbar is intentionally scoped to two groups, matching what a tldraw-style canvas supports:

| Group | Caret menu label | Tools |
| --- | --- | --- |
| Move | Move tools | Move (pointer, `move`) / Hand (pan, `hand`) |
| Shape | Shape tools | Rectangle (`rectangle`) / Circle (`circle`) |

Tool ids are stable strings (`move`, `hand`, `rectangle`, `circle`) so the app repo can map them to real tool commands.

## Behavior

- Controlled `activeTool` and uncontrolled `defaultActiveTool` (default `move`), mirroring the navigation rail's `value` / `defaultValue` contract.
- `onToolChange(toolId, event)` fires on both an action click and a menu selection.
- A group's action half remembers the last tool used in that group, so switching groups does not lose the previously chosen variant icon.
- The caret menu opens on caret click, closes on outside click and on selection, and the caret carries an open/active state while open.
- Menus are radio rows (`menuitemradio`); exactly one tool is active across the toolbar.

## Guidance

- Drop the toolbar into `EditorShell`'s `canvasToolbar` slot; it is self-contained and overlay-friendly, so the shell's canvas `OverlayHost` hosts its menus.
- Do not hand-roll carets or menus. Tool groups reuse `SplitButton` + `IconButton` + `MenuRow` + the overlay system.
- Add new tool glyphs to the built-in license-clean glyph set (`src/react/builtin-glyphs.js`, Material Symbols) rather than placeholders, and mirror the name in `src/react/story-icons.js` so Storybook renders the runtime symbol.
- Keep the toolbar scoped to supported creation actions (per `AGENTS.md`). New tools belong in an existing group's menu or a new group, not as loose icon buttons.

## Icons

The toolbar's tool glyphs are added to the built-in glyph set so the published, license-clean package renders real icons with no injected icon set:

| Tool | Built-in glyph | Material Symbol |
| --- | --- | --- |
| Move | `move` | `near_me` |
| Hand | `hand` | `back_hand` |
| Rectangle | `rectangle` | `rectangle` |
| Circle | `circle` | `circle` |
