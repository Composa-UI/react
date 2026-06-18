# Visual / Layout Fidelity Audit — Buttons + Control Bars

Scope: VISUAL/LAYOUT defects only (centering, alignment, padding/spacing geometry, missing elements, perceptual color). Companion to the value-diff (hex/px token) audit, catching what value comparison cannot. READ-ONLY — no source files were edited. Captures taken from Storybook at 127.0.0.1:6011 in an isolated Chrome tab; geometry verified via `getBoundingClientRect` + `getComputedStyle`.

Light mode is the baseline.

---

## DEFECTS (real, visible)

### 1. SegmentedControl — selected segment reads BLUE, not white
- **Component | State:** SegmentedControl | selected segment (any variant; observed on the icon Playground)
- **Issue:** The selected segment is supposed to be a WHITE raised pill on the gray track. It renders as a pale-BLUE tinted pill. Measured: selected segment `background-color` computes to `rgb(229,244,255)` = `#e5f4ff` (the selected-blue tint), NOT `#fff`. The glyph itself is correctly dark (`rgba(0,0,0,0.9)`); the blue is purely the segment fill. Perceptually the whole selected pill (and the thin cursor outline over it) reads blue/tinted against the gray track.
- **Severity:** HIGH (this is the headline flagged issue; the selected pill is the control's primary affordance and the color is wrong).
- **Suspected source:** Specificity collision. `styles/88-segmented.css` `.composa-segmented-control .is-selected { background: var(--composa-color-bg) }` (white) has specificity (0,2,0). The segment element also carries `.composa-icon-button.is-selected`, and `styles/30-button-family.css` rule `.composa-icon-button.is-selected:not(.composa-toggle-button) { background: var(--composa-color-bg-selected) }` (= `#e5f4ff`) has specificity (0,3,0) — actually (0,2,1) with the `:not()` pseudo counting as a class — which OUTRANKS the segmented rule. So the toolbar "selected" blue wins over the segmented white pill.
- **Suggested fix:** Raise the segmented rule's specificity so it wins, e.g. in `styles/88-segmented.css` change `.composa-segmented-control .is-selected` → `.composa-segmented-control .composa-icon-button.is-selected` (and keep `background: var(--composa-color-bg)`; also pin `border-color: var(--composa-color-border)` which is already correct at `#e6e6e6`). Alternatively exclude segmented descendants from the button-family selected rule in `30-button-family.css` (`.composa-icon-button.is-selected:not(.composa-toggle-button):not(.composa-segmented-control *)`). First option is cleaner.

### 2. Tabs (underline variant) — selected underline FLOATS ~4px above the baseline rule
- **Component | State:** Tabs | `underline` variant, selected tab, when the container baseline rule is present
- **Issue:** When the tab strip has its bottom baseline rule, the selected tab's underline should sit ON that line. It does not — it floats ~4px above it, producing a visible doubled-line / floating-underline look. Measured (underline variant, default Playground tabs): container bottom border at y≈401; selected tab bottom (where `::after` underline lives, `bottom:0`) at y≈397 → a 4px gap. Verified visually: the dark "Design" underline sits clearly above the lighter full-width gray rule beneath both tabs.
- **Severity:** HIGH (alignment defect, directly the flagged Tabs concern; the underline indicator misses its own baseline).
- **Suspected source:** `styles/96-tabs.css`. `.composa-tabs` is `display:flex; align-items:center; height:40px; box-sizing:border-box; padding:var(--composa-space-2)` (8px) with `border-bottom:1px`. `.composa-tabs-underline` only zeroes `padding-bottom`. With `align-items:center`, the 24px tab is vertically centered in the ~31px content band, leaving ~4px below it; the `::after` underline (`.composa-tabs-underline .composa-tab.is-selected::after { bottom:0 }`, lines 60-67) therefore lands 4px above the container's bottom border.
- **Suggested fix:** In `styles/96-tabs.css`, scope to the underline variant so tabs stretch to the content bottom: add `.composa-tabs-underline { align-items: stretch }` (it already has `padding-bottom:0`), OR set `.composa-tabs-underline .composa-tab { align-self: stretch }`. Either makes the selected tab's bottom edge — and its `::after` underline — coincide with the container's bottom border. (Do not just push the `::after` down with a negative `bottom`; stretching the tab is robust to height changes.)

### 3. SplitButton — internal divider is OPAQUE while the outer border is translucent
- **Component | State:** SplitButton | default (any), the divider between the action half and the chevron/menu half
- **Issue:** The outer container border renders translucent (`rgba(0,0,0,0.1)`, correct), but the divider (`border-left` on `.composa-split-menu`) renders OPAQUE `rgb(230,230,230)` = `#e6e6e6`. Outer edge and inner divider are therefore different colors. On the light button surface the difference is subtle but present and inconsistent with the documented intent (both should be the translucent border token). Confirmed: a probe child with the same declaration in the same subtree resolves to `rgba(0,0,0,0.1)`, but the live `.composa-split-menu` element computes `rgb(230,230,230)` on all four border sides — i.e. an opaque `border-color` is winning the cascade on this element specifically, overriding both the `.composa-icon-button-secondary` `border` shorthand and the `.composa-split-menu` `border-left`, both of which reference `--composa-color-border-translucent` (which itself correctly resolves to `rgba(0,0,0,0.1)`).
- **Severity:** LOW-MED (real divergence from intent and from the outer border, but low perceptual contrast on the default light surface).
- **Suspected source:** `styles/30-button-family.css`. The menu carries `.composa-icon-button-secondary` (`border:1px solid var(--composa-color-border-translucent)`) and `.composa-split-menu` (`border-left:1px solid var(--composa-color-border-translucent)`). Despite both, the computed color is opaque `#e6e6e6` = the value of `--composa-color-border`. The most likely culprit is an opaque `border-color` declaration elsewhere in the cascade winning on this element (a `border-color: var(--composa-color-border)` rule applying to `.composa-icon-button`/`.composa-split-menu` via a layer or grouped selector the per-side longhands don't override). The seam HEIGHT is fine (both halves 22px, perfectly aligned — see CORRECT items).
- **Suggested fix:** Force the divider color explicitly: in `styles/30-button-family.css` `.composa-split-menu` add `border-left-color: var(--composa-color-border-translucent)` (the longhand `-color` beats a shorthand `border-color` only at equal specificity, so if an opaque `border-color` is winning, also bump specificity, e.g. `.composa-split-control .composa-split-menu`). A fix agent should grep `border-color` for any rule matching `.composa-icon-button` / `.composa-split-menu` to confirm the overriding declaration before patching.

### 4. (Minor) Disabled toggle stays selected-blue instead of going gray
- **Component | State:** ToggleButton (and DialogToggle) | ON + disabled
- **Issue:** A disabled ON toggle keeps `background:#e5f4ff` (selected blue). The fidelity spec says On+Disabled should be the gray disabled fill `#d9d9d9`. The glyph correctly dims to `rgba(0,0,0,0.3)`, but the surface stays blue. Measured on the Toggle story (which renders `disabled:true, aria-pressed:true`): bg = `rgb(229,244,255)`.
- **Severity:** LOW (edge state; also partly a value concern, but the gray-vs-blue surface is perceptually visible).
- **Suspected source:** `styles/30-button-family.css`. The disabled rule (`.composa-icon-button:disabled { background: var(--composa-color-bg-disabled) }`, ~line 67) is outranked by the ON rule `.composa-toggle-button[data-variant="default"][aria-pressed="true"] { background: var(--composa-color-bg-selected) }` (higher specificity via the attribute selectors), so disabled cannot override the selected fill.
- **Suggested fix:** Add a disabled-wins rule, e.g. `.composa-toggle-button:disabled[aria-pressed="true"] { background: var(--composa-color-bg-disabled) }` (or append `:disabled` higher-specificity variants), in `styles/30-button-family.css`.

---

## VERIFIED CORRECT (no defect)

- **Button (text, primary):** Label "Button" optically centered horizontally and vertically; orange fill, white label. Leading-glyph / baseline fine (no icon in this story). OK.
- **IconButton (secondary):** 24x24 box, translucent border visible and correct, cursor glyph centered within the box (the pointer-shape's visual offset is inherent to the glyph, not a centering bug). OK.
- **SplitButton seam/height:** Both halves measure 22px tall and share the same top/bottom (y=371→393); container radius 5px applied uniformly; no height mismatch, no radius mismatch, no border double-stroke on the action half. Seam alignment is CORRECT. (Only the divider COLOR is off — defect #3.)
- **SplitButton geometry:** action half flexes, chevron half fixed 24px, vertically centered "+ Insert" and chevron. OK.
- **Dropdown:** 24px tall, label left-aligned + vertically centered, chevron right-aligned + vertically centered, white bg. Default Playground shows the `is-focused` state = even blue outline ring on all sides with NO inner white ring (matches the corrected dropdown-as-input intent). OK.
- **Tabs (pill variant, the default):** Selected "Design" is a filled gray chip, vertically centered, container baseline rule present. Pill selected indicator is correct. (The underline VARIANT is the one with the defect — #2.)
- **DialogToggle:** 24x24, selected-blue bg (ON), cursor glyph centered, corner dot 4x4 round at right:4px/bottom:4px, `rgba(0,0,0,0.5)`. Matches spec. OK.
- **SegmentedControl track + unselected segments:** Track `#f5f5f5`, 5px radius; unselected labels/glyphs gray and correctly positioned; item height geometry correct. (Only the selected-segment fill is wrong — #1.)

---

## Summary table

| # | Component | State/variant | Issue | Severity | Source | Fix |
|---|---|---|---|---|---|---|
| 1 | SegmentedControl | selected segment | Fill is `#e5f4ff` blue, should be `#fff` white | HIGH | `30-button-family.css` `.composa-icon-button.is-selected:not(.composa-toggle-button)` outranks `88-segmented.css` `.composa-segmented-control .is-selected` | Raise segmented rule specificity (`.composa-segmented-control .composa-icon-button.is-selected { background: var(--composa-color-bg) }`) |
| 2 | Tabs | underline variant, selected | Underline floats ~4px above the container baseline rule (doubled line) | HIGH | `96-tabs.css` `.composa-tabs` `align-items:center` + 8px top padding; underline `::after` at tab `bottom:0` | `.composa-tabs-underline { align-items: stretch }` (or `align-self:stretch` on the tab) |
| 3 | SplitButton | default, divider | Inner divider opaque `#e6e6e6` vs translucent outer border `rgba(0,0,0,0.1)` | LOW-MED | `30-button-family.css` `.composa-split-menu`; an opaque `border-color` wins the cascade | Force `border-left-color: var(--composa-color-border-translucent)` with bumped specificity |
| 4 | ToggleButton / DialogToggle | ON + disabled | Disabled surface stays `#e5f4ff` blue, should be `#d9d9d9` gray | LOW | `30-button-family.css` ON `[aria-pressed=true]` rule outranks `:disabled` | Add `.composa-toggle-button:disabled[aria-pressed="true"] { background: var(--composa-color-bg-disabled) }` |
