import React from "react";
import { SwitchFamily } from "./composa-component-stories.js";
import { Switch } from "../story-runtime.js";
import { withAnnotations } from "./_annotations.js";

export default {
  title: "Composa UI/Components/Base/Switch",
  parameters: {
    docs: {
      description: {
        component:
          "Switch turns a single setting on or off, like a hardware toggle. Flipping it takes effect at once, with no separate confirm step, so reach for Checkbox instead when the option is part of a form that applies on submit. It supports a `mixed` state for when a switch governs several items that are not all on. The `label` is the accessible name rather than visible text, so always set a meaningful one.",
      },
    },
  },
};

export const Playground = SwitchFamily;

// Accessibility — the Switch renders as a <button> with role=switch; name from the `label`
// prop (aria-label). Space/Enter toggles; aria-checked carries on/off (and mixed).
export const Accessibility = {
  render: () => React.createElement(Switch, { label: "Show grid", checked: true, onCheckedChange: () => {} }),
  decorators: [withAnnotations],
  parameters: {
    annotations: [
      {
        n: 1,
        target: ".composa-switch",
        marker: "pin",
        side: "top",
        type: "button",
        element: "<button>",
        role: "switch",
        accessibleName: "the `label` prop (aria-label, not visible text)",
        keyboard: [{ keys: "Space / Enter", result: "toggles on/off" }],
        states: [
          { state: "on / off", aria: "aria-checked: true | false" },
          { state: "mixed", aria: "aria-checked: mixed" },
        ],
        tier: { priority: "mandatory", difficulty: "easy" },
      },
    ],
  },
};

// Layout — width/height redlines derived live from the element (no hardcoding → no drift).
export const Layout = {
  render: () => React.createElement(Switch, { label: "Show grid", checked: true, onCheckedChange: () => {} }),
  decorators: [withAnnotations],
  parameters: {
    annotations: [
      { n: 1, target: ".composa-switch", type: "redline", dimension: "width" },
      { n: 2, target: ".composa-switch", type: "redline", dimension: "height" },
    ],
  },
};

// Lasso marker (dotted rect + dotted connector) with a landmark-type label.
export const Lasso = {
  render: () => React.createElement(Switch, { label: "Show grid", checked: true, onCheckedChange: () => {} }),
  decorators: [withAnnotations],
  parameters: {
    annotations: [{ n: 1, target: ".composa-switch", marker: "lasso", side: "top", type: "landmark", label: "<region>" }],
  },
};

// Bracket marker (spine + caps toward the element + connector) with a landmark-type label.
export const Bracket = {
  render: () => React.createElement(Switch, { label: "Show grid", checked: true, onCheckedChange: () => {} }),
  decorators: [withAnnotations],
  parameters: {
    annotations: [{ n: 1, target: ".composa-switch", marker: "bracket", side: "bottom", type: "landmark", label: "<region>" }],
  },
};

// Anatomy — NOTHING is authored. The `anatomy` type auto-discovers every element with
// a `data-part` declaration (Zag/Ark convention) on the Switch and brackets it, deriving the
// label from the part name. Add a part to the component → it appears here automatically.
export const Anatomy = {
  render: () => React.createElement(Switch, { label: "Show grid", checked: true, onCheckedChange: () => {} }),
  decorators: [withAnnotations],
  parameters: {
    annotations: [{ type: "anatomy", target: ".composa-switch" }],
  },
};

// Variants (variant-only grid) — maps the variant space with variant labels only (no redlines).
// Mode reserved for "here are the variants" supporting imagery. Reuses the shared `variant`
// renderer, so a global style change to variant labels cascades here automatically.
export const Variants = {
  render: () => {
    const cell = (cls, props) =>
      React.createElement(
        "div",
        { className: cls, style: { display: "flex", justifyContent: "center", alignItems: "center" } },
        React.createElement(Switch, { label: "Show grid", onCheckedChange: () => {}, ...props })
      );
    return React.createElement(
      "div",
      { style: { display: "grid", gridTemplateColumns: "repeat(3, 64px)", gap: "52px 76px", padding: "64px 64px 40px 100px" } },
      cell("g-on-rest", { checked: true }),
      cell("g-on-focus", { checked: true, state: "focused" }),
      cell("g-on-disabled", { checked: true, disabled: true }),
      cell("g-mixed-rest", { mixed: true }),
      cell("g-mixed-focus", { mixed: true, state: "focused" }),
      cell("g-mixed-disabled", { mixed: true, disabled: true }),
      cell("g-off-rest", { checked: false }),
      cell("g-off-focus", { checked: false, state: "focused" }),
      cell("g-off-disabled", { checked: false, disabled: true })
    );
  },
  decorators: [withAnnotations],
  parameters: {
    annotations: [
      // row labels (left) — variant values
      { target: ".g-on-rest .composa-switch", type: "variant", marker: "caret", side: "left", value: "On" },
      { target: ".g-mixed-rest .composa-switch", type: "variant", marker: "caret", side: "left", value: "Mixed" },
      { target: ".g-off-rest .composa-switch", type: "variant", marker: "caret", side: "left", value: "Off" },
      // column labels (top) — states
      { target: ".g-on-rest .composa-switch", type: "variant", marker: "caret", side: "top", value: "Rest" },
      { target: ".g-on-focus .composa-switch", type: "variant", marker: "caret", side: "top", value: "Focus" },
      { target: ".g-on-disabled .composa-switch", type: "variant", marker: "caret", side: "top", value: "Disabled" },
    ],
  },
};

// State delta (reduced) — two variants side by side where ONE shared property changes. On→Off
// changes the TRACK colour, so we annotate the track token on each (derived). Mode reserved for
// explaining a specific change (vs the full variant grid above).
export const OnOffDelta = {
  render: () =>
    React.createElement(
      "div",
      { style: { display: "flex", gap: 40, alignItems: "center" } },
      React.createElement("div", { className: "dg-on" }, React.createElement(Switch, { label: "Show grid", checked: true, onCheckedChange: () => {} })),
      React.createElement("div", { className: "dg-off" }, React.createElement(Switch, { label: "Show grid", checked: false, onCheckedChange: () => {} }))
    ),
  decorators: [withAnnotations],
  parameters: {
    annotations: [
      // Row layout: variant identity on TOP, the changing property (track colour) on the BOTTOM.
      { target: ".dg-on .composa-switch", type: "variant", value: "On", marker: "caret", side: "top" },
      { target: ".dg-off .composa-switch", type: "variant", value: "Off", marker: "caret", side: "top" },
      { n: 1, target: ".dg-on .composa-switch", type: "token", kind: "color", prop: "background", side: "bottom" },
      { n: 2, target: ".dg-off .composa-switch", type: "token", kind: "color", prop: "background", side: "bottom" },
    ],
  },
};

// Color — full switch palette: track bg (on/off), thumb bg, and focus ring.
// Four pins derived from live CSS — no hex values authored.
export const Color = {
  render: () =>
    React.createElement(
      "div",
      { style: { display: "flex", gap: 48, alignItems: "center", padding: "48px 64px 40px" } },
      React.createElement("div", { className: "col-on" }, React.createElement(Switch, { label: "Show grid", checked: true, onCheckedChange: () => {} })),
      React.createElement("div", { className: "col-off" }, React.createElement(Switch, { label: "Show grid", checked: false, onCheckedChange: () => {} })),
      React.createElement("div", { className: "col-focus" }, React.createElement(Switch, { label: "Show grid", checked: true, state: "focused", onCheckedChange: () => {} }))
    ),
  decorators: [withAnnotations],
  parameters: {
    annotations: [
      { n: 1, target: ".col-on .composa-switch", marker: "pin", side: "top", type: "token", kind: "color", prop: "background" },
      { n: 2, target: ".col-off .composa-switch", marker: "pin", side: "top", type: "token", kind: "color", prop: "background" },
      { n: 3, target: ".col-on .composa-switch-thumb", marker: "pin", side: "bottom", type: "token", kind: "color", prop: "background" },
    ],
  },
};

// Shape — track border-radius annotation (derived). Radius facet.
export const Shape = {
  render: () => React.createElement(Switch, { label: "Show grid", checked: true, onCheckedChange: () => {} }),
  decorators: [withAnnotations],
  parameters: {
    annotations: [{ type: "radius", target: ".composa-switch", corner: "top-left" }],
  },
};
