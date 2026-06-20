import React from "react";
import { fn } from "storybook/test";
import { LayoutGuideSection } from "../../story-runtime.js";

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
  { id: "row", label: "Rows", value: "1 row", icon: "layoutGuideRows", settingsIcon: "layoutGuideRows" },
  { id: "column", label: "Columns", value: "1 column", icon: "layoutGuideColumns", settingsIcon: "layoutGuideColumns" },
];

export default {
  title: "Composa UI/Components/Modules/Inspector/LayoutGuideSection",
  component: LayoutGuideSection,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "LayoutGuideSection is the inspector section for row and column layout guides. It uses a collapsed empty state and dense 32px guide rows with settings, value, style, and remove actions.",
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
      description: "Layout guide rows. Empty sections collapse.",
      table: { type: { summary: "PaintSectionItem[]" } },
    },
    expanded: {
      control: "boolean",
      description: "Controls whether rows are visible. Empty sections remain collapsed.",
    },
  },
};

export const Default = {
  render: (args) => React.createElement(LayoutGuideSection, args),
};

export const Collapsed = {
  args: {
    items: undefined,
    defaultItems: [],
  },
  render: (args) => React.createElement(LayoutGuideSection, args),
};

export const RightPanelWidth = {
  render: (args) => panel(React.createElement(LayoutGuideSection, args)),
};
