<!-- maintainer: Carbon-as-oracle gap analysis for Button.
     Our doc: src/react/stories/buttons.mdx
     Carbon sources fetched 2026-06-20 (all 3 returned, none 404):
       - components/button/usage.mdx
       - components/button/style.mdx
       - components/button/accessibility.mdx
     Method: use Carbon to surface CATEGORIES of guidance we lack, then infer
     Composa-appropriate fills (dense desktop, base-4 grid, 24px dense controls,
     token NAMES not hex). Cite only Carbon content actually returned. -->

# Button — Carbon gap analysis

## Coverage diff

| Category | Carbon covers | We cover | Gap? |
|---|---|---|---|
| Variants / hierarchy | primary, secondary, tertiary, ghost, danger; "establish a visual hierarchy"; ">3 CTAs → use tertiary/ghost" | primary, secondary, destructive, link, ghost + icon/toggle/split/inverse/large/wide | No (richer than Carbon; only the ">3 actions" rule is missing) |
| Sizing & density | 7 sizes w/ explicit when-to-use ("XS when vertical space is limited"; "large is most common in software"); "don't mix sizes in a group" | 24px default, 32px large, wide-sidebar; when-to-use for large/wide | **Partial** — no "don't mix sizes in a group" rule; no explicit pairing-to-input-height guidance |
| States | hover/focus/active/disabled per Style tab; **inline loading** ("button disabled while loading"); danger states | rest/active/focus/disabled per-variant table | **Yes** — no **loading/in-progress** state at all |
| Keyboard | Tab; Space/Enter; **"on a form, Enter activates the primary button"**; link-as-button must wire Space | Tab; Space/Enter | **Partial** — missing the form-default-submit behavior |
| Screen-reader semantics | toggle = `aria-pressed` true/false OR name change; icon-only label on hover/focus | `aria-pressed`, icon-only label, split = 2 controls, disabled = unavailable, ghost = button semantics | No (ours is broader) |
| Content / label rules | {verb}+{noun} formula; sentence case; left-aligned label; **"do not truncate — wrap to 2nd line"**; icon-only sparingly + tooltip required; **danger cannot be icon-only**; icon on the right | action-first verb; dialog terms; inverse on/off labels; icon-only needs tooltip | **Yes** — no truncation/overflow rule; no label-casing rule; no "danger never icon-only" rule |
| Placement / ordering of paired buttons | extensive: full-page primary-left; dialog/wizard primary-bottom-right; same-width in a group; **vertical stack = primary on top**; primary on outside of set | **none** — we never state pair order | **Yes — biggest gap** |
| Do / Don't | large illustrated do/don't set (emphasis, alignment, icons-in-groups, danger emphasis) | 3 don'ts (no Switch, one primary/view, no gratuitous danger) | **Partial** — thinner, esp. around groups/alignment |
| When-to-use vs alternatives | buttons-not-links for navigation; button groups (2–3) vs **menu button (>3)**; ghost for data tables; tertiary for empty states | per-variant when-to-use; "use Switch not button for immediate settings" | **Partial** — missing the "links for navigation" boundary and the ">3 → menu button" threshold |

## Proposed fills

Each maps to a real gap above; cites the Carbon line that prompted it. Tokens named, dense-desktop-appropriate.

1. **Loading / in-progress state** _(proposed — Usage › States + Style › Color)_
   Prompted by Carbon: *"Buttons can have inline loading that provides visual feedback that the action is in process. The button would be disabled when inline loading is in progress."*
   Add a row to the States table: while an action is pending, the button enters a **loading** state — it is non-interactive (treated like `disabled` for hit-testing and announced as busy), the label is replaced or accompanied by a Spinner glyph sized to the 24px control, and styling holds the rest fill rather than dimming to `color.bg.disabled` (so the action still reads as the one in progress). For a dense 24px control, the spinner sits in the leading-icon slot (24×24) so width doesn't jump. Accessibility note: expose `aria-busy="true"` and keep the accessible name stable.

2. **Paired-button ordering** _(proposed — Usage, new "Placement & order" subsection)_
   Prompted by Carbon: *"the primary action traditionally sits at the bottom right"* (dialogs/wizards), *"the primary button is on the left side of the page"* (full-page), and *"the primary button is always on top"* (vertical stack). Carbon's full-page-left convention is web/IBM-product layout — for a **dense desktop app**, state our own rule: in dialogs/footers, place the **primary on the right, secondary to its left**, separated by `spacer-2`; when stacked vertically (narrow sidebar), **primary on top**. This is the single highest-value addition — our doc currently gives no ordering guidance at all.

3. **Don't-mix-sizes-in-a-group** _(proposed — Usage › Do/Don't)_
   Prompted by Carbon: *"We do not recommend mixing different button sizes in button-groups."* Add: within one button group, keep all buttons the same size (all 24px default, or all 32px large) — don't pair a large primary with a default secondary.

4. **Truncation / overflow rule** _(proposed — Usage › Content/label rules)_
   Prompted by Carbon: *"We do not recommend truncating a button label."* For our dense controls, state: keep labels short enough to fit; do not truncate with an ellipsis. (Carbon wraps to a second line — see Not applicable; a fixed-24px control should instead constrain label length, and a wide-sidebar button can host the longer label.)

5. **Label casing** _(proposed — Usage › Content/label rules or Style)_
   Prompted by Carbon: *"By default Carbon uses sentence case for all button labels."* We have a verb-first rule but no casing rule — adopt **sentence case** ("Add layer", not "Add Layer") to match our existing examples and lock it explicitly.

6. **Danger is never icon-only** _(proposed — Usage › Content/label rules, near Icon button)_
   Prompted by Carbon: *"Danger buttons cannot be used in an icon only form … should be applied to a button that holds higher emphasis along with a visual label."* Add: destructive actions always carry a visible label; never express a destructive action as a bare icon button (a tooltip is not sufficient signal for an irreversible action).

7. **Form default-submit behavior** _(proposed — Accessibility › Keyboard)_
   Prompted by Carbon: *"On a form, if focus is on a component that is not actionable with the `Enter` key, pressing `Enter` will activate the primary button."* Add a keyboard-table row / note: inside a form, `Enter` from a non-actionable field activates the primary (default) button — this ties to our existing `⏎` enter-glyph affordance on primary/link buttons.

8. **>3 actions → use a Menu, and links for navigation** _(proposed — Usage › When not to use / alternatives)_
   Prompted by Carbon: *"Any more than three actions should be grouped meaningfully using menu buttons"* and *"Do not use buttons as navigational elements. Instead, use links when the desired action is to take the user to a new page."* Add two boundaries: when a group would exceed ~3 actions, collapse alternates into a Menu/Split button; and use a Link (or Link button) for pure navigation, not a filled button.

## Not applicable

Carbon guidance we should NOT copy, to avoid cargo-culting:

- **The 7-size scale + px heights** (XS 24 / S 32 / M 40 / L 48 / XL 64 / 2XL 80). Composa is base-4 dense desktop: 24px default + 32px large is the whole ladder. Do not import the 40/48/64/80 sizes or the "bleed to full-screen" XL/2XL rationale.
- **Pair-buttons-to-input-height** ("small for 32px inputs, medium for 40px inputs"). Our inputs follow our own dense scale; this mapping is Carbon's field-size system.
- **Productive vs Expressive type sets** (`$body-compact-01` 14px vs `$body-compact-02` 16px, 16×16 vs 20×20 icons). We use one label token (`body.medium`) and a 24px icon; no expressive tier.
- **Fluid / full-bleed button widths & "same-width in a group"** ("do not use a tertiary button in a fluid application"; "all buttons the same width"; bleeding ghost hovers). Carbon's fluid layout model is for responsive web pages; our buttons are content-width (our one width concession is the explicit Wide-sidebar layout).
- **Icon-always-on-the-right** + RTL mirroring as the default. Our anatomy specifies a **leading** icon; keep our convention rather than flipping to Carbon's trailing-icon rule. (RTL mirroring is a valid future a11y item but isn't Carbon-specific guidance to copy verbatim.)
- **Full-page-left primary placement** as the primary convention. That's IBM web page-layout; for a desktop app the dialog/footer-right convention (fill #2) is the more relevant default.
- **Carbon's specific padding values** (16px left / 64px right, 32px label-icon gap). These are Carbon's large-button metrics; our Structure table already defines dense `spacer-1`/`spacer-2` padding.
