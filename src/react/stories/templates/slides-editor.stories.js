import React from "react";
import { fn } from "storybook/test";
import {
  SlidesEditorTemplate,
  AppNavigationRail,
  SlidesNavigator,
  EditorToolbar,
  EditingInspector,
  OverlayHost,
} from "../../story-runtime.js";

// SlidesEditorTemplate is a thin slides preset of EditorShell. This story composes
// the REAL Composa modules into the slots with realistic sample data; the slides
// navigator goes in the navigator slot. The template keeps its default present-mode
// toggle as the floating canvas toolbar. Modules are wired here in the composition,
// not hardcoded inside the template.

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

// Inline slide previews stand in for slide artwork (no external image dependency).
function SlidePreview({ title, body }) {
  return React.createElement(
    "div",
    {
      style: {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: 4,
        padding: 12,
        boxSizing: "border-box",
        background: "var(--composa-color-bg)",
        textAlign: "left",
      },
    },
    [
      React.createElement("strong", { key: "t", style: { fontSize: 9, color: "var(--composa-color-text)" } }, title),
      body ? React.createElement("span", { key: "b", style: { fontSize: 6, color: "var(--composa-color-text-secondary)" } }, body) : null,
    ]
  );
}

const navigator = React.createElement(SlidesNavigator, {
  title: "Earthling Mobile Refresh",
  project: "Mobile Refresh",
  slides: [
    { id: "s1", thumbnail: React.createElement(SlidePreview, { title: "Slide Deck Title", body: "This is just the opening of something big." }) },
    { id: "s2", thumbnail: React.createElement(SlidePreview, { title: "Highlight", body: "Use this slide to highlight a single important thing." }) },
    { id: "s3", thumbnail: React.createElement(SlidePreview, { title: "Agenda", body: "Three things to cover today." }) },
    { id: "s4", thumbnail: React.createElement(SlidePreview, { title: "Wrap up", body: "Next steps and owners." }) },
  ],
  defaultSelectedSlideId: "s1",
  onSlideSelect: fn(),
  onNewSlide: fn(),
  onAddSlide: fn(),
});

// The same floating creation toolbar used in EditorShell, in the slides canvas too.
const canvasToolbar = React.createElement(EditorToolbar, {
  defaultActiveTool: "move",
  onToolChange: fn(),
  label: "Canvas tools",
});

// A simple canvas placeholder is fine for the slide canvas region itself.
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
  "Slide canvas"
);

// Real inspector. EditingInspector renders transient menus/dialogs through the
// overlay system, so it gets its own OverlayHost wrapper inside the slot.
const inspector = React.createElement(
  OverlayHost,
  { style: { height: "100%", display: "flex", flexDirection: "column", minHeight: 0 } },
  React.createElement(EditingInspector, {
    layerTitle: "Slide Deck Title",
    layoutMode: "frame",
    selectionColors: [
      { id: "ink", type: "Selection color", label: "Ink", value: "#111111", selectionCount: 1 },
      { id: "orange", type: "Selection color", label: "Orange", value: "#ff5c16", selectionCount: 1 },
    ],
    showInspectorHeader: true,
    showLayerHeader: true,
  })
);

export default {
  title: "Composa UI/Templates/Editor/SlidesEditor",
  component: SlidesEditorTemplate,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "SlidesEditorTemplate is a thin slides-oriented preset of EditorShell. It supplies slides defaults and a present-mode toggle as the floating canvas toolbar, and forwards every slot to EditorShell. It owns no document model. This story composes the real Composa modules (AppNavigationRail, SlidesNavigator, EditingInspector) into the slots.",
      },
    },
  },
  args: {
    navigationRail,
    navigator,
    canvas,
    canvasToolbar,
    inspector,
    resizableSides: true,
    presentMode: false,
    label: "Slides editor",
    onPresentModeChange: fn(),
  },
  argTypes: {
    navigationRail: { control: false, description: "Left navigation rail slot (AppNavigationRail)." },
    navigator: { control: false, description: "Navigator slot (SlidesNavigator: slide strip)." },
    canvas: { control: false, description: "Center slide-canvas slot; shrinks responsively." },
    inspector: { control: false, description: "Right inspector slot (EditingInspector)." },
    resizableSides: {
      control: "boolean",
      description:
        "Opt-in: makes the navigator (left) and inspector (right) columns resizable via a draggable role=separator handle (forwarded to EditorShell). Pass `true` for both or `{ left, right }` for per-side opt-in.",
      table: { defaultValue: { summary: "false" } },
    },
    canvasToolbar: { control: false, description: "Overrides the default present-mode toggle placeholder." },
    presentMode: {
      control: "boolean",
      description: "Whether present mode is active (placeholder; app repo owns real present mode).",
      table: { defaultValue: { summary: "false" } },
    },
    label: { control: "text", table: { defaultValue: { summary: "Slides editor" } } },
  },
};

const stage = (story) =>
  React.createElement("div", { style: { width: "100%", height: "100vh", minHeight: "640px" } }, story);

export const Default = {
  render: (args) => stage(React.createElement(SlidesEditorTemplate, args)),
};

export const Presenting = {
  args: { presentMode: true },
  render: (args) => stage(React.createElement(SlidesEditorTemplate, args)),
  parameters: {
    docs: {
      description: {
        story: "Present-mode placeholder state: the floating toggle flips to its active style. Real present mode is owned by the app repo.",
      },
    },
  },
};
