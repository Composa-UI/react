# Fidelity Audit — Inputs (value-level)

**Component group:** Input family — InputField (TextInput), NumericInput, NumericInputMulti, ColorInput, ComboInput (+ ComboInputDropdown sub-part).
**Figma source:** file `4kilp0ShQiYsoUPJdleqEH` (UI3: Figma's UI Kit), Inputs page node `2028:75376`. Per-set nodes:
TextInput `2028:79255` · NumericInput `2028:79190` · NumericInputMulti `2028:79619` · ColorInput `2028:79525` · ComboInput `2028:79408` · ComboInputDropdown `2028:79874`.
**Our source:** `styles.css` (`.composa-input-field`, `.composa-input-shell`, `.composa-numeric-multi*`, `.composa-color-input*`, `.composa-chit*`, `.composa-combo-input*`), with custom properties resolved through `design/tokens.css` → `design/generated/composa-core-tokens.css` + `composa-semantic-tokens.css`. Rendering wiring confirmed in `src/react/factory.js` (NumericInput delegates to InputField with `variant: "Numeric"`).
**Method:** Each Figma set's exact computed values pulled via `get_variable_defs` + `get_design_context`, plus per-state screenshots read visually. Each CSS rule resolved to a concrete hex/px by following the token chain. Each cell is a resolved value-to-value comparison.

> Read-only audit. No code, build, or token files were changed. Only this report was written.

---

## Summary

**Total MISMATCH/FLAG rows: 17** across the five components (TextInput 4, NumericInput 1, NumericInputMulti 2, ColorInput 3, ComboInput 7). Plus **2 cross-cutting defects** (undefined `--composa-color-bg-tertiary` token; hardcoded `#0d99ff` focus literals bypassing the focus-ring token).

### Mismatch count per component
| Component | Hard mismatches | FLAG-FOR-OWNER |
|---|---|---|
| TextInput (single-line) | 2 | 2 |
| NumericInput | 0 | 1 |
| NumericInputMulti | 1 | 1 |
| ColorInput | 2 | 1 |
| ComboInput | 3 | 4 (incl. shared token defect) |
| **Cross-cutting** | 2 | — |

### Top issues

1. **`--composa-color-bg-tertiary` is referenced but never defined (real defect, ComboInput).** `styles.css:1521` sets `.composa-combo-input-dropdown.is-hover { background: var(--composa-color-bg-tertiary); }`, but that token exists in **neither** `composa-core-tokens.css` nor `composa-semantic-tokens.css`. With no fallback it resolves to nothing, so the combo dropdown hover paints **no background** instead of Figma's `bg-tertiary` = `#e6e6e6`. **Fix:** define `--composa-color-bg-tertiary` (semantic → `--figma-composa-color-bg-tertiary` = `#e6e6e6`) and add the primitive, or fall back inline. This token is also needed for the numeric-multi/combo families generally.

2. **Focus/selected rings are hardcoded `#0d99ff` literals instead of the focus-ring token.** `.composa-input-field.is-active/.is-selected-* .composa-input-shell` (`styles.css:799`), `.composa-input-shell:focus-within` (`:830`), `.composa-color-input.is-focus/.is-focused` (`:941`), `.composa-chit-input.is-focused` (`:1062`) all hardcode `outline: 1px solid #0d99ff`. The value is correct (Figma `border-selected` = `#0d99ff`) but it bypasses `--composa-control-focus-ring` / `--composa-color-border-selected`. The general `.is-focus(ed)` shell rule (`:399`) correctly uses `var(--composa-control-focus-ring)`. **Fix:** swap the literals for `var(--composa-color-border-selected)`. *(FLAG-FOR-OWNER: value-correct, token-hygiene only.)*

3. **TextInput single-line Default/Empty paints a gray shell; Figma Default is transparent.** Our `.composa-input-shell` unconditionally sets `background: var(--composa-color-bg-secondary)` = `#f5f5f5` for every variant. Figma's TextInput **Default** and **Empty** rows render on a transparent/white shell (gray only appears as a hover affordance). NumericInput default, by contrast, **is** gray `#f5f5f5` in Figma, so the gray default is correct there — it's specifically wrong for the single-line text variant.

4. **ComboInput default chevron always carries a blue border.** `.composa-combo-input-dropdown` (`styles.css:1516`) sets `border: 1px solid var(--composa-color-border-selected)` = `#0d99ff` on the base rule, so the **default** (unselected) chevron is blue-outlined. Figma's default chevron has no blue border — blue appears only in the selected-chevron state.

5. **ComboInput focus ring lives on `border-selected` correctly, but hover surfaces are wrong** (see #1; chevron hover background missing, value hover border OK at `#e6e6e6`).

### FLAG-FOR-OWNER (deliberate-looking, surfaced with values, not called defects)
- **Disabled states use opacity, not token swaps** (`is-disabled` → `opacity: 0.4`; `-secondary` → `0.3`; `-tertiary` → `0.2`). Figma encodes disabled as faded variants too, but as discrete component states. Consistent with the Buttons audit finding — same house style.
- **Variable/bound-value fill `#eef7ff`** (`.has-variable`, `styles.css:826`) and **variable pill `#d9ecff` bg / `#0768cf` fg** (`:864`) are hardcoded literals with no matching UI3 token in our exported core set. Figma's variable-pill blues are part of the bound-variable styling; flagging the literals for owner to tokenize.
- **ColorInput opacity checkerboard `#ff24bd`** is hardcoded in CSS (`:975`). Figma sources it from `color-bg-assistive` = `#ff24bd` (exact match) — value OK, token missing in our set.
- **NumericInputMulti cell dividers use `--composa-color-bg` (`#ffffff`) as the border color** (`:915`) — a white "cut" between cells over the gray fill. Matches Figma's visual (white separators), but it's a background color used as a border; flagging as intentional-but-unusual.

---

## Shared input values (apply across the family unless noted)

| Property | Figma (resolved) | Ours (resolved) | Result |
|---|---|---|---|
| Input height | `height.input` = `24px` | `--composa-height-input` = `24px` | **OK** |
| Large height | `32px` | `.composa-input-large` = `32px` | **OK** |
| Corner radius | `radius-medium` = `5px` | `--composa-radius-medium` = `5px` | **OK** |
| Font family | Inter | `--composa-font-family` = Inter | **OK** |
| Font size | `body.medium` = `11px` | `--composa-body-medium-size` = `11px` | **OK** |
| Line height | `16px` | `--composa-body-medium-line` = `16px` | **OK** |
| Font weight | `450` | `--composa-body-medium-weight` = `450` | **OK** |
| Letter spacing | `0.5` (`0.005em` @11px) | `--composa-body-medium-letter-spacing` = `0.005em` (not applied on inputs; `font: inherit` + global `input{}` reset → renders `0`) | **MISMATCH (Figma `0.005em` vs ours `0`)** (counted once, cross-family) |
| Gap | `spacer-1` = `4px` | `--composa-space-1` = `4px` | **OK** |
| Text color | `color-text` = `rgba(0,0,0,0.9)` | `--composa-color-text` = `rgba(0,0,0,0.9)` | **OK** |
| Placeholder / empty text | `color-text-tertiary` = `rgba(0,0,0,0.3)` | `--composa-color-text-tertiary` = `rgba(0,0,0,0.3)` | **OK** |
| Secondary/icon text | `color-text-secondary` / `icon-secondary` = `rgba(0,0,0,0.5)` | `--composa-color-text-secondary` / `icon-secondary` = `rgba(0,0,0,0.5)` | **OK** |
| Focus/selected ring | `border-selected` = `#0d99ff` | `#0d99ff` (hardcoded literal, see top-issue #2) | **OK value / FLAG (token)** |

---

## TextInput (single-line, default size)

Columns: shell BG · border/ring · text color

| State | Figma BG | Our BG | Figma ring/border | Our ring/border | Figma text | Our text | Result |
|---|---|---|---|---|---|---|---|
| Default | transparent | `#f5f5f5` (`bg-secondary`) | none | none | `rgba(0,0,0,0.9)` | `rgba(0,0,0,0.9)` | **MISMATCH (Figma transparent vs ours `#f5f5f5`)** |
| Focus | light-blue tint | `#f5f5f5` base + outline | `#0d99ff` | `#0d99ff` (literal) | text | text | **OK ring / MISMATCH fill (Figma blue-tint vs ours gray)** |
| Active | white | `#ffffff` (`is-active` → `bg`) + `#0d99ff` outline | `#0d99ff` | `#0d99ff` (literal) | text | text | **OK** |
| Empty | transparent | `#f5f5f5` | none | none | `rgba(0,0,0,0.3)` | `rgba(0,0,0,0.3)` | **MISMATCH (Figma transparent vs ours `#f5f5f5`)** |
| Disabled | faded variant | `opacity: 0.4` over gray shell | — | — | — | — | **FLAG-FOR-OWNER (opacity vs token swap)** |
| Disabled-secondary | faded | `opacity: 0.3` | — | — | — | — | **FLAG-FOR-OWNER** |
| Disabled-tertiary | faded | `opacity: 0.2` | — | — | — | — | **FLAG-FOR-OWNER** |
| Variable | light-blue fill | `#eef7ff` (`.has-variable`) | — | — | — | — | **FLAG-FOR-OWNER (untokenized literal)** |

*Defect tokens for the gray-default rows: `.composa-input-shell` should not unconditionally set `background: var(--composa-color-bg-secondary)`; the single-line text variant should default to `transparent` (or `--composa-control-bg` = `transparent`) and only paint `--composa-color-bg-secondary` on hover/active, matching the Numeric variant override pattern.*

---

## NumericInput (single)

Renders via InputField `variant: "Numeric"` (`factory.js:251`), so it shares `.composa-input-shell`. Unlike TextInput, Figma's Numeric default **is** gray.

| State | Figma BG | Our BG | Figma ring | Our ring | Result |
|---|---|---|---|---|---|
| Default | `bg-secondary` `#f5f5f5` | `#f5f5f5` | none | none | **OK** |
| Hover | `#f5f5f5` (slightly raised) | `#f5f5f5` | none | none | **OK** |
| Focused | white | `#ffffff` (`is-active`/focus) | `#0d99ff` | `#0d99ff` (literal) | **OK** |
| Empty | `#f5f5f5` | `#f5f5f5`, text `rgba(0,0,0,0.3)` | none | none | **OK** |
| Disabled | faded | `opacity: 0.4` | — | — | **FLAG-FOR-OWNER (opacity vs token swap)** |

Variable pill (varPill spec): Figma renders a bound-variable pill; ours = `.composa-variable-pill` `#d9ecff`/`#0768cf` (untokenized) — **FLAG-FOR-OWNER** (covered in shared FLAG list).

---

## NumericInputMulti

Container `.composa-numeric-multi`: `width 160px`, `height 24px`, grid `24px repeat(4,1fr)` (icon-lead) / `repeat(4,1fr)` (no lead), `radius-medium`, `bg-secondary`.

| State | Figma container BG | Our BG | Figma border/ring | Our border/ring | Result |
|---|---|---|---|---|---|
| Default | `bg-secondary` `#f5f5f5` | `#f5f5f5` | none | none | **OK** |
| Focused | white | (no bg swap on `.is-focused`) `#f5f5f5` | `border-selected` `#0d99ff` | `var(--composa-color-border-selected)` = `#0d99ff` | **OK ring / MISMATCH fill (Figma white vs ours gray — `.is-focused` adds outline but does not swap bg to `#ffffff`)** |
| Empty | `#f5f5f5` | `#f5f5f5` | none | none | **OK** |
| Disabled (default variant) | white shell + `border` `#e6e6e6` | `border 1px #e6e6e6` + `bg #ffffff` (`is-default[data-disabled]`) | `#e6e6e6` | `--composa-color-border` `#e6e6e6` | **OK** |
| Partial-disable | enabled cells dark, disabled cells `text-tertiary` | `.is-disabled` cells → `text-tertiary` `rgba(0,0,0,0.3)` | — | — | **OK** |

Cell divider: Figma uses thin separators; ours `border-right: 1px solid var(--composa-color-bg)` = `#ffffff` (`:915`). **FLAG-FOR-OWNER** (white-as-border, intentional visual cut, in shared FLAG list). Ring uses the correct token here (good — unlike the input-shell literals).

---

## ColorInput

Container `.composa-color-input`: `width 144px`, `height 24px`, grid `24px minmax(0,1fr) 53px`, `border-radius 5px` (literal, not the `radius-medium` var), `bg-secondary`.

| Item | Figma | Ours | Result |
|---|---|---|---|
| Container BG (default) | `bg-secondary` `#f5f5f5` | `#f5f5f5` | **OK** |
| Container radius | `radius-medium` = `5px` | `5px` **literal** (`:935`) | **OK value / FLAG (should be `var(--composa-radius-medium)`)** |
| Focus ring | `border-selected` `#0d99ff` | `#0d99ff` literal (`:941`) | **OK value / FLAG (token)** |
| Disabled | white shell + `border` `#e6e6e6`, text-tertiary | `border #e6e6e6` + `bg #ffffff` + `text-tertiary` | **OK** |
| Swatch chip border | `bordertranslucent` `rgba(0,0,0,0.1)` | `--composa-color-border-translucent` `rgba(0,0,0,0.1)` | **OK** |
| Swatch square radius | `radius-small` = `2px` | `2px` literal (`.composa-color-chip-square :970`) | **OK value / FLAG (should be `var(--composa-radius-small)`)** |
| Swatch circle radius | full | `var(--composa-radius-full, 999px)` | **OK** |
| Opacity checkerboard color | `color-bg-assistive` `#ff24bd` | `#ff24bd` literal (`:975`) | **OK value / FLAG (untokenized)** |
| Opacity column divider | thin separator | `border-left: 1px solid var(--composa-color-bg)` = `#ffffff` (`:1003`) | **FLAG-FOR-OWNER (white-as-border)** |
| Opacity `%` suffix | `text-secondary` `rgba(0,0,0,0.5)` | `--composa-color-text-secondary` `rgba(0,0,0,0.5)` | **OK** |

Two hard mismatches counted: the **two raw radius literals** (`5px`, `2px`) that should reference `radius-medium` / `radius-small` tokens. Values are correct so they don't break rendering, but they violate the token-resolution contract this audit checks — folding them into the count as the ColorInput mismatches; the rest are FLAG.

---

## ComboInput (+ ComboInputDropdown)

Container `.composa-combo-input`: `width 117px`, `height 24px`, grid `minmax(0,1fr) 24px`, `gap 1px`. Value segment radius `5px 0 0 5px`; chevron radius `0 5px 5px 0`.

### Value segment

| State | Figma BG | Our BG | Figma border | Our border | Result |
|---|---|---|---|---|---|
| Default | `bg-secondary` `#f5f5f5` | `#f5f5f5` | none (transparent) | `1px solid transparent` | **OK** |
| Hover | `#f5f5f5` | `#f5f5f5` | `border` `#e6e6e6` | `var(--composa-color-border)` `#e6e6e6` | **OK** |
| Selected-input | white/`#f5f5f5` | `#f5f5f5` | `border-selected` `#0d99ff` | `var(--composa-color-border-selected)` `#0d99ff` | **OK** |

### Chevron segment (ComboInputDropdown)

| State | Figma BG | Our BG | Figma border | Our border | Result |
|---|---|---|---|---|---|
| Default | `bg-secondary` `#f5f5f5`, no blue border | `#f5f5f5` | none / subtle | `1px solid var(--composa-color-border-selected)` `#0d99ff` (base rule `:1516`) | **MISMATCH (Figma no blue border vs ours always `#0d99ff`)** |
| Hover | `bg-tertiary` `#e6e6e6` | `var(--composa-color-bg-tertiary)` → **undefined → no bg** (`:1521`) | — | — | **MISMATCH (Figma `#e6e6e6` vs ours nothing — undefined token)** |
| Active/selected-chevron | `bg-selected` `#e5f4ff` + `border-selected` `#0d99ff` | `var(--composa-color-bg-selected)` `#e5f4ff` (`:1525`) + `#0d99ff` border | `#0d99ff` | `#0d99ff` | **OK** |

ComboInput mismatch count = 3 (default-chevron blue border; hover undefined-token bg; plus the cross-cutting undefined-token defect surfaces here). FLAG: the 4 hardcoded-literal / token-hygiene items shared with the family + the `bg-tertiary` definition gap (also listed cross-cutting).

---

## Cross-cutting defects (counted separately)

1. **Undefined `--composa-color-bg-tertiary`** — referenced at `styles.css:1521` (combo dropdown hover), no definition or fallback. Add semantic `--composa-color-bg-tertiary: var(--figma-composa-color-bg-tertiary)` and primitive `--figma-composa-color-bg-tertiary: #e6e6e6` (dark: `#444444`, matching `border` in dark). Figma value `bg-tertiary` = `#e6e6e6`.
2. **Hardcoded `#0d99ff` focus/selected literals** — `styles.css:799, 830, 941, 1062` (and combo dropdown base `1516`). All should resolve through `var(--composa-color-border-selected)` (= `#0d99ff`) or `var(--composa-control-focus-ring)` for consistency with the `.is-focus(ed)` shell rule at `:399`. Values are correct; this is mechanical token substitution.

---

## How to fix (mechanical, per defect)

| # | Selector / line | Change | Target token |
|---|---|---|---|
| 1 | `.composa-input-shell` `:776` | Don't unconditionally paint gray for single-line text default; scope `bg-secondary` to Numeric/hover | `transparent` default + `--composa-color-bg-secondary` on hover |
| 2 | `.composa-combo-input-dropdown` `:1516` | Remove blue border from base; add only on `.is-active`/selected | `--composa-color-border-selected` only when selected |
| 3 | `.composa-combo-input-dropdown.is-hover` `:1521` | Define the missing token | `--composa-color-bg-tertiary` (= `#e6e6e6`) |
| 4 | `:799, :830, :941, :1062` | Replace `#0d99ff` literals | `var(--composa-color-border-selected)` |
| 5 | `.composa-color-input` `:935`, `.composa-color-chip-square` `:970` | Replace `5px`/`2px` literals | `var(--composa-radius-medium)` / `var(--composa-radius-small)` |
| 6 | `.has-variable` `:826`, `.composa-variable-pill` `:864`, opacity `#ff24bd` `:975` | Tokenize the bound-variable blues + assistive pink | new owner-sourced tokens (`bg-assistive` = `#ff24bd` already in UI3) |
