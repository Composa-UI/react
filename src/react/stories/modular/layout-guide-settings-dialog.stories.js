import React from "react";
import { fn } from "storybook/test";
import { LayoutGuideSettingsDialog, OverlayHost } from "../../story-runtime.js";

const stage = (story) =>
  React.createElement(
    OverlayHost,
    { className: "storybook-composa-inspector-stage" },
    React.createElement(
      "div",
      { className: "storybook-composa-inspector-rail" },
      React.createElement(
        "div",
        { style: { width: "100%", padding: "12px", boxSizing: "border-box" } },
        story
      )
    )
  );

export default {
  title: "Composa UI/Components/Modules/Inspector/LayoutGuideSettingsDialog",
  component: LayoutGuideSettingsDialog,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "LayoutGuideSettingsDialog edits a grid/column/row guide: type, count, color (swatch + hex + opacity), behavior, width/height, margin, and gutter. Switching the guide type between Columns, Rows, and Grid changes which fields are shown. It floats beside the inspector rail at inspector-dialog placement.",
      },
    },
  },
  args: {
    guideType: "columns",
    count: "5",
    color: "FF0000",
    opacity: "10",
    behavior: "Stretch",
    size: "Auto",
    margin: "0",
    gutter: "20",
    onGuideTypeChange: fn(),
    onCountChange: fn(),
    onColorChange: fn(),
    onOpacityChange: fn(),
    onBehaviorChange: fn(),
    onSizeChange: fn(),
    onMarginChange: fn(),
    onGutterChange: fn(),
    onClose: fn(),
  },
  argTypes: {
    guideType: {
      control: "select",
      options: ["columns", "rows", "grid"],
      description: "Layout guide type. Grid collapses behavior/size into a single Size field.",
    },
    count: { control: "text", description: "Number of columns/rows." },
    color: { control: "text", description: "Guide color as a hex string." },
    opacity: { control: "text", description: "Guide opacity percentage." },
    behavior: {
      control: "select",
      options: ["Stretch", "Left", "Center", "Right"],
      description: "Column/row stretch behavior.",
    },
  },
};

export const FloatingOverRail = {
  render: (args) => stage(React.createElement(LayoutGuideSettingsDialog, args)),
  parameters: {
    docs: {
      description: {
        story: "Columns guide settings floating beside the inspector rail over an overflow stage.",
      },
    },
  },
};

export const Columns = {
  render: (args) => React.createElement(LayoutGuideSettingsDialog, args),
};

export const Rows = {
  args: { guideType: "rows", size: "Auto" },
  render: (args) => React.createElement(LayoutGuideSettingsDialog, args),
  parameters: {
    docs: { description: { story: "Rows variant: the size field becomes Height." } },
  },
};

export const Grid = {
  args: { guideType: "grid", gutter: "8" },
  render: (args) => React.createElement(LayoutGuideSettingsDialog, args),
  parameters: {
    docs: { description: { story: "Grid variant: behavior and width/height collapse into a single Size field." } },
  },
};
