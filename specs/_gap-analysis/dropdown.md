# Dropdown — Carbon gap analysis

<!-- maintainer: oracle = IBM Carbon dropdown usage.mdx / style.mdx / accessibility.mdx
     (all three fetched OK, no 404s, main branch, 2026-06-20).
     Our doc = src/react/stories/dropdown.mdx. Composa context: dense desktop-app,
     base-4 grid, 24px dense controls, single-select input-styled control.
     Carbon is the oracle for *what categories of guidance exist*; values are inferred
     for Composa, never copied. -->

Composa's Dropdown is deliberately a **single-select, input-styled** control (24px dense
row). Carbon's dropdown family is much broader (multiselect, combobox, filterable, fluid,
inline, AI). Several Carbon categories are out of scope by design and are listed under
**Not applicable** rather than as gaps. Real gaps are the *single-select* categories Carbon
documents and we omit: helper/placeholder text rules, error/warning/read-only states,
arrow-key + typeahead keyboard, listbox/option roles + `aria-expanded`, overflow/ellipsis
do-don't, and open-direction (flip) behavior.

## Coverage diff

| Category | Carbon covers | We cover | Gap? |
|---|---|---|---|
| Variant — default (single-select) | Yes | Yes (icon-leading / icon-less) | No |
| Variant — inline | Yes (label inline left) | No | Out of scope (see N/A) |
| Variant — multiselect | Yes (tags, count, select-all) | No | Out of scope (see N/A) |
| Variant — combobox (type custom value) | Yes | No | Out of scope (see N/A) |
| Variant — filterable / typeahead | Yes (filterable multiselect) | No | Out of scope (see N/A) |
| State — enabled/default | Yes | Yes | No |
| State — hover | Yes (`$field-hover`) | Yes (no fill, border only) | Partial — divergence is intentional, see fill |
| State — focus | Yes (`$focus`) | Yes (`color.border.selected`) | No |
| State — disabled | Yes (`$text-disabled`) | Yes (`color.text.tertiary`) | No |
| State — read-only | Yes | No | **Yes** |
| State — error / invalid | Yes (`$support-error` border+icon) | No | **Yes** |
| State — warning | Yes | No | **Yes** |
| State — skeleton | Yes | No | Minor (loading pattern, see N/A) |
| Open/close behavior | Yes (click field/chevron, outside, Esc, Tab) | Partial (Space/Enter open, Esc close) | **Yes** — outside-click + Tab-away dismissal not stated |
| Open direction / flip | Yes (menu expands upward near edge) | No | **Yes** |
| Selection behavior | Yes (click closes, replaces placeholder) | Implicit only | **Yes** — not explicitly stated |
| Menu / option height relationship | Yes (option height = field height) | No | **Yes** |
| Scroll affordance | Yes (show 50% of last option; scroll at 6th) | No | Minor — see fill |
| Keyboard — open/close | Yes | Yes (Space/Enter/Esc) | No |
| Keyboard — arrow navigation | Yes (Up/Down through options) | No | **Yes** |
| Keyboard — typeahead | Yes (combobox) | No | Out of scope (no combobox) |
| Keyboard — Home/End | Not documented by Carbon | No | No |
| Screen reader — listbox/option roles | Yes (`aria-haspopup="listbox"`, button) | No | **Yes** |
| Screen reader — `aria-expanded` | Yes (all variants) | No | **Yes** |
| Screen reader — `aria-activedescendant` | Not explicit in Carbon a11y | No | No |
| Label rules | Yes (short, single line, don't drop) | Partial (set a meaningful label) | **Yes** — concision/required rules thin |
| Helper text rules | Yes (beneath label, persists on focus) | No | **Yes** |
| Placeholder rules | Yes ("Choose an option", no critical info) | No | **Yes** |
| Option text rules | Yes (brief, alpha order, no icons) | No | Minor — see fill |
| When-to-use vs select | Yes | No | **Yes** |
| When-to-use vs radio | Yes (≤2 options → radio) | No | **Yes** |
| When-to-use vs combobox | Yes | No | Partial — N/A since no combobox |
| When-to-use vs menu | Implicit (Carbon: menu is actions) | Yes (Menu for grouping/search/actions) | No |
| Do / don't | Yes (alignment, overflow, dividers) | No | **Yes** |
| Typography case rule | Yes (sentence case) | No | Minor — see fill |

## Proposed fills

Each fill is **inferred** for Composa (dense 24px control, base-4 grid). Token names use our
namespace; values are not copied from Carbon. Mark every addition `_(proposed)_` in the doc.

1. **Read-only state** → Usage › States table. _(proposed)_ Add a `Read-only` row: border
   `color.border`, value `color.text` (not dimmed like disabled), surface `color.bg`; not
   focusable, no chevron interactivity. Distinguishes "value shown, not editable" from
   "disabled". Carbon: *"states for fields and menus: enabled, hover, focus, error, warning,
   disabled, skeleton, and read-only"* (usage.mdx).

2. **Error / invalid state** → Usage › States + Style › Color. _(proposed)_ Border
   `color.border.error` (or `color.support.error`), optional trailing error glyph; pair with
   helper/error text below. Carbon: *"Invalid: `$support-error` for borders and icons"*
   (style.mdx).

3. **Warning state** → Usage › States. _(proposed)_ Border/icon `color.border.warning`
   (or `color.support.warning`) with helper text. Carbon lists warning alongside error
   (usage.mdx, style.mdx).

4. **Outside-click & Tab-away dismissal** → Usage › Behaviors. _(proposed)_ State that the
   menu closes on outside click and on Tab-away (in addition to Esc), and that the value is
   unchanged on Esc. Carbon: *"Click chevron, click outside menu, press Esc, or Tab away"*
   (usage.mdx).

5. **Open-direction / flip** → Usage › Behaviors. _(proposed)_ Menu opens downward by
   default and flips upward when near the viewport/panel bottom edge to avoid cropping —
   important in dense inspector panels. Carbon: *"Menu can expand upward if positioned near
   bottom/edge to avoid cropping"* (usage.mdx).

6. **Explicit selection behavior** → Usage › Behaviors. _(proposed)_ Clicking an option
   commits the value, closes the menu, and the chosen text replaces the placeholder/prior
   value. Carbon: *"clicking option closes menu; selected text replaces placeholder"*
   (usage.mdx).

7. **Menu option height = field height** → Style › Structure. _(proposed)_ Each open-menu
   option row is `24` (matches our dense field height), keeping field and menu rhythm on the
   base-4 grid. Carbon: *"Each option in menu should match field height"* (usage.mdx).

8. **Scroll affordance** → Usage › Behaviors (minor). _(proposed)_ When options overflow,
   reveal a partial last row so more content is discoverable; cap visible options before
   scroll. Carbon: *"Show 50% of last option's container height… start scroll at sixth
   option"* (usage.mdx) — Composa likely caps lower given 24px rows; author a Composa count.

9. **Arrow-key navigation** → Accessibility › Keyboard table. _(proposed)_ Add rows:
   `Down`/`Up` move through options (and `Down` opens + focuses first/selected option),
   `Home`/`End` jump to first/last _(proposed, beyond Carbon)_. Carbon: *"navigation of the
   options by Up and Down arrow keys"*; *"Down arrow… focus moves to the first or currently
   selected option"* (accessibility.mdx).

10. **Listbox/option roles + `aria-expanded`** → Accessibility › Screen reader. _(proposed)_
    Document that the trigger is a `button` with `aria-haspopup="listbox"` and `aria-expanded`
    reflecting open state; the menu is a `listbox` of `option`s; the selected option is
    conveyed to AT. Carbon: *"`button` with `aria-haspopup=\"listbox\"`… all variants employ
    `aria-expanded`"* (accessibility.mdx).

11. **Label concision + required** → Usage › Content (label rules). _(proposed)_ Keep label
    short, single line; do not drop the label in favor of placeholder. Carbon: *"Keep short
    and concise; limit to single line… Do not remove in favor of placeholder text"*
    (usage.mdx).

12. **Helper text** → Usage › Content + Style › Typography. _(proposed)_ Optional helper text
    sits beneath the control (token `body.small` / `color.text.secondary`), persists while
    focused, for selection guidance. Carbon: *"appears beneath label… always available when
    field focused"* (usage.mdx, `$helper-text-01`).

13. **Placeholder rules** → Usage › Content. _(proposed)_ Placeholder is optional, signals
    interaction (e.g. "Choose an option"), disappears on selection — never put critical info
    there. Carbon: *"Do not place important information here; text disappears upon selection"*
    (usage.mdx).

14. **Option text rules** → Usage › Content (minor). _(proposed)_ Options are brief, no
    decorative icons, alphabetical order recommended. Carbon: *"Brief, accurate… No decorative
    images or icons… alphabetical order"* (usage.mdx).

15. **When-to-use vs select / radio** → Usage › When to use. _(proposed)_ Add: use a native
    `select` for heavy form-submit / mobile (N/A for our desktop product, note briefly); use
    a **Radio group** instead of a dropdown when there are only two (or very few) options.
    Carbon: *"two options = use radio buttons"* (usage.mdx).

16. **Do / don't** → Usage › Do/Don't (new). _(proposed)_ (a) Align dropdowns flush to the
    base-4 grid; don't let them hang into gutters. (b) Truncate overflowing option text with
    ellipsis + tooltip; don't wrap to multiple lines. Carbon: alignment + overflow do/don'ts
    (usage.mdx).

17. **Sentence-case typography** → Style › Typography (minor). _(proposed)_ Set label and
    option text in sentence case. Carbon: *"All dropdown text should be set in sentence case"*
    (style.mdx).

## Not applicable

- **Multiselect / filterable multiselect / combobox / fluid / inline variants** — Composa's
  Dropdown is single-select and input-styled by design; richer surfaces compose a **Menu**
  separately (already stated in our doc). Carbon's tags/select-all/typeahead/custom-value and
  fluid/inline layouts (usage.mdx) are explicitly out of scope. If a multiselect or combobox
  is ever needed, it should be a distinct Composa component, not folded into Dropdown.
- **Combobox typeahead keyboard & `role="combobox"`/`aria-autocomplete`** — depends on the
  combobox variant we don't ship (accessibility.mdx).
- **Multiselect `Delete`-clears-all, select-all parent checkbox / indeterminate** — multiselect
  only (usage.mdx, accessibility.mdx).
- **AI presence (AI label, aura gradient, explainability popover, revert-to-AI)** — Carbon AI
  feature (usage.mdx, style.mdx); no Composa equivalent.
- **Three sizing tiers (32/40/48px) + fluid 64px** — Composa uses a single 24px dense row;
  Carbon's size ramp (style.mdx) doesn't map. Skeleton/loading is a separate Composa pattern,
  not a dropdown-local state.
- **Vertical dividers inside the field** — Carbon do/don't for multi-element input groups
  (usage.mdx); not part of our single icon-leading + value + chevron anatomy.
