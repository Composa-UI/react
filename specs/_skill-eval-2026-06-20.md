# Composa skill evaluation — 2026-06-20

**Question:** is the documentation good enough for an AI agent equipped with the
`composa-ui` skill to build/answer correctly? (Content fidelity, not visual.)

**Method:** spawned 8 fresh agents, each given ONLY the skill surface — `skills/composa-ui/
SKILL.md`, `skills/composa-ui/CATALOG.md`, and `src/react/stories/*.mdx` — and forbidden from
reading component implementation source or using outside knowledge. Tasks span build / lookup
/ judgment, and deliberately probe (a) newly-added "proposed" content, (b) two unresolved
"open-decision" areas, and (c) a known CATALOG coverage gap. Graded against the docs as
ground truth. (Storybook MCP was down — `:6011/mcp` unreachable — so this tests the file
pathway, which is the skill's primary/declared path anyway.)

## Scorecard — 6 pass, 2 partial/miss, ZERO hallucinations

| # | Task | Type | Result | Note |
|---|---|---|---|---|
| 1 | Render a Switch (label, on, onChange) | build | ⚠️ Partial | Doc code example teaches `onChange`; real prop is `onCheckedChange` (drift) |
| 2 | Switch focus-ring token | lookup | ✅ Pass | `color.border.selected` / `-strong` |
| 3 | Vertical space between sibling field rows | lookup | ✅ Pass | 16px / `space-3`, **correctly flagged PROPOSED** |
| 4 | Switch vs Checkbox for save-deferred setting | judgment | ✅ Pass | Checkbox; immediate-effect rule |
| 5 | SegmentedControl ARIA + keyboard | a11y | ⚠️ Miss | Gave confident "list of buttons"; did NOT flag the unresolved conflict (it isn't in the doc) |
| 6 | InputField error state | build | ✅ Pass | Full proposed treatment + a11y; flagged proposed; noted CATALOG lacks an error state |
| 7 | Badge tones / interactivity | lookup | ✅ Pass | Answered from MDX; surfaced that CATALOG omits Badge |
| 8 | Destructive "danger" Dialog | build | ✅ Pass | Built `tone="destructive"` from CATALOG; flagged that dialog.mdx doesn't document it |

**The big positive:** the failure mode is NOT hallucination. Agents cited their sources,
correctly distinguished `_(proposed)_` content from settled, and surfaced the skill's own
gaps (CATALOG omissions, undocumented props). That validates the doc-first bet — **fixing the
docs directly fixes the skill.**

## Confirmed content-fidelity findings (the actionable output)

### A. Doc↔code prop drift (consumer-breaking)
`switch.mdx` Code tab uses `onChange`; the component is invoked everywhere as
`onCheckedChange` (`composa-component-stories.js:82`). A consumer following the skill writes a
handler that won't fire. **Likely systemic** — every component doc's hand-written code example
should be audited against the real props. Best fix: generate code examples from the component
types / CATALOG rather than hand-writing them, or at minimum reconcile each.

### B. Open decisions are invisible to skill consumers
The SegmentedControl a11y conflict (our "list of buttons" vs Carbon's roving-focus
`tablist` vs possibly `radiogroup`) lives only in maintainer notes (`_gap-analysis/`) — the
*consumable* doc asserts a single settled answer. So the skill confidently returns guidance
that may be wrong, with no "unresolved" signal. For contested/important areas (especially
a11y), the **doc itself** must carry a visible "unresolved — see open decisions" note. Ties
directly to the 6 rulings queued in `_gap-analysis/_SUMMARY.md`.

### C. CATALOG.md coverage gaps
Badge, Notification, Avatar, VisualBell, Comments are absent from `CATALOG.md` (the skill's
"pick a component" index). They're only discoverable by digging into the MDX. Regenerate
CATALOG (there's a `tools/build-catalog.mjs`) so the index covers every documented component.

### D. dialog.mdx lags the component API
The component ships `tone: default · destructive` (in CATALOG), but `dialog.mdx` never
documents the destructive tone. (This also *corrects* an earlier gap-analysis assumption that
a danger variant was "absent" — it exists in the API, just undocumented.)

## Recommendation
A short **skill-fidelity fix pass** — content work, directly on the strategic goal, no pixels:
1. **(A)** Reconcile code examples ↔ real props across the component docs (start with the
   prop-name drift; consider generating examples from types).
2. **(C)** Regenerate `CATALOG.md` for full component coverage.
3. **(B/D)** Decide how open decisions surface in-doc, and document the destructive Dialog
   tone — both tie to the 6 rulings.
Then **re-run this eval** to confirm the gaps closed. This is the fastest path to "the skill
is trustworthy," which is the real bar.
