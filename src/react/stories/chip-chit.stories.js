import React from "react";
import { ChipVariable, Chit, ChitInput } from "../story-runtime.js";
import { withAnnotations } from "./_annotations.js";

export default {
  title: "Composa UI/Components/Base/ChipChit",
  parameters: {
    docs: {
      description: {
        component:
          "ChipVariable is the inline variable-binding badge — a compact pill naming the variable currently bound to a property. Chit is a small color swatch representing a fill or stroke value at 24px or 48px in square or circle form. ChitInput is a compact inline control pairing a Chit swatch with an editable label field.",
      },
    },
  },
};

// ── ChipVariable ──────────────────────────────────────────────────────────────

export const ChipVariablePlayground = {
  name: "ChipVariable — playground",
  render: () =>
    React.createElement(
      "div",
      { style: { display: "flex", flexDirection: "column", gap: 8, padding: 16 } },
      ...["rest", "hover", "on-selected", "selected", "value-not-rendered", "soft-deleted", "disabled-secondary", "disabled-tertiary"].map((state) =>
        React.createElement(ChipVariable, { key: state, state })
      )
    ),
};

// Anatomy — auto-discovers every data-part inside .composa-chip-variable.
export const ChipVariableAnatomy = {
  name: "ChipVariable — anatomy",
  render: () => React.createElement(ChipVariable, { state: "rest" }),
  decorators: [withAnnotations],
  parameters: {
    annotations: [{ type: "anatomy", target: ".composa-chip-variable" }],
  },
};

// Color — background token delta between rest and selected.
export const ChipVariableColor = {
  name: "ChipVariable — color",
  render: () =>
    React.createElement(
      "div",
      { style: { display: "flex", gap: 40, padding: 40, alignItems: "center" } },
      React.createElement("div", { className: "cv-rest" }, React.createElement(ChipVariable, { state: "rest" })),
      React.createElement("div", { className: "cv-sel" }, React.createElement(ChipVariable, { state: "selected" }))
    ),
  decorators: [withAnnotations],
  parameters: {
    annotations: [
      { target: ".cv-rest .composa-chip-variable", type: "variant", marker: "caret", side: "top", value: "Rest" },
      { target: ".cv-sel .composa-chip-variable", type: "variant", marker: "caret", side: "top", value: "Selected" },
      { n: 1, target: ".cv-rest .composa-chip-variable", type: "token", kind: "color", prop: "background", side: "bottom" },
      { n: 2, target: ".cv-sel .composa-chip-variable", type: "token", kind: "color", prop: "background", side: "bottom" },
    ],
  },
};

// States — five key states side by side with variant carets.
export const ChipVariableStates = {
  name: "ChipVariable — states",
  render: () =>
    React.createElement(
      "div",
      { style: { display: "flex", flexWrap: "wrap", gap: 40, padding: 40 } },
      ...["rest", "hover", "selected", "soft-deleted", "disabled-secondary"].map((state) =>
        React.createElement("div", { key: state, className: `cvs-${state}` }, React.createElement(ChipVariable, { state }))
      )
    ),
  decorators: [withAnnotations],
  parameters: {
    annotations: [
      { target: ".cvs-rest .composa-chip-variable", type: "variant", marker: "caret", side: "top", value: "Rest" },
      { target: ".cvs-hover .composa-chip-variable", type: "variant", marker: "caret", side: "top", value: "Hover" },
      { target: ".cvs-selected .composa-chip-variable", type: "variant", marker: "caret", side: "top", value: "Selected" },
      { target: ".cvs-soft-deleted .composa-chip-variable", type: "variant", marker: "caret", side: "top", value: "Soft deleted" },
      { target: ".cvs-disabled-secondary .composa-chip-variable", type: "variant", marker: "caret", side: "top", value: "Disabled" },
    ],
  },
};

// Layout — height redline derived live.
export const ChipVariableLayout = {
  name: "ChipVariable — layout",
  render: () => React.createElement(ChipVariable, { state: "rest" }),
  decorators: [withAnnotations],
  parameters: {
    annotations: [
      { n: 1, target: ".composa-chip-variable", type: "redline", dimension: "height" },
    ],
  },
};

// Accessibility — ChipVariable is presentational; note documents the interaction contract.
export const ChipVariableAccessibility = {
  name: "ChipVariable — accessibility",
  render: () => React.createElement(ChipVariable, { state: "rest" }),
  decorators: [withAnnotations],
  parameters: {
    annotations: [
      {
        n: 1,
        target: ".composa-chip-variable",
        marker: "pin",
        side: "top",
        type: "note",
        text: "ChipVariable is a presentational badge naming the bound variable. It carries no interactive role — keyboard focus and activation are handled by the parent control.",
      },
    ],
  },
};

// ── Chit ──────────────────────────────────────────────────────────────────────

export const ChitPlayground = {
  name: "Chit — playground",
  render: () =>
    React.createElement(
      "div",
      { style: { display: "flex", gap: 12, padding: 16, alignItems: "center", flexWrap: "wrap" } },
      React.createElement(Chit, { size: 24, variant: "square", type: "fill" }),
      React.createElement(Chit, { size: 24, variant: "circle", type: "fill" }),
      React.createElement(Chit, { size: 24, variant: "square", type: "opacity" }),
      React.createElement(Chit, { size: 24, variant: "square", type: "gradient" }),
      React.createElement(Chit, { size: 24, variant: "square", type: "instance" }),
      React.createElement(Chit, { size: 48, variant: "square", type: "fill" }),
      React.createElement(Chit, { size: 48, variant: "circle", type: "fill" }),
      React.createElement(Chit, { size: 48, variant: "square", type: "opacity" })
    ),
};

// Anatomy — auto-discovers data-part elements inside .composa-chit.
export const ChitAnatomy = {
  name: "Chit — anatomy",
  render: () => React.createElement(Chit, { size: 24, variant: "square", type: "fill" }),
  decorators: [withAnnotations],
  parameters: {
    annotations: [{ type: "anatomy", target: ".composa-chit" }],
  },
};

// Layout — size-24 vs size-48 with redlines derived live.
export const ChitLayout = {
  name: "Chit — layout",
  render: () =>
    React.createElement(
      "div",
      { style: { display: "flex", gap: 48, padding: 48, alignItems: "center" } },
      React.createElement("div", { className: "chit-24" }, React.createElement(Chit, { size: 24, variant: "square", type: "fill" })),
      React.createElement("div", { className: "chit-48" }, React.createElement(Chit, { size: 48, variant: "square", type: "fill" }))
    ),
  decorators: [withAnnotations],
  parameters: {
    annotations: [
      { target: ".chit-24 .composa-chit", type: "variant", marker: "caret", side: "top", value: "24px" },
      { target: ".chit-48 .composa-chit", type: "variant", marker: "caret", side: "top", value: "48px" },
      { n: 1, target: ".chit-24 .composa-chit", type: "redline", dimension: "width" },
      { n: 2, target: ".chit-24 .composa-chit", type: "redline", dimension: "height" },
      { n: 3, target: ".chit-48 .composa-chit", type: "redline", dimension: "width" },
      { n: 4, target: ".chit-48 .composa-chit", type: "redline", dimension: "height" },
    ],
  },
};

// Shape — square (radius-medium) vs circle (radius-full), radius derived live.
export const ChitShape = {
  name: "Chit — shape",
  render: () =>
    React.createElement(
      "div",
      { style: { display: "flex", gap: 40, padding: 40, alignItems: "center" } },
      React.createElement("div", { className: "chit-sq" }, React.createElement(Chit, { size: 24, variant: "square", type: "fill" })),
      React.createElement("div", { className: "chit-ci" }, React.createElement(Chit, { size: 24, variant: "circle", type: "fill" }))
    ),
  decorators: [withAnnotations],
  parameters: {
    annotations: [
      { target: ".chit-sq .composa-chit", type: "variant", marker: "caret", side: "top", value: "Square" },
      { target: ".chit-ci .composa-chit", type: "variant", marker: "caret", side: "top", value: "Circle" },
      { n: 1, target: ".chit-sq .composa-chit", type: "radius", corner: "top-left" },
      { n: 2, target: ".chit-ci .composa-chit", type: "radius", corner: "top-left" },
    ],
  },
};

// ── ChitInput ────────────────────────────────────────────────────────────────

export const ChitInputPlayground = {
  name: "ChitInput — playground",
  render: () =>
    React.createElement(
      "div",
      { style: { display: "flex", flexDirection: "column", gap: 8, padding: 16 } },
      React.createElement(ChitInput, { label: "Label", state: "rest" }),
      React.createElement(ChitInput, { label: "Label", state: "focused" }),
      React.createElement(ChitInput, { label: "Label", state: "rest", closeButton: true }),
      React.createElement(ChitInput, { label: "Label", state: "focused", closeButton: true })
    ),
};

// Anatomy — auto-discovers data-part elements inside .composa-chit-input.
export const ChitInputAnatomy = {
  name: "ChitInput — anatomy",
  render: () => React.createElement(ChitInput, { label: "Label", state: "rest" }),
  decorators: [withAnnotations],
  parameters: {
    annotations: [{ type: "anatomy", target: ".composa-chit-input" }],
  },
};

// States — rest vs focused, background token on rest annotated.
export const ChitInputStates = {
  name: "ChitInput — states",
  render: () =>
    React.createElement(
      "div",
      { style: { display: "flex", gap: 40, padding: 40, alignItems: "center" } },
      React.createElement("div", { className: "chi-rest" }, React.createElement(ChitInput, { label: "Label", state: "rest" })),
      React.createElement("div", { className: "chi-focused" }, React.createElement(ChitInput, { label: "Label", state: "focused" }))
    ),
  decorators: [withAnnotations],
  parameters: {
    annotations: [
      { target: ".chi-rest .composa-chit-input", type: "variant", marker: "caret", side: "top", value: "Rest" },
      { target: ".chi-focused .composa-chit-input", type: "variant", marker: "caret", side: "top", value: "Focused" },
      { n: 1, target: ".chi-rest .composa-chit-input", type: "token", kind: "color", prop: "background", side: "bottom" },
    ],
  },
};
