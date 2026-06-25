<!--
Source: Figma "Slilder Guidelines" page — fileKey 4kilp0ShQiYsoUPJdleqEH, entry node 2015:23027
1:1 import — raw, pre-organization. Faithful capture, not synthesis. Re-organize into tabs later.
Frames transcribed: 2015:23030, 2015:23034, 2015:23061, 2015:23093, 2015:23125, 2015:23144, 2015:23163, 2015:23177, 2015:23192
-->

# Slider — Guidelines (1:1 Figma import)

Page frame: `2015:23027` "Slilder Guidelines" (1280 × 3268; misspelling is as authored in Figma). Contains a `_Status` instance bar (`2359:118654`) and a content frame "Frame 3" (`2015:23029`) holding nine `_Section/Component` sections.

Doc text styles present across the page:
- `_doc/heading`: Whyte, Regular, size 18, weight 400, lineHeight 32, letterSpacing 1
- `_doc/description`: Whyte, Book, size 13, weight 350, lineHeight 22, letterSpacing 1

Effect styles bound on specimens: `light/elevation-300-tooltip` (drop shadows #0000001A 0/1/3, #00000021 0/5/12, #00000026 0/0/0.5) and `light/elevation-200-canvas` (drop shadows #0000001A 0/1/3, #0000001A 0/3/8, #0000002E 0/0/0.5). The slider handle drop-shadow rendered as `0px 0px 0.25px rgba(0,0,0,0.18), 0px 3px 4px rgba(0,0,0,0.1), 0px 1px 1.5px rgba(0,0,0,0.1)`.

The Slider component (`2015:23280`) carries a usage description: **"Do not resize this component to less than 100px width."** Specimens are 208px wide throughout.

---

## Section 1 — Component intro / Definition

Node: `2015:23030` (`_Section/Component`, 1280 × 216)

### Heading + description

Component Name (`2015:23032`, Whyte Regular 36px, color rgba(0,0,0,0.9), tracking 0.36px):

> Slider

Description (`2015:23033`, Whyte Regular 18px, color rgba(0,0,0,0.6), tracking 0.18px, width 412px), verbatim:

> Used for adjusting between a range with a min and a max value.

---

## Section 2 — Slider Range

Node: `2015:23034` (`_Section/Component`, 1280 × 352)

### Heading + description

Component Name (`2015:23036`, Whyte Regular 18px):

> Slider Range

Description (`2015:23037`, Whyte Book 13px), verbatim (three paragraphs; note the curly apostrophe and blank middle line as authored):

> It's important to include the numeric value alongside the heading of the property being manipulated. You can find these in places like video scrubbing, for example.
>
> ​
>
> In cases where there are common stopping points, we also include vertical bars to show indices.

### Light / Dark context (`2015:23038`, 704px wide)

Two panels side by side: **Light** (`2015:23039`, bg `--color-bg` white, 1px rgba(0,0,0,0.1) border) labeled "LIGHT MODE" (`2015:23040`), and **Dark** (`2015:23050`, bg `--color-bg` #2c2c2c) labeled "DARK MODE" (`2015:23051`). The "LIGHT MODE" / "DARK MODE" captions are Whyte Book 13px, rgba(0,0,0,0.3) light / rgba(255,255,255,0.3) dark.

Each panel contains a Drop Zone (`2015:23041` light / `2015:23052` dark) laying out a vertical stack "V02 Slider Range" of five Slider specimens (gap 32px) with redline labels. The redline labels use `_Label/Redline/State-Left` styled with `--color-bg-assistive-tertiary` (#ffe0fc light / #68275e dark) and text `--color-text-assistive` (#ea10ac light / #fc9ce0 dark); each ends in a 6px rotated diamond pointer.

**Redline annotations (left):** **0%** (top, `2015:23048` light / `2015:23059` dark), **100%** (bottom, `2015:23049` light / `2015:23060` dark).

**The 5 Slider specimens (`Variant=Range`), by knob position — fill grows from the left edge:**

| Specimen | knobPosition | Fill container inset | Slider node (light / dark) |
|----------|--------------|----------------------|----------------------------|
| 1 | 1 | left 0 (fill anchored left, knob via `SliderHandle`) | `2015:23043` / `2015:23054` |
| 2 | 2 | `inset-[0_70.19%_0_0]` | `2015:23044` / `2015:23055` |
| 3 | 3 | `inset-[0_47.12%_0_0]` | `2015:23045` / `2015:23056` |
| 4 | 4 | `right-1/4` (75% fill) | `2015:23046` / `2015:23057` |
| 5 | 5 | `inset-[0_0.96%_0_0]` (~99% fill) | `2015:23047` / `2015:23058` |

### Slider component — variant axes (Range variant, embedded in this frame)

`SliderProps` (Range):
- `variant`: `"Range"`
- `knobPosition`: `"1" | "2" | "3" | "4" | "5"` (default `"1"`)

Component note on `Variant=Range, Knob Position=1` (`2015:23285`): "Adjust the left padding to change the width of the Fill container."

### Token / value capture (token-driven, captured)

Slider track 208 × 16px. Handle 16 × 16px. Fill container radius `8px`.

| Element | Token / value | Light fallback | Dark fallback |
|---------|---------------|----------------|----------------|
| Track bg | `--color-bg-secondary` | #f5f5f5 | #383838 |
| Track border | `--color-bordertranslucent` | rgba(0,0,0,0.1) | rgba(255,255,255,0.1) |
| Track radius | `--radius-full` | 9999px | 9999px |
| Fill container | `--color-bg-brand` | #0d99ff | #0c8ce9 |
| Handle | `_Slider/Handle` (`2015:23246`, Stroke (Modified)) — body + hole punch | — | — |

`[Deferred: render — ref nodes 2015:23039 (light), 2015:23050 (dark)]` — component-dependent 5-step Range specimen stack. Token/value data above captured non-deferred.

---

## Section 3 — Slider Delta

Node: `2015:23061` (`_Section/Component`, 1280 × 352)

### Heading + description

Component Name (`2015:23063`, Whyte Regular 18px):

> Slider Delta

Description (`2015:23064`, Whyte Book 13px; the word "change" is set in Whyte Book Italic), verbatim:

> When manipulating a *change* from a default value (such as when manipulating image properties like exposure), we adjust the knob style and include a vertical bar to show the starting point.

### Light / Dark context (`2015:23065`)

Light panel (`2015:23066`, "LIGHT MODE" `2015:23067`) and Dark panel (`2015:23078`, "DARK MODE" `2015:23079`). Each Drop Zone (`2015:23068` light / `2661:12234` dark) stacks five Slider specimens (gap 32px).

**Redline annotations (left):** **-100%** (top, `2015:23075` / `2661:12241`), **+100%** (bottom, `2015:23076` / `2661:12242`), **Default** (middle, `2015:23077` / `2661:12243`).

**The 5 Slider specimens (`Variant=Slider`) — fill emanates from the Default (center) tick; a center tick marks the starting point:**

| Specimen | knobPosition | Fill container inset | Slider node (light / dark) |
|----------|--------------|----------------------|----------------------------|
| 1 | 1 | `inset-[0_46.15%_0_0.96%]`, handle left | `node-2015_23369` / `2661:12236` |
| 2 | 2 | `inset-[0_46.15%_0_23.08%]`, handle left | `node-2015_23374` / `2661:12237` |
| 3 | 3 | no fill container — centered Fill (Default) handle on a full tick row, drop-shadowed | `node-2015_23379` / `2661:12238` |
| 4 | 4 | `inset-[0_24.04%_0_46.15%]`, handle right | `node-2015_23385` / `2661:12239` |
| 5 | 5 | `inset-[0_0_0_46.15%]`, handle right | `node-2015_23390` / `2661:12240` |

The Default/center tick (position 3) is rendered with a distinct tick asset versus the off-default ticks (token-driven swap of `imgTick` vs the highlighted tick). The handle variants: positions 1/2/4/5 use the **Stroke (Modified)** handle (body + hole punch); position 3 uses the **Fill (Default)** handle (solid, drop-shadowed).

### Slider component — variant axes (Slider/Delta variant, embedded)

`SliderProps` (Slider):
- `variant`: `"Slider"`
- `knobPosition`: `"1" | "2" | "3" | "4" | "5"` (default `"1"`)

### Token / value capture

| Element | Token / value | Light fallback | Dark fallback |
|---------|---------------|----------------|----------------|
| Track bg | `--color-bg-secondary` | #f5f5f5 | #383838 |
| Track border | `--color-bordertranslucent` | rgba(0,0,0,0.1) | rgba(255,255,255,0.1) |
| Track radius | `--radius-full` | 9999px | 9999px |
| Fill container | `--color-bg-brand` | #0d99ff | #0c8ce9 |
| Tick | 4 × 4px glyph | — | — |
| Fill (Default) handle | `2015:23236` (drop-shadowed) | — | — |
| Stroke (Modified) handle | `2015:23246` | — | — |

`[Deferred: render — ref nodes 2015:23066 (light), 2015:23078 (dark)]` — component-dependent Delta specimen stack.

---

## Section 4 — Slider Stepper

Node: `2015:23093` (`_Section/Component`, 1280 × 352)

### Heading + description

Component Name (`2015:23095`, Whyte Regular 18px):

> Slider Stepper

Description (`2015:23096`, Whyte Book 13px), verbatim:

> When transforming a variable font, a user will often be able toggle along discrete weights. In these cases (and any cases dealing with discrete adjustment points), the slider stepper will be most useful. The amount of ticks are dependent on the amount of weights in the font.

### Light / Dark context (`2015:23097`)

Light panel (`2015:23098`, "LIGHT MODE" `2015:23099`) and Dark panel (`2015:23110`, "DARK MODE" `2015:23111`). Each Drop Zone (`2015:23100` light / `2015:23115` dark) stacks five Slider specimens (gap 32px).

**Redline annotations (left):** **-100%** (top, `2015:23107` / `2015:23122`), **+100%** (bottom, `2015:23108` / `2015:23123`), **Default** (middle, `2015:23109` / `2015:23124`).

**The 5 Slider specimens (`Variant=Stepper`) — a row of 7 ticks (4×4px); fill grows from the left, one tick is the selected/default tick:**

| Specimen | knobPosition | Fill / selected-tick treatment | Slider node (light / dark) |
|----------|--------------|--------------------------------|----------------------------|
| 1 | 1 | Fill anchored left with centered Stroke (Modified) handle; 7 ticks across | `node-2015_23305` / `2015:23117` |
| 2 | 2 | Fill `inset-[0_77.4%_0_0]`; "Selected Tick" group (tick + centered handle) | `node-2015_23317` / `2015:23118` |
| 3 | 3 | Fill `inset-[0_8px]` with Progress Fill / Progress Remaining halves; centered Fill (Default) handle | `node-2015_23330` / `2015:23119` |
| 4 | 4 | Fill `inset-[0_16.83%_0_0]`; "Selected Tick" group | `node-2015_23344` / `2015:23120` |
| 5 | 5 | Fill `inset-0` (full); handle at right edge | `node-2015_23357` / `2015:23121` |

The "Selected Tick" (`2015:23322` etc.) wraps a tick and a centered handle so the active step reads as a knob. The default/middle tick uses a distinct tick asset (token-driven swap) from the rest of the row.

### Slider component — variant axes (Stepper variant, embedded)

`SliderProps` (Stepper):
- `variant`: `"Stepper"`
- `knobPosition`: `"1" | "2" | "3" | "4" | "5"` (default `"1"`)

Component note on `Variant=Stepper, Knob Position=1` (`2015:23305`): "Adjust the left padding to change the width of the Fill container."

### Token / value capture

| Element | Token / value | Light fallback | Dark fallback |
|---------|---------------|----------------|----------------|
| Track bg | `--color-bg-secondary` | #f5f5f5 | #383838 |
| Track border | `--color-bordertranslucent` | rgba(0,0,0,0.1) | rgba(255,255,255,0.1) |
| Track radius | `--radius-full` | 9999px | 9999px |
| Fill container | `--color-bg-brand` | #0d99ff | #0c8ce9 |
| Ticks | 7 × 4×4px glyphs, justify-between, inset 6px | — | — |

> Note (faithful capture): The component name contains a grammatical slip as authored — "will often be able toggle along" (missing "to"). Preserved verbatim; reconcile during clean-up.

`[Deferred: render — ref nodes 2015:23098 (light), 2015:23110 (dark)]` — component-dependent Stepper specimen stack.

---

## Section 5 — Slider Color (Hue + Opacity)

Node: `2015:23125` (`_Section/Component`, 1280 × 352)

> Note (faithful capture): In document reading order this section sits below "Slider Gradient" in source, but the Frame-3 child order places `2015:23125` at y=1528 (5th section) and `2015:23144` (Gradient) at y=1944 (6th). Sections are numbered here by child order.

### Heading + description

Component Name (`2015:23127`, Whyte Regular 18px):

> Slider Color (Hue + Opacity)

Description (`2015:23128`, Whyte Book 13px), verbatim:

> When adjusting color, we use a special type of slider that includes a preview of the value being changed.

### Light / Dark context (`2015:23129`)

Light panel (`2015:23130`, "LIGHT MODE" `2015:23131`) and Dark panel (`2015:23137`, "DARK MODE" `2015:23138`). Each Drop Zone (`2015:23132` light / `2015:23139` dark) holds two stacked color sliders.

**Redline annotations (left):** **Hue** (`2015:23135` / `2015:23142`), **Opacity** (`2015:23136` / `2015:23143`).

**The 2 Slider specimens (`Variant=Color Range`) — track shows a color preview behind the handle:**

| Specimen | Background state | Background treatment | Slider node (light / dark) |
|----------|------------------|----------------------|----------------------------|
| Hue | `Gradient` | `Slider BG Gradient` (`2015:23277`) — hue gradient image over white→transparent vertical gradient, `--radius-full` | `2015:23133` / `2661:12314` |
| Opacity | `Fill` | `Slide BG Fill` (`2015:23279`) — checkerboard tile + fill image (transparency preview), `--radius-full` | `2015:23134` / `2015:23141` |

Both use the **Fill (Default)** handle (`2015:23397` / `2015:23400`, body only, drop-shadowed) anchored at the left edge.

`_Slider/Background` variant axis (`SliderBackground`):
- `state`: `"Fill" | "Gradient"` (default `"Gradient"`)

### Token / value capture

| Element | Token / value | Light fallback | Dark fallback |
|---------|---------------|----------------|----------------|
| Track border | `--color-bordertranslucent` | rgba(0,0,0,0.1) | rgba(255,255,255,0.1) |
| Track radius | `--radius-full` | 9999px | 9999px |
| Track gap (BG → handle stack) | 8px | — | — |
| Background images | hue-gradient / checkerboard-fill (asset-backed, transparency-aware) | — | — |

`[Deferred: render — ref nodes 2015:23130 (light), 2015:23137 (dark)]` — component-dependent color-slider pair (asset-backed gradient/checkerboard backgrounds).

---

## Section 6 — Slider Gradient

Node: `2015:23144` (`_Section/Component`, 1280 × 352; Light/Dark context 704 × 275)

### Heading + description

Component Name (`2015:23146`, Whyte Regular 18px):

> Slider Gradient

Description (`2015:23147`, Whyte Book 13px), verbatim:

> Our gradient sliders contain a chit.24 component and inherits all the special properties inside (for example, a 1px stroke to separate fill from background). Functionally, this is identical to how chit.24 squares appear app-wide (for example, in the properties panel, or swatches in color libraries). They are less rounded.

### Light / Dark context (`2015:23148`)

Light panel (`2015:23149`, "LIGHT MODE" `2015:23150`) and Dark panel (`2015:23156`, "DARK MODE" `2015:23157`). Each Drop Zone (`2015:23151` light / `2015:23158` dark) holds one gradient slider with two gradient-stop chits.

**Redline annotation (left):** **Gradient** (`2015:23153` / `2015:23160`).

**Specimen layout:** a `Variant=Gradient` Slider (`2015:23152` / `2015:23159`) — a 16px-tall track whose `Slide BG Fill` (`2015:23279`) is a checkerboard + linear-gradient preview, radius `--radius-small`. Above it sit two `_Slider/Gradient stop` instances:

| Gradient stop | selected | Chit bg | Chit node (light / dark) |
|---------------|----------|---------|--------------------------|
| Left | false | `--color-bg-hover` (#f5f5f5 light / #383838 dark); inner square `--color-bg` | `2015:23154` / `2015:23161` |
| Right | true | `--color-bg-brand` (#0d99ff light / #0c8ce9 dark); inner square `--color-bg-brand` | `2015:23155` / `2015:23162` |

`_Slider/Gradient stop` variant axis (`SliderGradientStop`):
- `selected`: boolean (default false)

Each stop is a `_Chit 24` (24px, `--radius-medium`) over a `square.14` group (gradient/checkerboard/figjam-split fills) with a "Bottom, Center" pointer (12×6px) beneath.

### Token / value capture

| Element | Token / value | Light fallback | Dark fallback |
|---------|---------------|----------------|----------------|
| Track border | `--color-bordertranslucent` | rgba(0,0,0,0.1) | rgba(255,255,255,0.1) |
| Track radius | `--radius-small` | 0.125rem / 2px | 0.125rem / 2px |
| Chit container | `_Chit 24`, `--radius-medium` | 0.3125rem / 5px | 0.3125rem / 5px |
| Chit bg (default) | `--color-bg-hover` | #f5f5f5 | #383838 |
| Chit bg (selected) | `--color-bg-brand` | #0d99ff | #0c8ce9 |
| FigJam split fill | `--color-bg-figjam` | #9747ff (selected) / #8a38f5 (dark) | — |

> Note (faithful capture): The description contains a subject/verb agreement slip as authored — "a chit.24 component and inherits all the special properties." Preserved verbatim.

`[Deferred: render — ref nodes 2015:23149 (light), 2015:23156 (dark)]` — component-dependent gradient slider with chit.24 stops (asset-backed checkerboard/gradient swatches).

---

## Section 7 — Corner Smoothing

Node: `2015:23163` (`_Section/Component`, 1280 × 160)

### Heading + description

Component Name (`2015:23165`, Whyte Regular 18px):

> Corner Smoothing

Description (`2015:23166`, Whyte Book 13px), verbatim:

> We use sliders to adjust corner radius. This slider is used in the detailed view.

### Light / Dark context (`2015:23167`)

Light panel (`2015:23168`, "LIGHT MODE" `2015:23169`) and Dark panel (`2015:23173`, "DARK MODE" `2015:23174`). The light Drop Zone (`2015:23170`) holds one slider; the dark panel places its Slider (`2015:23175`) directly (no wrapping Drop Zone).

**Redline annotation (left):** **Radius** (`2015:23172` / `2015:23176`).

**Specimen (`Variant=Corner Radius`, `2015:23171` light / `2015:23175` dark):** a default-track slider whose Fill Container is `right-[65.38%]` (~35% fill) with the handle at the right edge. A "Ticks" element (`2015:23403`) carries a single 4px elliptical tick (`Ellipse 327`/`328`) positioned within a container-query-sized region (`right-[28.37%]`), rotated 180° / x-flipped — denoting the rounding indicator.

`SliderProps` (Corner Radius):
- `variant`: `"Corner Radius"`
- `knobPosition`: `"1"`

### Token / value capture

| Element | Token / value | Light fallback | Dark fallback |
|---------|---------------|----------------|----------------|
| Track bg | `--color-bg-secondary` | #f5f5f5 | #383838 |
| Track border | `--color-bordertranslucent` | rgba(0,0,0,0.1) | rgba(255,255,255,0.1) |
| Track radius | `--radius-full` | 9999px | 9999px |
| Fill container | `--color-bg-brand` | #0d99ff | #0c8ce9 |
| Tick | 4px ellipse (`Ellipse 327`/`328`) | — | — |
| Handle | Stroke (Modified) (`2015:23406`) | — | — |

`[Deferred: render — ref nodes 2015:23168 (light), 2015:23173 (dark)]` — component-dependent corner-radius slider with ellipse tick.

---

## Section 8 — Disabled

Node: `2015:23177` (`_Section/Component`, 1280 × 160)

### Heading + description

Component Name (`2015:23179`, Whyte Regular 18px):

> Disabled

Description (`2015:23180`, Whyte Book 13px), verbatim (trailing space as authored):

> In some cases, the slider can take on a disabled state when dealing with GIFs and Videos. This state is triggered when the media content is uploaded and auto plays. 

### Light / Dark context (`2015:23181`)

Light panel (`2015:23182`, "LIGHT MODE" `2015:23183`) and Dark panel (`2015:23187`, "DARK MODE" `2015:23188`). Each Drop Zone (`2015:23184` light / `2015:23189` dark) holds one disabled slider.

**Redline annotation (left):** **Disabled** (`2015:23186` / `2015:23191`).

**Specimen (`Variant=Disabled`, `2015:23185` light / `2015:23190` dark):** default track (`--color-bg-secondary` / border `--color-bordertranslucent`, `--radius-full`), no fill container, with the handle (`2015:23284`) anchored at the left edge. The handle here uses a non-shadowed body asset (the disabled handle, no drop-shadow vs. the active handles elsewhere).

`SliderProps` (Disabled):
- `variant`: `"Disabled"`
- `knobPosition`: `"1"`

### Token / value capture

| Element | Token / value | Light fallback | Dark fallback |
|---------|---------------|----------------|----------------|
| Track bg | `--color-bg-secondary` | #f5f5f5 | #383838 |
| Track border | `--color-bordertranslucent` | rgba(0,0,0,0.1) | rgba(255,255,255,0.1) |
| Track radius | `--radius-full` | 9999px | 9999px |
| Handle | disabled handle (`2015:23284`, no drop-shadow) | — | — |

`[Deferred: render — ref nodes 2015:23182 (light), 2015:23187 (dark)]` — component-dependent disabled slider.

---

## Section 9 — Handle States

Node: `2015:23192` (`_Section/Component`, 1280 × 268)

### Heading + description

Component Name (`2015:23194`, Whyte Regular 18px):

> Handle States

Description (`2015:23195`, Whyte Book 13px), verbatim (double period as authored):

> The handle contains different state depending on if a value is changed from its default position. It also contains a form that can house a fill color behind it.. these are typically most prominent when choosing colors or adjusting corner radius. The handle also contains a focused state.

### Light / Dark context (`2015:23196`)

Light panel (`2015:23197`, "LIGHT MODE" `2015:23198`) and Dark panel (`2015:23216`, "DARK MODE" `2015:23217`). Each DZ (`2015:23199` light / `2015:23218` dark) is a two-column layout: a column of seven redline labels (`Frame 2608806`, gap 12px) beside a column of seven `_Slider/Handle` specimens (`Frame 2608807`, gap 12px).

**Redline labels (top→bottom), `_Label/Redline/State-Left` (light `2015:23201`–`2015:23207` / dark `2015:23220`–`2015:23226`):**

1. **Default**
2. **Disabled**
3. **Modified**
4. **Focused**
5. **Focused, Modified**
6. **Color**
7. **Focused, Color**

**The 7 handle specimens (`_Slider/Handle`, light `2015:23209`–`2015:23215` / dark `2015:23228`–`2015:23234`), all 16×16px:**

| Row | State | Handle variant / treatment |
|-----|-------|----------------------------|
| Default | `Fill (Default)` / `Default` | solid body, drop-shadowed (`2015:23236`) |
| Disabled | `Fill (Default)` / `Disabled` | solid body, **no** drop-shadow (`2015:23239`) |
| Modified | `Stroke (Modified)` / `Default` | body + hole punch, no drop-shadow (`2015:23246`) |
| Focused | `Fill (Default)` + focus ring asset | drop-shadowed (`2015:23212`) |
| Focused, Modified | `Stroke (Modified)` / `Focused` | body + hole punch + focus ring (`2015:23258`) |
| Color | `Fill (Default)` body + `_Chit 24` circle.16 fill | drop-shadowed; circle.16 `--color-bg-assistive` (#ff24bd light / #f316b0 dark), 8px (`2015:23214`) |
| Focused, Color | focus body + `_Chit 24` circle.16 + `border.circle` `--color-bordertranslucent` | drop-shadowed (`2015:23215`) |

`_Slider/Handle` variant axes (`SliderHandle`):
- `variant`: `"Fill (Default)" | "Stroke (Modified)"` (default `"Fill (Default)"`)
- `state`: `"Default" | "Focused" | "Disabled"` (default `"Default"`)

The "Color" / "Focused, Color" rows additionally embed a `_Chit 24` (`circle.16`) swatch inside the handle body; the focused color variant adds a 0.5px `border.circle` (`--color-bordertranslucent`).

### Token / value capture

| Element | Token / value | Light fallback | Dark fallback |
|---------|---------------|----------------|----------------|
| Handle drop-shadow | `0px 0px 0.25px rgba(0,0,0,0.18), 0px 3px 4px rgba(0,0,0,0.1), 0px 1px 1.5px rgba(0,0,0,0.1)` | — | — |
| Color swatch (circle.16) | `--color-bg-assistive` | #ff24bd | #f316b0 |
| Color swatch border | `--color-bordertranslucent` | rgba(0,0,0,0.1) | rgba(255,255,255,0.1) |
| Redline label bg | `--color-bg-assistive-tertiary` | #ffe0fc | #68275e |
| Redline label text | `--color-text-assistive` | #ea10ac | #fc9ce0 |

`[Deferred: render — ref nodes 2015:23197 (light), 2015:23216 (dark)]` — component-dependent 7-row handle-state column (asset-backed handle bodies, focus rings, hole punches).

---

## Cross-section token summary (captured values)

Color variables referenced across the page (var → light fallback / dark fallback where both observed):

- `--color-bg`: white / #2c2c2c
- `--color-bg-secondary`: #f5f5f5 / #383838
- `--color-bg-brand`: #0d99ff / #0c8ce9
- `--color-bg-hover`: #f5f5f5 / #383838
- `--color-bg-figjam`: #9747ff (selected) / #8a38f5 (dark)
- `--color-bg-assistive`: #ff24bd / #f316b0 (also #ff24bd in light "Color" row)
- `--color-bg-assistive-tertiary`: #ffe0fc / #68275e
- `--color-bordertranslucent`: rgba(0,0,0,0.1) / rgba(255,255,255,0.1)
- `--color-text-assistive`: #ea10ac / #fc9ce0

Dimension/radius tokens:
- `--radius-full`: 9999px — default/range/stepper/color/corner track radius
- `--radius-medium`: 0.3125rem (5px) — `_Chit 24` container (gradient stop)
- `--radius-small`: 0.125rem (2px) — gradient-track BG, square.14
- Track: 208 × 16px (min width 100px per component note); Handle: 16 × 16px; Tick: 4 × 4px
- Fill container radius: 8px
- Redline label: px 3 / py 2, radius 2px, 6px rotated-diamond pointer

Component variants observed (single `Slider` master `2015:23280`, plus sub-components):
- Slider `variant`: `"Range" | "Slider" (Delta) | "Stepper" | "Color Range" | "Gradient" | "Corner Radius" | "Disabled"`
- Slider `knobPosition`: `"1"–"5"` (Range/Delta/Stepper); `"1"` only (Color/Gradient/Corner/Disabled)
- `_Slider/Background` `state`: `"Fill" | "Gradient"`
- `_Slider/Handle` `variant`: `"Fill (Default)" | "Stroke (Modified)"`; `state`: `"Default" | "Focused" | "Disabled"`
- `_Slider/Gradient stop` `selected`: boolean
