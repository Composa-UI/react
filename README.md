# Composa UI

A React component library modeled on Figma's UI3 interface patterns, built component-first and driven by a Storybook workbench. Components map to design tokens and to their Figma source, so what a designer sees and what a developer ships stay in step.

> **Status:** alpha (`0.1.x`). APIs, states, and tokens are still moving — treat minor versions as potentially breaking until `1.0`. The work in the open is the point: each change lands as a documented pull request.

## Why Composa

Most design-to-code gaps come from three places: components whose props don't match their Figma properties, values hardcoded instead of tokenized, and icon sets bundled in a way that locks you to one library. Composa is built to close all three.

- **Components map 1:1 to Figma.** Props, variants, and states trace to real Figma component properties. A contract verifier (`npm run check`) fails the build when the React surface and the design definition drift apart.
- **Icons are slots.** Components accept icons as passed-in nodes. Composa bundles no proprietary icon set; it interoperates with open libraries like Lucide and React Icons.
- **Tokens are the source of values.** Colors, spacing, and typography come from design tokens exported from Figma, never from hardcoded values.

## Install

Composa targets React 18.3+ and 19.

```bash
npm install @composa-ui/react
```

```jsx
import { Button, InputField } from "@composa-ui/react";
import "@composa-ui/react/styles.css"; // component styles
import "@composa-ui/react/tokens.css"; // design tokens (light + dark)

function Example() {
  return (
    <Button variant="primary" size="medium">
      Save
    </Button>
  );
}
```

**Icons are slots.** Composa ships no content-icon set — only the structural glyphs components draw for their own anatomy (chevrons, check, close). Pass your own icons (Lucide, React Icons, Material Symbols, …) into a component's `icon` slot as a node, or inject a renderer once via the factory:

```jsx
import { createComposaComponents } from "@composa-ui/react/factory";

// Resolve string icon names through your own icon set.
const { Button, IconButton } = createComposaComponents(React, { Icon: MyIconRenderer });
```

## Components

Every component has a Storybook story documenting its full prop surface, variants, and states.

- **Buttons** — Button, IconButton, ToggleButton, SplitButton
- **Inputs** — InputField, NumericInput, NumericInputMulti, ColorInput, ComboInput, Dropdown
- **Selection** — Switch, Radio, Checkbox, SegmentedControl, Tabs
- **Overlays** — Tooltip, Dialog, Menu (with MenuRow, MenuDivider, MenuFooter, MenuHeadingCell)
- **Layout & data** — ListCell, VerticalCell, TextPair, Header, Label, Tree (the layers/list primitive)
- **Canvas** — CanvasSelectionOverlay

## Development

```bash
npm install
npm run storybook         # component workbench
npm run check             # contract + entrypoint verification, prints "ok": true
npm test                  # unit tests
npm run build-storybook   # static Storybook build
```

See [CONTRIBUTING.md](CONTRIBUTING.md) for the working model and the checks a change has to pass.

## Roadmap

- **Token pipeline.** A Style Dictionary pipeline compiles one JSON source to CSS, JS, and Swift via `npm run build:tokens`, with a parity gate that proves no variable value drifts. Next: extract it into a standalone `@composa-ui/primitives` package so web and any future native target share one source of truth.
- **Figma state parity.** Bring every component's states into exact alignment with its Figma source.
- **Documentation site.** An MDX site covering usage, design guidance, and component rationale.

## License

[MIT](LICENSE) © 2026 Samuel Alake

The built-in structural glyphs are derived from Google's [Material Symbols](https://github.com/google/material-design-icons) (Apache-2.0); see [THIRD-PARTY-NOTICES.md](THIRD-PARTY-NOTICES.md).
