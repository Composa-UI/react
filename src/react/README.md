# React Adapter

This folder is the core adapter for the React component package path.

The app entry now renders with React through `src/app/react-main.js`. The React adapter keeps the same component families and prop-shaped variants so the library path can evolve without changing the Figma anchors or Code Connect contract.

## Usage

Run the product app with Vite so React and package imports resolve:

```sh
npm run dev
```

```js
import { Button, IconButton, InputField, Dropdown, Switch, Checkbox, MenuRow, SegmentedControl, Tabs } from "./index.js";
```

The components use the same CSS classes and semantic tokens as the app:

- `design/tokens.css`
- `styles.css`

Type declarations are published from `src/react/index.d.ts`, so React consumers can import the package-shaped entrypoint with prop autocomplete:

```ts
import { Button, Tabs, CanvasSelectionOverlay } from "@composa-ui/react";
```

The lower-level factory is still available when a host app needs to inject its own icon renderer:

```js
import { createComposaComponents } from "./factory.js";

const { Button } = createComposaComponents(React, { Icon: MyIconComponent });
```

## Contract

The prop source of truth is `design/component-api.json`.

Do not create one React component per Figma variant. Keep variants as props on the component family:

- `Button({ variant, size, state, disabled, iconLead })`
- `IconButton({ variant, state, disabled, pressed, icon })`
- `InputField({ variant, size, state, iconLead, dropdown, variable, mixed })`
- `Dropdown({ size, state, disabled, stroke, iconLead })`
- `Switch({ checked, size, state, disabled })`
- `Radio({ checked, state, disabled })`
- `Checkbox({ checked, state, disabled })`
- `Tooltip({ placement, tone, label })`
- `Dialog({ title, description, size, tone })` — `size`: `320`/`480` (Figma template widths) plus `small`/`default`/`large` aliases
- `MenuRow({ type, state, lead, trail, selected })`
- `SegmentedControl({ variant, state, options })`
- `Tabs({ variant, size, state, tabs })`
- `CanvasSelectionOverlay({ type, direction, width, height })`

The Figma Video app shell is now React-rendered. The remaining vanilla DOM modules are legacy/harness infrastructure until the deletion gates in `docs/design-system/vanilla-deprecation-plan.md` are met.

## Storybook

Story sources live in `src/react/stories/`, with local config in `.storybook/`. Stories are grouped under `Composa UI/Components/<Component>/Playground`. The exhaustive variant matrix is kept as a source artifact instead of a sidebar story, so Storybook stays useful as a component harness rather than turning into a giant inventory dump.

Storybook controls come from the local component API. They should align with the React prop names in `design/component-api.json`; they are not a substitute for live Figma component-property metadata.

## Code Connect

`src/figma/code-connect-map.json` records the Code Connect readiness path for each React component family. It intentionally stops short of `.figma.ts` templates until Figma returns exact published component properties for each node.
