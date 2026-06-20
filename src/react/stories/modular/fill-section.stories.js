import React from "react";
import { fn } from "storybook/test";
import { FillSection } from "../../story-runtime.js";

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

const fillItems = [
  { id: "solid", type: "Fill", value: "FFFFFF", opacityValue: "100", visible: true },
];

export default {
  title: "Composa UI/Components/Modules/Inspector/FillSection",
  component: FillSection,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "FillSection is the right-panel paint section for fill values. Empty fill state collapses to a secondary property header; adding a fill expands the section into color rows.",
      },
    },
  },
  args: {
    items: fillItems,
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
      description: "Paint rows rendered by the section. An empty array renders the collapsed no-value state.",
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
  render: (args) => React.createElement(FillSection, args),
};

export const Collapsed = {
  args: {
    items: undefined,
    defaultItems: [],
  },
  render: (args) => React.createElement(FillSection, args),
  parameters: {
    docs: {
      description: {
        story: "No fill value: the property collapses back to a secondary-color section header.",
      },
    },
  },
};

export const MultipleValues = {
  args: {
    items: [
      { id: "solid", type: "Fill", value: "FFFFFF", opacityValue: "100", visible: true },
      { id: "gradient", type: "Gradient", value: "Angular", opacityValue: "100", visible: true },
      { id: "image", type: "Image", value: "Image", opacityValue: "100", visible: true },
    ],
  },
  render: (args) => React.createElement(FillSection, args),
  parameters: {
    docs: {
      description: {
        story: "Multiple fill values reuse the same row contract with per-row visibility and remove actions.",
      },
    },
  },
};

export const HiddenValue = {
  args: {
    items: [
      { id: "solid", type: "Fill", value: "FFFFFF", opacityValue: "100", visible: false },
    ],
  },
  render: (args) => React.createElement(FillSection, args),
  parameters: {
    docs: {
      description: {
        story: "Hidden fill value: only the value TEXT (the hex and the percent) reads disabled — the split/input chrome (frame, swatch, opacity box, % suffix) stays active-looking, and the eye action stays interactive to re-show. The visibility action switches to the hidden state.",
      },
    },
  },
};

export const RightPanelWidth = {
  render: (args) => panel(React.createElement(FillSection, args)),
  parameters: {
    docs: {
      description: {
        story: "Shows FillSection in the 240px right-panel width.",
      },
    },
  },
};
