import React from "react";
import { RadioFamily } from "./composa-component-stories.js";
import { Radio } from "../story-runtime.js";
import { withAnnotations } from "./_annotations.js";

export default {
  title: "Composa UI/Components/Base/Radio",
  parameters: {
    docs: {
      description: {
        component:
          "Radio picks one option from a mutually exclusive set. Group radios so selecting one clears the rest; the factory drives a single control, so the parent owns the selected value. Use the `input` variant for standard radio lists and the `button` variant when the choice reads as a selectable pill or mode switch. Reach for Checkbox when more than one option can be selected.",
      },
    },
  },
};

export const Playground = RadioFamily;

// Anatomy — auto-derived from the Radio's data-part declarations.
export const Anatomy = {
  render: () => React.createElement(Radio, { label: "Option A", checked: true, onCheckedChange: () => {} }),
  decorators: [withAnnotations],
  parameters: { annotations: [{ type: "anatomy", target: ".composa-radio" }] },
};

// Color — the selected control fill token (derived). Color facet.
export const Color = {
  render: () => React.createElement(Radio, { label: "Option A", checked: true, onCheckedChange: () => {} }),
  decorators: [withAnnotations],
  parameters: { annotations: [{ n: 1, target: ".composa-radio-mark", marker: "pin", side: "left", type: "token", kind: "color", prop: "background" }] },
};

// Typography — the label type token (derived). Typography facet.
export const Typography = {
  render: () => React.createElement(Radio, { label: "Option A", checked: true, onCheckedChange: () => {} }),
  decorators: [withAnnotations],
  parameters: { annotations: [{ n: 1, target: '.composa-radio [data-part="label"]', marker: "pin", side: "bottom", type: "token", kind: "typography", anchor: "center" }] },
};

// Layout — control mark diameter + corner-radius (NEW v2 visual). Layout facet. Derived live.
export const Layout = {
  render: () => React.createElement(Radio, { label: "Option A", checked: true, onCheckedChange: () => {} }),
  decorators: [withAnnotations],
  parameters: {
    annotations: [
      { n: 1, target: ".composa-radio-mark", type: "redline", dimension: "width" },
      { target: ".composa-radio-mark", type: "radius", corner: "top-left" },
    ],
  },
};

// ButtonVariant — the pill-style radio in its three key states.
export const ButtonVariant = {
  render: () =>
    React.createElement(
      "div",
      { style: { display: "flex", gap: 8, alignItems: "center" } },
      React.createElement(Radio, { label: "Option A", variant: "button", checked: false, onCheckedChange: () => {} }),
      React.createElement(Radio, { label: "Option B", variant: "button", checked: true, onCheckedChange: () => {} }),
      React.createElement(Radio, { label: "Option C", variant: "button", checked: false, state: "focused", onCheckedChange: () => {} }),
    ),
  parameters: {
    docs: {
      description: {
        story:
          "The `button` variant renders as a selectable pill. One option fills with the brand accent (FLAG-FOR-OWNER: diverges from Figma pale-blue selected surface — confirm intent); inactive options show a translucent border matching Figma `✦/special/bordertranslucent`. Use for mode switches or inline option groups.",
      },
    },
  },
};

// Accessibility — the a11y contract (codified GitHub/CVS), authored where the DOM can't infer it.
export const Accessibility = {
  render: () => React.createElement(Radio, { label: "Option A", checked: true, onCheckedChange: () => {} }),
  decorators: [withAnnotations],
  parameters: {
    annotations: [
      {
        n: 1,
        target: ".composa-radio",
        marker: "pin",
        side: "top",
        type: "button",
        element: "<button>",
        role: "radio",
        accessibleName: "the visible label text",
        keyboard: [
          { keys: "Space", result: "selects this radio" },
          { keys: "Arrow keys", result: "move selection within the group (group-managed)" },
        ],
        states: [{ state: "selected / not", aria: "aria-checked: true | false" }],
        tier: { priority: "mandatory", difficulty: "moderate" },
      },
    ],
  },
};
