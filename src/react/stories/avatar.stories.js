import React from "react";
import { Avatar } from "../story-runtime.js";

const variants = ["yellow", "blue", "green", "purple", "grey", "red", "pink", "overflow-unread", "overflow-read"];
const sizes = ["small", "medium", "large"];
const shapes = ["circle", "square"];
const states = ["default", "disabled"];

export default {
  title: "Composa UI/Components/Base/Avatar",
  component: Avatar,
  parameters: {
    docs: {
      description: {
        component:
          "Avatar represents a collaborator, overflow count, organization, or identity mark. Multiplayer controls compose Avatar rather than owning avatar rendering directly.",
      },
    },
  },
  args: {
    initials: "A",
    src: "",
    alt: "",
    variant: "yellow",
    size: "medium",
    shape: "circle",
    state: "default",
  },
  argTypes: {
    initials: {
      control: "text",
      description: "One or two-character fallback label shown when `src` is empty.",
      table: { type: { summary: "string" }, defaultValue: { summary: "A" } },
    },
    src: {
      control: "text",
      description: "Optional image source. When present, Avatar renders the image instead of initials.",
      table: { type: { summary: "string" }, defaultValue: { summary: "" } },
    },
    alt: {
      control: "text",
      description: "Accessible image label. Leave empty for a decorative avatar when another label names the collaborator.",
      table: { type: { summary: "string" }, defaultValue: { summary: "" } },
    },
    variant: {
      control: "select",
      options: variants,
      description: "Figma UI3 color/content variant.",
      table: { type: { summary: variants.map((value) => `"${value}"`).join(" | ") }, defaultValue: { summary: "yellow" } },
    },
    size: {
      control: "select",
      options: sizes,
      description: "Avatar diameter.",
      table: { type: { summary: sizes.map((value) => `"${value}"`).join(" | ") }, defaultValue: { summary: "medium" } },
    },
    shape: {
      control: "select",
      options: shapes,
      description: "Avatar clipping shape.",
      table: { type: { summary: shapes.map((value) => `"${value}"`).join(" | ") }, defaultValue: { summary: "circle" } },
    },
    state: {
      control: "select",
      options: states,
      description: "Visual availability state.",
      table: { type: { summary: states.map((value) => `"${value}"`).join(" | ") }, defaultValue: { summary: "default" } },
    },
  },
};

export const Playground = {
  render: (args) => React.createElement(Avatar, args),
  parameters: {
    docs: {
      description: {
        story: "Use the controls to verify that size, shape, and image source resolve independently.",
      },
    },
  },
};

export const Variants = {
  render: (args) =>
    React.createElement(
      "div",
      { style: { display: "flex", gap: 8, alignItems: "center" } },
      variants.map((variant) => React.createElement(Avatar, { ...args, key: variant, variant }))
    ),
  parameters: {
    docs: {
      description: {
        story: "Shows the color/content variants available to MultiplayerControl and other identity surfaces.",
      },
    },
  },
};
