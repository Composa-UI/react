import React from "react";
import { TabsFamily } from "./composa-component-stories.js";
import { Tabs } from "../story-runtime.js";
import { withAnnotations } from "./_annotations.js";

const editorTabs = [{ label: "Design", selected: true }, { label: "Prototype" }, { label: "Inspect" }];

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
