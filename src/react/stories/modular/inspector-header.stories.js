import React from "react";
import { fn } from "storybook/test";
import { InspectorHeader } from "../../story-runtime.js";

export default {
  title: "Composa UI/Components/Modules/Inspector/InspectorHeader",
  component: InspectorHeader,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "InspectorHeader is the right-panel header section. It composes two ListCell rows: a collaboration/action row and a mode/zoom row. Use it at the top of inspector-like right rails before property sections.",
      },
    },
  },
  args: {
    collaborator: { initials: "W", label: "Collaborators" },
    tabs: [
      { id: "design", label: "Design" },
      { id: "animate", label: "Animate" },
    ],
    selectedTab: "design",
    zoom: "100%",
    playLabel: "Present",
    shareLabel: "Share",
    onPlay: fn(),
    onPlayMenu: fn(),
    onShare: fn(),
    onTabChange: fn(),
    onZoomClick: fn(),
  },
  argTypes: {
    collaborator: { control: "object" },
    tabs: { control: "object" },
    selectedTab: { control: "text" },
    zoom: { control: "text" },
    playLabel: { control: "text" },
    shareLabel: { control: "text" },
  },
};

export const Default = {
  render: (args) => React.createElement(InspectorHeader, args),
};

export const RightPanelWidth = {
  render: (args) => (
    React.createElement(
      "div",
      {
        style: {
          width: 240,
          borderLeft: "1px solid var(--composa-color-border)",
          background: "var(--composa-color-bg)",
        },
      },
      React.createElement(InspectorHeader, args)
    )
  ),
};
