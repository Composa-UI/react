<!--
Source: Figma "Visual Bells" page — fileKey 4kilp0ShQiYsoUPJdleqEH, entry node 2015:40421
1:1 import — raw, pre-organization. Faithful capture, not synthesis. Re-organize into tabs later.
Frames transcribed: 2015:43036 (Bells Guidelines — full design context), 2015:43792 (Bell Variants Guidelines — metadata only, see note), 2015:42989 (Bell component def), 2015:43085 (Bell Multiplayer component def)

MCP NOTE: get_metadata succeeded for the whole page. get_design_context initially succeeded for 2015:43036 only; the remaining three frames were deferred after a rate limit. Those have since been fetched via get_design_context and the previously-blocked sections are now captured (Frame B 2015:43792, Bell def 2015:42989, Bell Multiplayer def 2015:43085).
-->

# Visual Bells — Guidelines (1:1 Figma import)

Page: `2015:40421` "Visual Bells". Top-level contains two guideline frames and two component-definition frames:

- `2015:43036` "Bells Guidelines" (1280 × 1472) — single-player Bell guidelines. Full design context captured.
- `2015:43792` "Bell Variants Guidelines" (1280 × 2560) — variants, multiplayer, colors. Full design context captured.
- `2015:42989` "Bell" (355 × 216) — Bell component definition (symbols). Full design context captured.
- `2015:43085` "Bell Multiplayer" (364 × 1704) — Bell Multiplayer component definition (symbols). Full design context captured.

Doc text styles present across the page (from style table):
- `.doc/title`: Whyte, Regular, size 36, weight 400, lineHeight 32, letterSpacing 1
- `.doc/heading`: Whyte, Regular, size 18, weight 400, lineHeight 32, letterSpacing 1
- `_doc/description`: Whyte, Book, size 13, weight 350, lineHeight 22, letterSpacing 1
- `_doc/body/body.medium`: family `body/medium/fontFamily`, Medium, size `body/medium/fontSize`, weight `body/medium/fontWeight`, lineHeight `body/medium/lineHeight`, letterSpacing 0.5
- `_doc/body/body.medium.strong`: family `body/medium/strong/fontFamily`, Semi Bold, size `body/medium/strong/fontSize`, weight `body/medium/strong/fontWeight`, lineHeight `body/medium/strong/lineHeight`, letterSpacing 0.5
- `light/elevation-100-canvas` (effect): drop shadow #00000026 offset (0,1) radius 3 spread 0; drop shadow #0000004D offset (0,0) radius 0.5 spread 0
- `light/text/measure/default`: #DC3412
- `light/bg/measure/tertiary`: #FFE2E0

---

# Frame A — "Bells Guidelines" (`2015:43036`, 1280 × 1472)

Vertical stack (gap 64px, pb 64px) on `--color-bg` (white). Contains a `_Status` instance bar (`2359:123630`, label "UI3"), a `_Doc/Heading` (`2661:34165`), and two `Section` frames.

## Heading (`_Doc/Heading` 2661:34165)

Component Name (`2661:34167`, Whyte Regular 36px, color rgba(0,0,0,0.9), tracking 0.36px):

> Bells

Description (`2661:34168`, Whyte Regular 18px, color rgba(0,0,0,0.5), tracking 0.18px, width 412px), verbatim:

> A message that appears over the page without preventing interaction with the page that removes itself after some time.

---

## Section A1 — Alignment

Node: `2015:43039` (`Section`, 1280 × 480)

### Heading + description

Component Name (`2015:43041`, Whyte Regular 18px, color rgba(0,0,0,0.9), tracking 0.18px, width 320px):

> Alignment

Description (`2015:43042`, Whyte Book 13px, color rgba(0,0,0,0.6), tracking 0.13px, width 320px), verbatim:

> c

> Note (faithful capture): the description text is literally the single character "c" in source — placeholder/unfinished. Preserved as-is.

### Light context (`2015:43043`, bg `--color-bg-secondary` #f5f5f5, radius 13px, inset [0 64px 0 512px])

Contains two specimens:

1. A `design.toolbar` instance (`2661:33531`, 420 × 48) — white pill, radius 13px, `light/elevation-100-canvas` shadow, centered, bottom 12px. A `Tools` group (`2661:33532`) of seven `_design.toolbar.button`s plus a `_design.toolbar.modeToggle` (`2661:34115`, white, 1px left border #e6e6e6, 64px). Buttons 1–4 are split buttons (icon + `icon.24.chevron.down`); buttons 5–7 are single-icon. Button 1's icon tile is active (bg #0d99ff). The mode toggle holds a Switch (`2661:34116`, 40 × 24, bg #f5f5f5, radius 5px) with a Knob (`2661:34117`, 22 × 22, white, radius 4px, elevation shadow) carrying `icon.24.dev` (`2661:34137`).

2. A `Bell` instance (`2015:43055`, h 40, centered, bottom 68px) — the "Default messaging bell" specimen. See Bell anatomy below.

> Note: this section pairs the editor toolbar with a Bell to show vertical alignment of the floating Bell above the toolbar. The description prose is not yet authored (see "c" above).

---

## Section A2 — Anatomy

Node: `2015:43056` (`Section`, 1280 × 480)

### Heading + description

Component Name (`2015:43058`, Whyte Regular 18px):

> Anatomy

Description (`2015:43059`, Whyte Book 13px), verbatim:

> A toast consists of two zones: a label and a button rail. These two zones have 8px of space between them. Within the zones, there's 4px of space. This is important to convey spatial rhythm and placement consistency across the system.

### Light context (`2015:43060`, bg `--color-bg-secondary` #f5f5f5, radius 13px)

A Drop Zone (`2015:43061`, flex-col gap 24px) holds two Bell specimens, plus redline measure annotations and two guide lines.

Bell specimens:
- `2015:43062` — Bell with label only. Label text: **"Plugin text goes here"**.
- `2015:43063` — Bell with label + CTA Rail (Action button + Close). Label text: **"Label goes here"**.

Redline annotations (`_Label/Redline/Text` + `_Label/Redline/Horizontal Bar`):

| Node | Value | Meaning |
|------|-------|---------|
| `2015:43065` | 12 | (measure) |
| `2015:43068` | 8 | space between label zone and button rail |
| `2015:43071` | 8 | space between label zone and button rail |
| `2015:43074` | 4 | within-zone spacing (tertiary/danger-styled label: bg #ffe2e0, text #dc3412) |
| `2015:43077` | 4 | within-zone spacing (tertiary/danger-styled label) |
| `2015:43081` / `2015:43082` | "Label" | zone label (two overlapping instances) |
| `2015:43083` | "Label" | zone label |
| `2015:43084` | "CTA Rail" | zone label |

Two vertical guide lines: `2015:43064` (height 246) and `2015:43080` (height 479).

Redline measure tokens: standard measure labels use `--color-bg-measure` (#f24822) with text `--color-text-onmeasure` (white); the "4" within-zone labels use bg #ffe2e0 (`light/bg/measure/tertiary`) with text #dc3412 (`light/text/measure/default`). Redline text is Inter Medium 11px, tracking 0.055px, lineHeight 12px.

---

## Bell component — anatomy (captured from the rendered instances in Frame A)

The `Bell` instance renders as a horizontal pill on `--color-bg` (#2c2c2c in dark fallback shown here), h 40px, items-center, px `--spacer-2` (8px), gap `--spacer-2`, radius `--radius-large` (0.8125rem / 13px), with `light/elevation-100-canvas` shadow (`0px 0px 0.5px rgba(0,0,0,0.3), 0px 1px 3px rgba(0,0,0,0.15)`).

Internal structure (`Label` → `Content`):
- **Leading icon**: `icon.24.placeholder.small` (24px box, inner glyph 15.803px at 4.1px offset).
- **Content** row:
  - **4px Text Wrap** (`2015:42994`): px `--spacer-1` (4px), gap `--spacer-2`. Label text uses `body/medium/strong` (Inter Semi Bold 11px, weight 550, lineHeight 16px, tracking 0.055px), color `--color-text` (white on dark bg).
  - **CTA Rail** (`2015:42997`, optional): pl `--spacer-1` (4px), gap 8px, justify-end. Contains:
    - **Button(s)** (`2015:42998`, `2015:42999`): h 24px, border `--color-border-translucent` (rgba(255,255,255,0.1)), px `--spacer-2`, py `--spacer-1`, radius `--radius-medium` (0.3125rem / 5px). Text "Action", `body/medium` (Inter Medium 11px, weight 450, lineHeight 16px). One or two Action buttons depending on variant.
    - **Close** (`2015:43000`): a 1px divider bar `--color-border-fs` (#444), h 40px, then `icon.24.close` (24px box, inner glyph 11px).

Bell label strings observed across Frame A: "Default messaging bell", "Plugin text goes here", "Label goes here".

---

# Frame B — "Bell Variants Guidelines" (`2015:43792`, 1280 × 2560)

Contains a `_Status` bar (`2359:123640`), a `_Doc/Heading` (`2661:34161`), and four `Section` frames.

## Heading (`_Doc/Heading` 2661:34161)

Component Name (`2661:34163`):

> Bell Variants

Description (`2661:34164`), verbatim:

> Our toasts come in various shapes and sizes. Here are some examples that could be useful for conveying feedback on user-initiated actions.

---

### Section B1 — Heads-up (`2015:43795`, 1280 × 480)

Description block `2015:43796`. Component Name (`2015:43797`, 320px):

> Heads-up

Description (`2015:43798`, 320px × 110), verbatim:

> A heads-up toast quickly informs you about user-initiated actions. For example, it notifies you if a file was deleted, a library was published, or if there's accompanying plugin text. It communicates all of this without interrupting your workflow.

Light panel `2015:43799`. Drop zone `2015:43800` holds 5 `Bell` instances (`2015:43801`–`2015:43805`); `2015:43802` is hidden. Widths vary 223–323px. The four visible Bells enumerate heads-up content variants, with these label strings (top to bottom):

| Node | Label | Structure |
|------|-------|-----------|
| `2015:43801` | "Publishing library" | label + two Action buttons |
| `2015:43803` | "You will be notified about replies" | label only (no CTA rail) |
| `2015:43804` | "File deleted" | label + two Action buttons |
| `2015:43805` | "Default messaging bell" | label + two Action buttons |

### Section B2 — Tabular Numbers (`2015:43806`, 1280 × 480)

Description `2015:43807`. Component Name (`2015:43808`):

> Tabular Numbers

Description (`2015:43809`, ×88), verbatim:

> Occasionally, toasts will contain tabular numbers (such as cases when you need to export large images and there's a queue). This helps ensure that it's easily digestible.

Light `2015:43810`. Drop zone `2015:43811` holds 2 `Bell` instances (`2015:43812`, `2015:43813` hidden). The visible Bell carries label "Default messaging bell" plus two Action buttons; this section demonstrates the optional tabular `count` slot (e.g. "1/134", rendered in `body/medium` `--color-text-secondary` rgba(255,255,255,0.7) — see Bell component def `count` prop below).

### Section B3 — Multiplayer (`2015:43814`, 1280 × 480)

Description `2015:43815`. Component Name (`2015:43816`):

> Multiplayer

Description (`2015:43817`, ×88), verbatim:

> A multiplayer toast displays simple alerts when you join someone else's presented file. It's an efficient way to start following the presenter through the canvas.

Light `2015:43818`. Three `Multi` columns each holding 5 `Bell Multiplayer` instances, one per `State` (Waiting → Followers → Spotlight → Spotlight Following → Spotlight Load):
- `2015:43819` (center): `2015:43820`–`2015:43824`
- `2015:43825` (right, x 620): `2015:43826`–`2015:43830`
- `2015:43831` (left, x −200): `2015:43832`–`2015:43836`

Label / button copy observed per state (see Bell Multiplayer component def below): Waiting → "Waiting for followers" + "Cancel"; Followers → "16 followers" + "Stop"; Spotlight → "Spotlight on Tim Van Damme" + "Follow" + close icon; Spotlight Following → "Spotlight on Tim Van Damme" + "Stop following"; Spotlight Load → "Spotlight on Tim Van Damme. Following…" + "Not now".

Plus a `Colors` row (`2015:43837`, 384 × 48) of 7 swatch ellipses (`2015:43838`–`2015:43844`, 48px each) — maps to the 7 Bell Multiplayer color variants (Blue, Green, Purple, Red, Pink, Grey, Yellow — see component def below).

### Section B4 — Error (`2015:43845`, 1280 × 480)

Description `2015:43846`. Component Name (`2015:43847`):

> Error

Description (`2015:43848`, ×88), verbatim:

> In exceptional cases, we use the error bell to communicate data loss. It's usually complemented by an explicit close button and it's persistent until closed by the user.

Light `2015:43849`. Drop zone `2015:43850` (468 × 248) holds 5 `Bell` instances (`2015:43851`–`2015:43855`), increasing widths 146→452px. These walk up the Bell anatomy from danger-state to fully-loaded, with label strings (top to bottom):

| Node | Label | Structure |
|------|-------|-----------|
| `2015:43851` | "Danger messaging bell" | Danger state, label only |
| `2015:43852` | "Message Bell with Icon" | icon + label |
| `2015:43853` | "Message Bell with Icon and Action" | icon + label + one Action |
| `2015:43854` | "Message Bell with Icon and Two Actions" | icon + label + two Actions |
| `2015:43855` | "Message Bell with Icon and Two Actions, Close" | icon + label + two Actions + Close |

---

# Bell component definition (`2015:42989`, 355 × 216)

`👥 Variant` × `🐣 State` symbol set:

| Symbol node | Variant | State |
|-------------|---------|-------|
| `2015:42990` | Default | Default |
| `2015:43004` | Message | Default |
| `2015:43011` | Message w Dismiss | Default |
| `2015:43022` | Default | Danger |

Variant axes:
- `Variant`: `Default | Message | Message w Dismiss`
- `State`: `Default | Danger`

Additional boolean/slot props (from the component's generated prop set): `icon1` (show leading icon, default true), `icon` (icon slot override, default null → `icon.24.placeholder.small`), `count` (show tabular count, default false), `ctaRail` (show CTA rail, default true), `cta1` / `cta2` (show first/second Action button, default true), `close` (show Close, default true).

### Surface

Pill, h 40px, items-center, overflow-clip, px `--spacer-2` (8px), gap `--spacer-2`, radius `--radius-large` (0.8125rem / 13px), shadow `0px 0px 0.5px rgba(0,0,0,0.3), 0px 1px 3px rgba(0,0,0,0.15)` (`light/elevation-100-canvas`).
- **Default / Default** + **Message / Default** + **Message w Dismiss / Default**: bg `--color-bg` (#2c2c2c dark fallback).
- **Default / Danger** (`2015:43022`): bg `--color-bg-danger` (#f24822), py 8px.

### Symbol contents (verbatim copy + structure)

- **Default / Default** (`2015:42990`): leading `icon.24.placeholder.small` (`2015:42992`, 24px box, inner glyph 15.803px at 4.1px offset) → `Content` (`2015:42993`) → `4px Text Wrap` (`2015:42994`, px `--spacer-1`/4px, gap `--spacer-2`) with label **"Default messaging bell"** (`2015:42995`, `body/medium/strong`, `--color-text` white) and optional `count` "1/134" (`2015:42996`, `body/medium`, `--color-text-secondary` rgba(255,255,255,0.7)). `CTA Rail` (`2015:42997`, pl `--spacer-1`, gap 8px, justify-end): two `Button`s (`2015:42998`, `2015:42999`) — h 24px, border `--color-border-translucent` rgba(255,255,255,0.1), px `--spacer-2`, py `--spacer-1`, radius `--radius-medium` (5px), text "Action" (`body/medium`, white) — then `Close` (`2015:43000`): 1px × 40px divider `--color-border-fs` (#444) + `icon.24.close` (`2015:43002`, inner glyph 11px).
- **Message / Default** (`2015:43004`): `Content` (`2015:43005`) → `4px Text Wrap` (`2015:43007`, px `--spacer-2`/8px) with label **"Message only"** (`2015:43008`) and optional `count`. No CTA rail / icon by default — message-only body.
- **Message w Dismiss / Default** (`2015:43011`): `Content` (`2015:43013`) → `4px Text Wrap` (`2015:43014`, px `--spacer-1`/4px) with label **"Message with explicit dismiss"** (`2015:43015`). `CTA Rail` (`2015:43017`, h 24px, justify-end) containing only `Close` (`2015:43018`): 1px × 40px `--color-border-fs` divider + `icon.24.close` (`2015:43020`).
- **Default / Danger** (`2015:43022`): leading `icon.24.placeholder.small` (`2015:43024`) → `Content` (`2015:43025`) → `4px Text Wrap` (`2015:43026`) with label **"Danger messaging bell"** (`2015:43027`, `--color-text-ondanger` white) and optional `count` (`--color-text-secondary` rgba(0,0,0,0.5)). `CTA Rail` (`2015:43029`, h 24px): two `Button`s (`2015:43030`, `2015:43031`) — border `--color-border-translucent` rgba(0,0,0,0.1), text "Action" (`--color-text-ondanger` white) — then `Close` (`2015:43032`): divider bg `--color-border-translucent` rgba(0,0,0,0.1) + `icon.24.close` (`2015:43034`).

---

# Bell Multiplayer component definition (`2015:43085`, 364 × 1704)

`🐣 State` × `🎛️ Color` symbol set — 35 symbols (5 states × 7 colors).

- `State`: `Waiting | Followers | Spotlight | Spotlight Load | Spotlight Following`
- `Color`: `Blue | Green | Purple | Red | Pink | Grey | Yellow`

Symbol nodes (Blue block, repeated per color): Waiting `2015:43086`, Followers `2015:43104`, Spotlight `2015:43122`, Spotlight Load `2015:43142`, Spotlight Following `2015:43163`. Green starts `2015:43184`, Purple `2015:43302`, Red `2015:43400`, Pink `2015:43498`, Grey `2015:43596`, Yellow `2015:43694` (each color following the same 5-state order). All symbols 40px tall; widths by state: Waiting 189, Followers 133, Spotlight 283, Spotlight Load 332, Spotlight Following 297.

### Surface

Pill, h 40px, items-center, overflow-clip, py 8px, radius 13px, shadow `0px 0px 0.5px rgba(0,0,0,0.3), 0px 1px 3px rgba(0,0,0,0.15)`. Each Bell wraps a `Wrapper 8px bw` (gap 8px) holding a `Label` group and a `CTA Rail`. The `Waiting`, `Spotlight Load`, and `Spotlight Following` states render a 40 × 56px `Loader` bar absolutely positioned at top-left (the indeterminate progress fill), tinted with the row's solid multiplayer color.

### Copy per state (verbatim)

| State | Label text | Action / button text | Trailing |
|-------|-----------|----------------------|----------|
| Waiting | "Waiting for followers" | "Cancel" | — |
| Followers | "16 followers" | "Stop" | — |
| Spotlight | "Spotlight on Tim Van Damme" | "Follow" | `icon.24.spotlight.small` (leading) + `icon.24.close` (trailing) |
| Spotlight Following | "Spotlight on Tim Van Damme" | "Stop following" | `icon.24.spotlight.small` |
| Spotlight Load | "Spotlight on Tim Van Damme. Following…" | "Not now" | `icon.24.spotlight.small` |

Label text is `body/medium` (Inter Medium 11px, weight 450, lineHeight 16px, tracking 0.055px). Across colors the label uses `--color-text-onbrand` (white); for **Yellow** in Waiting / Followers / Spotlight / Spotlight Load it switches to `--color-text` (rgba(0,0,0,0.9)) for contrast (the Yellow / Spotlight Following label remains a dark variant via node `2015:43776`).

### Color tokens (surface vs. action-button vs. loader)

Each color resolves to a "bright" mid-ramp surface (Waiting/Followers/Spotlight) and a darker ramp shade for the loader/Spotlight-Load/Spotlight-Following surface, plus a deep ramp shade for the action `Button`:

| Color | Surface (Followers / Spotlight) | Loader / dark surface | Action button bg |
|-------|---------------------------------|------------------------|------------------|
| Blue | `--color-multiplayer-blue` #007be5 | `--ramp-blue-700` #0768cf | `--ramp-blue-900` #093077 |
| Green | `--color-multiplayer-green` #14ae5c | `--ramp-green-600` #009951 | `--ramp-green-900` #024626 |
| Purple | `--color-multiplayer-purple` #9747ff | `--ramp-purple-700` #7c2bda | `--ramp-purple-900` #4b0d87 |
| Red | `--color-multiplayer-red` #f24822 | `--ramp-red-700` #bd2915 | `--ramp-red-900` #771208 |
| Pink | `--color-multiplayer-pink` #ff24bd | `--ramp-pink-700` #cb0b96 | `--ramp-pink-900` #5f114c |
| Grey | `--color-multiplayer-grey` #667799 | `--ramp-pale_blue-700` #4a5878 | `--ramp-pale_blue-900` #252d41 |
| Yellow | `--color-multiplayer-yellow` #ffcd29 | `--ramp-yellow-700` #fab815 | `--ramp-pale_yellow-700` #7a5800 |

The action `Button` is h 24px, px `--spacer-2`, py `--spacer-1`, radius `--radius-medium` (5px), drop-shadow `0px 4px 2px rgba(0,0,0,0.25)`, text `--color-text-onbrand` (white). The Waiting / Followers buttons additionally carry a 0.5px border `--color-border-translucent` (rgba(0,0,0,0.1)). The Spotlight close `icon.24.close` (`2015:43141` Blue) inner glyph is 11px; `icon.24.spotlight.small` inner glyph is 13.586px at (5.41, 5) offset.

---

## Cross-section token summary (captured values)

From Frame A + Frame B design context, the two component defs, and the page style table.

Color variables:
- `--color-bg`: white (page) / #2c2c2c (Bell surface dark fallback)
- `--color-bg-secondary`: #f5f5f5 — section "Light" panel
- `--color-bg-danger`: #f24822 — Danger-state Bell surface
- `--color-text`: white (on dark Bell) / rgba(0,0,0,0.9) (Yellow multiplayer label) — Bell label/button text
- `--color-text-secondary`: rgba(255,255,255,0.7) on dark, rgba(0,0,0,0.5) on danger — tabular `count` text
- `--color-text-onbrand`: white — multiplayer label/button text
- `--color-text-ondanger`: white — Danger Bell label/button text
- `--color-border-translucent`: rgba(255,255,255,0.1) on dark / rgba(0,0,0,0.1) on danger + multiplayer Waiting/Followers button border
- `--color-border-fs`: #444 — Bell Close divider
- `--color-bg-measure`: #f24822 — redline label bg
- `--color-text-onmeasure`: white — redline label text
- `light/bg/measure/tertiary`: #ffe2e0 — within-zone "4" redline bg
- `light/text/measure/default`: #dc3412 — within-zone "4" redline text
- Toolbar active tile: #0d99ff; toolbar borders: #e6e6e6

Multiplayer color variables (surface / dark / button — see Bell Multiplayer def table):
- `--color-multiplayer-blue` #007be5, `--ramp-blue-700` #0768cf, `--ramp-blue-900` #093077
- `--color-multiplayer-green` #14ae5c, `--ramp-green-600` #009951, `--ramp-green-900` #024626
- `--color-multiplayer-purple` #9747ff, `--ramp-purple-700` #7c2bda, `--ramp-purple-900` #4b0d87
- `--color-multiplayer-red` #f24822, `--ramp-red-700` #bd2915, `--ramp-red-900` #771208
- `--color-multiplayer-pink` #ff24bd, `--ramp-pink-700` #cb0b96, `--ramp-pink-900` #5f114c
- `--color-multiplayer-grey` #667799, `--ramp-pale_blue-700` #4a5878, `--ramp-pale_blue-900` #252d41
- `--color-multiplayer-yellow` #ffcd29, `--ramp-yellow-700` #fab815, `--ramp-pale_yellow-700` #7a5800

Effects (Frame B style table adds):
- `light/elevation-200-canvas`: drop shadow #0000001A offset (0,1) radius 3; drop shadow #0000001A offset (0,3) radius 8; drop shadow #0000002E offset (0,0) radius 0.5
- Multiplayer action button drop shadow: `0px 4px 2px rgba(0,0,0,0.25)`

Dimension / radius tokens:
- `--spacer-0`: 0rem
- `--spacer-1`: 0.3rem (4px) — within-zone gap / button padding
- `--spacer-2`: 0.5rem (8px) — Bell px, zone gap
- `--radius-medium`: 0.3125rem (5px) — Bell action button radius
- `--radius-large`: 0.8125rem (13px) — Bell pill radius, section panel radius
- Bell height: 40px; leading icon box: 24px; CTA button height: 24px; Close divider: 1px × 40px
