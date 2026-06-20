import React from "react";
import { fn } from "storybook/test";
import { EditorNavigator } from "../../story-runtime.js";

const pages = [
  { id: "overview", name: "Overview" },
  { id: "typography", name: "Typography" },
  { id: "feedback", name: "Design Crit Feedback" },
  { id: "archive", name: "Archive" },
  { id: "wip", name: "🚧 Work in progress" },
];

const layers = [
  {
    id: "frame-1",
    name: "Frame 1",
    kind: "frame",
    children: [
      { id: "header", name: "Header / Desktop", kind: "component" },
      {
        id: "frame-2",
        name: "Frame 1",
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
];

// EditorNavigator renders a full-height sidebar; give stories a tall, bordered
// stage so the split + scroll behavior is visible (per the overlay/inspector QA
// rule that rail-sized boxes hide layout bugs).
function Stage({ children, width = 240 }) {
  return React.createElement(
    "div",
    { style: { height: 560, width, display: "flex", border: "1px solid var(--composa-color-border)", borderRadius: 8, overflow: "hidden" } },
    children
  );
}

export default {
  title: "Composa UI/Components/Modules/Navigator/EditorNavigator",
  component: EditorNavigator,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "EditorNavigator is the design-editor left sidebar. A NavigatorHeader sits over a split of two stacked lists: a flat PAGE list (Tree without nesting, selection only) on top and a nested LAYER list (Tree) on the bottom, separated by a draggable separator that resizes the page region. Page/layer selection and the split height are controlled or internally stateful; document truth stays with the app.",
      },
    },
  },
  args: {
    title: "Earthling Mobile Refresh",
    project: "Mobile Refresh",
    pages,
    defaultSelectedPageId: "overview",
    layers,
    defaultSelectedLayerId: "header",
    defaultPageHeight: 160,
    onToggle: fn(),
    onPageSelect: fn(),
    onPageAdd: fn(),
    onLayerSelect: fn(),
    onPageHeightChange: fn(),
  },
  argTypes: {
    title: { control: "text", description: "Bold file title in the header." },
    project: { control: "text", description: "Subdued project name under the title." },
    defaultPageHeight: { control: { type: "number" }, description: "Initial height of the resizable page region (px)." },
    pages: { control: "object", description: "Flat page items (Tree without nesting)." },
    layers: { control: "object", description: "Nested layer items (Tree)." },
  },
  render: (args) => React.createElement(Stage, null, React.createElement(EditorNavigator, args)),
};

export const Default = {};

export const Selected = {
  args: {
    defaultSelectedPageId: "typography",
    defaultSelectedLayerId: "button",
    layers: [
      {
        id: "frame-1",
        name: "Frame 1",
        kind: "frame",
        expanded: true,
        children: [
          { id: "header", name: "Header / Desktop", kind: "component", secondarySelected: true },
          { id: "button", name: "Button / Active", kind: "instance" },
        ],
      },
    ],
  },
  parameters: {
    docs: { description: { story: "A selected page and a selected nested layer, with a secondary-selected parent row." } },
  },
};

export const Empty = {
  args: {
    pages: [],
    layers: [],
    defaultSelectedPageId: undefined,
    defaultSelectedLayerId: undefined,
  },
  parameters: {
    docs: { description: { story: "No pages and no layers — the header, section headers, and split still render." } },
  },
};

export const ManyItems = {
  args: {
    pages: Array.from({ length: 16 }, (_, i) => ({ id: `page-${i}`, name: `Page ${i + 1}` })),
    layers: Array.from({ length: 24 }, (_, i) => ({
      id: `layer-${i}`,
      name: `Layer ${i + 1}`,
      kind: i % 4 === 0 ? "component" : i % 3 === 0 ? "text" : "frame",
    })),
    defaultPageHeight: 200,
  },
  parameters: {
    docs: { description: { story: "Many pages and layers so both regions scroll independently within the split." } },
  },
};

export const Narrow = {
  render: (args) => React.createElement(Stage, { width: 220 }, React.createElement(EditorNavigator, args)),
  parameters: {
    docs: { description: { story: "A realistic narrow product width to confirm titles and rows truncate instead of wrapping." } },
  },
};
