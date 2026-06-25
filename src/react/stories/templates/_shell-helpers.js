// Template-layer helpers shared by full-window editor stories.
// None of these are part of the published @composa-ui/react package.
import React from "react";
import { Tabs, MultiplayerControl, Button } from "../../story-runtime.js";

/**
 * AppTopBar — the 40px (--composa-height-heading) application navigation bar
 * shown above every editor product.
 *
 * Composed from existing Composa primitives:
 *   - Breadcrumb area (app label + file name)
 *   - Optional Tabs (underline variant) for top-level mode switching.
 *     Pass `modes` for Design editor (Design / Prototype / Dev).
 *     Slides omits `modes` — its mode switch lives in InspectorHeader.
 *   - MultiplayerControl avatar strip + primary Share button.
 */
export function AppTopBar({
  appLabel = "Composa",
  fileName = "Untitled",
  mode,
  modes,
  onModeChange,
  collaborators = [],
  shareLabel = "Share",
  onShare,
}) {
  var tabs = modes
    ? modes.map(function (m) { return { label: m.label, selected: mode === m.id }; })
    : null;

  return React.createElement(
    "div",
    { className: "composa-app-topbar", role: "banner" },
    // Left — icon placeholder + breadcrumb
    React.createElement(
      "div",
      { className: "composa-app-topbar-start" },
      React.createElement("div", {
        className: "composa-app-topbar-icon",
        "aria-hidden": "true",
      }),
      React.createElement(
        "span",
        { className: "composa-app-topbar-breadcrumb" },
        React.createElement("span", null, appLabel),
        React.createElement(
          "span",
          { className: "composa-app-topbar-breadcrumb-sep", "aria-hidden": "true" },
          "/"
        ),
        React.createElement("span", null, fileName)
      )
    ),
    // Center — mode tabs (omitted for Slides)
    React.createElement(
      "div",
      { className: "composa-app-topbar-center" },
      tabs &&
        React.createElement(Tabs, {
          label: "Editor mode",
          variant: "underline",
          tabs: tabs,
          onValueChange: function (label) {
            var found = modes.find(function (m) { return m.label === label; });
            if (found && onModeChange) onModeChange(found.id);
          },
        })
    ),
    // Right — collaborator avatars + share button
    React.createElement(
      "div",
      { className: "composa-app-topbar-end" },
      ...collaborators.map(function (c, i) {
        return React.createElement(MultiplayerControl, Object.assign({ key: String(i) }, c));
      }),
      React.createElement(Button, {
        label: shareLabel,
        variant: "primary",
        onClick: onShare,
      })
    )
  );
}

/**
 * shellStage — stacks AppTopBar above an editor shell in a full-viewport
 * CSS grid (.composa-shell-stage). The top bar takes its natural 40px height;
 * the shell receives the remaining space via `1fr`.
 */
export function shellStage(topBar, shell) {
  return React.createElement(
    "div",
    { className: "composa-shell-stage" },
    topBar,
    shell
  );
}
