import React from "react";
import { fn } from "storybook/test";
import {
  EditorShell,
  AppNavigationRail,
  EditorNavigator,
  EditorToolbar,
  EditingInspector,
  OverlayHost,
  OverlayPortal,
} from "../../story-runtime.js";
import { AppTopBar, shellStage } from "./_shell-helpers.js";

// EditorShell is presentational: it owns the four-region grid only. This story
// composes the REAL Composa modules into the slots with realistic sample data so
// the layout reads like a true editor screen. The slot API stays generic — the
// modules are wired here in the composition, not hardcoded inside the template.

const navigationRail = React.createElement(AppNavigationRail, {
  appLabel: "Composa",
  value: "slides",
  items: [
    { value: "slides", label: "Slides", icon: "image" },
    { value: "assets", label: "Assets", icon: "componentSmall" },
  ],
  onValueChange: fn(),
  onAppClick: fn(),
});

// Real navigator with pages + a nested layer tree.
const navigator = React.createElement(EditorNavigator, {
  title: "Earthling Mobile Refresh",
  project: "Mobile Refresh",
  pages: [
    { id: "overview", name: "Overview" },
    { id: "typography", name: "Typography" },
    { id: "feedback", name: "Design Crit Feedback" },
    { id: "archive", name: "Archive" },
  ],
  defaultSelectedPageId: "overview",
  layers: [
    {
      id: "frame-1",
      name: "Frame 1",
      kind: "frame",
      expanded: true,
      children: [
        { id: "header", name: "Header / Desktop", kind: "component" },
        {
          id: "frame-2",
          name: "Content",
          kind: "frame",
          children: [
            { id: "assistant", name: "Assistant", kind: "frame" },
            { id: "button", name: "Button / Active", kind: "instance" },
            { id: "footer", name: "Footer", kind: "frame" },
          ],
        },
      ],
    },
    { id: "warning", name: "Warning", kind: "frame" },
  ],
  defaultSelectedLayerId: "header",
  defaultPageHeight: 160,
  onPageSelect: fn(),
  onLayerSelect: fn(),
  onPageAdd: fn(),
});

// A simple canvas placeholder is fine for the canvas region itself.
const canvas = React.createElement(
  "div",
  {
    style: {
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "var(--composa-color-text-secondary)",
      fontFamily: "var(--composa-font-family)",
      fontSize: "12px",
    },
  },
  "Canvas"
);

// Real editor toolbar as the floating canvas overlay.
const canvasToolbar = React.createElement(EditorToolbar, {
  defaultActiveTool: "move",
  onToolChange: fn(),
});

// Real inspector. EditingInspector renders transient menus/dialogs through the
// overlay system, so it gets its own OverlayHost wrapper inside the slot.
const inspector = React.createElement(
  OverlayHost,
  { style: { height: "100%", display: "flex", flexDirection: "column", minHeight: 0 } },
  React.createElement(EditingInspector, {
    layerTitle: "Header / Desktop",
    layoutMode: "autoLayout",
    selectionColors: [
      { id: "black", type: "Selection color", label: "Black", value: "#000000", selectionCount: 1 },
      { id: "orange", type: "Selection color", label: "Orange", value: "#ff5c16", selectionCount: 2 },
      { id: "white", type: "Selection color", label: "White", value: "#ffffff", selectionCount: 1 },
    ],
    showInspectorHeader: true,
    showLayerHeader: true,
  })
);

// Top bar — Design editor variant shows Design / Prototype / Dev mode tabs.
const appTopBar = React.createElement(AppTopBar, {
  appLabel: "Composa",
  fileName: "Earthling Mobile Refresh",
  mode: "design",
  modes: [
    { id: "design", label: "Design" },
    { id: "prototype", label: "Prototype" },
    { id: "dev", label: "Dev" },
  ],
  collaborators: [
    { initials: "W", color: "yellow", label: "Wendy" },
    { initials: "A", color: "green", label: "Abe" },
  ],
  shareLabel: "Share",
});

// shellStage stacks the top bar above the editor in a full-viewport grid.
const stage = function (story) { return shellStage(appTopBar, story); };

export default {
  title: "Composa UI/Templates/Editor/EditorShell",
  component: EditorShell,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "EditorShell is the four-region editor layout template: navigationRail, navigator, canvas, and inspector, left to right. It is purely presentational and controlled — it owns the CSS grid and responsive behavior only. The editor toolbar is a floating overlay anchored inside the canvas via OverlayHost / OverlayPortal, not a shell row. There is deliberately no top toolbar, status bar, or timeline. This story composes the real Composa modules (AppNavigationRail, EditorNavigator, EditorToolbar, EditingInspector) into the slots. AppTopBar sits above the shell via shellStage.",
      },
    },
  },
  args: {
    navigationRail,
    navigator,
    canvas,
    inspector,
    canvasToolbar,
    resizableSides: true,
    label: "Editor",
  },
  argTypes: {
    navigationRail: { control: false, description: "Left navigation rail slot (AppNavigationRail)." },
    navigator: { control: false, description: "Navigator panel slot (EditorNavigator: pages + layers)." },
    canvas: { control: false, description: "Center canvas slot; shrinks responsively." },
    inspector: { control: false, description: "Right inspector slot (EditingInspector)." },
    canvasToolbar: { control: false, description: "Floating EditorToolbar rendered through OverlayPortal inside the canvas." },
    resizableSides: {
      control: "boolean",
      description:
        "Opt-in: makes the navigator (left) and inspector (right) columns resizable via a draggable role=separator handle (keyboard: Left/Right arrows, Home/End). Pass `true` for both or `{ left, right }` for per-side opt-in. The center canvas keeps absorbing the difference and the side tracks never wrap.",
      table: { defaultValue: { summary: "false" } },
    },
    canvasToolbarPlacement: {
      control: "select",
      options: ["top", "bottom", "top-left", "top-right", "bottom-left", "bottom-right"],
      description:
        "How the floating canvas toolbar hangs off its bottom-center anchor. The default `top` makes it float ABOVE the bottom anchor, i.e. bottom-center of the canvas (Figma convention).",
      table: { defaultValue: { summary: "top" } },
    },
    canvasToolbarAlign: {
      control: "select",
      options: ["start", "center", "end"],
      description: "Horizontal alignment of the floating canvas toolbar relative to its anchor.",
      table: { defaultValue: { summary: "center" } },
    },
    label: { control: "text", table: { defaultValue: { summary: "Editor" } } },
  },
};

export const Default = {
  render: function (args) { return stage(React.createElement(EditorShell, args)); },
  parameters: {
    docs: {
      description: {
        story: "Full editor shell with AppTopBar above. The floating EditorToolbar anchors bottom-center of the canvas region by default (Figma/standard-editor convention).",
      },
    },
  },
};

export const NarrowViewport = {
  render: function (args) {
    return shellStage(
      appTopBar,
      React.createElement(
        "div",
        { style: { width: "1100px", height: "100%", border: "1px solid var(--composa-color-border)" } },
        React.createElement(EditorShell, args)
      )
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Constrained to a tablet-ish width. The rail + navigator (left) and inspector (right) hold their fixed widths and do not wrap; only the center canvas shrinks.",
      },
    },
  },
};

export const ResizableSides = {
  args: {
    resizableSides: true,
    defaultNavigatorWidth: 260,
    defaultInspectorWidth: 240,
  },
  render: function (args) { return stage(React.createElement(EditorShell, args)); },
  parameters: {
    docs: {
      description: {
        story:
          "Both side columns are resizable. Drag the hairline on the navigator's right edge or the inspector's left edge, or focus a handle and use Left/Right arrows (Shift for a larger step) and Home/End for min/max. The navigator and inspector hold their no-wrap rule while the center canvas shrinks to absorb the change. Pass `resizableSides={{ left: true, right: false }}` to opt in per side.",
      },
    },
  },
};

export const Interactive = {
  args: {
    onClick: fn(),
  },
  render: function (args) { return stage(React.createElement(EditorShell, args)); },
};
