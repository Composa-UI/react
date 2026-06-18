# Contributing to Composa UI

Composa is built component-first from Figma references. A change starts at the design-system primitive, not at a screen. Before writing page markup, create or refine the reusable component, register its Figma anchor, then compose it.

## Principles

- **Components map to Figma.** Every component's props, variants, and states should trace to a real Figma component property. When they drift, the component is wrong, not the design.
- **Icons are slots.** Components accept icons as passed-in nodes. Composa does not bundle proprietary icon sets; it interoperates with open libraries like Lucide and React Icons.
- **Tokens are the source of values.** Colors, spacing, and typography come from design tokens, never hardcoded values.
- **Document the why.** Each change carries its rationale in the PR. The reasoning is part of the contribution.

## Setup

```bash
npm install
npm run storybook   # component workbench at http://localhost:6011
npm run dev         # app harness
```

## Before you open a PR

```bash
npm run check   # contract + entrypoint verification, must print "ok": true
npm run build   # must pass
```

- Add or update a Storybook story for any new variant or state.
- Run `npm run check` after changing component variants, `design/component-api.json`, or the variant manifest.
- Run `npm run build` to confirm CSS class and import consistency held.

## Pull requests

Fill out the PR template. State what changed, why, and how it maps to Figma. Keep each PR scoped to one coherent change so the contribution trail stays readable.

## Reporting issues

Use the bug or feature templates. For a component bug, name the component and the Figma state it should match.
