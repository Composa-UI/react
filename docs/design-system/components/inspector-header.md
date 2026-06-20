# InspectorHeader

InspectorHeader is the right-panel header section for inspector-style surfaces.

Use it at the top of a right rail before property sections. It is a composed section, not a base primitive: the section owns the row arrangement, while Avatar, MultiplayerControl, SplitButton, Button, Tabs, and Dropdown retain their own component contracts.

## Anatomy

| Part | Component |
| --- | --- |
| Collaboration trigger | `MultiplayerControl` with nested `Avatar` |
| Present action | `SplitButton` |
| Share action | `Button` |
| Inspector mode | `Tabs` with `divider={false}` |
| Zoom trigger | `Dropdown` with `stroke={false}` |

## Guidelines

- Keep the section dense enough for a right panel. The reference width is 240px.
- Use `MultiplayerControl` for collaborator/avatar behavior. Do not duplicate avatar styling inside the section.
- Use `Tabs divider={false}` when the tabs live inside this header. The row already provides the surrounding structure.
- Use `Dropdown stroke={false}` for the zoom trigger in this header when the control should read as quiet text plus chevron.
- Keep action icons and dropdown chevrons on `--composa-color-text`; muted icon colors create visible mismatch next to text controls.

## Accessibility

- `InspectorHeader` renders a labeled section.
- The present split button exposes separate buttons for the primary action and the menu action.
- Tabs use native tab roles through the shared `Tabs` component.
- The collaborator trigger exposes an accessible label through `MultiplayerControl`.

## Implementation

| Surface | Reference |
| --- | --- |
| React | `src/react/factory.js` (`function InspectorHeader`) |
| Storybook | `Composa UI/Components/Modules/Inspector/InspectorHeader` |
