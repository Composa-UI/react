import React from "react";
import { fn } from "storybook/test";
import { SelectionColorsSection } from "../../story-runtime.js";

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
  { id: "black", type: "Selection color", label: "Black", value: "#000000", selectionCount: 1 },
  { id: "white", type: "Selection color", label: "White", value: "#ffffff", selectionCount: 2 },
  { id: "blue", type: "Selection color", label: "Blue", value: "#0d99ff", selectionCount: 1 },
  { id: "green", type: "Selection color", label: "Green", value: "#14ae5c", selectionCount: 1 },
  { id: "red", type: "Selection color", label: "Red", value: "#f24822", selectionCount: 1 },
];

export default {
  title: "Composa UI/Components/Modules/Inspector/SelectionColorsSection",
  component: SelectionColorsSection,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "SelectionColorsSection is the inspector section for named selection colors. It shares the empty collapsed state and add/remove lifecycle with other value-backed inspector sections.",
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
      description: "Named selection color rows. Empty sections collapse.",
      table: { type: { summary: "PaintSectionItem[]" } },
    },
    expanded: {
      control: "boolean",
      description: "Controls whether rows are visible. Empty sections remain collapsed.",
    },
  },
};

export const Default = {
  render: (args) => React.createElement(SelectionColorsSection, args),
};

export const Collapsed = {
  args: {
    items,
    expanded: false,
  },
  render: (args) => React.createElement(SelectionColorsSection, args),
  parameters: {
    docs: {
      description: {
        story: "Collapsed with values: the header shows a compact color summary and overflow count instead of an add action.",
      },
    },
  },
};

export const Empty = {
  args: {
    items: [],
  },
  render: (args) => React.createElement(SelectionColorsSection, args),
  parameters: {
    docs: {
      description: {
        story: "No selection colors: the section is omitted.",
      },
    },
  },
};

export const RightPanelWidth = {
  render: (args) => panel(React.createElement(SelectionColorsSection, args)),
};
