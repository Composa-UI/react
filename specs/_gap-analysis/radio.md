# Radio — Carbon gap analysis

Oracle: IBM Carbon `radio-button` usage.mdx, style.mdx, accessibility.mdx (all 3 fetched OK,
raw.githubusercontent.com, main). Our doc: `src/react/stories/radio.mdx`.
Composa context: dense desktop app, base-4 grid, 24px dense controls. Maintainer report — no edits made.

## Coverage diff

| Category | Carbon covers | We cover | Gap? |
|---|---|---|---|
| Orientation (vertical vs horizontal) | Yes — vertical preferred for readability; horizontal acceptable per UI/use case | No — anatomy/structure imply stacked only ("Row pitch (stacked)") | **Yes** |
| State: selected / unselected | Yes | Yes (dot vs ring) | No |
| State: disabled | Yes — `$text-disabled` label, `$icon-disabled` border/fill | No | **Yes** |
| State: read-only | Yes — distinct: `$text-primary` label, `$icon-disabled` border, `$icon-primary` fill | No | **Yes** |
| State: error | Yes — `$support-error` border, `$text-error` message | No | **Yes** |
| State: warning | Yes — `$support-warning` icon, `$black` inner fill | No | **Yes** |
| State: focus | Yes — `$focus` border | Yes (focus-ring swap, `color.border.fs-selected-strong`) | No |
| Radio-group semantics: fieldset/legend | Yes — `fieldset` + `legend` to group/label; `label`+`for` per button | Partial — names `radiogroup` role; no fieldset/legend/group-label authoring guidance | **Yes** |
| Group label (visible) | Yes — group label token, sentence case, 8px margin-bottom | No — only per-radio label | **Yes** |
| Helper text | Yes — `$text-secondary`, `$helper-text-01` | No | **Yes** |
| Keyboard: arrow roving focus within group | Yes — group = single tab stop; arrows move; `Tab` exits group | Partial — table lists arrows + Tab, but states arrows "move selection" (correct) without the single-tab-stop / roving-focus framing | **Yes (framing)** |
| Keyboard: Tab exits group | Yes — explicit "`Tab` again moves focus out to next component" | No — only "Tab moves focus into the group" | **Yes** |
| Keyboard: default focus target | Yes — when no selection, focus defaults to first item | No | **Yes** |
| Screen reader | Yes — exposes group label, button labels, and item count | Partial — role/aria-checked/radiogroup only; no group-label or item-count exposure | **Yes** |
| Default-selection guidance | Yes — "by default, no option preselected"; offer "none"/"other" for deselection | No | **Yes** |
| Content / label rules | Yes — clear/concise, <3 words, no ellipsis truncation (wrap instead), sentence case | Partial — "short and specific"; missing no-truncate/wrap + sentence-case + length | **Yes** |
| Do / Don't | Yes (implicit across content rules) | Yes (group exclusivity; don't use for multi-select) | No |
| When to use vs checkbox | Yes — multi-select → checkbox | Yes | No |
| When to use vs toggle/switch | Yes — binary on/off → toggle | No | **Yes** |
| When to use vs selectable tile | Yes — choices needing pricing/context → tile | No | **Yes** |
| When to use vs structured list / dropdown | Yes — single-select from multi-column data → structured list | No | **Yes** |
| Required-group marking | Yes — mark via label or `aria-required` | No | **Yes** |
| Mouse: label is click target | Yes — input + label both clickable | No (implied, not stated) | minor |

## Proposed fills

Each is inferred for Composa (dense desktop, base-4, 24px control). Token names are proposed unless
they already appear in our doc. Carbon citation = the fetched source asserting the category.

1. **Orientation** _(proposed)_ — Usage › Variants/Behavior. Add: "Stack radios vertically by default;
   one choice per row aids scanning. Horizontal rows are acceptable for short, 2–3 option sets that fit
   one line." Dense desktop: horizontal row gap `spacer-2` (8), vertical row pitch already `48` (consider
   a dense `spacer-3`/`spacer-4` pitch given 24px controls). _Carbon usage.mdx: "Vertical stacking
   preferred for readability. Horizontal layouts acceptable based on UI structure and use case."_

2. **Disabled state** _(proposed)_ — Style › Color + Usage › Behavior. Label `color.text.disabled`,
   ring/dot `color.icon.disabled` _(proposed)_; non-interactive, skipped in tab order.
   _Carbon style.mdx: "Disabled: `$text-disabled` label, `$icon-disabled` border/fill."_

3. **Read-only state** _(proposed)_ — Style › Color + Usage › Behavior. Distinct from disabled: label stays
   `color.text` (full contrast), ring `color.icon.disabled`, but the on-dot keeps `color.icon` fill so the
   selection remains legible. _Carbon style.mdx: "Read-only: `$text-primary` label, `$icon-disabled`
   border, `$icon-primary` fill."_

4. **Error state** _(proposed)_ — Style › Color + Usage › Behavior. Group-level: ring
   `color.border.error` _(proposed)_, message text `color.text.error` _(proposed)_ below the group.
   _Carbon style.mdx: "Error: `$support-error` border, `$text-error` message."_

5. **Warning state** _(proposed)_ — Style › Color. Icon `color.support.warning` _(proposed)_, inner fill a
   fixed dark for contrast on the warning swatch. Lower priority for a dense editor; include if we ship a
   form-validation tier. _Carbon style.mdx: "Warning: `$support-warning` icon, `$black` inner fill."_

6. **Fieldset/legend group semantics** _(proposed)_ — Accessibility › Screen reader & labeling. Add: "Wrap
   a group in `fieldset` with a `legend` as the group name; connect each control to its `label` via `for`.
   The `legend` is the group's accessible name in addition to per-radio labels." _Carbon a11y.mdx: "Carbon
   uses `fieldset` and `legend` to group and label sets of radio buttons" and "`label` and `for` to
   programmatically connect radio buttons with their labels."_

7. **Visible group label + helper text** _(proposed)_ — Style + Usage › Content. Group label
   `body.small`/`label` token, color `color.text.secondary` _(proposed)_, margin-bottom `spacer-2` (8);
   helper text `color.text.secondary`. _Carbon style.mdx: group label `$text-secondary`, `$label-01`,
   8px margin-bottom; helper `$text-secondary`/`$helper-text-01`._

8. **Roving focus / single tab stop framing** _(proposed)_ — Accessibility › Keyboard. Reframe table:
   "The group is a single Tab stop. Tab moves focus into the group (onto the selected radio, or the first
   radio if none selected); arrow keys move selection between radios; Tab again moves focus out to the
   next component." _Carbon a11y.mdx: "Radio button groups function as a single tab stop … Pressing `Tab`
   again will move focus out … When no selection exists, focus defaults to the first item."_

9. **Default-selection guidance** _(proposed)_ — Usage › Behavior or Do/Don't. Add: "By default no option
   is preselected. If users must be able to clear a choice, add an explicit 'None' or 'Other' option
   rather than relying on deselection — radios cannot be unselected by re-click." _Carbon usage.mdx: "By
   default, no option will be preselected … provide alternatives like 'other' or 'none'."_

10. **Content/label rules** _(proposed)_ — Usage › Content. Add: keep labels short (Carbon: fewer than
    three words), sentence case (first word + proper nouns), and **do not truncate with an ellipsis — let
    labels wrap**. _Carbon usage.mdx + style.mdx: "fewer than three words", "Do not truncate … with an
    ellipsis—allow wrapping instead", "sentence case … first word … proper nouns capitalized."_

11. **When-to-use vs toggle / tile / structured-list** _(proposed)_ — Usage › When to use. Extend the
    checkbox contrast with: binary on/off → Switch; options needing extra context (price, links) →
    selectable Tile; single pick from multi-column rows → structured list / Dropdown. _Carbon usage.mdx:
    toggle = binary; tile = choices needing context; structured list = single-item from multi-column data._

12. **Required-group marking** _(proposed)_ — Accessibility. Add: "Mark a required group programmatically —
    on the `legend`/label or via `aria-required` on the group." _Carbon a11y.mdx: "Required groups must be
    marked programmatically either via the label or with `aria-required`."_

13. **Mouse target** _(proposed, minor)_ — Usage › Behavior. State that both the control and its label are
    click targets (full row hit area). _Carbon usage.mdx: "Both input and label are clickable targets."_

## Not applicable

- **AI variant / explainability popover** — Carbon-for-AI feature (usage.mdx + style.mdx "AI label"); not
  part of Composa's system. Skip.
- **Skeleton/loading state** — not asserted in the fetched Carbon radio docs; do not invent. (Note only.)
- **Exact Carbon pixel sizes** — Carbon ships a 20×20 icon / 8×8 dot; our control is 16×16 / 8×8 on the
  base-4 dense grid. Size delta is intentional (dense 24px controls), not a gap — keep our values.
- **Carbon `$`-prefixed token names** — translate to our `color.*` / `spacer-*` namespace (done above as
  proposed names); do not adopt Carbon token literals.
