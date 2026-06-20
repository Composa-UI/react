import React from "react";
import { fn } from "storybook/test";
import { LayerHeader } from "../../story-runtime.js";

export default {
  title: "Composa UI/Components/Modules/Inspector/LayerHeader",
  component: LayerHeader,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "LayerHeader is the compact section header used above layer/property content. It combines a dropdown-like layer type label with fixed 24px action icons.",
      },
    },
  },
  args: {
    title: "Frame",
    actions: [
      { id: "dev", icon: "dev", label: "Dev mode" },
      { id: "component", icon: "componentSmall", label: "Component" },
      { id: "more", icon: "more", label: "More layer actions" },
    ],
    onTitleClick: fn(),
    onAction: fn(),
  },
  argTypes: {
    title: {
      control: "text",
      description: "Layer type or selected layer label.",
      table: { type: { summary: "string" }, defaultValue: { summary: "Frame" } },
    },
    actions: {
      control: "object",
      description: "Action icon buttons shown on the trailing side.",
      table: { type: { summary: "LayerHeaderAction[]" } },
    },
  },
};

export const Default = {
  render: (args) => React.createElement(LayerHeader, args),
  parameters: {
    docs: {
      description: {
        story: "Default LayerHeader with a Frame dropdown label and three trailing action icons.",
      },
    },
  },
};

export const RightPanelWidth = {
  render: (args) =>
    React.createElement(
      "div",
      {
        style: {
          width: 240,
          borderLeft: "1px solid var(--composa-color-border)",
          borderRight: "1px solid var(--composa-color-border)",
          background: "var(--composa-color-bg)",
        },
      },
      React.createElement(LayerHeader, args)
    ),
  parameters: {
    docs: {
      description: {
        story: "Shows the header inside the 240px right-panel width.",
      },
    },
  },
};
