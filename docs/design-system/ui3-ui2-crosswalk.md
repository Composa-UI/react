# Figma UI3 / UI2 Crosswalk

This project uses Figma UI3 as the active design-system source of truth. UI2 is a historical reference layer.

## Libraries

| Role | File | Library key |
| --- | --- | --- |
| Primary | UI3: Figma's UI Kit (Community) | `lk-dee9f0a64468ca432655aeea169c4df2d6487d06b641f884035a053d2c3c5d671cca9202b5dde04576f9daaa2cca6ae9981ff40c3466df8b0589e17e761880ae` |
| Historical | UI2: Figma's Design System (Community) | `lk-842b421945829d2533bb3ad174da5d1aac12a182dbfa5f427bd87041a47014f0bf48245bdb7196f11908b7adace86bec1995879d4e71ad52b6be088b073d579b` |
| Fallback | UI2: Figma's Design System (Copy) | `lk-46de1dbbb9dea01b43941da5ae8e233299587b964e743bec241a3b4b2211b075e7577d1673b69049d877c9f6b45a131c7eac82ef4bdf599d27d555e18ad898d2` |

## Current Mapping

| Code component | Figma UI3 reference | UI2 reference |
| --- | --- | --- |
| `Workbench` | `@ slides.template` | none |
| `LeftSidebar` | `slides.sidebar.left` | panel system |
| `RightSidebar` | `slides.sidebar.right` | panel system |
| `SlideListItem` | `_slides.list.item` | none |
| `LayerRow` | `Sidebar row layer` | `Layer list row`, `Layer list row - SEL`, `READONLY`, `DISABLED` |
| `CanvasSelectionOverlay` | canvas selection behavior | `Canvas decorations`, `Selection bounds / Standard`, `Selection bounds / Auto Layout frame` |
| `Toolbelt` | `Slide-Toolbelt`, `_toolbelt.button.v2` | toolbar/button families |
| `SpeakerNotes` | `slides.speakerNotes` | none |

## Implementation Rule

Do not draw UI from screenshot memory. Build surfaces from:

1. Composa UI tokens in `design/tokens.css`.
2. Component names and keys in `design/component-map.json`.
3. Component contracts in `docs/design-system/component-contracts.md`.
4. The shared slide/frame/layer model in `src/app/store.js` and `src/app/model/initial-project.js`.

If a visual element appears in the rail, canvas, layer list, or inspector, it must correspond to the same model object.
