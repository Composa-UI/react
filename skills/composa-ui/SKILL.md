---
name: composa-ui
description: Build UI with the Composa design system (@composa-ui/react). Use whenever generating or editing React UI that uses Composa components — Button, IconButton, InputField, Dropdown, SegmentedControl, Tabs, Switch, Radio, Checkbox, Tooltip, Dialog, Menu/MenuRow, Badge, Notification, Avatar, the editor shell, inspector, slides navigator — or when the user mentions Composa, @composa-ui/react, or builds on top of it. Classifies the request, fetches real props/usage/tokens from the live source, and applies the system's rules so generated UI is on-spec, not guessed.
---

# Composa UI

Composa UI (`@composa-ui/react`) is a React component library and design system
sourced from Figma's UI3 kit. It packages controls, inputs, overlays, menus, and whole
editor surfaces.

**This skill is a way of thinking, not a frozen catalog.** Your job is to classify what's
being asked, fetch the real answer from the live source, and apply the system's rules —
never to recite memorized props (they drift). Composa ships its own machine-readable docs;
use them.

## How to answer (think → route → fetch → apply)

1. **Classify the intent.** Most Composa requests are one of:
   - **Build / edit** a component → you need its real props, variants, and states.
   - **Choose between** components → a when-to-use judgment (Switch vs Checkbox, SegmentedControl vs Dropdown, Menu vs Dropdown).
   - **Token / foundation** question → color, spacing, type, radius, elevation, iconography.
   - **Usage / anatomy / accessibility** detail → states, keyboard, ARIA, do/don't.
   - **Show it** → a live preview of a story.

2. **Route to the live source — never invent props, variants, or token names; fetch them.**
   Whenever a Composa Storybook is reachable (working in the DS repo, or any project running
   it), the **MCP is the source of truth — it's always in sync and can't drift:**
   - `list-all-documentation` — discover every component *and* foundation. This is the real
     index; do not assume a component is absent because it's not in `CATALOG.md`.
   - `get-documentation` / `get-documentation-for-story` — pull a page's usage, props,
     states, and accessibility.
   - `preview-stories` — get live preview URLs; include them in your answer when the user
     would want to see the result.

   MCP endpoint: `http://localhost:6011/mcp` (Storybook `addon-mcp`). If the docs say a
   piece of guidance is an **open decision / proposed**, surface that uncertainty — don't
   present it as settled.

3. **Offline fallback** (external consumer with no Storybook/MCP running): use the
   **build-generated `CATALOG.md`** next to this file as the component + props index, and the
   hosted Storybook (`https://composa-ui.github.io/react`) for humans. `CATALOG.md` is
   generated from the build, so it won't drift — but if it ever disagrees with the installed
   package's own types or Storybook, **the package wins.**

4. **Apply the golden rules below, then compose.**

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

- **Icons are slots.** Components render whatever `Icon` you injected. If icons come up
  empty, you didn't inject an `Icon` — fix the factory call, don't patch components.
- **Overlays need an `OverlayHost` ancestor.** Every tooltip, menu, and inspector dialog
  portals into the nearest `OverlayHost`. No host → tooltips/menus don't show. Wrap any
  surface (or your app root) in `<OverlayHost>`.
- **Theme through `--composa-*` tokens, never class overrides.** Change a token (color,
  size, radius, space) and every component follows. The same token names resolve to
  different values in light vs `[data-composa-mode="dark"]`, so dark mode is a data switch,
  not new CSS.
- **`primary` is brand orange `#ff5c16`, not blue.** Deliberate Composa divergence from
  Figma's accent blue. Link text and focus rings stay blue. One `primary` per view.
- **IconButton requires `label`** (its aria-label + tooltip). **ToggleButton active = blue
  icon** on a pale-blue tint, driven by `pressed`.
- **Dropdown is an input, not a button** — white through every state; active/open shows a
  blue *border*, never a fill. **SegmentedControl** is single-select (white pill on a gray
  track). For one value among few, use SegmentedControl; for many, Dropdown.
- **Don't overload `options`** for grouped/checkmark/shortcut rows — compose `Menu` /
  `MenuRow` instead.
- **Callbacks: fetch the exact prop name; don't assume.** Different controls use different
  handler names (e.g. `onCheckedChange`, `onValueChange`, `onClick`). Pull the real one from
  the doc/types rather than defaulting to `onChange`.

## Before you ship the answer

- Did you fetch the real props (MCP, or CATALOG offline) instead of recalling them?
- Did you avoid inventing any prop, variant, or token?
- `OverlayHost` present for any overlay? Theming via tokens? `primary` used once, as orange?
- If the relevant guidance was marked proposed/open, did you say so?
- Included a preview URL when the user would want to see it?

If a component's behavior seems to contradict this skill, the installed package's
Storybook/types win — and that's worth reporting upstream.
