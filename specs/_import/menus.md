<!--
Source: Figma "Menus Guidelines" page — fileKey 4kilp0ShQiYsoUPJdleqEH, entry node 2327:95726
1:1 import — raw, pre-organization. Faithful capture, not synthesis. Re-organize into tabs later.
Frames transcribed: 2327:95729, 2327:95733, 2327:95769, 2327:95804, 2327:95890, 2327:95935, 2327:95974, 2327:95990
NOTE: The last two frames (2327:95974 "Overflow", 2327:95990 "Expanded Menu Positioning") were initially captured metadata-only after a rate limit; they have since been fully captured via get_design_context — heading/description text, row strings, and per-element token styling are now included.
-->

# Menus — Guidelines (1:1 Figma import)

Page frame: `2327:95726` "Menus Guidelines" (1280 × 4488). Contains a `_Status` instance bar (`2359:100079`, 1280 × 64) and a content frame "Content" (`2327:95728`, 1280 × 4296) holding eight sections (`_Section/Component` + seven `Section`).

Doc text styles present across the page:
- `_doc/description`: Whyte, Book, size 13, weight 350, lineHeight 22, letterSpacing 1
- `_doc/body/body.medium`: family `body/medium/fontFamily`, Medium, size `body/medium/fontSize`, weight `body/medium/fontWeight`, lineHeight `body/medium/lineHeight`, letterSpacing 0.5
- `body/body.medium`: family `body/medium/fontFamily`, Regular, size `body/medium/fontSize`, weight `body/medium/fontWeight`, lineHeight `body/medium/lineHeight`, letterSpacing 0.5
- `body/body.small.strong`: family `body/small/strong/fontFamily`, Medium, size `body/small/strong/fontSize`, weight `body/small/strong/fontWeight`, lineHeight `body/small/strong/lineHeight`, letterSpacing 0.5

Page layout convention (most sections): a left **Description** column at `left-[64px]` (Component Name + description + numbered `Labels` list using `_Label/Num`), and a right **Light** specimen panel (`bg --color-bg-secondary` #f5f5f5, radius 13px, inset `0_64px_0_512px`) holding the menu specimen plus `_Label/Directional-Subtle` callouts (numbered, dashed leader lines, `--ramp-grey-300` #d9d9d9 number chips) and `_Label/Redline` measurement annotations (`--color-bg-measure` #f24822 text chips, `--color-border-measure-strong` #dc3412 bars). Numbered callouts map to the left-column `Labels` list.

> Note (faithful capture): all specimen panels are named "Light" but render the menu on the **dark** menu surface (`--color-bg-menu` #1e1e1e) — this is the product's dark menu chrome shown on a light doc page, not a light/dark mode pair. There is no separate dark panel on this page.

---

## Section 1 — Component intro / Definition

Node: `2327:95729` (`_Section/Component`, 1280 × 280)

### Heading + description

Component Name (`2327:95731`, Whyte Regular 36px, color rgba(0,0,0,0.9), tracking 0.36px):

> Menus

Description (`2327:95732`, Whyte Regular 18px, color rgba(0,0,0,0.6), tracking 0.18px, width 412px), verbatim:

> A menu presents a list of items—commands, attributes, or states—from which a user can choose.

---

## Section 2 — Context menus

Node: `2327:95733` (`Section`, 1280 × 480)

### Heading + description

Component Name (`2327:95735`, Whyte Regular 18px):

> Context menus

Description (`2327:95736`, Whyte Book 13px), verbatim (three paragraphs, blank line between 1 and 2):

> A contextual menu, or context menu, gives people access to frequently used commands related to the current context or selection. A contextual menu is revealed by right-clicking a view or selected element.
>
> When a menu has many actions, we use separators to group related actions, or nest actions under a submenu.

### Numbered callouts (Labels list `2327:95737`)

1. Row hover state (`2327:95740`)
2. Associated keyboard shortcut (`2327:95743`)
3. Submenu (`2327:95746`)
4. Divider (`2327:95749`)

### Light panel (`2327:95750`)

Menu specimen `MenuExample` (`2327:95751`, centered, 208px wide). Directional callouts: ①→row (`2327:95752`), ③→submenu row (`2327:95753`), ④→divider (`2327:95754`), ② down-leader to a row (`2327:95755`). Redline measures: two `16` horizontal bars (`2327:95756`, `2327:95759`); a `24` vertical bar with dashed guides (`2327:95762`/`2327:95766`).

**Menu rows (verbatim, top→bottom; `--color-bg-menu` #1e1e1e panel, `--color-text-menu` white):**

| Row | Type | Label | Trail | Notes |
|-----|------|-------|-------|-------|
| 1 | Simple | Copy | `⌥⇧⌘O` | **Hover/selected** — bg `--color-bg-menu-selected` #0d99ff |
| 2 | Simple | Copy / Paste as | `icon.16.chevron.right` | submenu |
| 3 | Simple | Select layer | chevron.right | submenu |
| 4 | Simple | Copy / Paste as | chevron.right | submenu |
| — | Divider | | | |
| 5 | Simple | Bring to front | `]` | shortcut color `--color-text-menu-secondary` rgba(255,255,255,0.7) |
| 6 | Simple | Send to back | `[` | |
| — | Divider | | | |
| 7 | Simple | Group selection | `⌘G` | |
| 8 | Simple | Frame selection | `⌥⌘G` | |
| 9 | Simple | Ungroup | `⌘G` | |
| 10 | Simple | Flatten | `⌘E` | |

> Note (faithful capture): "Group selection" and "Ungroup" both show shortcut `⌘G` in source. Preserved as-is.

---

## Section 3 — On / off menus

Node: `2327:95769` (`Section`, 1280 × 480)

### Heading + description

Component Name (`2327:95771`, Whyte Regular 18px):

> On / off menus

Description (`2327:95772`, Whyte Book 13px), verbatim (curly quotes as in source):

> When we need to indicate “on” and “off” states, we indent all menu items to include space for a checkmark.

### Numbered callouts (Labels list `2327:95773`)

1. Column for checks (`2327:95776`)
2. On state, hover (`2327:95779`)
3. Off state, indented (`2327:95782`)
4. Submenu (`2327:95785`)

### Light panel (`2327:95786`)

Menu specimen `MenuExampleToggles` (`2327:95794`, at left 248 / top 72, 208px). Directional callouts ① (`2327:95795`, down-leader to first row), ② (`2327:95796`), ③ (`2327:95797`), ④ (`2327:95787`). Redline measures: `32` (`2327:95788`, checkmark-column indent), `16` (`2327:95791`), `16` vertical (`2327:95798`/`2327:95801`).

### Menu row — Checkmark variant axes (from component definition embedded here)

`MenuRowCheckmark` props:
- `variant`: `"Check"`
- `state`: `"Default" | "Hover"` (default `"Default"`)
- `on`: boolean (default true) — controls the leading `icon.16.check`
- `submenu`: boolean (default false)
- `hasShortcut`: boolean (default true)
- `shortcut`: string (default `"⌥⇧⌘O"`)
- `text`: string (default `"Row text"`)

Hover state (`isCheckAndHoverAndFalse`): container bg `--color-bg-menu-selected` #0d99ff, shortcut color flips to `--color-text-menu` white. On-state check glyph is `icon.16.check` positioned left 4px, 16px box. All rows share left padding `--spacer-4` (24px) to reserve the check column.

**Menu rows (verbatim, top→bottom):**

| Row | On? | Label | Trail | State |
|-----|-----|-------|-------|-------|
| 1 | on (check) | Pixel preview | `icon.24.chevron.right` (submenu) | Default |
| 2 | on (check) | Pixel grid | `⇧\`` | **Hover** (bg #0d99ff) |
| 3 | on (check) | Snap to pixel grid | `⇧⌘\`` | Default |
| 4 | off | Layout grids | `⇧G` | Default |
| 5 | off | Rulers | `⇧R` | Default |
| 6 | off | Outlines | chevron.right (submenu) | Default |
| 7 | on (check) | Multiplayer cursors | `⌥⌘\` | Default |
| — | Divider | | | |
| 8 | on (check) | Comments | `⇧C` | Default |
| 9 | on (check) | Prototypes | `⇧E` | Default |
| 10 | off | Annotations | (none) | Default |

---

## Section 4 — Multi-select checkboxes

Node: `2327:95804` (`Section`, 1280 × 480)

### Heading + description

Component Name (`2327:95806`, Whyte Regular 18px):

> Multi-select checkboxes

Description (`2327:95807`, Whyte Book 13px), verbatim:

> For multi-select, we use checkboxes that right aligned on each menu row.

### Numbered callouts (Labels list `2327:95808`)

1. Checkbox on state, hover (`2327:95811`)
2. Checkbox off state (`2327:95814`)
3. Checkbox on state (`2327:95817`)

### Light panel (`2327:95818`)

Menu specimen `Menu multi-select` (`2327:95833`, centered, 208px). Directional callouts ② (`2327:95819`), ③ (`2327:95820`), ① (`2327:95827`). Redline measures: `12` (`2327:95821`), `8` (`2327:95824`), `16` vertical (`2327:95828`/`2327:95830`).

**Menu rows (verbatim, top→bottom):**

| Row | Kind | Label | Lead | Trail (Checkbox / state) |
|-----|------|-------|------|--------------------------|
| Heading | Menu row/Heading | Teams | — | text `--color-text-menu-tertiary` rgba(255,255,255,0.4) |
| 1 | Complex | Team A | square avatar `--color-multiplayeryellow` #ffcd29 "A" | **Checkbox ON, hover** — row bg `--color-bg-brand` #0d99ff; check bg #0d99ff, border `--color-border-selected-strong` #007be5, `icon.16.check` |
| 2 | Complex | Team B | square avatar `--color-multiplayerpink` #ff24bd "A" | Checkbox OFF — bg `--color-bg-secondary` #383838, border `--color-border` #444 |
| Divider | | | | |
| Heading | Menu row/Heading | Organizations | — | tertiary text |
| 3 | Complex | Org A | circle avatar `--color-multiplayergrey` #679 (workspace glyph) | Checkbox ON — bg `--color-bg-brand` #0c8ce9, border #7cc4f8, check |
| 4 | Complex | Org B | circle avatar #679 (workspace) | Checkbox OFF — bg #383838, border #444 |
| Divider | | | | |
| Footer | Container → Button | Clear all | — | bordered button, border `--color-bordertranslucent` rgba(255,255,255,0.1), text `--color-text` white |

> Note (faithful capture): checkbox brand fills differ between the Teams group (#0d99ff / #007be5) and Organizations group (#0c8ce9 / #7cc4f8) in source — the two light/dark brand ramps appear side-by-side. Preserved as-is.

---

## Section 5 — Menu row trail variations

Node: `2327:95890` (`Section`, 1280 × 480)

### Heading + description

Component Name (`2327:95892`, Whyte Regular 18px):

> Menu row trail variations

Description (`2327:95893`, Whyte Book 13px), verbatim:

> For menu rows, we have different trail for different use-cases. We offer these trail variants: subtext, badge, checkbox, and mixed (subtext and checkbox).

### Numbered callouts (Labels list `2327:95894`)

1. Subtext trail (`2327:95897`)
2. Badge trail (`2327:95900`)
3. Checkbox trail (`2327:95903`)
4. Mixed (subtext and checkbox) trail (`2327:95906`)

### Light panel (`2327:95907`)

Menu specimen `Menu multi-select` (`2327:95913`, centered, 208px). Directional callouts ② (`2327:95931`), ① (`2327:95932`), ③ (`2327:95933`), ④ (`2327:95934`) — all right-side leaders.

**Menu rows (verbatim, top→bottom; grouped by trail variant):**

| Row | Lead | Label | Trail variant | Trail content |
|-----|------|-------|---------------|---------------|
| 1 | — | NY Designer | **subtext** | `24` (secondary text) |
| 2 | — | SF Designer | subtext | `53` |
| Divider | | | | |
| 3 | circle avatar `--color-multiplayerred` #f24822 "A" | Sara Personal | **badge** | Badge small "Menu", bg `--color-bg-toolbar` #2c2c2c, text `--color-text-onbrand` white |
| 4 | circle avatar (Blue `--color-multiplayerblue` #007be5 "A") | Acme Pro | badge | Badge small "Menu" |
| Divider | | | | |
| 5 | square avatar `--color-multiplayeryellow` #ffcd29 "A" | Team A | **checkbox** | Checkbox ON — bg #0d99ff, border #007be5, check |
| 6 | square avatar `--color-multiplayerpurple` #9747ff "A" | Team B | checkbox | Checkbox OFF — bg #383838, border #444 |
| Divider | | | | |
| 7 | — | NY Designers | **mixed** | `24` subtext + Checkbox OFF; row bg `--color-bg-brand` #0d99ff (selected) |
| 8 | — | SF Designers | mixed | `53` subtext + Checkbox ON (#0d99ff / #007be5, check) |
| Divider | | | | |
| Footer | Container → Button | Clear all | — | bordered button |

---

## Section 6 — Menu headers

Node: `2327:95935` (`Section`, 1280 × 480)

### Heading + description

Component Name (`2327:95937`, Whyte Regular 18px):

> Menu headers

Description (`2327:95938`, Whyte Book 13px), verbatim (no trailing period in source):

> We occasionally use headings above groups of related menu items

### Numbered callouts (Labels list `2327:95939`)

1. Menu heading (`2327:95942`)
2. On state (`2327:95945`)
3. Divider between sections (`2327:95948`)
4. Example with a mix of actions and binary states (`2327:95951`)

### Light panel (`2327:95952`)

Two menu specimens side by side in `Frame 2` (`2327:95956`, gap 40px): left `Menu example filters` (`2327:95957`) and right `_menu.filters` (`2327:95958`), each 208px. Directional callouts ① (`2327:95953`), ② (`2327:95954`), ③ (`2327:95972`) left-side leaders; ④ (`2327:95973`) bottom up-leader. Redline measures: `32` (`2327:95966`), `16` (`2327:95969`).

**Left menu `Menu example filters` (`2327:95957`) — rows verbatim:**

| Row | Kind | Label | On? |
|-----|------|-------|-----|
| Heading | Menu row/Heading | Sort by | |
| 1 | Checkmark | Date | on (check) |
| 2 | Checkmark | Alphabetical | off |
| 3 | Checkmark | Unread | off |
| Divider | | | |
| Heading | Menu row/Heading | Filter | |
| 4 | Checkmark | All files | on (check) |
| 5 | Checkmark | Design files | off |
| 6 | Checkmark | FigJam files | off |

**Right menu `_menu.filters` (`2327:95958`) — rows verbatim:**

| Row | Kind | Label | Trail | Notes |
|-----|------|-------|-------|-------|
| 1 | Simple | Hide comments | `⇧C` | **selected** — bg #0d99ff |
| 2 | Simple | Mark all as read | — | |
| Divider | | | | (8px divider variant `2327:95961`) |
| Heading | Menu row/Heading | Notify me about | | |
| 3 | Checkmark | All comments | — | on (check) |
| 4 | Checkmark | Mentions and replies | — | off |
| 5 | Checkmark | None | — | off |

Heading text color `--color-text-menu-tertiary` rgba(255,255,255,0.4). Menu surface `--color-bg-menu` #1e1e1e.

---

## Section 7 — Overflow

Node: `2327:95974` (`Section`, 1280 × 312)

### Heading + description

Component Name (`2327:95976`, Whyte Regular 18px):

> Overflow

Description (`2327:95977`, Whyte Book 13px, width 320), verbatim (three paragraphs, blank line between 1 and 2; curly quotes and trailing space as in source):

> There are situations where our menu options may flow below a fold, particularly when dealing with many options in a smaller viewport. In this case, we’ll use _menu.row.expand, which is a distant cousin of our accordion component.
>
> The default background is bg-menu, and hover state is bg-menu-hover. The overflow scrolls the menu to expose more options on hover, and does not function like a button. There are no focus states.

No `Labels` numbered list in this section.

### Light panel (`2327:95978`)

Two menu specimens plus a `System / Arrow` connector (`2327:95986`, 32px box) and a redline (`2327:95987`) measuring `24` (`_Label/Redline/Text` `2327:95988` + `_Label/Redline/Vertical Bar` `2327:95989`):

**`_Menu fonts weights` (`2327:95979`, 208 × 400, positioned partly above the frame at top -162px)** — the long/overflowing menu. Surface `--color-bg-menu` #1e1e1e, vertical padding `--spacer-2` (8px), shadow `light/elevation-400-menu-panel`. `Menu row/Checkmark` rows (verbatim, top→bottom):

| Row | On? | Label | State |
|-----|-----|-------|-------|
| 1 | off | Thin | Default |
| 2 | off | Light | Default |
| 3 | off | Regular | Default |
| 4 | off | Medium | Default |
| 5 | off | Bold | Default |
| — | Divider | | |
| 6 | off | Thin Italic | Default |
| 7 | off | Light Italic | **Hover** (bg `--color-bg-menu-selected` #0d99ff) |
| 8 | off | Regular Italic | Default |
| 9 | off | Medium Italic | Default |
| 10 | off | Bold Italic | Default |
| — | Divider | | |
| 11 | off | Weight: 550 | Default |
| 12 | on (check) | Weight: 450 | Default |
| 13 | off | Weight: 350 | Default |
| — | Divider | | |
| 14 | off | Variable font axes... | Default |
| 15 | `Menu row/Expand` | (chevron only) | **Hover** (bg `--color-bg-menu-hover` #2c2c2c), pinned to panel bottom |

**`Menu` (`2327:95980`, 334 × 312)** — a swatch of the `Menu row/Expand` component states, laid out in `Options` (`2327:95981`, dashed `--color-multiplayerpurple` #9747ff border, gap 8px, padding 24px). Four `Menu row/Expand` rows (208px each), showing the four state × expanded combinations:
1. Default, collapsed — bg `--color-bg-menu` #1e1e1e, bottom-rounded, `icon.24.chevron.down`.
2. Hover, collapsed — bg `--color-bg-menu-hover` #2c2c2c, bottom-rounded.
3. Default, expanded — bg `--color-bg-menu` #1e1e1e, top-rounded, chevron rotated 180° (up).
4. Hover, expanded — bg `--color-bg-menu-hover` #2c2c2c, top-rounded, chevron rotated 180° (up).

### Component — `Menu row/Expand` (variant axes)

`MenuRowExpand` props (from component definition embedded here):
- `expanded`: boolean (default false)
- `state`: `"Default" | "Hover"` (default `"Default"`)

Container: 24px high, 208px wide. Glyph is `icon.24.chevron.down` (5×3px Icon) centered in a 24px box; when `expanded`, the chevron is rotated 180° to point up. Background: `--color-bg-menu` #1e1e1e (Default) / `--color-bg-menu-hover` #2c2c2c (Hover). Corners: collapsed → bottom-rounded `--radius-large` (13px); expanded → top-rounded `--radius-large`. No focus state.

---

## Section 8 — Expanded Menu Positioning

Node: `2327:95990` (`Section`, 1280 × 312)

### Heading + description

Component Name (`2327:95992`, Whyte Regular 18px):

> Expanded Menu Positioning

Description (`2327:95993`, Whyte Book 13px, width 320), verbatim:

> There’s 4px of space between each parent and child menu that expands. The menus expand downward and diagonally.

No `Labels` numbered list.

### Light panel (`2327:95994`)

Panel inset `0_74px_0_502px`, radius 13px. Three cascading `Menu example` specimens (208px each, surface `--color-bg-menu` #1e1e1e, vertical padding `--spacer-2` 8px, shadow `light/elevation-400-menu-panel`) staggered downward-and-rightward, plus a `System / Arrow` connector (`2327:96021`, 32px box, at right 300 / top 138) and two `4` redline measures (`2327:96022` at left 239, `2327:96027` at left 451 — each `_Label/Redline/Horizontal Bar` + `_Label/Redline/Text`) marking the 4px parent↔child gaps.

**Menu 1 — root menu (`2327:95995`, 208px, positioned top -103px / bottom 119px, left 36px)** — `Menu row/Simple` rows, each with `icon.16.chevron.right` trail (24px box). Verbatim, top→bottom:

| Row | Label | Notes |
|-----|-------|-------|
| 1 | File | |
| 2 | Edit | |
| 3 | View | |
| 4 | Object | |
| 5 | Text | |
| 6 | Arrange | |
| 7 | Vector | |
| — | Divider | (`2680:269666`, `--color-border-menu` #383838) |
| 8 | Plugins | **selected** — container bg `--color-bg-menu-selected` #0d99ff |
| 9 | Widgets | |
| 10 | Preferences | |
| 11 | Libraries | |

**Menu 2 — second level (`2327:96009`, 208px, horizontally centered, bottom 96px)** — `Menu row/Simple` rows, each with `icon.16.chevron.right` trail. Verbatim, top→bottom:

| Row | Label | Notes |
|-----|-------|-------|
| 1 | Option | |
| 2 | Option | |
| 3 | Option | **selected** — container bg `--color-bg-menu-selected` #0d99ff |
| 4 | Object | |
| 5 | Option | |

**Menu 3 — third level (`2327:96016`, 208px, right 36px, bottom 64px)** — `Menu row/Checkmark` rows, each with leading `icon.16.check` (16px box, glyph at left 4px) and `--spacer-4` (24px) left indent. Verbatim, top→bottom:

> Option, Option, Option, Option (all four `on` / checked, Default state)

---

## Component / token capture (from frames where get_design_context resolved)

### Menu surface & rows

- Menu panel: bg `--color-bg-menu` #1e1e1e, radius `--radius-large` (0.8125rem / 13px), vertical padding `--spacer-2` (8px), width 208px. Shadow `light/elevation-400-menu-panel`: drop-shadow 0/2/5 #00000026; 0/10/16 #0000001F; 0/0/0.5 #0000001F.
- Row container: min-height 24px, horizontal padding `--spacer-2` (8px), radius `--radius-medium` (0.3125rem / 5px), gap `--spacer-1` (~0.3rem / 4px).
- Row text: `body/medium` (Inter, 11px, lineHeight 16px, tracking 0.055px), color `--color-text-menu` white.
- Shortcut / secondary trail text: color `--color-text-menu-secondary` rgba(255,255,255,0.7).
- Selected/hover row: bg `--color-bg-menu-selected` #0d99ff (shortcut text flips to `--color-text-menu` white on hover in the Checkmark variant).
- Divider (`Menu row/Divider`, `2327:96331`): 1px line, bg `--color-border-menu` #383838, radius 2px, in a 16px-high box (8px variant also used, `2327:95961`).
- Heading (`Menu row/Heading`): padding `--spacer-3` (1rem / 16px) × `--spacer-1`, text color `--color-text-menu-tertiary` rgba(255,255,255,0.4).
- Checkmark column indent: `--spacer-4` (1.5rem / 24px) left padding; check glyph `icon.16.check` (8×7px) at left 4px.
- Submenu indicator: `icon.16.chevron.right` (also `icon.24.chevron.right` in toggles menu) in a 24px box, right-aligned.

### Row trail elements (Section 5 + 4)

- **Subtext**: secondary text, right-aligned, e.g. counts ("24", "53").
- **Badge** (`Badge small`): bg `--color-bg-toolbar` #2c2c2c, radius `--radius-medium`, height 16px, padding `--spacer-1`, text `--color-text-onbrand` white, `body/medium`.
- **Checkbox** (`Check`, 16px): ON → bg `--color-bg-brand` (#0d99ff or #0c8ce9), border `--color-border-selected-strong` (#007be5 or #7cc4f8), `icon.16.check`; OFF → bg `--color-bg-secondary` #383838, border `--color-border` #444.
- **Avatar** (`Avatar`, 16px): variants — square (radius `--radius-small` 0.125rem / 2px) or circle (`--radius-full` 9999px). Colors observed: `--color-multiplayeryellow` #ffcd29 (text-on rgba(0,0,0,0.9)), `--color-multiplayerpink` #ff24bd, `--color-multiplayerblue` #007be5, `--color-multiplayerred` #f24822, `--color-multiplayerpurple` #9747ff, `--color-multiplayergrey` #679 (workspace glyph). Initial text uses `body/small/strong` (9px, lineHeight 14px).
- **Footer button** (`Button`): height 24px, border `--color-bordertranslucent` rgba(255,255,255,0.1), radius `--radius-medium`, label text `--color-text` white. Label "Clear all".

### Doc-chrome elements

- `_Label/Num` (`2327:93995`): 24px circle, bg #f5f5f5 (doc list) or `--ramp-grey-300` #d9d9d9 (panel callouts), number in Whyte Regular 13px, color rgba(0,0,0,0.9), lineHeight 32.
- `_Label/Directional-Subtle`: numbered chip + dashed leader line (left, right, up, or down variants).
- `_Label/Redline/Horizontal Bar` / `Vertical Bar` / `Text`: measurement annotations; bar color `--color-border-measure-strong` #dc3412, text chip bg `--color-bg-measure` #f24822, text `--color-text-onmeasure` white (Inter Medium 11px, lineHeight 12px). Guide lines: dashed/solid #ffc7c2 at 30% opacity.

---

## Cross-section token summary (captured values)

Color variables referenced across the page (var → fallback observed):

- `--color-bg` / panel doc bg: white
- `--color-bg-secondary`: #f5f5f5 (doc panel) / #383838 (checkbox-off bg, in menu context)
- `--color-bg-menu`: #1e1e1e
- `--color-bg-menu-selected`: #0d99ff
- `--color-bg-brand`: #0d99ff (and #0c8ce9 dark-ramp variant)
- `--color-bg-toolbar`: #2c2c2c
- `--color-bg-measure`: #f24822
- `--color-border-menu`: #383838
- `--color-border`: #444
- `--color-border-selected-strong`: #007be5 (and #7cc4f8 variant)
- `--color-bordertranslucent`: rgba(255,255,255,0.1)
- `--color-border-measure-strong`: #dc3412
- `--color-text` (in menu context): white
- `--color-text-menu`: white
- `--color-text-menu-secondary`: rgba(255,255,255,0.7)
- `--color-text-menu-tertiary`: rgba(255,255,255,0.4)
- `--color-text-onbrand`: white
- `--color-text-onmeasure`: white
- `--ramp-grey-300`: #d9d9d9
- Multiplayer avatar colors: `--color-multiplayerblue` #007be5, `--color-multiplayerred` #f24822, `--color-multiplayeryellow` #ffcd29, `--color-multiplayerpink` #ff24bd, `--color-multiplayerpurple` #9747ff, `--color-multiplayergrey` #679 (with matching `--color-texton*` foregrounds)

Dimension / radius tokens:
- `--spacer-1`: ~0.3rem (4px) — row gap, badge/checkbox padding
- `--spacer-2`: 0.5rem (8px) — row horizontal padding, panel vertical padding
- `--spacer-3`: 1rem (16px) — heading horizontal padding
- `--spacer-4`: 1.5rem (24px) — checkmark-column left indent
- `--radius-small`: 0.125rem (2px) — square avatar
- `--radius-medium`: 0.3125rem (5px) — row, button, badge, checkbox
- `--radius-large`: 0.8125rem (13px) — menu panel
- `--radius-full`: 9999px — circle avatar
- Menu panel width: 208px; row min-height: 24px; check / avatar / checkbox: 16px; chevron box: 24px
