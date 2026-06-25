<!--
Source: Figma "Cursors" page — fileKey 4kilp0ShQiYsoUPJdleqEH, entry node 2012:308131
1:1 import — raw, pre-organization. Faithful capture, not synthesis. Re-organize into tabs later.
Frames transcribed: 2012:308132 (intro), 2012:308164 (Cursors grid), 2012:309316/2012:309319 (Multiplayer), 2680:7602/2680:7605 (System macOS), 2012:309386/2680:8648 (Chat)
Note: this is a Figma-product-specific cursor inventory (Figma UI3). Captured faithfully; clean/de-Figma-ify later.
Anomaly: Figma MCP rate limit hit mid-import — most per-cursor specimens could not be opened individually with get_design_context. The full cursor inventory (symbol name + node id) below is taken verbatim from get_metadata, which is complete. Prose, styles, and card structure were captured from get_design_context on a representative subset.
Follow-up pass: the previously-blocked items were re-fetched and filled in place — the "Frame 5" section header (node 2012:309388) reads "Cursor chat", and all seven chat-bubble color variants were opened individually to confirm their per-variant ramp tokens (Section 5). Remaining `[Deferred: render]` markers are intentional render-specimen deferrals (the visual cursor images); their inventory/geometry/token data was captured non-deferred.
-->

# Cursors — Guidelines (1:1 Figma import)

Page frame: `2012:308131` "Cursors" (1096 × 4464). A single vertically-stacked guideline page (no `_Status` bar observed). Structure top→bottom: an intro/header (`2012:308132`), a large "Cursors" inventory grid (`2012:308164`), then three more titled inventory grids — "Multiplayer cursors" (`2012:309316` heading + `2012:309319` grid), "System (macOS) cursors" (`2680:7602` heading + `2680:7605` grid), and a final chat-bubble cursor grid (`2012:309386` heading + `2680:8648` grid).

Doc text styles present across the page:
- `_doc/title`: Whyte, Regular, size 36, weight 400, lineHeight 32, letterSpacing 1
- `_doc/heading`: Whyte, Regular, size 18, weight 400, lineHeight 32, letterSpacing 1
- `_doc/body/body.large.strong`: family `body/large/strong/fontFamily`, Medium, size `body/large/strong/fontSize`, weight `body/large/strong/fontWeight`, lineHeight `body/large/strong/lineHeight`, letterSpacing -0.25 (used inside chat-bubble cursors)

Each cursor "card" (`Cursor` frame, 128 × 160, except chat cards which are 296 × 160) has the same structure:
- A name label (`Component Name`, Whyte Book 13px, color rgba(0,0,0,0.6), tracking 0.13px, single-line ellipsis) whose text is the cursor symbol's name verbatim (e.g. `cursor-black`).
- A `Preview` tile (128 × 128) with background `--color-bg-secondary` (#f5f5f5), radius 13px, holding a 32 × 32 cursor symbol centered (offset left/top 48px within the 128 tile; chat previews offset 32px).

---

## Section 1 — Intro / header

Node: `2012:308132` ("Frame 3", 968 × 152). Row layout, gap 64px, items centered.

### Heading + description

Component Name (`2012:308134`, Whyte Regular 36px, color `--color-text` rgba(0,0,0,0.9), tracking 0.36px):

> Cursors

Description (`2012:308135`, Whyte Regular 18px, color `--color-text-secondary` rgba(0,0,0,0.5), tracking 0.18px), verbatim:

> Collection of all Figma UI3 cursors.

### Cursor drawing guide callout

Node: `2012:308137` ("Frame 2", 196 × 152). Card with background `--color-bg-secondary` (#f5f5f5), radius 13px, padding pt-24 / pb-16 / px-32, column layout gap 16px, centered. Contains:

- A `_cursor-guide` symbol (`2012:308138`, 64 × 64) — a redline construction diagram of the default cursor: base vector (`2012:308139`), two 90.51px diagonal guide lines at rotate 45° (`2012:308140`) and rotate 135° / flipped-Y (`2012:308141`), a hotspot 8px ellipse at (28,28) (`2012:308142`), a 14px `Union` at (30.5,30.5) (`2012:308143`), a 13px ellipse at (41,41) (`2012:308146`), and two red 0.25px construction outlines — a 15px square at (30,19) (`2012:308149`) and a 17px rounded-10px square at (29,18) (`2012:308150`).
- Caption (`2012:308163`, Whyte Book 13px, color rgba(0,0,0,0.6), tracking 0.13px, centered), verbatim:

  > Cursor drawing guide

`[Deferred: render — ref node 2012:308138]` — component-dependent redline cursor-construction specimen. Geometry/token data above captured non-deferred.

---

## Section 2 — Cursors (main inventory)

Heading: none separate (this grid sits directly under the intro). Grid node: `2012:308164` ("Cursors", 968 × 2160). A 6-column grid of `Cursor` cards (128 × 160 each, 168px column pitch, 200px row pitch).

Each entry below is `Cursor` frame → contained symbol name (the card's visible label) / symbol node id. All previews are 32 × 32 symbols on the standard `--color-bg-secondary` tile.

| Card node | Cursor name (label = symbol) | Symbol node |
|-----------|------------------------------|-------------|
| `2012:308165` | cursor-black | `2012:308168` |
| `2012:308178` | cursor-black-move | `2399:4720` |
| `2012:308196` | cursor-origin | `2399:4784` |
| `2012:308215` | cursor-bend | `2399:4847` |
| `2012:308233` | cursor-black-move-h | `2399:4909` |
| `2012:308250` | cursor-black-move-v | `2399:4971` |
| `2012:308267` | cursor-paint-bucket-insert | `2399:5355` |
| `2012:308282` | cursor-paint-bucket-remove | `2399:5295` |
| `2012:308297` | cursor-paint-bucket | `2399:5235` |
| `2012:308312` | cursor-resize-padding-bounded | `2399:5175` |
| `2012:308326` | cursor-click | `2399:5116` |
| `2012:308366` | cursor-comments-pin | `2399:5031` |
| `2012:308381` | cursor-duplicate-snap | `2399:5419` |
| `2012:308400` | cursor-duplicate | `2399:5482` |
| `2012:308418` | cursor-dropper | `2399:5544` |
| `2012:308435` | cursor-eraser | `2399:5605` |
| `2012:308451` | cursor-highlighter | `2399:5666` |
| `2012:308467` | cursor-marker | `2399:5726` |
| `2012:308482` | cursor-break-move | `2399:6050` |
| `2012:308500` | cursor-break-snap | `2399:5987` |
| `2012:308514` | cursor-break | `2399:5944` (frame, not symbol) |
| `2012:308527` | cursor-resize-padding | `2399:5895` |
| `2012:308537` | cursor-resize-scale | `2399:5840` |
| `2012:308552` | cursor-resize | `2399:5780` |
| `2012:308561` | cursor-zoom-in | `2399:6114` |
| `2012:308580` | cursor-zoom-out | `2399:6177` |
| `2012:308598` | cursor-pencil | `2399:6238` |
| `2012:308614` | cursor-stamp | `2399:6308` |
| `2012:308639` | cursor-lasso | `2399:6368` |
| `2012:308654` | cursor-comments-next-pin | `2399:6432` |
| `2012:308673` | cursor-convert | `2399:6840` |
| `2012:308692` | cursor-deep-parent | `2399:6776` |
| `2012:308707` | cursor-edit-corners | `2399:6716` |
| `2012:308722` | cursor-position-absolutely | `2399:6656` |
| `2012:308738` | cursor-washi-tape | `2399:6595` |
| `2012:308763` | cursor-hand-new | `2399:6525` |
| `2012:308811` | cursor-hand-press | `2399:6924` |
| `2012:308850` | cursor-edit-radius | `2399:6985` |
| `2012:308866` | cursor-edit-ratio | `2399:7045` |
| `2012:308881` | cursor-frame-snap | `2399:7111` |
| `2012:308902` | cursor-frame | `2399:7174` |
| `2012:308920` | cursor-magic-handle | `2399:7237` |
| `2012:308938` | cursor-wand | `2399:7616` |
| `2012:308956` | cursor-offscreen | `2399:7553` |
| `2012:308970` | cursor-annotate | `2399:7494` |
| `2012:308987` | cursor-guide-delete | `2399:7432` |
| `2012:309003` | cursor-not-allowed | `2399:7371` |
| `2012:309020` | cursor-pen-insert | `2399:7309` |
| `2012:309047` | cursor-pen-remove | `2399:7688` |
| `2012:309074` | cursor-crosshair | `2399:7895` |
| `2012:309086` | cursor-move | `2399:7896` |
| `2012:309100` | cursor-text | `2399:7897` |
| `2012:309115` | cursor-text-curve | `2399:7898` |
| `2012:309130` | cursor-pen-snap | `2399:7899` |
| `2012:309156` | cursor-pen | `2399:8367` |
| `2012:309181` | cursor-snap | `2399:8368` |
| `2012:309196` | cursor-missing-font-dark | `2399:8369` |
| `2012:309215` | cursor-missing-font-light | `2399:8370` |
| `2012:309234` | cursor-missing-font | `2399:8371` |
| `2012:309252` | cursor-rotate | `2399:8372` |
| `2012:309269` | cursor-prototyping | `2399:8373` |
| `2012:309287` | cursor-pizza | `2399:8374` |

> Anomaly (faithful capture): `2012:308514` "cursor-break" wraps a plain `frame` (`2399:5944`), not a `symbol` like every other cursor in this grid. Preserved as-is; reconcile during clean-up.

`[Deferred: render — ref node 2012:308164]` — 63-cell component-dependent cursor specimen grid. Inventory (name + node id) captured non-deferred above.

---

## Section 3 — Multiplayer cursors

Heading frame: `2012:309316` ("Frame 4", 968 × 32). Heading (`2012:309318`, Whyte Regular 36px, color `--color-text` rgba(0,0,0,0.9), tracking 0.36px), verbatim:

> Multiplayer cursors

Grid node: `2012:309319` ("Cursors", 968 × 360). Same `Cursor` card structure. Seven color variants:

| Card node | Cursor name | Symbol node |
|-----------|-------------|-------------|
| `2012:309320` | cursor-multiplayer-blue | `2399:9012` |
| `2012:309338` | cursor-multiplayer-yellow | `2399:9013` |
| `2012:309346` | cursor-multiplayer-purple | `2399:9014` |
| `2012:309354` | cursor-multiplayer-pink | `2399:9015` |
| `2012:309362` | cursor-multiplayer-red | `2399:9016` |
| `2012:309370` | cursor-multiplayer-green | `2399:9017` |
| `2012:309378` | cursor-multiplayer-gray | `2399:9018` |

`[Deferred: render — ref node 2012:309319]` — multiplayer cursor specimens. Inventory captured above.

---

## Section 4 — System (macOS) cursors

Heading frame: `2680:7602` ("Frame 6", 968 × 32). Heading (`2680:7604`, Whyte Regular 36px, color `--color-text` rgba(0,0,0,0.9), tracking 0.36px), verbatim:

> System (macOS) cursors

Grid node: `2680:7605` ("Cursors", 968 × 560). Same `Cursor` card structure. Fourteen system cursors:

| Card node | Cursor name | Symbol node |
|-----------|-------------|-------------|
| `2680:7606` | cursor-system-arrow | `2680:8231` |
| `2680:7613` | cursor-system-add | `2680:8232` |
| `2680:7621` | cursor-system-not-allowed | `2680:8233` |
| `2680:7631` | cursor-system-poof | `2680:8234` |
| `2680:7639` | cursor-system-busy-but-clickable | `2680:8235` |
| `2680:7659` | cursor-system-context-menu | `2680:8236` |
| `2680:7675` | cursor-system-zoom | `2680:8237` |
| `2680:7687` | cursor-system-crosshair | `2680:8238` |
| `2680:7693` | cursor-system-text | `2680:8239` |
| `2680:7700` | cursor-system-hand-pointing | `2680:8240` (preview y=48.5) |
| `2680:7711` | cursor-system-hand-open | `2680:8241` |
| `2680:7723` | cursor-system-hand-closed | `2680:8242` |
| `2680:7734` | cursor-system-resize | `2680:8243` |
| `2680:7806` | cursor-system-move | `2680:8244` |

`[Deferred: render — ref node 2680:7605]` — system cursor specimens. Inventory captured above.

---

## Section 5 — Chat cursors

Heading frame: `2012:309386` ("Frame 5", 968 × 32). Heading (`2012:309388`, Whyte Regular 36px, color `--color-text` rgba(0,0,0,0.9), tracking 0.36px, 200px wide), verbatim:

> Cursor chat

Grid node: `2680:8648` ("Cursors", 968 × 560). Wider cards (`Cursor` frame 296 × 160; Preview 296 × 128) because each cursor carries a chat bubble. Seven color variants:

| Card node | Cursor name | Symbol node |
|-----------|-------------|-------------|
| `2680:8649` | cursor-chat-blue | `2680:8652` |
| `2680:8657` | cursor-chat-yellow | `2680:8660` |
| `2680:8665` | cursor-chat-purple | `2680:8668` |
| `2680:8673` | cursor-chat-pink | `2680:8676` |
| `2680:8681` | cursor-chat-red | `2680:8684` |
| `2680:8689` | cursor-chat-green | `2680:8692` |
| `2680:8697` | cursor-chat-gray | `2680:8700` |

### Chat-cursor anatomy (token capture, from `cursor-chat-blue` `2680:8652`)

The chat cursor composes the base `cursor-black` pointer (`2680:8653`, a 14px `Flat` arrow glyph) plus a speech `bubble` (`2680:8654`) offset to (left 16, top 16):

- Bubble fill: `--ramp-blue-600` (#007be5); border 2px `--ramp-blue-700` (#0768cf). (The `blue` variant tokens; other color variants swap the ramp accordingly — per-variant table below.)
- Bubble radius: tl 2px, tr 99px, br 99px, bl 19px (a tail-cornered pill); padding pl-12 / pr-16 / py-8.
- Bubble shadow: `0px 0px 0.5px rgba(0,0,0,0.15), 0px 5px 12px rgba(0,0,0,0.13), 0px 1px 3px rgba(0,0,0,0.1)`.
- Bubble label (`2680:8655`): text style `body/large/strong` (Inter Medium, size `body/large/strong/fontSize` 13px fallback, weight `body/large/strong/fontWeight` 550 fallback, lineHeight `body/large/strong/lineHeight` 22px fallback, tracking -0.0325px), color `--color-text-onbrand` (white). The bubble text is a component prop `label` with default verbatim:

  > Say something

(Faithful capture, blue variant `2680:8652`: the bubble label color is `--color-text-onbrand` (white). Note the `cursor-chat-yellow` variant differs — see the per-variant note below.)

### Per-variant bubble ramp tokens (each variant opened individually)

Every chat-cursor variant shares the same anatomy (base `cursor-black` 14px `Flat` arrow + offset `bubble` at left 16 / top 16, same radius/padding/shadow/label). Only the bubble fill, border, and — for yellow — the label color differ. Captured verbatim per variant:

| Variant | Symbol node | Bubble fill | Bubble border (2px) | Label color |
|---------|-------------|-------------|---------------------|-------------|
| cursor-chat-blue | `2680:8652` | `--ramp-blue-600` (#007be5) | `--ramp-blue-700` (#0768cf) | `--color-text-onbrand` (white) |
| cursor-chat-yellow | `2680:8660` | `--ramp-yellow-600` (#ffc21a) | `--ramp-yellow-700` (#fab815) | `--color-text` (rgba(0,0,0,0.9)) |
| cursor-chat-purple | `2680:8668` | `--ramp-purple-600` (#8638e5) | `--ramp-purple-700` (#7c2bda) | `--color-text-onbrand` (white) |
| cursor-chat-pink | `2680:8676` | `--ramp-pink-600` (#ea10ac) | `--ramp-pink-700` (#cb0b96) | `--color-text-onbrand` (white) |
| cursor-chat-red | `2680:8684` | `--ramp-red-600` (#dc3412) | `--ramp-red-700` (#bd2915) | `--color-text-onbrand` (white) |
| cursor-chat-green | `2680:8692` | `--ramp-green-600` (#009951) | `--ramp-green-700` (#008043) | `--color-text-onbrand` (white) |
| cursor-chat-gray | `2680:8700` | `--color-multiplayergrey` (#679) | `#445a86` (raw hex, no token) | `--color-text-onbrand` (white) |

> Anomalies (faithful capture): (1) `cursor-chat-yellow` is the only variant whose bubble label uses `--color-text` (dark) rather than `--color-text-onbrand` (white) — presumably for contrast against the light yellow fill. (2) `cursor-chat-gray` breaks the `--ramp-<color>-600/700` pattern: its fill is `--color-multiplayergrey` (#679) and its border is a raw `#445a86` hex with no bound variable. Preserved as-is; reconcile during clean-up.

`[Deferred: render — ref node 2680:8648]` — chat cursor specimens. Inventory + per-variant bubble anatomy captured above.

---

## Cross-section token summary (captured values)

Color variables referenced across the page (var → fallback where observed):

- `--color-text`: rgba(0,0,0,0.9)
- `--color-text-secondary`: rgba(0,0,0,0.5)
- `--color-text-onbrand`: white
- `--color-bg-secondary`: #f5f5f5 — every cursor Preview tile background
- `--ramp-blue-600`: #007be5 — chat-cursor bubble fill (blue variant)
- `--ramp-blue-700`: #0768cf — chat-cursor bubble border (blue variant)
- `--ramp-yellow-600`: #ffc21a / `--ramp-yellow-700`: #fab815 — chat-cursor bubble fill/border (yellow variant)
- `--ramp-purple-600`: #8638e5 / `--ramp-purple-700`: #7c2bda — chat-cursor bubble fill/border (purple variant)
- `--ramp-pink-600`: #ea10ac / `--ramp-pink-700`: #cb0b96 — chat-cursor bubble fill/border (pink variant)
- `--ramp-red-600`: #dc3412 / `--ramp-red-700`: #bd2915 — chat-cursor bubble fill/border (red variant)
- `--ramp-green-600`: #009951 / `--ramp-green-700`: #008043 — chat-cursor bubble fill/border (green variant)
- `--color-multiplayergrey`: #679 — chat-cursor bubble fill (gray variant); its border is raw `#445a86` (no bound variable)

(All seven chat-bubble color variants were opened individually and captured above. Confirmed: blue/yellow/purple/pink/red/green map to their own `--ramp-<color>-600/700` pair; gray is the exception, using `--color-multiplayergrey` fill with a raw `#445a86` border. Yellow is also the only variant with a `--color-text` (dark) label rather than `--color-text-onbrand` (white).)

Dimension/radius tokens:
- Cursor symbol: 32 × 32px, centered in a 128 × 128 Preview tile (offset 48px; chat previews offset 32px)
- Card name label color: rgba(0,0,0,0.6), Whyte Book 13px, tracking 0.13px
- Preview tile radius: 13px
- Intro callout card: radius 13px, padding pt-24/pb-16/px-32, gap 16px
- Standard card: 128 × 160 (168px column pitch, 200px row pitch); chat card: 296 × 160
- Chat bubble radius: 2 / 99 / 99 / 19px (tl/tr/br/bl); border 2px; padding pl-12 pr-16 py-8

Inventory totals (faithful count from get_metadata): main grid 63 cursors, multiplayer 7, system/macOS 14, chat 7.
