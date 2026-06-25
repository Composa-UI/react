# Annotation system v2 — plan from Samuel's component-review feedback

Running capture of the Storybook annotation review. I'll execute against this once the review
pass is done. Visual/style changes stay deferred to Samuel.

## The framing that was missing: two SCHOOLS, and the visual school has facets

This is the "school of thought on the groups of annotations" that lets us make better choices.

### School 1 — Accessibility (from the GitHub/CVS toolkit, NOT from Figma)
- Figma won't tell you a11y; the codified toolkit does. Figma only hints at the other types.
- **A11y is MULTIPLE annotations per component, not one.** (I over-collapsed to a single pin.)
- Use the TRUE type per element, and the right marker:
  - **Brackets on items / parts**, pins for single points. Stop pinning a whole composite as "button."
  - **Lists (ol / ul / li)** — a real toolkit type I imported icons for but never used. A Menu is a
    list of items; annotate the container (role=menu) AND bracket each item as menuitem/list item.
- Fix the composite mis-annotation: Menu/SegmentedControl/Tabs/Dialog should annotate the
  container's role + the items, not slap one "button" pin on the whole thing.

### School 2 — Visual speccing (from Figma — the better reference for these). Four FACETS:
1. **Anatomy** — the parts. (This is what "Parts" stories already do — see terminology below.) Brackets.
2. **Color** — color tokens.
3. **Typography** — type tokens.
4. **Layout** — spacing / gaps between elements, redlines, **corner radius**, insets. The measurement
   facet. We have a width/height redline but NO corner-radius type and NO gap-between-two-elements type.

### Cross-cutting — Variants (the "substantial" lens)
- How a facet changes ACROSS variants. This is where the Figma "states" illustration lives
  (e.g. Avatar: photo / initials / ring / disabled). Annotate the variant SET, not one instance.
- Maps to the variant grid + per-variant annotation we prototyped but aren't using in the right places.

### Map annotation stories INTO the doc tabs (across all 4, like Figma does)
- Figma annotates the actual component illustrations across Usage/Style/States/A11y.
- We stripped Style-tab annotations earlier (didn't know how then; now we do). Re-add as DERIVED
  annotations: Anatomy → anatomy section; Color/Typography/Layout → Style tab; Accessibility → A11y tab.

## Terminology to fix
- **"Parts" = Anatomy.** Confusing to have both. Unify the story name to **Anatomy**.
- Menu anatomy labels everything "item" (auto from data-part) — needs clearer per-part naming and
  the list/menuitem semantics, not a generic "item" everywhere.

## Bugs (mine to fix)
- **IconButton / ToggleButton:** tooltip shows by default and overlays directly on top of the button
  (you see only a tooltip, not the button). Investigate — my stories set `tooltip:false`; confirm why.
- **Dialog:** bad width in the story (we have size sm/md/lg — the story isn't using a sane one);
  header inset looks off. Figma/our docs should state size defaults.
- **SegmentedControl / Menu / Dialog (composites):** overlay collision + space calculation problems,
  and the whole container gets one "button" pin (wrong — see School 1 fix).
- **InputField "Anatomy" is wrong:** it shows the variant "Text · rest", not the parts, and isn't
  focused on the parts. It was the early overloaded test. Rebuild as a real anatomy (the input's parts).

## Gaps / not annotated
- Missing types: **corner-radius**, **gap/spacing-between-elements** (Layout facet); **list** (a11y).
- Unannotated components: **ControlGroup**, **Dropdown** (+ likely others).
- Over-bias to **pin marker** and **button type** — diversify to brackets, lists, true per-element types.

## My read on direction (to confirm)
- Reorganize every component's annotation stories around: **Anatomy · Color · Typography · Layout ·
  Accessibility**, with **Variants** as a cross-cutting story where it matters.
- Accessibility = multiple annotations, right type + marker per element, lists where lists exist.
- Add the Layout types (corner radius, gap) and wire the List a11y type.
- Fix the composite annotation approach + the tooltip/dialog/overlap bugs.
- Then thread these into the doc tabs.

## v2 execution log

### SUMMARY (read first)

All six steps executed; every step gated on a clean `build-storybook` (exit 0) and committed
separately. Stayed within src/annotation-kit/, src/react/stories/, src/react/factory.js (no edits
needed there in the end — the fixes lived in stories), the *.mdx docs, and this plan. The
detail-card visual was NOT touched.

**What changed**
1. **Bugs + terminology.** Found + fixed the tooltip-overlap root cause (interactive icon-button
   stories run a `play` that focuses the button, opening its FloatingTooltip, which falls back to
   INLINE rendering with no `OverlayHost` and lands on the button — wrapped those stories in an
   OverlayHost). Dialog stories given an explicit `size:"small"`. Renamed every `Parts` story →
   `Anatomy` + mdx refs.
2. **Composite a11y + List type.** New `list` + `listitem` a11y types wired to the real toolkit
   ul/li icons; new generic `each: true` renderer mechanism (one annotation → a bracket per
   matching item). Menu / SegmentedControl / Tabs (and new ControlGroup) now annotate the
   container role + bracket every item, instead of one "button" pin.
3. **Layout facet.** New `radius` (corner arc) and `gap` (spacing between two elements) visuals.
4. **Category reorg.** Every component's annotation stories organized around Anatomy · Color ·
   Typography · Layout · Accessibility, plus an annotated Avatar `VariantStates` grid.
5. **New components.** ControlGroup + Dropdown annotated across the facets.
6. **Doc-tab wiring.** Anatomy → anatomy section; Color/Typography/Layout → Style tab;
   Accessibility → Accessibility tab, across the *.mdx pages.

**FLAGGED — needs the owner's visual decision (do not treat as final)**
- **`radius` and `gap` are NEW VISUALS** (Step 3). First-pass treatments only: the corner-arc
  weight, the "Nr" radius tag, the gap axis heuristic + tick style, and whether radius should
  surface the token NAME (radius-200) like color/type tokens. Marked "NEW VISUAL" in code
  comments. They reuse the existing redline value-tag chrome (no new label chrome invented).

**Real component issues surfaced (logged, not fixed — out of annotation scope)**
- **Dialog**: `size:"medium"` (the default) builds class `.composa-dialog-medium`, which has NO
  CSS rule — medium silently falls back to the base 360px width. The default size has no matching
  modifier class. (styles.css defines only small/large/320/480.)

**What's left / open**
- Owner review of the two new Layout visuals (radius, gap) before they're considered final.
- Live per-component measurement (browser automation is unavailable in this env; all gating was
  via build-storybook, as instructed).
- Switch's legacy `Lasso` / `Bracket` marker-demo stories were left in place (harmless prototypes,
  not part of the five-category scheme) — remove if undesired.

### Step 1 — bugs + terminology (DONE, build 0)
- **Tooltip overlap (root cause found).** The icon-button family carries a FloatingTooltip
  that opens on hover/focus and portals into the nearest `OverlayHost`. The interactive
  `IconButton`/`Toggle`/`SplitButton` stories run a `play` that clicks (and thus FOCUSES) the
  button, opening the tooltip. With no `OverlayHost` ancestor, `OverlayPortal` (factory.js
  ~L291) falls back to INLINE rendering — the tooltip lands on top of the button, hiding it.
  Fix: wrapped those three interactive stories in an `OverlayHost` decorator (`withOverlayHost`
  in button.stories.js) so the tooltip portals + positions instead of overlapping. The
  annotation stories (`IconButtonAnatomy`/`IconButtonAccessibility`/`ToggleAccessibility`)
  already pass `tooltip:false` and were never the cause — left as-is.
- **Dialog story sizing.** Set `size:"small"` (300px, tighter for an annotation illustration)
  on the Dialog Anatomy + Accessibility stories. REAL COMPONENT ISSUE NOTED: `Dialog` builds
  the class from `propToken(size)`, so `size:"medium"` → `.composa-dialog-medium`, which has NO
  CSS rule (styles.css only defines `-small`/`-large`/`-320`/`-480`); medium silently falls
  back to the base `.composa-dialog` width (360px). Not breaking, but the default size has no
  matching modifier class — worth a component/token tidy (flagged, not fixed here).
- **Parts → Anatomy rename.** Renamed every `export const Parts` story to `Anatomy` across
  avatar, checkbox, dialog, list-cell, menu, segmented-control, radio, tabs, switch, text-pair,
  tooltip; updated comments. Updated mdx refs: `switch.mdx` (`SwitchStories.Parts` → `.Anatomy`)
  and the `### Parts` heading in `dialog.mdx` → `### Anatomy`. (button already used `Anatomy`.)
- **Switch duplicate-export fix + partial reorg.** switch.stories.js had a legacy mixed
  "Anatomy prototype" export (a11y pin + variant + redline) AND a real `Parts`. Renaming both
  collided. Resolved by repurposing the legacy one into `Accessibility` (a11y pin only) and
  adding a `Layout` story (width/height redlines); the real anatomy stays `Anatomy`. Legacy
  `Lasso`/`Bracket` marker-demo stories left in place (harmless prototypes).

### Step 2 — composite a11y + List type (DONE, build 0)
- **New a11y types `list` + `listitem`** (a11y/types.js), green (#1f883d), wired to the real
  toolkit `List/ul.svg` + `List/li.svg` icons (a11y/icons.js). `list` is the CONTAINER (role
  menu/tablist/list, full keyboard+states card); `listitem` is a per-item bracket (role only,
  no card).
- **New renderer mechanism `each: true`** (core/overlay.js) — repeats ONE annotation across
  every element matching `target`, numbered from `a.n`. Default marker = bracket. This is how a
  composite gets list semantics: container pin + one bracket per item, all from two declarative
  entries. Generic — reusable by any composite. `anchor`/`each` added to the schema BASE props;
  schema + d.ts regenerated (13 types).
- **Menu / SegmentedControl / Tabs Accessibility rewired** — was one `type:"button"` pin on the
  whole container. Now: container = `type:"list"` (role menu / tablist) + `each` `type:"listitem"`
  bracketing every row/segment/tab as menuitem/tab. Reduces the pin/button bias; brackets on items.

### Step 3 — Layout facet: corner-radius + gap (DONE build 0; NEW VISUALS — NEEDS OWNER REVIEW)
- **`radius` type** (ds/types.js) — NEW VISUAL. Traces the rounded corner as an SVG arc + a value
  tag ("Nr"). `corner` picks the corner (default top-left). Radius derived live from computed
  `border-*-radius`. **FLAGGED: needs owner review** — arc weight, tag placement, the "Nr" suffix,
  and whether to surface the token name (radius-200 etc.) like the color/type tokens do.
- **`gap` type** (ds/types.js) — NEW VISUAL. Dimension line across the void between TWO elements
  (`target` + `targetB`); auto-picks horizontal/vertical axis from their relative position; value
  derived live. **FLAGGED: needs owner review** — axis heuristic, tick style, behaviour when the
  elements overlap or aren't aligned.
- Renderer: `radiusGeometry` + `gapGeometry` in core/overlay.js; arc rendered in the SVG layer;
  value tags reuse the existing redline `valueTag` treatment (so NO new label chrome was invented).
  `estimateBox` + schema (`corner`, `targetB`) updated; schema/d.ts regenerated (15 types).
- Demo Layout stories added: Button (height redline + radius + label↔hotkey gap) and Dialog
  (width redline + radius). Existing width/height redline visuals untouched.

### Step 4 — category reorg (DONE, build 0)
Reorganized component annotation stories around the five facets — Anatomy · Color · Typography ·
Layout · Accessibility — reusing existing types/renderers. Added the missing facet stories:
- **Button**: + Color (fill), Typography (label), Layout (height + radius + label↔hotkey gap).
- **Checkbox / Radio**: + Color (control fill), Typography (label), Layout (control size + radius).
- **Switch**: split the legacy mixed story → Accessibility + Layout (done in Step 1).
- **Avatar**: + Color (fill), Typography (initials), Layout (diameter + radius), and an annotated
  `VariantStates` grid (photo · initials · disabled · square) using the variant-caret renderer.
  (The existing color-swatch `Variants` story kept as-is.)
- **TextPair**: + Typography (the three slot type tokens — its primary facet).
- **ListCell**: + Layout (row-height redline).
- **Tooltip**: + Color (surface), Layout (radius).
- **Menu**: + Color (surface), Layout (radius).
- **SegmentedControl**: + Color (track), Layout (height + radius).
- **Tabs**: + Typography (tab label).
InputField already had the full split. Where a facet doesn't apply (e.g. ListCell typography is
caller-owned), it was intentionally skipped.

### Step 5 — annotate ControlGroup + Dropdown (DONE, build 0)
- **ControlGroup**: Color (container fill), Layout (height + radius), Accessibility as a COMPOSITE
  — container role=group (`list`) + each `.composa-control-group-item` bracketed as a button
  (`each` listitem). Reuses the meta's OverlayHost decorator (decorators stack) for the item tooltips.
- **Dropdown**: Color (surface), Typography (value text), Layout (height + radius), Accessibility
  (closed trigger <button> with aria-haspopup=menu + aria-expanded). Annotated by class (the
  input-styled trigger has no `data-part`, so no auto-anatomy bracket).

### Step 6 — wire annotations into the doc tabs (DONE, build 0)
Threaded the annotation stories into the *.mdx doc tabs the way Figma annotates the real
component across its tabs:
- **Anatomy → the Usage-tab `### Anatomy` section** — `<Canvas of={X.Anatomy} />` under the
  heading (checkbox, radio, segmented-control, tabs, menu, dialog, button, avatar, control-group,
  dropdown; switch + input-field already had it).
- **Color / Typography / Layout → the Style tab** — annotated illustrations above the token
  tables (only the facets each component actually has). The tables stay the source of record for
  exact token names.
- **Accessibility → the Accessibility tab** — `<Canvas of={X.Accessibility} />` at the top of
  the tab (where the component has an Accessibility story).
- dialog.mdx had a heading collision after the Parts→Anatomy rename (two `### Anatomy`); the
  finer-grained numbered breakdown was retitled `#### Anatomy — numbered parts` to disambiguate.
