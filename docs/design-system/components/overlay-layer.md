# Overlay layer

The overlay layer is the shared support primitive for transient UI that needs a consistent placement contract. Tooltips, dropdown menus, option menus, and inspector dialogs all have the same underlying problem: they are anchored to a control, but the trigger should not have to rewrite menu anatomy, z-index, active state, or placement rules in every section.

## Why This Exists

Before `OverlayLayer`, inspector surfaces used section-local positioning. That created repeated fixes for clipping, z-index, active trigger state, and edge placement. The overlay stack now has two layers:

- `OverlayHost` creates the overflow-safe coordinate space around a template or app surface.
- `OverlayPortal` measures a trigger and renders an `OverlayLayer` into that host, outside the section scroll container.

`OverlayLayer` still owns the visual placement contract for the surface. `OverlayPortal` is the escape hatch that keeps tooltips, menus, and inspector dialogs from clipping inside the right rail.

## Surfaces

- `Dropdown` and `Menu`: value menus, toolbar menu rows, zoom choices, and option lists.
- Inspector dialogs: larger editing panels for export settings, stroke settings, effects, layout guide settings, and auto layout settings.
- `Tooltip`: small anchored labels for icon buttons, inputs, and picker points.
- Value popovers: focused editors opened from a row-level icon trigger.

## Contract

- The trigger owns `open`, `defaultOpen`, and `onOpenChange`.
- The trigger shows active or selected state while its overlay is open.
- Clicking outside closes the overlay and clears active trigger state.
- `Escape` closes the overlay.
- The surface declares its role: `tooltip`, `menu`, `dialog`, or `listbox`.
- Placement is declarative: `below-trigger`, `tooltip`, `left-of-inspector`, or `inspector-dialog`.
- Inspector dialogs request `left-of-inspector` / `inspector-dialog` placement and should be anchored through `OverlayPortal` when used inside a scrollable rail.
- Inspector dialogs behave like floating windows: they capture their launch position, do not scroll with the property section underneath them, and use the compact inspector floating-dialog width token by default.
- Menus and dropdowns use trigger-box alignment: start, center, or end against the control that opened them.
- Tooltips use anchor-center alignment: the bubble is positioned so its arrow points back to the hovered/focused control, including corner placements like `top-left` and `bottom-right`.

## Acceptance Criteria

Overlay work is not complete until these behavior checks pass in Storybook:

- **No measuring flash.** Tooltips, menus, and dialogs should not appear briefly at the viewport's top-left while their size is being measured.
- **Edge awareness.** A tooltip near the rail's right edge, left edge, top, or bottom must remain visible inside the overlay host. It may clamp or flip, but it should not clip.
- **Trigger-aware menus.** Dropdown and menu surfaces open adjacent to the trigger that launched them. If there is no room below the trigger, the surface may open above it.
- **Host-aware sizing.** A portaled dropdown menu must size to its menu content or declared menu width, not to the full overlay host.
- **Stable dialogs.** Inspector dialogs open as floating windows beside the rail and do not move when the underlying inspector scrolls.
- **Active lifecycle.** The trigger remains active while the overlay is open, then returns to rest when the overlay closes through outside click, Escape, or a value selection.
- **Story stage.** Template stories must provide enough surrounding area to reveal overlay placement bugs; rail-only stories are insufficient for overlay QA.

## Current Migration

- `Dropdown` option menus render through `OverlayPortal` when an `OverlayHost` is present, with a local `OverlayLayer` fallback.
- `InspectorHeader` zoom menu renders through `OverlayPortal`.
- Export, stroke, blend mode, stroke side, and auto layout settings surfaces request `OverlayPortal`.
- Export, stroke, and auto layout settings dialogs set `followAnchor={false}` so scrolling the inspector does not drag an open dialog around.
- Local child surfaces keep their existing visual classes; `OverlayLayer` owns the placement wrapper.
- Portaled tooltip layers opt into tooltip positioning so legacy `left: 50%` / transform CSS does not shift their computed coordinates.

## Rules

- Use `--composa-inspector-overlay-z` for local overlay z-index.
- Use `--composa-inspector-overlay-offset` for local trigger spacing.
- Do not introduce new per-section z-index literals.
- Do not build new menu row anatomy inside inspector sections. Use `Dropdown`, `MenuRow`, and `ControlGroup` primitives.
- Templates that contain scrollable inspector rails should wrap their stage in `OverlayHost`.
- Place overlay primitives in Storybook under `Components/Base/Overlays`. Controls such as `Dropdown` and `MenuRow` stay under Base controls because they consume overlays rather than being overlays themselves.
- If a new menu, tooltip, or dialog is clipped, migrate it to `OverlayPortal` before adding any section-local z-index or placement rule.

## Deferred Work

- Full collision-aware placement against the browser viewport and product shell boundaries.
- App-level overlay root routing for surfaces that need to escape a local Storybook stage.
- Draggable inspector floating windows.
- Arrow repositioning when a tooltip is clamped away from its ideal anchor center.
- Full keyboard navigation and menu typeahead.
