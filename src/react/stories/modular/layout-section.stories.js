import React from "react";
import { fn } from "storybook/test";
import { LayoutSection } from "../../story-runtime.js";

export default {
  title: "Composa UI/Components/Modules/Inspector/LayoutSection",
  component: LayoutSection,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "LayoutSection is the right-panel layout inspector section. It models frame/text, multi-selection, and auto-layout states while keeping flow, dimensions, spacing, padding, and clip-content controls as reusable inspector patterns.",
      },
    },
  },
  args: {
    mode: "frame",
    flow: "none",
    resizing: { width: "auto-width", height: "auto-height" },
    dimensions: { width: "1200", height: "115" },
    alignment: "top-left",
    spacing: "24",
    padding: { horizontal: "0", vertical: "0" },
    clipContent: false,
    individualPadding: false,
    lockAspectRatio: false,
    showSpacing: false,
    onFlowChange: fn(),
    onResizingChange: fn(),
    onDimensionChange: fn(),
    onAlignmentChange: fn(),
    onSpacingChange: fn(),
    onPaddingChange: fn(),
    onResizeToFit: fn(),
    onAutoLayoutToggle: fn(),
    onLockAspectRatio: fn(),
    onAutoLayoutSettings: fn(),
    onIndividualPaddingToggle: fn(),
    onClipContentChange: fn(),
  },
  argTypes: {
    mode: {
      control: "select",
      options: ["frame", "selection", "autoLayout"],
      description: "Selected-object layout state.",
      table: { defaultValue: { summary: "frame" } },
    },
    flow: {
      control: "select",
      options: ["none", "horizontal", "vertical", "wrap"],
      description: "Selected flow segment.",
    },
    resizing: {
      control: "object",
      description: "Width and height resizing values.",
    },
    dimensions: {
      control: "object",
      description: "Width and height numeric values.",
    },
    alignment: {
      control: "select",
      options: ["top-left", "top-center", "top-right", "middle-left", "center", "middle-right", "bottom-left", "bottom-center", "bottom-right"],
      description: "Selected auto-layout alignment point.",
      table: { defaultValue: { summary: "top-left" } },
    },
    spacing: {
      control: "text",
      description: "Auto-layout or selection spacing value.",
    },
    padding: {
      control: "object",
      description: "Auto-layout padding values.",
    },
    clipContent: {
      control: "boolean",
      description: "Clip content checkbox state.",
      table: { defaultValue: { summary: "false" } },
    },
    lockAspectRatio: {
      control: "boolean",
      description: "Pressed state for the aspect-ratio toggle.",
      table: { defaultValue: { summary: "false" } },
    },
    showSpacing: {
      control: "boolean",
      description: "Shows the spacing row for selection states that expose selection spacing.",
      table: { defaultValue: { summary: "false" } },
    },
    showClipContent: {
      control: "boolean",
      description: "Shows the clip-content row for selected objects that support clipping.",
    },
  },
};

const panel = (story) =>
  React.createElement(
    "div",
    {
      style: {
        width: 240,
        outline: "1px solid var(--composa-color-border)",
        background: "var(--composa-color-bg)",
      },
    },
    story
  );

export const FrameOrText = {
  args: {
    mode: "frame",
    resizing: { width: "auto-width", height: "auto-height" },
    dimensions: { width: "1200", height: "115" },
  },
  render: (args) => React.createElement(LayoutSection, args),
  parameters: {
    docs: {
      description: {
        story: "Frame/text selected: resizing segment plus W/H resizing fields.",
      },
    },
  },
};

export const MultiSelection = {
  args: {
    mode: "selection",
    flow: "none",
    dimensions: { width: "1200", height: "189" },
    alignment: "top-left",
    spacing: "24",
    showSpacing: true,
    showClipContent: true,
  },
  render: (args) => React.createElement(LayoutSection, args),
  parameters: {
    docs: {
      description: {
        story: "Multiple elements selected: flow segment, dimension fields, spacing, clip content, and header actions.",
      },
    },
  },
};

export const AutoLayout = {
  args: {
    mode: "autoLayout",
    flow: "horizontal",
    resizing: { width: "fixed", height: "hug" },
    dimensions: { width: "1200", height: "189" },
    spacing: "24",
    padding: { horizontal: "0", vertical: "0" },
  },
  render: (args) => React.createElement(LayoutSection, args),
  parameters: {
    docs: {
      description: {
        story: "Auto-layout selected: pressed auto-layout header toggle plus alignment/gap and padding controls.",
      },
    },
  },
};

export const RightPanelWidth = {
  args: AutoLayout.args,
  render: (args) => panel(React.createElement(LayoutSection, args)),
  parameters: {
    docs: {
      description: {
        story: "Shows LayoutSection at the 240px inspector width.",
      },
    },
  },
};
