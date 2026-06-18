# Storybook Harness Direction

Storybook is the right next harness for the React-facing component library work. The current `harness.html` is still useful because it directly counts every Figma UI3/UI2 variant cell we have inventoried, but it is not the best mental model for a future reusable library.

## Recommended Role

- Keep `harness.html` as the strict inventory and regression matrix.
- Add Storybook as the private/local review surface for React props, states, variants, density, and interaction affordances.
- Do not publish Storybook yet. Treat it as an internal design-system workbench until the API in `design/component-api.json` is stable.

## Story Structure

The first stories should mirror component families, not individual Figma variants:

- `Button`
- `IconButton`, `ToggleButton`, `SplitButton`
- `InputField`
- `Dropdown`
- `Switch`, `Radio`, `Checkbox`
- `Tooltip`
- `Dialog`
- `SegmentedControl`
- `Tabs`
- `Menu`, `MenuRow`
- `CanvasSelectionOverlay`

Each story should expose variant axes as args/controls. That matches the desired model:

`Figma component set -> component family -> props -> rendered variant`

## Current Readiness

`src/react/factory.js` now exposes React components for the core families in `design/component-api.json`. The product app entry also renders through React from `src/app/react-main.js`; the vanilla harness remains only as strict inventory/parity infrastructure.

Component stories should stay grouped by component mental model, not by inventory convenience. For example, `IconButton` has separate icon-only and toggle stories, while split-button lives under `Button` because it is a button composition with a menu affordance.

Storybook configuration and first-pass stories now exist:

- `.storybook/main.js`
- `.storybook/preview.js`
- `src/react/stories/*/*.stories.js`-style component entries via `src/react/stories/*.stories.js`
- `src/react/stories/composa-component-stories.js`
- `src/react/stories/composa-variant-matrix.js`
- `src/react/stories/story-coverage.js`

Storybook dependencies are installed and locked in `package-lock.json`. Stories import the direct React component entrypoint from `src/react/index.js`.

`package.json` includes an `overrides.esbuild` pin to keep Storybook/Vite on an audited esbuild version while staying on Storybook 10.4.x.

Use these scripts:

- `npm run check`: contract and syntax verification.
- `npm run build-storybook`: production Storybook build.
- `npm run serve-storybook`: serve `storybook-static` for browser inspection.
- `npm run storybook`: dev Storybook server on `PORT` or `6011` by default.

`tools/verify-design-system-contracts.js` checks that Storybook coverage includes every component family declared in `design/component-api.json` and that the non-sidebar variant matrix declares the same 507 cells as the vanilla harness inventory.

For human review, open the Storybook manager UI at a component story:

`http://127.0.0.1:6010/?path=/story/composa-ui-components-button--playground`

The 507-cell matrix is intentionally not part of the Storybook sidebar. Keep using `harness.html` and `story-coverage.js` for strict inventory checks instead of exposing the full matrix as a review story.

The preview iframe is only for low-level automated checks.

The vanilla renderer remains a harness reference until the gates in `docs/design-system/vanilla-deprecation-plan.md` are satisfied.
