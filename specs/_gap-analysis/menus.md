# Menu — gap analysis vs IBM Carbon

Oracle: IBM Carbon. Composa doc: `src/react/stories/menus.mdx`.

Carbon sources fetched (raw GitHub, `carbon-website/main`):
- `components/menu/usage.mdx` — **resolved**
- `components/menu/accessibility.mdx` — **resolved**
- `components/menu-buttons/usage.mdx` — **resolved** (trigger-only; placement + when-to-use)
- `components/menu-buttons/accessibility.mdx` — **resolved** (trigger keyboard/ARIA)
- `components/menus/usage.mdx` — **404** (path is singular `menu/`)
- `components/menus/accessibility.mdx` — **404** (path is singular `menu/`)

Composa is a dense desktop-app system (base-4 grid, 24px dense controls). Carbon is the
category oracle; "inferred" fills are proposed for our context, not copied tokens.

## Coverage diff

| Category | Carbon (oracle) | Composa doc | Verdict |
|---|---|---|---|
| **Item — action** | "A menu item that can be activated to apply its action." | Simple row (label + optional shortcut/chevron). | **Covered** |
| **Item — checkbox / multi-select** | Selectable items show "the checkmark in front of the menu item"; multi-select supported. | Multi-select = right-aligned checkbox per row; checkmark column is the on/off variant. | **Covered** (alignment differs — see note) |
| **Item — radio / single-select** | "Menu item radio groups get `role=menuitemradio`"; single-select shows leading checkmark. | On/off checkmark row exists, but **single-select-one-of-group (radio) semantics not named**. | **Partial gap** |
| **Item — submenu** | Caret-indicated nested level; "Avoid multiple levels of nesting." | Submenu chevron row; expands downward/diagonally, 4px gap. | **Covered**; nesting-depth guidance missing. |
| **Item — separator / divider** | "A rule that indicates different sections"; groups related actions. | Divider (1px, 16-high box, 8 variant). | **Covered** |
| **Item — danger / destructive** | Dedicated danger states: "danger hover" + "danger hover and focus"; for delete/remove. | **Absent** — no danger row kind, no destructive token. | **GAP** |
| **State — enabled** | Defined. | Default. | **Covered** |
| **State — hover** | Defined (menus + submenus). | Hover = `color.bg.menu-selected`. | **Covered** |
| **State — focus** | Distinct state; also "focus and hover" combined state. | Focus mentioned in a11y (trap/cycle) but **no row focus styling/token**, and no focus-vs-hover distinction. | **GAP** |
| **State — disabled** | Defined; live again later. | Dimmed tokens + optional tooltip. | **Covered** |
| **State — selected/on** | Checkmark; "retains selected/unselected state when reopened." | On/off + checkbox on/off. **Selection-persistence-on-reopen not stated.** | **Partial gap** |
| **Submenu open/close behavior** | Reveal on hover (mouse) or Return/Enter/Right (kbd); close on Left. | Expand down/diagonal, 4px gap; → opens, ← closes. | **Covered** (behavior); **timing** — Carbon states "No specific timing or delay," so neither side specs a delay. |
| **Keyboard — arrow nav** | Up/Down between items. | ↓/↑ with wrap. | **Covered** |
| **Keyboard — Right/Left submenu** | "opened and closed using the right and left arrow keys." | → opens, ← closes. | **Covered** |
| **Keyboard — Enter/Space** | Activates item & collapses; on submenu, opens. | Enter/Space activates/toggles. | **Covered** |
| **Keyboard — Esc** | Collapses, focus back to trigger. | Esc closes, returns focus. | **Covered** |
| **Keyboard — typeahead** | **Not mentioned by Carbon.** | Typeahead specified. | **Composa exceeds** (no conflict) |
| **Keyboard — Home/End** | **Not mentioned by Carbon.** | Home/End specified. | **Composa exceeds** |
| **SR — role menu/menuitem** | `ul role=menu`, `li role=menuitem`. | `menu` / `menuitem`. | **Covered** |
| **SR — menuitemcheckbox/radio** | `menuitemcheckbox` (selectable), `menuitemradio` (radio groups), `role=group` for groups. | `menuitemcheckbox` named; **`menuitemradio` and `role=group` NOT named**. | **GAP** |
| **SR — aria-expanded / haspopup** | `aria-haspopup=true` + `aria-expanded` on submenu parents. | aria-haspopup + aria-expanded on submenu parents. | **Covered** |
| **Placement / collision / flip** | Positions top/left/right by default, bottom alt, "depending on available space and layout"; RTL horizontal mirroring. | Submenu opens down/diagonal; **no collision/flip rule, no RTL mirroring.** | **GAP** |
| **Content — labels / truncation** | "Short and precise labels"; truncate → browser title tooltip on hover/focus. | Label token specified; **no truncation/tooltip-on-truncate rule.** | **Partial gap** |
| **Content — ordering / grouping** | Order by operations, most-used at top; group into divider sections; dedupe recurring terms in submenu labels. | "Group with separators"/heading rows. **Ordering + dedupe guidance missing.** | **Partial gap** |
| **Content — item count limits** | Context/overflow ≤ 12 items; menu button < 5 items. | **Absent.** | **GAP** |
| **Content — shortcut/caret alignment** | Item may show caret or keyboard shortcut as trailing value; "consistent alignment with selected/unselected items." | Shortcut right-aligned; check column reserves indent for alignment. | **Covered** |
| **When-to-use — menu vs dropdown vs select** | Menu = hide advanced/less-used actions; **Dropdown** = static option list for form submit/filter; **Popover** = many/complex collective inputs. | "Context / state / submenu" framing only; **no menu-vs-dropdown-vs-select decision rule.** | **GAP** |
| **Min width / sizing do-dont** | Min width 160px; match trigger & menu heights; don't narrow to fit; don't mix alignments. | Panel fixed 208px. **No min-width rule or trigger-height-match do/don't.** | **Partial gap** |
| **Trigger model (menu/combo/overflow button)** | Detailed (combo button double-tab, overflow icon, aria-owns/controls). | Composa menu is trigger-agnostic. | **N/A** (see below) |

## Proposed fills

1. **Danger / destructive row kind** — add a `kind="danger"` row for delete/remove.
   Rest uses `color.text.menu`; hover uses a danger fill — propose `color.bg.danger`
   _(proposed)_ with text `color.text.ondanger` _(proposed)_, mirroring our existing
   destructive button tokens if present. Add to **Usage → Variants** and a **States**
   row "Danger hover." Carbon: "A danger hover state can be applied to actions that
   could cause significant changes, such as delete." (`menu/usage.mdx`)

2. **Focus state, distinct from hover** — author a row focus ring/fill separate from
   `color.bg.menu-selected`, plus a "focus + hover" combined state. Propose focus ring
   `color.border.focus` _(proposed)_ on the row container. Add to the **Usage → States**
   table and **Style → Color**. Carbon enumerates "enabled, hover, focus, focus and
   hover, danger hover, danger hover and focus, disabled." (`menu/usage.mdx`)

3. **Radio (single-select) semantics** — name single-select-one-of-group explicitly:
   a leading-checkmark row that is mutually exclusive within a group, exposing
   `role="menuitemradio"`, wrapped in a `role="group"` container. No new visual token
   (reuse `icon.16.check` + `spacer-4` indent). Add to **Usage → Variants** and
   **Accessibility → SR**. Carbon: "Menu item radio groups get `role=menuitemradio`";
   "Menu item groups are `li` elements with `role=group`." (`menu/accessibility.mdx`)

4. **`menuitemradio` + `role=group` in a11y** — extend the SR bullet (currently only
   `menu`/`menuitem`/`menuitemcheckbox`) to add `menuitemradio` and `role=group` for
   labeled clusters/heading groups. **Accessibility → Screen reader & labeling.**
   Carbon (`menu/accessibility.mdx`).

5. **Selection persists on reopen** — add a behavior note: a checkmark/checkbox/radio
   item "retains its selected or unselected state when the menu is opened again."
   **Usage → Behaviors.** Carbon (`menu/accessibility.mdx`).

6. **Collision / flip + RTL placement** — author placement rules: menus and submenus
   open in the preferred direction (down/diagonal) but **flip vertically/horizontally
   when they would clip the viewport**, choosing side by available space; mirror
   horizontally under RTL. No token; behavioral. **Usage → Behaviors** (or a Placement
   subsection). Carbon: positions "depending on the available space and layout"; "Menu
   aligns with RTL languages through horizontal mirroring." (`menu/usage.mdx`)

7. **Label truncation → tooltip** — add content rule: keep labels short; when a label
   exceeds the panel width it truncates with ellipsis and the full text surfaces via a
   `title`/tooltip on hover or focus. Reuses the existing disabled-tooltip pattern.
   **Usage → Content rules.** Carbon (`menu/usage.mdx`, `menu/accessibility.mdx`).

8. **Item-count guidance** — add a content rule: keep context/overflow menus to **≤ 12
   items** and trigger-button menus shorter (Carbon says < 5); group long lists with
   dividers. Tune our numbers for dense desktop if desired, cite Carbon as basis.
   **Usage → Content rules.** Carbon (`menu/usage.mdx`).

9. **Ordering + submenu-label dedupe** — add content rules: order items by operation
   sequence with most-used at the top; when a term repeats across >2 items in a group,
   drop it from the submenu label. **Usage → Content rules.** Carbon (`menu/usage.mdx`).

10. **When-to-use: menu vs dropdown vs select** — add a decision paragraph: use a
    **menu** for actions/commands and less-used options; use a **dropdown/select** for
    choosing a value from a static list in a form or filter; use a **popover** for many
    or complex collective inputs. Cross-link our Dropdown spec. **Usage → When to use.**
    Carbon (`menu/usage.mdx`, `menu-buttons/usage.mdx`).

11. **Min-width + trigger-height do/don't** — add to **Style → Structure** / a do-dont:
    menus have a sensible minimum width (Carbon: 160px; for our 208px panel, state the
    floor) and trigger height should match menu row height; don't narrow a menu to fit
    surrounding layout; don't mix selected/unselected alignment. Reuse `spacer-*`/24
    control height. Carbon (`menu/usage.mdx`).

## Not applicable

- **Trigger components (menu button / combo button / overflow button).** Carbon documents
  the trigger surface separately (combo-button double-tab order, overflow icon
  customization, `aria-owns`/`aria-controls` wiring). Composa's Menu is trigger-agnostic
  (it's the floating surface); trigger keyboard/ARIA belongs to whatever opens it
  (toolbar button, right-click). Out of scope for this spec.
- **Carbon button-style state inheritance** ("follow the button style guidelines" from
  `menu-buttons/usage.mdx`) — applies to the trigger button, not menu rows. N/A.
- **Submenu open/close timing/delay** — Carbon explicitly specifies no delay; our doc
  also specifies none. No gap to fill (intentional immediate reveal).
- **Typeahead, Home/End** — Composa specifies both; Carbon does not document them. Our
  doc exceeds the oracle here; nothing to add.
