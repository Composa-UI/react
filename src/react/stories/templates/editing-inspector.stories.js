import React from "react";
import { EditingInspector, OverlayHost } from "../../story-runtime.js";

const shell = (story) =>
  React.createElement(
    OverlayHost,
    { className: "storybook-composa-inspector-stage" },
    React.createElement("div", { className: "storybook-composa-inspector-rail" }, story)
  );

const selectionColors = [
  { id: "black", type: "Selection color", label: "Black", value: "#000000", selectionCount: 1 },
  { id: "white", type: "Selection color", label: "White", value: "#ffffff", selectionCount: 2 },
  { id: "blue", type: "Selection color", label: "Blue", value: "#0d99ff", selectionCount: 1 },
  { id: "green", type: "Selection color", label: "Green", value: "#14ae5c", selectionCount: 1 },
  { id: "red", type: "Selection color", label: "Red", value: "#f24822", selectionCount: 1 },
];

export default {
  title: "Composa UI/Templates/Inspector/EditingInspector",
  component: EditingInspector,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Capability: PRESENTATIONAL PRESET. EditingInspector composes the inspector header, layer header, position, layout, paint, guide, and export sections into one scrollable right rail — but it holds its own internal state and ships hardcoded sample selection colors, and exposes no general value/onChange. It is a reference composition to read, not a binding seam. For live two-way editing, compose the controllable section primitives yourself (PositionSection, LayoutSection, AppearanceSection, ...) as shown on the Patterns/Live binding page.",
      },
    },
  },
  args: {
    layerTitle: "Frame",
    layoutMode: "autoLayout",
    selectionColors,
    showInspectorHeader: true,
    showLayerHeader: true,
    showLayoutSpacing: false,
    showLayoutClipContent: false,
  },
  argTypes: {
    layerTitle: {
      control: "text",
      description: "Layer name shown in the compact layer header.",
      table: { defaultValue: { summary: "Frame" } },
    },
    layoutMode: {
      control: "select",
      options: ["frame", "selection", "autoLayout"],
      description: "Layout state passed into LayoutSection.",
      table: { defaultValue: { summary: "autoLayout" } },
    },
    selectionColors: {
      control: "object",
      description: "Selection color values summarized by SelectionColorsSection.",
      table: { type: { summary: "PaintSectionItem[]" } },
    },
    showInspectorHeader: {
      control: "boolean",
      description: "Shows the mode and zoom header above the section stack.",
      table: { defaultValue: { summary: "true" } },
    },
    showLayerHeader: {
      control: "boolean",
      description: "Shows the selected layer header above the section stack.",
      table: { defaultValue: { summary: "true" } },
    },
    showLayoutSpacing: {
      control: "boolean",
      description: "Shows the Layout spacing row for selection states that expose spacing.",
      table: { defaultValue: { summary: "false" } },
    },
    showLayoutClipContent: {
      control: "boolean",
      description: "Shows Clip content for selection states that include a clip-capable item.",
      table: { defaultValue: { summary: "false" } },
    },
  },
};

export const Default = {
  render: (args) => shell(React.createElement(EditingInspector, args)),
};

export const FrameOrText = {
  args: {
    layoutMode: "frame",
    selectionColors: [],
  },
  render: (args) => shell(React.createElement(EditingInspector, args)),
  parameters: {
    docs: {
      description: {
        story: "Frame or text selected: layout uses the frame resizing state and hides empty selection colors.",
      },
    },
  },
};

export const MultiSelection = {
  args: {
    layerTitle: "3 layers",
    layoutMode: "selection",
    showLayoutSpacing: true,
    showLayoutClipContent: true,
  },
  render: (args) => shell(React.createElement(EditingInspector, args)),
  parameters: {
    docs: {
      description: {
        story: "Multiple selected objects: layout switches to flow and dimension controls while the surrounding inspector anatomy stays stable.",
      },
    },
  },
};
