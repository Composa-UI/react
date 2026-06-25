# Input — Carbon gap analysis

Oracle: Carbon **Text Input** (usage / style / accessibility, fetched from carbon-design-system/carbon-website `main`). Our doc: `src/react/stories/input.mdx`. Composa is a dense desktop-app design system (base-4 grid, 24px dense controls); Carbon is a web/product system, so several Carbon categories are deliberately Not applicable (see §3).

## Coverage diff

| Category | Carbon covers | We cover | Gap? |
|---|---|---|---|
| Variants | text, text-area (multiline), password | text, numeric, numeric-multi, combo, color (+ emphasized, nesting) | Partial — no **password** mask/reveal; our multiline is a behavior note, not a first-class variant. Our numeric/combo/color have no Carbon analog (superset). |
| Label | required unless a11y exemption; sentence case; short; no trailing colon | "accessible name via `label`/`placeholder`/`aria-label`" only | **Yes** — no label *content* rules (casing, length, no colon), no statement that a label is the default expectation. |
| Helper text | persistent text under field; sentence case, full sentences; replaced by error/warning | not mentioned | **Yes** — entire category absent. |
| Placeholder | hints/examples; sentence case, no punctuation; not required, off by default; use sparingly | listed as an a11y-name fallback only | **Yes** — no content/usage rules; we conflate placeholder with the accessible name. |
| States — enabled/focus/disabled | yes | yes (Default / Focus / Disabled) | No (covered). |
| States — read-only | "review but not modify"; `$border-subtle` | not mentioned | **Yes** — missing. |
| States — error | red border + error icon + error message (3 indicators) | not mentioned | **Yes** — missing. |
| States — warning | attention to an exception condition; warning icon | not mentioned | **Yes** — missing. |
| States — skeleton | initial-load placeholder | not mentioned | **Yes** — missing. |
| States — empty/active-empty | (implicit in Carbon "Active") | yes (Empty / Active empty) | No — ours is richer here. |
| Validation & error messaging | real-time or on-submit; invalid = required-not-filled or invalid value | not mentioned | **Yes** — no validation timing or messaging guidance. |
| Required-field indication | mark minority — `(optional)` if most required, `(required)` if most optional | not mentioned | **Yes** — missing. |
| Character / word counter | count vs. max; block input past max | not mentioned | **Yes** — missing. |
| Keyboard | Tab stops (field + info icons); type-to-replace highlighted text; password reveal via Enter/Space | Tab, Typing, combo `▾`/Down, Enter commits | Partial — ours covers combo well; missing password reveal keys + the "existing text highlighted on focus, replaced on type" articulation (we have value-highlight visually but not as keyboard semantics). |
| Screen-reader semantics | label + helper + error surfaced; label via `for`; helper/error via `aria-describedby` | accessible name via label/placeholder/aria-label; pill + disabled exposure | **Yes** — no `for`/`aria-describedby` association model; nothing on surfacing helper or error text to AT. |
| Do/Don't | alignment to grid; width proportional, not excessively wide | not present as do/don't | Partial — we mention snap-to-grid; no explicit do/don't and no width guidance. |

## Proposed fills

Token names are inferred from existing Composa tokens used in the doc; all marked `_(proposed)_`. Heaviest gaps — error/validation and required + helper text — first.

1. **Error state** → Usage › States row + Style › Color. _(proposed)_
   Add an `Error` state pairing the three Carbon indicators, mapped to Composa: a 1px `color.border.error` border (always shown, like multiline's persistent border, since dense panels are borderless at rest), a leading/trailing `icon.16.error` in `color.icon.error`, and an error message in `color.text.error` set in `caption.small` below the field. Target tab: **Usage** (States table) + **Style** (Color). Carbon: "three visual indicators to signify invalid content: a red border, an error icon indicator, and an error message" (`$support-error`, `$text-error`).

2. **Validation & messaging behavior** → Usage › Behaviors. _(proposed)_
   Add: "Validate on commit (`Enter`/blur) by default; use real-time validation only for high-cost-to-correct fields. A field is invalid when it holds an out-of-range value or is required and empty." Target tab: **Usage**. Carbon: "Real-time validation helps streamline the process… otherwise validate… when the user submits"; invalid = "input is invalid or a required text input… has not been filled in".

3. **Required-field indication** → Usage › Content rules. _(proposed)_
   Add the minority-marking rule: "If most fields in a panel are required, mark only optional labels `(optional)`; if most are optional, mark only required labels `(required)`." Render the marker in `color.text.secondary`. Target tab: **Usage**. Carbon: verbatim two-rule guidance above.

4. **Helper text** → Usage › Content rules + Anatomy + Style. _(proposed)_
   Add a `Helper text` anatomy element: persistent text below the field in `color.text.secondary`, `caption.small`, margin-top `spacer-1` (4), sentence case / full sentences, and "an error or warning message replaces the helper text when present." Target tab: **Usage** (Anatomy + Content rules) + **Style** (Color/Typography/Structure). Carbon: "helper text appears persistently underneath the field, except when an error or warning message replaces it"; `$text-helper`, 12px/400, margin `$spacing-02`.

5. **Warning state** → Usage › States + Style › Color. _(proposed)_
   Add a `Warning` state: warning icon in `color.icon.warning` plus a message in `color.text` (note Carbon keeps warning *text* primary, not colored). Use for exception conditions where input is technically valid. Target tab: **Usage** + **Style**. Carbon: warning = "call the user's attention to an exception condition"; warning text `$text-primary`, icon `$support-warning`.

6. **Read-only state** → Usage › States + Style › Color. _(proposed)_
   Add `Read-only`: non-editable but reviewable, with a subtle `color.border.subtle` divider (vs. focus border), value in `color.text`. Target tab: **Usage** + **Style**. Carbon: read-only = "review but not modify"; `$border-subtle`.

7. **Skeleton state** → Usage › States. _(proposed)_
   Add `Skeleton`: a non-interactive loading placeholder at the field's 24px height on initial load. Target tab: **Usage**. Carbon: "Use on an initial page load to indicate that the text input… has not yet fully loaded."

8. **Label content rules** → Usage › Content rules. _(proposed)_
   Add: sentence-style capitalization (except product names/proper nouns), keep labels short (three words or fewer), no trailing colon, and a label is the default expectation (placeholder/`aria-label` are fallbacks, not equivalents). Target tab: **Usage**. Carbon: "Use sentence-style capitalization… Keep the label short… Do not use colons after label names"; style: "labels should be three words or less."

9. **Placeholder content rules** → Usage › Content rules. _(proposed)_
   Add: placeholder gives hints/examples in sentence case without punctuation, is optional and off by default, and must not be used as the field's only label. Target tab: **Usage**. Carbon: "Placeholder text provides hints or examples… not required and by default not shown… should only be added when necessary."

10. **Character counter** → Usage › Behaviors. _(proposed)_
    Add an optional `count / max` indicator (e.g. for naming fields) in `color.text.secondary`, blocking input past max. Target tab: **Usage**. Carbon: "Indicate the number of characters being entered and the total… once the max number is reached the text area should prevent the user from entering any additional character."

11. **Screen-reader association model** → Accessibility › Screen reader & labeling. _(proposed)_
    Add: the label associates to the input via `for`/`id`; helper text and any error/warning message are surfaced via `aria-describedby`; error messages are programmatically announced. Target tab: **Accessibility**. Carbon: "Labels are properly associated… using the `for` attribute"; "Helper text is surfaced… through `aria-describedby`"; "error messages… are also accessibly revealed."

12. **Keyboard — type-to-replace + password reveal** → Accessibility › Keyboard. _(proposed, password row only if a password variant is adopted)_
    Add a row: "Existing value is selected on focus and replaced when the user types" (formalizing our value-highlight as keyboard behavior). Defer the password reveal `Enter`/`Space` row unless a password variant is added. Carbon: "Any existing text… is highlighted on focus and will be replaced when the user begins typing"; password "toggle visibility using `Enter` or `Space`."

13. **Do/Don't — width & grid** → Usage › Behaviors (or a Do/Don't block). _(proposed)_
    Add: size input widths to content and the panel grid columns; don't stretch an input to fill space. Complements our existing snap-to-grid note. Carbon: "Make text input widths proportional to the content and align to grid columns" / "Do not make text inputs excessively wide just to fill in space."

## Not applicable

- **Fluid input style** (64px field, label inside, hung into gutters) — Carbon's expressive web style; conflicts with our 24px dense, borderless-at-rest panel model. Skip.
- **AI presence / AI-label variant** (`$ai-aura-start-sm`, `$ai-aura-stop`, `$ai-border-strong`, mini label) — Carbon-specific AI affordance; not in Composa's scope.
- **Medium (40px) / Large (48px) default sizes as a generic size axis** — Carbon's size ladder. We already have our own height ladder (24 / 32 / 40) tied to context (default / Value / emphasized-large), so we don't adopt Carbon's 48px or its naming.
- **Password as a default expectation** — only adopt if a masked-credential use case appears; current Composa surfaces (editor property panels) have no obvious password field. Listed as a variant gap but low priority.
- **Word counter** — text-area-specific; our inputs are single-line, so character counter suffices.
