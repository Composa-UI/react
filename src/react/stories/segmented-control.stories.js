import { SegmentedControlFamily } from "./composa-component-stories.js";
import React from "react";
import { SegmentedControl } from "../story-runtime.js";

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
