# UI3 Figma Foundations Study — Color, Type, Elevation, Spacing/Grid

**Source:** UI3: Figma's UI Kit (Community) — `fileKey 4kilp0ShQiYsoUPJdleqEH`
**URL:** https://www.figma.com/design/4kilp0ShQiYsoUPJdleqEH/UI3--Figma-s-UI-Kit--Community-
**Captured:** 2026-06-16 via Figma MCP (`get_metadata`, `search_design_system` filtered to the UI3
`libraryKey`, `get_variable_defs`) cross-referenced with `design/ui3-variable-inventory.json`.

> Study/reference only. This doc does NOT modify tokens, CSS, or code. Token additions proposed in
> §5 are **additions only** (the parity gate fails on changed/removed values, not additions).
> Current state read from `tokens/primitive/*`, `tokens/semantic/semantic.json`, `design/tokens.css`,
> `design/ui3-variable-inventory.json`.

---

## 0. How the foundations were located (navigation method)

The page-list API is crippled for this file: `get_metadata` with only the fileKey returns **only**
`Cover` (`2732:26039`). `Overview` (`2012:163499`) is reachable by its known node-id but is just a
live in-context sample composition, not a foundations spec page. **Dedicated "Color / Typography /
Elevation / Grid" doc pages are NOT reachable** through the page list, and no node-ids for them are
recorded in the repo, so they could not be screenshotted directly.

What *did* work, and is authoritative, is the **published library surface**:

1. `search_design_system` **filtered to the UI3 libraryKey**
   (`lk-dee9f0a6…761880ae`) returns UI3's own published **effect styles** (the elevation ramp) and
   **Typography variable collection** (every role's fontSize / fontFamily / fontWeight / lineHeight /
   letterSpacing). This is how the elevation and type-scale structure below was confirmed.
2. `design/ui3-variable-inventory.json` (captured earlier via the plugin API
   `figma.variables.getLocalVariableCollectionsAsync`) gives the **collection-level ground truth**:
   the three UI3 variable collections, their modes, and exact variable counts.
3. `get_variable_defs` on the Overview frame (`2012:183374`) resolved the body type values and the
   spacer/radius primitives actually consumed in-product.

**Conclusion on "foundation pages":** In UI3, foundations are expressed as **variable collections
and effect styles**, not as reachable documentation pages. This study works from the variable/style
surface, which is the source of truth anyway.

### The three UI3 variable collections (ground truth)

| Collection | Figma id | Modes | Variable count |
|---|---|---|---:|
| **Colors** | `VariableCollectionId:1326:3133` | Light, Dark, FigJam-Light, FigJam-Dark, DevMode-Light, DevMode-Dark, Slides-Light, Slides-Dark (8) | **946** |
| **Sizing** | `VariableCollectionId:1:672455` | Default (1) | **12** |
| **Typography** | `VariableCollectionId:1:672468` | Mode 1 (1) | **57** |

Plus a published **Effect-style** ramp (the elevation system, light + dark) — see §3.

Our repo currently carries ~25 colors, 4 spacing/sizing values, and ~12 typography fields — a small
practical curation of the 1015 total UI3 variables. That is by design (we only need what components
consume), but several **foundational** values are missing and should be added so Foundations docs and
theming are complete.

---

## 1. Color system

### Structure
- **One collection, `Colors`, 946 variables, 8 modes.** The semantic model is mode-driven: the same
  variable name (e.g. `bg/bg-brand`) resolves differently across Light / Dark and the product-surface
  modes (FigJam, DevMode, Slides). Our repo collapses this to **two** modes (light default +
  `$extensions.composa.dark`) and a small Slides override — that is an acceptable subset, but the
  FigJam / DevMode surface modes are entirely absent (not needed for the product app today).
- **Naming is semantic-role first**, confirmed from cover art and published variable paths:
  `_/bg/bg-brand`, `_/bg/bg-selected`, `_/text/*`, `_/icon/*`, `_/border/*`, `_/special/shadow`.
  Primitive ramps (grey scale, blue ramp, etc.) exist underneath but UI3 exposes mostly the semantic
  layer to consumers — which is exactly the shape of our `tokens/semantic/semantic.json`.

### Semantic categories present in UI3 (and our coverage)
| Category | UI3 examples | We have | Gap |
|---|---|---|---|
| **bg** | bg, bg-secondary, bg-tertiary, bg-brand, bg-brand-secondary/tertiary, bg-selected, bg-selected-secondary, bg-on-selected, bg-hover, bg-active, bg-disabled, bg-danger, bg-success, bg-warning, bg-component, bg-menu | bg, bg-secondary, bg-secondary-on-canvas, bg-brand, bg-selected, bg-selected-secondary, bg-on-selected | **bg-tertiary, bg-hover, bg-active, bg-disabled, and the status backgrounds (danger/success/warning), bg-brand-secondary/tertiary, bg-component** |
| **text** | text, text-secondary, text-tertiary, text-disabled, text-on-brand, text-brand, text-danger, text-success, text-warning, text-component, text-hover, text-onselected | text, text-secondary, text-tertiary, text-on-brand, text-component, text-on-multiplayer-yellow | **text-disabled, text-brand, text-danger/success/warning, text-hover, text-selected** |
| **icon** | icon, icon-secondary, icon-tertiary, icon-disabled, icon-on-brand, icon-brand, icon-danger/success/warning, icon-component | icon, icon-secondary, icon-tertiary | **icon-disabled, icon-on-brand, icon-brand, status icons, icon-component** |
| **border** | border, border-secondary, border-strong, border-brand, border-selected, border-disabled, border-danger, border-translucent | border, border-translucent | **border-strong, border-selected, border-brand, border-disabled, status borders** |
| **accent** | accent-blue, accent-purple/component, accent-red/measure, accent-pink/spacing, accent-green, accent-yellow, accent-teal | accent-blue, accent-component, accent-measure, accent-spacing | **accent-green, accent-yellow, accent-teal, accent-red (named)** |
| **special** | special/shadow (the effect-color the elevation styles bind to), scrollbar, multiplayer colors | scrollbar, multiplayer-yellow, text-on-multiplayer-yellow | **special/shadow** (so elevation can theme per mode) |

> Exact hex for the missing semantic roles must be confirmed from the live `Colors` collection before
> adding (they vary per mode). The structural gaps above are certain; the values are a follow-up read.

### Confirmed concrete values (from repo + Overview node, light mode)
bg `#ffffff` / dark `#2c2c2c`; bg-secondary `#f5f5f5` / dark `#383838`; bg-brand `#0d99ff` / dark
`#0c8ce9` (Slides bg-brand `#ff5c16`); text `rgba(0,0,0,.9)` / dark `#ffffff`;
text-secondary `rgba(0,0,0,.5)`; text-tertiary `rgba(0,0,0,.3)`; border `#e6e6e6` / dark `#444444`;
border-translucent `rgba(0,0,0,.1)`; icon mirrors text. These match our tokens 1:1 — our curation is
accurate, just narrow.

---

## 2. Type scale

UI3 `Typography` collection = **57 variables, single mode**. Confirmed role structure (every role
carries `fontSize`, `fontFamily`, `fontWeight`, `lineHeight`, `letterSpacing`; body roles also have a
`strong/*` sibling for `lineHeight`/`letterSpacing` and a strong weight):

**Families:** product UI = **Inter**. (Documentation chrome in the file uses **Whyte** via a
doc-only `_doc/heading` style — that is NOT a product token; ignore it.)

| Role | Family | Size | Weight (reg / strong) | Line-height | Confirmed? |
|---|---|---:|---|---:|---|
| heading/display | Inter | (read) | reg / — | (read) | name ✓, value TODO |
| heading/large | Inter | (read) | reg / — | (read) | name ✓, value TODO |
| heading/medium | Inter | (read) | reg / — | (read) | name ✓, value TODO |
| heading/small | Inter | (read) | reg / — | (read) | name ✓, value TODO |
| body/large | Inter | **13px** | **450 / 550** | **22px** | **value ✓** |
| body/medium | Inter | **11px** | **450 / 550** | **16px** | **value ✓** |
| body/small | Inter | (read) | reg / strong | (read) | name ✓, value TODO |

**What is certain:** the *named roles* (display, large, medium, small for headings; large, medium,
small for body, each with a `strong` variant), the family (Inter), and that **every role has an
explicit lineHeight and letterSpacing variable**. We confirmed body/medium = 11/16 and body/large =
13/22 with weights 450 (regular) / 550 (strong) directly.

**What we lack in tokens (`tokens/primitive/typography.json`):**
- **All heading roles** (display / large / medium / small) — sizes, weights, line-heights. *Currently
  zero heading tokens.*
- **body/small** (size + line-height + strong weight) — currently missing.
- **letterSpacing** for every role — currently we store none (UI3 defines it per role).
- **lineHeight for the `strong` variants** — UI3 defines `body/*/strong/lineHeight` separately; we only
  store one line per size.

The heading numeric values (display/large/medium/small fontSize + lineHeight) are the one set of
values not yet resolved in this pass — they exist as published Typography variables but were not bound
to any node reachable here. They must be read from the live collection (one `get_variable_defs` on a
heading instance, or the variables panel) before the heading tokens are added.

---

## 3. Elevation

UI3 publishes the full ramp as **Effect styles, light + dark for every level** (confirmed via filtered
`search_design_system`). The level names encode their intended use:

| Level | Name | Intended use (from name) | Light style key | Dark style key |
|---|---|---|---|---|
| 100 | `elevation-100-canvas` | resting cards / canvas objects | `2caf280e…` | `ce2b5dac…` |
| 200 | `elevation-200-canvas` | raised canvas objects | `9acaff4c…` | `e9389dbf…` |
| 300 | `elevation-300-tooltip` | tooltips, small popovers | `f6b4904e…` | `4374553117…` |
| 400 | `elevation-400-menu-panel` | menus, dropdowns, panels | `d1756cf9…` | `083a92cb…` |
| 500 | `elevation-500-modal-window` | modals / dialog windows | `0a3e7aa5…` | `dbfd1c2a…` |

The shadows bind their effect color to the `_/special/shadow` color variable (mode-aware), which is
why a single named level renders correctly in both light and dark.

**Confirmed concrete values (light, from repo):**
- `elevation-100-canvas`: `0 0 0.5px rgba(0,0,0,.3), 0 1px 3px rgba(0,0,0,.15)`
- `elevation-200-canvas`: `0 0 0.5px rgba(0,0,0,.18), 0 3px 8px rgba(0,0,0,.1), 0 1px 3px rgba(0,0,0,.1)`

**What we lack (`tokens/primitive/elevation.json` + semantic):**
- **Levels 300, 400, 500 entirely** (tooltip, menu-panel, modal-window) — we stop at 200.
- **Dark-mode variants for every level** — our elevation primitives have **no dark override at all**
  (unlike colors, which carry `$extensions.composa.dark`). Components today get menu/tooltip/dialog
  shadows from hard-coded values in `design/tokens.css`, not from a themed elevation token.
- The semantic `elevation` block exposes only `100-canvas` / `200-canvas`.

Values for 300/400/500 (light + dark) and the dark variants of 100/200 must be read from the live
effect styles before adding.

---

## 4. Spacing + grid + radius

### Sizing collection
UI3 `Sizing` = **12 variables, single Default mode**. From the Overview node's resolved variables and
our repo, the confirmed primitives are:

| Token | Value | In repo? |
|---|---|---|
| spacer-0 | 0 | ✓ space.0 |
| spacer-1 | **4px** | ✓ space.1 |
| spacer-2 | **8px** | ✓ space.2 |
| spacer-3 | 16px | ✓ space.3 (note: ramp likely has a 12px step between 8 and 16 — see below) |
| radius-none | 0 | ✓ |
| radius-small | **2px** | ✓ |
| radius-medium | **5px** | ✓ |
| radius-full | **9999px** | ✓ |
| height.input | **24px** | ✓ |
| height.heading | 40px | ✓ |

That accounts for 10 of 12 Sizing variables. **The 2 unaccounted-for variables are almost certainly
the missing spacer step(s)** — UI3's spacing ramp is base-4 and typically runs `0,4,8,12,16(,24,32)`.
Our `space` jumps 8 → 16 with no 12, and has no values above 16. There is also a `radius-large`
(13px) referenced in `design/tokens.css` as a hand-authored value that "intentionally diverges" — UI3
likely has a `radius-large` primitive (menus use ~13px) that we should confirm and source.

### Grid / layout
**No layout-grid variables or styles were found in the UI3 published surface** (search for
column/gutter/margin/container returned nothing). UI3 is a *desktop-app UI kit*, not a responsive web
grid system — it has **no column grid, no breakpoints**. This is expected. Our repo correctly has no
grid tokens, and **none are needed for parity**; any "Grid" we document is our own layout convention
(e.g. the 8px base unit applied to flex gaps), not a UI3 import.

### Radius scale
Confirmed: `none 0 / small 2px / medium 5px / full 9999px`, plus the hand-authored `large 13px`.
Likely UI3 has a published `radius-large` primitive to source `large` from rather than hard-coding it.

---

## 5. Token gap list (additions only — prioritized)

> All ADDITIONS. None change/remove existing values, so the parity gate stays green. Values marked
> *(read)* need one confirming `get_variable_defs` / variables-panel read before committing.

### P0 — foundational, blocks Foundations docs
**`tokens/primitive/typography.json`** (+ matching semantic aliases): ~20–28 fields
- `heading.display` / `heading.large` / `heading.medium` / `heading.small`: `size`, `line`, `weight`
  *(read)*.
- `body.small`: `size`, `line`, `weight`, `strong-weight` *(read)*.
- `letterSpacing` for each role *(read; many are 0)*.
- Optional: `body.*.strong.line` where it differs from regular.

**`tokens/primitive/elevation.json`** (+ semantic): +3 levels × 2 modes + dark for existing 2
- `elevation.300.tooltip` (light + dark) *(read)*.
- `elevation.400.menu-panel` (light + dark) *(read)*.
- `elevation.500.modal-window` (light + dark) *(read)*.
- Add `$extensions.composa.dark` to `elevation.100.canvas` and `200.canvas` *(read)*.

### P1 — completeness for theming
**`tokens/primitive/sizing.json`** (+ semantic): +2–4
- `space.4` (likely 12px) and a `space.5`/`space.6` (24/32px) to finish the base-4 ramp *(read; the 2
  unaccounted Sizing variables)*.
- `radius.large` (13px) sourced as a primitive instead of the hand-authored override *(confirm UI3 has
  it)*.

**`tokens/primitive/color.json`** (+ semantic): the missing semantic roles, grouped:
- Status: `bg/text/icon/border` × `danger / success / warning` *(read per mode)*.
- Interaction states: `bg-hover`, `bg-active`, `bg-disabled`, `text-disabled`, `icon-disabled`,
  `border-disabled` *(read)*.
- Brand depth: `bg-brand-secondary`, `bg-brand-tertiary`, `text-brand`, `border-brand`,
  `border-selected`, `border-strong` *(read)*.
- `bg-tertiary`, `bg-component`, `text-selected`, `icon-on-brand` *(read)*.
- Accents: `accent-green`, `accent-yellow`, `accent-teal`, `accent-red` *(read)*.
- `special-shadow` (the effect color the elevation styles bind to) so elevation themes per mode *(read)*.

Rough count: **~30–45 color additions** (subset of the 946 — only the semantic roles a product app
needs, not the full primitive ramps).

### Not needed (explicitly out of scope)
- Layout-grid / column / breakpoint tokens — UI3 has none.
- FigJam / DevMode color modes — not used by the product app.

**Rough additions per category:** typography ~20–28 · elevation ~8–10 · sizing ~2–4 · color ~30–45.

---

## 6. Foundations docs outline (MDX pages to write)

| Page | Key content (drawn from this study) |
|---|---|
| **Color** | The semantic-role model (bg / text / icon / border / accent / special); light↔dark mode pairing via `$extensions.composa.dark`; the role tables from §1 with swatches; note UI3's 8 modes vs. our 2 (+Slides); guidance: components consume `--composa-color-*`, never primitives. |
| **Typography** | Inter family; the role ladder (display/large/medium/small headings; large/medium/small body) with size/line/weight/letterSpacing table from §2; regular vs. `strong` (450/550); usage mapping (which role for labels, captions, dialog titles); note the doc-only Whyte font is not a product token. |
| **Spacing** | Base-4 ramp (`0,4,8,12,16,…`); the `--composa-space-*` tokens; component heights (input 24, heading 40); guidance to use spacers for gaps/padding. |
| **Elevation** | The 5-level ramp 100→500 with intended use (canvas / canvas / tooltip / menu-panel / modal-window); light+dark shadow values; how `special/shadow` makes a level theme-aware; mapping levels → components (cards=100/200, tooltip=300, menu/dropdown=400, dialog=500). |
| **Radius** | none/small/medium/large/full (0/2/5/13/9999); when to use each (controls=medium, menus/dialogs=large, pills/avatars=full). |
| **Grid** | Short page: UI3 has **no column grid**; document our own 8px-rhythm layout convention and that there are no responsive breakpoints. State explicitly this is our convention, not a UI3 import. |
| **Icons** | Two sizes (16 / 24) per the `icon.16.*` / `icon.24.*` library; sizing tokens `control-size-icon 24` / `control-size-icon-glyph 16`; cross-link to `docs/design-system/icons.md`. |

---

## 7. Open follow-ups (single live read each)

1. **Heading type values** — `get_variable_defs` on a heading instance (or read the Typography
   variables panel) to fill display/large/medium/small `fontSize` + `lineHeight` + `letterSpacing`.
2. **Elevation 300/400/500 + all dark variants** — read the 10 published effect styles' shadow specs.
3. **The 2 unaccounted Sizing variables** — confirm they are the `space.4`(12px)/`radius.large`(13px)
   steps.
4. **Missing semantic color values per mode** — read the `Colors` collection for the status /
   interaction-state / brand-depth roles listed in §5 (light + dark).
</content>
</invoke>
