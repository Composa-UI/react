import React from "react";
import { TabsFamily } from "./composa-component-stories.js";
import { Tabs } from "../story-runtime.js";
import { withAnnotations } from "./_annotations.js";

const editorTabs = [{ label: "Design", selected: true }, { label: "Prototype" }, { label: "Inspect" }];

const allStateTabs = [
  { label: "Selected", selected: true },
  { label: "Unselected" },
  { label: "Hover", state: "hover" },
  { label: "Focused", state: "focused" },
];

export default {
  title: "Composa UI/Components/Base/Tabs",
  parameters: {
    docs: {
      description: {
        component:
          "Tabs switch between sibling content regions in the same view, with one tab selected at a time. Use them for page-level or panel-level content the user moves between, like an inspector's Design / Prototype / Inspect. Tabs sit at the top of the region they control and carry a bottom rule that anchors the row. Use SegmentedControl instead for an inline mode toggle rather than a content switch.",
      },
    },
  },
};

export const Playground = TabsFamily;

// Anatomy — each tab carries data-part="tab".
export const Anatomy = {
  render: () => React.createElement(Tabs, { label: "Editor views", tabs: editorTabs, onValueChange: () => {} }),
  decorators: [withAnnotations],
  parameters: { annotations: [{ type: "anatomy", target: ".composa-tabs" }] },
};

// Typography — the tab label type token (derived). Typography facet.
export const Typography = {
  render: () => React.createElement(Tabs, { label: "Editor views", tabs: editorTabs, onValueChange: () => {} }),
  decorators: [withAnnotations],
  parameters: { annotations: [{ n: 1, target: '.composa-tabs [data-part="tab"] .composa-tab-label', marker: "pin", side: "bottom", type: "token", kind: "typography", anchor: "center" }] },
};

// Accessibility — COMPOSITE list semantics (same shape as SegmentedControl): container is
// role=tablist (one `list` pin + contract), and EVERY tab is bracketed as role=tab.
export const Accessibility = {
  render: () => React.createElement(Tabs, { label: "Editor views", tabs: editorTabs, onValueChange: () => {} }),
  decorators: [withAnnotations],
  parameters: {
    annotations: [
      {
        n: 1,
        target: ".composa-tabs",
        marker: "pin",
        side: "top",
        type: "list",
        element: "<div>",
        role: "tablist",
        accessibleName: "aria-label (the `label` prop)",
        itemRole: "tab",
        keyboard: [
          { keys: "Arrow keys", result: "move between tabs" },
          { keys: "Enter / Space", result: "selects the focused tab" },
        ],
        states: [{ state: "each tab", aria: "role=tab; aria-selected: true | false" }],
        tier: { priority: "mandatory", difficulty: "advanced" },
      },
      {
        n: 2,
        each: true,
        target: '.composa-tabs [data-part="tab"]',
        marker: "bracket",
        side: "bottom",
        type: "listitem",
        role: "tab",
      },
    ],
  },
};

// Color — fill and text token bindings for selected and unselected states.
// Token names are semantic (resolved by the renderer against the live DOM).
export const Color = {
  render: () =>
    React.createElement(Tabs, { label: "Editor views", tabs: editorTabs, onValueChange: () => {} }),
  decorators: [withAnnotations],
  parameters: {
    annotations: [
      {
        n: 1,
        target: '.composa-tabs [data-part="tab"].is-selected',
        marker: "pin",
        side: "bottom",
        type: "token",
        kind: "color",
        name: "color.bg.secondary",
      },
      {
        n: 2,
        target: '.composa-tabs [data-part="tab"]:not(.is-selected)',
        marker: "pin",
        side: "bottom",
        type: "token",
        kind: "color",
        name: "color.bg",
      },
      {
        n: 3,
        target: '.composa-tabs [data-part="tab"].is-selected .composa-tab-label',
        marker: "pin",
        side: "top",
        type: "token",
        kind: "color",
        name: "color.text",
        prop: "color",
      },
      {
        n: 4,
        target: '.composa-tabs [data-part="tab"]:not(.is-selected) .composa-tab-label',
        marker: "pin",
        side: "top",
        type: "token",
        kind: "color",
        name: "color.text.secondary",
        prop: "color",
      },
    ],
  },
};

// States — all four interactive states shown simultaneously on a single tabstrip.
export const States = {
  render: () =>
    React.createElement(Tabs, { label: "Tab states", tabs: allStateTabs, onValueChange: () => {} }),
  decorators: [withAnnotations],
  parameters: {
    annotations: [
      {
        n: 1,
        target: '.composa-tabs [data-part="tab"].is-selected',
        marker: "caret",
        side: "bottom",
        type: "variant",
        value: "selected",
      },
      {
        n: 2,
        target: '.composa-tabs [data-part="tab"]:not(.is-selected):not(.is-hover):not(.is-focused)',
        marker: "caret",
        side: "bottom",
        type: "variant",
        value: "unselected",
      },
      {
        n: 3,
        target: '.composa-tabs [data-part="tab"].is-hover',
        marker: "caret",
        side: "bottom",
        type: "variant",
        value: "hover",
      },
      {
        n: 4,
        target: '.composa-tabs [data-part="tab"].is-focused',
        marker: "caret",
        side: "bottom",
        type: "variant",
        value: "focused",
      },
    ],
  },
};

// Spacing — structural dimension redlines: container height, tab height, inter-tab gap.
export const Spacing = {
  render: () =>
    React.createElement(Tabs, { label: "Editor views", tabs: editorTabs, onValueChange: () => {} }),
  decorators: [withAnnotations],
  parameters: {
    annotations: [
      { n: 1, type: "redline", target: ".composa-tabs", dimension: "height" },
      { n: 2, type: "redline", target: '.composa-tabs [data-part="tab"]', dimension: "height" },
      {
        n: 3,
        type: "gap",
        target: '.composa-tabs [data-part="tab"]:nth-child(1)',
        targetB: '.composa-tabs [data-part="tab"]:nth-child(2)',
      },
    ],
  },
};

// Variant — pill (default) vs underline structural comparison.
// Pill: base .composa-tabs behavior (selected tab gets bg-secondary fill + radius).
// Underline: adds .composa-tabs-underline, swaps fill for a baseline underline indicator.
export const Variant = {
  render: () =>
    React.createElement(
      "div",
      { style: { display: "flex", flexDirection: "column", gap: 32, padding: 16 } },
      React.createElement(Tabs, { label: "Pill tabs", tabs: editorTabs, onValueChange: () => {} }),
      React.createElement(Tabs, { label: "Underline tabs", variant: "underline", tabs: editorTabs, onValueChange: () => {} })
    ),
  decorators: [withAnnotations],
  parameters: {
    annotations: [
      { n: 1, target: ".composa-tabs:not(.composa-tabs-underline)", marker: "pin", side: "top", type: "variant", value: "pill" },
      { n: 2, target: ".composa-tabs-underline", marker: "pin", side: "top", type: "variant", value: "underline" },
    ],
  },
};
