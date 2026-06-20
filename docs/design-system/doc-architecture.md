# Component documentation architecture

**Storybook is the single source of truth for Composa component guidelines.**

Every opinionated rule — when to use a component, the do/don't, the active-state
treatment, the sizing — lives in the component's Storybook Docs page, authored as
an MDX page next to its stories in `src/react/stories/`. Nothing here should be
duplicated into the Composa skill, the README, or a parallel markdown file. Those
surfaces POINT at Storybook; they do not restate it. A rule restated in two places
drifts; a rule with one home does not.

This meta-doc defines the shared page template so every component reads the same
way for both a human (designer/engineer scanning for the rule) and an AI agent
(building against the system and needing the contract verbatim).

## Where guidelines live

| Layer | Home | Role |
|---|---|---|
| Component guidelines, anatomy, specs | **Storybook MDX docs page** (`*.mdx` with `<Meta of={…} />`) | Single source of truth. Authoritative prose. |
| Live component + controls | Storybook stories (`*.stories.js`) | Runnable examples, the prop playground. |
| How to build a component | `docs/design-system/composa-component-builder.md` | Process, not per-component rules. |
| Conceptual framing (blocks, layers, lineage) | `src/react/stories/_overview.mdx` | The mental model. |

The per-component reference markdown under `docs/design-system/components/` is an
engineering-detail backstop (fidelity audits, token-level CSS notes). The
**Storybook page is canonical**; if the two disagree, Storybook wins and the
markdown is updated to match.

## The page template

Each component gets one MDX docs page attached to its CSF meta with
`<Meta of={ComponentStories} />`. Setting the CSF meta's tag to `["!autodocs"]`
(or omitting the global `autodocs` tag for that story) hands the Docs tab to the
MDX page instead of the auto-generated one, so the page below fully owns the
component's documentation. The page is organized into clearly separated, anchored
sections — the reader can jump to "Guidelines" or "Code & Specs" the way a tabbed
page would route them, without an extra addon.

Section order is fixed so the docs read consistently across the library:

### 1. Title + one-liner + capability

The component name, a single sentence on the one job it does, and a one-line
**Capability** field (see below).

### 2. Guidelines (the opinionated layer)

The heart of the page. Written so a reader knows what to reach for without reading
the code. Contains:

- **When to use it / when not.** A two-column "use this vs use a sibling" table.
- **The rules.** The non-obvious, opinionated constraints — the things a fresh
  consumer gets wrong. Each as a short, concrete, one-line bullet.
- **Do / Don't.** Grounded in the Figma component-guideline frames AND the rules
  discovered in code or set by the founder. Each bullet one line, concrete.

Seed this section from BOTH sources and reconcile them:
1. The **Figma component-guideline frame** beside the component in the UI3 kit
   file `4kilp0ShQiYsoUPJdleqEH` (read it with `get_metadata` / `get_screenshot`).
2. The **rules in code and from the founder** (the active-state treatment, the
   rounding contract, the overlay-host requirement, icon sizing, and so on).

### 3. Anatomy

The visible parts in render order, what each is, and which prop toggles the
optional ones. A numbered list keyed to the rendered DOM. Accurate to the actual
component, not the Figma layer names.

### 4. Code & Specs (the implementation layer)

The factual reference an AI agent or engineer builds against:

- **Props** table sourced from `src/react/factory.js` and
  `design/component-api.json`: `Prop | Type | Default | Description`.
- **Sizes & width**, **States**, and **Tokens** as the component defines them,
  with resolved pixel values. Flag any Composa divergence from the Figma source
  and label it deliberate, not a defect.
- **Import + minimal usage** snippets with real prop names and defaults.

Keep Anatomy and Code & Specs accurate to the shipped component. Keep Guidelines
opinionated.

## Capability label (required)

Every component — especially modules and templates — must declare one capability
on its one-line **Capability** field, because a consumer cannot tell from a
Storybook screenshot whether a surface can drive a real data model:

- **Controllable** — exposes `value` / `on…Change` (or equivalent) and can be
  wired to a live model. This is the real editing path.
- **Presentational** — holds internal state and/or hardcoded sample data; it is a
  layout preset for Storybook, not a two-way-bound surface. Useful as a reference
  composition, not as the editing seam.

Concrete reason this exists: `EditingInspector` looks like the north-star
inspector but is a **presentational preset** — it keeps its own `useState`,
ships hardcoded sample selection colors, and exposes no general value/onChange. A
consumer who wires the app to it gets a dead end. The live editing path is the
**section primitives** (`PositionSection`, `LayoutSection`, `AppearanceSection`,
`StrokeSection`, …), which ARE controllable: `value` in, `on…Change` out. The
capability label makes that distinction unmissable on the page itself.

A controllable component's page should link to the **live-binding reference**
(see `src/react/stories/live-binding.mdx`) so a consumer sees the full loop:
selection → value in → `onChange` out → model mutation → re-render.

## Rollout order

The four exemplars below establish the template. Roll the rest out in this order,
highest-traffic first:

1. **Done (exemplars):** ToggleButton (on the Buttons page), ControlGroup,
   SegmentedControl, Dropdown, ColorPickerDialog.
2. **Base controls next:** Button, IconButton, SplitButton, InputField, Checkbox,
   Radio, Switch, Tabs, Tooltip, Menu / MenuRow, Badge, ListCell.
3. **Modules:** InspectorHeader, LayerHeader, PositionSection, LayoutSection,
   AppearanceSection, StrokeSection, FillSection, ExportSection, EditorToolbar,
   AppNavigationRail, plus the remaining inspector dialogs (TypographyDialog,
   LayoutGuideSettingsDialog, StrokeSettingsDialog, ExportSettingsDialog).
4. **Templates:** EditingInspector (label as preset), EditorShell, SlidesEditor.

Each new page reuses this template and ships its Guidelines seeded from the Figma
guideline frame plus the code/founder rules.
