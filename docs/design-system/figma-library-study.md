# UI3 Figma Library Study — Catalog, React Parity Worklist, and Token Curation

**Source:** UI3: Figma's UI Kit (Community) — `fileKey 4kilp0ShQiYsoUPJdleqEH`
**URL:** https://www.figma.com/design/4kilp0ShQiYsoUPJdleqEH/UI3--Figma-s-UI-Kit--Community-
**Captured:** 2026-06-16 via Figma MCP (`get_metadata`, `search_design_system`). Variant
property names are read from live component-set node names; the data below reflects the
*published* kit, not our repo's prior assumptions.

> This is a study/reference doc only. It does not modify tokens, CSS, or code.
> Authority for our current React prop surface: `design/component-api.json`,
> `src/react/factory.js`. Token provenance: `design/ui3-variable-inventory.json`,
> `design/generated/composa-*-tokens.css`, `design/tokens.css`.

---

## 1. Library map & navigation method

### Navigation note (important)
`get_metadata` with **only** the fileKey returns just **one** top-level page — `Cover`
(`2732:26039`). The kit's component pages are **not** enumerable through the page list.
Two methods that DO work:

1. **`search_design_system`** (filtered to the UI3 `libraryKey`
   `lk-dee9f0a6…761880ae`) returns published **component sets** with `componentKey`s.
   It is unstable across repeated queries within a session (returns `{}` after the first
   substantive hit), so issue one broad query and harvest everything from it.
2. **`get_metadata` on a known component node-id** returns the full variant matrix as
   child node names of the form `🐣 State=…, 👥 Variant=…, 🎛️ Disabled=…`. This is the
   most reliable path and the source of section 2 below. The known node-ids in
   `design/component-map.json` / `src/figma/code-connect-map.json` are all valid.

`get_variable_defs` **fails** in this headless context — it requires an active layer
selection in the Figma desktop app ("You currently have nothing selected"). Variable
harvesting therefore relies on the already-captured inventory in
`design/ui3-variable-inventory.json` (see section 3).

### Pages / sections found
Each component lives on its own canvas/page with a **Guidelines** frame (redlined
specs + light/dark context) plus the raw **component-set** frames. Confirmed pages:

| Page / canvas | Node | Contents |
|---|---|---|
| Cover | `2732:26039` | Cover art (only page the page-list API exposes) |
| Overview | `2012:163499` | Live in-context samples: Button, Segmented control, Combo input, Slider, Avatar (Default/Large + status ring), Switch, Check, Badge small, Menu row/Toolbar, design.toolbar, mode toggle. Good single-node visual sanity check. |
| Buttons | `2012:46721` | `Button`, `Button icon`, `Button icon toggle`, `Button icon dialog toggle`, `Button icon split` component sets + guidelines |
| Inputs | `2028:75376` | `Text input`, `Color input`, `Numeric input`, `Numeric input multi`, `Combo input`, `_Combo input dropdown`, `Dropdown` |
| Dropdown | `2028:36589` | `Dropdown` component set |
| Switch | `2015:24697` | `Switch` component set |
| Radio button | `2015:20365` | `Radio button` component set |
| Checkbox | `2012:55461` | `Checkbox` component set |
| Tooltips | `2015:32842` | `Tooltip` + `Tooltip link` component sets |
| Segmented control | `2015:20960` | `Segmented control` component set |
| Tabs | `2015:25519` | `_Tab` (atom) + `Tabs` (count wrapper) component sets |
| Menus | `2028:86486` | Nine separate `Menu row/*` component sets + `Menu multi-select` + in-product menu examples |
| Modal/Dialog | `2327:122027` | **Needs re-confirmation** — node resolves to a single 400×40 `Variant=Default` symbol, not a modal frame (see §2 Dialog) |

Other published component sets surfaced by search: **Notifications** (`1fb933df…`), a large
icon library (`icon.16.*`, `icon.24.*` components). Avatar, Badge, Slider, Check appear as
in-context instances on Overview but were not resolved to standalone published sets in this
pass (they are likely on their own pages reachable by node-id once captured).

### Published component keys (UI3 library, from search)
| Component set | componentKey |
|---|---|
| Button | `f7de0805266e001123fb3e2ec254b0643ea42caa` |
| Button icon | `b7e9cc243ccae745eadff33c3b52e48d7742b563` |
| Button icon toggle | `03e4f29cca1d229597f6928e3be5dbceb2a79dc1` |
| Button icon dialog toggle | `e5407d20a1d355008218d33f6504edd30aaf9a3d` |
| Button icon split | `d7f54554ac05c4bb7c4529a276762c88431ae815` |
| Radio button | `7bf155cb29a9198f4adde35f33a4bfe5cd6001db` |
| Notifications | `1fb933df5e553076ba150a770e3150134f3871a4` |

---

## 2. Component catalog → React parity

Figma variant properties below are the **exact** property keys/values from live node
names (emoji prefixes stripped: `🐣`=state-ish, `👥`=variant-ish, `🎛️`=toggle, `👁️`=visibility).
"React" columns reflect `design/component-api.json` + `src/react/factory.js`.

### 2.1 Button → `Button`
**Figma `Button` set properties** (node `2012:46721`):
- `Variant`: Primary, Secondary, Ghost, Link, **Link Danger**, FigJam, Destructive,
  **Secondary Destruct**, Inverse, Success, Default, Highlighted
- `Size`: Default, Large, Wide, **Small**
- `State`: Default, Hover, Active, Focus/Focused, Disabled, **Primary Active**,
  **Primary Focus**, **Secondary Active**, **Secondary Focus**
- `Icon Lead`: False, Left-aligned, Center-aligned
- `Disabled`: False/True · `On`: False/True (toggle-button axis, shared page)

| Figma | React | Gap |
|---|---|---|
| Variant `Link Danger` | `Link-danger` | Naming mismatch (hyphen vs space). Normalize to one canonical token. |
| Variant `Secondary Destruct` | `Secondary-destruct` | Naming mismatch. |
| Size `Small` | **missing** (`Default/Large/Wide` only) | **ADD `Small` size.** |
| State `Primary/Secondary Active`/`Focus` | **missing** | These are toggle-button states bleeding into the Button page; map to ToggleButton, not Button. Don't add to Button. |
| `state` Active/Focused | present | OK |

### 2.2 IconButton / ToggleButton / SplitButton → `IconButton`, `ToggleButton`, `SplitButton`
Figma splits these into **four distinct component sets** (we collapse into one
`IconButton` family with a `component` discriminator):
- `Button icon` — plain icon button
- `Button icon toggle` — `State`, `Variant=Default/Secondary/Highlighted`, `On=True/False`, `Disabled`
- `Button icon dialog toggle` — adds the chevron/dialog affordance
- `Button icon split` — primary action + chevron dropdown (described in library as split button)

Shared toggle axes seen on the Buttons page: `Variant: Default/Secondary/Highlighted`,
`On: False/True`, `Disabled: False/True`, `State: …/Active/Focus`.

| Figma | React | Gap |
|---|---|---|
| `Variant=Highlighted` | `highlighted` | OK |
| `On=True/False` | `pressed` boolean | Naming differs (`On` vs `pressed`); values map. |
| `Button icon split` is its own set | `component:"SplitButton"` | We model split as a sub-variant; acceptable, but confirm split's chevron/menu props match. |
| context `on-selected` | present in React | Not seen as a Figma variant key — likely a usage context, OK to keep. |

### 2.3 Input family → `InputField`, `NumericInput`, `NumericInputMulti`, `ColorInput`, `ComboInput`
**Figma Inputs set properties** (node `2028:75376`) — a *single combined* component set
spanning Text/Color/Numeric/Combo:
- `Variant`: Single Line, Multi Line, Quick Action, Default, Partial Disable, **Circle**, **Square**
- `Size`: Default, Large
- `State`: Default, Hover, Focus/Focused/**Focuse** (typo in kit), Active, Empty,
  Disabled, **Disabled Secondary**, **Disabled Tertiary**, Variable, Active Empty,
  Active Filled, Selected, Selected input, Selected chevron, **On Selected**,
  **Soft Deleted**, **Value Not Rendered**
- `Type`: Fill, Opacity, Image, Gradient, Variable, **Instance**
- toggles: `Disabled`, `Dropdown`, `Icon Lead`, `Var icon`, `Var pill`, `Variable`, **`Close Button`**

| Figma | React | Gap |
|---|---|---|
| `Close Button` toggle | **missing** | **ADD** clearable/close affordance to InputField. |
| `Variant=Circle`/`Square` | **missing** | Color-input swatch shapes — **ADD** to ColorInput (`shape: circle/square`). |
| `Type=Instance` | **missing** (have Fill/Opacity/Image/Gradient/Variable) | **ADD** for ColorInput/Combo. |
| State `Disabled Secondary`/`Disabled Tertiary` | only `Disabled` | **ADD** disabled-tier states (or map to opacity tiers). |
| State `Soft Deleted`, `Value Not Rendered`, `On Selected` | **missing** | Niche; defer but document. |
| React extra `Partial Disable` | matches Figma `Partial Disable` | OK |

### 2.4 Dropdown → `Dropdown`
**Figma** (node `2028:36589`): `Size=Default/Large`, `State=Default/Focused/Active`,
`Disabled`, `Stroke=True/False`, `Icon Lead=True/False`.
**React:** `size`, `state(Default/Focused/Active)`, `disabled`, `stroke`, `iconLead`.
**Parity: full match.** No gaps.

### 2.5 Switch → `Switch`
**Figma** (node `2015:24697`): `State=Default/Focused`, **`Type=On/Off/Mixed`**, `Disabled=True/False`.

| Figma | React | Gap |
|---|---|---|
| `Type=On/Off/Mixed` | `checked` boolean only | **GAP: no `Mixed` (indeterminate) switch state.** Add `mixed`/indeterminate. Figma models on/off as a `Type` enum, not a boolean — our boolean is fine but must add the third state. |
| `State` has only Default/Focused | React has `default/hover/focused/disabled` | React's `hover` has no Figma counterpart for Switch (harmless superset). |
| React `size: default/compact` | not a Figma Switch variant axis | Our compact size is a repo extension; keep but note it's not in UI3. |

### 2.6 Radio → `Radio`
**Figma `Radio button`** (node `2015:20365`): `Variant=Input/Button`,
`State=Default/Focused/Active/Disabled`, `On?=On/Off`, `Label=True/False`.

| Figma | React | Gap |
|---|---|---|
| `Variant=Button` (segmented/button-style radio) | **missing** (Input-style only) | **ADD `variant: input/button`.** |
| `State=Active` | **missing** (have default/hover/focused/disabled) | **ADD `Active`** (pressed). React `hover` not in Figma. |
| `Label=True/False` | `label` string (always rendered) | Add explicit label-off (icon-only) mode to match. |

### 2.7 Checkbox → `Checkbox`
**Figma** (node `2012:55461`): `State=Default/Focused`, `Type=Checked/Unchecked/Mixed`,
`Disabled`, `Muted=True/False`, `Ghost=True/False`.
**React:** `state(Default/Focused)`, `type(Unchecked/Checked/Mixed)`, `disabled`, `muted`,
`ghost`, `label`, `description`. **Parity: full match** (factory's `checkedValue`
handles checked/unchecked/mixed correctly). No gaps.

### 2.8 Tooltip → `Tooltip`
**Figma** is **two** sets (node `2015:32842`):
- `Tooltip`: `Variant=Default`, **`Direction=` TopCenter, BottomCenter, TopLeft, TopRight,
  BottomLeft, BottomRight, Left, Right** (8 positions)
- `Tooltip link`: `Variant=URL, Link, Phone, Email, Page, Prototype, Frame, File` (link-type tooltips)

| Figma | React | Gap |
|---|---|---|
| `Direction` 8-way (incl. corner variants) | `placement: top/right/bottom/left` (4) | **GAP: add the 4 corner placements** (TopLeft/TopRight/BottomLeft/BottomRight) — or document we only support edge-centered. |
| `Tooltip link` set (URL/Link/Phone/Email/Page/Prototype/Frame/File) | **entirely missing** | **NEW component/variant**: link-tooltip. Decide whether to add as `Tooltip variant="link"` with a `linkType` prop, or skip. |
| React `tone: default/inverse` | Figma has single `Variant=Default` | Our tone split is a repo extension; not in UI3. |

### 2.9 Dialog → `Dialog`
**NEEDS RE-CONFIRMATION.** Node `2327:122027` (`<FIGMA_UI3_DIALOG>`) resolves to a single
`👥 Variant=Default` **symbol 400×40** — that is a row/banner-sized atom, **not** a modal
frame. Our React `Dialog` (`size: small/default/large`, `tone: default/destructive`,
title/description/primary/secondary labels) is plausible but the mapped Figma node looks
wrong. **Action:** re-locate the real Modal/Dialog component set (search
`search_design_system` for "Modal"/"Dialog", or open the Dialog page by node-id) and fix
the anchor in `code-connect-map.json` before any Dialog parity work. Current
`size`/`tone` values are unverified against Figma.

### 2.10 SegmentedControl → `SegmentedControl`
**Figma** (node `2015:20960`): `Variant=Icon/Label`, **`Tab Count=02/03/04/05/06`**,
`State=Default/Disabled`.

| Figma | React | Gap |
|---|---|---|
| `Tab Count=02..06` (explicit count variants) | dynamic `options[]` array | We model count via array length — functionally equivalent. Document the supported 2–6 range. |
| `Variant=Icon/Label` | `variant: icon/label` | OK |
| `State=Default/Disabled` | `state: default/disabled` + `disabled` | OK |
| **Parity: effectively full** | | No required gaps; just cap options at 2–6 to match. |

### 2.11 Tabs → `Tabs`
**Figma** is two sets (node `2015:25519`):
- `_Tab` (atom): `Single Tab=True/False`, `Selected=True/False`, `State=Default/Focused/Hover`
- `Tabs` (wrapper): `Tab Count=1/2/3/4`

| Figma | React | Gap |
|---|---|---|
| `Single Tab=True` (single-tab presentation) | **missing** | **ADD** single-tab mode. |
| `Tab Count=1..4` | dynamic `tabs[]` | Array models this; cap 1–4. |
| React `variant: underline/pill` | Figma exposes only underline `_Tab` | **`pill` has no UI3 source** — either remove `pill`, or keep as repo extension and label it non-UI3. |
| `State=Default/Focused/Hover` | `state: default/focused/hover` | OK |

### 2.12 Menu / MenuRow → `Menu`, `MenuRow`
**Figma models each row type as its OWN component set** (node `2028:86486`). This strongly
validates our `MenuRow.type` enum. Per-set variant axes:

| Figma set | Variant axes | Maps to React `type=` |
|---|---|---|
| `Menu row/Simple` | `State=Default/Disabled/Hover`, `Submenu=True/False` | `simple` |
| `Menu row/Complex` | `State=Default/Hover`, `Lead=False/Avatar/Icon`, `Trail=False/Shortcut/Badge/Checkbox/Mixed` | `complex` |
| `Menu row/Checkmark` | `Variant=Check/Dot`, `State=Default/Disabled/Hover`, `Submenu=True/False` | `checkmark` (+ `checkVariant=check/dot`) |
| `Menu row/Toggle` | `Toggle State=On/Off`, `hasIcon=true/false` | `toggle` (+ `toggleState`, `hasIcon`) |
| `Menu row/Toolbar` | `State=Default/Disabled/Hover` | `toolbar` |
| `Menu row/Heading` | `Alignment=Default/Toggle` | `heading` (+ `alignment`) |
| `Menu row/Expand` | `State=Default/Hover`, `Expanded=True/False` | `expand` (+ `expanded`) |
| `Menu row/Divider` | (none) | `divider` |
| `Menu row/Footer` | `Property 1=Default` | `footer` |
| `Menu multi-select` (container) | `Variant=Default/Label Only/Avatars/Mixed Icons` | (Menu container, not a row) |

| Gap | Detail |
|---|---|
| Row-level `Submenu` (Simple, Checkmark) | React has `submenu` boolean — OK |
| `Complex.Trail` values | Figma: False/Shortcut/Badge/Checkbox/Mixed — React `trail` matches exactly. OK |
| `Complex.Lead` values | Figma: False/Avatar/Icon — React `lead` matches. OK |
| Menu **container** `Variant=Default/Label Only/Avatars/Mixed Icons` | **No React `Menu` container variant** — we only have `MenuRow`. Consider a `Menu`-level variant prop. |
| Footer `Property 1=Default` | single variant — OK |
| **Parity: very strong**; only the container-level variant is missing. |

### 2.13 CanvasSelectionOverlay → `CanvasSelectionOverlay`
Mapped to **UI2** (community), node `0:20495`, not UI3. Out of scope for UI3 parity; leave
as-is. Our 13 `type` values + `direction` are a repo construct, not a single Figma set.

### 2.14 Components in UI3 we do NOT yet model in React
- **Avatar** (Overview shows `Default`/`Large` sizes + status ring: Solid/Dash Spotlight,
  color bar). No React `Avatar`. **Candidate new family.**
- **Badge** (`Badge small` on Overview). No React `Badge`. **Candidate new family.**
- **Slider** (Overview `Slider` with BG/Fill/Handle). No React `Slider`. **Candidate new family.**
- **Check** (standalone check chip, Overview `Check`). Likely covered by Checkbox icon mode.
- **Notifications** (published set `1fb933df…`). No React equivalent.
- **Tooltip link** (see §2.8).

---

## 3. Token / variable catalog + curation recommendation

### Collections (from `design/ui3-variable-inventory.json`)
| Collection | Figma ID | Modes | Var count |
|---|---|---|---|
| **Colors** | `1326:3133` | Light, Dark, FigJam-Light, FigJam-Dark, DevMode-Light, DevMode-Dark, Slides-Light, Slides-Dark (8) | **946** |
| **Sizing** | `1:672455` | Default (1) | 12 |
| **Typography** | `1:672468` | Mode 1 (1) | 57 |
| **Total** | | | **1015** |

The 946 colors are inflated by full **brand-color ramps** (per-hue 50→900 scales) plus the
six non-product modes (FigJam / DevMode / Slides, light+dark). For a product UI library only
**Light + Dark** matter; FigJam/DevMode/Slides modes can be dropped wholesale.

### What we already curate (good baseline — keep this shape)
`design/generated/composa-core-tokens.css` already resolves a **curated 25 color
primitives** + sizing/radius, and `composa-semantic-tokens.css` exposes **46 semantic
tokens**. The curated core color set is already grouped sensibly:

- `bg/*` (13): bg, bg-secondary, bg-brand, bg-selected, bg-on-selected, bg-secondary-on-canvas, …
- `text/*` (10): text, text-secondary, text-tertiary, text-on-brand, text-component, …
- `icon/*` (6): icon, icon-secondary, icon-tertiary
- `border/*` (3): border, border-translucent
- `accent/*` (5): accent-blue, accent-component, accent-measure, accent-spacing
- `multiplayer` (2), `scrollbar` (1), `fs-canvas-default-fill` (1)

Plus component-level practical tokens in `design/tokens.css` (control/menu/switch/selection/
tooltip/dialog/tabs/segmented) and `radicle-*` brand colors.

### Recommendation — "reasonable" curated set

**Keep ~35–45 semantic color tokens** across Light + Dark (the current ~25 core + a small
number of additions). Concretely:

**KEEP (semantic / functional — what components actually bind):**
- **Surfaces** `bg`, `bg-secondary`, `bg-secondary-on-canvas`, `bg-brand`, `bg-selected`,
  `bg-selected-secondary`, `bg-on-selected`, `bg-disabled`, `bg-hover` (~9)
- **Text** `text`, `text-secondary`, `text-tertiary`, `text-on-brand`, `text-disabled`,
  `text-danger`/`text-component` (~6)
- **Icon** `icon`, `icon-secondary`, `icon-tertiary`, `icon-on-brand` (~4)
- **Border** `border`, `border-translucent`, `border-strong`/`border-selected` (~3–4)
- **Accent / state** `accent-blue` (brand blue `#0d99ff`), `accent-danger`/destructive,
  `accent-success`, `accent-warning`, `accent-component`, `accent-measure`, `accent-spacing` (~7)
- **Focus ring** one token (currently `bg-brand` reused) (1)
- **Utility** `scrollbar`, `multiplayer-*` (keep the 2–3 we already have)

That is **~35–40 tokens × {Light, Dark}**. Sizing (12) and Typography (57) collections are
small enough to keep nearly whole — though 57 type vars likely include duplicate
size/line/weight triples per role; curate to the ~12 roles components use
(body-medium/large + heading + their strong weights, already started in semantic CSS).

**DROP / DEFER:**
- The full **brand-color ramps** (the bulk of the 946): per-hue 50–900 scales (`blue/100`,
  `red/700`, etc.) used for illustration/data-viz, not component theming. Exclude unless a
  charting need appears.
- **FigJam-Light/Dark, DevMode-Light/Dark, Slides-Light/Dark** modes — out of product scope.
- Raw Figma alias chains — we already resolve to final values, keep doing that.

**Net:** target roughly **70–90 color custom-properties total** (≈35–45 semantic names ×
2 modes), down from 946 — a ~90% reduction while preserving everything components bind to.
This aligns with the curation already in `composa-core-tokens.css`; the main additions to
consider are explicit **state colors** (danger/success/warning, disabled bg/text) which the
component parity work (destructive buttons, partial-disabled inputs) will need.

---

## 4. Code Connect note

**What currently depends on the UI3 community file:**
- `figma.config.json` — `documentUrlSubstitutions` map 11 React families to UI3 node-id URLs
  (`<FIGMA_UI3_BUTTON>` → `…node-id=2012-46721`, etc.) + the one UI2 canvas-decorations URL.
- `src/figma/code-connect-map.json` — readiness map; every family is
  `templateStatus: "blocked-pending-live-property-names"` and points `propAuthority` at
  `design/component-api.json`. **No `.figma.ts` templates exist yet** (the
  `include` glob `src/figma/**/*.figma.ts` matches nothing).
- `design/component-map.json` — names the UI3 library + fileKey/libraryKey and maps
  app-shell nodes; also references UI2 community/copy libraries for historical components.

**Does parity work need Code Connect?** **No.** The Phase-4 parity worklist in §2 is driven
entirely by `design/component-api.json` ⇄ live Figma variant names (this doc). Code Connect
is a *publishing/linking* layer that maps a published Figma component to a code snippet; it
does not gate prop/state alignment. Because every template is still
`blocked-pending-live-property-names` and **zero `.figma.ts` files are committed**, removing
Code Connect now costs nothing and unblocks nothing — the owner can defer it and later
publish our **own** Figma library, then write Code Connect against that instead of the
community file. Recommended sequence: (1) do React parity from §2; (2) build/publish our own
UI3-aligned library; (3) add Code Connect templates pointing at the owned library, replacing
the community-file URL substitutions in `figma.config.json`.

> One cleanup independent of all the above: the **Dialog anchor** (`2327:122027`) in
> `figma.config.json` / `code-connect-map.json` points at a 400×40 atom, not a modal.
> Re-locate the real Modal/Dialog set and fix the URL before Dialog parity/Code Connect.

---

## Appendix — top parity gaps (ranked)

1. **Switch** — add `Mixed`/indeterminate state (Figma `Type=On/Off/Mixed`).
2. **Radio** — add `Variant=Button` (button-style radio) and `State=Active`.
3. **InputField** — add `Close Button` (clearable) toggle; add `Disabled Secondary/Tertiary` tiers.
4. **ColorInput** — add swatch `shape` (`Circle`/`Square`) and `Type=Instance`.
5. **Tooltip** — add 4 corner `Direction`s; decide on the `Tooltip link` set (URL/Link/Phone/Email/Page/Prototype/Frame/File).
6. **Button** — add `Size=Small`; normalize `Link-danger`/`Secondary-destruct` naming to match Figma `Link Danger`/`Secondary Destruct`.
7. **Tabs** — add single-tab mode; reconcile `pill` variant (no UI3 source — keep-as-extension or drop).
8. **Menu** — add container-level `Variant=Default/Label Only/Avatars/Mixed Icons`.
9. **New families** — Avatar, Badge, Slider, Notifications exist in UI3 with no React equivalent.
10. **Dialog** — re-confirm the real component set; current anchor is wrong, props unverified.
