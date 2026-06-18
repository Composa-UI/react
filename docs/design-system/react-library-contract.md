# React and Library Contract

The component-library direction is React-first. Storybook and `src/react` are the canonical review path for new Composa UI component work.

The product app shell now renders through React from `src/app/react-main.js`. Storybook and the verifier read variant data from `src/design-system/variant-specs.js`. The former vanilla DOM primitives have been removed; React is the only renderer.

Each Composa UI primitive is a component family with explicit props and variant axes. `design/component-api.json` is the renderer-neutral contract for those families.

## Current Renderer

| Layer | Current state |
| --- | --- |
| Runtime | React app shell through Vite |
| Product app entry | `src/app/react-main.js` |
| React entrypoint | `src/react/index.js` |
| React type declarations | `src/react/index.d.ts`, `src/react/factory.d.ts` |
| React adapter factory | `src/react/factory.js` |
| Harness source | `src/harness/main.js` React launchpad |
| Portable API manifest | `design/component-api.json` |

New component work should start in React. The vanilla DOM primitives have been retired and removed from the codebase.

Use `npm run dev` for the product app. Static Python serving is still useful for old generated artifacts, but it is not the React app runtime because it cannot resolve package imports.

## App Architecture Model

The working architecture follows the same broad split as the public mental model for Figma-like tools:

| Surface | Role in this project |
| --- | --- |
| React/editor shell | Panels, toolbars, menus, tabs, inputs, dialogs, and future inspector workflows |
| Component library | Figma UI3-inspired React-compatible primitives with prop surfaces that map back to Figma component properties |
| Composition renderer | The slide/video canvas and layer rendering surface; this can evolve separately from the React shell |
| Bridge/state model | Selection, layer tree, auto-layout properties, and timeline state shared between the shell and renderer |

This repo should not assume the canvas is ordinary React DOM forever. The current prototype can render canvas-like layers with DOM/CSS while the component system is being learned, but the codebase should keep the canvas renderer swappable. A future high-performance renderer could use Canvas/WebGL/WebGPU or another engine, while the React component library remains responsible for the editor chrome.

## Canvas Renderer Direction

The canvas should be treated as a renderer for a project model, not as the source of truth. This matters more for Figma-to-video than a normal whiteboard because the same composition has to support direct manipulation, AI edits, timeline playback, and final video export.

| Concern | Direction |
| --- | --- |
| UI shell | React owns panels, Storybook-documented primitives, menus, inputs, chat, and timeline controls |
| Project model | A declarative JSON-like tree owns slides, layers, properties, selection, tracks, keyframes, and easing |
| Live renderer | A swappable canvas layer renders the model for panning, zooming, selection, previews, and playback |
| AI side chat | AI should edit the project model or timeline schema, not emit renderer-specific WebGL/Pixi/Leafer commands |
| Video export | Export should consume the same project model and timeline data; Remotion can be an export path without being the live editor canvas |

The current DOM canvas prototype is still useful for proving interaction fidelity. A future renderer spike should compare engines against the model contract rather than rebuilding the editor around one engine too early.

Current renderer candidates:

| Candidate | Good fit | Caution |
| --- | --- | --- |
| DOM/CSS prototype | Fastest way to validate inspector, layer tree, auto-layout semantics, and Storybook components | Will not scale to dense multi-slide editing or complex playback |
| LeaferJS | Layout-first Figma-like 2D scene graph with canvas/WebGL rendering potential | Needs validation for video/media timelines and export handoff |
| PixiJS | Mature WebGL renderer for high-performance images, sprites, filters, and playback surfaces | Figma-like layout, text editing, and inspector semantics must be supplied by our model/bridge |
| Remotion | Strong React-based export/render pipeline for final video artifacts | Not the default choice for a live infinite-canvas editor surface |

The bridge should be boring and explicit: React controls update project/timeline state, the renderer subscribes to that state, and selection or pointer events flow back as model actions. AI chat can then produce small, reviewable model patches such as keyframes:

```json
{
  "targetId": "title",
  "property": "x",
  "keyframes": [
    { "time": 0, "value": -120, "easing": "easeOut" },
    { "time": 1.2, "value": 36, "easing": "easeOut" }
  ]
}
```

## Import and Export Direction

Supporting import from Figma and export to editing apps such as DaVinci Resolve does not change the Composa UI component-library direction, but it makes the project model stricter. The model should become an intermediate representation, or IR: a renderer-neutral document that importers, the live editor, AI chat, timeline playback, and exporters all understand.

| Pipeline | Reads | Writes |
| --- | --- | --- |
| Figma importer | Figma document JSON, plugin data, assets, fonts, and exported images/SVGs | Project IR: slides, layers, assets, styles, constraints, and initial timing |
| Live editor | Project IR | Model actions and patches from direct manipulation, inspector edits, timeline edits, or AI chat |
| Live renderer | Project IR plus viewport state | Pixels and editor overlays only; it should not own project truth |
| Video exporter | Project IR plus media assets | High-quality video frames/files through a render worker path |
| NLE exporter | Project IR plus media assets | Timeline interchange such as XML/OTIO/FCPXML plus a packaged media folder |

This means import/export should be built as translators around the model, not as one-off screen scraping or renderer capture. Complex Figma groups may need flattening into assets during import; rich app-specific visual effects may need rasterization or graceful degradation for NLE export. High-quality video export should use deterministic frame rendering and encoding instead of recording the browser preview in real time.

## Variant Model

The intended mental model is:

`Figma component set -> component family -> props -> rendered variant`

Examples:

| Family | Figma anchor | Prop-shaped renderer |
| --- | --- | --- |
| `Button` | Figma UI3 `Button`, node `2012:46721` | `Button({ variant, size, state, disabled, iconLead, label, hotkey })` |
| `IconButton` | Figma UI3 icon button sets, node `2012:46721` | `IconButton({ variant, state, disabled, pressed, icon, label })` |
| `InputField` | Figma UI3 inputs, node `2028:75376` | `InputField({ variant, size, state, iconLead, dropdown, variable, mixed })` |
| `MenuRow` | Figma UI3 Menu, node `2028:86486` | `MenuRow({ type, state, lead, trail, submenu, selected })` |
| `Header` | Figma UI3 layer/property header references, nodes `2692:80664`, `2692:80723`, `2692:80745` | `Header({ title, hierarchy, expanded, actions })` |
| `CanvasSelectionOverlay` | UI2 Canvas decorations, node `0:20495` | `CanvasSelectionOverlay({ type, direction, width, height })` |

## Figma Property Parity

When the live Figma component property panel is available, it becomes the naming authority for Storybook controls, Code Connect mappings, and `design/component-api.json`.

Conventions:

- Use Figma component-property names for variant axes: `State`, `Type`, `Variant`, `Size`, `Disabled`, `Icon Lead`, `Stroke`, `Muted`, `Ghost`, `Label`, `Description`, and `Hotkey`.
- In code, use camelCase prop names that map directly to those labels: `state`, `type`, `variant`, `size`, `disabled`, `iconLead`, `stroke`, `muted`, `ghost`, `label`, `description`, and `hotkey`.
- Preserve Figma value vocabulary in Storybook controls when known, including capitalization such as `Default`, `Focused`, `Primary`, `Checked`, and `False`. Components may normalize those values internally for CSS class names and data attributes.
- Do not overload boolean visibility props as content. For example, Figma `Label` maps to `label: boolean`; actual display copy uses `labelText`. Figma `Description` maps to `description: boolean`; actual display copy uses `descriptionText`.
- Keep backwards-compatible aliases only where they reduce migration risk. For example, Checkbox still accepts `checked`, but the Figma-aligned prop is `type`.
- Do not treat `Disabled` as a state unless Figma exposes it in the `State` property for that component. If Figma shows a separate `Disabled` toggle, keep it as `disabled`.

Current confirmed Figma property panels:

| Figma component | Code family | Current prop surface |
| --- | --- | --- |
| Checkbox | `Checkbox` | `state`, `type`, `disabled`, `muted`, `ghost`, `label`, `description`, plus `labelText` and `descriptionText` for content |
| Button | `Button` | `variant`, `size`, `state`, `disabled`, `iconLead`, `label`, `hotkey` |
| Dropdown | `Dropdown` | `size`, `state`, `disabled`, `stroke`, `iconLead` |
| Header | `Header` | `title`, `hierarchy`, `expanded`, `actions`; support component, not a Figma variant matrix family |

Input-family panels:

| Figma component | Code shape | Figma property surface preserved |
| --- | --- | --- |
| Color input | `ColorInput` under the input family | `state`, `type` |
| Text input | `InputField` / `TextInput` story | `variant`, `size`, `state`, `iconLead`, `dropdown` |
| Numeric input multi | `NumericInputMulti` under the input family | `state`, `variant`, `disabled`, `iconLead` |
| Numeric input | `NumericInput` under the input family | `state`, `varIcon`, `disabled`, `varPill`, `dropdown`, `iconLead` |
| Combo input | `ComboInput` with embedded `ComboInputDropdown` segment | `state`, `iconLead`, `variable`; nested dropdown `dropdownState` |

The preferred public API is a small set of component families plus typed subcomponents where the behavior differs. Storybook shows separate input stories for `TextInput`, `NumericInput`, `NumericInputMulti`, `ColorInput`, and `ComboInput` because those are separate Figma component sets. That split is for review and Code Connect clarity, not a requirement to create unrelated implementation islands.

Figma evidence note: `Combo input` node `2028:79408` renders as a 117px split control with a 24px `_Combo input dropdown` segment from node `2028:79874`. Actual option lists should be composed from `Dropdown` plus `Menu`; `_Combo input dropdown` is only the chevron segment inside combo input. Figma labels the selected states as `Selected input` and `Selected chevron`; code accepts those spellings and the title-cased Storybook labels.

Segmented control and tabs expose `options`/`tabs` as their code API. Figma publishes tab-count variants, and Storybook can keep a `count` control to inspect those sizes, but `count` should not be a Code Connect prop. In code, the count is derived from `options.length` or `tabs.length`.

## Artifact Split

There are two clean future artifacts, and the component library should become its own package repository once the prop contract stabilizes enough to avoid constant churn:

| Artifact | Purpose | Current readiness |
| --- | --- | --- |
| Figma Video app | Product-specific editor built from Figma UI3-inspired primitives | Active prototype |
| Component library package | Renderer-neutral primitives inspired by Figma UI3, with a React implementation path, Storybook, tokens, Code Connect mappings, and type declarations | Currently lives in this repo under `src/react`, `design`, and `docs/design-system` |

An iOS-native or SwiftUI artifact is possible later, but it should consume the same family/prop contract rather than copy DOM/CSS details.

## Code Connect Direction

Code Connect has been removed. It was coupled to the UI3 community Figma file (`figma.config.json`, `src/figma/code-connect-map.json`), and that coupling is gone: no `.figma.ts` templates existed, every family was blocked pending live property names, and the parity work is driven directly by `design/component-api.json` against the Figma source, so Code Connect was unblocking nothing.

The plan is to rebuild Code Connect later against Composa's **own** published Figma library rather than the community file. When we do:

- `design/component-api.json` stays the prop authority and `src/design-system/figma-library.js` the anchor authority.
- Map variants to props on the component family. Do not create one code component per Figma variant.
- Storybook controls are generated from our local React/component API contract; Code Connect is the separate step that verifies live Figma property names and maps them to React props.

## React Adapter

`src/react/index.js` exports named React components for normal package usage:

```js
import { Button, IconButton, InputField, Dropdown, MenuRow, SegmentedControl, Tabs } from "./index.js";
```

`src/react/factory.js` still exports `createComposaComponents(React, options)` for hosts that need to inject their own icon renderer:

```js
const { Button, IconButton, InputField, Dropdown, MenuRow, SegmentedControl, Tabs } = createComposaComponents(React, {
  Icon,
});
```

The React adapter uses the same classes and tokens across the app, harness, and Storybook. It is one design system, not a separate one per surface.

This is React-compatible for the core primitive families in `design/component-api.json` plus support components such as `Header`. The product app entry, the harness, and Storybook all render through React.
