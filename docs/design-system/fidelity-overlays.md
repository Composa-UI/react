# Fidelity Audit — Overlays & Surfaces (value-level)

**Component group:** Tooltip, Dialog, Menu, MenuRow, ListCell, MetaLabel, Header
**Figma source:** file `4kilp0ShQiYsoUPJdleqEH` (UI3: Figma's UI Kit, Community). Sets:
- Tooltip set `2015:39095` (page `2015:32842`, "Tooltips") — 8 `Direction`s × `Variant=Default`.
- Menu page `2028:86486`; `Menu row/Complex` `2327:96049`, `Menu row/Heading` `2327:96347`, `Menu row/Footer` `2327:96342`, `Menu row/Divider` `2327:96331`, menu container "Menu example" `2327:96374`.
- Dialog = UI3 `Modal header` (`2327:122027`), `Modal footer` (`2327:122061`), `Modal body/Input` (`2327:122018`), assembled template `2327:121900`.
- ListCell / MetaLabel / Header have **no 1:1 published UI3 component** — they are Composa abstractions. They are audited against the Figma text styles and tokens they compose from (menu-row text, modal-header title, `body/medium`, `body/medium/strong`, `body/small/strong`).

**Our source:** `styles.css` (`.composa-tooltip*`, `.composa-dialog*`, `.composa-menu*`, `.composa-menu-row*`, `.composa-list-cell*`, `.composa-meta-label*`, `.composa-header*`) with custom properties resolved through `design/tokens.css` → `design/generated/composa-core-tokens.css` + `composa-semantic-tokens.css`.

**Method:** Each Figma node was resolved to exact computed values via `get_design_context` + `get_variable_defs`. Each CSS rule was resolved to a concrete hex/px by following the token chain. Light mode only. Every cell is a resolved value-to-value comparison; no screenshots are used as evidence.

**Resolved token reference (light mode), used throughout:**
`--composa-space-1`=4px · `--composa-space-2`=8px · `--composa-space-3`=16px · `--composa-radius-small`=2px · `--composa-radius-medium`=5px · `--composa-radius-large`=13px · `--composa-radius-full`=9999px · `--composa-height-input`=24px · `--composa-color-text`=rgba(0,0,0,0.9) · `--composa-color-text-secondary`=rgba(0,0,0,0.5) · `--composa-color-border`=#e6e6e6 · `--composa-color-bg`=#ffffff · `--composa-color-bg-secondary`=#f5f5f5 · body-medium 11px/16px/450 · body-medium-strong 11px/16px/550 · body-large 13px/22px/550 · body-small 9px/14px.

---

## Summary

| Component | Rows checked | MISMATCH | FLAG-FOR-OWNER |
|---|---:|---:|---:|
| Tooltip | 12 | 4 | 3 |
| Dialog | 13 | 6 | 2 |
| Menu (container) | 7 | 4 | 2 |
| MenuRow | 11 | 5 | 1 |
| ListCell | 6 | 1 | 2 |
| MetaLabel | 5 | 2 | 1 |
| Header | 6 | 2 | 2 |
| **Total** | **60** | **24** | **13** |

### Top issues (highest signal)

1. **Overlay elevation tokens are wrong on Tooltip and Dialog.** Figma uses purpose-built effect styles: Tooltip → `elevation-300-tooltip` (`0 1 3 rgba(0,0,0,.10)`, `0 5 12 rgba(0,0,0,.13)`, `0 0 .5 rgba(0,0,0,.15)`); Dialog window → `elevation-500-modal-window` (`0 2 5`, `0 10 24`, `0 0 .5`, `0 3 12`). Both ours use `--composa-elevation-200-canvas`. The Menu correctly uses `elevation-400-menu-panel`. **Add `--composa-elevation-300-tooltip` and `--composa-elevation-500-modal-window` and bind them.**

2. **Tooltip background is the wrong color model.** Figma `color-bg-tooltip` = solid **`#1e1e1e`**. Ours `--composa-tooltip-bg` = `rgba(0,0,0,0.9)` (renders ~#1a1a1a over white but is translucent, so it tints whatever is behind it). Should be a solid `#1e1e1e` token.

3. **Dialog header/footer geometry is off.** Figma `Modal header` and `Modal footer` are both a fixed **40px** (`spacer-6`) tall with **8px** internal padding; the title is **body/medium/strong 11px/16px/550**. Ours pads `12px` (`--composa-dialog-padding`) with no fixed height, and `.composa-dialog-title` is **body-large 13px/22px**. Header also needs a **bottom border** (`#e6e6e6`) that ours omits.

4. **Menu surface has invented horizontal padding and row gap.** Figma menu container has `py:8 px:0` (rows are full-bleed, each row owns its own `px:8`) and **no inter-row gap**. Ours adds `padding: 8px 4px` and `gap: 2px` between rows.

5. **MenuRow radius and inline padding diverge.** Figma row container = `radius-medium` **5px**, padding `pl:8 pr:4`. Our `.composa-menu-row` hardcodes `border-radius:3px` and `padding:0 6px`. (Note `.composa-menu-item` is correct: 5px + `px:4`.)

6. **Menu/tooltip foreground opacities are slightly low.** Figma menu/tooltip primary text = `#ffffff` (`color-text-menu` / `color-text-tooltip`); secondary = `#ffffffb2` (≈0.698). Ours: `--composa-menu-row-fg`=`rgba(255,255,255,0.92)`, `--composa-menu-row-fg-secondary`=`rgba(255,255,255,0.62)`. Off by 0.08 / 0.08.

7. **Menu divider color model differs.** Figma `color-border-menu` = solid **`#383838`**. Ours `--composa-menu-divider-border` = `rgba(255,255,255,0.26)`.

---

## Tooltip — `2015:39095` (Variant=Default, 8 Directions)

Figma exposes **one tone** (dark `#1e1e1e`) and **8 placements** (TopCenter, BottomCenter, TopLeft, TopRight, BottomLeft, BottomRight, Left, Right). Geometry is identical across placements; only arrow position changes.

### Shared (apply to all 8 placements)

| Property | Figma (resolved) | Ours (resolved) | Result |
|---|---|---|---|
| Background | `color-bg-tooltip` = `#1e1e1e` (solid) | `--composa-tooltip-bg` = `rgba(0,0,0,0.9)` (translucent) | **MISMATCH (Figma `#1e1e1e` solid vs ours `rgba(0,0,0,0.9)`)** — add `--composa-tooltip-bg: #1e1e1e` |
| Text color | `color-text-tooltip` = `#ffffff` | `--composa-tooltip-fg` = `#ffffff` | **OK** |
| Hotkey/secondary text | `color-text-tooltip-secondary` = `#ffffffb2` (0.698) | inherits `#ffffff` (no secondary tooltip token) | **MISMATCH (Figma `#ffffffb2` vs ours `#ffffff`)** — add a tooltip-secondary token |
| Radius | `radius-medium` = `5px` | `--composa-radius-medium` = `5px` | **OK** |
| Padding | `px:8 py:4` (`spacer-2`/`spacer-1`) | `.composa-tooltip` `4px 8px` | **OK** |
| Gap (label↔hotkey) | `spacer-1` = `4px` | none set on `.composa-tooltip` | **MISMATCH (Figma `4px` vs ours none)** — minor |
| Max width | `200px` | `max-width: 240px` | **FLAG-FOR-OWNER (Figma `200px` vs ours `240px`)** |
| Min height | (content; rows are 24px) | `min-height: 24px` | **OK** |
| Font | body/medium 11px/16px/450 | inherits body-medium | **OK** |
| Elevation | `elevation-300-tooltip` (`0 1 3 / 0 5 12 / 0 0 .5`) | `--composa-elevation-200-canvas` | **MISMATCH (wrong elevation token)** — bind to a new `--composa-elevation-300-tooltip` |
| Arrow | 12×6 triangle SVG, 8px from edge (corner placements) / centered | 8px rotated square (`--composa-tooltip-arrow-size: 8px`), offset −4px | **FLAG-FOR-OWNER** — different arrow primitive (rotated-square vs 12×6 triangle); visually close, geometrically different |

### Per-placement

| Placement | Figma arrow anchor | Ours | Result |
|---|---|---|---|
| TopCenter / BottomCenter | centered ±0.5px | `.composa-tooltip-top/-bottom` center | **OK** |
| Left / Right | mid-height, ±6px | `.composa-tooltip-left/-right` | **OK** |
| TopLeft / TopRight / BottomLeft / BottomRight | 8px from the near edge | `--composa-tooltip-arrow-edge-offset: 12px` | **MISMATCH (Figma `8px` edge inset vs ours `12px`)** |

**FLAG-FOR-OWNER (Tooltip tones):** Figma ships **only the dark tooltip**. Our component adds a light **`.composa-tooltip-default`** tone (white bg, `#e6e6e6` border, `color-text`) plus implied tone API. No Figma counterpart — invented surface. Values: bg `#ffffff`, border `#e6e6e6`, text `rgba(0,0,0,0.9)`. Keep as a deliberate extension or drop.

---

## Dialog — UI3 Modal (`Modal header` `2327:122027`, `Modal footer` `2327:122061`, body `2327:122018`)

| Region | Property | Figma (resolved) | Ours (resolved) | Result |
|---|---|---|---|---|
| **Window** | Background | `color-bg` = `#ffffff` | `--composa-color-bg` = `#ffffff` | **OK** |
| **Window** | Border | (templates: 1px `#e6e6e6`) | `1px var(--composa-color-border)` = `#e6e6e6` | **OK** |
| **Window** | Radius | template corner (8px observed) | `--composa-dialog-radius` = `8px` | **OK** |
| **Window** | Elevation | `elevation-500-modal-window` (`0 2 5 / 0 10 24 / 0 0 .5 / 0 3 12`) | `--composa-elevation-200-canvas` | **MISMATCH (wrong elevation token)** — bind a new `--composa-elevation-500-modal-window` |
| **Window** | Width | templates `320` / `480` | `--composa-dialog-width-320`=320, `-480`=480 | **OK** |
| **Window** | Default/small/large width | (n/a in Figma) | default 360 / small 300 / large 480 | **FLAG-FOR-OWNER** — 360/300 are Composa-added sizes with no Figma source |
| **Header** | Height | `spacer-6` = `40px` (fixed) | no fixed height; pad `12px` | **MISMATCH (Figma fixed `40px` vs ours padding-driven)** |
| **Header** | Inner padding | `8px` (`p-8` on title + icons) | `--composa-dialog-padding` = `12px` | **MISMATCH (Figma `8px` vs ours `12px`)** |
| **Header** | Title font | body/medium/strong `11px/16px/550` | `.composa-dialog-title` body-large `13px/22px/550` | **MISMATCH (Figma `11px` medium-strong vs ours `13px` body-large)** — use `--composa-body-medium-*` + strong weight |
| **Header** | Title color | `color-text` = `rgba(0,0,0,0.9)` | `--composa-color-text` | **OK** |
| **Header** | Bottom border | 1px `color-border` = `#e6e6e6` | none on `.composa-dialog-header` | **MISMATCH (Figma has header bottom border; ours omits)** — should use `--composa-color-border` |
| **Footer** | Height | `spacer-6` = `40px` (fixed) | padding `12px`, no fixed height | **MISMATCH (Figma fixed `40px`)** |
| **Footer** | Top border | 1px `color-border` = `#e6e6e6` | `border-top: 1px var(--composa-color-border)` | **OK** |
| **Footer** | CTA gap | `spacer-2` = `8px` | `.composa-dialog-actions` gap `--composa-space-2` = `8px` | **OK** |
| **Footer** | Secondary/helper text | `color-text-secondary` = `#00000080` | `--composa-color-text-secondary` = `rgba(0,0,0,0.5)` | **OK** |
| **Body** | Padding | `16px` (`spacer-3`) container, `8px` stack gap | `.composa-dialog-body` gap `--composa-space-3`=16, pad `0 12 12` | **MISMATCH (Figma body inset `16px` vs ours `12px`)** |
| **Body** | Text color | `color-text-secondary` = `rgba(0,0,0,0.5)` | `--composa-color-text-secondary` | **OK** |
| **Row** (`.composa-dialog-row`) | min-height | dialog rows compose ListCell (28px in ours) | `min-height: 28px` | **FLAG-FOR-OWNER** — no dedicated Figma modal-row height; 28px is a Composa choice |

---

## Menu container — "Menu example" `2327:96374`

| Property | Figma (resolved) | Ours (resolved) | Result |
|---|---|---|---|
| Surface background | `color-bg-menu` = `#1e1e1e` | `--composa-menu-surface-bg` = `#1f1f1f` | **FLAG-FOR-OWNER (Figma `#1e1e1e` vs ours `#1f1f1f`)** — 1-tone drift; align to `#1e1e1e` |
| Radius | `radius-large` = `13px` | `--composa-menu-radius` = `--composa-radius-large` = `13px` | **OK** |
| Elevation | `elevation-400-menu-panel` (`0 2 5 / 0 10 16 / 0 0 .5`) | `--composa-elevation-400-menu-panel` | **OK** |
| Vertical padding | `py:8` (`spacer-2`) | part of `padding: 8px 4px` | **OK (vertical)** |
| Horizontal padding | `px:0` (rows are full-bleed, own `px:8`) | `padding: … 4px` (4px sides) | **MISMATCH (Figma `0` sides vs ours `4px`)** |
| Inter-row gap | none (flex-col, no gap) | `gap: var(--composa-menu-row-gap)` = `2px` | **MISMATCH (Figma `0` vs ours `2px`)** |
| Divider color | `color-border-menu` = `#383838` (solid) | `--composa-menu-divider-border` = `rgba(255,255,255,0.26)` | **MISMATCH (Figma `#383838` vs ours `rgba(255,255,255,0.26)`)** |
| Selected row bg | `color-bg-menu-selected` = `#0d99ff` | `--composa-menu-row-bg-selected` = `#0d99ff` | **OK** |

**FLAG-FOR-OWNER (heading text style):** `.composa-menu-heading` first label uses `--composa-menu-row-fg` (`rgba(255,255,255,0.92)`); Figma `Menu row/Heading` text is `color-text-menu-tertiary` = `rgba(255,255,255,0.4)`. Heading is rendered via MetaLabel — see MetaLabel section.

---

## MenuRow — `Menu row/Complex` `2327:96049` (+ Simple/Heading/Footer)

Compared against `.composa-menu-row` (the primary row). `.composa-menu-item` is a parallel rule and is noted where it differs.

| Property | Figma (resolved) | Ours `.composa-menu-row` | Result |
|---|---|---|---|
| Row min-height | `24px` | `min-height: var(--composa-menu-row-height)` = `24px` | **OK** |
| Container radius | `radius-medium` = `5px` | `border-radius: 3px` | **MISMATCH (Figma `5px` vs ours `3px`)** — use `--composa-radius-medium` (note `.composa-menu-item` already uses 5px) |
| Inline padding | `pl:8 pr:4` (`spacer-2`/`spacer-1`) | `padding: 0 6px` | **MISMATCH (Figma `8px`/`4px` vs ours `6px`/`6px`)** |
| Inter-slot gap | `spacer-1` = `4px` (lead↔text), `spacer-2` for label↔trail | `gap: 2px` | **MISMATCH (Figma `4px`/`8px` vs ours `2px`)** |
| Primary text | `color-text-menu` = `#ffffff`, body/medium 11px/16px/450 | `--composa-menu-row-fg` = `rgba(255,255,255,0.92)` | **MISMATCH (Figma `#ffffff` vs ours `rgba(255,255,255,0.92)`)** |
| Secondary (shortcut) text | `color-text-menu-secondary` = `#ffffffb2` (0.698) | `--composa-menu-row-fg-secondary` = `rgba(255,255,255,0.62)` | **MISMATCH (Figma `#ffffffb2` vs ours `rgba(255,255,255,0.62)`)** |
| Hover / Selected bg | `color-bg-brand` = `#0d99ff` | `--composa-menu-row-bg-hover`/`-selected` = `#0d99ff` | **OK** |
| Selected text | `color-text-menu` = `#ffffff` | `--composa-menu-row-fg-selected` = `rgba(255,255,255,0.92)` | **MISMATCH (Figma `#ffffff` vs ours `rgba(255,255,255,0.92)`)** |
| Badge bg (Trail=Badge) | `color-bg-toolbar` = `#2c2c2c` | `--composa-menu-badge-bg` = `#383838` | **MISMATCH (Figma `#2c2c2c` vs ours `#383838`)** |
| Badge text | `color-text-onbrand` = `#ffffff` | `--composa-menu-row-fg-secondary` = `rgba(255,255,255,0.62)` | **MISMATCH (Figma `#ffffff` vs ours secondary)** |
| Checkbox (Trail=Checkbox) bg/border | `color-bg-brand` `#0d99ff` / `color-border-selected-strong` `#007be5` | selection-control tokens `#0d99ff` border `#0d99ff` | **FLAG-FOR-OWNER (border `#007be5` in Figma vs `#0d99ff` ours)** |

---

## ListCell — Composa abstraction (anchors: menu/dialog rows, `body/medium`)

Levels 1/2/3 set min-height; hierarchy (`menu`/`section`/`property`/`panel`/`layer`) drives text color via MetaLabel. No 1:1 Figma component; values checked against the row text styles Figma uses.

| Property | Figma anchor | Ours (resolved) | Result |
|---|---|---|---|
| Level-1 min-height | (header rows ~32px) | `.composa-list-cell-level-1` `32px` | **OK** |
| Level-2 min-height | (≈28px dialog row) | `28px` | **OK** |
| Level-3 / base min-height | menu/list row `24px` | base `.composa-list-cell` `24px`, level-3 `24px` | **OK** |
| Inline padding | menu/dialog rows `px:8` | `padding: 0 var(--composa-space-2)` = `8px` | **OK** |
| Gap (leading↔content) | `spacer-2` = `8px` | `gap: var(--composa-space-2)` = `8px` | **OK** |
| Underline / divider | 1px `color-border` = `#e6e6e6` (panel/layer dividers) | `.has-underline` `1px var(--composa-color-border)` = `#e6e6e6` | **OK** |
| Level-1 title type | (Figma headers are 11px medium-strong; see Header) | body-large `13px/22px/550` | **MISMATCH (level-1 title `13px` vs Figma header `11px`)** — same root cause as Header title |

**FLAG-FOR-OWNER:** ListCell `level`×`hierarchy` matrix (3 levels × 5 hierarchies) is a Composa information-architecture layer with no direct Figma set; the geometry maps cleanly to menu/dialog/panel rows but the level-1 type scale is a Composa decision. **FLAG-FOR-OWNER:** leading slot fixed `24px` (`.composa-list-cell-leading`) vs Figma menu lead icon 16px in a 16-wide slot — Composa uses a wider 24px gutter for panel alignment.

---

## MetaLabel — Composa abstraction (anchors: menu heading / shortcut text)

`.composa-meta-label` base: `body-small-size` **9px** / `body-small-line` 14px / weight **550** / color `color-text-secondary`.

| Hierarchy | Figma anchor | Ours (resolved) | Result |
|---|---|---|---|
| base size | menu heading/label text = body/medium **11px/16px/450** | base meta-label **9px/14px/550** | **MISMATCH (Figma `11px/450` vs ours `9px/550`)** — meta-label is a size *and* weight step below Figma's menu label |
| `menu` | `color-text-menu-secondary` = `#ffffffb2` (≈0.7) | `--composa-menu-row-fg-secondary` = `rgba(255,255,255,0.62)` | **MISMATCH (Figma `#ffffffb2` vs ours `rgba(255,255,255,0.62)`)** |
| `section` | same as menu secondary | `--composa-menu-row-fg-secondary` | inherits menu mismatch — **MISMATCH** |
| `property` | `color-text-tertiary` = `rgba(0,0,0,0.3)` | `--composa-color-text-tertiary` = `rgba(0,0,0,0.3)` | **OK** |
| menu-heading first label | `color-text-menu` = `#ffffff` | `.composa-menu-heading > .composa-meta-label:first-child` = `--composa-menu-row-fg` (0.92) | **OK (within row-fg drift)** |

**FLAG-FOR-OWNER:** The 9px/550 base is a deliberate "caption/eyebrow" treatment. Figma's nearest token (`body/small/strong`) is also 9px/550 — so MetaLabel's **base size matches `body.small.strong`**, and the mismatch is only that Composa uses MetaLabel where Figma menu headings use full-size `body/medium`. Owner to decide whether menu headings should step up to 11px.

---

## Header — Composa abstraction (composes ListCell; anchors: Modal header, panel header)

| Property | Figma anchor | Ours (resolved) | Result |
|---|---|---|---|
| Title font | Modal header title body/medium/strong `11px/16px/550` | `.composa-header-title` body-medium `11px/16px` + `--composa-body-medium-strong-weight` 550 | **OK** |
| Title color | `color-text` = `rgba(0,0,0,0.9)` | `--composa-color-text` | **OK** |
| Disclosure/icon-action size | 24px icon button | `.composa-header-disclosure/-icon-action` `24×24` | **OK** |
| Disclosure/icon color | `color-icon-secondary` = `rgba(0,0,0,0.5)` | `--composa-color-icon-secondary` = `rgba(0,0,0,0.5)` | **OK** |
| Actions group gap | `spacer-2` = `8px` (Modal header icons) | `.composa-header-actions` `gap: 0` | **MISMATCH (Figma `8px` vs ours `0`)** |
| Level-1 header height | Modal header `40px` | inherits ListCell level-1 `32px` | **MISMATCH (Figma modal header `40px` vs ours `32px`)** — only when used as a dialog header; panel headers have no fixed Figma height |

**FLAG-FOR-OWNER:** Header reuses the generic ListCell height ladder (32/28/24) rather than the Modal-header-specific 40px. If Dialog adopts a fixed 40px header (see Dialog section), Header level-1 in dialog context should follow. **FLAG-FOR-OWNER:** the `composa-header-${hierarchy}` × level matrix (panel/property/section/layer/menu) is a Composa structure with no single Figma equivalent; geometry resolves correctly through ListCell.

---

## Suggested token additions (for the owner)

1. `--composa-elevation-300-tooltip: 0 1px 3px rgba(0,0,0,.10), 0 5px 12px rgba(0,0,0,.13), 0 0 .5px rgba(0,0,0,.15);` → bind on `.composa-tooltip`.
2. `--composa-elevation-500-modal-window: 0 2px 5px rgba(0,0,0,.15), 0 10px 24px rgba(0,0,0,.18), 0 0 .5px rgba(0,0,0,.08), 0 3px 12px rgba(0,0,0,.05);` → bind on `.composa-dialog`.
3. `--composa-tooltip-bg: #1e1e1e;` (solid, replacing `rgba(0,0,0,0.9)`) + `--composa-tooltip-fg-secondary: rgba(255,255,255,.7)`.
4. `--composa-menu-surface-bg: #1e1e1e;` · `--composa-menu-divider-border: #383838;` · `--composa-menu-badge-bg: #2c2c2c;`.
5. Lift `--composa-menu-row-fg` to `#ffffff` (or rgba .92→ owner call), `--composa-menu-row-fg-secondary` 0.62→0.70.
6. `.composa-menu-row` → `border-radius: var(--composa-radius-medium)` (5px) and `padding: 0 var(--composa-space-2)` with `pr: var(--composa-space-1)`.
7. Dialog header/footer: `height: 40px`, `padding: var(--composa-space-2)` (8px), header `border-bottom: 1px var(--composa-color-border)`, title → `--composa-body-medium-*` at strong weight.
