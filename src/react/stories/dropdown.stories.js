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

// Color — the trigger surface fill token (derived). Color facet. Input-styled: a white surface.
export const Color = {
  render: () => React.createElement(Dropdown, { label: "Layer type", value: "Option", icon: "styles", options: dropdownOptions }),
  decorators: [withAnnotations],
  parameters: { annotations: [{ n: 1, target: ".composa-dropdown", marker: "pin", side: "top", type: "token", kind: "color", prop: "background" }] },
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
