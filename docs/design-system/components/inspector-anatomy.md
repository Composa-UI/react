# Inspector anatomy

Inspector modules are dense right-rail surfaces for editing selected content. Build them from reusable sections first, then assemble templates only when order, scrolling, and cross-section behavior matter.

## Classification

| Level | Use |
| --- | --- |
| Base component | Single reusable control such as `Dropdown`, `InputField`, `IconButton`, `SegmentedControl`, `ControlGroup`, or `AlignmentPicker`. |
| Module | A reusable inspector section such as `PositionSection`, `LayoutSection`, `FillSection`, `StrokeSection`, or `ExportSection`. |
| Template | A complete right rail such as `EditingInspector`, where section order, selected-object state, and scrolling are part of the contract. |

## Structure

The editing inspector uses this order:

1. `InspectorHeader`
2. `LayerHeader`
3. `PositionSection`
4. `LayoutSection`
5. Value-backed sections such as `FillSection`, `StrokeSection`, `SelectionColorsSection`, `LayoutGuideSection`, and `ExportSection`

The template owns the rail width and scroll container. Sections should remain width-fluid so they can be reused in documentation, panel shells, and future inspector variants.

## Spacing

Inspector sections share a tokenized inset contract:

- Section headers, value rows, and sub-control rows use `--composa-inspector-inset-start` and `--composa-inspector-inset-end` for left/right spacing.
- Section bodies use `--composa-inspector-section-padding-end` for bottom breathing room before the divider.
- Do not add mode-specific bottom padding shortcuts. A layout section in selection mode, a value section with rows, and a stroke controls subsection should all resolve to the same bottom spacing rhythm unless a documented state explicitly overrides it.

## Collapsed Values

Value-backed sections follow one lifecycle:

- Empty sections render the no-value collapsed state when adding is supported.
- Empty sections can also opt out of rendering entirely when the product surface should not show them.
- Collapsed sections with values may summarize those values in the header.
- Removing the last value collapses the section back to its empty state.

## Section State Matrix

The inspector should make state differences explicit instead of hiding them in one-off section branches.

| Section | Empty state | Value state | Add/remove behavior |
| --- | --- | --- | --- |
| Fill | Collapsed header can add the first fill. | Rows show color, opacity, visibility, style, and remove actions. | Plus creates one fill when empty or already expanded; remove collapses after the last value. |
| Stroke | Collapsed header can add the first stroke. | Rows show color, opacity, visibility, remove, and optional stroke controls. | Plus creates one stroke; stroke controls appear when a stroke exists. |
| Effects | Collapsed header can add the first effect. | Rows show a leading dialog trigger, effect type dropdown, visibility, and remove actions. | Leading trigger opens an effect dialog; effect type dropdown opens effect choices. |
| Selection colors | Hidden or collapsed when no values are meaningful. | Header may summarize colors; expanded rows show named color targets. | Overflow summary expands all colors. |
| Layout guide | Collapsed header can add the first guide. | Rows show guide type icon, value dropdown, visibility, and remove actions. | Leading trigger opens guide settings; value dropdown describes grid/column/row count. |
| Export | Collapsed header can add the first export setting. | Rows show scale combo input, format dropdown, more/settings, remove, export button, and preview disclosure. | Plus creates one export setting; more opens the export settings dialog. |

## Layout Section Matrix

`LayoutSection` is the most dynamic inspector module. Keep these state gates documented while implementation evolves:

| Selection state | Flow row | Dimensions | Resizing | Spacing / Gap | Clip content |
| --- | --- | --- | --- | --- | --- |
| Text-like selection | Hidden | Shown | Shown when the selected object supports text sizing. | Hidden | Hidden |
| Shape-like selection | Hidden | Shown | Hidden | Hidden | Hidden |
| Frame with children | Shown | Shown | Hidden | Hidden unless layout mode requires it. | Shown only when clipping applies. |
| Auto layout | Shown | Shown | Hidden | Shown as `Gap`. | Shown. |
| True multi-selection | Shown when any selected item supports flow. | Shown with `Mixed` values when needed. | Hidden. | Shown when multiple selected items expose spacing. | Shown when any selected item supports clipping. |

If the product rule is not known yet, document the uncertainty in the section docs or story notes instead of hardcoding the first observed case.

## Hover Actions

Actions that edit values are shown only where the user is working:

- Row actions reveal on row hover or keyboard focus.
- Style actions use the tooltip text `Apply styles and variables`.
- Selection target actions use contextual labels such as `Select 2 using this color`.
- Static section titles do not get tooltips.
- Eye actions hide or show the value they belong to. They should visually disable only the affected value segment and switch to the hidden icon state, not mute unrelated row controls.
- Dialog triggers show active state while their dialog is open and return to rest when the dialog closes.
- Dropdown triggers show active state while their option menu is open and update their visible value after selection.

## Primitive Ownership

Inspector sections should request primitive behavior rather than restyling it locally:

- `Dropdown` owns value/chevron alignment and simple single-value menus.
- `MenuRow` owns selection rows, including toolbar rows with a reserved checkmark slot plus a leading icon.
- `ControlGroup` owns split spacing between grouped icon controls.
- `OverlayHost` belongs around inspector templates and app surfaces that need overflow room.
- `OverlayPortal` is the default route for tooltips, dropdown menus, inspector menus, and side-dialog requests inside scrollable rails.
- Inspector dialogs are floating windows. They should launch through `OverlayPortal`, capture their initial left-of-inspector position, and not follow section scroll while open.
- `OverlayLayer` owns the visual wrapper once a surface has been placed. Collision-aware placement and app-level overlay routing are documented in [`overlay-layer.md`](./overlay-layer.md).

## Overlay QA Cases

Every new transient inspector surface should be checked in an overflow-friendly template story:

- right-edge tooltip;
- left-edge tooltip;
- dropdown near the bottom of the rail;
- dropdown near the right edge;
- dialog opened from a section, then inspector scrolled;
- outside click closes menu/dialog and clears trigger active state.

## Storybook Grouping

- Overlay primitives live under `Components / Base / Overlays`: `OverlayLayer`, `OverlayHost`, `OverlayPortal`, `Tooltip`, and `Dialog`.
- Overlay consumers stay in their own primitive groups. `Dropdown`, `Menu`, and `MenuRow` remain Base controls even when they render menus through `OverlayPortal`.
- Inspector sections stay under `Components / Modules / Inspector`; the full rail remains a template under `Templates / Inspector`.
