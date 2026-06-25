# SegmentedControl — Carbon gap analysis

Oracle: IBM Carbon `content-switcher` usage.mdx, style.mdx, accessibility.mdx (all 3 fetched OK,
raw.githubusercontent.com, main). Our doc: `src/react/stories/segmented-control.mdx` (LOCKED EXEMPLAR —
4-tab shape Usage/Style/Code/Accessibility; report flags content gaps only, no restructuring proposed).
Composa context: dense desktop app, base-4 grid, 24px dense controls. Maintainer report — no edits made.

**Mapping note (loose):** Carbon's nearest equivalent is **Content Switcher**, not a "segmented control."
The shapes overlap (mutually-exclusive row, one selected, single track) but the framing differs: Carbon
frames it as **view-switching** (`tablist` of `role="tab"` buttons that swap a content region), whereas
Composa frames it as a **mode/value picker inside one surface** (icon/label segments setting a property,
e.g. layout flow, alignment, type transforms). Where Carbon guidance is tied to its view-switching/`tab`
semantics, the map is flagged loose below rather than imported wholesale.

## Coverage diff

| Category | Carbon covers | We cover | Gap? |
|---|---|---|---|
| Icon vs text variants | Yes — Text-Based + Icon-Only; "use either all icons or all text; don't mix" | Yes — Icon + Label variants | No (but **no-mixing rule** absent) |
| Max number of segments | No max specified | Yes — "2 to 6" | No (we are stricter; fine) |
| State: selected | Yes | Yes (`color.bg` fill + 1px `color.border` pill) | No |
| State: unselected | Yes — transparent, secondary text/icon | Yes (flat on `color.bg.secondary`) | No |
| State: hover | Yes — `$background-hover`, `$text-primary`, `$icon-primary` | No | **Yes** |
| State: disabled | Yes — whole switcher OR individual tab; disabled token set | Yes (per-segment, dimmed + tooltip) | No (Carbon adds **whole-control** disable) |
| State: focus | Yes — `$focus` border (unselected), `$focus-inset` inner border (selected) | Yes (`color.border.selected` ring) | No |
| Keyboard: single tab stop | Yes — "takes one tab stop, arrow keys navigate" (roving focus, one `tabindex=0`) | **Contradicts** — "each segment is individually focusable… like a list of focusable elements" | **Yes (conflict)** |
| Keyboard: arrow roving focus | Yes — arrows move between tabs | Partial — "arrow keys move focus, mirroring native list" but framed as multi-tab-stop list | **Yes (framing)** |
| Selection-follows-focus (automatic vs manual) | Yes — explicit Automatic (focus selects) vs Manual (`Enter`/`Space` selects) variants | Partial — describes Manual only (Enter/Space selects; no deselect) | **Yes** |
| Keyboard: Tab exits into content | Yes — after select, `Tab` moves focus into the content section | No | **Yes (loose — view-switch)** |
| Screen-reader semantics | Yes — `tablist` + `role="tab"` buttons, `aria-selected`, `tabindex` roving | **Conflicts** — "list where each item contains a button"; no `tab`/`aria-selected`/roving | **Yes (conflict)** |
| When to use vs tabs | Yes — tabs for distinct content areas (filing-cabinet metaphor) | Yes — "Tabs for page-level content regions" | No |
| When to use vs toggle/switch | Yes — binary on/off → toggle, not a switcher | No | **Yes** |
| When to use vs radio | Not addressed by Carbon | No | n/a |
| When to use vs dropdown | Not addressed by Carbon | Yes — "Dropdown when too many to fit a row" | No (we exceed oracle) |
| Content / label rules | Yes — 2–3 words, nouns/noun phrases (not actions), sentence case, ellipsis + tooltip on overflow | Partial — truncates with ellipsis; **no** word-count / noun-phrase / sentence-case rule | **Yes** |
| Sizing (height options) | Yes — sm 32 / md 40 / lg 48 | Partial — single 24px dense height only | minor (intentional) |
| Equal-width tabs | Yes — "each tab same width; base on longest label; min 16px right spacing" | Partial — `flex 1 0 0` equal cells; no longest-label/min-spacing rule | **Yes** |
| Icon container proportion | Yes — fixed width = height; don't stretch | Partial — 24×24 icon box (square); rule not stated | minor |
| Alignment do/don't | Yes — align with page content; never flush to container edge | No | **Yes** |
| High vs low contrast variants | Yes — high (prominent) vs low (cards/modals) contrast token sets | No | **Yes (loose)** |
| Do / Don't | Yes (width, icon, alignment, labels, consistency) | Partial (when-to-use only) | **Yes** |
| Container radius | Yes — 4px | Yes (`radius-medium`) | No |

## Proposed fills

Each is inferred for Composa (dense desktop, base-4, 24px control). Token names are proposed unless
they already appear in our doc. Carbon citation = the fetched source asserting the category.
All target the LOCKED 4-tab shape — additions land inside existing tabs, no new tabs.

1. **Resolve the a11y semantics conflict (highest-priority)** _(proposed)_ — Accessibility › Screen reader.
   Our doc and Carbon disagree on the core pattern: we author "a list where each item is a focusable
   button" (multiple tab stops); Carbon authors a `tablist` of `role="tab"` buttons with **roving focus**
   (one `tabindex=0`, arrows move). Maintainer decision needed. If Composa segments set a *value/mode*
   (radio-like) rather than swap a content region, the correct ARIA is likely `radiogroup`/`radio` with
   roving focus — neither matches the current "list of buttons" prose. Recommend adopting roving focus +
   a single tab stop regardless, and pinning the role. _Carbon a11y.mdx: "structured as a `tablist`…
   each tab a `<button>` with `role="tab"`… selected tab `aria-selected="true"` `tabindex="0"`, others
   `tabindex="-1"`… roving focus—only one tab holds `tabindex=0`."_ (Mapping loose: Carbon's `tab` role is
   view-switch-specific; Composa's value-picker use may map better to `radiogroup`.)

2. **Single tab stop + roving focus** _(proposed)_ — Accessibility › Keyboard. Reframe the table: the
   control is **one Tab stop**; Tab enters onto the selected segment, arrow keys move focus/roving among
   segments, Tab exits to the next component. Replace "behaves just like a list of focusable elements"
   (which implies N tab stops). _Carbon a11y.mdx: "Content switcher takes one tab stop, and arrow keys are
   used to navigate between content tabs."_

3. **Selection-follows-focus: pick automatic vs manual** _(proposed)_ — Accessibility › Keyboard +
   Usage › Behaviors. State Composa's choice explicitly. For a dense property picker, **automatic**
   (arrowing selects + applies immediately) matches direct-manipulation editor feel; document it and the
   trade-off. Our current prose ("Enter/Space selects") describes **manual** — confirm intent.
   _Carbon a11y.mdx: "Automatic: focus and selection synchronize… Manual: arrowing moves focus without
   selecting; `Enter` or `Space` required." + "annotate whether automatic or manual since both look
   identical."_

4. **Hover state** _(proposed)_ — Style › Color + Usage › States. Add an unselected-hover row: background
   `color.bg.hover` _(proposed)_, text `color.text`, icon `color.icon` _(proposed)_ — gives feedback before
   click on the dense track. _Carbon style.mdx: "Unselected Hover: `$background-hover`, `$text-primary`,
   `$icon-primary`."_

5. **Whole-control disabled** _(proposed)_ — Usage › States. We cover a single disabled segment (rare,
   font-feature case); add the **entire-control disabled** case (all segments non-interactive, dimmed),
   distinct from one-segment disable. _Carbon usage.mdx: "Disabled: entire switcher or individual tab
   unavailable."_

6. **Content / label rules (label variant)** _(proposed)_ — Usage › Content. Add: keep labels to **2–3
   words**, use **nouns / noun phrases** (not action verbs), **sentence case**. Keep our ellipsis-truncate
   but pair it with a browser tooltip surfacing the full label. _Carbon usage.mdx: "limit label text to two
   to three words… use nouns/noun phrases; avoid action phrasing… overflow: add an ellipsis and accompany
   it with a browser-based tooltip." style.mdx: "set in sentence case."_

7. **No-mixing consistency rule** _(proposed)_ — Usage › Variants (Do/Don't). State: a single control is
   **all-icon or all-label, never mixed**. We ship both variants but don't forbid mixing. _Carbon usage.mdx:
   "Use either all icons or all text; don't mix within the same switcher."_

8. **Equal-width + longest-label sizing** _(proposed)_ — Style › Structure. Our `flex 1 0 0` already yields
   equal cells; add the label-variant rule: size all tabs to the **longest label** with **min `spacer-4`
   (16) right spacing** so the widest label isn't cramped. _Carbon style.mdx/usage.mdx: "each tab same
   width… base width on longest label… minimum 16px spacing to the right."_

9. **Alignment do/don't** _(proposed)_ — Usage › Do/Don't. Add: align the control with surrounding panel
   content; **don't flush it to the container edge**. Keep square icon boxes (already 24×24) — don't stretch
   icon proportions. _Carbon usage.mdx: "vertically align… never flush-align to container edges" + "icon
   containers fixed width = height; avoid stretching."_

10. **When to use vs Switch (binary)** _(proposed)_ — Usage › When to use. Extend our tabs/dropdown contrast:
    for a binary on/off **input**, use Switch — a SegmentedControl may *show* two views (e.g. grid/list) but
    shouldn't act as a binary input control. _Carbon usage.mdx: "Binary Actions: for yes/no or on/off, employ
    a toggle… shouldn't function as binary input controls."_

11. **Contrast tier (low priority, loose)** _(proposed)_ — Style › Color. Optional: a low-contrast treatment
    for placement inside cards/modals vs the default for prominent placement. Likely redundant with
    Composa's single dense surface treatment — include only if segmented controls appear in nested
    elevated surfaces. _Carbon style.mdx: "High Contrast (default)… Low Contrast for cards, modals, near
    buttons."_

## Not applicable

- **Carbon `tab`/`tablist` view-switching semantics (as-is)** — Carbon's content switcher swaps a content
  *region* and moves focus *into* that region on select. Composa's control sets a property/mode inside one
  surface; the "Tab moves focus into the content section" step (Carbon a11y.mdx) doesn't map. The roving-
  focus mechanism still applies (fill #1/#2); the content-region handoff does not.
- **sm/md/lg height options (32/40/48)** — Carbon ships three heights; Composa is intentionally a single
  **24px** dense control on the base-4 grid. Size delta is deliberate, not a gap — keep 24px. (Carbon
  style.mdx sizes noted for reference only.)
- **Carbon `$`-prefixed token literals** (`$layer-selected-inverse`, `$content-switcher-*`, `$focus-inset`,
  `$body-compact-01`, `$spacing-0x`) — translate to our `color.*` / `radius-*` / `spacer-*` / `body.*`
  namespace (done above as proposed names); do not adopt Carbon literals.
- **`$..-inverse` selected styling** — Carbon's high-contrast selected tab uses an *inverted* fill
  (`$layer-selected-inverse` + `$text-inverse`). Composa's selected segment is a raised same-theme pill
  (`color.bg` + `color.border`). Visual-language difference, not a missing category — keep our pill.
- **Skeleton/loading state** — not asserted in the fetched Carbon content-switcher docs; do not invent.
