import React from "react";
import { TooltipFamily } from "./composa-component-stories.js";
import { Tooltip } from "../story-runtime.js";
import { withAnnotations } from "./_annotations.js";

export default {
  title: "Composa UI/Components/Base/Overlays/Tooltip",
  parameters: {
    docs: {
      description: {
        component:
          "Tooltip is a small dark bubble that labels a control on hover or focus. Use it to name an icon-only control, show a keyboard shortcut, or give a one-line hint; keep the content to a short phrase. It is presentational and passive: it does not position itself, manage hover state, or portal, so the caller owns placement and visibility. A tooltip is a hint, not a replacement for an accessible name, so set the trigger's own label too. The `tone` prop switches between the default dark surface (`inverse`) and a light surface (`standard`) for use on dark canvas backgrounds. A link variant of the tooltip (shown in the Figma guidelines) extends this pattern with a clickable action row; it reuses the same surface tokens and is composed as an OverlayPortal + action row rather than a standalone React export.",
      },
    },
  },
};

export const Playground = TooltipFamily;

// Anatomy — label text, optional hotkey slot, and directional arrow.
export const Anatomy = {
  render: () => React.createElement(Tooltip, { label: "Rename layer" }),
  decorators: [withAnnotations],
  parameters: { annotations: [{ type: "anatomy", target: ".composa-tooltip" }] },
};

// Color — surface background, primary label text, and secondary hotkey text.
// Three tokens are annotated: --composa-tooltip-bg (surface fill),
// --composa-tooltip-fg (label), and --composa-tooltip-fg-secondary (hotkey).
export const Color = {
  render: () => React.createElement(Tooltip, { label: "Rename layer" }),
  decorators: [withAnnotations],
  parameters: {
    annotations: [
      {
        n: 1,
        target: ".composa-tooltip",
        marker: "pin",
        side: "top",
        type: "token",
        kind: "color",
        prop: "background",
        name: "--composa-tooltip-bg",
      },
      {
        n: 2,
        target: ".composa-tooltip",
        marker: "pin",
        side: "bottom",
        type: "token",
        kind: "color",
        prop: "text",
        name: "--composa-tooltip-fg",
      },
      {
        n: 3,
        target: ".composa-tooltip",
        marker: "pin",
        side: "right",
        type: "token",
        kind: "color",
        prop: "text",
        name: "--composa-tooltip-fg-secondary",
      },
    ],
  },
};

// Layout — height redline (24px), width hugs content, and corner radius.
export const Layout = {
  render: () => React.createElement(Tooltip, { label: "Rename layer" }),
  decorators: [withAnnotations],
  parameters: {
    annotations: [
      { n: 1, target: ".composa-tooltip", type: "redline", dimension: "height" },
      { n: 2, target: ".composa-tooltip", type: "redline", dimension: "width" },
      { target: ".composa-tooltip", type: "radius", corner: "top-left" },
    ],
  },
};

// Spacing — horizontal padding inset (8px = space-2), vertical padding (4px = space-1),
// and the gap between label text and hotkey text (4px = space-1).
// Typography — label and hotkey both use 11px Inter Medium via --composa-font-family.
export const Typography = {
  render: () => React.createElement(Tooltip, { label: "Rename layer" }),
  decorators: [withAnnotations],
  parameters: {
    annotations: [
      {
        n: 1,
        target: ".composa-tooltip",
        marker: "pin",
        side: "bottom",
        type: "token",
        kind: "typography",
        anchor: "center",
        name: "--composa-font-family",
      },
    ],
    docs: {
      description: {
        story:
          "Both the label and hotkey slots use 11px Inter Medium (var(--composa-font-family), fontWeight 450). This matches the UI3 Figma spec: fontSize bound to the 11px body-medium variable, fontFamily bound to Inter.",
      },
    },
  },
};

// Direction — all eight placement positions. The arrow changes direction; surface
// tokens, padding, and typography are identical across all directions.
export const Direction = {
  render: () =>
    React.createElement(
      "div",
      {
        style: {
          display: "grid",
          gridTemplateColumns: "repeat(3, auto)",
          gap: "var(--composa-space-4)",
          alignItems: "center",
          justifyItems: "center",
          padding: "24px",
        },
      },
      React.createElement(Tooltip, { label: "Top left", placement: "top-left" }),
      React.createElement(Tooltip, { label: "Top", placement: "top" }),
      React.createElement(Tooltip, { label: "Top right", placement: "top-right" }),
      React.createElement(Tooltip, { label: "Left", placement: "left" }),
      React.createElement("div", { style: { width: "48px", height: "24px" } }),
      React.createElement(Tooltip, { label: "Right", placement: "right" }),
      React.createElement(Tooltip, { label: "Bottom left", placement: "bottom-left" }),
      React.createElement(Tooltip, { label: "Bottom", placement: "bottom" }),
      React.createElement(Tooltip, { label: "Bottom right", placement: "bottom-right" })
    ),
  parameters: {
    docs: {
      description: {
        story:
          "All eight `placement` values. The arrow origin and offset change; the surface, typography, and spacing tokens are the same in every direction.",
      },
    },
  },
};

// Tone — `inverse` (default dark, for light UIs) vs `standard` (light, for dark surfaces).
export const Tone = {
  render: () =>
    React.createElement(
      "div",
      { style: { display: "flex", gap: "var(--composa-space-4)", alignItems: "flex-start" } },
      React.createElement(
        "div",
        { style: { display: "flex", flexDirection: "column", gap: "var(--composa-space-1)", alignItems: "center" } },
        React.createElement(
          "span",
          { style: { fontSize: "11px", color: "var(--composa-color-text-secondary)", fontFamily: "var(--composa-font-family)" } },
          'tone=\"inverse\" (default)'
        ),
        React.createElement(Tooltip, { label: "Rename layer", tone: "inverse" })
      ),
      React.createElement(
        "div",
        {
          style: {
            display: "flex",
            flexDirection: "column",
            gap: "var(--composa-space-1)",
            alignItems: "center",
            background: "var(--composa-color-bg-inverse)",
            padding: "var(--composa-space-2)",
            borderRadius: "var(--composa-radius-medium)",
          },
        },
        React.createElement(
          "span",
          { style: { fontSize: "11px", color: "rgba(255,255,255,0.7)", fontFamily: "var(--composa-font-family)" } },
          'tone=\"standard\"'
        ),
        React.createElement(Tooltip, { label: "Rename layer", tone: "standard" })
      )
    ),
  parameters: {
    docs: {
      description: {
        story:
          "`inverse` (--composa-tooltip-bg #1e1e1e, default) suits light-UI surfaces. `standard` provides a light tooltip for dark-canvas or video contexts where the dark surface would not read.",
      },
    },
  },
};

// Accessibility — role=tooltip; the trigger references it via aria-describedby.
// role=\"tooltip\" is a WAI-ARIA 1.1 mandatory pattern: straightforward to implement
// (one attribute) and required for screen reader announcement of the popup text.
export const Accessibility = {
  render: () => React.createElement(Tooltip, { label: "Rename layer" }),
  decorators: [withAnnotations],
  parameters: {
    annotations: [
      {
        n: 1,
        target: ".composa-tooltip",
        marker: "pin",
        side: "top",
        type: "button",
        element: "<div>",
        role: "tooltip",
        accessibleName: "the tooltip text (the trigger points to it via aria-describedby)",
        keyboard: [
          { keys: "Hover / focus trigger", result: "shows the tooltip" },
          { keys: "Esc", result: "dismisses it" },
        ],
        tier: { priority: "mandatory", difficulty: "easy" },
      },
    ],
  },
};
