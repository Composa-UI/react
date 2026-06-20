---
name: composa-ui
description: Build UI with the Composa design system (@composa-ui/react). Use whenever generating or editing React UI that uses Composa components — Button, IconButton, InputField, Dropdown, SegmentedControl, Tabs, Switch, Radio, Checkbox, Tooltip, Dialog, Menu/MenuRow, the editor shell, inspector, slides navigator — or when the user mentions Composa, @composa-ui/react, or builds on top of it. Pulls real props/variants and usage rules so generated UI is on-spec, not guessed.
---

# Composa UI

Composa UI (`@composa-ui/react`) is a React component library and design system
sourced from Figma's UI3 kit. It packages controls, inputs, overlays, menus, and
whole editor surfaces. This skill makes you build *with* it correctly — using real
props and the system's rules — instead of hand-rolling or guessing.

## Before you build

1. **Read `CATALOG.md`** (next to this file) to pick the right component and its real
   props/variants. Never invent a prop or variant value.
2. **For full usage / anatomy / accessibility**, the source of truth is the Storybook:
   - Hosted (humans): `https://composa-ui.github.io/react`
   - Live MCP (optional, if running Storybook locally): `http://localhost:6011/mcp`
     exposes `list-all-documentation` → `get-documentation`. If it's available, prefer
     it — it's always in sync with the installed version.
3. **Match the version.** Props here track `@composa-ui/react@0.1.x`. If the installed
   version differs, trust the package's own types/Storybook over this file.

## Setup

```bash
npm install @composa-ui/react
```

Components are produced by a factory — you inject React, an `Icon` component, and
`createPortal`, so the icon set and portal host stay yours:

```jsx
import { createComposaComponents } from "@composa-ui/react";
import { createPortal } from "react-dom";
import { Icon } from "./your-icon-set"; // any icon component taking { name }

const { Button, IconButton, Dropdown, OverlayHost /* … */ } =
  createComposaComponents(React, { Icon, createPortal });
```

Import the styles once: `import "@composa-ui/react/styles.css"` (ships inside
`@layer composa`, so your app's global CSS can't clobber it).

## Golden rules (the ones people get wrong)

- **Icons are slots.** Components render whatever `Icon` you injected. If icons come
  up empty, you didn't inject an `Icon` — fix the factory call, don't patch components.
- **Overlays need an `OverlayHost` ancestor.** Every tooltip, menu, and inspector
  dialog portals into the nearest `OverlayHost`. No host → tooltips/menus don't show.
  Wrap any surface (or your app root) in `<OverlayHost>`.
- **Theme through `--composa-*` tokens, never class overrides.** Change a token (color,
  size, radius, space) and every component follows. The same token names resolve to
  different values in light vs `[data-composa-mode="dark"]`, so dark mode is a data
  switch, not new CSS.
- **`primary` is brand orange `#ff5c16`, not blue.** Deliberate Composa divergence from
  Figma's accent blue. Link text and focus rings stay blue. One `primary` per view.
- **IconButton requires `label`** (its aria-label + tooltip). **ToggleButton active =
  blue icon** on a pale-blue tint, driven by `pressed`.
- **Dropdown is an input, not a button** — white through every state; active/open shows
  a blue *border*, never a fill. **SegmentedControl** is single-select (white pill on a
  gray track). For one value among few, use SegmentedControl; for many, Dropdown.
- **Don't overload `options`** for grouped/checkmark/shortcut rows — compose `Menu` /
  `MenuRow` instead.

## Workflow

1. Pick the component from `CATALOG.md` (and the right one — the catalog notes when to
   use a sibling instead).
2. Drive it from your model: pass `value`/`pressed`/`onClick`/`onValueChange`. The
   `state` prop is a visual override for docs, not real interactivity.
3. Wrap transient-overlay surfaces in `OverlayHost`.
4. Theme via tokens. Keep the icon set injected once at the factory.

If a component's behavior seems to contradict this skill, the installed package's
Storybook/types win — and that's worth reporting upstream.
