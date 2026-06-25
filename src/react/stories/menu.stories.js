import React from "react";
import { MenuHeadingFamily, MenuRows } from "./composa-component-stories.js";
import { Menu } from "../story-runtime.js";
import { withAnnotations } from "./_annotations.js";

export default {
  title: "Composa UI/Components/Base/Menu",
  parameters: {
    docs: {
      description: {
        component:
          "Menu is the floating command surface in Composa UI. Use it for a list of commands triggered from a button, a right-click, or a kebab control. It renders on a dark surface and composes its rows from MenuRow, mixing command, heading, divider, and footer rows freely. In production pass `items` (or compose MenuRow children); the `variant` prop only selects a built-in demo row set when `items` is omitted.",
      },
    },
  },
};

export const Playground = MenuRows;
export const Heading = MenuHeadingFamily;

// Anatomy — each row carries data-part="item".
export const Anatomy = {
  render: () => React.createElement(Menu, { label: "Layer actions", variant: "label-only" }),
  decorators: [withAnnotations],
  parameters: { annotations: [{ type: "anatomy", target: ".composa-menu" }] },
};

// Color — the menu surface fill token (derived). Color facet.
export const Color = {
  render: () => React.createElement(Menu, { label: "Layer actions", variant: "label-only" }),
  decorators: [withAnnotations],
  parameters: { annotations: [{ n: 1, target: ".composa-menu", marker: "pin", side: "top", type: "token", kind: "color", prop: "background" }] },
};

// Layout — corner-radius (NEW v2 visual). Layout facet. Derived live.
export const Layout = {
  render: () => React.createElement(Menu, { label: "Layer actions", variant: "label-only" }),
  decorators: [withAnnotations],
  parameters: { annotations: [{ target: ".composa-menu", type: "radius", corner: "top-left" }] },
};

// Accessibility — COMPOSITE list semantics: the container is role=menu (one `list` pin with the
// full contract card), and EVERY row is bracketed as role=menuitem (`each` listitem). This is the
// list/menuitem pattern the toolkit codifies — not one "button" pin slapped on the whole menu.
export const Accessibility = {
  render: () => React.createElement(Menu, { label: "Layer actions", variant: "label-only" }),
  decorators: [withAnnotations],
  parameters: {
    annotations: [
      {
        n: 1,
        target: ".composa-menu",
        marker: "pin",
        side: "top",
        type: "list",
        element: "<div>",
        role: "menu",
        accessibleName: "aria-label (the `label` prop)",
        itemRole: "menuitem",
        keyboard: [
          { keys: "Arrow keys", result: "move between items" },
          { keys: "Enter", result: "activates the focused item" },
          { keys: "Esc", result: "closes the menu" },
        ],
        states: [{ state: "each item", aria: "role=menuitem (or menuitemcheckbox/radio); aria-checked" }],
        tier: { priority: "mandatory", difficulty: "advanced" },
      },
      {
        // Bracket every row as a menuitem (list-item semantics). No per-item detail card — the
        // contract lives on the container above; here we just mark the role on each row.
        n: 2,
        each: true,
        target: '.composa-menu [data-part="item"]',
        marker: "bracket",
        side: "right",
        type: "listitem",
        role: "menuitem",
      },
    ],
  },
};
