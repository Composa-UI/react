import React from "react";
import { fn } from "storybook/test";
import { AppTopBar } from "./_shell-helpers.js";

const DESIGN_MODES = [
  { id: "design", label: "Design" },
  { id: "prototype", label: "Prototype" },
  { id: "dev", label: "Dev" },
];

const TWO_COLLABORATORS = [
  { initials: "W", color: "yellow", label: "Wendy" },
  { initials: "A", color: "green", label: "Abe" },
];

export default {
  title: "Composa UI/Templates/AppTopBar",
  component: AppTopBar,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "AppTopBar is the 40px application navigation bar (--composa-height-heading) " +
          "shared across all editor products: Design, Slides, Dev Mode, and View Only. " +
          "It is a template-layer composition of existing Composa primitives " +
          "(Tabs underline variant, MultiplayerControl, Button) — not a published factory component.\n\n" +
          "Pass `modes` to show top-level mode tabs (Design / Prototype / Dev for the main Design editor). " +
          "Slides omits `modes` because its mode switch (Design / Animate) lives in InspectorHeader.",
      },
    },
  },
  args: {
    appLabel: "Composa",
    fileName: "Earthling Mobile Refresh",
    mode: "design",
    modes: DESIGN_MODES,
    collaborators: TWO_COLLABORATORS,
    shareLabel: "Share",
    onModeChange: fn(),
    onShare: fn(),
  },
  argTypes: {
    appLabel: { control: "text", description: "Application name shown in the breadcrumb." },
    fileName: { control: "text", description: "Current file name shown in the breadcrumb." },
    mode: {
      control: "select",
      options: ["design", "prototype", "dev"],
      description: "Active mode id — must match an id in `modes`.",
      table: { defaultValue: { summary: "design" } },
    },
    modes: {
      control: false,
      description:
        "Array of `{ id, label }` entries rendered as underline Tabs. " +
        "Omit for Slides and Dev Mode.",
    },
    collaborators: {
      control: false,
      description: "Array of MultiplayerControl props for each active collaborator avatar.",
    },
    shareLabel: { control: "text", table: { defaultValue: { summary: "Share" } } },
    onModeChange: { action: "modeChange", description: "Called with the selected mode id." },
    onShare: { action: "share" },
  },
};

var wrap = function (node) {
  return React.createElement(
    "div",
    { style: { background: "var(--composa-color-bg)" } },
    node
  );
};

export const DesignEditor = {
  name: "Design editor",
  render: function (args) { return wrap(React.createElement(AppTopBar, args)); },
  parameters: {
    docs: {
      description: {
        story:
          "Design / Prototype / Dev mode tabs in the center, two collaborator avatars, " +
          "and the primary Share button. Default top bar for the Design editor.",
      },
    },
  },
};

export const SlidesEditor = {
  name: "Slides editor",
  args: { mode: undefined, modes: undefined },
  render: function (args) { return wrap(React.createElement(AppTopBar, args)); },
  parameters: {
    docs: {
      description: {
        story:
          "Slides variant: no top-level mode tabs. The Design / Animate switch " +
          "lives in InspectorHeader inside the right panel.",
      },
    },
  },
};

export const ManyCollaborators = {
  name: "Many collaborators",
  args: {
    collaborators: [
      { initials: "W", color: "yellow", label: "Wendy" },
      { initials: "A", color: "green", label: "Abe" },
      { initials: "B", color: "purple", label: "Beatriz" },
      { initials: "C", color: "teal", label: "Carlos" },
    ],
  },
  render: function (args) { return wrap(React.createElement(AppTopBar, args)); },
  parameters: {
    docs: {
      description: {
        story: "Four active collaborators. Each avatar is a MultiplayerControl with its own tooltip.",
      },
    },
  },
};
