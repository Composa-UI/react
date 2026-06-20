import React from "react";
import { fn } from "storybook/test";
import { AppNavigationRail, ComposaAppIcon, NavigationRailItem } from "../../story-runtime.js";

const navigationItems = [
  { value: "slides", label: "Slides", icon: "image" },
  { value: "assets", label: "Assets", icon: "componentSmall" },
  { value: "text", label: "Text", icon: "text" },
  { value: "comments", label: "Notes", icon: "comment" },
];

export default {
  title: "Composa UI/Components/Modules/Navigator/AppNavigationRail",
  component: AppNavigationRail,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "AppNavigationRail is the compact app-level navigation module. It places an app mark above a vertical stack of toggle-like navigation destinations. Each destination composes NavigationRailItem, which uses VerticalCell for its icon-over-label content stack.",
      },
    },
  },
  args: {
    appLabel: "Composa",
    items: navigationItems,
    value: "slides",
    label: "App navigation",
    onValueChange: fn(),
    onAppClick: fn(),
  },
  argTypes: {
    appLabel: {
      control: "text",
      description: "Accessible label for the app mark button.",
      table: { defaultValue: { summary: "Composa" } },
    },
    items: {
      control: "object",
      description: "Navigation destinations rendered below the app mark.",
    },
    value: {
      control: "text",
      description: "Controlled selected destination value.",
      table: { defaultValue: { summary: "first item" } },
    },
    label: {
      control: "text",
      description: "Accessible label for the navigation region.",
      table: { defaultValue: { summary: "App navigation" } },
    },
  },
};

export const Default = {
  render: (args) => React.createElement(AppNavigationRail, args),
};

export const CustomAppIcon = {
  args: {
    value: "assets",
    appIcon: React.createElement(ComposaAppIcon, { label: "Figma to Video" }),
  },
  render: (args) => React.createElement(AppNavigationRail, args),
  parameters: {
    docs: {
      description: {
        story: "Shows the app-icon slot supplied explicitly. ComposaAppIcon renders the Composa brand mark; the `label` prop sets the accessible name (here a product-specific app name). The slot can host an entirely different mark without changing the rail contract.",
      },
    },
  },
};

export const ItemStates = {
  render: () =>
    React.createElement(
      "div",
      { style: { display: "flex", gap: "8px", alignItems: "start" } },
      [
        React.createElement(NavigationRailItem, { key: "rest", value: "slides", label: "Slides", icon: "image" }),
        React.createElement(NavigationRailItem, { key: "selected", value: "assets", label: "Assets", icon: "componentSmall", selected: true }),
        React.createElement(NavigationRailItem, { key: "disabled", value: "notes", label: "Notes", icon: "comment", disabled: true }),
      ]
    ),
  parameters: {
    docs: {
      description: {
        story: "Shows the item primitive independently so its selected and disabled states can be reviewed without the rail.",
      },
    },
  },
};
