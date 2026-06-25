<!--
1:1 import — raw, pre-organization.

Source: Figma file 4kilp0ShQiYsoUPJdleqEH, page "Icons" (node 1:530873).
Entry guideline title frames (provided): 2656:34014 (Icon 24), 2656:34013 (Icon 16), 2656:34012 (Stroke Endpoints).
Also captured: top-level frames "24" (1:530896), "16" (1:540200), "Stroke Endpoints" (1:541864), and "Icon Size Guides" / "Icon Guidelines" (1:542181).

NOTE: Composa does NOT use Figma's icon ASSET library — it uses Material Symbols.
This import captures the icon GUIDANCE (sizing, stroke/weight, alignment, the size scale, usage rules) ONLY.
The icon asset inventories (large grids of icon.24.* / icon.16.* glyphs) are recorded as "asset grid" markers and intentionally NOT transcribed glyph-by-glyph.

This is a faithful capture, not a synthesis. Re-organization into tabs happens later.
Cite node ids when reusing. Asset URLs from the MCP expire after 7 days — not embedded here.
-->

# Iconography — 1:1 Figma import

Page status label (all frames): **UI3** (node `2359:55010` / `2359:55020` / `2359:55030` / `2359:55040`, "_Status" left side).

Doc heading typography used throughout (from Figma styles):
- `.doc/title` — Font: Whyte, Regular, size 36, weight 400, lineHeight 32, letterSpacing 1.
- `.doc/heading` — Font: Whyte, Regular, size 18, weight 400, lineHeight 32, letterSpacing 1.

---

## Icon Guidelines (sizing-guide intro frame)

Source frame: "Icon Size Guides" — node `1:542181`. Heading block `1:542183`.

**Title** (node `I1:542183;1:596375`):
> Icon Guidelines

**Description** (node `I1:542183;1:596376`):
> These guidelines provide sizing help for common shapes like circles, squares and rectangles. They are guidelines, so feel free to use your best judgement for more exotic shapes.

This frame contains a two-row labeled layout (node `1:542184`):
- Row label **"Components"** (node `1:542186`).
- Row label **"Examples"** (node `1:542204`), paired with an examples cluster (node `1:542205`).

The "Examples" cluster overlays a red sizing-guide overlay component (`_Icon Sizing Guide`, the `Component 3` / red translucent boxes — `bg-[rgba(255,0,0,0.1)]` with `border-[rgba(255,0,0,0.25)]`) on top of real icons to demonstrate fit. The sizing-guide component has three variants (node `IconSizingGuide`, ids `1:542188` / `1:542193` / `1:542198`):
- **"24px"** — outer inset `12.5%`, inner box inset `16.67%` (24px bounding box).
- **"24px Small"** — outer inset `20.83%`, inner box inset `25%` / `20.83% 33.33%` (the "small" geometry inside a 24px frame).
- **"16px"** — outer inset `12.5%`, inner box inset `18.75%` / `12.5% 31.25%` (16px bounding box).

Example icons shown overlaid with the guide (asset references, names only — these are the demo glyphs, not guidance):
- 24px row examples (node `1:542206`): `icon.24.image`, `icon.24.vector.paint`, `icon.24.command`, `icon.24.hand`, `icon.24.settings`.
- 24px-small row examples (node `1:542219`): `icon.24.settings.small`, `icon.24.emoji`, `icon.24.eye.small`, `icon.24.link-connected`.
- 16px row examples (node `1:542235`): `icon.16.visible`, `icon.16.frame`, `icon.16.rating`, `icon.16.variable`, `icon.16.lock.unlocked`, `icon.16.instance`.

Component description carried in Figma metadata: `icon.24.emoji` (node `1:531529`) — "emoji, reaction".

---

## Icon 24

Source frame: "24" (node `1:530896`). Section title frame: `2656:34014` → `_Doc/Heading` `1:530898`.

**Title** (node `1:530900`):
> Icon 24

**Description** (node `1:530901`):
> The bulk of our icons are contained within a 24px frame, using 1px strokes with rounded caps, and can optionally come in a "small" size geared towards a 12px bounding box.

### Body (asset grids — NOT transcribed glyph-by-glyph)

The "24" frame's body is a series of `_Doc/Section-Body` frames (`1:530903`, `1:532517`, `1:534752`, `2656:31368`, `2656:32593`, `1:536569`, `2656:32173`, `2656:32181`, `2656:33499`, `2656:33561`, `2656:32354`, `2656:32431`, `2656:33654`, `2656:33767`, `2656:32468`, `2656:33799`, `2656:33810`, `2656:33827`, `2656:33950`, `2656:33863`). Each is a left-hand category-label column (224px, "_Doc/Description") plus a grid of `icon.24.*` glyph tiles, each tile being a name label + a 24×24 `Preview` symbol.

**ASSET GRID — recorded, not enumerated.** (Composa uses Material Symbols, so the specific glyph inventory is out of scope.) Representative example (body `1:530903`): tiles include `icon.24.plus`, `icon.24.plus.small`, `icon.24.minus`, `icon.24.minus.small`, `icon.24.more`, `icon.24.close`, `icon.24.close.small`, `icon.24.navigate.back`, `icon.24.chevron.*`, `icon.24.search`, `icon.24.settings`, etc. — laid out 4-per-row in 208×160 cells, each glyph drawn at 24×24 inside a 128px-tall preview. The grid pattern repeats across all 24-section bodies. No prose rules live in these bodies; the only guidance prose is the heading description above.

---

## Icon 16

Source frame: "16" (node `1:540200`). Section title frame: `2656:34013` → `_Doc/Heading` (instance, `1:540203`).

**Title** (node, DocHeading `title`):
> Icon 16

**Description** (node, DocHeading `description`):
> In small contexts, we occasionally also make use of 16px, namely in dense contexts like layer lists.

### Body (asset grids — NOT transcribed glyph-by-glyph)

`_Doc/Section-Body` frames: `1:540204`, `1:540489`, `1:541317`, `1:541357`, `1:541394`, `1:541441`, `1:541511`, `1:541526`, `1:541540`, `1:541581`, `1:541666`, `1:541803`. Same structure as the 24 frame: a 224px category-label column plus grids of `icon.16.*` glyph tiles (each glyph drawn at 16×16). **ASSET GRID — recorded, not enumerated.** No prose rules beyond the heading description above.

---

## Stroke Endpoints

Source frame: "Stroke Endpoints" (node `1:541864`). Section title frame: `2656:34012` → `_Doc/Heading` (instance, `1:541866`).

**Title** (DocHeading `title`):
> Stroke Endpoints

**Description** (DocHeading `description`):
> Stroke endpoint icons share a 16px height. Their widths are slightly irregular to fit into input fields in the properties panel.

### Body (asset grids — NOT transcribed glyph-by-glyph)

`_Doc/Section-Body` frames: `1:541867`, `1:541894`, `1:541947`, `1:542003`, `1:542054`, `1:542110`, `1:542140`, `1:542170`. Each is a category-label column plus a grid of stroke-endpoint glyph tiles. The endpoint glyphs share a **16px height** but have **irregular widths** (per the description, to fit input fields in the properties panel) — e.g. preview symbols `icon.16.stroke.start.point.line.arrow` (52×16), `icon.16.stroke.end.point.line.arrow` (52×16), `icon.16.stroke.both.points.line.arrow` (52×16), `icon.16.stroke.start.point.line.arrow-short` (36×16). **ASSET GRID — recorded, not enumerated.** No prose rules beyond the heading description above.

---

## Summary of the captured GUIDANCE (the load-bearing rules)

These are the only prose/sizing rules present in the Figma iconography frames; everything else is asset inventory.

- **Default size & geometry:** the bulk of icons sit in a **24px frame**, drawn with **1px strokes** and **rounded caps**. (node `1:530901`)
- **Optional small size:** icons can optionally come in a **"small"** size geared toward a **12px bounding box**. (node `1:530901`)
- **16px size:** used in small/dense contexts (e.g. layer lists), occasionally. (Icon 16 description)
- **Stroke-endpoint icons:** share a **16px height**; widths are intentionally **irregular** to fit input fields in the properties panel. (Stroke Endpoints description)
- **Sizing guides:** provided as overlay templates for common shapes (circles, squares, rectangles); treated as guidelines, with designer judgement allowed for exotic shapes. Three guide variants — **24px** (inner box inset 16.67%), **24px Small** (inner box inset 25% / 20.83%×33.33%), **16px** (inner box inset 18.75% / 12.5%×31.25%). Overlay color: red translucent fill `rgba(255,0,0,0.1)` with border `rgba(255,0,0,0.25)`. (node `1:542181`)

No explicit accessibility/contrast/touch-target rules, no weight/grade scale beyond "1px stroke, rounded caps," and no do/don't pairs were present in these frames.
