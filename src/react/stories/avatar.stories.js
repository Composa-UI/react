import React from "react";
import { Avatar } from "../story-runtime.js";
import { withAnnotations } from "./_annotations.js";

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

// Anatomy — the avatar's content slot (label initials, or image when src is set).
export const Anatomy = {
  render: () => React.createElement(Avatar, { initials: "JD", alt: "Jane Doe" }),
  decorators: [withAnnotations],
  parameters: { annotations: [{ type: "anatomy", target: ".composa-avatar" }] },
};

// Color — the avatar fill token (derived from computed style). Color facet.
export const Color = {
  render: () => React.createElement(Avatar, { initials: "JD", alt: "Jane Doe" }),
  decorators: [withAnnotations],
  parameters: { annotations: [{ n: 1, target: ".composa-avatar", marker: "pin", side: "top", type: "token", kind: "color", prop: "background" }] },
};

// Typography — the initials label type token (size/line-height derived). Typography facet.
export const Typography = {
  render: () => React.createElement(Avatar, { initials: "JD", alt: "Jane Doe" }),
  decorators: [withAnnotations],
  parameters: { annotations: [{ n: 1, target: ".composa-avatar-label", marker: "pin", side: "bottom", type: "token", kind: "typography", anchor: "center" }] },
};

// Layout — diameter redline + corner-radius (NEW v2 visual). Layout facet. Derived live.
export const Layout = {
  render: () => React.createElement(Avatar, { initials: "JD", alt: "Jane Doe" }),
  decorators: [withAnnotations],
  parameters: {
    annotations: [
      { n: 1, target: ".composa-avatar", type: "redline", dimension: "width" },
      { target: ".composa-avatar", type: "radius", corner: "top-left" },
    ],
  },
};

// Accessibility — image type: named via `alt`, otherwise decorative (aria-hidden).
export const Accessibility = {
  render: () => React.createElement(Avatar, { initials: "JD", alt: "Jane Doe" }),
  decorators: [withAnnotations],
  parameters: {
    annotations: [
      {
        n: 1,
        target: ".composa-avatar",
        marker: "pin",
        side: "top",
        type: "image",
        accessibleName: "the `alt` prop",
        decorative: false,
        tier: { priority: "ideal", difficulty: "easy" },
      },
    ],
  },
};

// Variant states (annotated grid) — the cross-cutting "substantial" lens: how the avatar changes
// across its content/state set (photo · initials · disabled · square). Reuses the shared `variant`
// caret renderer, so a global variant-label style change cascades here.
export const VariantStates = {
  render: () => {
    const cell = (cls, props) =>
      React.createElement("div", { className: cls, style: { display: "flex", justifyContent: "center", alignItems: "center" } }, React.createElement(Avatar, props));
    return React.createElement(
      "div",
      { style: { display: "flex", gap: 64, padding: "56px 64px 40px" } },
      cell("av-photo", { src: "https://i.pravatar.cc/80", alt: "Jane Doe" }),
      cell("av-initials", { initials: "JD", alt: "Jane Doe" }),
      cell("av-disabled", { initials: "JD", alt: "Jane Doe", state: "disabled" }),
      cell("av-square", { initials: "JD", alt: "Jane Doe", shape: "square" })
    );
  },
  decorators: [withAnnotations],
  parameters: {
    annotations: [
      { target: ".av-photo .composa-avatar", type: "variant", marker: "caret", side: "top", value: "Photo" },
      { target: ".av-initials .composa-avatar", type: "variant", marker: "caret", side: "top", value: "Initials" },
      { target: ".av-disabled .composa-avatar", type: "variant", marker: "caret", side: "top", value: "Disabled" },
      { target: ".av-square .composa-avatar", type: "variant", marker: "caret", side: "top", value: "Square" },
    ],
  },
};
