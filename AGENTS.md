# Figma Video Workflow

## Working Model

This app is built component-first from Figma UI3/UI2 references. Do not start by drawing screenshot-like page markup. Create or refine the reusable design-system primitive first, register its Figma anchor, then compose it into the workbench.

## Design-System Rules

- Figma UI3 is the primary design source. UI2 references are historical comparison or fallback.
- Every visible UI primitive should have a `data-composa-component` marker.
- Keep component names stable enough for future Code Connect mappings.
- Prefer copied Figma UI3 SVG icon assets in `src/design-system/icon-assets.js`; when a referenced Figma file uses an icon we do not have, add it before using a placeholder.
- Property-panel controls should be dense: 11px type, 24px control height, quiet borders, and hover/focus states instead of always-visible chrome.
- Model real component variants explicitly. Examples: `Button`, `IconButton`, `ToggleButton`, `SplitButton`, `SegmentedPicker`, `Dropdown`, `InputField`, `Menu`.

## App Composition Rules

- Slides, layer rows, canvas objects, thumbnails, and inspector properties must resolve to the same slide/layer model path.
- The center canvas area shrinks responsively; left and right sidebars should not wrap to new rows at normal desktop/tablet widths.
- Default product mode is design mode. Do not add slide-mode UI unless product scope changes.
- Keep the editor toolbar scoped to supported creation actions.

## Verification

- Prefer `npm run check` after JavaScript or component-contract edits once dependencies are installed; it wraps the contract verifier and runnable JavaScript syntax checks.
- Run `node --check` for every `src/**/*.js` file after JavaScript edits.
- Run `node tools/verify-design-system-contracts.js` after changing component variants, `design/component-api.json`, or `src/design-system/variant-manifest.js`.
- Run `node tools/verify-react-entrypoint.js` after changing `src/react/index.js`, `src/react/factory.js`, or package exports.
- Do not run `node --check` on `tools/export-composa-variables.use-figma.js`; it is a Figma plugin-context script with Figma globals and top-level await.
- Use the in-app browser for visual verification after frontend changes.
- Verify both `index.html` and `harness.html`; the harness should show primitives before the app relies on them.
