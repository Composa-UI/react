# Codex → Composa reconciliation

Reconciliation of two lines that diverged from the common base `e34f0c9`.

- **CODEX line** — `16753b8` on `codex/ui3-component-foundation` (main worktree at `/Users/samuelalake/Documents/Figma Video`). Still uses the original `ui3` naming: `src/react/ui3.js`, `--ui3-*`, `data-ui3-component`, `ui3-component-stories.js`, story titles `UI3 React/...`.
- **COMPOSA line** — this worktree (`figma-state-parity`, tip `8a5b6bc`). Global `ui3`→`composa` rename, plus a Style Dictionary token pipeline, icons-as-slots (`builtin-glyphs.js` + slot resolution in `iconNode`), and structural Figma state-parity edits to 9 components.

Because Composa did a global rename, all comparisons below are **semantic**. Translate names when porting:

| Codex | Composa |
|---|---|
| `src/react/ui3.js` / `createUI3ReactComponents` | `src/react/factory.js` / `createComposaComponents` |
| `ui3-component-stories.js` | `composa-component-stories.js` |
| `ui3-variant-matrix.js` | `composa-variant-matrix.js` |
| `--ui3-*` CSS vars / `.ui3-*` classes | `--composa-*` / `.composa-*` |
| `data-ui3-component` | `data-composa-component` |
| story title `UI3 React/Components/...` | `Composa UI/Components/...` |
| `UI3Icon` | `ComposaIcon` |

Crucial fact for porting safety: **codex did NOT touch `src/design-system/variant-specs.js` or `variant-manifest.js`.** All of codex's numeric/color/combo refinements live only in the factory + CSS + story *render props*. The full-matrix cell counts the verifier enforces are therefore unaffected by porting codex's factory/CSS changes. (Composa separately raised its own counts — see §4/§5.)

---

## Summary

- **New components in codex, absent from Composa: 10** — `ListCell`, `MetaLabel`, `ContentStack`, `TextPair`, `DialogRow`, `DialogHeaderCell`, `DialogHeader`, `DialogBody`, `DialogFooter`, `MenuHeadingCell`. (`HeaderActions`/`Menu`/`MenuMultiSelect` already exist in Composa but codex newly *documents* them as support components.)
- **Per-component fidelity fixes codex has that Composa lacks: 9** — IconButton centering; NumericInput hidden-label; NumericInputMulti 4-cell + lead-icon rewrite; ColorInput chip-frame + opacity checker + `variable` swatch; ComboInput `leadIcon` hoist; inline-glyph-text (X/Y/W/H); Dialog → semantic sub-components + plusSmall close; Menu heading via MetaLabel; Header → ListCell composition (`leading`/`level`/`underline`).
- **Regressions in the Composa line: 4** (see §3). **Most important: the IconButton centering fix is missing** — every icon button in the panel can render its glyph off-center because Composa's `.composa-icon-button` base rule never resets `padding/border/box-sizing/line-height`.

---

## 1. New components in codex, absent from Composa

All defined in codex `src/react/ui3.js` (port into `src/react/factory.js`). Export each from the factory return object, from `src/react/index.js`, declare in `src/react/index.d.ts`, and document under a new `supportComponents` block in `design/component-api.json`. Verifier wiring is in §1.9.

### 1.1 `ListCell` (the shared shell — port first)
The horizontal slot primitive every other new cell composes on. Props:
`componentName="ListCell"`, `level=3` (clamped 1–3), `hierarchy="property"` (`panel|layer|property`), `underline=false`, `leading=null`, `leadingContent=null`, `content` (required), `trailing=null`.

Factory: renders a `div` with classes `ui3-list-cell ui3-list-cell-{hierarchy} ui3-list-cell-level-{n}`, `has-underline` when `underline`, and data attrs `data-ui3-component`, `data-hierarchy`, `data-level`, `data-underline`, `data-has-leading`, `data-has-trailing`. Children: optional `.ui3-list-cell-leading` (uses `leading ?? leadingContent`), required `.ui3-list-cell-content` wrapping `[content]`, optional trailing wrapped in `HeaderActions` with class `ui3-list-cell-trailing` (normalizes array vs single node).

CSS (codex `styles.css`): `.ui3-list-cell`/`.ui3-header` share a flex base (`width:100%; min-height:24px; padding:0 var(--ui3-space-2); gap:var(--ui3-space-2)`). Leading is `width:24px; flex:0 0 24px; justify-content:center`. Content is `min-width:0; flex:1 1 auto; gap:var(--ui3-space-1)`. Trailing is `flex:0 0 auto; justify-content:flex-end; gap:0`. Levels: `level-1 min-height:32px`, `level-2 28px`, `level-3 24px`; level-1 title bumps to `body-large`. `.has-underline { border-bottom:1px solid var(--ui3-color-border) }`.

**"Content Stack" variant** = `ListCell` whose `content` slot is a `ContentStack` (see 1.4) instead of a `TextPair`. Story `ListCellContentFamily` demonstrates both modes ("Text pair" vs "Interactive stack", the latter putting an `InputField` inside the stack).

### 1.2 `MetaLabel`
Quiet hierarchical inline label. Props: `children`, `hierarchy="menu"` (`menu|section|property|layer`), `as="span"`. Renders `Tag` with `ui3-meta-label ui3-meta-label-{hierarchy}`, `data-ui3-component`, `data-hierarchy`.
CSS: ellipsis/nowrap `body-small` strong; `-menu`/`-section` use `--ui3-menu-row-fg-secondary`, `-property` uses `--ui3-color-text-tertiary`.

### 1.3 `TextPair`
Compact title/description stack for content slots. Props: `title`, `description=null`, `titleAs="strong"`, `titleClassName`, `descriptionClassName`. Renders a grid `ui3-text-pair` with title (ellipsis `body-medium-strong`) and optional `.ui3-text-pair-description` (`body-small`, secondary color).

### 1.4 `ContentStack`
Generic vertical stack for swappable content. Props: `children=[]`, `gap="2px"`, `align="stretch"`. Renders grid with CSS vars `--ui3-content-stack-gap`/`--ui3-content-stack-align`.

### 1.5 `MenuHeadingCell`
Replaces MenuRow's inline `type:"heading"` branch. Props: `label="Layer"`, `hierarchy="menu"`, `alignment="default"` (`default|toggle`), `trailing=null`, `content`. Renders `.ui3-menu-heading .ui3-menu-heading-{alignment}` with `role:"presentation"`, content defaulting to `MetaLabel`, and (for `toggle`) a trailing `MetaLabel` "On".
CSS: `.ui3-menu-heading` became `min-height:24px; width:100%; flex; justify-content:space-between; gap:2px` and uses `> .ui3-meta-label:first-child` (primary fg) + `+ .ui3-meta-label` (secondary fg). **Note:** codex left MenuRow's own `type:"heading"` branch delegating to `MenuHeadingCell` — port both the new component and the delegation.

### 1.6 Dialog sub-components: `DialogHeader`, `DialogBody`, `DialogFooter`, `DialogHeaderCell`, `DialogRow`
- `DialogHeader` → `<header class="ui3-dialog-header">`; `DialogBody` → `<div class="ui3-dialog-body">` (now `display:grid; gap:var(--ui3-space-3)`); `DialogFooter` → `<footer class="ui3-dialog-actions">`.
- `DialogHeaderCell` — `title`/`content`/`trailing`; composes `ListCell` (`hierarchy:"panel"`, `level:1`, class `ui3-dialog-header-cell`), content defaults to `<h2 class="ui3-dialog-title">`.
- `DialogRow` — `leading`/`content`/`trailing`; composes `ListCell` (`property`, level 3, `ui3-dialog-row`). CSS aligns items to `flex-start` with `min-height:28px`.
- Codex's `Dialog` itself was rewritten to compose these (see §2 Dialog).

### 1.7 `Header` rewrite (now composes `ListCell`)
Not "new" but structurally replaced — see §2 Header.

### 1.8 Stories for the new components
- `src/react/stories/list-cell.stories.js` (codex): `title: "UI3 React/Components/ListCell"`, exports `Playground = ListCellFamily`, `ContentStack = ListCellContentFamily`. **Must NOT export `DialogRow`** (verifier forbids it — Dialog owns that surface).
- `src/react/stories/meta-label.stories.js`: `title: "UI3 React/Components/MetaLabel"`, `Playground = MetaLabelFamily`.
- New `*Family` factories added to `ui3-component-stories.js`: `ListCellFamily`, `ListCellContentFamily`, `DialogRowFamily` (also aliased `ListCellDialogRowFamily`), `MenuHeadingFamily`, `MetaLabelFamily`, `DialogHeaderFamily`, `DialogFooterFamily`, `StructuredDialogFamily`, `DialogToggleButtonFamily`, plus the `StoryRowFrame` helper and `InteractiveDialogToggleButton`.
- Re-wired existing story files: `dialog.stories.js` adds `Header/Footer/Row/Structured`; `menu.stories.js` adds `Heading = MenuHeadingFamily`; `header.stories.js` title → `UI3 React/Components/ListCell/Header`; `fill-section.stories.js` title `Sections/Fill` → `Modules/Fill`.

### 1.9 `component-api.json`, types, verifier/coverage wiring
- `design/component-api.json`: new top-level `supportComponents` map (ListCell, DialogRow, DialogHeaderCell, DialogHeader, DialogBody, DialogFooter, MenuHeadingCell, Header, HeaderActions, ContentStack, TextPair, MetaLabel, Menu, MenuMultiSelect) with `source`/`role`/`props`. Also flips the `renderer.note` to "Storybook is the canonical component harness…no live vanilla DOM renderer."
- `src/react/index.d.ts`: interfaces + `declare function` for all 10, plus new `Header` props (`underline`, `leading:"auto"|"none"|"icon"|"icon-button"`, `leadingIcon`, `leadingContent`, `content`, `trailing`) and `NumericInputMultiProps.values?: [string,string,string,string] | string[]`. Add to the `components` typeof block.
- `src/react/stories/story-coverage.js`: add `storybookSupportCoverage = { ListCell:[Playground,Header,ContentStack], Dialog:[Playground,Header,Footer,Row,Structured], Menu:[Playground,Heading], MetaLabel:[Playground] }`.
- `tools/verify-design-system-contracts.js`: import `storybookSupportCoverage`; read the dialog/header/list-cell/menu/meta-label story files; `requireSource` the specific export lines + titles; a `requiredSupportCoverage` loop; a guard that `list-cell.stories.js` does NOT contain `export const DialogRow =`; include `storybookSupportCoverage` in the OK summary.
- `tools/verify-react-entrypoint.js`: read `componentApi.supportComponents`; assert each is a function on both the package and the live factory (`createUI3ReactComponents(fakeReact)`); assert each has a `function X` declaration in `index.d.ts`; assert dialog/menu/meta-label story exports + titles.

---

## 2. Per-existing-component fidelity fixes (codex has, Composa lacks)

### Button
Codex relabeled the story `size` axis "Size"→"Width" with a clarifying `description` (`ButtonFamily.argTypes`). Composa kept "Size" **and added `Small`** to the options. Cosmetic/doc only — see §4 (conflict, easy combine).

### IconButton — **centering fix (high value)**
Codex added to the `.ui3-icon-button` base rule: `padding:0; border:0; box-sizing:border-box; line-height:0`. Composa's `.composa-icon-button` (styles.css ~L187) has only `width/height/display:grid/place-items:center/...` — missing all four resets. **Port these four declarations.** Factory structures are identical (both wrap glyph in `…-icon-button-glyph`). Also note codex *deleted* `icon-button.stories.js` and folded Icon/Toggle/DialogToggle into `button.stories.js` (`Button/SplitButton/Icon/Toggle/DialogToggle`); Composa still keeps a separate `icon-button.stories.js` — see §4.

### NumericInput
Codex `NumericInput` sets `resolvedLabel = varPill ? label : null` and passes `label: resolvedLabel`, so the visible label only shows with a var pill; paired CSS `.ui3-input-numeric .ui3-input-label { display:none }`. Composa still always forwards `label` (factory.js L231–234) and has no `.composa-input-numeric .composa-input-label` hide rule. Stories also drop the literal `label:"W"`/`label:"X"/"Y"` and instead drive a single-letter glyph via `iconLead` (see inline-glyph-text). **Port:** the `resolvedLabel` gate + the label-hide CSS.

### NumericInputMulti — **full rewrite (high value)**
Codex changed it from a 2-cell X/Y wrapper (two nested `NumericInput`s) to a **4-cell value row** with an optional lead-icon column:
- default `values=["0","0","0","0"]`; normalize to length 4; `leadIcon` resolved from `iconLead`; `enabledCells = (variant==="partial-disable" && partialDisable) ? 3 : 4`.
- Renders an optional `.ui3-numeric-multi-lead` span (icon) + 4 `.ui3-numeric-multi-value` spans (`is-last` on last, `is-disabled` for `index>=enabledCells`, with `data-disabled`).
- CSS rewrite: `width:160px; height:24px; grid-template-columns:24px repeat(4,minmax(0,1fr))`, `[data-icon-lead="false"]→repeat(4,…)`, focus outline, per-cell borders, disabled cell color, `.ui3-numeric-multi-lead` centered icon.
- `index.d.ts`: `values` tuple widened to 4.
- Story render props now pass 4 values + `iconLead:"styles"` (variant-matrix) / `iconLead:"x"` etc.

Composa's `NumericInputMulti` (factory.js L236–256) is still the **old 2-cell version** and its CSS (styles.css L595–600) is still `repeat(2,minmax(0,1fr))`. **Port the entire factory body + CSS block + d.ts tuple.** Count-safe: `figmaNumericInputMultiSpecs` is unchanged on both sides.

### ColorInput
Codex changes:
1. New `variable` swatch color `#9747ff` (`resolvedType === "variable" ? "#9747ff" : …`).
2. Chip wrapped in a `.ui3-color-chip-frame` (24×24 grid, places a 14×14 chip), with `is-opacity` modifier that paints the checker + magenta split via layered `background-image`.
3. CSS grid first column `16px`→`24px`, `gap:4px`→`0`, removed left padding; chip `16→14px`, radius `3→2px`; value padding `0 4px`→`0`; opacity gains `border-left`.

Composa's `ColorInput` (factory.js L291–343) instead pursued a **different parity axis**: it added a `shape` prop (`square|circle`) with `composa-color-chip-{shape}` / `composa-color-chip-circle`, and an `instance` type (`#9747ff`) + `opacity` swatch handled inline. It kept the **old 16×16 chip and 16px grid** (styles.css L602–631), and has **no `-chip-frame` wrapper and no `is-opacity` layered checker**. **Combine:** keep Composa's `shape`/`instance` additions, but port codex's chip-frame + 24px grid + `is-opacity` checker + `variable`/`#9747ff` swatch. This is the most intricate merge in §2. (Composa already maps `variable`→`instance`; reconcile naming.)

### ComboInput
Codex hoisted `const leadIcon = iconLead && iconLead !== "False" ? (typeof iconLead==="string"?propToken(iconLead):"styles") : null`, switched `data-icon-lead` to `boolData(Boolean(leadIcon))`, and renders `leadIcon ? iconNode(...)` (so string icon names resolve and "False"/falsey suppress the icon). It also added `border:1px solid transparent` to `.ui3-combo-input-value` and changed `.is-selected > span` background `bg-selected`→`transparent`. Composa (factory.js L345–380) still uses the raw `iconLead` for `data-icon-lead` and the inline ternary, and lacks the two CSS tweaks. Stories: codex's `ComboInputFamily` switched the `iconLead` control from `boolean` to a `select` of icon names. **Port** the hoist + data-attr + CSS + story control. (Composa story default `iconLead` is still boolean-style.)

### Inline-glyph-text (X/Y/W/H) — used by Numeric/Header leading
Codex's `iconNode` (module-level) gained: if `name` is a single `[A-Za-z]`, render `<span class="ui3-inline-glyph-text" aria-hidden>NAME.toUpperCase()</span>` instead of an icon. CSS `.ui3-inline-glyph-text { width:24px;height:24px; inline-grid; place-items:center; color:icon-secondary; text-transform:uppercase }`. This powers `NumericInput iconLead:"x"`, the new numeric-multi lead, and header leading icons.
Composa's `iconNode` (factory.js L57–66) is the **icons-as-slots** version — it has element/function slot handling and `builtin-glyphs` but **no single-letter branch**. **Port** the single-letter glyph branch (place it after the slot/function checks, before the `BUILTIN_GLYPHS` lookup) + the CSS. Translate class to `composa-inline-glyph-text`.

### Dialog
Codex rewrote `Dialog` to compose `DialogHeader > DialogHeaderCell(trailing: close IconButton)`, `DialogBody`, `DialogFooter`, and switched the close icon from `minus` to `plusSmall` (rendered as an × via CSS `.ui3-dialog-close [data-icon="plusSmall"] { transform:rotate(45deg) }`). New CSS for header-cell padding, dialog-row alignment, body grid gap.
Composa's `Dialog` (factory.js L543–571) still uses the inline `<header>/<div>/<footer>` markup with a `minus` close button, and has **no `plusSmall` glyph** in `builtin-glyphs.js` (only `chevronDown`, `minus`). **Port dependency:** to take codex's close-as-× you must add a `plusSmall` builtin glyph to Composa's `builtin-glyphs.js` (Composa is renderer-independent, so it can't rely on an injected `Icon`). Also conflicts with Composa's `320/480` template Dialog rework — see §4.

### Header
Codex replaced the bespoke `Header` with a `ListCell` composition: new props `content`, `trailing`, `underline` (defaults to `hierarchy==="layer"`), `leading="auto"` (`none|icon|icon-button`), `leadingIcon="chevronDown"`, `leadingContent`. `shouldShowLeading`/`generatedLeadingNode` decide whether to render an icon span vs an `IconButton`. CSS: the old `.ui3-header-label`/`-panel`/`-layer`/`-property` rules were replaced by the shared `ListCell` level/hierarchy rules + `.ui3-header-leading-icon`. Story `HeaderFamily` switched controls to `level/underline/leading` and wraps in `StoryRowFrame`.
Composa's `Header` (factory.js L752–778) is the **old bespoke version** (`ui3-header-label`, `disclosure`, `actions`). **Port** the full rewrite (depends on `ListCell` + inline-glyph + `HeaderActions`, all available after §1). Keep Composa's `HeaderActions` (already present).

### Menu / MenuRow
Covered by §1.5 (`MenuHeadingCell`). Codex also re-padded `.ui3-menu` (`padding:var(--ui3-space-2) var(--ui3-space-1)`), and changed menu-toolbar gaps/padding and `.ui3-menu-toolbar .ui3-icon-button` color to `rgb(255 255 255 / 0.74)`. Composa's menu CSS is the older values. **Port** these refinements.

### SegmentedControl / Tabs / Switch / Radio / Checkbox / Dropdown / Tooltip / InputField / fill-section
Codex made **no factory changes** to these. The only codex touch outside the above: the `fill-section` story title (`Sections/Fill`→`Modules/Fill`) and `harness/main.js`/`src/app` doc churn. So: no fidelity port needed for these from codex; any divergence here is Composa-driven (see §3/§4).

---

## 3. Regressions in the Composa line (highest-value section)

1. **IconButton centering fix dropped (regression vs codex; also a real visual bug).** Composa's `.composa-icon-button` lacks `padding:0; border:0; box-sizing:border-box; line-height:0`. Any UA/global rule contributing button padding, border, or non-zero line-height will push the 16px glyph off the 24px box center. Codex shipped this fix at `16753b8`; Composa never picked it up. **Fix:** add the four declarations to the base rule. (Listed first in §5c.)

2. **NumericInputMulti reverted to a less-faithful 2-cell layout.** Independent of naming, Composa's component is materially *less* faithful to the Figma 4-up numeric row than codex's. Because both share the same `figmaNumericInputMultiSpecs`, the full-matrix simply renders the old 2-cell control in those cells — a fidelity regression, not a count break.

3. **ColorInput lost the chip-frame / opacity-checker fidelity.** Composa rebuilt ColorInput around `shape` (a legitimate new axis) but in doing so kept the base-era 16px chip and dropped codex's `-chip-frame` 24px alignment and the `is-opacity` layered checkerboard. Net: Composa's opacity swatch is a flat split instead of codex's checker-backed split, and the chip sits in a 16px column rather than the 24px frame. Partial regression — the `shape` work is additive and worth keeping; the frame/checker work needs porting back in.

4. **Dialog close affordance regressed to `minus`.** Composa's dialog close renders a horizontal bar (`minus`) rather than codex's rotated-plus × . Minor, but it's a visible parity loss for the modal title bar, and it's blocked on adding a `plusSmall` glyph (see §2 Dialog).

No regressions found in Switch/Radio/Checkbox/Tooltip/Tabs/SegmentedControl/Dropdown/InputField relative to codex — Composa's edits there are net-additive parity work (more states/variants), and codex didn't touch those factories.

---

## 4. Conflicts (both lines changed the same surface)

| Surface | Codex did | Composa did | How to combine |
|---|---|---|---|
| **Button size axis** | Story relabel "Size"→"Width" + description; **no new size**. | **Added `small`** size (factory + `buttonSizes` + `figmaButtonVariantGroups` 6 groups; buttons count 175→200). | Keep Composa's `small` size and its higher count. Optionally adopt codex's "Width" label *or* keep "Size + Small" — they're compatible since codex added no size. Do **not** lower the count. |
| **Button/IconButton story files** | Deleted `icon-button.stories.js`; merged Icon/Toggle/DialogToggle into `button.stories.js` (exports `Button/SplitButton/Icon/Toggle/DialogToggle`). | Kept separate `icon-button.stories.js`; `button.stories.js` exports `Playground/SplitButton`. | Decide one layout. If adopting codex's merge, update both story files + any verifier `requireSource`/title assertions, and add `DialogToggleButtonFamily`. Lower-risk: keep Composa's split files and just **add** a `DialogToggle` export — but then skip codex's `button.stories.js` title/export assertions. |
| **Dialog** | Recomposed into Header/Body/Footer/Row sub-components; size stays `default`; close=`plusSmall`. | Reworked size vocab to **`320/480` + `dialogTemplates`** (`basic/advanced/embed/create-project/create-team/sharing`), `tone` derived from template; close still `minus`. | These are orthogonal: codex changed *internal structure*, Composa changed *size/template taxonomy*. Port codex's sub-components and have Composa's `Dialog` render them while keeping the `320/480`/template props. Reconcile the close icon by adding `plusSmall` glyph. Watch `figmaDialogSpecs` (Composa-owned) — codex's structural change doesn't alter those specs. |
| **ColorInput** | chip-frame + `is-opacity` checker + 24px grid + `variable` `#9747ff`. | `shape` axis + `instance` type + `colorInputShapes`; old 16px chip. | Additive merge: keep `shape`/`instance`; layer in codex's frame/checker/24px/variable swatch. Reconcile `variable`(codex)≈`instance`(composa) naming. ColorInput count: Composa added `instance` type + `colorInputShapes` → its input count differs from codex; keep Composa's spec arrays. |
| **Switch / Radio / Tooltip** | No factory change. | Switch `mixed`, Radio `button` variant, Tooltip 8-way placements (controls count 50→78). | No conflict — pure Composa additions; nothing to port from codex. |
| **InputField text-input states** | No change. | Added `disabled-secondary/-tertiary`, `closeButton` specs (inputs 110→119). | No conflict; Composa-owned. Keep. |

---

## 5. Prioritized PORT PLAN (translate `ui3`→`composa` throughout)

Naming reminders while porting: factory class prefix `composa-`, data attr `data-composa-component`, CSS vars `--composa-*`, story titles `Composa UI/...`, factory file `src/react/factory.js`, stories `composa-component-stories.js`, package factory `createComposaComponents`, `ComposaIcon`.

### (a) New components — do these first (everything else depends on them)

1. **`ListCell`** → `factory.js`. Port factory body, export from factory + `src/react/index.js`, add `ListCellProps` to `index.d.ts`, add CSS block (`.composa-list-cell*`, levels, `has-underline`, leading/content/trailing) to `styles.css`. *Count impact: none.*
2. **`MetaLabel`, `TextPair`, `ContentStack`** → `factory.js` + exports + d.ts + CSS (`.composa-meta-label*`, `.composa-text-pair*`, `.composa-content-stack` with `--composa-content-stack-*`).
3. **`MenuHeadingCell`** → `factory.js`; rewire `MenuRow`'s `type:"heading"` branch to delegate to it; port `.composa-menu-heading` CSS rewrite (flex + meta-label child selectors).
4. **`DialogHeader/DialogBody/DialogFooter/DialogHeaderCell/DialogRow`** → `factory.js` + exports + d.ts + CSS (`-dialog-header-cell` padding, `-dialog-row` alignment, `-dialog-body` grid gap). Requires `plusSmall` glyph (step b8).
5. **`design/component-api.json`** → add the `supportComponents` map (12 entries; `source` → `src/react/factory.js`). Update `renderer.note` if desired.
6. **Stories for new components**: create `list-cell.stories.js` (title `Composa UI/Components/ListCell`, exports `Playground/ContentStack`, **no `DialogRow` export**) and `meta-label.stories.js`; add the `*Family` factories + `StoryRowFrame` + `InteractiveDialogToggleButton` to `composa-component-stories.js`; wire `dialog.stories.js` (`Header/Footer/Row/Structured`), `menu.stories.js` (`Heading`), `header.stories.js` title → `…/ListCell/Header`, `fill-section.stories.js` title → `…/Modules/Fill`.
7. **Coverage + verifiers**: add `storybookSupportCoverage` to `story-coverage.js`; port the new `requireSource`/`requiredSupportCoverage`/no-`DialogRow` guard logic to `tools/verify-design-system-contracts.js`; port the `supportComponents` function/declaration/story assertions to `tools/verify-react-entrypoint.js` (using `createComposaComponents` + `componentApi.supportComponents`). Translate every `ui3`/`UI3 React`/`createUI3ReactComponents` literal to the Composa equivalents. *Count impact: none — `storybookVariantMatrix` is untouched; these are family/support-coverage assertions.*

### (b) Fidelity fixes

8. **`plusSmall` builtin glyph** → add to `src/react/builtin-glyphs.js` (e.g. a plus path) so the Dialog close (rotated ×) and any `plusSmall` usage resolve under icons-as-slots. *Prereq for a4/Dialog and Header story icons.*
9. **Inline-glyph-text** → add the single-letter `[A-Za-z]` branch to `factory.js` `iconNode` (after slot/function checks, before `BUILTIN_GLYPHS`); add `.composa-inline-glyph-text` CSS.
10. **NumericInput** → add `resolvedLabel = varPill ? label : null` gate; add `.composa-input-numeric .composa-input-label { display:none }`.
11. **NumericInputMulti** → replace factory body with the 4-cell + lead-icon version; replace the `.composa-numeric-multi*` CSS block; widen `values` tuple in `index.d.ts`. Update `composa-variant-matrix.js` numeric-multi render to pass 4 values + `iconLead`. *Count-safe (specs unchanged).*
12. **ColorInput** → wrap chip in `.composa-color-chip-frame`, add `is-opacity` layered checker, move grid to 24px first col / gap 0, add `variable`/instance `#9747ff` swatch — **without removing** Composa's `shape`/`instance` work.
13. **ComboInput** → hoist `leadIcon`, fix `data-icon-lead` to `boolData(Boolean(leadIcon))`, render via `leadIcon`; add `.composa-combo-input-value` `border:1px solid transparent` + `.is-selected > span` background `transparent`; switch the story `iconLead` control to a `select`.
14. **Header rewrite** → replace bespoke `Header` with the `ListCell`-composing version (new `leading/level/underline/content/trailing/leadingIcon` props); replace `.composa-header*` level/leading CSS; update `HeaderFamily` story controls + `StoryRowFrame`. Depends on steps 1, 9.
15. **Menu CSS refinements** → `.composa-menu` padding, toolbar gap/padding, toolbar icon-button color `rgb(255 255 255 / 0.74)`.

### (c) Regression repairs

16. **IconButton centering** → add `padding:0; border:0; box-sizing:border-box; line-height:0` to `.composa-icon-button` base rule. *(Highest-value single line group; do early — it's independent of everything.)*
17. **Dialog close icon** → switch `minus`→`plusSmall` + `.composa-dialog-close [data-icon="plusSmall"] { transform:rotate(45deg) }` (after step 8). Reconcile with Composa's `320/480` template Dialog.
18. Items 11 and 12 above double as the NumericInputMulti and ColorInput regression repairs.

### Count-invariant notes
- Porting **factory + CSS + d.ts + support-coverage** changes does **not** alter `storybookVariantMatrix`/`variantCoverageManifest` cell counts — codex never touched the spec arrays.
- **Do not** lower Composa's raised group counts (`buttons:200`, `inputs:119`, `controls:78`, `expectedCells:569`) when porting codex story-family changes; codex's lower counts (507) reflect the *base* spec arrays, not a deliberate reduction.
- If you adopt codex's `button.stories.js` merge (deleting `icon-button.stories.js`), update the corresponding `requireSource`/title assertions; otherwise keep Composa's split files and skip those specific codex assertions.

---

## Confidence

**High** that §1–§3 enumerate everything codex carries that Composa lacks, and that the IconButton centering loss is the single most important regression. The port plan is mechanical for the new components, the numeric/header/combo/inline-glyph fixes, and the verifier wiring.

**Lower-confidence / needs owner judgment:** (1) the **ColorInput merge** — Composa's `shape`/`instance` axis and codex's chip-frame/opacity-checker must be hand-reconciled, including the `variable`↔`instance` naming; (2) the **Dialog merge** — codex's structural sub-components vs Composa's `320/480` template taxonomy are orthogonal but both rewrite the same `Dialog` body, so the combined render needs review; (3) the **Button/IconButton story-file layout** decision (merge vs keep-split) drives which verifier assertions to port. I did not run the verifier in either tree (read-only task), so exact post-port counts should be confirmed by running `tools/verify-design-system-contracts.js` after the port.
