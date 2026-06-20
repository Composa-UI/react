import React from "react";
import { fn } from "storybook/test";
import { ExportSection } from "../../story-runtime.js";

const panel = (story) =>
  React.createElement(
    "div",
    {
      style: {
        width: 240,
        borderLeft: "1px solid var(--composa-color-border)",
        background: "var(--composa-color-bg)",
      },
    },
    story
  );

const items = [
  { id: "png", scale: "1x", format: "PNG" },
];

export default {
  title: "Composa UI/Components/Modules/Inspector/ExportSection",
  component: ExportSection,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "ExportSection is the inspector section for export settings. It starts collapsed when there are no export values, expands from plus, and collapses after the last row is removed.",
      },
    },
  },
  args: {
    items,
    onExpandedChange: fn(),
    onAdd: fn(),
    onRemove: fn(),
  },
  argTypes: {
    items: {
      control: "object",
      description: "Export setting rows. Empty sections collapse.",
      table: { type: { summary: "PaintSectionItem[]" } },
    },
    expanded: {
      control: "boolean",
      description: "Controls whether rows are visible. Empty sections remain collapsed.",
    },
  },
};

export const Default = {
  render: (args) => React.createElement(ExportSection, args),
};

export const Collapsed = {
  args: {
    items: undefined,
    defaultItems: [],
  },
  render: (args) => React.createElement(ExportSection, args),
};

export const RightPanelWidth = {
  render: (args) => panel(React.createElement(ExportSection, args)),
};
