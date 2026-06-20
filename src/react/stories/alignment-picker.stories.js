import React from "react";
import { fn } from "storybook/test";
import { AlignmentPicker, OverlayHost } from "../story-runtime.js";

export default {
  title: "Composa UI/Components/Base/AlignmentPicker",
  component: AlignmentPicker,
  // Each alignment point renders a FloatingTooltip that portals into the nearest
  // OverlayHost; wrap the stage so hovering a point actually shows its tooltip.
  decorators: [
    (Story) =>
      React.createElement(
        OverlayHost,
        { style: { display: "inline-block", padding: "48px" } },
        React.createElement(Story)
      ),
  ],
  parameters: {
    docs: {
      description: {
        component:
          "AlignmentPicker is a dense 3x3 single-select primitive for choosing an anchor or alignment point. Each point is an interactive button with its own tooltip; use it when the selected spatial point matters. Use ControlGroup for momentary alignment actions.",
      },
    },
  },
  args: {
    label: "Alignment",
    value: "top-left",
    width: "auto",
    disabled: false,
    tooltipPlacement: "bottom",
    onValueChange: fn(),
  },
  argTypes: {
    label: {
      control: "text",
      description: "Visible and accessible label for the 3x3 picker.",
      table: { defaultValue: { summary: "Alignment" } },
    },
    value: {
      control: "select",
      options: ["top-left", "top-center", "top-right", "middle-left", "center", "middle-right", "bottom-left", "bottom-center", "bottom-right"],
      description: "Selected alignment point.",
      table: { defaultValue: { summary: "top-left" } },
    },
    disabled: {
      control: "boolean",
      description: "Disables all alignment points.",
      table: { defaultValue: { summary: "false" } },
    },
    width: {
      control: "select",
      options: ["auto", "fill"],
      description: "Whether the picker uses its compact width or stretches the grid to fill the parent.",
      table: { defaultValue: { summary: "auto" } },
    },
    tooltipPlacement: {
      control: "select",
      options: ["top", "right", "bottom", "left"],
      description: "Tooltip placement for each point.",
      table: { defaultValue: { summary: "bottom" } },
    },
  },
};

function StatefulAlignmentPicker(args) {
  const [value, setValue] = React.useState(args.value);
  return React.createElement(AlignmentPicker, {
    ...args,
    value,
    onValueChange: (nextValue, option, index, event) => {
      setValue(nextValue);
      args.onValueChange?.(nextValue, option, index, event);
    },
  });
}

export const Default = {
  render: (args) => React.createElement(StatefulAlignmentPicker, args),
  parameters: {
    docs: {
      description: {
        story: "Shows the default top-left alignment point selected.",
      },
    },
  },
};

export const Center = {
  args: {
    value: "center",
  },
  render: (args) => React.createElement(StatefulAlignmentPicker, args),
  parameters: {
    docs: {
      description: {
        story: "Shows the selected state moved to the center point.",
      },
    },
  },
};

export const FillWidth = {
  args: {
    width: "fill",
    value: "center",
  },
  render: (args) =>
    React.createElement(
      "div",
      {
        style: {
          width: 160,
        },
      },
      React.createElement(StatefulAlignmentPicker, args)
    ),
  parameters: {
    docs: {
      description: {
        story: "Shows the picker stretching its grid across a wider parent while preserving the 3x3 model.",
      },
    },
  },
};
