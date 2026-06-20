import React from "react";
import { VisualBell } from "../story-runtime.js";

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
  title: "Composa UI/Components/Feedback/VisualBell",
  component: VisualBell,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "VisualBell is the in-app toast / snackbar: an optional leading icon (or `loading` spinner), a message, an optional `count`, " +
          "up to two `actions`, and an optional `onDismiss`. `tone` switches the color family (e.g. `danger`).",
      },
    },
  },
  argTypes: {
    message: { control: "text" },
    tone: { control: "select", options: ["default", "danger"] },
    loading: { control: "boolean" },
  },
};

export const Playground = (args) => stage([h(VisualBell, { message: "Message", ...args })]);
Playground.args = { message: "Message", tone: "default", loading: false };

export const Variants = {
  render: () =>
    stage([
      row("Message only", [h(VisualBell, { key: "1", message: "Message only" })]),
      row("With dismiss", [h(VisualBell, { key: "2", message: "Message with explicit dismiss", onDismiss: () => {} })]),
      row("With actions + dismiss", [
        h(VisualBell, {
          key: "3",
          icon: "comment",
          message: "Default messaging bell",
          actions: [{ label: "Action", onClick: () => {} }, { label: "Action", onClick: () => {} }],
          onDismiss: () => {},
        }),
      ]),
      row("Loading + count", [
        h(VisualBell, { key: "4", loading: true, message: "Uploading", count: "1/134" }),
      ]),
      row("Danger", [
        h(VisualBell, {
          key: "5",
          tone: "danger",
          icon: "comment",
          message: "Danger messaging bell",
          actions: [{ label: "Action", onClick: () => {} }, { label: "Action", onClick: () => {} }],
          onDismiss: () => {},
        }),
      ]),
    ]),
  parameters: {
    docs: { description: { story: "Message-only, dismiss, actions, loading + count, and the danger tone." } },
  },
};
