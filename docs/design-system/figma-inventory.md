# Figma Inventory Evidence

This file records direct Figma component-set counts used to drive the code harness.

## Figma UI3 Buttons

Source: `UI3: Figma's UI Kit (Community)`, file `4kilp0ShQiYsoUPJdleqEH`, page/node `2012:46721`.

Direct `use_figma` inventory found these component sets:

| Figma component set | Node ID | Variant count | Code primitive |
| --- | --- | ---: | --- |
| `Button` | `2012:48557` | 175 | `Button` |
| `Button icon` | `2324:46757` | 9 | `IconButton` |
| `Button icon toggle` | `2324:46776` | 20 | `ToggleButton` |
| `Button icon dialog toggle` | `2324:46817` | 19 | `DialogToggleButton` |
| `Button icon split` | `2324:46856` | 14 | `SplitButton` |

The harness renders every variant in these sets:

- `Button Variants`: 175 cells.
- `Icon Button Variants`: 62 cells.

## Figma UI3 Inputs

Source: `UI3: Figma's UI Kit (Community)`, file `4kilp0ShQiYsoUPJdleqEH`, page/node `2028:75376`.

Direct `use_figma` inventory found these component sets:

| Figma component set | Node ID | Variant count | Code primitive |
| --- | --- | ---: | --- |
| `Text input` | `2028:79255` | 35 | `InputField` |
| `Numeric input` | `2028:79190` | 13 | `NumericInput` |
| `Numeric input multi` | `2028:79619` | 5 | `NumericInputMulti` |
| `Color input` | `2028:79525` | 15 | `ColorInput` |
| `Combo input` | `2028:79408` | 16 | `ComboInput` |
| `_Chip variable` | `2028:79753` | 8 | `ChipVariable` |
| `_Chit 24` | `2028:79673` | 6 | `Chit` |
| `_Chit 48` | `2028:79770` | 5 | `Chit` |
| `_Chit input` | `2028:79847` | 4 | `ChitInput` |
| `_Combo input dropdown` | `2028:79874` | 3 | `ComboInputDropdown` |

The harness renders every variant in these sets:

- `Input Variants`: 110 cells.

## Figma UI3 Dropdown, Segmented Control, and Tabs

Sources: `UI3: Figma's UI Kit (Community)`, file `4kilp0ShQiYsoUPJdleqEH`, nodes `2028:36589`, `2015:20960`, and `2015:25519`.

Direct Figma inventory found these published symbols and component sets:

| Figma component set | Node ID | Variant count | Code primitive |
| --- | --- | ---: | --- |
| `Dropdown` | `2028:36589` | 16 | `Dropdown` |
| `Segmented control` | `2015:20960` | 20 | `SegmentedControl` |
| `Tabs` | `2015:27780` | 4 | `Tabs` |
| `_Tab` | `2015:27758` | 7 | `Tab` |

The harness renders every published variant in these sets:

- `Dropdown, Segmented, Tabs`: 47 cells.

## Figma UI3 Menu

Source: `UI3: Figma's UI Kit (Community)`, file `4kilp0ShQiYsoUPJdleqEH`, page/node `2028:86486`.

Direct `use_figma` inventory found these component sets and standalone components:

| Figma component set | Node ID | Variant count | Code primitive |
| --- | --- | ---: | --- |
| `Menu row/Simple` | `2327:96028` | 5 | `MenuRow` |
| `Menu row/Complex` | `2327:96049` | 30 | `MenuRow` |
| `Menu row/Checkmark` | `2327:96252` | 7 | `MenuRow` |
| `Menu row/Toggle` | `2327:96288` | 4 | `MenuRow` |
| `Menu row/Toolbar` | `2327:96311` | 3 | `MenuRow` |
| `Menu row/Heading` | `2327:96347` | 2 | `MenuRow` |
| `Menu row/Expand` | `2327:96333` | 4 | `MenuRow` |
| `Menu row/Footer` | `2327:96342` | 1 | `MenuRow` |
| `Menu multi-select` | `2327:96387` | 4 | `MenuMultiSelect` |
| `_Menu resizing` | `2327:96662` | 2 | `MenuRow` |
| `Menu row/Divider` | `2327:96331` | 1 | `MenuRow` |

The harness renders every published Menu variant currently inventoried:

- `Menu Variants`: 63 cells.

## Figma UI3 Variables

Direct `use_figma` inventory found local variable collections in Figma UI3:

| Collection | Modes | Variable count | Code status |
| --- | --- | ---: | --- |
| `Colors` | Light, Dark, FigJam-Light, FigJam-Dark, DevMode-Light, DevMode-Dark, Slides-Light, Slides-Dark | 946 | Exact resolved app-core aliases in `design/generated/composa-core-tokens.css` |
| `Sizing` | Default | 12 | Exact resolved app-core aliases in `design/generated/composa-core-tokens.css` |
| `Typography` | Mode 1 | 57 | Exact resolved app-core aliases in `design/generated/composa-core-tokens.css` |

Full raw variable archive import is not complete yet. The current code now has exact resolved values for the app-consumed core token set in `design/generated/composa-core-tokens.css`, app-facing aliases in `design/tokens.css`, and machine-readable alias metadata in `design/generated/composa-core-tokens.json`. The app keeps `--composa-color-bg-brand` on the resolved `Slides-Light` value because this product is Figma Slides-inspired; canonical Figma UI3 Light brand remains available as `--figma-composa-color-bg-brand`.

Machine-readable export status lives in `design/generated/composa-variable-export-status.json`.

Open coverage gaps: full Figma UI3 variable value export/import, exact UI2 canvas-decoration variant inventory, exact visual QA for Menu against screenshots, and the lost-annotation issues around icon sizing and tab layout.

## UI2 Canvas Decorations

Source: `UI2: Figma's Design System (Community)`, file `uKsUypDbWE5Wbxmk7koRa3`, node `0:20495`.

Direct metadata found standard, frame, text-edit, component, instance, auto-layout vertical/horizontal/both, smart-selection, crop, vector, slice, reparenting, cover, marker, and space-handle symbols. Canvas decorations are tracked separately from regular components because they depend on editor state: selected layer bounds, zoom, pan, layer type, parent/child selection, and auto-layout measurements. The current code anchor is `CanvasSelectionOverlay`; dependency details are documented in `docs/design-system/canvas-decoration-dependencies.md`.
