import React from "react";
import { fn } from "storybook/test";
import { PositionSection } from "../../story-runtime.js";

export default {
  title: "Composa UI/Components/Modules/Inspector/PositionSection",
  component: PositionSection,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "PositionSection is the right-panel transform section for alignment, X/Y position, constraints, rotation, and flip controls. It follows the newer 48px field-set layout: label above a dense 24px control row.",
      },
    },
  },
  args: {
    title: "Position",
    alignment: { horizontal: "left", vertical: "top" },
    position: { x: "128", y: "446" },
    rotation: "0°",
    onAlignmentChange: fn(),
    onPositionChange: fn(),
    onRotationChange: fn(),
    onConstraintsClick: fn(),
    onMoreClick: fn(),
    onRotateClick: fn(),
    onFlipHorizontalClick: fn(),
    onFlipVerticalClick: fn(),
  },
  argTypes: {
    title: {
      control: "text",
      description: "Section title.",
      table: { type: { summary: "string" }, defaultValue: { summary: "Position" } },
    },
    alignment: {
      control: "object",
      description: "Selected horizontal and vertical alignment values.",
      table: { type: { summary: "{ horizontal?: string; vertical?: string }" } },
    },
    position: {
      control: "object",
      description: "X and Y position values.",
      table: { type: { summary: "{ x?: string; y?: string }" } },
    },
    rotation: {
      control: "text",
      description: "Rotation value.",
      table: { type: { summary: "string" }, defaultValue: { summary: "0°" } },
    },
  },
};

export const Default = {
  render: (args) => React.createElement(PositionSection, args),
};

export const RightPanelWidth = {
  render: (args) =>
    React.createElement(
      "div",
      {
        style: {
          width: 240,
          outline: "1px solid var(--composa-color-border)",
          background: "var(--composa-color-bg)",
        },
      },
      React.createElement(PositionSection, args)
    ),
  parameters: {
    docs: {
      description: {
        story: "Shows PositionSection in the 240px right-panel width.",
      },
    },
  },
};
