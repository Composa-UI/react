import React from "react";
import { fn } from "storybook/test";
import { ColorPickerDialog, ColorPickerTrigger, OverlayHost } from "../../story-runtime.js";

// Overflow-friendly stage: a right-aligned 240px rail with surrounding room so
// the dialog can float to the left of the rail (inspector-dialog placement) and
// any clipping/placement bug is visible. Mirrors the EditingInspector stage.
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
  title: "Composa UI/Components/Modules/Inspector/ColorPickerDialog",
  component: ColorPickerDialog,
  // The MDX page (color-picker-dialog.mdx) owns the Docs tab.
  tags: ["!autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "ColorPickerDialog is the heaviest inspector dialog: a Spectrum-style color/fill picker with a drag-to-pick 2D saturation/brightness area, draggable hue and alpha sliders, a real EyeDropper (when supported), and editable hex/RGB/HSL/CSS fields that round-trip bidirectionally. Custom/Libraries are real Tabs. The body swaps on paint type: solid, gradient (linear/radial + editable stops), and image (fill-mode + drop-zone). Mount it through OverlayPortal at inspector-dialog placement (followAnchor=false). ColorPickerTrigger wires that mount from an inline swatch button.",
      },
    },
  },
  args: {
    value: "0D99FF",
    opacity: "100",
    paintType: "solid",
    format: "hex",
    tab: "custom",
    gradientType: "linear",
    imageFillMode: "fill",
    swatches: ["383838", "F5F5F5", "1E1E1E", "0D99FF"],
    onValueChange: fn(),
    onOpacityChange: fn(),
    onPaintTypeChange: fn(),
    onFormatChange: fn(),
    onTabChange: fn(),
    onGradientTypeChange: fn(),
    onGradientStopsChange: fn(),
    onImageFillModeChange: fn(),
    onImageUpload: fn(),
    onEyedropper: fn(),
    onClose: fn(),
  },
  argTypes: {
    value: { control: "text", description: "Current color as a hex string (no leading #)." },
    opacity: { control: "text", description: "Opacity percentage value." },
    paintType: {
      control: "select",
      options: ["solid", "gradient", "image", "video"],
      description: "Selected paint type in the paint-type field set.",
    },
    format: {
      control: "select",
      options: ["hex", "rgb", "hsl", "css"],
      description: "Selected value format. Hex is editable; others reflect the current color.",
    },
    tab: {
      control: "select",
      options: ["custom", "libraries"],
      description: "Active header tab (real Tabs, not a SegmentedPicker).",
    },
    gradientType: {
      control: "select",
      options: ["linear", "radial", "angular", "diamond"],
      description: "Gradient type when the gradient paint type is selected.",
    },
    imageFillMode: {
      control: "select",
      options: ["fill", "fit", "crop", "tile"],
      description: "Image fill mode when the image paint type is selected.",
    },
  },
};

// Shown floating beside the rail, opened over the overflow stage so placement
// and clipping are visible.
export const FloatingOverRail = {
  render: (args) =>
    stage(
      React.createElement(ColorPickerTrigger, {
        defaultOpen: true,
        label: "Fill color",
        value: args.value,
        dialogProps: args,
      })
    ),
  parameters: {
    docs: {
      description: {
        story: "The picker opened from an inline swatch trigger, floating to the left of the 240px inspector rail.",
      },
    },
  },
};

export const Default = {
  render: (args) => React.createElement(ColorPickerDialog, args),
};

export const GradientPaint = {
  args: {
    paintType: "gradient",
    gradientStops: [
      { position: 0, color: "000000", opacity: 100 },
      { position: 100, color: "666666", opacity: 100 },
    ],
  },
  render: (args) => React.createElement(ColorPickerDialog, args),
  parameters: {
    docs: { description: { story: "Gradient body (Figma 89:8771): linear/radial dropdown, gradient preview, and an editable stops list (position %, hex, opacity, remove). The add-stop button inserts a midpoint stop." } },
  },
};

export const ImagePaint = {
  args: { paintType: "image", imageFillMode: "fill" },
  render: (args) => React.createElement(ColorPickerDialog, args),
  parameters: {
    docs: { description: { story: "Image body (Figma 89:13859): fill-mode dropdown plus a checkerboard drop-zone with an Upload from computer button (and a drag-and-drop target)." } },
  },
};

export const LibrariesTab = {
  args: { tab: "libraries" },
  render: (args) => React.createElement(ColorPickerDialog, args),
  parameters: {
    docs: { description: { story: "Libraries tab panel content (empty/managed state). The paint-type row is hidden while the Libraries tab is active." } },
  },
};

export const RgbFormat = {
  args: { format: "rgb" },
  render: (args) => React.createElement(ColorPickerDialog, args),
  parameters: {
    docs: { description: { story: "RGB value format derived from the current color. All formats (hex, RGB, HSL, CSS) are editable and round-trip bidirectionally." } },
  },
};
