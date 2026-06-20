# Composa component builder workflow

Use this workflow when building or refining Composa React components, inspector modules, templates, Storybook stories, or product screens from the component system.

## Working model

Composa is built out of building blocks that build up to each other. The conceptual framing lives in the Storybook Overview (`src/react/stories/_overview.mdx`); this table is the operational classification you use while building.

| Layer | Meaning | Examples |
| --- | --- | --- |
| Base components | Small reusable controls with stable behavior. | `Dropdown`, `MenuRow`, `ControlGroup`, `InputField`, `Tooltip`, `OverlayLayer` |
| Modules | Base components combined to perform a specific function — a meaningful product region. | `InspectorHeader`, `LayerHeader`, `LayoutSection`, `FillSection` |
| Templates | Complete product patterns that own order, scroll, and local UI state. | `EditingInspector` |
| App screens | Product-specific arrangements connected to app state and canvas behavior. | Future editor workbench |

Fix repeated behavior at the lowest correct layer. If three inspector sections need the same dropdown, menu, tooltip, or grouped-control behavior, update the primitive first and let sections consume it.

## Before editing

1. Check branch and dirty state.
2. Read `AGENTS.md`.
3. Search the repo for existing component, story, style, and docs patterns with `rg`.
4. Classify the target as base component, module, template, or app screen.
5. If the request comes from Figma, record the node id, anatomy, variant axes, icon names, spacing, states, and interaction behavior before coding.

## Primitive ownership rules

- `Dropdown` owns trigger anatomy: leading slot, value slot, chevron slot, active state, and simple single-value option menus.
- `MenuRow type="toolbar"` is the menu row for choices that need both a reserved checkmark slot and a leading icon slot.
- `ControlGroup` owns grouped icon-button separation. Do not use `SegmentedControl` unless one option is the selected value.
- `OverlayHost`, `OverlayPortal`, and `OverlayLayer` own transient surface placement. Tooltips, dropdown menus, inspector menus, and inspector dialogs should not add section-local z-index or positioning hacks.
- `Tooltip` labels replace native `title` attributes.
- `IconButton` and `SplitButton` own their tooltip behavior when labels are provided.

## Inspector rules

- The inspector rail is a template, not another section. It owns section order, scroll, selected-object mode, and local UI transitions.
- The app owns document truth, canvas mutation, undo/redo, persistence, and engine commands.
- Sections should expose controlled props and callbacks so Storybook can wire local state and the app can wire real state later.
- Section headers, value rows, and sub-control rows use inspector inset tokens. Do not hardcode new left/right padding.
- Section bodies use the shared bottom-inset token so dividers and stacked controls have consistent rhythm.
- Empty value-backed sections collapse or disappear according to their contract. Collapsed sections with existing values expand those values before adding another row.
- Row actions reveal on hover or focus. Static section titles do not get tooltips.
- Style/variables actions use the tooltip text `Apply styles and variables`.
- Selection-target actions use contextual labels such as `Select 2 using this color`.
- Eye actions disable the affected value segment and switch the eye icon to the hidden state; they do not disable unrelated row controls.

## Overlay acceptance criteria

Transient surfaces are not done until these are true in Storybook:

- Tooltips never flash at the top-left before measuring.
- Tooltips are edge aware: they clamp or flip so the label remains visible inside the overlay host.
- Dropdown menus open directly below or above their trigger, stay within the host, and do not size to the full host width.
- Menus close on outside click and clear active trigger state.
- Inspector dialogs are floating windows beside the rail, not scroll content inside a section.
- Inspector dialogs keep their launch position while the rail scrolls.
- Overlay stories cover right edge, bottom edge, scroll, and full-height inspector stages.

Full app-level collision and draggable windows can be deferred, but each deferral must be named in docs and not hidden as a local section workaround.

## Inspector interaction matrix

| Surface | Trigger | Expected behavior |
| --- | --- | --- |
| Canvas zoom | Zoom dropdown | Opens a menu below/above the trigger; typed input accepts a value; choosing a preset updates the displayed value. |
| Export format | Format dropdown | Opens `PNG`, `SVG`, `JPEG`, `PDF`; choosing an option updates the row. |
| Export settings | Horizontal more button | Opens the export settings dialog as a floating inspector dialog. |
| Stroke position | Position dropdown | Opens `Inside`, `Center`, `Outside`; choosing an option updates the row. |
| Stroke style | Style dropdown in settings | Opens `Solid`, `Dashed`; `Dashed` reveals `Dash` and `Gap`. |
| Stroke side | Individual strokes button | Opens a toolbar menu with `All`, `Top`, `Bottom`, `Left`, `Right`; row icons use official border Material Symbols and labels do not shift. |
| Auto layout | Header toggle or no-flow segment | Switches from auto-layout controls to the non-auto-layout layout state for the selected object. |
| Auto layout settings | Settings icon | Opens a floating dialog beside the rail. |
| Individual padding | Square toggle | Toggles from two padding inputs to four side-specific inputs. |
| Selection colors overflow | Color summary overflow | Expands the section to show all selection colors. |
| Paint add | Plus in collapsed/expanded sections | Expands existing values first; creates one new default row only when empty or already expanded. |

## Layout section state matrix

| Selection state | Flow row | Dimensions | Resizing | Spacing | Clip content |
| --- | --- | --- | --- | --- | --- |
| Text-like selection | Hidden | Shown | May show text-specific resizing when supported | Hidden | Hidden |
| Shape-like selection | Hidden | Shown | Hidden | Hidden | Hidden |
| Frame with children | Shown | Shown | Hidden | Hidden | May show when the selected object supports clipping |
| Auto layout | Shown | Shown | Hidden | Shown as `Gap` | Shown |
| True multi-selection | Shown when any selected item supports layout flow | Shown with `Mixed` values when needed | Hidden | Shown when multiple spacing values are relevant | Shown when any selected item supports clipping |

When the exact product condition is still unknown, document it as an open product rule instead of baking an assumption into section markup.

## Documentation checklist

When a review comment reveals a reusable rule, update at least one durable place before moving on:

- primitive docs under `docs/design-system/components/`
- inspector anatomy or template docs
- Storybook stories and controls
- `AGENTS.md`
- this workflow file
- local Codex skill, when available

## Verification

- Run `node --check` for changed JavaScript files.
- Run `npm run check` after JavaScript, type, CSS, Storybook, or contract edits.
- Run `npm run build-storybook` before handing off large Storybook changes.
- Use the in-app browser for visual verification after frontend changes.
- Inspect computed geometry, dimensions, foreground color, icon box, and active/open state. Screenshots alone are not enough.
