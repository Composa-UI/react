<!-- Gap analysis: Composa Tooltip (specs/atoms/tooltip.md) vs IBM Carbon. Carbon = oracle.
     Sources fetched 2026-06-20:
       - carbon .../components/tooltip/usage.mdx
       - carbon .../components/tooltip/style.mdx
       - carbon .../components/tooltip/accessibility.mdx
     Carbon splits the pattern three ways: Tooltip (hover/focus, non-interactive),
     Toggletip (click/Enter, interactive content), Definition tooltip (term/help in text).
     Composa currently models only "Tooltip" + an "Action tooltip" variant. -->

# Tooltip — Carbon gap analysis

## Coverage diff

| Category | Carbon (oracle) | Composa `tooltip.md` | Verdict |
|---|---|---|---|
| **Tooltip vs Toggletip vs Definition tooltip distinction** | Three named patterns. "A tooltip is exposed on hover or focus when you need to disclose brief, supplemental information that is not interactive. A toggletip is used on click or enter when you must expose interactive elements." Definition tooltip = a separate component for defining terms/help within text (labels, words in paragraphs, data tables). | Models one "Tooltip" plus an **"Action tooltip"** variant that pairs a label with an inline action (editable URL/email/phone + Edit/Send). No toggletip concept; no definition-tooltip concept. | **GAP (big).** Composa's "Action tooltip" is exactly what Carbon forbids inside a hover tooltip and routes to **Toggletip**. The interactive-content split is missing. |
| **Trigger — hover/focus vs click** | Tooltip: hover (mouse) or focus (keyboard via Tab). Toggletip: click or Enter. Definition tooltip: hover or click depending on context. | Hover or keyboard focus on the anchor. No click/Enter trigger pattern (because no toggletip). | **GAP** for the interactive case. Hover/focus itself is covered. |
| **Delay / timing** | Not specified in fetched pages (Carbon gives no hover-delay value). | 80ms fade in/out; hover-delay is an **open decision** (~500ms hover / immediate on focus proposed). | **Covered / Composa-richer.** Carbon is silent, so no oracle pressure here. |
| **Dismissal** | Mouse: dismissed by hovering away. Keyboard: `Esc`, or focus moving away. Persists while pointer stays over trigger or container. | Hides when pointer leaves or focus moves; tooltip + surface from same control never co-show. `Esc` dismissal is an **open decision**, not yet confirmed. | **Partial gap.** Hover-away covered; `Esc` and "persists while hovering the container itself" not yet locked. |
| **Placement / alignment & collision** | Direction defaults to **auto**; detects browser edges and repositions so the container is not cut off. Manual: top/right/bottom/left. Alignment start/center/end to avoid bleeding off-page. Maintain min 16px clearance from page bottom; mobile = below icon only. | Defaults **below**, centered; also top/left/right/corners; "position adapts near screen edges." | **Partial gap.** Composa adds corners (Carbon doesn't) but lacks explicit start/center/end **alignment** axis and the min-clearance rule. Default differs (below vs auto). |
| **States** | Closed: definition-tooltip trigger has `$border-strong` (dotted underline). Open: `$background-inverse` container, `$text-inverse` text, caret. Definition focus: `$focus` ring + `$border-interactive` underline. | Tone variants (`inverse` default); dark rounded container + tail; shortcut hint in secondary color. No closed/trigger state, no focus-ring state for an in-text trigger. | **Partial gap**, tied to the missing definition-tooltip pattern (trigger styling, focus ring). |
| **Keyboard — focus to reveal** | Tooltip appears automatically when the trigger/icon-button receives focus. Icon buttons stay in tab order, activate on Enter/Space. | Focus shows the tooltip — but listed as an **open decision** ("confirm focus shows the tooltip"). | **Partial gap.** Behavior intended but not asserted; Carbon makes it a firm requirement. |
| **Keyboard — Esc to dismiss** | `Esc` dismisses; tooltip has no other keyboard ops because it is text-only and non-interactive. | `Esc` dismissal is an **open decision**. | **GAP.** Carbon treats this as required; Composa hasn't committed. |
| **Screen reader — describedby vs labelledby; role** | Trigger uses **`aria-labelledby`** to announce tooltip text. The tooltip span has **`role="tooltip"`** with **`aria-hidden="true"`**. | Anchor wired with **`aria-describedby`**; for icon-only controls the `label` is also the accessible name. No `role="tooltip"`, no `aria-hidden` mention. | **GAP (conflict).** Carbon labels (name) via `aria-labelledby`; Composa describes via `aria-describedby`. For an icon-only button the tooltip IS the name → Carbon's `labelledby` is arguably more correct. Needs an explicit decision. |
| **Content — length / no interactive content** | Icon-only: concise 1–2 word description. Definition/instructive: sentence case, complete sentences w/ punctuation. **Do NOT include interactive elements** (buttons/links/images) → use a toggletip. **Do NOT** put essential/critical info in a tooltip → use helper text. | 3–20 chars, basic info; optional shortcut hint; "don't put essential info only in a tooltip." But the **Action tooltip** variant explicitly embeds inline actions (Edit/Send). | **GAP (direct conflict).** Composa's Action-tooltip embeds interactive content — the exact thing Carbon prohibits in a hover tooltip. |
| **When to use tooltip vs toggletip vs popover** | Tooltip = non-interactive supplemental text. Toggletip = interactive content on click. Popover = the base layer both build on; for richer disclosure. | "Avoid when you need to explain at length — use a callout or popover with heading + text." No toggletip in the decision tree. | **GAP.** Decision tree missing the toggletip rung. |
| **Do / don't** | Do: apply to icon-only controls without labels; succinct directive text; use helper text for pertinent info. Don't: critical info in tooltip; interactive elements in tooltip; icon-only button with no tooltip/name. | Use to name icon-only controls / short secondary info; avoid when control already labeled or when long explanation needed. | **Mostly covered**, minus the two interactive/critical-content don'ts (rooted in the missing toggletip split). |

## Proposed fills

Inferred for Composa (dense desktop-app, base-4 grid). All token names are Composa names already in `tooltip.md`; new ones marked `_(proposed)_`. Carbon citations are from the pages fetched above.

1. **Split out a Toggletip pattern / re-home the Action tooltip.** Add a sibling pattern (Toggletip) opened on **click or Enter**, for content that contains interactive elements (the editable-URL + Edit/Send "Action tooltip" belongs here, not in the hover Tooltip). Add a one-line forward-reference from `## Usage` → "Avoid a tooltip when". `_(proposed)_`
   - Target: `## Usage` (when-to-use / when-not) + move the **Action tooltip** bullet out of `## Style` Variants.
   - Carbon: "A toggletip is used on click or enter when you must expose interactive elements." / "Do not include interactive elements (use toggletips for buttons, links, or images)."

2. **State the no-interactive-content rule explicitly.** Add to `## Usage` content rules: a hover tooltip is text-only; anything clickable goes in a toggletip/popover. `_(proposed)_`
   - Target: `## Usage` → Content.
   - Carbon: "Should not contain essential task instructions… Do not include interactive elements."

3. **Add a Definition tooltip variant.** In-text trigger (term/abbr) with a dotted underline; opens on hover or focus; sentence-case full-sentence content. Tokens: trigger underline `color.border.strong` _(proposed)_; open container reuses `color.bg.tooltip` / `color.text.tooltip`; focus ring `color.border.focus` _(proposed)_ + `color.border.interactive` _(proposed)_ underline.
   - Target: `## Style` Variants + a row in the states table.
   - Carbon style.mdx: Definition trigger `$border-strong`, focus `$focus` + `$border-interactive`; "remains a separate component."

4. **Lock keyboard reveal + `Esc` dismissal (resolve the open decisions).** Promote from Open decisions to firm Accessibility rules: focus on the anchor reveals the tooltip; `Esc` dismisses without moving focus; focus-out also dismisses. `_(proposed)_`
   - Target: `## Accessibility` (key/result table per `_PLAN.md` template) — remove the matching `## Open decisions` entries.
   - Carbon a11y.mdx: "Tooltips appear automatically when the trigger receives focus… disappear when focus moves away or when the user presses Esc." / "contain only text and are not interactive, so they do not have any other keyboard operations."

5. **Resolve the `aria-describedby` vs `aria-labelledby` question.** For icon-only controls where the tooltip IS the accessible name, prefer `aria-labelledby` (Carbon); keep `aria-describedby` only when the control already has a visible name and the tooltip is supplemental. Add `role="tooltip"` + `aria-hidden="true"` on the tooltip span. `_(proposed)_`
   - Target: `## Accessibility`.
   - Carbon a11y.mdx: "The span containing the tooltip has a role of `tooltip` with `aria-hidden=\"true\"`… The trigger uses `aria-labelledby` to announce the tooltip text."

6. **Add an alignment axis + min-clearance to placement.** Beyond side (top/bottom/left/right), add **start / center / end** alignment to avoid off-page bleed, and a min **`spacer.4`** (16px) clearance from the viewport bottom edge. Consider changing the default from fixed "below" to **auto** (edge-detecting). `_(proposed)_`
   - Target: `## Behavior` → Placement.
   - Carbon: "directions… set to auto… detect the edges of the browser… Containers align to start, center, or end" / "minimum 16px / 1rem clearance from page bottom."

7. **Add single-line vs multi-line sizing note.** Carbon distinguishes single-line (tight vertical padding) from multi-line (larger padding, wider max). Composa fixes one padding/max-width; document a multi-line case if action/definition variants need it. `_(proposed)_`
   - Target: `## Style` → Tokens / Structure table.
   - Carbon style.mdx: single-line vert padding `$spacing-01`, multi-line `$spacing-05`, max-widths 208/288/176px by variant.

## Not applicable

- **Carbon px/rem token values** (`$spacing-0x`, `$label-01`, `$body-01`, 288/208/176px, 6px caret) — Composa references its own token NAMES on a base-4 grid; values not imported (`_PLAN.md` rule). Used only as cross-checks above.
- **Mobile "below the icon only" rule** — Composa is a dense desktop-app surface; touch/mobile placement is out of scope (the spec already flags tooltips as unavailable to touch users).
- **Chart Tooltip** — Carbon ties this to its data-viz components; no Composa equivalent in this tier.
- **Popover as the shared base layer** — Carbon implementation detail; Composa already centralizes mounting via `OverlayHost`, which is the equivalent seam.
