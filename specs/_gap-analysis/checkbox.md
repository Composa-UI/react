# Checkbox — Carbon gap analysis

<!-- maintainer: oracle = IBM Carbon checkbox docs (usage.mdx, style.mdx, accessibility.mdx,
     fetched 2026-06-20 from carbon-design-system/carbon-website@main). All three returned 200.
     Our doc under review: src/react/stories/checkbox.mdx. Carbon citations are verbatim from
     the fetched content; nothing about Carbon is inferred. Composa fills are inferred for a
     dense desktop design system (base-4 grid, 16px box, body.medium label) and tagged _(proposed)_. -->

## Coverage diff

| Category | Carbon covers | We cover | Gap? |
|---|---|---|---|
| Variants (on/off, mixed) | Yes — "unselected, selected, and indeterminate" | Yes — On / Off / Mixed | No |
| State: unchecked | Yes | Yes (Off) | No |
| State: checked | Yes | Yes (On) | No |
| State: indeterminate / mixed | Yes — "when the checkbox contains a sublist of selections, some of which are selected, and some unselected" | Yes (Mixed glyph) | Partial — we lack the *when-to-use* rule for Mixed |
| State: disabled | Yes — label `$text-disabled`, checkbox `$icon-disabled` | Yes (full token row + "disables its label") | No |
| State: read-only | Yes — "Label stays `$text-primary`; checkbox border `$icon-disabled` with `$icon-primary` inner fill" | No | **Yes** |
| State: error | Yes — border `$support-error`, message `$text-error` | No | **Yes** |
| State: warning | Yes — border `$icon-primary`, icon `$support-warning` | No | **Yes** |
| State: focus | Yes — "border `$focus`", 2px border 1px inset | Yes (2px inset ring) | No |
| Grouping & fieldset/legend | Yes — "Checkboxes are grouped using `<fieldset>` and `<legend>`"; group label `$text-secondary` | No — single-checkbox doc only | **Yes** |
| Group-level states | Yes — "Checkbox groups can receive: read-only, disabled, error, warning, + helper text" | No | **Yes** |
| Keyboard | Yes — "reached by `Tab` and selected with `Space` independently" | Yes (Tab / Space table) | No |
| Screen-reader: role + aria-checked mixed | Yes — partially-checked has `aria-checked` set to `"mixed"` | Yes (`checkbox` role, `aria-checked` true/false/mixed) | No |
| Screen-reader: group announcement | Yes — "screen readers to properly detect the set of checkboxes and announce the group label" | No | **Yes** |
| Content/label rules | Yes — clear/concise, "fewer than three words", "label is always needed in code", "Do not truncate … with an ellipsis" | Partial — "always set a meaningful one" only | **Yes** (length/truncation/casing missing) |
| Label casing | Yes — "sentence case, with only the first word … and any proper nouns capitalized" | No | **Yes** |
| Error & helper text | Yes — helper text `$text-secondary`, error message `$text-error` | No (only optional `description`) | **Yes** |
| Do / Don't | Yes — text-wrap top-aligned (do); don't vertically center wrapped text; don't truncate | No explicit do/don't | **Yes** |
| When-to-use vs radio | Yes — "If a user can select only one option … radio buttons should be used" | Yes (Radio instead) | No |
| When-to-use vs toggle/switch | Yes — toggle = "instantaneously applied"; checkbox = "larger flow … final confirmation step" | Yes (Switch instead) | No |
| Tab-order annotation (multi-column) | Yes — "annotate whether the tab order is by row or by column" | No | Minor gap |

## Proposed fills

Each item below is a *real* gap (Carbon covers, we don't). Tokens are Composa names.

1. **Read-only state** _(proposed — Usage › States table + Style › Color)_
   Carbon: "Read-only: Label stays `$text-primary`; checkbox border is `$icon-disabled` with `$icon-primary` inner fill." Distinct from disabled — value is shown but not editable, label keeps normal contrast. Proposed Composa row: box border `color.border.disabled`, glyph at full `icon.16.check` fill, label `color.text` (not `color.text.disabled`), no focus ring / not in tab order. Useful in the admin interface for non-editable settings.

2. **Error state + message** _(proposed — Usage › States + Style › Color/Typography + Accessibility)_
   Carbon: "Error: Label `$text-primary`; checkbox border `$support-error`; message text `$text-error`; icon `$support-error`." Proposed: box border `color.border.error` (or `color.border.danger` per token set), inline message below the control in `color.text.error`, label stays `color.text`; expose via `aria-invalid` / `aria-describedby` pointing at the message. Message typography `caption` (the dense small-text token) at the description indent (24).

3. **Warning state** _(proposed — Usage › States)_ — lower priority.
   Carbon: "Warning: border `$icon-primary`; message `$text-primary`; icon `$support-warning`." Recommend deferring unless the editor needs it — Composa currently has no warning semantic surface for controls. Flag as an Open decision rather than a full row.

4. **Checkbox group (fieldset / legend) + group-level states** _(proposed — likely a separate `CheckboxGroup` molecule; cross-link from Checkbox)_
   Carbon: "Checkboxes are grouped using `<fieldset>` and `<legend>`"; "Checkbox groups can receive: read-only, disabled, error, warning, + helper text." Group label color `$text-secondary` → Composa `color.text.secondary`, group-label-to-first-item gap `spacer-2` (8), inter-item gap `spacer-1` (4) — both already match our Structure table. Note that single-checkbox error/helper rules promote to the group when grouped.

5. **Group screen-reader semantics** _(proposed — Accessibility)_
   Carbon: group "announce the group label" via fieldset/legend. Add a note: a group of related checkboxes must be wrapped in `<fieldset>` with a `<legend>` as the group's accessible name; individual labels remain each checkbox's name.

6. **Helper text** _(proposed — Usage › Content + Style)_
   Carbon: "Helper text | text color | `$text-secondary`." We have an optional `description` (already `color.text.secondary`, `body.medium`) — clarify it is the helper-text slot, and that an error message *replaces/supplements* it in error state. Mostly a naming/cross-reference fix, not new structure.

7. **Label content rules** _(proposed — Usage › Content + a Do/Don't block)_
   Carbon: "clear and concise labels"; "fewer than three words"; "Do not truncate … with an ellipsis"; "a label is always needed in code." Proposed Composa wording: keep labels short and sentence case; never truncate a checkbox label with an ellipsis (wrap instead); a programmatic label is required even when visually hidden. (Carbon's "fewer than three words" is aggressive — soften to "short" for dense desktop where setting names run longer; cite Carbon as the source.)

8. **Label casing** _(proposed — Style › Typography note or Content)_
   Carbon: "sentence case, with only the first word in a phrase and any proper nouns capitalized." Add a one-line casing rule for labels and group labels.

9. **Wrapped-label alignment Do/Don't** _(proposed — Usage › Do/Don't)_
   Carbon: ✓ "let text wrap beneath the checkbox so the control and label are top aligned"; ✗ "Do not vertically center wrapped text with the checkbox." Maps cleanly to our box→label layout — propose box and label top-aligned, multi-line labels wrap under the first line, not center-aligned to the 16px box.

10. **Multi-column tab-order annotation** _(proposed — Accessibility, minor)_
    Carbon: "annotate whether the tab order is by row or by column." Add a brief note for grids/tables of checkboxes (relevant to the admin row-selection use case already named in our intro).

## Not applicable

- **`$label-01` / `$body-compact-01` / `$spacing-0x` literal tokens** — Carbon's token *names*. We map to Composa names (`body.medium`, `spacer-1`/`spacer-2`, `color.text.*`); do not import Carbon token identifiers.
- **Carbon's exact type sizes** (group label 12px, label 14px, helper 12px) — Composa standardizes label + description on `body.medium`; only the *small message* may need a `caption`-scale token (noted in fill 2). Don't copy Carbon's px ramp.
- **Warning state** — see fill 3; Carbon has it but Composa has no warning control semantic yet. Treat as Not-applicable-for-now / Open decision rather than a built row.
- **`$black` inner fill for warning indeterminate** — Carbon raw-color hack; would violate our token-name-only rule even if warning were adopted.
- **Carbon's transparent-background unchecked box** — Carbon draws unchecked as transparent with `$icon-primary` border; Composa's Off box intentionally uses `color.bg.secondary` (filled) per the Figma capture. Keep our treatment; not a gap.
