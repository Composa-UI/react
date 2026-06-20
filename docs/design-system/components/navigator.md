# Navigator sidebars

The navigator sidebars are the left-rail content panels for editor surfaces. Two
modules ship today, built to the UI3 `design.sidebar.left` anatomy:

- `EditorNavigator` — the design-editor sidebar (pages over layers).
- `SlidesNavigator` — the slides bar (numbered thumbnails), self-contained for
  reuse in a future video editor.

They sit beside `AppNavigationRail`: the rail switches product destinations, the
navigator shows the content for the selected destination.

## Figma references

| Surface | File | Node |
| --- | --- | --- |
| Editor sidebar | `4kilp0ShQiYsoUPJdleqEH` (UI3 Figma's UI Kit Community) | `1027347-6458` |
| Slides bar | `rMq1M35u1iyKB2QaQMipZb` (Figma to Video) | `98-12` |

## Classification

| Layer | Component | Responsibility |
| --- | --- | --- |
| Base/support | `NavigatorHeader` | File-title header: bold title + disclosure over a subdued project name, with a trailing sidebar-toggle action. Shared by both modules (Figma `Sidebar left/Header`). |
| Base/support | `CollapseHeader` | Collapsible section header (disclosure chevron + label + trailing action) for the page/layer lists (Figma `Collapse.Header`). |
| Base/support | `SlideThumb` | Numbered slide preview row: an index gutter plus a 16:9 thumbnail surface (Figma `Button - Slide`). |
| Base/support | `SlideList` | Vertical stack of `SlideThumb` rows with controlled/uncontrolled selection. |
| Module | `EditorNavigator` | Header over a draggable split of a flat page `Tree` and a nested layer `Tree`. |
| Module | `SlidesNavigator` | Header, create toolbar, and a `SlideList`. |

## EditorNavigator anatomy

1. **Header.** A `NavigatorHeader` with the file title, project name, and a
   sidebar-toggle action.
2. **Page list (top).** A `CollapseHeader` labelled "Pages" with an add (`+`)
   action, over a flat `Tree`. Pages reuse `Tree` **without nesting** — selection
   states only. The page tree variant hides the `Tree` kind glyph and disclosure
   gutter so rows read as the flat Figma "Sidebar row simple" rows (label only).
   Put any per-page emoji in the page label.
3. **Split divider.** A draggable `role="separator"` between the lists. It resizes
   the page region; the layer region takes the remaining height and scrolls.
4. **Layer list (bottom).** A `CollapseHeader` labelled "Layers" over a nested
   `Tree`. Layers reuse `Tree` as-is (nesting, disclosure, kind glyphs, selection
   and secondary selection). The layer tree is **bottom-aligned**: when the tree
   is shorter than its band the rows settle against the bottom edge (the tree
   child carries `margin-top: auto`); when it overflows, the auto margin
   collapses and the band scrolls normally from the top.

### Fit, don't clip

Each list band (pages and layers) is a flex column where only its
`CollapseHeader` holds its size and the scroll body (`.composa-navigator-list-scroll`)
flexes with `min-height: 0` and `overflow-y: auto`. This keeps a long page or
layer `Tree` scrolling **inside** its band rather than overflowing past the
fixed page-region height and being clipped by the navigator's `overflow: hidden`.

### Reusing Tree

The layer list is the existing `Tree` with no changes — it already supports
nesting, expand/collapse, selection, and secondary selection. The page list is
the same `Tree` with the `.composa-navigator-page-tree` class, which suppresses
the kind glyph and disclosure spacer. No new tree primitive was introduced for
pages, per the "reuse Tree" rule.

### Why no new page primitive

A flat `Tree` expresses the page row from the Figma design (a selectable label
row). The page rows in the reference are label-only with a hover/selected pill —
exactly what a `Tree` row renders once the leading glyph is hidden. So pages do
not justify a new `PageRow` primitive.

## SlidesNavigator anatomy

1. **Header.** A `NavigatorHeader` (optional via `showHeader`, hidden when the
   bar is embedded in another shell such as a video editor).
2. **Toolbar.** A full-width "New slide" `Button` with a trailing chevron and an
   "add blank slide" `IconButton`.
3. **Slide list.** A `SlideList` of `SlideThumb` rows. Each thumb shows a 1-based
   index and a 16:9 preview surface that accepts an image URL or a custom preview
   node, with a blank placeholder otherwise.

### Why SlideThumb is a new primitive

`SlideThumb` is the one genuinely new primitive. Neither `Tree` nor the simple
row primitives express a slide preview: the row needs an index gutter **plus** a
16:9 thumbnail surface that can hold an image or a live preview. `Tree` rows are a
disclosure + glyph + text label only, so a thumbnail cannot be expressed by
reusing it. `SlideThumb` is presentational with controlled selection, and
`SlideList` mirrors the `Tree` selection contract (`selectedId` /
`defaultSelectedId` / `onSelect`) so a future video editor can reuse the strip.

## Behavior

- All selection is controlled (`selectedPageId`, `selectedLayerId`,
  `selectedSlideId`) or uncontrolled via the matching `default*` props.
- `EditorNavigator` owns only UI state: the page-region split height. Use
  `pageHeight` / `onPageHeightChange` to control it, or `defaultPageHeight` for
  internal state. Document truth (pages, layers, order) stays with the app.
- The split divider is accessible: `role="separator"`, `aria-orientation`,
  `aria-valuenow/min/max`, focusable, and keyboard-resizable with
  Arrow keys (Shift for a larger step) and Home/End for min/max. Pointer drag uses
  pointer capture and clamps to `minPageHeight` / `maxPageHeight`.
- `SlidesNavigator` is self-contained and presentational; it raises `onNewSlide`,
  `onAddSlide`, and `onSlideSelect` for the host to handle.

## Tokens

Navigator-specific component tokens live in `design/tokens.css` under the
`--composa-navigator-*` and `--composa-slide-thumb-*` prefixes (width, header and
section insets, divider hit area, page min-height, and the slide thumbnail
gutter / aspect ratio / selection tints). The slide selection tints
(`#e5f4ff`, `#f2f9ff`) are taken directly from the Figma slides node.

## Guidance

- Keep the navigator separate from `AppNavigationRail`. The rail switches product
  destinations; the navigator shows content for the selected destination.
- Pass slide artwork into `SlideThumb` via `thumbnail` (image URL or preview
  node); do not bake product-specific previews into the primitive.
- Use the page list for selection-only flat lists. If a future page row needs
  drag reordering or inline thumbnails that `Tree` cannot express, introduce a
  dedicated `PageRow` then and document the reason here.

## Deferred / open

- Drag-reorder of pages and slides is not implemented; rows are selection-only.
- The split divider resizes the page region only (single divider). A multi-pane
  resizable navigator is out of scope.
- The header sidebar-toggle uses the built-in `panelLeft` glyph
  (Material Symbols `left_panel_open`, Apache-2.0) added to `builtin-glyphs.js`.
