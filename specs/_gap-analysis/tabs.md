# Tabs — Carbon gap analysis

Oracle: IBM Carbon `tabs` (usage.mdx, style.mdx, accessibility.mdx, fetched 2026-06-20).
Subject: Composa `src/react/stories/tabs.mdx`.
Lens: dense desktop-app, base-4 grid, 24px dense controls. Carbon's 40/48/64px sizing is a category signal, not a target.

## Coverage diff

| Category | Carbon (oracle) | Composa today | Verdict |
|---|---|---|---|
| **Variants — line/contained** | Line ("standalone, within components or full-page"), Contained ("emphasized, defined content areas like sub-pages"), Vertical (top-to-bottom scan) | Underline (selected fill + strong type) + Pill (filled-pill selected) | **Partial** — Composa's two map loosely to line/contained but framing differs; no vertical variant |
| **Icon tabs** | "Icons always pinned to the right of the label"; icon-only tabs need a tooltip on hover/focus | Not covered — only text + counter badge | **Missing** |
| **Dismissable tabs** | Dedicated variant; close affordance; when-to/when-not; inline-warning/modal on dismiss; icon-mixing rule | Behavior mentions "trailing close affordance" in overflow scrim only; no dismissable-tab concept | **Missing** |
| **States — selected/unselected** | Both defined | Both defined (table) | **Covered** |
| **States — disabled** | Defined: "not allowed to interact due to permissions, dependencies, or prerequisites"; disabled token set | Absent from states table and color table | **Missing** |
| **States — focus** | Defined (click or arrow nav) | Selected-focus + unselected-focus rows w/ `border.selected` ring | **Covered** |
| **States — hover** | Defined per variant (`$border-strong` / `$layer-accent-hover` / `$layer-hover`) | Absent from states table | **Missing** |
| **Overflow handling** | Horizontal scroll with **left/right paging arrows**; "should NOT wrap or stack — scroll horizontally"; arrow nav auto-scrolls to keep selection visible | Horizontal scroll with gradient edge masks fading to `bg`; no paging arrows; no explicit "never wrap" rule | **Partial** |
| **Keyboard — arrow roving focus** | Arrow keys move between tabs; roving tabindex (selected `0`, others `-1`) | `←`/`→` move focus; "roving focus — one stop for the whole row" | **Covered** |
| **Keyboard — Home/End** | Not explicitly cited in fetched accessibility.mdx (wrap-around at ends is) | `Home`/`End` → first/last | **Covered** (Composa exceeds cited Carbon) |
| **Keyboard — wrap at ends** | "When the end of the tablist is reached, focus wraps to the opposite end" | Not stated | **Missing** |
| **Automatic vs manual activation** | Explicit: automatic = focus+selection synced on arrow; manual = arrow moves focus, `Enter`/`Space` selects; **"annotate which variant the team implements"** | `Space`/`Enter` "activates the focused tab" → implies manual, but never names the model or states the choice | **Partial (under-specified)** |
| **Screen reader — roles** | `tablist` / `tab` (as `<button>`) / `tabpanel` | `tablist` / `tab` / `tabpanel` | **Covered** |
| **Screen reader — aria-selected** | `aria-selected` true/false; plus `tabindex` 0/-1 and `aria-controls` linking tab→panel | `aria-selected` true/false; panel "associated with its tab" (no `aria-controls` named) | **Partial** |
| **Tabstop model** | "at least two tabstops — one for tablist, one for tabpanel"; focus enters panel's first interactive element or the panel itself | "Tab moves focus into/out of the tabstrip" (tablist stop only; panel stop not described) | **Partial** |
| **Content — label length** | "One to two words, clear and specific"; communicate the view | "short text label (default 'Tab Title')" — no word-count guidance | **Partial** |
| **Content — truncation** | Line tabs don't truncate (scroll instead); vertical wraps to 2 lines then ellipsis + tooltip | Not addressed | **Missing** |
| **Content — secondary label** | Contained tabs may carry a secondary label | Counter badge only; no secondary label | **Missing (likely N/A)** |
| **When-to-use vs alternatives** | vs Content Switcher (toggle/compare same content), vs Progress Indicator (linear steps); don't use tabs to compare across groups | vs SegmentedControl (inline mode toggle) | **Partial** — covers the toggle alternative; missing the linear-process and compare-across-groups guards |
| **Do / Don't** | DO align labels to grid; DON'T align container to grid; within a modal use line (not contained) tabs, first label aligns to content | None | **Missing** |

## Proposed fills

1. **Disabled state** → add a `Disabled` row to the Usage states table and the Style color table. Inferred: fill `color.bg`, text `color.text.disabled`, no focus ring, not focusable (omitted from roving order). Carbon: "When a user is not allowed to interact with the tab due to permissions, dependencies, or pre-requisites." Target: **Usage** (states) + **Style** (color). `_(proposed)_`

2. **Hover state** → add a `Hover` row. Inferred for dense pill model: unselected tab gains `color.bg.hover` fill on pointer hover, text stays `color.text.secondary`; selected tab unchanged. Carbon line/contained use `$border-strong` / `$layer-accent-hover`. Target: **Usage** (states) + **Style** (color). `_(proposed)_`

3. **Automatic vs manual activation (name the model)** → state explicitly that Composa tabs use **manual activation** (arrow moves focus, `Space`/`Enter` selects and swaps the panel) — which is what the current keyboard table already implies. Add one line so the choice is documented, per Carbon's instruction that "designers should annotate which variant the team has decided to implement." Target: **Accessibility** (Keyboard). `_(proposed)_`

4. **Overflow — paging arrows + never-wrap rule** → augment the existing gradient-mask overflow note: (a) add left/right paging-arrow affordances (24px `height.input` icon buttons, `icon-secondary`) that scroll the row; (b) state the rule "tabs never wrap or stack — the row scrolls horizontally"; (c) keyboard arrow nav auto-scrolls the focused tab into view. Carbon: "left and right arrows appear to help navigate"; "should not wrap to multiple lines or stack… scroll horizontally"; "arrow navigation automatically scrolls to keep the selected item visible." Target: **Usage** (Behavior > Overflow) + **Style** (Structure, add arrow-button size). `_(proposed)_`

5. **Focus wrap-around at ends** → add to keyboard table: at the first tab, `←` wraps to the last; at the last, `→` wraps to the first. Carbon: "When the end of the tablist is reached, the focus wraps to the opposite end of the list." Target: **Accessibility** (Keyboard). `_(proposed)_`

6. **Two-tabstop / tabpanel focus model** → clarify that the tabstrip takes one tabstop and the tabpanel a second: `Tab` from the active tab moves focus to the panel's first interactive element, or the panel itself if none. Carbon: "Tabs take at least two tabstops, one for the tablist and one for the tabpanel." Target: **Accessibility** (Keyboard / Focus). `_(proposed)_`

7. **`aria-controls` + tabindex linkage** → in the screen-reader section, name the wiring: selected tab `aria-selected="true"` `tabindex="0"`, others `"false"`/`"-1"`, and each tab `aria-controls` its `tabpanel` id. Carbon: states these verbatim. Target: **Accessibility** (Screen reader & labeling). `_(proposed)_`

8. **Icon tabs** → add a Content/anatomy note: an optional leading or trailing icon (16px, `icon-secondary` unselected / `icon` selected) may sit beside the label; icon-only tabs require a tooltip on hover and focus. Carbon: icons "always pinned to the right of the label"; icon-only tabs "always use a tooltip… on hover and focus." (Composa may choose leading-icon to match its other dense controls — flag the divergence.) Target: **Usage** (Content) + **Style** (Structure). `_(proposed)_`

9. **Dismissable tabs** → add a variant/behavior note for a closable tab carrying a trailing 16px close (`x`) button (`icon-secondary`, `radius-medium` hit area). When-to-use: user-created/curated content, focused datasets. When-not: critical info or primary navigation. If all tabs are dismissable, treat icon presence consistently. Carbon: dismissable-tabs section verbatim. Target: **Usage** (Variants + Content). `_(proposed)_` (Composa already reserves a "trailing close affordance" in the overflow scrim — reconcile the two.)

10. **Content — label length & truncation** → add to Content: keep labels one to two words, clear and specific; the row scrolls rather than truncates, so labels are not ellipsized. Carbon: "one to two words"; "line and tab labels do not need truncation since these… allow for horizontal scrolling." Target: **Usage** (Content). `_(proposed)_`

11. **When-to-use guards** → extend the When-to-use list with two Carbon guards: use a progress/step pattern (not tabs) for linear step-by-step tasks; don't use tabs when the user must compare information across groups (forces back-and-forth clicking). Carbon: progress-indicator and comparison-limitation paragraphs. Target: **Usage** (When to use). `_(proposed)_`

12. **Do / Don't** → add a short do/don't: DO align tab labels to the base-4 grid; DON'T align the tab container to the grid; within a modal/panel, the first tab label aligns to the other content in the space. Carbon: "Align tab labels with the grid" / "Do not align tab container with the grid" / line-tabs-within-a-component rule. Target: **Usage**. `_(proposed)_`

## Not applicable

- **Vertical tabs** — Carbon's left-aligned top-to-bottom variant (64px rows) is a page-navigation pattern at odds with Composa's dense 24px horizontal inspector strips. Skip unless a left-rail nav use case appears.
- **Secondary labels on contained tabs** — Carbon's two-line `$label-01` secondary text conflicts with the single-line 24px dense control; Composa already covers the "extra info" need with the counter badge. Skip.
- **Carbon pixel sizing (40/48/64px heights, 2–3px borders, 16px side padding, 14px type)** — superseded by Composa's base-4 dense system (24px `height.input`, `spacer-2` padding, `body.medium`). Used only as a category signal, not adopted.
- **Contained-full-width / responsive stacking** — Composa's overflow rule is scroll-never-wrap, so full-width auto-fit and mobile stacking variants don't apply to the desktop-app target.
