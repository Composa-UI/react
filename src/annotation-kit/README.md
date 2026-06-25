# annotation-kit

Code-native, **AI-readable** component annotations for Storybook. Annotations render as
Figma-style redlines *and* live in the story source as structured data, so both humans (the
overlay) and machines (an agent reading `parameters.annotations`, or the `data-annotation*`
attributes stamped on the real DOM) consume one source.

> **Status:** staging package inside the Composa repo. The type **registry** is already
> modular here; the renderer extraction + npm split are mechanical and described under
> [Extraction plan](#extraction-plan).

## Three systems, one source

| System | Package (planned) | What it annotates | Origin |
|---|---|---|---|
| **Accessibility** | `@composa/a11y-annotations` | role, accessible name, keyboard, states, landmarks, headings… | **Codified** from the GitHub/CVS toolkit |
| **Variant** | `@composa/ds-annotations` | which Figma variant/state an instance is | Original Composa work |
| **Measurement (redline)** | `@composa/ds-annotations` | a dimension line + value (from tokens) | Original Composa work |
| *(shared engine)* | `@composa/annotation-core` | registry, validator, renderer, markers | — |

All three share **markers** (`pin` / `bracket` / `lasso` / `caret`) and a label, but each
system's label differs: a11y = `[number][type-icon][text]` pill; variant = rounded-rect with a
diamond glyph; measurement = a value tag on the dimension line.

## Why codify (the accessibility thesis)

Screen readers do **not** read these annotations — they read the shipped component's real ARIA.
The value of codifying is *upstream*: a machine-readable a11y **contract** that (a) CI can
verify the real component against, and (b) AI/engineers build correctly from. Better
implementations → better screen-reader outcomes. That gap — a machine-readable a11y contract
for AI + CI — is the contribution.

## Usage

```js
// .storybook/main.js  (consumer auto-registration via the preset)
export default { addons: ["@composa/annotation-kit"] };
```

```js
// <component>.stories.js — annotate via parameters; the decorator renders + validates
export const Anatomy = {
  render: () => <Switch label="Show grid" checked />,
  parameters: {
    annotations: [
      { n: 1, target: ".composa-switch", type: "button", marker: "pin", side: "top",
        element: "<button>", role: "switch",
        accessibleName: "the `label` prop (aria-label, not visible text)",
        keyboard: [{ keys: "Space / Enter", result: "toggles on/off" }],
        states: [{ state: "on / off", aria: "aria-checked: true | false" }] },
      { n: 2, target: ".composa-switch", type: "variant", marker: "caret", side: "left", value: "On" },
      { n: 3, target: ".composa-switch", type: "redline", dimension: "width", value: "32" },
    ],
  },
};
```

## Extending — types are data

A type is a config object, not renderer code, so adding/changing one is a data edit. Required
fields are validated (missing ones surface as an error banner in the overlay):

```js
import { registerTypes } from "@composa/annotation-kit/registry";

registerTypes({
  "live-region": {
    system: "a11y", color: "#1f6feb", badge: "number", label: () => "Live region",
    fields: [
      { key: "ariaLive", label: "aria-live", required: true, mono: true },
      { key: "role", mono: true },
    ],
  },
});
```

See [`a11y/types.js`](./a11y/types.js) and [`ds/types.js`](./ds/types.js) for the built-ins,
and [`registry.js`](./registry.js) for `getType` / `validate` / `registerTypes`.

## Extraction plan

1. **Done** — registry is modular (`registry.js` + `a11y/types.js` + `ds/types.js`); the
   renderer (`src/react/stories/_annotations.js`) imports it.
2. **Next (mechanical)** — move the renderer (overlay + marker/redline geometry + per-type
   icons + label renderers) into `core/overlay.js`; `index.js` re-exports it; delete the
   `src/react/stories/_annotations.js` shim. `preview.js` then imports from `./core/overlay.js`.
3. **Split** — lift `core/` → `@composa/annotation-core`, `a11y/` → `@composa/a11y-annotations`
   (with CC-BY attribution), `ds/` → `@composa/ds-annotations`, into a standalone repo
   (monorepo with `packages/*`). Composa consumes them and dogfoods.
4. **Publish** — a11y-annotations first (the citable, codified-toolkit contribution), then
   ds-annotations. *(Both #3 and #4 need owner decisions: npm scope, repo home, publish.)*

## Roadmap

- **Icons → Octicons.** Current per-type icons are hand-drawn placeholders; swap for GitHub's
  MIT-licensed Octicons (a11y) or the Composa icon set.
- **Smart positioning.** Sides are manual (`side`); an auto-layout pass (try sides, score
  overlap, pick best) can be added above the geometry layer — nothing blocks it.
- **Manager panel.** Optional Storybook panel to list/toggle/edit annotations.
- **Framework-agnostic overlay.** Currently React; a DOM/portal overlay would broaden adoption.

## License & attribution

`CC-BY 4.0`. Accessibility type taxonomy + tier model adapted from
[`github/annotation-toolkit`](https://github.com/github/annotation-toolkit) (forked from CVS
Health's Web Accessibility Annotation Kit). The **variant** and **measurement** systems are
original Composa work. Attribute on any public release.
