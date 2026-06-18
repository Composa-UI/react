# Vanilla Deprecation: Complete

The vanilla DOM renderer has been fully retired. React is the only renderer for the app shell, harness, and Storybook, and the archived vanilla primitives have been removed from the codebase. This document is kept as a record of the migration.

## End State

- Product app renderer: React from `src/app/react-main.js`, mounted by `index.html`.
- Legacy app renderer: removed. The old `src/app/main.js` and `src/app/components/*` vanilla composition modules are gone.
- React renderer: core adapter in `src/react/factory.js`; the home for new library component behavior.
- React launch harness: `harness.html` and `src/harness/main.js`.
- React review harness: Storybook config in `.storybook`, stories in `src/react/stories`, locked dependencies in `package-lock.json`.
- Vanilla primitives (`dom.js`, `primitives.js`): removed.

## Migration Record

The retirement followed these steps, all now complete:

1. React became the only active renderer for the app shell, Storybook, verifier, and harness.
2. Variant inventory moved to Storybook and generated React pages rather than a DOM-only surface.
3. The vanilla primitives were frozen, then removed once React parity was stable and no live app, harness, verifier, or Storybook entry imported them.

## Package Boundary

The package is private for now. The publishable artifact should eventually be Figma UI3-inspired rather than a direct Figma UI3 clone, with:

- React as the first supported renderer.
- Stable component-family props from `design/component-api.json`.
- Tokens exported as CSS variables.
- Figma Code Connect mappings generated from the same component-family contract.
