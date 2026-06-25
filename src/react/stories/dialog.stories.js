import React from "react";
import { DialogFamily, DialogFooterFamily, DialogHeaderFamily, DialogRowFamily, StructuredDialogFamily } from "./composa-component-stories.js";
import { Dialog } from "../story-runtime.js";
import { withAnnotations } from "./_annotations.js";

export default {
  title: "Composa UI/Components/Base/Overlays/Dialog",
  parameters: {
    docs: {
      description: {
        component:
          "Dialog is a modal window with a header, a body, and a footer of actions. Use it for a self-contained, blocking task such as renaming a layer, creating a project, or confirming a delete. Pass `title`, `description`, and the two button labels for a one-shot composer, or drop the sub-components into `children` for richer layouts. The component does not trap focus, manage a backdrop, or handle Escape, so wire focus management and dismissal at the call site.",
      },
    },
  },
};

export const Playground = DialogFamily;
export const Header = DialogHeaderFamily;
export const Footer = DialogFooterFamily;
export const Row = DialogRowFamily;
export const Structured = StructuredDialogFamily;

// Anatomy — header / body / actions slots carry data-part.
export const Anatomy = {
  render: () => React.createElement(Dialog, { size: "small", title: "Rename layer", description: "Give this layer a new name." }),
  decorators: [withAnnotations],
  parameters: { annotations: [{ type: "anatomy", target: ".composa-dialog" }] },
};

// Layout — width redline + corner-radius (NEW v2 visual, needs owner review). Derived live.
export const Layout = {
  render: () => React.createElement(Dialog, { size: "small", title: "Rename layer", description: "Give this layer a new name." }),
  decorators: [withAnnotations],
  parameters: {
    annotations: [
      { n: 1, target: ".composa-dialog", type: "redline", dimension: "width" },
      { target: ".composa-dialog", type: "radius", corner: "top-left" },
    ],
  },
};

// Accessibility — modal dialog contract (focus trap + Esc are wired at the call site).
export const Accessibility = {
  render: () => React.createElement(Dialog, { size: "small", title: "Rename layer", description: "Give this layer a new name." }),
  decorators: [withAnnotations],
  parameters: {
    annotations: [
      {
        n: 1,
        target: ".composa-dialog",
        marker: "pin",
        side: "top",
        type: "button",
        element: "<section>",
        role: "dialog",
        accessibleName: "aria-label (the `title`)",
        keyboard: [
          { keys: "Esc", result: "closes the dialog (wired at the call site)" },
          { keys: "Tab", result: "focus stays trapped within the dialog (call site)" },
        ],
        states: [{ state: "modal", aria: "aria-modal: true" }],
        tier: { priority: "mandatory", difficulty: "advanced" },
      },
    ],
  },
};
