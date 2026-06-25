# Composa — doc-first rebuild plan

The durable contract for the spec-first rebuild. **Read this before writing or
editing any spec.** Branch: `composa/spec-first`.

## Why doc-first

The spec is the **source of truth**; code conforms to it and is verified against it.
Figma carries only ~60% of a spec (the visual + content + intent). The other ~40% —
behavior, timing, accessibility, dismissal, composition — is invisible in a design
file and must be **authored**, not guessed. That authored layer is the real value.

We are NOT throwing away the working implementation. We invert authority: specs become
primary, the existing factory/tokens/Storybook stay as implementation + viewer + QA,
and code is gated to match the specs.

## Import-first workflow (2026-06-20)

Two passes, because faithful capture and good organization are different jobs:

1. **1:1 import** → `specs/_import/<page>.md`. Agents transcribe every Figma guideline
   frame **faithfully and completely** — all prose, token tables, rules, example
   captions — preserving the frame's own structure, citing node ids. **No synthesis, no
   compression, no de-Figma-ification.** Goal: 100% coverage, fast, low-judgment.
2. **Re-organize — CONTENT-PRESERVING** (founder ruling 2026-06-20). Move each complete
   import into the tabbed shape (Usage/Style/Behavior/Code/Accessibility), straight into
   **Storybook DocTabs MDX** (the curated + rendered home — no separate `specs/<tier>` layer
   for components). **Do NOT summarize or trim substance** — keep all the captured prose,
   tokens, states, anatomy. The ONLY things trimmed are **Figma-product specifics** (FigJam,
   Dev-Mode/handoff, multiplayer, etc.). Import scaffolding (node ids, `[anomaly]` flags,
   `[Deferred]` markers) moves to HTML comments; prose gets light user-facing polish but is
   not condensed. (Summarizing is what lost fidelity earlier — don't.)

Foundation gaps (founder, 2026-06-20): **accessibility** and **motion** have NO Figma
guideline — skip standalone specs (each component carries its own a11y notes). **borders**
and **opacity** are derived from color (border = `color.border.*` in color.md; opacity =
the pale variants) — thin pointer specs, not separate Figma imports.

The four already-curated specs (`foundations/typography.md`, `grid.md`, `color.md`,
`atoms/tooltip.md`) are the **target shape** the re-org aims for; don't redo them — the
import covers everything else first.

## Sequence (do in order)

0. **Inventory** — `specs/_system-map.md` (DONE): 107 components, dependency edges,
   tiers. Dependency arrows are accurate; tier labels need a light hand-pass for
   wrapper components that compose via `children` (e.g. EditorShell).
1. **Foundations + tokens** — write `specs/foundations/*.md` FIRST; everything
   references them. Order: color · typography · spacing · radius · elevation · motion ·
   z-index · iconography · accessibility · breakpoints · grid · borders · opacity.
   Plus the overlay primitives (`OverlayHost`/`Portal`/`Layer`).
2. **Atoms** — hub-first: IconButton (referenced ~34×), Button, Tooltip, Label,
   Switch, Radio, Checkbox, Avatar.
3. **Molecules** — Tabs, ListCell, Menu, Dropdown, SegmentedControl, ControlGroup.
4. **Organisms** — inspector sections, editor surfaces.
5. **Regenerate/verify code** against the specs. Code last.

## Token source of truth

Canonical token values are the Figma DTCG exports (in `~/Downloads`, to be vendored
into the repo): `Mode 1` (typography) · `Default` (spacers + radius) · `Colors/{Light,
Dark,Slides-Light,Slides-Dark}`. Reconcile with `design/tokens.css`. **Specs reference
token NAMES, never raw values** (closed set; the article's rule). Raw values get
captured ONCE into tokens; everything else points at the name.

## Spec templates

### Component spec (template locked on `specs/atoms/tooltip.md`)

Sections, surfaced in Storybook as `<DocTabs>` — **Carbon-aligned 4 tabs** (we mirror
IBM Carbon as the documentation bar; Carbon folds behavior into Usage and keeps Style as
token tables):
- **Usage** — `<Canvas>`, when-to-use / when-not, variants, **behavior + states folded in
  here** (Carbon does this — no separate Behavior tab), content/label rules, do/don't.
- **Style** — the visual spec as **token tables**: **Structure** (sizes/spacing),
  **Color** (element/state → token), **Typography** (element → token). Tables, not prose.
- **Code** — the auto `<Controls>`/`<ArgTypes>` (never a hand prop table) + import.
- **Accessibility** — a **keyboard key/result table**, screen-reader + labeling, focus.

Locked exemplar: `src/react/stories/switch.mdx`.

### Foundation spec (shape, locked when we write `typography.md`)

- **Purpose** — what this foundation governs.
- **Scale / tokens** — the token table (name → value → where it comes from), rendered
  as live specimens in the doc.
- **Usage** — when to use each step; do/don't.
- **References** — Figma node + token export.

## Voice: user-facing, always

Spec prose is written **for the person using the design system** — not narrating our
process. Never write "values are exact from the Mode 1 export" or leave inline `[Code]`/
`[Figma]` tags in the body. State what the thing *is*. Authoring provenance lives in two
quiet places only:
- **HTML comments** `<!-- maintainer: … -->` for divergence/source notes (invisible in
  the rendered doc, visible in source for audit).
- An **`## Open decisions`** section at the end, listing only the things that still need
  a ruling, phrased as plain questions. Drop it once resolved.

A one-line **source citation** at the top is fine (it's a citation, like Carbon's) — the
Figma node id and the implementation file. No process narration beyond that.

## Authoring rules

- **De-Figma-ify:** strip Figma-product specifics (FigJam, Community, Growth rationale,
  editor-only variants) and state the general UX principle. Note what was dropped in a
  maintainer comment.
- **No raw values in prose** — reference token names; the value lives in the token.
- **Cross-link dependencies.** When a spec says "needs an `OverlayHost`," link to that
  component's spec (it's a real component in the system) AND show a minimal code example.
  Specs form a navigable graph, mirroring the system map.

## Framing: Foundations → Atoms → Molecules → Organisms

Adopt atomic-design tiers across **both** the specs tree and the Storybook sidebar —
it matches our dependency-depth reality and the industry/Smashing structure:
`Foundations` (tokens) · `Atoms` · `Molecules` · `Organisms` (+ `Templates` for full
product surfaces). Tier labels need the one-time hand-pass for `children`-composing
wrappers. (Storybook sidebar restructure happens when we wire specs → stories.)

## Representing images / frames (pretty AND AI-readable)

**Never embed a Figma raster.** It's unreadable to AI, drifts, and the asset URL expires.
The principle (founder, 2026-06-20): a visual earns its place when it's **generated from the
source of truth** (tokens / the live component) — not hand-placed. Strategies by type:
1. **Component specimens** (e.g. the tooltip light/dark frames) → render the **real
   component live** in Storybook via `<Canvas>` on light + dark backgrounds. Source =
   component+tokens (readable); render = beautiful. This is the standard for components.
2. **Token specimens** (type ramp, color swatches, **elevation shadow cards**, spacing bars,
   radius swatches) → render **from the tokens**. Changing a token updates the picture. This
   is the FOUNDATION visual approach and it's encouraged — the elevation shadow-card doc is
   the model (founder-approved). Add these wherever a foundation reads better with a specimen.
3. **Component-specific annotation diagrams — DROPPED** (founder, 2026-06-20). We tried an
   `<Anatomy>` helper (numbered markers over a live control + text legend); founder called it
   off — the markers crowd small dense controls and per-component placement is fussy/low-value.
   Do NOT rebuild it. Anatomy stays as **prose part-lists** (a `### Anatomy` text section), not
   a diagram. Pure conceptual diagrams with no component are still fine as inline SVG with
   `<text>` labels if ever needed — but those are not component annotations.
4. **Color ramps** → swatches rendered from tokens (already done richly in foundations-colors
   with always-visible light/dark values; a hover-Tooltip variant is optional, not required).

The spec `.md` holds prose + token references; the Storybook doc renders the live
specimens. The Figma frame is the *reference we read from*, never the *artifact we ship*.

**Deferred items cite the node:** `[Deferred: render live — ref node 2015:39072]`, so we
know the exact frame to mirror once a component exists. Provenance tags
(`[Figma]/[Code]/[Proposed]`) and node IDs may remain as scaffolding and get stripped in a
final cleanup pass — just avoid process-narration prose.

## Verification reality

Browser automation (Chrome ext + harness preview) times out against this Storybook in
this env — confirmed, not transient. So: `build-storybook` / `npm run check` are the
code gates; the **founder does visual QA**. Don't claim visual correctness I can't see.

## Collaboration

Pilot each new spec SHAPE sequentially + founder-reviewed before scaling. Only
multi-orchestrate the rest AFTER a shape is locked. Founder points at Figma node-IDs;
I pull via the Figma MCP (I don't ask for files to be transcribed).
