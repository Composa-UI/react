# EditorShell template

`EditorShell` is the top-level editor layout template for Composa. It is a
**template** in the layer model (it owns order and layout), not a base component
and not an app screen. `SlidesEditorTemplate` is a thin preset of it.

## Ownership boundary

This is the contract the future editor app repo codes against.

- **This repo (design system) owns:** the four-region CSS grid, the responsive
  behavior of those regions, the floating-toolbar placement seam, and the typed
  slot/seam interfaces.
- **The app repo owns:** the document/data model, selection, undo/redo,
  persistence, the canvas engine, and every region's real internals (the
  navigator tree, the inspector sections, the toolbar actions).

`EditorShell` is **purely presentational and controlled**. It holds no selection
state and no document model. It only renders the slots it is given into the
right places and manages layout. If a behavior needs document truth, it belongs
in the app repo, not here.

## Anatomy

Four regions, left to right, as a single grid row:

```
┌──────┬───────────┬──────────────────────────┬────────────┐
│ rail │ navigator │          canvas          │ inspector  │
│      │           │   ┌──────────────────┐   │            │
│      │           │   │ canvasToolbar    │   │            │  ← floating overlay,
│      │           │   │ (floating)       │   │            │    inside canvas
│      │           │   └──────────────────┘   │            │
└──────┴───────────┴──────────────────────────┴────────────┘
   1         2                  3                    4
```

- There is **no** top toolbar row, **no** status bar, and **no** timeline. These
  are deliberately omitted.
- The editor toolbar is **not** a shell row. The canvas region is wrapped in
  `OverlayHost`; the `canvasToolbar` slot is rendered through `OverlayPortal`,
  positioned within the canvas, so it floats over canvas content. By default it
  anchors **bottom-center** of the canvas (Figma/standard-editor convention): the
  portal targets a zero-size anchor pinned to the canvas bottom edge and the
  toolbar hangs above it.

### Slots (props)

| Prop | Region | Notes |
| --- | --- | --- |
| `navigationRail` | 1 | Left rail, e.g. `AppNavigationRail`. |
| `navigator` | 2 | Pages / slides / layers panel. |
| `canvas` | 3 | Center canvas; the only region that shrinks. |
| `inspector` | 4 | Right property inspector. |
| `canvasToolbar` | inside 3 | Floating overlay anchored in the canvas. |

`canvasToolbarPlacement` / `canvasToolbarAlign` control how the floating toolbar
hangs off its bottom-center anchor. The default `placement="top"` floats it above
the bottom anchor (i.e. bottom-center); `align` shifts it horizontally.

## Responsive contract

The grid columns are:

```
[ rail ] [ navigator ] [ minmax(canvas-min, 1fr) ] [ inspector ]
```

The rail, navigator, and inspector are **fixed-width tracks** — they do not wrap
to a new row at normal desktop/tablet widths. The center canvas is the single
`minmax(min, 1fr)` track, so it is the only region that shrinks as the viewport
narrows. Region widths are driven by tokens
(`--composa-editor-shell-*-width`), so the app repo can re-theme widths without
editing the template markup.

## Resizable sides (opt-in)

`resizableSides` makes the navigator (left) and inspector (right) columns
user-resizable, like a real editor. Pass `true` for both sides or
`{ left, right }` to opt in per side; it is `false` by default. Each enabled
side renders a draggable handle pinned to its boundary edge (the navigator's
right edge, the inspector's left edge):

- The handle is a `role="separator"` element with `aria-orientation="vertical"`
  and live `aria-valuenow / aria-valuemin / aria-valuemax`.
- **Pointer**: drag the hairline to resize, with pointer capture.
- **Keyboard**: `Left` / `Right` arrows nudge the boundary (8px, or 24px with
  `Shift`); `Home` / `End` jump to the min / max width.
- Widths can be controlled (`navigatorWidth` / `inspectorWidth` +
  `onNavigatorWidthChange` / `onInspectorWidthChange`) or uncontrolled
  (`defaultNavigatorWidth` / `defaultInspectorWidth`), bounded by
  `min*Width` / `max*Width` (defaults 200 / 420).

The resizable side writes its current width into the matching
`--composa-editor-shell-*-width` custom property on the shell, so the grid keeps
the **no-wrap rule** intact and the center canvas absorbs the difference — the
side tracks never wrap and the canvas remains the only flexible track.

## Typed seam

The seam interfaces (in `src/react/index.d.ts`) are intentionally thin and kept
**Tree-compatible** so a navigator built on the `Tree` primitive can consume
them directly:

- `PageItem { id; name; thumbnail?; selected? }`
- `SlideItem { id; name; thumbnail?; selected? }`
- `LayerNode { id; name; type; icon?; depth?; children?; visible?; locked?; selected? }`
- `EditorShellProps`, `SlidesEditorTemplateProps`

`LayerNode` is the seam where **future motion metadata** will live. Timing and
keyframe fields (e.g. `keyframes`, `timing`, `duration`, `easing`) will be added
to `LayerNode` in a later iteration. Keep additions additive and optional so
existing app-repo code continues to compile.

## SlidesEditorTemplate

A thin preset of `EditorShell` with slides-oriented defaults. It supplies a
**present-mode toggle placeholder** (`presentMode` / `onPresentModeChange`) as
the default floating canvas toolbar and forwards all slots to `EditorShell`. It
owns no document model; real present mode is the app repo's responsibility.

## Open follow-ups

- Real navigator, inspector, and toolbar internals are owned by other lanes and
  are placeholders here.
- `LayerNode` motion/timing fields are reserved but not yet defined.
- Collision-aware placement for the floating toolbar inherits the existing
  overlay placement architecture (`OverlayHost` / `OverlayPortal` /
  `OverlayLayer`); full app-level collision handling remains documented
  follow-up work in `docs/design-system/components/overlay-layer.md`.
