import React from "react";
import { fn } from "storybook/test";
import { AppearanceSection } from "../../story-runtime.js";

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

export default {
  title: "Composa UI/Components/Modules/Inspector/AppearanceSection",
  component: AppearanceSection,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "AppearanceSection is the inspector section for object-level appearance controls. It combines opacity, corner radius, visibility, blend mode, and individual-corner toggles.",
      },
    },
  },
  args: {
    opacity: "100%",
    cornerRadius: "0",
    visible: true,
    blendMode: "Pass through",
    blendMenuOpen: false,
    individualCorners: false,
    onVisibilityToggle: fn(),
    onBlendModeToggle: fn(),
    onBlendModeChange: fn(),
    onIndividualCornersToggle: fn(),
  },
  argTypes: {
    opacity: {
      control: "text",
      description: "Opacity value shown in the opacity field.",
      table: { defaultValue: { summary: "100%" } },
    },
    cornerRadius: {
      control: "text",
      description: "Corner radius value shown in the radius field.",
      table: { defaultValue: { summary: "0" } },
    },
    visible: {
      control: "boolean",
      description: "Controls the visibility icon state.",
      table: { defaultValue: { summary: "true" } },
    },
    blendMode: {
      control: "select",
      options: ["Pass through", "Normal", "Darken", "Multiply", "Plus darker", "Color burn", "Lighten", "Screen", "Plus lighter", "Color dodge", "Overlay", "Soft light", "Hard light", "Difference", "Exclusion", "Hue", "Saturation", "Color", "Luminosity"],
      description: "Selected blend mode in the menu.",
      table: { defaultValue: { summary: "Pass through" } },
    },
    blendMenuOpen: {
      control: "boolean",
      description: "Shows the blend-mode menu and selected state on the blend action.",
      table: { defaultValue: { summary: "false" } },
    },
    individualCorners: {
      control: "boolean",
      description: "Pressed state for the individual-corners toggle.",
      table: { defaultValue: { summary: "false" } },
    },
  },
};

export const Default = {
  render: (args) => React.createElement(AppearanceSection, args),
};

export const BlendMenuOpen = {
  args: {
    blendMenuOpen: true,
  },
  render: (args) => React.createElement(AppearanceSection, args),
  parameters: {
    docs: {
      description: {
        story: "Shows the blend-mode action in its active state with the menu open.",
      },
    },
  },
};

export const Hidden = {
  args: {
    visible: false,
  },
  render: (args) => React.createElement(AppearanceSection, args),
  parameters: {
    docs: {
      description: {
        story: "Shows the visibility action after appearance has been hidden.",
      },
    },
  },
};

export const RightPanelWidth = {
  render: (args) => panel(React.createElement(AppearanceSection, args)),
  parameters: {
    docs: {
      description: {
        story: "Shows AppearanceSection in the 240px inspector width.",
      },
    },
  },
};
