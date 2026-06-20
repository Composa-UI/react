# LayerHeader

LayerHeader is a compact section header for layer or object context inside an editor panel.

It renders a dropdown-like label on the leading side and a fixed set of 24px action buttons on the trailing side. Use it when the panel needs to show the selected layer type plus quick actions without introducing a full toolbar.

LayerHeader follows the heading-row sizing rule: the row is 40px tall, with 16px leading padding and 8px trailing padding.

## Anatomy

| Part | Component |
| --- | --- |
| Layer type label | `LayerHeaderDropdown` |
| Disclosure chevron | Built-in `chevronDown` glyph |
| Action group | `IconButton` items |

## Guidelines

- Keep the label short enough to fit in a 240px panel. Long labels should truncate.
- Keep the row at 40px. The inner controls remain 24px.
- Use `actions` for trailing icon buttons rather than adding custom markup.
- Keep icons at a 24px button box with the component's quiet hover/focus treatment.
- Use this as a section-level component. If the header needs multiple rows, use a larger module such as `InspectorHeader` or a future template.

## Implementation

| Surface | Reference |
| --- | --- |
| React | `src/react/factory.js` (`function LayerHeader`) |
| Storybook | `Composa UI/Components/Modules/Inspector/LayerHeader` |
