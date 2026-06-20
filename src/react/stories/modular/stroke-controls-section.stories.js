import React from "react";
import { fn } from "storybook/test";
import { StrokeControlsSection } from "../../story-runtime.js";

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
  title: "Composa UI/Components/Modules/Inspector/StrokeControlsSection",
  component: StrokeControlsSection,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "StrokeControlsSection renders the expanded stroke controls that sit under stroke color rows: position, weight, alignment, and stroke settings dialog trigger.",
      },
    },
  },
  args: {
    position: "Center",
    weight: "1",
    align: "inside",
    settingsOpen: false,
    onPositionChange: fn(),
    onWeightChange: fn(),
    onAlignChange: fn(),
    onSettingsOpenChange: fn(),
  },
  argTypes: {
    position: {
      control: "text",
      description: "Selected stroke position shown in the dropdown.",
      table: { defaultValue: { summary: "Center" } },
    },
    weight: {
      control: "text",
      description: "Stroke weight value.",
      table: { defaultValue: { summary: "1" } },
    },
    align: {
      control: "select",
      options: ["inside", "center", "outside"],
      description: "Selected stroke alignment option.",
      table: { defaultValue: { summary: "inside" } },
    },
    settingsOpen: {
      control: "boolean",
      description: "Shows the stroke settings dialog and selected state on the settings action.",
      table: { defaultValue: { summary: "false" } },
    },
  },
};

export const Default = {
  render: (args) => React.createElement(StrokeControlsSection, args),
};

export const SettingsOpen = {
  args: {
    settingsOpen: true,
  },
  render: (args) => React.createElement(StrokeControlsSection, args),
  parameters: {
    docs: {
      description: {
        story:
          "Shows the stroke settings trigger in selected state with the settings dialog open.\n\n" +
          "**Figma divergence (deliberate, scoped out — not a defect).** Figma node `90:25924` " +
          "specifies a richer stroke dialog: a Basic/Dynamic/Brush tab row, a Style dropdown, a " +
          "Width-profile dropdown with a flip button, a Join segmented control (miter / round / " +
          "bevel), and a numeric Miter-angle field — with no dash/cap controls. Composa ships a " +
          "simpler dialog: a Style dropdown plus Dash/Gap fields shown when style = Dashed. " +
          "The fuller spec is deferred because (1) Join / Width-profile / Miter is a substantial " +
          "new build well beyond a fidelity fix, and (2) the join / miter / cap glyphs it needs do " +
          "not exist in the icon set yet. Revisit when stroke editing becomes load-bearing in the app.",
      },
    },
  },
};

export const RightPanelWidth = {
  render: (args) => panel(React.createElement(StrokeControlsSection, args)),
  parameters: {
    docs: {
      description: {
        story: "Shows StrokeControlsSection inside the 240px inspector width.",
      },
    },
  },
};
