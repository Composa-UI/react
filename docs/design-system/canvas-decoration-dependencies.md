# Canvas Decoration Dependencies

Canvas decorations are editor affordances, not slide content. They should stay separate from regular layer rendering so the model can keep one source of truth for slide objects and a second overlay for editor state.

## Component Anchors

| Code primitive | Figma source | Current status |
| --- | --- | --- |
| `CanvasSelectionOverlay` | UI2 `Canvas decorations`, node `0:20495` | Implemented as harnessed overlay component |
| `TreeRow` | Figma UI3 `Sidebar row layer`, node `2711:212342` | Implemented with primary and secondary selection colors |
| `LayerTree` | Figma UI3 layer list composition | Implemented from slide/layer model |

## Direct UI2 Inventory

Direct metadata from UI2 `Canvas decorations`, node `0:20495`, found these published decoration symbols:

| Figma symbol | Node ID | Code status |
| --- | --- | --- |
| `Selection bounds / Standard` | `0:20496` | Partially mapped by `CanvasSelectionOverlay(type="standard")` |
| `Selection bounds / Frame` | `0:20673` | Partially mapped by `CanvasSelectionOverlay(type="standard")` |
| `Selection bounds / Text edit` | `0:21964` | Mapped by `CanvasSelectionOverlay(type="textEdit")` |
| `Selection bounds / Component` | `0:20674` | Partially mapped by `CanvasSelectionOverlay(type="component")` |
| `Selection bounds / Instance` | `0:20685` | Partially mapped by `CanvasSelectionOverlay(type="instance")` |
| `Selection bounds / Auto Layout frame / Vertical` | `1694:38` | Partially mapped by `CanvasSelectionOverlay(type="autoLayout", direction="vertical")` |
| `Selection bounds / Auto Layout frame / Horizontal` | `1694:77` | Partially mapped by `CanvasSelectionOverlay(type="autoLayout", direction="horizontal")` |
| `Selection bounds / Auto Layout frame / Vertical & Horizontal` | `1694:116` | Mapped by `CanvasSelectionOverlay(type="autoLayout", direction="both")` |
| `Selection bounds / Smart Selection Horizontal` | `644:0` | Mapped by `CanvasSelectionOverlay(type="smartSelectionHorizontal")` |
| `Selection bounds / Smart Selection Vertical` | `644:25` | Mapped by `CanvasSelectionOverlay(type="smartSelectionVertical")` |
| `Selection bounds / Smart Selection Grid` | `644:50` | Mapped by `CanvasSelectionOverlay(type="smartSelectionGrid")` |
| `Selection bounds / Image crop` | `645:49520` | Mapped by `CanvasSelectionOverlay(type="imageCrop")` |
| `Selection bounds / Vector` | `645:49514` | Mapped by `CanvasSelectionOverlay(type="vector")` |
| `Selection bounds / Slice` | `645:49512` | Mapped by `CanvasSelectionOverlay(type="slice")` |
| `Selection bounds / Reparenting` | `645:49510` | Mapped by `CanvasSelectionOverlay(type="reparenting")` |
| `Selection bounds / Cover` | `645:49539` | Mapped by `CanvasSelectionOverlay(type="cover")` |
| `Smart Selection / Marker` | `0:20511` | Mapped inside smart-selection overlay types |
| `Smart Selection / Space handle` | `0:20508` | Mapped inside smart-selection overlay types |

## Required State

Canvas decorations need more than the layer object itself:

| Dependency | Why it matters |
| --- | --- |
| Selected layer id | Determines primary selection outline and primary layer-row color |
| Parent/child relationship | Determines secondary selection color for selected frame children |
| Bounds in slide space | Drives overlay position, handles, and dimension badge |
| Canvas zoom and pan | Keeps stroke widths, handles, labels, and spacing cues visually stable |
| Layer type | Chooses standard, component, instance, or auto-layout selection tone |
| Auto-layout direction | Chooses horizontal or vertical direction cue |
| Measured dimensions | Feeds size badges and future resize affordances |
| Interaction mode | Keeps decoration hit targets separate from content hit targets |

## Implementation Notes

- `CanvasFrame` renders slide layers from the project model, then attaches `CanvasSelectionOverlay` only when that layer is selected.
- `LayerTree` derives synthetic child rows for auto-layout content until those children become first-class layer records.
- `TreeRow` supports `selected` and `secondarySelected`; this maps to Figma's distinction between the current layer and child/secondary selection color.
- Overlay components use `aria-hidden` because they are visual editor chrome. The selected layer remains the accessible interactive target.
- Future zoom support should scale decoration geometry through CSS variables instead of changing the layer model.

## Still Missing

- Zoom-aware handle and label sizing.
- Real child-layer ids for auto-layout contents.
- Spacing, padding, and gap measurement decorations.
- Multi-select outlines and mixed-property state propagation into the inspector.
