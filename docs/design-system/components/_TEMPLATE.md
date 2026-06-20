<!--
Composa UI component doc template.

NOTE: Storybook is the single source of truth for component GUIDELINES (see
docs/design-system/doc-architecture.md). This markdown file is the engineering
backstop — fidelity audits, token-level CSS notes, prop tables. The opinionated
"when/why/do/don't" lives on the component's Storybook MDX docs page. Keep the two
consistent; if they disagree, Storybook wins.

PURPOSE: One doc per component family, written for BOTH a human (designer/engineer)
and an AI agent building against the system. Ground every claim in source:
component-api.json, the factory signature in src/react/factory.js, the story args
in src/react/stories/*, the CSS in styles/*, and the Figma source file
(4kilp0ShQiYsoUPJdleqEH). Do not invent props, defaults, or values.

VOICE: Short declarative sentences. Lead with the point. Proof-forward. No em
dashes. No inflation. Do not use the words "genuinely", "honestly", or
"straightforward". Prefer tables over prose where a table fits. Use real prop
names and real defaults from the code.

Fill every section. Delete the HTML comments as you go, or keep them if useful.
Keep section order and headings stable so the docs read consistently across the
~18 components.
-->

# ComponentName

<!-- One sentence. What this component is and the single job it does. -->

**Capability:** Controllable | Presentational
<!--
REQUIRED. Controllable = exposes value / on…Change and can drive a live model
(the real editing path). Presentational = internal state and/or hardcoded sample
data, a Storybook layout preset, not a two-way-bound surface. State which, in one
line. See docs/design-system/doc-architecture.md.
-->

## Overview

<!--
What it is. When to use it (and when to reach for a different component instead).
The Figma component(s) it maps to: give the component-set NAME and the node id
from component-api.json (the `figma` array). If the family spans multiple Figma
sets, list each. State the Composa source file (src/react/factory.js) and the
@composa-ui/react export name(s).
-->

## Anatomy

<!--
The visible parts, in render order. Label, leading icon, trailing icon, chevron,
dot, container, divider, etc. Note which parts are optional and what prop toggles
each. A simple labeled list is fine. Reference the Figma anatomy if it defines one.
-->

## Props

<!--
Markdown table sourced from component-api.json + the factory signature in
src/react/factory.js. Columns: Prop | Type | Default | Description. List enum
values inline in the Type cell. Mark required props (no default in the signature
and needed to render meaningfully) with "Required" in the Default cell. Note any
prop the factory accepts but that is undocumented in component-api.json, and any
back-compat alias. End with a note that extra props spread to the root element.
-->

| Prop | Type | Default | Description |
|---|---|---|---|
|  |  |  |  |

## Variants

<!--
Each variant value with one line on when to use it. Use the exact variant token
the code accepts. Where Composa diverges from the Figma source (different value,
extra variant, shared vocabulary), say so and label it a deliberate divergence,
not a defect. A table (Variant | Use when | Notes) works well.
-->

## Sizes & width

<!--
The size axis (height) and the width axis, as SEPARATE axes. Give the resolved
pixel values per size. Note where Composa split width out of Figma's conflated
"Size" axis, and any size that is a Composa addition with no Figma source (flag
it). State the default for each axis from the factory signature.
-->

## States

<!--
default / hover / active / focus-visible / disabled, plus selected/pressed for
toggles. Describe the visual treatment per state and how the state is reached (CSS
pseudo-class, the `state` prop, a boolean like `disabled`/`pressed`, or an ARIA
attribute). Note states that are interactive (browser-driven) vs. forceable via
the `state` prop for documentation/screenshots.
-->

## Usage

<!--
Do / Don't bullets grounded in the Figma Guidelines blocks for this component
where they exist. Cover variant choice, count/placement, label wording, icon use,
and width. Keep each bullet one line and concrete.
-->

**Do**

-

**Don't**

-

## Accessibility

<!--
Native element/role. Keyboard behavior. The required accessible label (note where
an icon-only control needs an explicit label prop). Focus ring treatment. Disabled
semantics. Pressed/selected ARIA for toggles. Ground in what the factory actually
renders (the element, aria-* attributes, native disabled).
-->

## Code

<!--
Import line from @composa-ui/react, then 2-3 real usage examples using the actual
prop names and default-aware values. Show the most common case first, then a
variant/size case, then an icon or state case. Keep snippets minimal and correct.
-->

```jsx
import { ComponentName } from "@composa-ui/react";
```
