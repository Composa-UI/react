# Visual / Layout Fidelity Audit — Inputs + Structural Components

**Scope:** Geometry, alignment, centering, padding/spacing, missing elements (borders/dividers), and perceptual color — the class of defects a token hex/px value-diff cannot catch.
**Method:** Each story loaded in its own Storybook iframe tab; per-element geometry measured via `getBoundingClientRect` + `getComputedStyle` (sub-pixel), cross-checked against zoomed screenshots. Read-only — no source files edited.
**Cluster:** InputField (Text / Color / Numeric / NumericMulti / Combo), ListCell, ListCell/Header, MetaLabel, Fill module.

> NOTE: The CSS already reflects the prior value-diff audit's fixes (transparent single-line default shell, no blue border on the default combo chevron, gray numeric default, etc.). This pass confirms those render correctly in geometry and surfaces what the value-diff could not.

---

## Summary

Geometry across this cluster is in good shape. Every multi-part component (Color, NumericMulti, Combo, ListCell, Fill) shares a consistent vertical center line and correct cell partitioning. **One real perceptual-color defect** was found (MetaLabel `menu` variant renders near-invisible standalone). Two items are dividers that are technically present but perceptually very weak; surfaced as low-severity observations, not defects, because they match the documented intentional "white-as-cut" style.

| # | Component | Severity | Type |
|---|---|---|---|
| 1 | MetaLabel (`menu`/`section` variant) | med | Perceptual color — near-invisible text |
| 2 | ColorInput value↔opacity divider | low | Weak divider (intentional style, noted) |
| 3 | NumericMulti cell dividers | low | Weak dividers (intentional style, noted) |

Everything else inspected is **correct** — see the per-component "verified correct" notes below.

---

## DEFECTS

### 1. MetaLabel — `menu` (and `section`) variant text is near-invisible

| Field | Detail |
|---|---|
| **Component** | MetaLabel |
| **State/variant** | `composa-meta-label-menu` (the variant the `--playground` story renders by default; `-section` shares the same token) |
| **Issue** | The text "Layer" computes to `color: rgba(255,255,255,0.7)` (near-white) and is painted on the MetaLabel's transparent parent over the light Storybook canvas (`rgb(238,238,238)`). Result: the label is effectively unreadable standalone — only a ghost of the glyphs is visible. Measured: `.composa-meta-label-menu { color → rgba(255,255,255,0.7) }`, parent background `rgba(0,0,0,0)`. The base `.composa-meta-label` (text-secondary, dark) and `-property` (text-tertiary, dark) variants are readable; only the menu/section variants invert to white. |
| **Severity** | **med** — the menu/section variants assume a dark menu-row surface that the standalone component does not provide; rendered in any light context (including its own Storybook story) they vanish. If a consumer drops a `menu`/`section` MetaLabel outside a dark menu row, it disappears. |
| **Suspected source** | `styles/10-list-cell.css` — `.composa-meta-label-menu, .composa-meta-label-section { color: var(--composa-menu-row-fg-secondary); }` (resolves to `rgba(255,255,255,0.7)`). The token is a menu-context foreground meant for dark surfaces. |
| **Suggested fix** | Two options. (a) If these variants are only ever valid inside a dark menu row, the MetaLabel story for the `menu`/`section` variant should render on a dark `--composa-menu-row-bg` backdrop so it is legible (story-level fix, not CSS). (b) If the variant must survive on light surfaces, swap `--composa-menu-row-fg-secondary` for a surface-agnostic token (e.g. `--composa-color-text-secondary`). Confirm intent before changing the token — the white value is correct *for a dark menu row*, so this is a context/contract mismatch, not a wrong value. |

---

## LOW-SEVERITY OBSERVATIONS (dividers present but perceptually weak — match documented intentional style)

### 2. ColorInput — value↔opacity divider is white on a gray shell

- **Component / variant:** ColorInput, default. **Issue:** the separator between the value segment and the `100 %` opacity segment is `border-left: 1px solid var(--composa-color-bg)` = `#ffffff`, drawn over the `#f5f5f5` shell. The 1px white line is barely perceptible (low white-on-light-gray contrast). It *is* present and correctly positioned (at x=553.5, the opacity column start).
- **Severity:** low. **Source:** `styles/55-color-input.css` `.composa-color-opacity { border-left: 1px solid var(--composa-color-bg); }`.
- **Note:** the value-diff audit already documented this as the intentional "white-as-cut" Figma style. Flagging only that perceptually the seam is near-invisible against the gray default shell; it reads more clearly on the active/white shell. No change recommended unless Figma's separator is meant to be `bg-tertiary` (#e6e6e6); current value matches the prior audit's "OK".

### 3. NumericMulti — cell dividers are white on a gray shell

- **Component / variant:** NumericInputMulti, default. **Issue:** the three inter-cell dividers are `border-right: 1px solid var(--composa-color-bg)` = `#ffffff` over the `#f5f5f5` container. Same near-invisible white-on-light-gray as #2. Dividers are present and correctly placed (between the four 34px value cells; absent on `.is-last`).
- **Severity:** low. **Source:** `styles/50-input.css` `.composa-numeric-multi-value { border-right: 1px solid var(--composa-color-bg); }`.
- **Note:** documented intentional style. Listed for completeness; no change recommended.

---

## VERIFIED CORRECT (no defect)

**TextInput (single-line) — `--text-input`**
- Shell transparent by default (correct — the prior gray-default value defect is fixed). Input vertically centered (input cy = shell cy = 381.5; 18px input box centered in 24px shell). Story has no leading glyph / no clear button, so icon and clear-button alignment could not be exercised here, but the shell/value baseline is clean.

**ColorInput — `--color-input`**
- Chip frame 24px, chip 14×14 centered (chip cy 381.5 = container cy). Square chip radius 2px. Value text, chip, opacity input, and `%` suffix all share cy = 381.5 (perfect vertical center, no baseline drift). Opacity checker/chip and divider present. Grid `24px minmax(0,1fr) 53px` partitions correctly.

**NumericInput (single) — `--numeric-input`**
- Gray shell `#f5f5f5` (correct for Numeric default). Leading "W" glyph centered in its 24px box; value centered; glyph cy = value cy = 381.5. No vertical misalignment between lead glyph and value.

**NumericInputMulti — `--numeric-input-multi`**
- Lead icon (24px, justify center) + four equal 34px value cells, all cy = 381.5. Even partitioning, correct lead/value vertical alignment. Dividers present (see obs #3).

**ComboInput — `--combo-input`**
- Value half (92px) + chevron half (24px) with the intended 1px grid gap forming the seam (value ends x=554.5, dropdown starts x=555.5). Both halves cy = 381.5. Chevron SVG (16px) centered in the 24px dropdown (≈4px each side). Default chevron border is `transparent` (correct — no stray blue border). Value/chevron radii mirror correctly (`5px 0 0 5px` / `0 5px 5px 0`).

**ListCell — `--playground` and `--content-stack`**
- Playground: leading (24px, center) / content / trailing all cy = 381.5; trailing actions right-aligned (`justify-content: flex-end`). Title 550-weight, centered.
- Content-stack: stack gap 4px verified (title ends y=375.5, next row starts y=379.5). Leading element vertically centered across the 44px two-line cell. Title (550) vs secondary row baseline spacing correct.

**ListCell/Header — `--playground`**
- Disclosure chevron (24px) + title (550) + actions all cy = 381.5; actions right-aligned. No alignment drift between the disclosure glyph and the title baseline.

**Fill module — `--spec`**
- Section: white bg, top+bottom 1px `#e6e6e6` borders present (left/right intentionally omitted), 12px bottom padding. Header 40px, padding `0 8px 0 16px`. Three 32px rows, each grid `156px 52px`, color-inputs uniformly 156px wide, row actions (eye/minus) right-aligned at 52px. All elements within each row share a row-local center line; rows stack cleanly with no overlap or uneven gaps. Header actions (grid/plus) right-aligned and centered with the "Fill" title.

---

## Notes for a fix agent

- Only **#1 (MetaLabel)** warrants a code/story change, and it needs an intent decision first (is the `menu`/`section` MetaLabel ever shown outside a dark menu surface?). Do not blindly swap the token — the white value is correct for a dark menu row.
- #2 and #3 are the same intentional "white-as-cut" divider pattern already accepted by the value-diff audit; included here only because the seams are perceptually faint on the gray default shell. No action unless the team decides separators should be `#e6e6e6` for visibility.
- No centering, padding-geometry, missing-border, or cell-partition defects were found in InputField (all variants), ListCell, ListCell/Header, or the Fill module.
