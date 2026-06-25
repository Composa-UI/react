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
          "Tooltip is a small dark bubble that labels a control on hover or focus. Use it to name an icon-only control, show a keyboard shortcut, or give a one-line hint; keep the content to a short phrase. It is presentational and passive: it does not position itself, manage hover state, or portal, so the caller owns placement and visibility. A tooltip is a hint, not a replacement for an accessible name, so set the trigger's own label too.",
      },
    },
  },
};

export const Playground = TooltipFamily;

// Anatomy — label + arrow.
export const Anatomy = {
  render: () => React.createElement(Tooltip, { label: "Rename layer" }),
  decorators: [withAnnotations],
  parameters: { annotations: [{ type: "anatomy", target: ".composa-tooltip" }] },
};

// Color — the tooltip surface fill token (derived). Color facet.
export const Color = {
  render: () => React.createElement(Tooltip, { label: "Rename layer" }),
  decorators: [withAnnotations],
  parameters: { annotations: [{ n: 1, target: ".composa-tooltip", marker: "pin", side: "top", type: "token", kind: "color", prop: "background" }] },
};

// Layout — corner-radius (NEW v2 visual). Layout facet. Derived live.
export const Layout = {
  render: () => React.createElement(Tooltip, { label: "Rename layer" }),
  decorators: [withAnnotations],
  parameters: { annotations: [{ target: ".composa-tooltip", type: "radius", corner: "top-left" }] },
};

// Accessibility — role=tooltip; the trigger references it via aria-describedby.
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
        tier: { priority: "ideal", difficulty: "moderate" },
      },
    ],
  },
};
