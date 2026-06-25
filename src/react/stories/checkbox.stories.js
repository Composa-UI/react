import React from "react";
import { CheckboxFamily } from "./composa-component-stories.js";
import { Checkbox } from "../story-runtime.js";
import { withAnnotations } from "./_annotations.js";

export default {
  title: "Composa UI/Components/Base/Checkbox",
  parameters: {
    docs: {
      description: {
        component:
          "Checkbox toggles a single option on or off. Use it for opt-in settings, multi-select lists, and \"select all\" rows. It supports a third `Mixed` (indeterminate) state for a parent row when some but not all of its children are selected. Use a Switch instead when the setting applies immediately, or Radio when the user picks one option from a mutually exclusive set.",
      },
    },
  },
};

export const Playground = CheckboxFamily;

// Anatomy — auto-derived from the Checkbox's data-part declarations (control, label).
export const Anatomy = {
  render: () => React.createElement(Checkbox, { label: "Show grid", type: "checked", onCheckedChange: () => {} }),
  decorators: [withAnnotations],
  parameters: { annotations: [{ type: "anatomy", target: ".composa-checkbox" }] },
};

// Color — the checked control fill token (derived). Color facet.
export const Color = {
  render: () => React.createElement(Checkbox, { label: "Show grid", type: "checked", onCheckedChange: () => {} }),
  decorators: [withAnnotations],
  parameters: { annotations: [{ n: 1, target: '.composa-checkbox [data-part="control"]', marker: "pin", side: "left", type: "token", kind: "color", prop: "background" }] },
};

// Typography — the label type token (derived). Typography facet.
export const Typography = {
  render: () => React.createElement(Checkbox, { label: "Show grid", type: "checked", onCheckedChange: () => {} }),
  decorators: [withAnnotations],
  parameters: { annotations: [{ n: 1, target: '.composa-checkbox [data-part="label"]', marker: "pin", side: "bottom", type: "token", kind: "typography", anchor: "center" }] },
};

// Layout — control mark size + corner-radius (NEW v2 visual). Layout facet. Derived live.
export const Layout = {
  render: () => React.createElement(Checkbox, { label: "Show grid", type: "checked", onCheckedChange: () => {} }),
  decorators: [withAnnotations],
  parameters: {
    annotations: [
      { n: 1, target: '.composa-checkbox [data-part="control"]', type: "redline", dimension: "width" },
      { target: '.composa-checkbox [data-part="control"]', type: "radius", corner: "top-left" },
    ],
  },
};

// Accessibility — the a11y contract (codified GitHub/CVS), authored where the DOM can't infer it.
export const Accessibility = {
  render: () => React.createElement(Checkbox, { label: "Show grid", type: "checked", onCheckedChange: () => {} }),
  decorators: [withAnnotations],
  parameters: {
    annotations: [
      {
        n: 1,
        target: ".composa-checkbox",
        marker: "pin",
        side: "top",
        type: "button",
        element: "<button>",
        role: "checkbox",
        accessibleName: "the visible label text (aria-label when icon-only)",
        keyboard: [{ keys: "Space", result: "toggles checked / unchecked" }],
        states: [
          { state: "checked / unchecked", aria: "aria-checked: true | false" },
          { state: "mixed", aria: "aria-checked: mixed" },
        ],
        tier: { priority: "mandatory", difficulty: "easy" },
      },
    ],
  },
};
