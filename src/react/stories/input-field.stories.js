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

// States — shell background and focus-ring token delta across rest / focus / active / disabled / variable.
// Background token (bg-secondary → bg) and outline token (border-selected) are all derived at runtime.
export const States = {
  render: () =>
    React.createElement(
      "div",
      { style: { display: "flex", flexDirection: "column", gap: 20, padding: 24 } },
      React.createElement("div", { className: "ifd-rest" },
        React.createElement(InputField, { label: "W", value: "320", placeholder: "0" })
      ),
      React.createElement("div", { className: "ifd-focus" },
        React.createElement(InputField, { label: "W", value: "320", placeholder: "0", state: "focus" })
      ),
      React.createElement("div", { className: "ifd-active" },
        React.createElement(InputField, { label: "W", value: "320", placeholder: "0", state: "active" })
      ),
      React.createElement("div", { className: "ifd-disabled" },
        React.createElement(InputField, { label: "W", value: "320", placeholder: "0", state: "disabled", disabled: true })
      ),
      React.createElement("div", { className: "ifd-variable" },
        React.createElement(InputField, { label: "W", value: "320", placeholder: "0", state: "variable", variable: true })
      )
    ),
  decorators: [withAnnotations],
  parameters: {
    annotations: [
      { target: ".ifd-rest .composa-input-shell", type: "variant", marker: "caret", side: "left", value: "Rest" },
      { target: ".ifd-focus .composa-input-shell", type: "variant", marker: "caret", side: "left", value: "Focus" },
      { target: ".ifd-active .composa-input-shell", type: "variant", marker: "caret", side: "left", value: "Active" },
      { target: ".ifd-disabled .composa-input-shell", type: "variant", marker: "caret", side: "left", value: "Disabled" },
      { target: ".ifd-variable .composa-input-shell", type: "variant", marker: "caret", side: "left", value: "Variable bound" },
      { n: 1, target: ".ifd-rest .composa-input-shell", type: "token", kind: "color", prop: "background", side: "top" },
      { n: 2, target: ".ifd-focus .composa-input-shell", type: "token", kind: "color", prop: "outline-color", side: "top" },
      { n: 3, target: ".ifd-disabled .composa-input-shell", type: "token", kind: "color", prop: "background", side: "top" },
    ],
  },
};

// Spacing — height redline on the shell, both values derived live.
export const Spacing = {
  render: () => React.createElement(InputField, { label: "W", value: "320", placeholder: "0" }),
  decorators: [withAnnotations],
  parameters: {
    annotations: [
      { n: 1, target: ".composa-input-shell", type: "redline", dimension: "height" },
      { n: 2, target: ".composa-input-shell", type: "redline", dimension: "width" },
    ],
  },
};

// Accessibility — dedicated a11y story; the Anatomy story shares an annotation but this one
// covers the full contract: element, role, accessible-name source, and keyboard.
export const Accessibility = {
  render: () => React.createElement(InputField, { label: "Layer name", placeholder: "Enter a name" }),
  decorators: [withAnnotations],
  parameters: {
    annotations: [
      {
        n: 1,
        target: ".composa-input-field input",
        marker: "pin",
        side: "top",
        type: "form-element",
        control: "<input type=\"text\">",
        controlLabel: "Layer name",
        required: false,
        tier: { priority: "mandatory", difficulty: "easy" },
      },
    ],
  },
};
