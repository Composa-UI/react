import React from "react";
import { ColorInputFamily, ComboInputFamily, InputFieldFamily, NumericInputFamily, NumericInputMultiFamily } from "./composa-component-stories.js";
import { InputField } from "../story-runtime.js";
import { withAnnotations } from "./_annotations.js";

export default {
  title: "Composa UI/Components/Base/InputField",
  parameters: {
    docs: {
      description: {
        component:
          "InputField is the base single-line text-entry control in Composa UI. Use it to collect typed text, a number, a color, or a value paired with a dropdown. The `variant` selects the shell shape: plain Text, Numeric, NumericMulti, Color, or Combo, all sharing one height, radius, and type scale. Choose the variant by data type, and give every input an accessible name through `label`, `placeholder`, or `aria-label`.",
      },
    },
  },
};

export const TextInput = InputFieldFamily;
export const ColorInput = ColorInputFamily;
export const NumericInput = NumericInputFamily;
export const NumericInputMulti = NumericInputMultiFamily;
export const ComboInput = ComboInputFamily;

// Anatomy — exercises the `form-element` annotation type (codified GitHub/CVS) on a real
// input, plus the variant + redline systems. Same `parameters.annotations` source, three
// systems. See specs/_annotation-system.md.
export const Anatomy = {
  render: () => React.createElement(InputField, { label: "Email address", placeholder: "you@example.com" }),
  decorators: [withAnnotations],
  parameters: {
    annotations: [
      {
        n: 1,
        target: ".composa-input-field input",
        marker: "pin",
        side: "top",
        type: "form-element",
        control: "<input>",
        accessibleName: "aria-label from the `label` prop (no visible label text)",
        required: false,
        describedBy: "tooltip id, set when `tooltipLabel` is provided",
        tier: { priority: "mandatory", difficulty: "moderate" },
      },
      {
        n: 2,
        target: ".composa-input-field",
        side: "left",
        marker: "caret",
        type: "variant",
        value: "Text · rest",
      },
      {
        n: 3,
        target: ".composa-input-field",
        type: "redline",
        dimension: "height",
        // value derived from the live element (no hardcoding → no drift)
      },
    ],
  },
};

// Color — token annotation: semantic name (authored) + value DERIVED from computed style
// (swatch + hex). Kept separate from typography.
export const Color = {
  render: () => React.createElement(InputField, { label: "Email address", placeholder: "you@example.com" }),
  decorators: [withAnnotations],
  parameters: {
    annotations: [
      { n: 1, target: ".composa-input-shell", marker: "pin", side: "top", type: "token", kind: "color", prop: "background" },
    ],
  },
};

// Typography — token annotation: semantic name + value DERIVED from computed style
// (size/line-height), with an "Ag" specimen. Kept separate from color.
export const Typography = {
  render: () => React.createElement(InputField, { label: "Email address", placeholder: "you@example.com" }),
  decorators: [withAnnotations],
  parameters: {
    annotations: [
      { n: 1, target: ".composa-input-field input", marker: "pin", side: "bottom", type: "token", kind: "typography", name: "body.medium", anchor: "center" },
    ],
  },
};
