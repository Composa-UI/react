# Inspector dialog rework — critique & fix plan (working note)

> Working artifact (uncommitted) from a designer-grade self-critique vs Figma
> file `rMq1M35u1iyKB2QaQMipZb`. Feeds the dialog rework. Combine with the
> founder's voice-note feedback. Benchmark of the batch = `LayoutGuideSettingsDialog`.

## Cross-cutting (all three dialogs)
- **Header/divider house-style diverges from Figma.** Close button is a `rotate(45deg)` `plusSmall` hack (`993:58-62`) instead of a real X; Figma places close **overlapping the top-right corner**. Dividers are drawn *inside* uniform dialog padding so they stop short of the edges; Figma runs hairlines **edge-to-edge** with **varied per-section padding (8/12/16px)**, not a uniform grid gap. → Build a shared **inspector-dialog header/divider primitive**.
- Verify dialog **radius = 13px** + the 3-layer shadow resolve for the large color picker (looks cheap at 8px).
- No empty/disabled/loading/focus-visible states demoed or styled.

## 1. ColorPickerDialog — worst offender
- **One static body for all four paint types.** `data-paint-type` is set but no body swap: **gradient** (linear/radial dropdown + stops list w/ pos%/hex/opacity/remove/add) and **image** (fill-mode dropdown + checkerboard drop-zone + upload button) bodies are **absent**. `factory.js:3759-3920`.
- **Custom/Libraries tabs decorative** — Libraries panel renders nothing.
- **2D area + hue + alpha sliders are display-only** — `role="slider"` but **no pointer handlers**; thumbs/reticle positioned from value only. `factory.js:3825-3858`.
- **RGB/HSL/CSS read-only** — only hex editable; others are derived display strings, `onChange` suppressed unless `format==='hex'` (`3879`). Conversions are one-way hex→rgb→hsv only (`3672-3708`).
- Missing: check-color-contrast header action; "new" should be `+` not `styles` icon; hue/alpha thumb layering (12px dot + 4px ring + shadow).

## 2. TypographyDialog — wrong frame + missing picker — DONE (Wave 6); Details/Variable tabs DONE (Wave 10)
- **Rebuilt to the tabbed 99:5566 panel.** Basics/Details/Variable `Tabs` header (no underline, corner-overlap close), Preview specimen box, and the full Basics body: family/style/metrics + Alignment, Decoration (with underline-details overflow), Case, Vertical-trim, List-style, Paragraph-spacing, Truncate. Icon rows use `SegmentedControl variant="icon"`; case/vertical-trim render `Ag`/`AG`/`ag` specimen segments.
- **Details tab (99:9688) built (Wave 10).** Eight scrolling OpenType fieldsets (`TypographyFieldset`): Indentation, Letter case, Numbers, Letterforms, Stylistic sets, Character variants, Horizontal spacing, More features — every block enumerated and checked against the node. Features are dash/check `TypographyToggleRow` segments; Case reuses the Basics specimen; Numbers Style/Position are multi-icon segments; Paragraph indent is a numeric field. Controlled via `details` + `onDetailChange`.
- **Variable tab built (Wave 10).** Slant (continuous) + Weight (stepped, 100..900, stop dots) `TypographyAxisSlider` axes — a blue-fill rail with a white thumb, pointer-drag + keyboard. No Variable Figma node exists (only Basics/Details variants), so it is built to the founder's reference. Controlled via `slant`/`weight` + `onSlantChange`/`onWeightChange`.
- **Fonts picker (99:1337) built** as `FontsPickerMenu` (search, "All fonts" source dropdown, font list each rendered in its own face), and the family trigger now opens IT (no longer `TypeStyleMenu`).
- **`TypeStyleMenu` (99:4077) polished**: each row now leads with an `Ag` specimen in the style's face and reveals an edit/filter affordance on the selected/hovered row; alignment uses the paragraph `format_align_*` glyphs (justify fixed).

## 3. LayoutGuideSettingsDialog — benchmark (closest to spec)
- Faithful structure (Columns/Rows/Grid variants, count-with-chevron, muted Auto). One gap: color+hex+opacity should be **one connected segmented field**, not three loose `bg-secondary` inputs (`4270-4274`).

## Prioritized fixes
**P0 (functional / founder-requested)**
1. ColorPicker: **editable RGB/HSL/CSS with bidirectional round-tripping** (rgb→hex, hsl/hsv→rgb, parse+validate per format; wire onChange for all formats). `factory.js:3672-3708,3879`.
2. ColorPicker: **drag-to-pick on 2D area** (pointer→s/v→onValueChange). `3825-3843`.
3. ColorPicker: **draggable hue + alpha sliders**. `3844-3858`.
4. ColorPicker: **gradient body** + **image body**, swapped on paint type. `3759-3920`.

**P1 (spec completeness)**
5. ColorPicker: Libraries tab content; check-contrast action; `+` new icon.
6. Typography: rebuild to 99:5566 Basics panel (tabs/preview/decoration/case/trim/list/paragraph/truncate) OR document as intentional compact variant; add **Fonts picker (99:1337)** and wire family trigger to it.
7. All: rework header to Figma convention (corner-overlap close, real X, edge-to-edge dividers, varied 8/12/16 padding).

**P2 (polish)**
8. Verify radius 13px + 3-layer shadow. 9. Layout-guide connected color field. 10. Hue/alpha thumb layering; TypeStyleMenu `Ag` lead + filter affordance; justify icon. 11. State stories (empty swatches, disabled paint types, empty Libraries, focus-visible, gradient/image, Fonts picker).

## Skill lessons to encode (component-builder skill / workflow doc)
- **`data-*` without matching markup is a stub, not an implementation** — if a Figma variant shows a materially different body, each variant must render its own.
- **Looks-editable must be editable** — never ship a read-only field styled as an input; make it editable or visibly disabled.
- **Match the exact cited Figma frame** — enumerate every cited node, screenshot each, check off its content blocks before calling a dialog done.
- **Codify the inspector-dialog header/divider primitive** (corner-overlap close + real X, edge-to-edge hairlines, per-section padding scale) so dialogs inherit the house style.
