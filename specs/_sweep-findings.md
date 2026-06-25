# Component + accessibility sweep — findings (overnight, autonomous)

Goal: roll the annotation system across the base components — declare `data-part` (anatomy),
add `Parts` (anatomy) + `Accessibility` (a11y contract) stories — and log every doc-vs-code
mismatch the speccing surfaces. **No visual/style changes to the annotation renderers** (the
detail-card visual feedback is deferred to Samuel; visual changes cascade globally).

Reviewable tomorrow. Each component: parts declared, a11y contract authored, build status, and
any mismatch. Live-measure deltas are added where the browser is reachable; otherwise flagged.

## SUMMARY (read first)

**Covered: 16 components/primitives** — Switch, InputField, Checkbox, Radio, SegmentedControl,
Button, IconButton, ToggleButton, Tabs, Avatar, Label, TextPair, ListCell, Tooltip, Dialog,
Menu/MenuRow. Each got `data-part` declarations (where it has parts), a **Parts** (anatomy) story,
and an **Accessibility** story (or Typography/Heading for the text primitive). All build-verified,
committed per batch. **Additive only — no annotation-renderer or shared-style changes** (your
visual feedback + detail card are untouched).

**Mismatches found**
1. **Switch** (the big one) — rendered track **28×16** + knob **12×12**; Figma/docs say track **32**,
   row **24 with top/bottom inset**, knob **14×14**. Undersized and missing the 24px inset row.
   Needs a component CSS/token fix (not a doc fix). This is the clearest win the speccing caught.
2. No other hard dimension mismatch surfaced in the static doc-vs-CSS scan — most components
   reference tokens consistently. More will likely surface in a **live-measure pass** (eyeballing
   each story's derived redlines), which I did NOT run overnight because it needs the browser.

**Open decisions for you**
1. **Composite a11y type.** SegmentedControl / Tabs / Menu / Dialog / Tooltip are annotated as
   `type:"button"` + the real ARIA role (tablist / menu / dialog / tooltip). Keep this (type = the
   registry/style bucket, role = the truth), or add a dedicated composite type / revive `interactive`?
2. **Derive the a11y card from the live a11y tree (axe)** instead of authoring role/name/states.
   Natural next step; authored for now.
3. **Per-child annotation for composites** (per-segment / per-menuitem grids) — flagged, not built;
   needs its own story shape like the variant grid.
4. Held for you (no visual changes overnight): the **detail-card** feedback, **least-occlusion
   layout**, and the **single-path** polish.

**Not done**
- Live per-component measurement (browser-dependent); only the Switch baseline is confirmed.
- Module / Collaboration / Feedback / Pattern components (outside the base scope this pass).
- Typography token-NAME derivation (color names derive from the CSS var; type tokens currently
  show the value + an authored name).

---

## Known mismatch (baseline, from earlier)
- **Switch** — rendered track **28×16** + knob **12×12**; docs/Figma say track **32**, row **24
  with top/bottom inset**, knob **14×14**. Component is undersized and missing the 24px inset row.
  (Tracked separately; the derived redline caught it.)

## Sweep log

| Component | data-part | Parts story | Accessibility story | Build | Notes / mismatch |
|---|---|---|---|---|---|
| Switch | track, thumb | ✓ | ✓ (button + role=switch) | ✓ | see baseline mismatch above |
| InputField | (uses input/shell) | Anatomy ✓ | (form-element) | ✓ | height 24 ✓; token names derive |
| **Checkbox** | control, label, description | ✓ | ✓ (button + role=checkbox; Space; states checked/unchecked/mixed) | ✓ | mark box = `--composa-selection-control-size`; live-measure vs doc pending |
| **Radio** | control, label | ✓ | ✓ (button + role=radio; Space + arrows; aria-checked) | ✓ | same control-size token as checkbox; arrow-key group nav is group-managed, authored as intent |
| **SegmentedControl** | segment (per tab) | ✓ | ✓ (div role=tablist; per-segment role=tab + aria-selected; arrows + Enter/Space) | ✓ | COMPOSITE. Annotated as type:"button" with the real role=tablist (since we cut "interactive"). See decision below. |
| **Button** | label, hotkey (icon when present) | ✓ (Anatomy) | ✓ (native button; Enter/Space) | ✓ | thin anatomy (leaf control); a11y is the real value. Import aliased (ButtonControl) to avoid the file's existing `Button` story export. |
| **IconButton** | glyph | ✓ | ✓ (button; Enter/Space) | ✓ | a11y reinforces the golden rule: name MUST come from `label` (aria-label) — no visible text. |
| **ToggleButton** | glyph (via IconButton) | (shares IconButton) | ✓ (button + aria-pressed states) | ✓ | on/off surfaced as aria-pressed. |
| **Tabs** | tab (per Tab) | ✓ | ✓ (div role=tablist; per-tab role=tab/aria-selected; arrows + Enter/Space) | ✓ | COMPOSITE (same tablist pattern as SegmentedControl). |
| **Avatar** | image / label | ✓ | ✓ (image type; named via `alt`, else decorative aria-hidden) | ✓ | first use of the `image` a11y type; decorative-vs-named is the key call. |
| **Label** | — (single text) | — | Typography (token) + Heading (a11y, when `as` is a heading) | ✓ | presentational text primitive: annotated by what it IS (type token / heading), not parts. |
| **TextPair** | content, body, metadata | ✓ | — (presentational) | ✓ | text grouping; slots get data-part. No interactive role. |
| **ListCell** | leading, content | ✓ | — (presentational) | ✓ | layout row; leading/content get data-part (trailing is a HeaderActions component, left undecorated). |
| **Tooltip** | label, arrow | ✓ | ✓ (role=tooltip; describedby; hover/focus + Esc) | ✓ | renders standalone (no OverlayHost needed for the surface). |
| **Dialog** | header, body, actions | ✓ | ✓ (section role=dialog, aria-modal; Esc + focus-trap at call site) | ✓ | focus-trap/Esc are wired at the call site, not in the component — authored as intent. |
| **Menu / MenuRow** | item (per row) | ✓ | ✓ (div role=menu; per-row role=menuitem/-checkbox/-radio; arrows + Enter + Esc) | ✓ | COMPOSITE. data-part on the main MenuRow render (simple/complex/checkmark); heading/toolbar/divider branches left undecorated. |

## Queue
Done — all base components covered.

## Decisions for Samuel
- **Composite widgets (SegmentedControl = tablist; Dropdown/Menu/Tabs coming).** We cut the
  `interactive` a11y type, so I'm annotating composites as `type:"button"` + the real ARIA role
  (`tablist`, etc.). The type is just the registry/style bucket; the truth is in `role`. If you'd
  rather have a dedicated composite type (or bring back `interactive`), that's a quick registry add.
- **Per-segment / per-item annotation.** For composites with dynamic children (segments, menu rows),
  I annotate the container's contract + declare `data-part` on the repeated child. A per-child
  redline/role grid (like the variant grid) is possible but would need its own story; flagged, not built.

## A11y pass notes
- Interactive controls render as `<button>` with an ARIA `role` override (switch/checkbox/radio).
  Authored as `type: "button"` + the real role, mirroring the Switch pattern — consistent and
  faithful to the GitHub/CVS taxonomy (no coined per-control types).
- Visible-label controls take their accessible name from the label text; icon-only ones from
  `aria-label`. Noted per component.
- Open question for Samuel: do we want the a11y card fields (role/name/states) to *derive* from
  the live a11y tree (axe data) rather than be authored? Authored now; derivation is the next step.
