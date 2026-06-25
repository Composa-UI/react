# Composa annotation system — spec

A code-native, **AI-readable** component annotation system for Composa's Storybook. It
adapts the accessibility-annotation *vocabulary* of the **GitHub Annotation Toolkit**
(itself forked from **CVS Health's Web Accessibility Annotation Kit**, CC-BY 4.0) into
durable, structured annotations that live in the **story source** and render as Figma-style
redlines.

> **Attribution / license.** Vocabulary, type taxonomy, and tier model adapted from the
> GitHub Annotation Toolkit (`github/annotation-toolkit`), forked from CVS Health's Web
> Accessibility Annotation Kit. Licensed **CC-BY 4.0** — attribute on any public release. We
> adapt the *taxonomy and guidelines*, not their Figma assets.

## Why this exists

Their load-bearing claim, which is also ours: *"accessible components don't guarantee
accessible implementations"* — arranging accessible components can still create barriers, and
~40% of a11y issues are annotation-preventable. The a11y/behavioral layer isn't in the
visuals or the props; it must be **authored**. This system is how we author it so both humans
(redline overlay) and AI (the skill, reading the source) can consume it.

## Two deliberate adaptations (founder-aligned 2026-06-22)

1. **Durable, not ephemeral.** Their annotations are explicitly *"a moment in time… not a
   source of truth."* Ours are the **opposite**: an annotation is part of the component's
   **durable contract**, authored in the story source, versioned with the code. We adopt their
   *vocabulary*, not their ephemerality.
2. **Component scope first.** Roughly half their taxonomy is **page/composition-level**
   (heading hierarchy, landmarks, reading/focus order across a page, language). Those belong on
   **template/page stories**, not isolated component stories. We start with the
   **component-intrinsic** set and add composition scope later (see Deferred).

## The model: Stamp + Detail, joined by a number

Mirrors the toolkit exactly:
- **Stamp** — a marker *on / pointing at* the element. Carries only a **number**, never the
  content. Three forms:
  - `pin` — dotted-line pointer to one specific element (e.g. the knob).
  - `bracket` — spans a section/region with no clean single boundary (e.g. a row of segments).
  - `lasso` — wraps a group with flexible label placement.
- **Detail** — the rich content, in a **numbered card off to the side** (the margin), keyed to
  its stamp by the number. Holds role / ARIA / keyboard / behavior. **Never on the component.**

**Rendering layout:** `[ component with numbered stamps ]  |  [ Details column: one card per number ]`.
Keeping details off the component also fixes legibility on small controls.

## Schema

Annotations are declared on a story under `parameters.annotations` — an array of objects.
One object = one stamp↔detail pair.

```js
// <component>.stories.js
export const Anatomy = {
  render: () => /* the real component */,
  decorators: [withAnnotations],
  parameters: {
    annotations: [
      {
        n: 1,                       // stamp↔detail number (unique within the story)
        target: ".composa-switch",  // CSS selector for the element the stamp points at
        marker: "pin",              // "pin" | "bracket" | "lasso"  (default "pin")
        type: "interactive",        // annotation type — see catalog
        // ── type-specific Detail fields ──
        role: "switch",
        accessibleName: "the `label` prop (aria-label, not visible text)",
        keyboard: [{ keys: "Space / Enter", result: "toggles on/off" }],
        states: [
          { state: "on / off", aria: "aria-checked: true | false" },
          { state: "mixed",    aria: "aria-checked: mixed" },
        ],
        note: "",                                       // optional freeform
        tier: { priority: "mandatory", difficulty: "easy" }, // optional
      },
      { n: 2, target: ".composa-switch-thumb", marker: "pin", type: "part",
        name: "Knob", desc: "the thumb that slides across the track to show state" },
    ],
  },
};
```

**Shared fields (every annotation):** `n` (number), `target` (selector), `marker`
(`pin`|`bracket`|`lasso`, default `pin`), `type`, `note?` (freeform), `tier?`
(`{ priority, difficulty }`).

## Type catalog — component scope (build these first)

Ordered by their tiers (Mandatory + Easy first). Each maps to a GitHub toolkit type.

| `type` | Maps to | Detail fields | Tier (priority / difficulty) |
|---|---|---|---|
| `part` | — (our generic anatomy label) | `name`, `desc` | n/a (documentation) |
| `interactive` | button + user-interactions | `role`, `accessibleName`, `keyboard: [{keys,result}]`, `states: [{state,aria}]`, `disabledReason?` | mandatory / easy |
| `link` | link | `accessibleName`, `linkTarget: "same"|"new"`, `linkType: "default"|"tel"|"email"|"download"` | mandatory / easy |
| `media` | media | `mediaType: "image"|"video"|"audio"`, `decorative: bool`, `accessibleName`/alt, `alternatives?` (captions/transcript) | mandatory / easy |
| `form-element` | form-element | `control`, `label`, `required: bool`, `error`, `describedBy?`, `autocomplete?`, `inputmode?` | mandatory / moderate |
| `live-region` | system-feedback | `feedbackType: "error"|"warning"|"success"|"info"`, `role: "status"|"alert"|"progressbar"|"timer"|"log"`, `ariaLive: "polite"|"assertive"`, `template?` | nice-to-have / advanced |

`part` is the plain anatomy label (no a11y semantics) — covers the generic "clarify the
component's parts" case. The rest carry the GitHub/CVS a11y vocabulary.

> **`interactive` is a Composa extension, not a GitHub type.** Their taxonomy is
> *element*-oriented (`button`, `link`, `form-element`). Composa has composite ARIA-pattern
> widgets (Switch, Tabs, SegmentedControl, Menu) that aren't a single HTML element, so
> `interactive` merges their `button` + `user-interactions` *fields* (role, accessible name,
> keyboard, states) into one widget-level type. Use the faithful names (`link`, `media`,
> `form-element`, `live-region`) wherever they fit; reach for `interactive` only for composite
> widgets. Flagged as ours so the deviation is honest.

## Tier model

Two axes, used to filter/sequence (not to gate):
- **Priority:** `mandatory` → `ideal` → `nice-to-have`.
- **Difficulty:** `easy` → `moderate` → `advanced`.
Strategy (theirs, adopted): annotate Mandatory+Easy first. A future decorator option can show
only a chosen tier.

## Deferred — composition scope (template/page stories, later)

These depend on how components are **assembled**, so they annotate template/page stories, not
component stories: `heading` (level), `landmark` (role/name), `ordering`
(focus/reading/arrow-stop + sequence), `list`, `table`, `metadata` (lang/title). Not built in
the first pass.

## Measurement — a separate concern (not part of this system)

Spacing/sizing redlines are **not** a11y annotations and are out of scope here. Confirmed
empirically via the Figma MCP (2026-06-22): on an annotated frame it returns a11y annotations
as `data-annotation` / `data-development-annotations` on the element, but **measurements come
back only as the code's intrinsic sizes** (`w-[32px]`, `gap-[8px]`) — never as an annotation
attribute. So even Figma treats measurement as inherent layout data, not an annotation layer.
For Composa, measurements already live in the **Style → Structure token tables** and should
render *from tokens* if a visual redline is ever wanted — a separate, token-sourced layer that
may reuse this stamp/detail *mechanism* but is not an a11y annotation type.

## AI-readability contract

The annotation is consumed two ways — **both from one source** (`parameters.annotations`):
1. **Story source (primary).** An agent working in the repo reads `parameters.annotations`
   directly — structured, complete, durable.
2. **Rendered DOM (secondary).** The decorator stamps `data-annotation`,
   `data-annotation-index`, `data-annotation-type` onto the real target element, so an agent
   reading serialized HTML sees the annotation on the precise element (mirrors Figma's
   `data-annotation`).

**Not the MCP — for now.** `@storybook/addon-mcp` does not surface custom `parameters`
(verified 2026-06-22, `get-documentation-for-story` returned none of the annotation data).
The MCP channel is intentionally **out of scope** — the source-file channel is the target
consumer. But the schema is **MCP-ready**: the annotation data already lives as structured
`parameters`, so if the addon later exposes custom params/decorators, annotations flow
through the MCP with **zero rework**.

## Rendering (the `withAnnotations` decorator)

Reads `parameters.annotations`; for each annotation:
1. Find `target` in the rendered DOM (selector).
2. Stamp `data-annotation` / `-index` / `-type` on that element (AI-readable from DOM).
3. Draw the **stamp** per `marker`: `pin` = numbered chip + dotted leader line; `bracket` =
   bracket spanning the element bounds + number; `lasso` = rounded outline around the
   element/group + number.
4. Render the **Details side panel**: one numbered card per annotation, showing `type` + the
   type-specific fields (role, accessible name, keyboard table, states, note).

The component renders at **real size**; stamps sit on it, details sit to the side. Built on
the existing redline prototype (`_anatomy-decorator.js` → to be renamed `_annotations.js`,
`withAnatomy` → `withAnnotations`, `parameters.anatomy` → `parameters.annotations`).

## Open decisions

- **Rename** `parameters.anatomy`→`annotations` and `withAnatomy`→`withAnnotations` (planned).
- **Source of truth:** code (story params) for now — durable. A Figma→code sync (the MCP
  returns `data-annotation`) is possible later but not built; don't maintain two sources.
- **Marker defaults:** `pin` for a specific element; `bracket`/`lasso` for a region/group —
  authored per annotation.
- **Addon packaging:** if this becomes a standalone Storybook addon, the schema + decorator +
  type catalog here are the core; CC-BY attribution required.

---

## Taxonomy correction (2026-06-22) — supersedes the Type catalog above

Founder-settled model. Component annotations are **three top-level types** (+ tokens, TBD):

1. **accessibility** — the CVS/GitHub annotation *family*. It has sub-types (interactive,
   form-element, link, media, live-region, heading, landmark, … **and `note`**, the
   `basic-notes` catch-all). Renders as a **numbered pin stamp + a margin Detail card**.
   `note` is NOT a new top-level type — it nests here.
2. **variant** — names a state/variant of the instance (e.g. "On"). Renders as a
   **label-only tag** (no card).
3. **redline** — a measurement. Renders as a **dimension line spanning the measured extent
   (with end ticks) + a value** (e.g. `32`); no card. Fields: `dimension: "width"|"height"`,
   `value`. (This reconciles the earlier "measurement is separate" note: redline is the
   *manual* measurement annotation type; the auto, token-rendered Structure tables remain a
   separate, generated layer. A redline's value may be sourced from those tokens.)

**Dropped:** the invented `part` type (overlapped note/variant; not in the model).

**Detail card?** Only the accessibility family (incl. note) gets a margin card. variant and
redline are label/line-only — confirming "a Details card is not always necessary" (the
toolkit's "Show number off" = label-only stamp).

**Colour is incidental** and varies by type (a11y green / variant purple / redline magenta) —
not load-bearing.

**Rendering:** stamps are SEPARATE from cards (joined only by the number), and all connectors
are ORTHOGONAL (pin lines up/down/left/right via `side`; redline lines span the dimension).
No diagonal lines.

**Markers DONE (2026-06-22):** `pin` (orthogonal pointer), `bracket` (span + caps toward the
element + label), `lasso` (outline + label), plus the redline dimension line. **anatomy is
back** as a label type — per the line+label model, it's a bracket/lasso line + a name label
(not a separate system). Switch `Markers` story demos bracket + lasso.

Still open: rollout beyond the Switch (Dropdown, InputField, Notification, SegmentedControl);
the **tokens** type (custom vs the `storybook-design-token` addon).

---

## Model v2 — three systems (founder-settled 2026-06-22) — AUTHORITATIVE

Supersedes the type discussion above. Component annotations are **three systems**. System 1 is
a faithful **codification of the GitHub/CVS toolkit**; Systems 2 & 3 are **additive Composa
contributions** on top of it.

### Shared primitives
- **Markers (the line shape):** `pin` (orthogonal pointer), `bracket` (spine + caps toward the
  element + connector), `lasso` (dotted rect + dotted connector), `caret` (a small diamond/
  triangle pointer). Markers are shared across systems.
- **Label = a pill:** `[ badge ][ icon ][ text ]`. The badge + icon + text + colour are what
  identify the annotation; the marker just points.

### System 1 — Accessibility annotations (codify the toolkit)
A **per-type registry**. Each GitHub element type has its own identity:

| type | badge | icon | colour | label text | Detail card |
|---|---|---|---|---|---|
| `interactive`/`button` | number | stack | green | "Button" / component | element, type / role, name, keyboard, states |
| `heading` | **level** (`h1`–`h6`) | heading | teal | (level) | optional |
| `landmark` | number | region | magenta | the element (`<header>`) | element, accessible name, role |
| `link` | number | link | blue | "Link" | accessible name, target, link type |
| `form-element` | number | input | amber | control | label, required, error, describedby |
| `image` | number | image | purple | "Image" | decorative?, alt/accessible name |

- The **Detail card is OPTIONAL** — rendered only when the annotation carries notes/properties
  (a stamp can be label-only). `note` is the catch-all sub-type (card with freeform text).
- **Heading is special:** the badge is the *level* (`h1`…), and it gets a *separate* detail
  number when carded.
- Icons + colours are per-type identity (incidental but distinguishing).

### System 2 — Variant (additive) — its OWN label
Labels which Figma variant/state an instance is (e.g. "On", "Focus"). **Not** the a11y pill —
a **Figma-aligned label** (variant glyph / diamond). Connector is **case-by-case**: `caret`
(echoing Figma's variant pointer) or a shared line (`pin`/`bracket`/`lasso`). Founder still
deciding caret-vs-line per case.

### System 3 — Measurement / redline (additive)
A **dimension line** spanning a measured extent (`dimension: width|height`) + end ticks + the
**value** (e.g. `32`). No card. Distinct colour. Value may be sourced from `get_variable_defs`
or the Structure token tables.

### Why this matters (AX)
Screen readers do **not** read these annotations — they read the shipped component's real ARIA.
Codifying the annotations is valuable *upstream*: machine-readable a11y **contract** that (a)
CI can verify the real component against, (b) AI/engineers build correctly from. Better
implementations → better SR outcomes. That gap (machine-readable a11y contract for AI + CI) is
the novel "AI + accessibility" angle.
