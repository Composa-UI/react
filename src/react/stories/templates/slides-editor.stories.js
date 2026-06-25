import React from "react";
import { fn } from "storybook/test";
import {
  SlidesEditorTemplate,
  AppNavigationRail,
  SlidesNavigator,
  EditorToolbar,
  OverlayHost,
} from "../../story-runtime.js";
import { AppTopBar, shellStage } from "./_shell-helpers.js";
import { SlideInspector } from "./_slide-inspector-helpers.js";

// SlidesEditorTemplate is a thin slides preset of EditorShell. AppTopBar sits
// above via shellStage (no top-level mode tabs — Design/Animate lives in
// SlideInspector). The right panel uses SlideInspector throughout.

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

var SLIDES = [
  { id: "s1", title: "Slide Deck Title", body: "This is just the opening of something big." },
  { id: "s2", title: "Highlight", body: "Use this slide to highlight a single important thing." },
  { id: "s3", title: "Agenda", body: "Three things to cover today." },
  { id: "s4", title: "Wrap up", body: "Next steps and owners." },
];

var SLIDE_NODES = SLIDES.map(function (s) {
  return Object.assign({}, s, { thumbnail: React.createElement(SlidePreview, { title: s.title, body: s.body }) });
});

const navigator = React.createElement(SlidesNavigator, {
  title: "Earthling Mobile Refresh",
  project: "Mobile Refresh",
  slides: SLIDE_NODES,
  defaultSelectedSlideId: "s1",
  onSlideSelect: fn(),
  onNewSlide: fn(),
  onAddSlide: fn(),
});

const canvasToolbar = React.createElement(EditorToolbar, {
  defaultActiveTool: "move",
  onToolChange: fn(),
  label: "Canvas tools",
});

// Default slide canvas placeholder.
const defaultCanvas = React.createElement(
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

// Grid view canvas — 3-column grid of slide thumbnail cards.
// Matches the Figma 'Sample content (grid view)' template (node 2723:239446).
var gridCanvas = React.createElement(
  "div",
  {
    style: {
      height: "100%",
      overflow: "auto",
      padding: "var(--composa-space-4, 24px)",
      background: "var(--composa-color-bg-secondary)",
    },
  },
  React.createElement(
    "div",
    {
      style: {
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "var(--composa-space-3, 16px)",
      },
    },
    ...SLIDES.map(function (s, i) {
      return React.createElement(
        "div",
        { key: s.id, style: { display: "flex", flexDirection: "column", gap: "var(--composa-space-1, 4px)" } },
        React.createElement(
          "div",
          {
            style: {
              width: "100%",
              aspectRatio: "16 / 9",
              background: "var(--composa-color-bg)",
              border: "2px solid " + (i === 0 ? "var(--composa-color-bg-brand, #ff5c16)" : "var(--composa-color-border)"),
              borderRadius: "var(--composa-radius-medium, 5px)",
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            },
          },
          React.createElement(SlidePreview, { title: s.title, body: s.body })
        ),
        React.createElement(
          "span",
          {
            style: {
              fontSize: "var(--composa-body-small-size, 10px)",
              color: "var(--composa-color-text-secondary)",
              fontFamily: "var(--composa-font-family)",
              textAlign: "center",
            },
          },
          String(i + 1)
        )
      );
    })
  )
);

// Comments canvas — slide with comment pin markers overlaid.
// Matches the Figma 'Comments' template (node 2723:240162).
var commentsCanvas = React.createElement(
  "div",
  {
    style: {
      height: "100%",
      position: "relative",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "var(--composa-color-text-secondary)",
      fontFamily: "var(--composa-font-family)",
      fontSize: "12px",
    },
  },
  "Slide canvas",
  // Comment pin 1
  React.createElement(
    "div",
    {
      style: {
        position: "absolute",
        top: 72,
        left: 120,
        width: 20,
        height: 20,
        borderRadius: "50% 50% 50% 0",
        background: "#0d99ff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
        fontSize: 9,
        fontWeight: 600,
        cursor: "pointer",
        transform: "rotate(-45deg)",
        boxShadow: "0 1px 4px rgba(0,0,0,0.2)",
      },
    },
    React.createElement("span", { style: { transform: "rotate(45deg)" } }, "1")
  ),
  // Comment pin 2
  React.createElement(
    "div",
    {
      style: {
        position: "absolute",
        top: 140,
        left: 200,
        width: 20,
        height: 20,
        borderRadius: "50% 50% 50% 0",
        background: "#14ae5c",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
        fontSize: 9,
        fontWeight: 600,
        cursor: "pointer",
        transform: "rotate(-45deg)",
        boxShadow: "0 1px 4px rgba(0,0,0,0.2)",
      },
    },
    React.createElement("span", { style: { transform: "rotate(45deg)" } }, "2")
  )
);

// Shared template style + selection colors used across stories.
var TEMPLATE_STYLE = {
  themeName: "Radicle",
  fonts: "Whyte Inktrap, Inter",
  colors: ["#000000", "#ff5c16", "#ffffff", "#f5e642"],
};

var SELECTION_COLORS = [
  { id: "ink", type: "Selection color", label: "Ink", value: "#111111", selectionCount: 1 },
  { id: "orange", type: "Selection color", label: "Orange", value: "#ff5c16", selectionCount: 1 },
];

var ANIMATE_PROPS = {
  animation: "smart-animate",
  curve: "ease-in",
  duration: 300,
  trigger: "on-click",
  onAnimationChange: fn(),
  onCurveChange: fn(),
  onDurationChange: fn(),
  onTriggerChange: fn(),
  onApplyToAll: fn(),
};

// Default inspector — Design tab, SlideInspector.
const inspector = React.createElement(
  OverlayHost,
  { style: { height: "100%", display: "flex", flexDirection: "column", minHeight: 0 } },
  React.createElement(SlideInspector, {
    slideTitle: "Slide Deck Title",
    templateStyle: TEMPLATE_STYLE,
    selectionColors: SELECTION_COLORS,
    layoutMode: "frame",
    animateProps: ANIMATE_PROPS,
  })
);

// Animate inspector — same as default but starts on the Animate tab.
var inspectorAnimate = React.createElement(
  OverlayHost,
  { style: { height: "100%", display: "flex", flexDirection: "column", minHeight: 0 } },
  React.createElement(SlideInspector, {
    slideTitle: "Slide Deck Title",
    templateStyle: TEMPLATE_STYLE,
    selectionColors: SELECTION_COLORS,
    layoutMode: "frame",
    animateProps: ANIMATE_PROPS,
    initialTab: "animate",
  })
);

// Top bar — Slides variant: no mode tabs.
const appTopBar = React.createElement(AppTopBar, {
  appLabel: "Composa",
  fileName: "Earthling Mobile Refresh",
  collaborators: [
    { initials: "W", color: "yellow", label: "Wendy" },
    { initials: "A", color: "green", label: "Abe" },
  ],
  shareLabel: "Share",
});

const stage = function (story) { return shellStage(appTopBar, story); };

export default {
  title: "Composa UI/Templates/Editor/SlidesEditor",
  component: SlidesEditorTemplate,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "SlidesEditorTemplate editing states. AppTopBar above via shellStage. " +
          "Right panel is SlideInspector (Design / Animate tabs). " +
          "Switch the `canvas` slot arg to see Grid and Comments states; " +
          "switch the `inspector` slot to see the Animate tab open by default.",
      },
    },
  },
  args: {
    navigationRail,
    navigator,
    canvas: defaultCanvas,
    canvasToolbar,
    inspector,
    resizableSides: true,
    presentMode: false,
    label: "Slides editor",
    onPresentModeChange: fn(),
  },
  argTypes: {
    navigationRail: { control: false },
    navigator: { control: false },
    canvas: { control: false, description: "Center canvas slot. Swap to gridCanvas or commentsCanvas for those states." },
    inspector: { control: false, description: "Right panel (SlideInspector). Swap to inspectorAnimate to open on the Animate tab." },
    resizableSides: { control: "boolean", table: { defaultValue: { summary: "false" } } },
    canvasToolbar: { control: false },
    presentMode: { control: "boolean", table: { defaultValue: { summary: "false" } } },
    label: { control: "text", table: { defaultValue: { summary: "Slides editor" } } },
  },
};

// Default — single slide view, Design tab open.
export const Default = {
  render: function (args) { return stage(React.createElement(SlidesEditorTemplate, args)); },
  parameters: {
    docs: {
      description: {
        story:
          "Single slide view with presenter notes handle at the bottom. " +
          "Right panel: SlideInspector on the Design tab (TemplateStyleSection + section stack).",
      },
    },
  },
};

// GridView — sample content in grid layout for narrative arc workshopping.
// Figma: 'Sample content (grid view)' node 2723:239446.
export const GridView = {
  name: "Grid view",
  args: { canvas: gridCanvas },
  render: function (args) { return stage(React.createElement(SlidesEditorTemplate, args)); },
  parameters: {
    docs: {
      description: {
        story:
          "Grid canvas view — all slides shown in a 3-column grid. " +
          "Selected slide (first) has an accent border. " +
          "Users reorder rows or clear gaps between slides via on-canvas affordances.",
      },
    },
  },
};

// CommentsView — editor with comment pin markers on the canvas.
// Figma: 'Comments' node 2723:240162.
export const CommentsView = {
  name: "Comments",
  args: { canvas: commentsCanvas },
  render: function (args) { return stage(React.createElement(SlidesEditorTemplate, args)); },
  parameters: {
    docs: {
      description: {
        story:
          "Comments state: comment pins (1, 2) overlaid on the slide canvas. " +
          "The right panel remains the SlideInspector. " +
          "A dedicated CommentThread panel variant is follow-up work.",
      },
    },
  },
};

// AnimateView — inspector opens directly on the Animate tab.
// Figma: 'Animate' node 2723:240608.
export const AnimateView = {
  name: "Animate",
  args: { inspector: inspectorAnimate },
  render: function (args) { return stage(React.createElement(SlidesEditorTemplate, args)); },
  parameters: {
    docs: {
      description: {
        story:
          "Animate state: the right panel's InspectorHeader opens on the Animate tab, " +
          "showing transition controls (Animation, Curve, Duration, Trigger).",
      },
    },
  },
};

// Presenting — present mode toggle active.
export const Presenting = {
  args: { presentMode: true },
  render: function (args) { return stage(React.createElement(SlidesEditorTemplate, args)); },
  parameters: {
    docs: {
      description: {
        story: "Present-mode placeholder: the floating toggle flips to its active style.",
      },
    },
  },
};
