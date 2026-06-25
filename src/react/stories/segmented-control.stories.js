import { SegmentedControlFamily } from "./composa-component-stories.js";
import React from "react";
import { SegmentedControl } from "../story-runtime.js";
import { withAnnotations } from "./_annotations.js";

const segOptions = [{ label: "Design", selected: true }, { label: "Prototype" }, { label: "Dev" }];

export default {
  title: "Composa UI/Components/Base/SegmentedControl",
  // The MDX page (segmented-control.mdx) owns the Docs tab.
  tags: ["!autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "SegmentedControl is a single-select control: a row of mutually exclusive segments on a shared track, with one selected at a time. Use it to switch between a small set of views or modes inside one surface, ideally 2 to 6 options that fit on one row. The selected segment is a white raised pill on a gray track. Use Tabs instead for page-level content regions, or Dropdown when there are too many options to fit on one row.",
      },
    },
  },
};

export const Playground = SegmentedControlFamily;

export const FillWidth = {
  args: {
    value: "design",
  },
  render: () =>
    React.createElement(
      "div",
      {
        style: {
          width: 240,
        },
      },
      React.createElement(SegmentedControl, {
        label: "Flow",
        variant: "icon",
        width: "fill",
        value: "none",
        options: [
          { id: "none", icon: "flowNone", label: "No auto layout flow" },
          { id: "horizontal", icon: "flowHorizontal", label: "Horizontal auto layout" },
          { id: "vertical", icon: "flowVertical", label: "Vertical auto layout" },
          { id: "wrap", icon: "flowWrap", label: "Wrap auto layout" },
        ],
      })
    ),
  parameters: {
    docs: {
      description: {
        story: "Shows the fill-width primitive behavior: every icon segment stretches evenly with the selected segment.",
      },
    },
  },
};

// Anatomy — auto-derived; each segment carries data-part="segment".
export const Anatomy = {
  render: () => React.createElement(SegmentedControl, { label: "View mode", variant: "label", options: segOptions, onValueChange: () => {} }),
  decorators: [withAnnotations],
  parameters: { annotations: [{ type: "anatomy", target: ".composa-segmented-control" }] },
};

// Color — track fill, selected pill (bg + border), unselected text. All derived.
export const Color = {
  render: () => React.createElement(SegmentedControl, { label: "View mode", variant: "label", options: segOptions, onValueChange: () => {} }),
  decorators: [withAnnotations],
  parameters: {
    annotations: [
      { n: 1, target: ".composa-segmented-control", marker: "pin", side: "top", type: "token", kind: "color", prop: "background", name: "color.bg.secondary" },
      { n: 2, target: ".composa-segmented-control .is-selected", marker: "pin", side: "bottom", type: "token", kind: "color", prop: "background", name: "color.bg" },
      { n: 3, target: ".composa-segmented-control .is-selected", marker: "bracket", side: "right", type: "token", kind: "color", prop: "border-color", name: "color.border" },
      { n: 4, target: ".composa-segmented-control > .composa-segmented-label:not(.is-selected)", marker: "pin", side: "top", type: "token", kind: "color", prop: "color", name: "color.text.secondary" },
    ],
  },
};

// Layout — track height, item height, corner radius. All derived.
export const Layout = {
  render: () => React.createElement(SegmentedControl, { label: "View mode", variant: "label", options: segOptions, onValueChange: () => {} }),
  decorators: [withAnnotations],
  parameters: {
    annotations: [
      { n: 1, target: ".composa-segmented-control", type: "redline", dimension: "height" },
      { n: 2, target: ".composa-segmented-control > .composa-segmented-label", type: "redline", dimension: "height" },
      { target: ".composa-segmented-control", type: "radius", corner: "top-left" },
    ],
  },
};

// States — default vs disabled track and text tokens. Derived live.
export const States = {
  render: () =>
    React.createElement(
      "div",
      { style: { display: "flex", flexDirection: "column", gap: 12 } },
      React.createElement(SegmentedControl, { label: "Default", variant: "label", options: segOptions, onValueChange: () => {} }),
      React.createElement(SegmentedControl, { label: "Disabled", variant: "label", options: segOptions, disabled: true, onValueChange: () => {} })
    ),
  decorators: [withAnnotations],
  parameters: {
    annotations: [
      { n: 1, target: ".composa-segmented-control:last-child", marker: "pin", side: "top", type: "token", kind: "color", prop: "background", name: "color.bg.disabled" },
      { n: 2, target: ".composa-segmented-control:last-child > .composa-segmented-label", marker: "pin", side: "bottom", type: "token", kind: "color", prop: "color", name: "color.text.disabled" },
    ],
  },
};

// Typography — label segment text style token. Derived live.
export const Typography = {
  render: () => React.createElement(SegmentedControl, { label: "View mode", variant: "label", options: segOptions, onValueChange: () => {} }),
  decorators: [withAnnotations],
  parameters: {
    annotations: [
      { n: 1, each: true, target: ".composa-segmented-control > .composa-segmented-label", anchor: "center", type: "token", kind: "typography" },
    ],
  },
};

// Structural — icon variant versus label variant.
export const Structural = {
  render: () =>
    React.createElement(
      "div",
      { style: { display: "flex", flexDirection: "column", gap: 12 } },
      React.createElement(SegmentedControl, {
        label: "Flow",
        variant: "icon",
        value: "none",
        options: [
          { id: "none", icon: "flowNone", label: "No auto layout flow" },
          { id: "horizontal", icon: "flowHorizontal", label: "Horizontal auto layout" },
          { id: "vertical", icon: "flowVertical", label: "Vertical auto layout" },
          { id: "wrap", icon: "flowWrap", label: "Wrap auto layout" },
        ],
        onValueChange: () => {},
      }),
      React.createElement(SegmentedControl, { label: "View mode", variant: "label", options: segOptions, onValueChange: () => {} })
    ),
  decorators: [withAnnotations],
  parameters: {
    annotations: [
      { n: 1, target: ".composa-segmented-control:first-child", type: "variant", value: "icon", marker: "caret", side: "left" },
      { n: 2, target: ".composa-segmented-control:last-child", type: "variant", value: "label", marker: "caret", side: "left" },
    ],
  },
};

// Accessibility — COMPOSITE list semantics: container is role=tablist (one `list` pin with the
// full contract), and EVERY segment is bracketed as role=tab (`each` listitem). Replaces the old
// single "button" pin on the whole control.
export const Accessibility = {
  render: () => React.createElement(SegmentedControl, { label: "View mode", variant: "label", options: segOptions, onValueChange: () => {} }),
  decorators: [withAnnotations],
  parameters: {
    annotations: [
      {
        n: 1,
        target: ".composa-segmented-control",
        marker: "pin",
        side: "top",
        type: "list",
        element: "<div>",
        role: "tablist",
        accessibleName: "aria-label (the `label` prop)",
        itemRole: "tab",
        keyboard: [
          { keys: "Arrow keys", result: "move between segments" },
          { keys: "Enter / Space", result: "selects the focused segment" },
        ],
        states: [{ state: "each segment", aria: "role=tab; aria-selected: true | false" }],
        tier: { priority: "mandatory", difficulty: "advanced" },
      },
      {
        n: 2,
        each: true,
        target: '.composa-segmented-control [data-part="segment"]',
        marker: "bracket",
        side: "bottom",
        type: "listitem",
        role: "tab",
      },
    ],
  },
};
