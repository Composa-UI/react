import React from "react";
import { DropdownFamily } from "./composa-component-stories.js";
import { Dropdown } from "../story-runtime.js";
import { withAnnotations } from "./_annotations.js";

const dropdownOptions = [
  { label: "Option", value: "option" },
  { label: "Another option", value: "another" },
];

export default {
  title: "Composa UI/Components/Base/Dropdown",
  // The MDX page (dropdown.mdx) owns the Docs tab.
  tags: ["!autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Dropdown is a closed select trigger with value, optional leading icon, and chevron slots. Use `options` for simple value menus; compose Menu separately only for richer grouped or searchable surfaces. It is styled as an input, not a button: a white surface with a 1px border that stays white on interaction rather than filling.",
      },
    },
  },
};

export const Playground = DropdownFamily;

// Dropdown is input-styled and has no `data-part` declarations, so it's annotated by class
// rather than via the auto-anatomy bracket. The closed trigger is what we spec.

// Color — surface fill, border-color, and text color tokens. All values derived live.
export const Color = {
  render: () => React.createElement(Dropdown, { label: "Layer type", value: "Option", icon: "styles", options: dropdownOptions }),
  decorators: [withAnnotations],
  parameters: {
    annotations: [
      { n: 1, target: ".composa-dropdown", marker: "pin", side: "top", type: "token", kind: "color", prop: "background" },
      { n: 2, target: ".composa-dropdown", marker: "pin", side: "right", type: "token", kind: "color", prop: "border-color" },
      { n: 3, target: ".composa-dropdown-value", marker: "pin", side: "bottom", type: "token", kind: "color", prop: "color" },
    ],
  },
};

// Typography — the value text type token (derived). Typography facet.
export const Typography = {
  render: () => React.createElement(Dropdown, { label: "Layer type", value: "Option", icon: "styles", options: dropdownOptions }),
  decorators: [withAnnotations],
  parameters: { annotations: [{ n: 1, target: ".composa-dropdown-value", marker: "pin", side: "bottom", type: "token", kind: "typography", anchor: "center" }] },
};

// Layout — height redline + corner-radius (NEW v2 visual). Layout facet. Derived live.
export const Layout = {
  render: () => React.createElement(Dropdown, { label: "Layer type", value: "Option", icon: "styles", options: dropdownOptions }),
  decorators: [withAnnotations],
  parameters: {
    annotations: [
      { n: 1, target: ".composa-dropdown", type: "redline", dimension: "height" },
      { target: ".composa-dropdown", type: "radius", corner: "top-left" },
    ],
  },
};

// States — Focused (border switches to color.border.selected) and Disabled (text dims
// to color.text.tertiary) shown alongside Default. Token values derived live.
export const States = {
  render: () =>
    React.createElement(
      "div",
      { style: { display: "flex", flexDirection: "column", gap: "var(--composa-space-2)", alignItems: "flex-start" } },
      React.createElement(Dropdown, { label: "Default", value: "Option", options: dropdownOptions }),
      React.createElement(Dropdown, { label: "Focused", value: "Option", state: "focused", options: dropdownOptions }),
      React.createElement(Dropdown, { label: "Disabled", value: "Option", disabled: true, options: dropdownOptions })
    ),
  decorators: [withAnnotations],
  parameters: {
    annotations: [
      { n: 1, target: ".composa-dropdown.is-focused", marker: "pin", side: "right", type: "token", kind: "color", prop: "border-color" },
      { n: 2, target: ".composa-dropdown:disabled", marker: "pin", side: "right", type: "token", kind: "color", prop: "color" },
    ],
    docs: {
      description: {
        story: "Default, Focused (border → color.border.selected), and Disabled (text → color.text.tertiary). Hover keeps the same surface as Default.",
      },
    },
  },
};

// Sizing — Medium (24 px, composa-height-input) vs Large (32 px). Derived live.
export const Sizing = {
  render: () =>
    React.createElement(
      "div",
      { style: { display: "flex", gap: "var(--composa-space-3)", alignItems: "flex-start" } },
      React.createElement(Dropdown, { label: "Medium", value: "Option", size: "medium", options: dropdownOptions }),
      React.createElement(Dropdown, { label: "Large", value: "Option", size: "large", options: dropdownOptions })
    ),
  decorators: [withAnnotations],
  parameters: {
    annotations: [
      { n: 1, target: ".composa-dropdown:not(.composa-dropdown-large)", type: "redline", dimension: "height" },
      { n: 2, target: ".composa-dropdown-large", type: "redline", dimension: "height" },
    ],
  },
};

// Structural — Icon-less: two-column grid (value | chevron). Icon-lead: three-column
// grid (icon | value | chevron) via the data-icon-lead attribute.
export const Structural = {
  render: () =>
    React.createElement(
      "div",
      { style: { display: "flex", gap: "var(--composa-space-3)", alignItems: "flex-start" } },
      React.createElement(Dropdown, { label: "No icon", value: "Option", options: dropdownOptions }),
      React.createElement(Dropdown, { label: "Icon lead", value: "Option", iconLead: true, icon: "styles", options: dropdownOptions })
    ),
  parameters: {
    docs: {
      description: {
        story: "Without icon lead: two-column grid (value | chevron). With icon lead: three-column grid (icon | value | chevron) via data-icon-lead attribute.",
      },
    },
  },
};

// Accessibility — a closed select trigger: <button> with aria-haspopup=menu + aria-expanded,
// named by `label`. (The open menu is role=menu of options, specced under Menu.)
export const Accessibility = {
  render: () => React.createElement(Dropdown, { label: "Layer type", value: "Option", icon: "styles", options: dropdownOptions }),
  decorators: [withAnnotations],
  parameters: {
    annotations: [
      {
        n: 1,
        target: ".composa-dropdown",
        marker: "pin",
        side: "top",
        type: "button",
        element: "<button>",
        role: "button",
        accessibleName: "aria-label (the `label` prop)",
        keyboard: [
          { keys: "Enter / Space", result: "opens the options menu" },
          { keys: "Esc", result: "closes it" },
        ],
        states: [
          { state: "open / closed", aria: "aria-expanded: true | false" },
          { state: "popup", aria: "aria-haspopup: menu" },
        ],
        tier: { priority: "mandatory", difficulty: "moderate" },
      },
    ],
  },
};
