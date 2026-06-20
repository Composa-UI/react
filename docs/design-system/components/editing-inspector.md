# EditingInspector

EditingInspector is the full right-rail template for editing a selected object. Use it when the surrounding product needs the complete inspector stack, not just one reusable section.

## Anatomy

| Part | Component |
| --- | --- |
| Top toolbar | `InspectorHeader` |
| Selected layer context | `LayerHeader` |
| Transform controls | `PositionSection` |
| Layout controls | `LayoutSection` |
| Appearance controls | `AppearanceSection` |
| Paint values | `FillSection` and `StrokeSection` |
| Effects | `EffectsSection` |
| Selection metadata | `SelectionColorsSection` |
| Layout guides | `LayoutGuideSection` |
| Export settings | `ExportSection` |

## Guidelines

- Keep the template at the right-rail width. The current rail width is 240px.
- Let the template own vertical scrolling. Individual sections should not create nested scroll regions.
- Keep section order stable so selected-object state changes do not cause the rail to feel rearranged.
- Use empty-section behavior intentionally: paint, guide, and export sections may show a collapsed no-value header; selection colors disappear when no values exist.
- Keep hover-only actions inside the section or row that owns the action.
- Put repeated control behavior into a base component before using it across multiple sections.
- Wrap the template in `OverlayHost` so tooltips, dropdown menus, and inspector dialogs can escape the scroll container.
- Test the inspector in an overflow-friendly stage: the rail remains 240px wide and right-aligned, while the story canvas gives overlays room to render beside it.
- Keep dialogs out of section flow. Dialogs launched from auto-layout, stroke, effects, layout guide, and export controls should float beside the inspector and keep their launch position while the inspector scrolls.

## Inspector dialogs

Several inspector controls launch a floating dialog beside the rail. These are overlay-mounted, controlled-open, dense inspector surfaces. They render a `role="dialog"` surface and are mounted through `OverlayPortal` with `inspector-dialog` placement and `followAnchor={false}`, so they float to the left of the rail and keep their launch position while the inspector scrolls. They follow the same architecture as `StrokeSettingsDialog` and `ExportSettingsDialog`; do not invent new z-index or placement rules.

| Dialog | Launched from | Contents | Figma node |
| --- | --- | --- | --- |
| `ColorPickerDialog` | A fill/stroke/guide color swatch (`ColorPickerTrigger`) | Custom/Libraries tabs, paint-type field set (solid/gradient/image/video), 2D saturation-brightness area, eyedropper + hue + alpha sliders, color-format dropdown with hex/RGB/HSL/CSS value and opacity inputs, swatch-set selector, saved-swatch row. | `rMq1M35u1iyKB2QaQMipZb` 89:4939 |
| `TypographyDialog` | A text/type control | Basics / Details / Variable tabs and a Preview specimen box. Basics: font family trigger (opens `FontsPickerMenu`), font style dropdown, size/line-height/letter-spacing inputs, and Alignment / Decoration / Case / Vertical-trim / List-style / Paragraph-spacing / Truncate control rows. Details: eight scrolling OpenType fieldsets of dash/check feature toggles plus Case, Numbers, and Paragraph-indent controls. Variable: Slant (continuous) and Weight (stepped) variable-font axis sliders. | `rMq1M35u1iyKB2QaQMipZb` 99:5566 (Basics), 99:9688 (Details) |
| `FontsPickerMenu` | The `TypographyDialog` font-family trigger | "Fonts" header with apply-variable + close, a clearable search, an "All fonts" source dropdown, and a font list where each family renders in its own face. | `rMq1M35u1iyKB2QaQMipZb` 99:1337 |
| `TypeStyleMenu` | A text-style picker control | "Text styles" header with team-library + create-style + close, search, and grouped style rows that lead with an `Ag` specimen and reveal an edit/filter affordance on the active row. | `rMq1M35u1iyKB2QaQMipZb` 99:4077 |
| `LayoutGuideSettingsDialog` | A layout-guide row settings trigger | Guide-type dropdown (Columns/Rows/Grid), count, color (swatch + hex + opacity), behavior, width/height, margin, gutter. Grid collapses behavior and size into one Size field. | `rMq1M35u1iyKB2QaQMipZb` 91:40246 / 91:38859 |

`ColorPickerDialog` is the heaviest surface. Its picking UX references Adobe Spectrum / react-aria color components (`ColorArea`, `ColorSlider`, `ColorField`), but it is built from Composa primitives (`InputField`, `Dropdown`, `SegmentedControl`, `IconButton`); Spectrum is a UX reference, not a dependency. The dialog reflects a controlled hex `value` in its area/sliders/swatch chrome using small internal hex→RGB→HSV helpers; full live color-area dragging and a real eyedropper are app-owned follow-ups (the dialog exposes `onValueChange`, `onOpacityChange`, and `onEyedropper` seams).

`ColorPickerTrigger` is the inline swatch button that owns `open`/`onOpenChange` and mounts `ColorPickerDialog` through the overlay portal, matching the trigger/dialog split used by the stroke and export settings controls.

All five inspector settings dialogs share the inspector-dialog house style (real `close` X overlapping the corner, edge-to-edge header/section hairlines, per-section 8/12/16 insets); see `dialog.md` → "Inspector-dialog house style". A controlled settings dialog that hosts its own dropdowns must keep itself open while those dropdowns operate: the dropdown menus portal to the host as sibling overlay layers, so the dialog's outside-pointerdown handler ignores clicks landing inside any `.composa-overlay-layer-portal` (in addition to its own overlay owner). This is the fix wired into `ExportRow`, `StrokeControlsSection`, and `ColorPickerTrigger`.

**Export settings interactivity.** `ExportSettingsDialog` is fully wired: `Color profile` and `Image resampling` are real `Dropdown`s, the `Ignore overlapping layers` `Checkbox` toggles via local state under an "In addition" headline, and `Suffix` is a quiet disabled display field. The export row's `Preview` row is a real disclosure (`ExportPreviewDisclosure`) that expands a 1x preview surface.

**Typography panel (Wave 6 rebuild).** `TypographyDialog` is now the full Figma `99:5566` panel: a `Tabs` header (Basics / Details / Variable, no underline, with the close X overlapping the corner), a Preview specimen box, and the Basics body with family/style/metrics plus two divided control sections — Alignment, Decoration (with an underline-details overflow), Case, then Vertical trim, List style, Paragraph spacing, and Truncate. Icon rows use the `SegmentedControl` `variant="icon"` primitive; case and vertical-trim rows render `Ag`/`AG`/`ag` text specimens through a small specimen-segmented group. The family trigger opens the dedicated `FontsPickerMenu` (`99:1337`). `TypeStyleMenu` (`99:4077`) leads each row with an `Ag` specimen in the style's face and reveals an edit/filter affordance on the active row.

**Details tab (Wave 10, Figma `99:9688`).** The Details body is a scrolling stack of eight titled OpenType fieldsets (each a `TypographyFieldset` with an 11px semibold legend and a shared edge-to-edge divider): Indentation (Hanging punctuation, Hanging lists, Paragraph indent), Letter case (Case, Case-sensitive forms, Capital spacing), Numbers (Style, Position, Fractions, Slashed zero), Letterforms (Rare ligatures, Contextual alternates, Ordinals), Stylistic sets (Stylistic alternates, Open digits, Disambiguation, r-into-round-neighbors, Disambiguation without slashed zero), Character variants (eleven per-glyph alternates), Horizontal spacing (Kerning pairs), and More features (Fraction denominators/numerators, Scientific inferiors). Each feature is a two-segment dash/check toggle (`TypographyToggleRow`); Case reuses the Basics five-segment `Ag` specimen; Numbers Style/Position are multi-icon segments; Paragraph indent is a 72px numeric field (`TypographyNumberRow`). Values read from the `details` prop (keyed by feature id) and write back through `onDetailChange(key, value)`. The body caps at `--composa-typography-details-max-height` (408px) and scrolls.

**Variable tab (Wave 10).** The Variable body holds two variable-font axis sliders (`TypographyAxisSlider`): a **Slant** axis (continuous track, -15..15) and a **Weight** axis (stepped track, 100..900 in steps of 100). Each axis is a label + numeric value field over a horizontal rail — a blue (`--composa-color-border-selected`) fill up to the value, a white thumb, and, on the stepped Weight track, one stop dot per step with active stops highlighted. The track is pointer-draggable (reusing the color-picker `useAreaPointer` binder) and keyboard-steppable (Arrow keys), controlled via `slant`/`weight` + `onSlantChange`/`onWeightChange`. (The founder's reference describes the axes; this file has no Variable Figma node, only the Basics and Details variants, so the Variable tab is built to the reference spec.)

All surfaces are controlled/presentational: they hold local UI state (active tab, open picker, search query, selected segment, axis values) and expose `onTabChange`, `on*Change`, `onTypeStyleChange`, `onFontFamilyChange`, `onDetailChange`, `onSlantChange`, and `onWeightChange` seams; the app owns applying values to the selected text.

## Interaction Boundary

The inspector template is state-capable, but it should not own the product document. It can define the local UI contract: how sections expand, how empty value groups collapse, how a control switches from layout to auto layout, which actions are hover-only, and which section appears for each selected-object mode.

Sections expose controlled props and callbacks for values such as layout mode, flow, dimensions, paint rows, and export rows. The app owns the selected object, document mutations, undo/redo, persistence, and canvas-engine commands. Storybook can include interactive demos that wire local state to those callbacks. Production code should connect the same callbacks to the app model.

## Interaction Scope

The template may own local interface mechanics:

| Interaction | Template may own | App owns later |
| --- | --- | --- |
| Section expand/collapse | Open state, empty-value lifecycle, hover-only actions. | Persisted preference if needed. |
| Adding/removing rows | Local demo state and callbacks. | Actual document mutation, undo/redo, persistence. |
| Switching layout mode | Local selected UI state and section shape. | Canvas engine command and model rewrite. |
| Dropdown/menu selection | Trigger state, simple value updates in stories. | Validation and document mutation. |
| Dialog open/close | Overlay placement, active trigger state, outside click close. | Applying settings to the selected object. |

This keeps the component system useful before the canvas engine exists while avoiding fake ownership of document truth.

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `layerTitle` | `string` | `"Frame"` | Label shown in `LayerHeader`. |
| `layoutMode` | `"frame" \| "selection" \| "autoLayout"` | `"autoLayout"` | Selects the `LayoutSection` mode. |
| `selectionColors` | `PaintSectionItem[]` | preset values | Values summarized by `SelectionColorsSection`. Empty arrays hide the section. |
| `showInspectorHeader` | `boolean` | `true` | Hides the top toolbar for embedded demos. |
| `showLayerHeader` | `boolean` | `true` | Hides the layer context row for embedded demos. |

## Implementation

| Surface | Reference |
| --- | --- |
| React | `src/react/factory.js` (`function EditingInspector`) |
| Storybook | `Composa UI/Templates/Inspector/EditingInspector` |
