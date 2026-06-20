# Fidelity Audit — Buttons (value-level)

**Component group:** Buttons (Button, IconButton, ToggleButton/DialogToggle, SplitButton)
**Figma source:** file `4kilp0ShQiYsoUPJdleqEH`, Button set node `2012:46721` ("Buttons" page).
**Our source:** `styles.css` (`.composa-button*`, `.composa-icon-button*`, `.composa-button-width-*`) with custom properties resolved through `design/tokens.css` → `design/generated/composa-core-tokens.css` + `composa-semantic-tokens.css`.
**Method:** Each Figma variant/state node was resolved to exact computed values via `get_design_context` + `get_variable_defs`. Each CSS rule was resolved to a concrete hex/px by following the token chain. No screenshots are used as evidence — every cell is a resolved value-to-value comparison.

This is the **sample audit** that validates the approach before scaling to all components.

---

## Summary

**Total distinct rows: 15** (11 on Button, 4 on IconButton/Toggle/Split/DialogToggle). One (Primary fill orange) is a **deliberate Composa brand divergence**, now formalized via the `composa.color.brand-default` primitive — not a defect. As of the IconButton-family pass, the previously-deferred items are now resolved for that family: border-translucency (#6, icon-button family), IconButton/Toggle/Split hover+active (#12), Toggle-On bg (#14), and Inverse text (#9) — the last three via three new owner-sourced tokens (see "New tokens added"). The only items still explicitly out of scope are the plain-Button Secondary border (#6, system-wide) and the global `button{}` letter-spacing reset (part of #11).

### Top 5 most important Button fidelity gaps

1. **Primary fill is a deliberate Composa brand divergence (resolved, not a defect).** Figma Primary bg = `#0d99ff` (UI3 blue). Composa's Primary intentionally uses the Radicle brand orange **`#ff5c16`**. This is now formalized as a first-class brand primitive: `composa.color.brand-default` (`#ff5c16`, dark `#f65009`) in `tokens/primitive/color.json`, with the semantic `--composa-color-bg-brand` referencing it (`var(--figma-composa-color-brand-default)`). Previously this rode on an accidental Slides-surface leftover (`--figma-composa-slides-color-bg-brand`); the formalization removes that ambiguity. The resolved value stays `#ff5c16`, so the token-parity gate stays green. **Classification: deliberate divergence, not a fidelity defect.** Note `--composa-color-text-brand` (Link text) and the focus ring deliberately stay UI3 blue — only the Primary fill is re-branded.

2. **Disabled state uses opacity, Figma uses a solid token swap.** Figma Primary Disabled = solid bg `#d9d9d9` + text `#ffffff` (`color-bg-disabled` / `color-text-ondisabled`). Ours = `.composa-button:disabled { opacity: 0.4 }` over the live fill (so a 40%-opacity orange/blue, not gray). Structural mismatch across **all** variants.

3. **Primary hover is invented and recolors the label.** Figma has no "Hover" Primary variant — only Default → Active(pressed `#007be5`) → Focused. Our `.composa-button-primary:hover` swaps bg to `--composa-color-bg-on-selected` = **`#ffdfcc`** (pale peach) and changes text from on-brand white to `--composa-color-text` (`rgba(0,0,0,0.9)`). Figma's pressed state keeps white text on `#007be5`. So our hover both uses a non-spec fill and inverts the text color. (MISMATCH: hover fill `#ffdfcc` vs Figma pressed `#007be5`; text black vs white.)

4. **Destructive fill is off.** Figma Destructive bg = `#f24822` (`color-bg-danger`). Ours hardcodes `#e03e1a` in `.composa-button-destructive`. The correct semantic token `--composa-color-bg-danger` already resolves to `#f24822`, so the literal should be removed in favor of the token.

5. **Link / Link-Danger / Secondary-Destruct text colors are off.** Figma: Link `#007be5`, Link Danger `#dc3412`, Secondary Destruct text `#dc3412` (+ border `#ffc7c2`). Ours hardcodes Link `#0d99ff`, Link-danger/destructive text `#e03e1a`, and `.composa-button-secondary-destruct` has **no border at all**.

### Does the report format work?
Yes. Resolving both sides to concrete values and marking each cell OK / `MISMATCH (Figma X vs ours Y)` produces specific, fixable rows and a clean top-N rollup. The one adjustment worth standardizing before scaling: separate **"deliberate token re-map"** (e.g. brand orange) from **"defect"** so re-brands don't drown the signal. Recommend a per-component header stating the baseline (UI3-literal vs Composa-rebranded).

---

## Shared values (apply to all Button variants unless noted)

| Property | Figma (resolved) | Ours (resolved) | Result |
|---|---|---|---|
| Height (Default size) | `24px` | `--composa-height-input` = `24px` | **OK** |
| Height (Large) | `32px` | `.composa-button-large` = `32px` | **OK** |
| Height (Small) | `20px`* | `.composa-button-small` = `20px` | **OK** |
| Corner radius | `--radius-medium` = `5px` | `--composa-radius-medium` = `5px` | **OK** |
| Horizontal padding (Default) | `--spacer-2` = `8px` | base `.composa-button` = `--composa-space-2` = `8px` | **OK** (but Primary overrides, see below) |
| Horizontal padding (Large) | `12px` (literal in Figma) | base `8px`, no large override | **MISMATCH (Figma `12px` vs ours `8px`)** |
| Font family | Inter | `--composa-font-family` = `Inter, …` | **OK** |
| Font size | `11px` | `--composa-body-medium-size` = `11px` | **OK** |
| Line height | `16px` | `--composa-body-medium-line` = `16px` | **OK** |
| Font weight | `450` | `--composa-body-medium-weight` = `450` | **OK** |
| Letter spacing | `0.5` (≈`0.055px` @11px, i.e. `0.005em`) | `--composa-body-medium-letter-spacing` = `0.005em` | **OK** (not applied on `.composa-button` — see note) |
| Gap (icon↔label) | `--spacer-1` = `4px` | `--composa-space-1` = `4px` | **OK** |

\* Small-size Button variants are sampled lighter in Figma; the dedicated Small frame (`2324:46892` group) confirms `20px`. Letter-spacing note: `body.medium` carries `0.005em`, but `.composa-button` does not set `letter-spacing` and the global `button {}` reset sets `letter-spacing: 0`, so **rendered tracking is `0`, not `0.005em`** — a subtle MISMATCH on every button (counted once, below).

---

## Button — variant × state (Default size, no icon)

Columns: BG fill · Text color · Border · (height/radius/padding are shared above and OK unless noted)

| Variant | State | Figma BG | Our BG | Figma Text | Our Text | Figma Border | Our Border | Result |
|---|---|---|---|---|---|---|---|---|
| **Primary** | Default | `#0d99ff` | `#ff5c16` (brand orange) | `#ffffff` | `#ffffff` | none | transparent | **DELIBERATE DIVERGENCE (Composa brand): bg `#0d99ff` vs `#ff5c16` via formal `brand-default` primitive — not a defect** |
| Primary | Hover | *(no Figma hover)* | `#e5520f` (`bg-brand-pressed`) | — | `#ffffff` | — | transparent | **RESOLVED: brand-coherent darken of the orange, white label (replaced the invented peach/black hover)** |
| Primary | Active/pressed | `#007be5` | `#e5520f`* (brand-pressed) | `#ffffff` | `#ffffff` | none | transparent | **DIVERGENCE (follows brand re-map): orange-pressed `#e5520f`/white vs Figma blue-pressed `#007be5`/white — structurally correct (darkened brand + white label)** |
| Primary | Focused | bg `#0d99ff` + `1px` border `#0d99ff` + inset `2px` white ring | `1px` outline `--composa-control-focus-ring` (`#0d99ff`), offset `-1px` + inset `2px` white ring | `#ffffff` | `#ffffff` | selected `#0d99ff` | — | **RESOLVED: ring color OK (`#0d99ff`) + 2px inner white ring now rendered** |
| Primary | Disabled | bg `#d9d9d9`, text `#ffffff` | bg `#d9d9d9` (`bg-disabled`), dim text/border tokens | `#ffffff` | `rgba(0,0,0,0.3)` (`text-disabled`) | none | `#e6e6e6` | **RESOLVED: solid `#d9d9d9` token swap (no longer opacity-faked)** |
| **Secondary** | Default | transparent | `--composa-color-bg` = `#ffffff` | `#000000e5` (`rgba(0,0,0,0.9)`) | `rgba(0,0,0,0.9)` | `#0000001a` (`rgba(0,0,0,0.1)`) | `--composa-color-border` = `#e6e6e6` | **MISMATCH (border: Figma translucent `rgba(0,0,0,0.1)` vs ours opaque `#e6e6e6`)** |
| Secondary | Active | `#f5f5f5` (`bg-pressed`) | `--composa-color-bg-secondary` = `#f5f5f5` (via generic `:hover/.is-active`) | `rgba(0,0,0,0.9)` | `rgba(0,0,0,0.9)` | `rgba(0,0,0,0.1)` | `#e6e6e6` | **PARTIAL: fill OK `#f5f5f5`; border mismatch as above** |
| Secondary | Focused | border `#0d99ff` | outline `#0d99ff` | — | — | — | — | **OK (ring color)** |
| Secondary | Disabled | (opacity-style not in Figma set; treat as token swap) | opacity 0.4 | — | — | — | — | **MISMATCH (opacity vs token swap, same as Primary)** |
| **Ghost** | Default | transparent | transparent | `rgba(0,0,0,0.9)` | `rgba(0,0,0,0.9)` | none | transparent | **OK** |
| Ghost | Hover | `rgba(0,0,0,0.1)` (`bgtransparent-secondary-hover`) | `--composa-control-bg-hover` = `--composa-color-bg-secondary` = `#f5f5f5` (solid) | — | — | — | — | **MISMATCH (Figma `rgba(0,0,0,0.1)` translucent vs ours solid `#f5f5f5`)** |
| Ghost | Active/Focused | active = same translucent; focus ring `#0d99ff` | hover bg + outline `#0d99ff` | — | — | — | — | **PARTIAL (ring OK; active fill mismatch as hover)** |
| **Destructive** | Default | `#f24822` (`bg-danger`) | hardcoded `#e03e1a` | `#ffffff` (`text-ondanger`) | `#ffffff` | none | transparent | **MISMATCH (bg Figma `#f24822` vs ours `#e03e1a`)** |
| **Secondary Destruct** | Default | transparent | `--composa-color-bg` = `#ffffff` | `#dc3412` (`text-danger`) | hardcoded `#e03e1a` | `#ffc7c2` (`border-danger`) | **none** | **MISMATCH (text `#dc3412` vs `#e03e1a`; border `#ffc7c2` vs none)** |
| **Inverse** | Default | `#2c2c2c` (`bg-inverse`) | hardcoded `rgba(0,0,0,0.9)` | `rgba(255,255,255,0.9)` (`text-oninverse`) | `#ffffff` | none | transparent | **MISMATCH (bg `#2c2c2c` vs `rgba(0,0,0,0.9)`; text `rgba(255,255,255,0.9)` vs `#fff`)** |
| **Success** | Default | `#14ae5c` (`bg-success`) | hardcoded `#14ae5c` | `#ffffff` (`text-onbrand`) | `#ffffff` | none | transparent | **OK** (value matches; recommend swapping literal for `--composa-color-bg-success`) |
| **Link** | Default | transparent | transparent | `#007be5` (`text-brand`) | hardcoded `#0d99ff` | none | transparent | **MISMATCH (text `#007be5` vs `#0d99ff`)** |
| Link | padding | `px = 8px` | `padding-inline: 0` | — | — | — | — | **MISMATCH (Figma keeps `8px` side padding; ours zeroes it)** |
| **Link Danger** | Default | transparent | transparent | `#dc3412` (`text-danger`) | hardcoded `#e03e1a` | none | transparent | **MISMATCH (text `#dc3412` vs `#e03e1a`)** |

\* Our Primary Active = the same `:hover/.is-active` rule (`.composa-button-primary:hover, .is-hover` → `#ffdfcc` + black text); there is no distinct pressed treatment, so Active inherits the wrong hover values.

### Primary horizontal padding sub-note
`.composa-button-primary` overrides padding to `0 12px`, while base `.composa-button` (and Figma Default-size Primary) use `8px`. Figma Primary Default = `8px`; Figma only uses `12px` at **Large** size. So our Primary is **4px too wide at Default size** and (because there's no large override) **4px too narrow at Large**. **MISMATCH (Default: ours `12px` vs Figma `8px`).**

---

## Button — size axis

| Size | Property | Figma | Ours | Result |
|---|---|---|---|---|
| Default | height | `24px` | `24px` | **OK** |
| Default | h-padding | `8px` | `8px` base / `12px` for Primary | **OK base / MISMATCH Primary** |
| Large | height | `32px` | `32px` | **OK** |
| Large | h-padding | `12px` | `8px` (no large padding override) | **MISMATCH (`8px` vs `12px`)** |
| Small | height | `20px` | `20px` | **OK** |
| Small | h-padding / gap | `4px` region (tighter) | `0 var(--composa-space-1)` = `4px`, gap `2px` | **OK** |

## Button — width axis

| Width | Figma | Ours | Result |
|---|---|---|---|
| Default | hug contents | `inline-flex`, hug | **OK** |
| Wide | fixed wide (Figma "wide" frame ≈ `256px` slot) | `.composa-button-width-wide { width: 256px }` | **OK** |

---

## IconButton — full audit (variant × state)

**Figma source:** `Button icon` component set `2324:46757` (resolved via `get_design_context` + `get_variable_defs`). Variants: Default, Secondary. States: Default, Hover, Active, Focus, Disabled.

Figma resolved variables: `bghovertransparent` = `#0000000d` (`rgba(0,0,0,0.05)`), `bgtransparent-secondary-hover` = `#0000001a` (`rgba(0,0,0,0.1)`), `bordertranslucent` = `rgba(0,0,0,0.1)`, `border-selected` = `#0d99ff`, `bg-disabled` = `#d9d9d9`, `icon` = `#000000e5`.

| Variant | State | Property | Figma | Ours (before) | Result |
|---|---|---|---|---|---|
| (all) | Default | size / radius / glyph | `24px` / `5px` / `16px` | `--composa-control-size-icon` 24 / `--composa-control-radius` 5 / `-glyph` 16 | **OK** |
| Default | Default | bg | transparent | `--composa-control-bg` transparent | **OK** |
| Default | Hover | bg | `rgba(0,0,0,0.05)` (`bghovertransparent`) | `--composa-control-bg-hover` = `#f5f5f5` (solid) | **FIXED** → `--composa-color-bg-hover-transparent` (`rgba(0,0,0,0.05)`) |
| Default | Active | bg | `rgba(0,0,0,0.1)` (`bgtransparent-secondary-hover`) | shared hover `#f5f5f5` (no distinct active) | **FIXED** → `--composa-color-bg-transparent-secondary-hover` (`rgba(0,0,0,0.1)`) |
| Default | Focus | border ring | `#0d99ff` (`border-selected`) | `1px` outline `--composa-control-focus-ring` (`#0d99ff`), offset `-1px`, inset 2px white | **OK** |
| Secondary | Default | border | `rgba(0,0,0,0.1)` (`bordertranslucent`) | `.composa-icon-button-secondary` had **no border** (base `border:0`) | **FIXED** → added `border: 1px solid --composa-color-border-translucent` |
| Secondary | Active | bg | `rgba(0,0,0,0.05)` (`bghovertransparent`) + translucent border | shared hover `#f5f5f5` | **FIXED** (translucent hover rule now covers icon-button) |
| (all) | Disabled | treatment | solid `bg-disabled` `#d9d9d9` token swap | `opacity: 0.4` → now `--composa-color-bg-disabled` token swap | **OK** (fixed in Button pass, item 13) |

## ToggleButton / DialogToggle — full audit

**Figma source:** `Button icon toggle` `2324:46776` and `Button icon dialog toggle` `2324:46817`. Variants: Default, Highlighted (toggle) / Default, Secondary (dialog). Axes: On (true/false), State (Default/Hover/Active/Focus), Disabled. Both render in code as `.composa-icon-button.composa-toggle-button` with `aria-pressed`; dialog adds `.composa-dialog-toggle`.

Figma resolved: `bg-selected` = `#e5f4ff`, `bg-selected-secondary` = `#f2f9ff`, `bghovertransparent` = `rgba(0,0,0,0.05)`, `bgtransparent-secondary-hover` = `rgba(0,0,0,0.1)`, `bg-disabled` = `#d9d9d9`.

| State | Property | Figma | Ours (before) | Result |
|---|---|---|---|---|
| Off, Default | bg | transparent | transparent | **OK** |
| Off, Hover | bg | `rgba(0,0,0,0.05)` | `#f5f5f5` (shared hover) | **FIXED** (translucent icon-button hover rule) |
| Off, Active | bg | `rgba(0,0,0,0.1)` | `#f5f5f5` | **FIXED** (translucent active rule) |
| On, Default | bg | `#e5f4ff` (`bg-selected`) | `--composa-color-bg-secondary` = `#f5f5f5` | **FIXED** → `--composa-color-bg-selected` (`#e5f4ff`) on `[aria-pressed="true"]` and `.is-selected`/`-highlighted` |
| On, Hover | bg | `#f2f9ff` (`bg-selected-secondary`) | `#f5f5f5` | **FIXED** → `--composa-color-bg-selected-secondary` on pressed+hover |
| On, Active | bg | `#e5f4ff` (`bg-selected`) | `#f5f5f5` | **FIXED** (pressed bg = `bg-selected`) |
| On, Focus | border + bg | `#0d99ff` border + `#e5f4ff` bg | focus outline `#0d99ff` over pressed bg | **OK** (ring + selected bg now both correct) |
| On, Disabled | bg | `#d9d9d9` (`bg-disabled`) | disabled token swap (`#d9d9d9`) | **OK** |
| Secondary (dialog) | border | `rgba(0,0,0,0.1)` (`bordertranslucent`) | n/a (dialog toggle shares icon-button; secondary border now translucent) | **FIXED** (via `-secondary` border) |
| DialogToggle | corner dot | `4px` dot bottom-right | `.composa-dialog-toggle::after` `4px`, `right/bottom:4px` | **OK** |

## SplitButton — full audit

**Figma source:** `Button icon split` `2324:46856`. States: Default, Hover, Primary/Secondary Focus, Primary/Secondary Active, Disabled. Sizes: Small (24px), Large (32px). Structure = icon container (left) + chevron container (right) with a `gap-px` divider.

Figma resolved: `bghovertransparent` = `rgba(0,0,0,0.05)`, `bgtransparent-secondary-hover` = `rgba(0,0,0,0.1)`, `border-selected` = `#0d99ff`, `icon` = `#000000e5`, `icon-secondary` = `#000000e5`.

| Region | State | Property | Figma | Ours (before) | Result |
|---|---|---|---|---|---|
| Container | Default | radius / height(small) | `5px` / `24px` | `--composa-radius-medium` 5 / `--composa-height-input` 24 | **OK** |
| Container | Default | outer border | none visible on current UI3 `Button icon split` default | `1px solid --composa-color-border` (`#e6e6e6` opaque) | **FIXED** → borderless |
| Divider | Default | menu/chevron separation | `1px` gap between halves, no stroked divider | `.composa-split-menu border-left 1px solid --composa-color-border` (opaque) | **FIXED** → gap-only separation |
| Icon half | Hover | bg | `rgba(0,0,0,0.05)` | `#f5f5f5` (shared hover) | **FIXED** (`.composa-split-action:hover` → translucent) |
| Icon half | Primary Active | bg | `rgba(0,0,0,0.1)` | `#f5f5f5` | **FIXED** (`.composa-split-action:active/.is-active` → translucent-secondary) |
| Chevron half | Hover / Primary Active | bg | `rgba(0,0,0,0.05)` / `rgba(0,0,0,0.1)` | `#f5f5f5` | **FIXED** (`.composa-split-menu:hover` / `:active` → translucent) |
| Either half | Primary/Secondary Focus | border ring | `#0d99ff` | `.composa-split-control.is-focused` outline `#0d99ff` | **OK** |
| (whole) | Disabled | chevron glyph | `16px` | `16px` | **OK** |

---

## Consolidated mismatch list (counted)

Button (11):
1. Primary Default bg — `#0d99ff` vs `#ff5c16` *(**deliberate Composa brand divergence**, now formalized via the `composa.color.brand-default` primitive — not a defect; resolved value stays `#ff5c16` and parity is green)*
2. Disabled treatment — solid `#d9d9d9`/white vs `opacity:0.4` — **FIXED** (now `--composa-color-bg-disabled` / `-text-disabled` / `-border-disabled` token swap; applies to all listed controls incl. IconButton, item 13).
3. Primary hover — invented; fill `#ffdfcc` + black text vs no-hover / pressed `#007be5` + white — **FIXED** (now brand-coherent `--composa-color-bg-brand-pressed` darken with white label).
4. Primary active — `#ffdfcc`/black vs `#007be5`/white — **FIXED** (shares the brand-pressed hover rule: darkened orange + white text).
5. Primary focus — missing inner `2px` white ring — **FIXED** (added `box-shadow: inset 0 0 0 2px #fff` to the focus rule).
6. Secondary/Split border — opaque `#e6e6e6` vs translucent `rgba(0,0,0,0.1)` — **FIXED for the icon-button family** (`.composa-split-control`, `.composa-split-menu` divider, and `.composa-icon-button-secondary` now use `--composa-color-border-translucent`). The base `.composa-button` Secondary border stays `--composa-color-border` (changing it is system-wide; still out of scope for plain Button).
7. Destructive bg — `#e03e1a` vs `#f24822` — **FIXED** (now `--composa-color-bg-danger`).
8. Secondary Destruct — text `#e03e1a` vs `#dc3412`; **missing** border `#ffc7c2` — **FIXED** (text → `--composa-color-text-danger`; border → `--composa-color-border-danger`).
9. Inverse — bg `rgba(0,0,0,0.9)` vs `#2c2c2c`; text `#fff` vs `rgba(255,255,255,0.9)` — **bg FIXED** (now `--composa-color-bg-inverse` = `#2c2c2c`); **text now FIXED** — added the `text-on-inverse` primitive+semantic (`rgba(255,255,255,0.9)` light / `rgba(0,0,0,0.9)` dark, source: owner export `text/inverse/oninverse` = white.800/black.800) and routed `.composa-button-inverse` color → `--composa-color-text-on-inverse`.
10. Link / Link Danger text — `#0d99ff`/`#e03e1a` vs `#007be5`/`#dc3412`; Link side-padding zeroed vs Figma `8px` — **FIXED** (Link → `--composa-color-text-brand`, Link-Danger → `--composa-color-text-danger`; removed `padding-inline: 0` so Link inherits base `8px`).
11. Large-size padding — `8px` vs `12px` (**FIXED**: `.composa-button-large` now `0 12px`); Primary Default padding `12px` vs `8px` (**FIXED**: removed the Primary `padding: 0 12px` override so it inherits base `8px`); rendered letter-spacing `0` vs `0.005em` (**NOT ADDRESSED** — global `button{}` reset zeroes tracking; out of scope).

IconButton / Toggle / Split / DialogToggle (4):
12. IconButton/Toggle-off/Split hover + active bg — solid `#f5f5f5` vs translucent `rgba(0,0,0,0.05)` (hover) / `rgba(0,0,0,0.1)` (active) — **FIXED**. Rather than repoint the system-wide `--composa-control-bg-hover` (would change Button/Dropdown/Menu too and break parity), scoped rules were added for `.composa-icon-button`, `.composa-split-action`, `.composa-split-menu` using the two new translucent tokens `--composa-color-bg-hover-transparent` and `--composa-color-bg-transparent-secondary-hover`.
13. IconButton disabled — opacity vs token — **FIXED** (same disabled-token rule as item 2 covers `.composa-icon-button:disabled`).
14. Toggle On bg — `#f5f5f5` vs `#e5f4ff`; On-hover `#f5f5f5` vs `#f2f9ff` — **FIXED**. `.composa-toggle-button[aria-pressed="true"]` (and `.composa-icon-button.is-selected`/`-highlighted`) → `--composa-color-bg-selected` (`#e5f4ff`); on+hover → `--composa-color-bg-selected-secondary` (`#f2f9ff`). Covers DialogToggle too (same class).

### New tokens added (IconButton family pass)

Three additive primitive+semantic pairs (Style Dictionary source `tokens/primitive/color.json` + `tokens/semantic/semantic.json`, regenerated into `design/generated/*`). All values resolved from the owner's DTCG export (`~/Downloads/Colors/Light.tokens.json` + `Dark.tokens.json`); none change an existing resolved value, so `missingOrChanged: 0` holds.

| Token | Light | Dark | Source (owner export) |
|---|---|---|---|
| `--composa-color-bg-hover-transparent` / `--figma-composa-color-bg-hover-transparent` | `rgba(0,0,0,0.05)` | `rgba(255,255,255,0.05)` | `special/bghovertransparent` → black.100 / white.100 |
| `--composa-color-bg-transparent-secondary-hover` / `--figma-…` | `rgba(0,0,0,0.1)` | `rgba(255,255,255,0.1)` | `special/bgtransparentsecondary.hover` → black.200 / white.200 |
| `--composa-color-text-on-inverse` / `--figma-…` | `rgba(255,255,255,0.9)` | `rgba(0,0,0,0.9)` | `text/inverse/oninverse` → white.800 / black.800 |

### Flagged for owner decision

None new in this pass — every IconButton/Toggle/Split/DialogToggle mismatch resolved to an existing or owner-sourced semantic token. (The Primary-orange brand divergence remains the one standing owner-level choice, already formalized in the Button pass.) The plain-Button Secondary border and the global `button{}` letter-spacing reset remain explicitly out of scope (system-wide), unchanged.

### Recommended fix theme
Most defects come from **hardcoded literals in `styles.css` that bypass already-correct semantic tokens** (`--composa-color-bg-danger` = `#f24822`, `--composa-color-text-danger` = `#dc3412`, `--composa-color-text-brand` = `#007be5`, `--composa-color-bg-inverse` = `#2c2c2c`, `--composa-color-border-translucent` = `rgba(0,0,0,0.1)`, `--composa-color-bg-selected` = `#e5f4ff`). Routing the button rules through these tokens would clear ~9 of the 14. The remaining structural items (disabled-by-opacity, invented Primary hover, missing focus inner-ring, large padding) need rule-level changes, and the brand-orange question is a product decision.

---

## Button-family prop alignment (owner-approved "full align")

Per an explicit owner decision, the button family (Button, IconButton, ToggleButton, SplitButton) now shares one consistent prop model. This **expands the API surface** (`factory.js`, `index.d.ts`, `component-api.json`, the Playground `argTypes`, and `styles.css`); it does **not** change the Figma-parity matrix counts (Button 184, total 553 hold — the variant-specs/manifest/storybookVariantMatrix arrays are untouched). The full shared API is explorable via the Storybook Playground controls.

| Axis | Button | IconButton | ToggleButton | SplitButton |
|---|---|---|---|---|
| `variant` (shared vocab) | yes | **now shared** | **now shared** | **added** |
| `size` small/default/large | yes | **added** | **added** | yes (kept) |
| `width` default/wide | yes | no (square) | no (square) | **added** |

### variant — shared vocabulary (DELIBERATE divergence from Figma)
IconButton, ToggleButton, and SplitButton now accept the **same `variant` values as Button** — the `buttonVariants` set: `primary, secondary, ghost, link, link-danger, destructive, secondary-destruct, inverse, success`. This **replaces** IconButton/Toggle's ad-hoc `default/secondary/highlighted` (the old `secondary`/`highlighted` keywords are retained for backward compatibility; `default` now reads as the base/transparent look) and **adds** `variant` to SplitButton (which had none). In `styles.css` the `.composa-icon-button-<variant>` selectors are appended to each `.composa-button-<variant>` rule, so all four components resolve the **same semantic color tokens** in one place (`--composa-color-bg-brand`, `-bg-danger`, `-text-danger`, `-bg-inverse`, `-bg-success`, etc.). SplitButton's action half carries `.composa-button-<variant>` and its menu half carries `.composa-icon-button-<variant>`, so both halves pick up the variant color.

**This is an intentional Composa consistency choice, NOT a fidelity defect.** Figma's `Button icon` set (`2324:46757`, verified via `get_metadata`) ships only `Variant=Default` and `Variant=Secondary` and has no size axis — every node is `24×24`. Composa deliberately diverges to give the whole family one shared, predictable `variant` vocabulary.

### size — small/default/large (Composa addition for IconButton/Toggle — FLAGGED)
SplitButton already had a `size` axis (Figma `Button icon split` ships Small `24px` / Large `32px`); we keep `small|default|large`. IconButton and ToggleButton **gain** `size`. Because **Figma's icon-button set defines no size axis** (all variants are `24×24`), the IconButton/Toggle size scale is a **Composa addition, not Figma-sourced**, and is **FLAGGED** as such. It maps to the icon **box** (square, width = height): **small `20px` / default `24px` / large `28px`** (`.composa-icon-button-small|-default|-large`). The glyph stays `16px`. The `default 24px` anchors to the existing `--composa-control-size-icon`; 20/28 are a sensible ±4px step. If the owner later defines official icon-button sizes in Figma, swap these literals for the sourced values.

### width — Button + SplitButton only
`width: default|wide` is added to SplitButton, same pattern as Button (`.composa-split-width-wide { width: 256px }`, hug by default). **IconButton and ToggleButton stay square and have NO `width` prop** — width = height = the icon box, so a width axis there is meaningless.

### SplitButton-wide bug fix
`.composa-split-control` was wrongly grouped in `styles.css` with the stretch-to-fill form controls (the `display:flex; align-items:center` row alongside `.composa-input-field` / `.composa-dropdown` / `.composa-tabs`), so it stretched like an input. It now has its **own** rule that hugs content by default (`display: inline-flex; width: max-content; max-width: 100%`) — like a button — and only grows to the fixed wide slot via `.composa-split-width-wide`.

### Flagged for owner decision (this pass)
- **IconButton/ToggleButton size scale (20/24/28px) is Composa-invented**, not Figma-sourced (Figma has no icon-button size axis). Flagged above; confirm or replace with official values if/when Figma defines them.

## Play function status

`@storybook/test` (the old standalone package) is **not** installed. In **Storybook 10**, interaction-test utilities ship from the `storybook/test` subpath export of the core `storybook` package, which **is** present and resolves (`node_modules/storybook/dist/test/index.js`, exporting `fn`, `expect`, `userEvent`, `within`, …). So play functions are available without any new dependency.

A play function was added to a Button story in `src/react/stories/button.stories.js` (story export `ButtonClickInteraction`): it asserts that clicking an enabled button fires `onClick`, and that a disabled button does not. The `Button` factory renders a real `<button>` that spreads `...props` (so `onClick` passes through) and sets the native `disabled` attribute, so the assertions are meaningful.

To additionally run play functions headlessly in CI (test runner), you would install and wire one of:
- `@storybook/addon-vitest` + `vitest` (the SB10-recommended path), or
- `@storybook/test-runner` + Playwright (`npx playwright install`), invoked as `test-storybook` against a built/served Storybook.

Neither is required for play functions to execute in the Storybook UI / interactions panel.
