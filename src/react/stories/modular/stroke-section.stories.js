import React from "react";
import { fn } from "storybook/test";
import { StrokeSection } from "../../story-runtime.js";

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

const strokeItems = [
  { id: "stroke", type: "Stroke", value: "000000", opacityValue: "100", visible: true },
];

export default {
  title: "Composa UI/Components/Modules/Inspector/StrokeSection",
  component: StrokeSection,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "StrokeSection is the right-panel paint section for stroke values. It shares the FillSection collapsed-header and color-row contract while keeping a stable StrokeSection component marker.",
      },
    },
  },
  args: {
    items: strokeItems,
    onExpandedChange: fn(),
    onAdd: fn(),
    onRemove: fn(),
    onVisibilityToggle: fn(),
    onValueChange: fn(),
    onOpacityChange: fn(),
  },
  argTypes: {
    items: {
      control: "object",
      description: "Stroke rows rendered by the section. An empty array renders the collapsed no-value state.",
      table: { type: { summary: "PaintSectionItem[]" } },
    },
    expanded: {
      control: "boolean",
      description: "Controls whether rows are visible. Empty sections remain collapsed.",
    },
    defaultExpanded: {
      control: "boolean",
      description: "Initial expanded state for uncontrolled usage.",
    },
  },
};

export const Default = {
  render: (args) => React.createElement(StrokeSection, args),
};

export const Collapsed = {
  args: {
    items: undefined,
    defaultItems: [],
  },
  render: (args) => React.createElement(StrokeSection, args),
  parameters: {
    docs: {
      description: {
        story: "No stroke value: the property collapses back to a secondary-color section header.",
      },
    },
  },
};

export const RightPanelWidth = {
  render: (args) => panel(React.createElement(StrokeSection, args)),
  parameters: {
    docs: {
      description: {
        story: "Shows StrokeSection in the 240px right-panel width.",
      },
    },
  },
};
