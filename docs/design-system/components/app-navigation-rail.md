# App navigation rail

`AppNavigationRail` is the compact app-level navigation module for editor surfaces. It puts a replaceable app mark at the top and stacks vertical destination items beneath it.

## Classification

| Layer | Component | Responsibility |
| --- | --- | --- |
| Base/support | `VerticalCell` | Generic vertical content stack used for icon-over-label anatomy. |
| Base/support | `ComposaAppIcon` | Replaceable product mark slot. |
| Base/support | `NavigationRailItem` | Destination wrapper that composes a 32px `IconButton` toggle with a label below it. |
| Module | `AppNavigationRail` | App-level navigation stack, selected destination contract, and app mark placement. |
| Template | Editor shell | Later composes navigation rail, navigator panel, canvas, toolbar, and inspector. |

## Anatomy

Built to Figma node `103-10421` (Toolbar - Navigation Bar). The rail is a 56px-wide column: a 24px app mark in a 5px-radius "main menu" button, a 16px hairline separator, then the destination stack.

1. **App mark.** A button at the top of the rail (24px mark, 4px padding, 5px radius). Pass `appIcon` when the product has a custom mark.
2. **Brand separator.** A 16px-wide hairline below the app mark divides the mark from the destinations.
3. **Destination stack.** A vertical list of `NavigationRailItem` controls.
4. **Item content.** Each item uses `VerticalCell` for the icon-button-over-label stack (2px icon-to-label gap) so rail layout does not fork the content-stack primitive.
5. **Toggle surface.** The selectable surface is the `IconButton size="xlarge"` primitive: a 32px container with a 24px glyph and a 5px radius. The label (9px, medium) sits below the button, not inside it.
6. **Selected state.** Only the icon container tints, with `--composa-color-bg-selected` (#e5f4ff); the label stays full-strength text. The whole cell is never filled.

## Behavior

- `AppNavigationRail` supports controlled `value` and uncontrolled `defaultValue`.
- `onValueChange` receives the selected item value, item object, and click event.
- `NavigationRailItem` passes `aria-pressed` to its nested icon button because the icon surface behaves like a destination toggle.
- The item label is always rendered below the icon; use concise labels that fit the rail width.

## Guidance

- Keep app-level navigation separate from the navigator panel. The rail switches product destinations; the navigator panel shows the content for the selected destination.
- Use `NavigationRailItem` only for vertical rail destinations. Use `IconButton` for icon-only actions and `Tabs` for horizontal mode switching.
- The custom app mark should be passed through `appIcon`; do not bake product-specific logo paths into the rail module.
