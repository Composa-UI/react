import React from "react";
import { Notification } from "../story-runtime.js";

const h = React.createElement;

const stage = (children, { pad = 32 } = {}) =>
  h(
    "div",
    {
      style: {
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        gap: 16,
        padding: pad,
        minHeight: 120,
        background: "var(--composa-color-bg-secondary, #f5f5f5)",
      },
    },
    children
  );

const row = (label, node) =>
  h("div", { key: label, style: { display: "flex", flexDirection: "column", gap: 8 } }, [
    h("span", { key: "l", style: { fontSize: 11, color: "var(--composa-color-text-secondary)" } }, label),
    h("div", { key: "n", style: { display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" } }, node),
  ]);

export default {
  title: "Composa UI/Components/Feedback/Notification",
  component: Notification,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Notification is the HUD toast / list-row: a leading icon or avatar, a message that truncates (single line, or two lines with `multiline`), " +
          "and up to two trailing actions (`onAction` plus an optional `onDismiss`).",
      },
    },
  },
  argTypes: {
    message: { control: "text" },
    multiline: { control: "boolean" },
  },
};

export const Playground = (args) =>
  stage([h(Notification, { icon: "componentSmall", message: "Short descriptive message", onAction: () => {}, ...args })]);
Playground.args = { message: "Short descriptive message", multiline: false };

export const Variants = {
  render: () =>
    stage([
      row("Single action", [
        h(Notification, { key: "1", icon: "componentSmall", message: "Short descriptive message", onAction: () => {} }),
      ]),
      row("Two actions (Action / Dismiss)", [
        h(Notification, {
          key: "2",
          icon: "componentSmall",
          message: "Short descriptive message",
          onAction: () => {},
          onDismiss: () => {},
        }),
      ]),
      row("Multiline (truncates at 2 lines)", [
        h(Notification, {
          key: "3",
          icon: "componentSmall",
          multiline: true,
          message: "Message can span across multiple lines. Try to keep it short.",
          onAction: () => {},
          onDismiss: () => {},
        }),
      ]),
      row("With avatar", [
        h(Notification, {
          key: "4",
          avatar: { initials: "JW", variant: "blue" },
          message: "Jenny mentioned you",
          onAction: () => {},
        }),
      ]),
    ]),
  parameters: {
    docs: { description: { story: "Single action, two actions, multiline truncation, and the avatar variant." } },
  },
};
