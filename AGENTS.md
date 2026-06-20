# Figma Video Workflow

## Working Model

This app is built component-first from Figma UI3/UI2 references. Do not start by drawing screenshot-like page markup. Create or refine the reusable design-system primitive first, register its Figma anchor, then compose it into the workbench.

For component and inspector work, read `docs/design-system/composa-component-builder.md` after this file. `CLAUDE.md` points Claude Code to the same workflow. `docs/workflows/composa-component-builder.md` is the workflow-oriented copy.

## Storybook MCP — the source of truth for Composa UI

Storybook is Composa's single source of truth, and `@storybook/addon-mcp` exposes it
to AI agents over MCP. **Use it before generating or editing any UI that consumes
Composa components — do not invent props, variants, or class names.**

Setup (one time, per agent):

- Start Storybook: `npm run storybook` (serves the MCP at `http://localhost:6011/mcp`;
  set `PORT` to change it).
- Register the server with your agent. For Claude Code:
  `claude mcp add --transport http composa-storybook http://localhost:6011/mcp`
  (or commit a project `.mcp.json` with the same URL).

Workflow (every UI task):

1. `list-all-documentation` once, to discover component + docs IDs
   (e.g. `composa-ui-components-base-buttons`).
2. `get-documentation` for each component you will use — read its real props,
   variants, usage, and examples. This is authoritative; the factory in
   `src/react/factory.js` and the `.mdx`/`.stories.js` files are the ground truth it
   serves.
3. Build with those exact props/variants.
4. `preview-stories` after any component or story change, and include every returned
   preview URL in your response so the result can be verified.
5. `get-storybook-story-instructions` before writing or editing a `.stories.js`.

Treat the MCP's docs as ground truth. If a component's MCP doc is thin, that is a
documentation gap to fix (richer `.mdx`), not a license to guess.

## Design-System Rules

- Figma UI3 is the primary design source. UI2 references are historical comparison or fallback.
- Every visible UI primitive should have a `data-composa-component` marker.
- Keep component names stable enough for future Code Connect mappings.
- Prefer copied Figma UI3 SVG icon assets in `src/design-system/icon-assets.js`; when a referenced Figma file uses an icon we do not have, add it before using a placeholder.
- Property-panel controls should be dense: 11px type, 24px control height, quiet borders, and hover/focus states instead of always-visible chrome.
- Model real component variants explicitly. Examples: `Button`, `IconButton`, `ToggleButton`, `SplitButton`, `SegmentedPicker`, `Dropdown`, `InputField`, `Menu`.
- Capture repeated inspector/component lessons as they emerge. If a review comment reveals a reusable rule, encode it in tokens, a primitive contract, component docs, Storybook stories, this workflow file, or the Composa skill instead of leaving it as a one-off patch.
- Inspector section headers and value rows share the same inset contract. Use the inspector inset tokens for left/right spacing, and add a component token when a new repeated spacing is needed instead of hardcoding raw pixels.
- Inspector section bodies share a bottom inset contract. Use `--composa-inspector-section-padding-end` for layout, appearance, stroke controls, and other section bodies so stacked dividers and controls keep a consistent rhythm.
- Inspector templates should be tested inside an overflow-friendly story stage, not only in a rail-sized box. Keep the rail at product width, but give menus, tooltips, and dialogs surrounding room so clipping bugs are visible and overlay behavior can be judged.
- Transient inspector surfaces need a consistent lifecycle: the triggering button shows active/selected state while the surface is open, and clicking outside closes the surface and clears that active state.
- Collapsed inspector sections with existing values should expand those values before adding another row. Only create a new default row when the section is empty or already expanded and the user explicitly adds another value.
- Inspector value rows with a leading dialog trigger plus a dropdown/value control should use one flexible control cluster followed by one trailing action cluster. The leading trigger and value stretch together; visibility, remove, and settings actions align to the shared trailing edge.
- Dropdown owns trigger slots, value/chevron alignment, and simple single-value option menus. Do not hand-build chevrons or per-section dropdown menus for ordinary value choices.
- MenuRow `type="toolbar"` is the selectable row pattern when a menu needs both a reserved checkmark slot and a leading icon slot. Use it for side/icon choices instead of overloading simple or checkmark rows.
- ControlGroup owns visible separation between grouped icon buttons. Use it for grouped actions that do not represent a single selected value; use SegmentedControl only when one segment is the current selected option.
- Tooltip, menu, and inspector-dialog clipping share one architecture path: wrap scrollable inspector templates in `OverlayHost`, render anchored transient surfaces through `OverlayPortal`, and let `OverlayLayer` own the visual wrapper. Do not introduce new per-section z-index or placement rules; collision-aware placement remains documented follow-up work in `docs/design-system/components/overlay-layer.md`.
- Intrinsic IconButton/AlignmentPicker tooltips (and any `FloatingTooltip`) need an `OverlayHost` ancestor to portal into. Any STORY or stage that shows hover tooltips must wrap its content in `OverlayHost` (the standalone IconButton/ControlGroup/AlignmentPicker stories use a meta `decorators` host). Without a host the tooltip falls back to rendering inline inside an `OverlayLayer`, where the `> .tooltip` hover rules no longer reach it — `75-tooltip.css` / `87-alignment-picker.css` carry an inline `.composa-tooltip-layer` fallback rule for this, but the host is the intended path.
- Inspector dialogs inherit one house style (see `docs/design-system/components/dialog.md` → "Inspector-dialog house style"): the real `close` (X) glyph pulled toward the top-right corner, edge-to-edge hairlines (surface has zero horizontal padding; header and section dividers are full-bleed borders), and per-section insets on the `--composa-inspector-dialog-inset` (12px) + 8/12/16 block scale. Never reintroduce the `rotate(45deg)` plus-as-X hack or draw dividers inside uniform surface padding.
- A controlled settings dialog that hosts its own `Dropdown`s must stay open while those menus operate. Dropdown menus portal to the `OverlayHost` as sibling overlay layers, so the dialog's outside-pointerdown handler must ignore clicks inside any `.composa-overlay-layer-portal` (in addition to its own `data-composa-overlay-owner`). Looks-interactive must be interactive: never ship a decorative chevron-button styled like a dropdown — use a real `Dropdown`.

## App Composition Rules

- Slides, layer rows, canvas objects, thumbnails, and inspector properties must resolve to the same slide/layer model path.
- The center canvas area shrinks responsively; left and right sidebars should not wrap to new rows at normal desktop/tablet widths.
- Default product mode is design mode. Do not add slide-mode UI unless product scope changes.
- Keep the editor toolbar scoped to supported creation actions. Per Figma 86-5602 the toolbar has four groups: Move (Move/Hand) and Shape (Rectangle/Circle) are SplitButton groups with a caret + tool-picker menu; Frame (the Grid 3x3 glyph) and Text are caret-less single icon buttons. Multi-tool groups suppress their tooltip while the menu is open (a tooltip and its menu never co-show). A frame reads as the Grid 3x3 glyph in both the toolbar and the layer list / Tree.

## Verification

- Prefer `npm run check` after JavaScript or component-contract edits once dependencies are installed; it wraps the contract verifier and runnable JavaScript syntax checks.
- Run `node --check` for every `src/**/*.js` file after JavaScript edits.
- Run `node tools/verify-design-system-contracts.js` after changing component variants, `design/component-api.json`, or `src/design-system/variant-manifest.js`.
- Run `node tools/verify-react-entrypoint.js` after changing `src/react/index.js`, `src/react/factory.js`, or package exports.
- Do not run `node --check` on `tools/export-composa-variables.use-figma.js`; it is a Figma plugin-context script with Figma globals and top-level await.
- Use the in-app browser for visual verification after frontend changes.
- Verify both `index.html` and `harness.html`; the harness should show primitives before the app relies on them.
