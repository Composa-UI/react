<!--
Source: Figma "Tabs Guidelines" page — fileKey 4kilp0ShQiYsoUPJdleqEH, entry node 2015:27601
1:1 import — raw, pre-organization. Faithful capture, not synthesis. Re-organize into tabs later.
Frames transcribed: 2015:27603, 2015:27612, 2015:27640, 2015:27671, 2015:27697, 2015:27710, 2015:27733
-->

# Tabs — Guidelines (1:1 Figma import)

Page frame: `2015:27601` "Tabs Guidelines" (1280 × 2929). Contains a `_Status` instance bar (`2359:118674`) and seven content frames: a "Title" intro frame (`2015:27603`), and six guideline sections.

Doc text styles present across the page:
- `_doc/heading`: Whyte, Regular, size 18, weight 400, lineHeight 32, letterSpacing 1
- `_doc/description`: Whyte, Book, size 13, weight 350, lineHeight 22, letterSpacing 1
- `_doc/body/body.medium`: family `body/medium/fontFamily` (Inter), Medium, size `body/medium/fontSize` (11px), weight `body/medium/fontWeight` (450), lineHeight `body/medium/lineHeight` (16px), letterSpacing 0.5
- `_doc/body/body.medium.strong`: family `body/medium/strong/fontFamily` (Inter), Semi Bold, size `body/medium/strong/fontSize` (11px), weight `body/medium/strong/fontWeight` (550), lineHeight `body/medium/strong/lineHeight` (16px), letterSpacing 0.5

---

## Section 0 — Component intro / Definition

Node: `2015:27603` (`Title`, 1280 × 762). A vertical stack (gap 64px) of a "Heading" frame (`2015:27604`) and a `_Section/Component` showcase frame (`2015:27608`).

### Heading + description

Component Name (`2015:27606`, Whyte Regular 36px, color rgba(0,0,0,0.9), tracking 0.36px):

> Tabs

Description (`2015:27607`, Whyte Regular 18px, color rgba(0,0,0,0.6), tracking 0.18px, width 412px), verbatim:

> Tabstrips allow users to navigate between two or more related views. They’re a helpful way of letting users quickly switch between related information.

### Hero showcase

Node: `2015:27608` (`_Section/Component`, 1280 × 482). Contains a "Stuff" panel (`2015:27610`, bg `--color-bg-secondary` #f5f5f5, radius 13px, 1152 × 480) holding a single 960 × 362 image (`2661:17923`).

`[Deferred: render — ref node 2661:17923]` — bitmap hero image (`image 1`), not a token-driven specimen.

---

## Section 1 — Default (anatomy)

Node: `2015:27612` (`State`, 1280 × 352)

### Heading + description

Component Name (`2015:27614`, Whyte Regular 18px):

> Default

Description (`2015:27615`, Whyte Book 13px), verbatim (multi-paragraph):

> There are visual cues that help a user quickly distinguish between current tab and other tabs.
>
> The current tab has a 24px height container, styled with bg-secondary fill, radius-medium, body.medium.strong type, text-default.
>
> All other tabs have a 24px height container, unstyled, body.medium, text-secondary.
>
> Each tab is separated by 4px of space in between. We sometimes make the first tab an aggregated view, such as “All”.

### Light / Dark context (`2015:27617`, 704px wide)

Two panels side by side: **Light** (`2015:27618`, bg `--color-bg` white, 1px rgba(0,0,0,0.1) border) labeled "LIGHT MODE" (`2015:27619`), and **Dark** (`2015:27629`, bg `--color-bg` #2c2c2c) labeled "DARK MODE" (`2015:27630`).

Each panel contains a Drop Zone (`2015:27620` light / `2015:27631` dark) showing two identical Tabs rows (a 3-tab tabstrip rendered twice, stacked), plus two "Measurement" redline annotations (`2015:27623`, `2015:27626` light / `2015:27634`, `2015:27637` dark) calling out the **4px** gap between tabs. Redlines use `_Label/Redline/Horizontal Bar` + `_Label/Redline/Text`, styled with `--color-bg-measure` (#f24822 light / #e03e1a dark) and `--color-text-onmeasure` (white), bar color `--color-border-measure-strong` (#dc3412 light / #fca397 dark).

**The 3-tab anatomy specimen (per row):**

| Tab | role | type style | bg | text color |
|-----|------|-----------|----|-----------| 
| Active tab | current/selected | `body.medium.strong` | `--color-bg-secondary` (#f5f5f5 light / #383838 dark) | `--color-text` (rgba(0,0,0,0.9) / white) |
| Second tab | unselected | `body.medium` | `--color-bg` (white / #2c2c2c) | `--color-text-secondary` (rgba(0,0,0,0.5) / rgba(255,255,255,0.7)) |
| Third tab | unselected | `body.medium` | `--color-bg` (white / #2c2c2c) | `--color-text-secondary` |

### Tab / Tabs component — variant axes (from component definitions embedded in this page)

`TabProps`:
- `badge`: boolean (default false)
- `selected`: boolean (default true)
- `singleTab`: `"False"`
- `state`: `"Default"`
- `text`: string (default `"Tab Title"`)

`TabsProps`:
- `tabCount`: `"3"` | `"4"` (string enum)

### Token / value capture (anatomy — token-driven, captured)

- Tab container: 24px height (`--heights/height.input`), padding `--spacer-2` (0.5rem / 8px) horizontal, gap `--spacer-1` (~0.3rem / 4px) internal.
- Tab radius: `--radius-medium` (0.3125rem / 5px).
- Tabstrip gap between tabs: `--spacer-1` (4px) — this is the value annotated by the redlines.
- Active/selected text: `body.medium.strong`, color `--color-text`.
- Unselected text: `body.medium`, color `--color-text-secondary`.

---

## Section 2 — States (Selected / Unselected × Default / Focus)

Node: `2015:27640` (`_Section/Component`, 1280 × 255)

### Heading + description

Component Name (`2015:27642`, Whyte Regular 18px):

> States

Description (`2015:27643`, Whyte Book 13px), verbatim:

> The tabstrip consists of a selected and unselected states, each with a respective focus mode.

### Light / Dark context (`2015:27644`)

Light panel (`2015:27645`, "LIGHT MODE" `2015:27646`) and Dark panel (`2015:27658`, "DARK MODE" `2015:27659`). Each Drop Zone (`2015:27647` light / `2015:27660` dark) is a vertical stack of four single-tab specimens (gap 40px in light via absolute top offsets; gap 16px in dark) with a column of `_Label/Redline/State-Left` annotations (`2015:27653` light / `2015:27666` dark).

**Row labels (redline, top→bottom):** **Selected** · **Selected Focus** · **Unselected** · **Unselected Focus**

**The 4 state specimens (light, `2425:45599`–`2425:45602`):**

| Cell | state | bg | border | text style | Tab node (light / dark) |
|------|-------|----|--------|-----------|-------------------------|
| Selected | selected, default | `--color-bg-secondary` (#f5f5f5 / #383838) | none | `body.medium.strong`, `--color-text` | `2425:45599` / `2425:45586` |
| Selected Focus | selected, focused | `--color-bg-secondary` | `--color-border-selected` (#0d99ff / #0c8ce9) | `body.medium.strong`, `--color-text` | `2425:45600` / `2425:45587` |
| Unselected | unselected, default | `--color-bg` (white / #2c2c2c) | none | `body.medium`, `--color-text-secondary` | `2425:45601` / `2425:45588` |
| Unselected Focus | unselected, focused | `--color-bg-secondary` (#f5f5f5 / #383838) | none in this row's render | `body.medium.strong`, `--color-text` | `2425:45602` / `2425:45589` |

> Note (faithful capture): The light "Unselected" specimen (`2425:45601`) carries the literal label text "Second tab"; "Selected"/"Selected Focus"/"Unselected Focus" carry "Default tab" / "Default tab" / "Second tab". The dark column's fourth specimen (`2425:45589`) renders with `bg-secondary` + strong type rather than an unstyled focus ring. Preserving as-is; reconcile during clean-up.

### Token / value capture (states — token-driven, captured)

- Focus indication: 1px solid border, color `--color-border-selected` (#0d99ff light / #0c8ce9 dark) applied around the tab.
- Selected fill: `--color-bg-secondary`; unselected fill: `--color-bg`.

---

## Section 3 — Focus

Node: `2015:27671` (`_Section/Component`, 1280 × 296)

### Heading + description

Component Name (`2015:27674`, Whyte Regular 18px):

> Focus

Description (`2015:27675`, Whyte Book 13px), verbatim:

> Each tab can be focused individually. Focus can be applied to a current tab or an unselected tab so the user can easily navigate tabs within a panel, with a keyboard.

### Light / Dark context (`2015:27676`)

Light panel (`2015:27677`, "LIGHT MODE" `2015:27678`) and Dark panel (`2015:27687`, "DARK MODE" `2015:27688`). Each Drop Zone (`2425:46092` light / `2425:46037` dark) stacks four 3-tab tabstrips (gap ~38px via absolute top offsets) with a two-item `_Label/Redline/State-Left` column (`2425:46093` light / `2425:46038` dark).

**Row labels (redline):** **Default** · **Focus**

**The four tabstrip rows (light):**

- `2425:45535`-style base row (`Tabs` component, `2425:46096`): Active tab (selected, no focus ring) + Second tab + Third tab — all default.
- `2425:46097`: focus on **first** tab — "Default tab" gets `--color-bg-secondary` fill + `--color-border-selected` border, `body.medium.strong`, `--color-text`; siblings unselected default.
- `2425:46098`: focus on **second** tab — "Second tab" gets `--color-bg-secondary` + `--color-border-selected` border + strong type; siblings unselected default.
- `2425:46099`: focus on **third** tab — "Third tab" gets `--color-bg-secondary` + `--color-border-selected` border + strong type; siblings unselected default.

Dark mirrors this with `--color-bg-secondary` #383838 and `--color-border-selected` #0c8ce9 (rows `2425:46041`–`2425:46044`).

`[Deferred: render — ref nodes 2425:46092 (light), 2425:46037 (dark)]` — component-dependent four-row focus layout. Token/state data above captured non-deferred.

---

## Section 4 — Single Tab (in-context demo)

Node: `2015:27697` (`State`, 1280 × 352)

### Heading + description

Component Name (`2015:27699`, Whyte Regular 18px):

> Single Tab

Description (`2015:27700`, Whyte Book 13px), verbatim:

> When a panel contains a tabstrip component and there’s only one tab, the tab itself default to a background color of bg-default, text-default, body.medium.strong to revert back to default dialog title styling.

### Light / Dark context (`2015:27701`)

Light panel (`2015:27702`, "LIGHT MODE" `2015:27704`) and Dark panel (`2015:27706`, "DARK MODE" `2015:27707`). Each contains a `_Detail/Color picker` instance (`2661:23240` light / `2661:21661` dark, 240 × 408, radius 13px, elevation `light/elevation-400-menu-panel` — drop shadows: 0/2/5 #00000026, 0/10/16 #0000001F, 0/0/0.5 #0000001F) demonstrating a single-tab titlebar in a real surface.

**Single-tab titlebar (`_Detail/Titlebar` `2661:24187` light / `2661:21662` dark):**
- The lone tab ("Libraries", node `2661:24367` light / `2661:21672` dark — named "Tab 2" in light, "Single Tab" in dark) renders with `--color-bg` (white / #2c2c2c) fill, `body.medium.strong`, `--color-text` (rgba(0,0,0,0.9) / white) — i.e. reverts to plain dialog-title styling rather than the selected `bg-secondary` pill.
- Trailing titlebar icons: `icon.24.plus` (`2661:24339` / `2661:21666`), `icon.24.close` (`2661:24345` / `2661:21668`).
- Second header row (`sidebar.left.heading`): a search Text input ("Search" placeholder, `icon.24.search.small`) + `icon.24.filter` + `icon.24.grid-view`.

Below the titlebar, a list of `_detail/picker/row.variable.alt` rows (icon-default, icon-secondary, icon-tertiary, icon-onbrand) with `chit.24.alt` color chits — context only.

`[Deferred: render — ref nodes 2661:23240 (light), 2661:21661 (dark)]` — component-dependent color-picker surface embedding the single-tab demo. Single-tab token rule above captured non-deferred.

---

## Section 5 — Counter

Node: `2015:27710` (`_Section/Component`, 1280 × 168)

### Heading + description

Component Name (`2015:27712`, Whyte Regular 18px):

> Counter

Description (`2015:27713`, Whyte Book 13px), verbatim:

> In some cases, a tab will feature a counter to broadcast the difference between newly updated and stale information. You can see this in the admin/billing surfaces.

### Light / Dark context (`2015:27714`)

Light panel (`2015:27715`, "LIGHT MODE" `2015:27716`) and Dark panel (`2015:27724`, "DARK MODE" `2015:27725`). Drop Zone (`2015:27717` light / `2015:27726` dark) stacks two tabs (gap 16px), each carrying a count badge, with a two-item `_Label/Redline/State-Left` column (`2015:27721` light / `2015:27730` dark).

**Row labels (redline):** **Unread** · **Read**

**Counter specimens (light):**

| Tab | tab state | badge variant | Tab node (light / dark) |
|-----|-----------|---------------|-------------------------|
| Default tab + "21" | selected (`body.medium.strong`, `--color-text`, bg `--color-bg-secondary`) | **Count New** — bg `--color-bg-selected` (#e5f4ff / #4a5878), text `--color-text` | `2015:27719` / `2425:46158` |
| Second tab + "21" | unselected (`body.medium`, `--color-text-secondary`, bg `--color-bg`) | **Count Inactive** — bg `--color-bg-hover` (#f5f5f5 / #383838), text `--color-text-secondary` | `2015:27720` / `2425:46159` |

### Badge component — variant axis (from `BadgeSmallAlt` definition)

`BadgeSmallAltProps`:
- `variant`: `"Count New"` | `"Count Inactive"`
- `text`: string (default `"Badge"`)

Badge layout: 16px height, padding `--spacer-1` (4px) horizontal, gap `--spacer-1`, radius `--radius-medium` (5px), `body.medium` type.
- **Count New**: bg `--color-bg-selected` (#e5f4ff light / #4a5878 dark), text `--color-text`.
- **Count Inactive**: bg `--color-bg-hover` (#f5f5f5 light / #383838 dark), text `--color-text-secondary`.

---

## Section 6 — Overflow

Node: `2015:27733` (`_Section/Component`, 1280 × 168)

### Heading + description

Component Name (`2015:27735`, Whyte Regular 18px):

> Overflow

Description (`2015:27736`, Whyte Book 13px), verbatim:

> When tabs overflow, you should be able to horizontally scroll them. If they flow outside of the parent container, they’ll be masked with gradients that use a bg-default color token.

### Light / Dark context (`2015:27737`)

Light panel (`2015:27738`, "LIGHT MODE" `2015:27739`) and a second panel labeled "DARK MODE" (`2015:27748`, "DARK MODE" `2015:27749` — note: this dark panel's layer is also named "Light" in source). Each contains a "Scrims" frame (`2425:46319` light / `2015:27750` dark, height `--spacer-6` 2.5rem / 40px) holding a 4-tab tabstrip (`2425:46096`-style `Tabs`, tabCount=4, width 297px), a trailing close button (`icon.24.close` inside a `Button icon`), a bottom Border line, and two gradient "Finish" masks (left 16px, right 8px) that fade tabs into the background.

**The 4-tab tabstrip (`Tabs` tabCount=4):** Active Tab (selected, `body.medium.strong`, `--color-text`, bg `--color-bg-secondary`) · Second tab · Third tab · Fourth tab (all unselected, `body.medium`, `--color-text-secondary`, bg `--color-bg`).

### Token / value capture (overflow — token-driven, captured)

- Scrim container height: `--spacer-6` (2.5rem / 40px).
- Edge masks ("Finish"): horizontal gradient from transparent to `--color-bg` (white light, #2c2c2c dark) — left mask 16px wide (mirrored), right mask 8px wide, positioned right-[40px] leaving room for the close button.
- Trailing close affordance: `Button icon` with `icon.24.close`, radius `--radius-medium` (5px).
- Bottom border: 1px line (`Border`, rendered as image vector in source).

`[Deferred: render — ref nodes 2425:46319 (light), 2015:27750 (dark)]` — component-dependent scroll/scrim layout. Token data above captured non-deferred.

---

## Cross-section token summary (captured values)

Color variables referenced across the page (var → light fallback / dark fallback where both observed):

- `--color-bg`: white / #2c2c2c
- `--color-bg-secondary`: #f5f5f5 / #383838
- `--color-bg-selected`: #e5f4ff / #4a5878
- `--color-bg-hover`: #f5f5f5 / #383838
- `--color-bg-assistive-tertiary`: #ffe0fc / #68275e
- `--color-bg-measure`: #f24822 / #e03e1a
- `--color-text`: rgba(0,0,0,0.9) / white
- `--color-text-secondary`: rgba(0,0,0,0.5) / rgba(255,255,255,0.7)
- `--color-text-assistive`: #ea10ac / #fc9ce0
- `--color-text-onmeasure`: white / white
- `--color-border-selected`: #0d99ff / #0c8ce9
- `--color-border-measure-strong`: #dc3412 / #fca397

Dimension/radius tokens:
- `--spacer-1`: ~0.3rem (4px) — gap between tabs; internal tab gap; badge padding
- `--spacer-2`: 0.5rem (8px) — tab horizontal padding
- `--spacer-3`: 1rem (16px) — picker-row horizontal padding (Single Tab demo)
- `--spacer-6`: 2.5rem (40px) — overflow scrim container height
- `--radius-medium`: 0.3125rem (5px) — tab + badge radius
- `--radius-small`: 0.125rem (2px) — color chit radius
- `--heights/height.input`: 24px — tab container height
- Tab: 24px high; badge: 16px high; overflow edge masks: 16px (left) / 8px (right)

Effect tokens:
- `light/elevation-400-menu-panel`: drop shadows 0/2/5 #00000026, 0/10/16 #0000001F, 0/0/0.5 #0000001F — used by the color-picker surface in the Single Tab demo
