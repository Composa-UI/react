# Composa UI Component Contracts

The app shell is a small Figma UI3-aligned workbench rather than a screenshot copy. These contracts name what each surface owns and how it connects to the shared slide model.

## Rule

Every visible slide, layer row, canvas object, and inspector property must resolve to the same model path:

`project.slides[n].layers[n]`

## Components

| Code component | DOM hook | Figma UI3 / UI2 anchor | State source | Required semantics |
| --- | --- | --- | --- | --- |
| `WorkbenchShell` | `.composa-workbench` | `slides.template` | whole project | app-level grid only |
| `LeftSidebar` | `.composa-sidebar-panel` | `slides.sidebar.left` | slide collection and active slide | labelled complementary panel |
| `SlideRail` | `.composa-slide-rail` | `_slides.list.item`, thumbnail item | `state.slides`, `state.activeSlideId` | `role=listbox`, items use `role=option` and `aria-selected` |
| `LayerTreePanel` | `.composa-layer-tree-panel` | Figma UI3 sidebar row, UI2 `Layer list row` | `activeSlide().layers`, `state.selectedLayerId` | `role=tree`, rows use `role=treeitem` and `aria-selected` |
| `CanvasWorkspace` | `.composa-canvas-workspace` | canvas viewport | active slide | canvas region wraps the editable frame |
| `CanvasViewport` | `.composa-canvas-viewport` | Figma canvas, role application | active slide layers | canvas layers use `data-layer-id`; selection mirrors layer tree |
| `CanvasSelectionOverlay` | `.canvas-selection-overlay` | UI2 canvas decorations, node `0:20495` | selected layer bounds, type, layout mode | non-interactive editor overlay for bounds, handles, dimensions, and auto-layout direction cues |
| `FloatingToolbar` | `.composa-floating-toolbar` | `Slide-Toolbelt`, `_toolbelt.button.v2` | `state.activeTool` | `role=toolbar`, buttons use `aria-pressed` |
| `RightSidebar` | `.composa-inspector` | `slides.sidebar.right` | selected layer and active slide | labelled inspector panel |
| `InspectorTabs` | `.composa-tab-group` | Figma UI3 tabs | current inspector mode | `role=tablist`, tabs point to tab panels with `aria-controls` |
| `Header` | `.composa-header` | Figma UI3 layer header and property header | section title and section actions | space-between title/action auto-layout |
| `HeaderActions` | `.composa-header-actions` | icon group inside headers | section actions | content-hugging action group |
| `Menu` | `.composa-menu` | Figma UI3 menu, node `2028:86486` | command/action list | `role=menu`, rows use `role=menuitem` |
| `MenuRow` | `.composa-menu-row` | Figma UI3 menu row variants, node `2028:86486` | command/action row state | simple, complex, checkmark, toggle, toolbar, heading, divider, expand, and footer rows |
| `MenuMultiSelect` | `.composa-menu-multi-select` | Figma UI3 menu multi-select, node `2028:86486` | multi-select command group | default, label-only, avatars, and mixed-icons compositions |
| `MenuExample` | `.composa-menu-example` | Figma UI3 menu in-product examples, node `2028:86486` | composed command/menu surface | in-product, slides-toolbar, property-dropdown, and context-menu examples |
| `MenuButton` | `.composa-menu-button` | Figma UI3 menu trigger | command surface | compact icon trigger with dropdown affordance |
| `SplitButton` | `.composa-split-control` | Figma UI3 button icon split, node `2012:46721` | primary action plus menu action | adjacent action/menu targets |
| `ToggleButton` | `.composa-toggle-button` | Figma UI3 button toggle, node `2012:46721` | boolean control state | `aria-pressed` |
| `InputField` | `.composa-input-field` | Figma UI3 input, node `2028:75376` | property value | 24px dense input, supports mixed placeholder |
| `NumericInput` | `.composa-input-field.composa-input-numeric` | Figma UI3 numeric input, node `2028:79190` | numeric property value | var icon, var pill, dropdown, disabled, empty, hover, and focused states |
| `NumericInputMulti` | `.composa-numeric-multi` | Figma UI3 numeric input multi, node `2028:79619` | paired numeric property value | default, focused, empty, disabled, and partial-disabled states |
| `ColorInput` | `.composa-color-input` | Figma UI3 color input, node `2028:79525` | color-like property value | fill, opacity, image, gradient, and variable input types |
| `ComboInput` | `.composa-combo-input` | Figma UI3 combo input, node `2028:79408` | split property input | input value plus embedded `_Combo input dropdown` chevron segment |
| `ChitInput` | `.composa-chit-input` | Figma UI3 chit input, node `2028:79847` | compact token value | focused state and optional close button |
| `Dropdown` | `.composa-dropdown` | Figma UI3 dropdown, node `2028:36589` | selected option | menu-trigger semantics |
| `Switch` | `.composa-switch` | Figma UI3 switch, node `2015:24697` | boolean setting | `role=switch`, checked and disabled states |
| `Radio` | `.composa-radio` | Figma UI3 radio, node `2015:20365` | single option selection | `role=radio`, checked and disabled states |
| `Checkbox` | `.composa-checkbox` | Figma UI3 checkbox, node `2012:55461` | binary or mixed option state | `role=checkbox`, supports unchecked, checked, and mixed |
| `Tooltip` | `.composa-tooltip` | Figma UI3 tooltip, node `2015:32842` | contextual help label | `role=tooltip`, placement and tone variants |
| `Dialog` | `.composa-dialog` | Figma UI3 modal/dialog, node `2327:122027` | modal command flow | `role=dialog`, labelled title, action footer |
| `SegmentedControl` | `.composa-segmented-control` | Figma UI3 segmented control, node `2015:20960` | mutually-exclusive compact choice | icon or label variants, tab counts 02-06, disabled state |
| `SegmentedPicker` | `.composa-segmented-picker` | Figma UI3 segmented control, node `2015:20960` | compact mode selection | tablist semantics for mutually exclusive views |
| `Tabs` | `.composa-tabs` | Figma UI3 tabs, node `2015:25519` | current editor/inspector mode | tabstrip composition for 1-4 tabs |
| `Tab` | `.composa-tab` | Figma UI3 `_Tab`, node `2015:27758` | single tab state | selected, single-tab, default, focused, and hover states |
| `TreeRow` | `.composa-tree-row` | Figma UI3 `Sidebar row layer`, node `2711:212342` | layer or synthetic nested child row | 32px row, disclosure slot, layer icon, primary selected and secondary selected states |
| `PropertySection` | `.composa-property-section` | inspector property rows | selected layer | dense 11px property groups |

## Code Location

The app is now assembled from the React app entry and the shared component library:

- `src/design-system/figma-library.js`: Figma UI3/UI2 registry and component mapping.
- `src/react/factory.js`: React implementation of shared primitives such as `Button`, `IconButton`, `Tabs`, `Header`, and `CanvasSelectionOverlay`.
- `design/component-api.json`: renderer-neutral prop and variant contract for React, Code Connect, and future library extraction.
- `src/app/react-main.js`: React workbench composition such as `WorkbenchShell`, `SlideRail`, `LayerTree`, `CanvasFrame`, `FloatingToolbar`, and `Inspector`.
- `src/app/store.js`: shared project/slide/layer state and actions.

Run `node tools/verify-design-system-contracts.js` after changing variant specs, `design/component-api.json`, or `src/design-system/variant-manifest.js`. It verifies that the prop contract, harness expectations, and exported variant arrays agree.

## Current Interaction Loop

1. Selecting a slide updates `state.activeSlideId`, then re-renders the rail, layer tree, canvas, notes, and inspector.
2. Selecting a layer updates `state.selectedLayerId`, then selection appears in the layer tree, canvas outline, fill row, frame row, and auto-layout controls.
3. Choosing the text tool creates a real text layer in the active slide, not a detached canvas decoration.
4. Wrapping a layer in auto layout replaces that layer model with an `autoLayout` layer, so rail thumbnail, layer tree, canvas, and inspector all change together.

## Overlay Dependencies

Canvas decorations are editor affordances, not regular content components. They depend on model facts that ordinary layer rendering does not need: selected layer bounds, selection type (`standard`, `component`, `instance`, `autoLayout`), parent/child relationship for secondary selection, measured width/height, spacing measurements, and auto-layout direction. Until children become first-class layer objects, auto-layout chips render as synthetic nested rows in the layer list.

## Accessibility Notes

The Figma references expose a workbench pattern with a canvas application area, tree rows, tab groups, and toolbar actions. This prototype follows those roles but improves mismatched selection semantics by using `aria-selected` for slide and layer selection instead of `aria-current`.

## Token Status

The codebase has imported the Figma UI3 core app-consumed token subset into `design/generated/composa-core-tokens.css`. That generated file includes a `[data-composa-mode="dark"]` mode, so a light/dark toggle can be built on top of the existing token system.

This is not yet a claim that all 1,015 Figma UI3 variables are production semantic tokens. Raw, unresolved variable chunks are not tracked in the repo. Product and library code should consume stable semantic aliases from `design/tokens.css`.
