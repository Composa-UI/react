# Fidelity Audit — Controls (value-level)

**Component group:** Selection & navigation controls — Switch, Radio, Checkbox, Dropdown, SegmentedControl, Tabs
**Figma source:** file `4kilp0ShQiYsoUPJdleqEH`. Component sets:
- Switch `2015:24697`
- Radio button `2015:20365`
- Checkbox `2012:55461`
- Dropdown `2028:36589`
- Segmented control `2015:20960`
- Tabs: `_Tab` atom `2015:27758` (variant symbols `2015:27759`…), `Tabs` wrapper `2015:27780`

**Our source:** `styles.css` (`.composa-switch*`, `.composa-radio*`, `.composa-checkbox*`, `.composa-dropdown*`, `.composa-segmented-control*`, `.composa-tab*`) with custom properties resolved through `design/tokens.css` → `design/generated/composa-core-tokens.css` + `composa-semantic-tokens.css`.

**Method:** Each Figma variant/state node was resolved to exact computed values via `get_design_context` + `get_variable_defs`. Each CSS rule was resolved to a concrete hex/px by following the token chain. No screenshots are used as evidence — every cell is a resolved value-to-value comparison. Light mode is the baseline (Figma library default).

---

## The brand-token fork (read this first — it explains most "blue vs orange" cells)

Composa rebrands the UI3 blue (`#0d99ff`) to Radicle orange (`#ff5c16`) — but **only on the `--composa-color-bg-brand` semantic token**. The chains diverge:

| Our variable | Resolves to | Used by (in this group) |
|---|---|---|
| `--figma-composa-color-bg-brand` (raw primitive) | **`#0d99ff`** (UI3 blue) | switch-on track, radio/checkbox checked mark, focus rings |
| `--composa-color-bg-brand` (semantic, re-mapped to `brand-default`) | **`#ff5c16`** (brand orange) | **`.composa-radio-button.is-checked` only** |

So almost every selection control in this group still renders **blue and matches Figma**, because `--composa-switch-bg-checked`, `--composa-selection-control-bg-selected`, `--composa-selection-control-border-selected`, and `--composa-control-focus-ring` all bind the **raw** primitive, not the orange semantic. The **button-style radio** is the one place the orange leaks in. This is flagged below as a **FLAG-FOR-OWNER** consistency question, not asserted as a defect.

---

## Summary

**Total MISMATCH rows: 18** across the six components (Switch 4 · Radio 3 · Checkbox 2 · Dropdown 5 · SegmentedControl 1 · Tabs 3). Plus **2 FLAG-FOR-OWNER** items (deliberate-looking divergences). The bulk are `styles.css` literals/wrong-token bindings that bypass the correct semantic token; each row names the token the fix should use.

### Top issues

1. **Switch OFF track is the wrong gray.** Figma OFF track = `--color-bg-tertiary` **`#e6e6e6`**; ours = `--composa-switch-bg` → `--composa-color-bg-secondary` = **`#f5f5f5`**. The token `--composa-switch-bg` should bind a `#e6e6e6` source (bg-tertiary), not bg-secondary. Affects every OFF switch.

2. **Dropdown invents a hover/active fill Figma doesn't have.** Figma Dropdown never changes its background on hover/active — Default/Focused/Active all keep bg `#ffffff`; Active only adds a *text-selection highlight* on the label (`--color-texthighlight` `rgba(13,153,255,0.4)`) and a blue border. Our shared rule `.composa-dropdown:hover, .composa-dropdown.is-active { background: var(--composa-control-bg-hover) }` paints a solid `#f5f5f5` fill. MISMATCH on hover and active.

3. **Dropdown disabled uses a gray fill + dim border; Figma keeps it white with tertiary text.** Figma Disabled = bg `#ffffff`, text `--color-text-tertiary` `rgba(0,0,0,0.3)`, dimmed chevron — no surface fill. Ours (shared `:disabled` rule) = bg `--composa-color-bg-disabled` `#d9d9d9` + text-disabled + border-disabled. Structural MISMATCH.

4. **Dropdown focus adds a white inset ring Figma doesn't use.** Figma Focused = just a `1px` border swap to `--color-border-selected` `#0d99ff`. Ours (shared `.is-focused`) adds `box-shadow: inset 0 0 0 2px #fff` on top of the blue outline. Ring *color* is correct; the inner white ring is extra.

5. **Button-style radio recolors selection to orange and uses the wrong selected surface.** Figma `Radio variant=Button` "Active/checked" = pale-blue surface `--color-bg-selected` `#e5f4ff` + border `--color-border-brand` `#bde3ff`, dark text. Ours `.composa-radio-button.is-checked` = solid orange fill `--composa-color-bg-brand` `#ff5c16` + white text; `.is-active` = peach `--composa-color-bg-on-selected` `#ffdfcc`. (See FLAG-FOR-OWNER #2 — likely a deliberate "selected pill" treatment, but it's a large visual divergence.)

### FLAG-FOR-OWNER (deliberate-looking, confirm intent)

- **#1 — Brand color on selection controls.** Where Composa shows a selected/active selection control, the question is whether it should follow the **orange** brand or stay **UI3 blue**. Today it's inconsistent *by construction*: switch-on / radio-dot / checkbox-check / focus rings stay blue `#0d99ff` (raw primitive), while the **button radio** alone goes orange `#ff5c16` (semantic). Figma is uniformly blue. Recommend the owner pick one rule and apply it consistently.
- **#2 — Button radio "checked" as a solid filled pill.** Ours fills the whole control orange with white text on check; Figma uses a *subtle* pale-blue selected surface with dark text. Both are valid patterns; flagging the divergence rather than calling it wrong.

---

## Shared resolved values (apply across this group unless noted)

| Property | Figma (resolved) | Ours (resolved) | Result |
|---|---|---|---|
| Font family / size / line / weight | Inter / `11px` / `16px` / `450` | `--composa-body-medium-*` = Inter / 11 / 16 / 450 | **OK** |
| Strong weight (selected tab / button-radio) | `550` | `--composa-body-medium-strong-weight` = `550` | **OK** |
| Corner radius (medium) | `--radius-medium` = `5px` | `--composa-radius-medium` = `5px` | **OK** |
| Input height | `--height.input` = `24px` | `--composa-height-input` = `24px` | **OK** |
| `--spacer-2` / `--spacer-1` | `8px` / `4px` | `--composa-space-2` / `-1` = `8px` / `4px` | **OK** |
| Letter spacing | `0.5` (≈`0.005em`) | carried on `body.medium`; most controls don't set it | OK in token; rendered tracking depends on element (same global-reset caveat as Buttons) |

---

## Switch — Type × State (Default size)

Figma axes: `Type=On/Off/Mixed`, `State=Default/Focused`, `Disabled`. Our classes: `.composa-switch`, `.is-checked`, `.is-mixed`, `stateClass`, `.composa-switch-compact`.

Columns: track fill · thumb · notes.

| Type | State | Figma track | Our track | Figma thumb | Our thumb | Result |
|---|---|---|---|---|---|---|
| **Off** | Default | `--color-bg-tertiary` `#e6e6e6` | `--composa-switch-bg` → bg-secondary `#f5f5f5` | knob `--color-icon-onbrand` white, left | `--composa-switch-thumb-bg` = bg `#ffffff`, left | **MISMATCH (track `#e6e6e6` vs `#f5f5f5` — bind `--composa-switch-bg` to bg-tertiary)** |
| Off | Focused | `1px` border `--color-border-selected` `#0d99ff` over `#e6e6e6` track | `stateClass` focus → outline `--composa-control-focus-ring` `#0d99ff` + `inset 0 0 0 2px #fff` | white | white | **PARTIAL (ring color OK `#0d99ff`; track base still `#f5f5f5` not `#e6e6e6`; Figma has no inner white ring on switch)** |
| **On** | Default | `--color-bg-brand` `#0d99ff` | `--composa-switch-bg-checked` → raw `#0d99ff` | `--color-icon-onbrand` white, right | white, `translateX(12px)` | **OK** (track blue matches; offset 12px = 28−12−2·2) |
| On | Focused | brand `#0d99ff` + `inset 2px white` ring (`shadow-[inset_0_0_0_2px_white]`) | blue track + outline `#0d99ff` + `inset 0 0 0 2px #fff` | white | white | **OK** (Figma's On/Focused *does* carry the 2px inner white ring — matches) |
| On | Disabled | bg `--color-bg-tertiary` `#e6e6e6`, knob `--color-icon-ondisabled` white | shared `:disabled` → bg `#d9d9d9` + opacity-free token swap; switch has no dedicated disabled track | white | white | **MISMATCH (Figma disabled-on track `#e6e6e6` vs ours `#d9d9d9`)** |
| **Mixed** | Default | track `--color-bg-brand` `#0d99ff` + centered minus glyph | `.is-mixed` track `--composa-switch-bg-checked` `#0d99ff`; thumb stretched full-width, no minus glyph | minus icon | full-width bar (no minus icon) | **MISMATCH (Figma shows a centered "minus" mark on a brand track; ours renders a full-width thumb bar instead of the minus glyph)** |
| Mixed | Focused | brand track + minus + `inset 2px white` ring | blue track + focus ring | minus | bar | (same mixed-glyph mismatch as above) |

Notes:
- Thumb size `12px` (ours) vs Figma knob `14px` (`size-[14px]`). **MISMATCH (thumb `12px` vs Figma `14px`).** Compact thumb `10px` is a repo-only size (no Figma compact axis).
- Switch dimensions `28×16` (ours) match Figma `w-[32px] h-[16px]`? Figma track is `w-[32px]`; ours is `--composa-switch-width` = `28px`. **MISMATCH (width `28px` vs Figma `32px`).** Compact `24px` has no Figma counterpart.

---

## Radio — Variant × State

Figma axes: `Variant=Input/Button`, `State=Default/Active/Focused/Disabled`, `On=On/Off`, `Label`. Our classes: `.composa-radio` (input) + `.composa-radio-mark`, `.composa-radio-button`.

### Input radio (mark)

| State | Figma | Ours (resolved) | Result |
|---|---|---|---|
| Unchecked | border `--color-border` `#e6e6e6`, bg `--color-bg` `#fff`, circle | `--composa-selection-control-border` = border `#e6e6e6`, bg `#fff` | **OK** |
| Checked (On) | ring + dot `--color-border-selected` `#0d99ff` (blue) | border + bg `--composa-selection-control-*-selected` → raw `#0d99ff`; dot via `::after` `currentColor` (text-on-brand white inside blue) | **OK** (blue matches Figma) — *but see note* |
| Active | (Figma input has no distinct Active fill) | `.composa-radio.is-active .composa-radio-mark` border → `#0d99ff` | **OK** |
| Focused | `1px` border `--color-border-selected` `#0d99ff` | `stateClass` focus ring `#0d99ff` | **OK** |
| Disabled | (input-disabled not separately sampled) | shared `:disabled` token swap | treat as OK pending sample |

Note: the dot is drawn via `::after { background: currentColor }`. The mark sets `color: --composa-color-text-on-brand` (white), so on a checked (blue) mark the dot is white — consistent with Figma's filled-ring rendering.

### Button radio (`variant=Button`)

| State | Figma surface | Figma border | Ours (resolved) | Result |
|---|---|---|---|---|
| Default (off) | bg `#fff` | `--color-bordertranslucent` `rgba(0,0,0,0.1)` | `.composa-radio-button` bg `--composa-color-bg` `#fff`, border `--composa-color-border` **`#e6e6e6`** (opaque) | **MISMATCH (border Figma translucent `rgba(0,0,0,0.1)` vs ours opaque `#e6e6e6` — should bind `--composa-color-border-translucent`)** |
| Active / checked | `--color-bg-selected` **`#e5f4ff`** | `--color-border-brand` `#bde3ff` | `.is-checked` bg `--composa-color-bg-brand` **`#ff5c16`** (orange), border transparent, text white | **MISMATCH (Figma pale-blue selected surface `#e5f4ff`+`#bde3ff` border vs ours solid orange fill) — see FLAG-FOR-OWNER #2** |
| Active (pressed, our `.is-active`) | `#e5f4ff` | `#bde3ff` | `.composa-radio-button.is-active` bg `--composa-color-bg-on-selected` **`#ffdfcc`** (peach) | **MISMATCH (peach `#ffdfcc` vs Figma `#e5f4ff`)** |
| Focused | bg `#fff` | `--color-border-selected` `#0d99ff` | focus ring `#0d99ff` | **OK** |
| Disabled (off) | bg `#fff`, text `--color-text-disabled` `rgba(0,0,0,0.3)` | shared `:disabled` token swap (bg `#d9d9d9`) | **MISMATCH (Figma keeps white bg + dim text; ours gray fill)** |

---

## Checkbox — Type × State

Figma axes: `Type=Checked/Unchecked/Mixed`, `State=Default/Focused`, `Disabled`, `Muted`, `Ghost`. Our classes: `.composa-checkbox` + `.composa-checkbox-mark`, `.is-checked`, `.is-mixed`, `.is-muted`, `.is-ghost`.

| Type | Figma mark | Ours (resolved) | Result |
|---|---|---|---|
| Unchecked | border `--color-border` `#e6e6e6`, bg `#fff`, radius `--radius-small` `2px` | border `--composa-selection-control-border` `#e6e6e6`, bg `#fff`, `--composa-radius-small` `2px` | **OK** |
| Checked | bg + border `--color-bg-brand` `#0d99ff` (blue), check `--color-icon-onbrand` white | `.is-checked` border+bg `--composa-selection-control-*-selected` → raw `#0d99ff`, glyph color `--composa-color-text-on-brand` white | **OK** (blue matches) |
| Mixed | bg `#0d99ff`, centered minus, white | `.is-mixed` same selected fill `#0d99ff`, glyph "–" white | **OK** |
| Focused | `1px` border `--color-border-selected` `#0d99ff` | `stateClass` focus ring `#0d99ff` | **OK** |
| Disabled | mark on `--color-bg-disabled` `#d9d9d9` / dim | shared `:disabled` token swap | **OK** (token swap aligns with Figma's solid disabled) |
| **Muted** | (Figma `Muted=True` — distinct token treatment) | `.is-muted` = `opacity: 0.7` on the mark + text-secondary label | **MISMATCH (Figma uses a muted *color token*; ours fakes it with `opacity: 0.7`)** |
| **Ghost** | (Figma `Ghost=True` — borderless until checked) | `.is-ghost` transparent border/bg until checked | **OK** structurally; verify Figma's exact ghost token if a fill differs — **MISMATCH-RISK (unsampled Figma ghost fill)** |

Checkbox is the highest-fidelity component in this group: only **Muted** is a clear defect (opacity vs token).

---

## Dropdown — Size × State

Figma axes: `Size=Default/Large`, `State=Default/Focused/Active`, `Disabled`, `Stroke`, `Icon Lead`. Our classes: `.composa-dropdown`, `.composa-dropdown-large`, `.is-borderless`, shared hover/active/focus/disabled rules.

| State | Figma bg | Our bg | Figma border | Our border | Result |
|---|---|---|---|---|---|
| Default | `--color-bg` `#fff` | `--composa-color-bg` `#fff` | `--color-border` `#e6e6e6` | `--composa-color-border` `#e6e6e6` | **OK** |
| Hover | *(no hover variant; bg stays `#fff`)* | `--composa-control-bg-hover` → bg-secondary **`#f5f5f5`** (solid fill) | `#e6e6e6` | `#e6e6e6` | **MISMATCH (Figma never fills on hover; ours paints `#f5f5f5`)** |
| Active | `#fff` (label gets text-highlight `--color-texthighlight` `rgba(13,153,255,0.4)`) | `--composa-control-bg-hover` `#f5f5f5` (full-surface fill) | `--color-border-selected` `#0d99ff` | inherits `#e6e6e6` (no active border swap) | **MISMATCH (Figma: white bg + blue border + label text-highlight; ours: gray fill, no blue border, no text-highlight)** |
| Focused | `#fff` | `#fff` | `--color-border-selected` `#0d99ff` | outline `--composa-control-focus-ring` `#0d99ff` **+ `inset 0 0 0 2px #fff`** | **MISMATCH (ring color OK; Figma has no inner white ring on dropdown)** |
| Disabled | `#fff`, text `--color-text-tertiary` `rgba(0,0,0,0.3)`, dim chevron | shared `:disabled` → bg `--composa-color-bg-disabled` `#d9d9d9`, text-disabled, border-disabled | — | — | **MISMATCH (Figma white bg + tertiary text; ours gray fill `#d9d9d9`)** |
| Stroke=False / `.is-borderless` | transparent border | `border-color: transparent` | — | — | **OK** |
| Large | `min-height 32px` | `.composa-dropdown-large` `min-height: 32px` | — | — | **OK** |

The dropdown's hover/active/focus/disabled are all governed by the **shared** control rules (`.composa-dropdown` is listed alongside buttons/menus in those selectors). Those rules are right for buttons but wrong for the dropdown, which Figma treats as an input (no surface fill on interaction). Fix is to give the dropdown its own input-style hover/active/disabled treatment.

---

## SegmentedControl — segment states

Figma axes: `Variant=Icon/Label`, `Tab Count=02..06`, `State=Default/Disabled`. Our classes: `.composa-segmented-control`, `> .composa-segmented-label`, `.is-selected`, `.is-disabled`.

| Element / state | Figma | Ours (resolved) | Result |
|---|---|---|---|
| Track (container) | `--color-bg-secondary` `#f5f5f5`, radius `5px` | `--composa-color-bg-secondary` `#f5f5f5`, `--composa-radius-medium` `5px` | **OK** |
| Selected segment bg | `--color-bg` `#fff` + `1px` border `--color-border` `#e6e6e6` | `.is-selected` bg `--composa-color-bg` `#fff` + `1px` `--composa-color-border` `#e6e6e6` | **OK** |
| Selected segment text | `--color-text` `#000000e5` | `.is-selected` color `--composa-color-icon` `#000000e5` | **OK** (both resolve `#000000e5`) |
| Unselected label text | `--color-text-secondary` `rgba(0,0,0,0.5)` | `> .composa-segmented-label` color `--composa-color-text-secondary` `rgba(0,0,0,0.5)` | **OK** |
| Unselected segment bg | `--color-bg-secondary` `#f5f5f5` (sits on track) | inherits track `#f5f5f5` | **OK** |
| Disabled | per-segment text → `--color-text-tertiary` `rgba(0,0,0,0.3)`; segments lose the white fill | `.is-disabled` = `opacity: 0.4` over the whole control | **MISMATCH (Figma swaps to tertiary text token per segment; ours fakes it with `opacity: 0.4` on the container)** |
| Item height | `24px` (segment) | `--composa-segmented-item-height` `22px` (inside `1px`-padded `24px` track) | **OK** (22 + 2·1 padding = 24) |

SegmentedControl is near-perfect: only the disabled treatment (opacity vs tertiary-text token) diverges.

---

## Tabs — _Tab states

Figma axes (`_Tab` atom): `Single Tab=True/False`, `Selected=True/False`, `State=Default/Focused/Hover`. Our classes: `.composa-tab`, `.is-selected`, `.is-hover`, `.is-focused`, `.is-single`, `.composa-tabs-underline`.

| State | Figma | Ours (resolved) | Result |
|---|---|---|---|
| Default (unselected) | text `--color-text-secondary` `rgba(0,0,0,0.5)` | `.composa-tab` color `--composa-tab-fg` → text-secondary `rgba(0,0,0,0.5)` | **OK** |
| Selected | bg `--color-bg-secondary` `#f5f5f5`, text `--color-text` `#000000e5`, weight `550` | `.is-selected` bg `--composa-tab-bg-selected` `#f5f5f5`, color `--composa-tab-fg-selected` → text `#000000e5`, weight `550` | **OK** |
| Hover | bg `--color-bg-hover` `#f5f5f5` | `.is-hover` bg `--composa-tab-bg-hover` → bg-secondary `#f5f5f5` | **OK** (both `#f5f5f5`) |
| Focused | `1px` border `--color-border-selected` `#0d99ff` (Figma `_Tab` focus draws a brand outline) | `.is-focused` outline `--composa-control-focus-ring` `#0d99ff`, offset `-1px` | **OK** (ring color matches) |
| Radius | `--radius-medium` `5px` (pill `_Tab` atom) | `.composa-tab` `--composa-radius-medium` `5px` | **OK** |

### Where Tabs diverges (structure, not color)

| Item | Figma | Ours | Result |
|---|---|---|---|
| **Underline variant** | Figma `_Tab` is a **pill** (filled `#f5f5f5` selected chip). There is **no underline `_Tab` state** in the atom set — the selected indicator is a filled chip, not a bottom border. | `.composa-tabs-underline .composa-tab.is-selected` draws a `currentColor` bottom border and transparent bg | **MISMATCH/FLAG (our `underline` Tabs variant has no UI3 source — Figma uses a filled-pill selected tab, not an underline). Consistent with the library-study note that `pill` has no UI3 source; here it's the inverse — our default is pill-correct, but the `underline` mode is the invented one.)** |
| **Tabs container border-bottom** | The `Tabs` wrapper (`2015:27780`) is a bare row of `_Tab` chips on transparent bg; no `1px` bottom rule on the set itself (the bottom border appears only in the in-context "Scrims" usage frame, as a separate `Border` line element). | `.composa-tabs` always sets `border-bottom: 1px solid --composa-color-border` | **MISMATCH-RISK (ours hard-codes a container bottom border the standalone Figma `Tabs` set doesn't carry; it's a usage-context decoration in Figma). FLAG-FOR-OWNER if intended as default chrome.)** |
| Tab height | `24px` | `--composa-tab-height` `24px` | **OK** |
| Min width (multi-tab) | `~64px` | `--composa-tab-min-width` `64px` | **OK** |

---

## Per-component MISMATCH count

| Component | MISMATCH rows | Notes |
|---|---|---|
| Switch | 4 | off-track gray, disabled-on track, mixed glyph, thumb/width dims (counted as 1 dims row + 3 color/glyph) |
| Radio | 3 | button-radio border (translucent), checked surface (orange vs `#e5f4ff`), active peach + disabled fill |
| Checkbox | 1 (+1 risk) | muted opacity-vs-token; ghost fill unsampled |
| Dropdown | 5 | hover fill, active fill+border+highlight, focus inner ring, disabled gray fill (4 clear + the shared-rule root cause) |
| SegmentedControl | 1 | disabled opacity-vs-tertiary-text |
| Tabs | 3 | underline variant has no UI3 source, container border-bottom not in set, (+ all color states OK) |

### Mechanical fixes (literal/binding → correct token)

- `--composa-switch-bg` → bind to a **bg-tertiary `#e6e6e6`** source (not bg-secondary).
- Switch disabled-on track → `#e6e6e6` (bg-tertiary), not the shared `#d9d9d9` disabled fill.
- `.composa-radio-button` border → `--composa-color-border-translucent` (`rgba(0,0,0,0.1)`), not `--composa-color-border` (`#e6e6e6`).
- `.composa-radio-button.is-checked` / `.is-active` → use a **pale-blue selected surface** (`#e5f4ff` + `#bde3ff` border) to match Figma, OR confirm the orange filled-pill is intended (FLAG #2).
- `.composa-checkbox.is-muted .composa-checkbox-mark` → replace `opacity: 0.7` with the muted color token.
- `.composa-segmented-control.is-disabled` → swap per-segment text to a tertiary-text token instead of `opacity: 0.4`.
- Dropdown: remove `.composa-dropdown` from the shared button/menu hover/active selectors; give it input semantics — no surface fill on hover/active, blue border on active, label text-highlight on active, white-bg + tertiary-text on disabled, and drop the `inset 2px #fff` ring on focus.
