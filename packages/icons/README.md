# @composa-ui/icons

Curated icon primitives for Composa UI.

This package is the home for icons that should be reused across `@composa-ui/react` and future platform packages. The first implementation stores SVG definitions as React components while preserving the upstream Material Symbols name in metadata.

## Usage

```jsx
import { Icon, PlayArrowIcon } from "@composa-ui/icons";

<Icon name="chevron-down" size={16} />
<PlayArrowIcon size={24} strokeWidth={1.35} />
<Icon name="more" size={24} />
```

For live Material Symbols axes at runtime, import the font CSS once and render the
symbol by name:

```jsx
import "@composa-ui/icons/material-symbols.css";
import { MaterialSymbol } from "@composa-ui/icons";

<MaterialSymbol name="play_arrow" size={24} opticalSize={24} />
<MaterialSymbol name="keyboard_arrow_down" size={16} />
```

`material-symbols.css` loads the outlined, rounded, and sharp WOFF2 files bundled
in this package from Google's `material-design-icons` repository. For tighter
bundles, import one variant:

```jsx
import "@composa-ui/icons/material-symbols-rounded.css";
```

The runtime default is rounded style, fill `0`, weight `200`, grade `0`, and
optical size `24`. Override `weight={300}` when a glyph needs to match older
embedded Composa path assets.

## Source Policy

- Prefer Material Symbols / `google/material-design-icons` for default Composa icons.
- Preserve the upstream symbol name in `source` metadata.
- Keep component names stable enough for future Code Connect mappings.
- Use `currentColor` so consuming components own foreground color.
- Add icons here before using placeholders in `@composa-ui/react`.
- Do not draw approximate icons by hand. Use the official Material Symbols font/runtime when variable weight, grade, fill, and optical sizing must remain live. Use static SVG forks only when they come from official Google Material Symbols sources and the chosen axis values are recorded.

## Current Status

The package supports two paths:

- Static curated React SVG components, forked from official Material Symbols
  source paths.
- Runtime Material Symbols via self-hosted official WOFF2 files for live fill,
  weight, grade, and optical-size axes.

`@composa-ui/react` still uses its local `src/design-system/icon-assets.js`
registry. The next migration step is to route that registry through
`@composa-ui/icons` once the package is added to the workspace or published.
