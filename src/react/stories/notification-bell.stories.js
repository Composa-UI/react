import React from "react";
import { NotificationBell } from "../story-runtime.js";

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
  title: "Composa UI/Components/Feedback/NotificationBell",
  component: NotificationBell,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "NotificationBell is the bell IconButton with a Badge overlaid through BadgeAnchor. " +
          "Drive `dot` for an unread indicator or `count` for a number badge (clamps to `{max}+`); both off is the idle bell.",
      },
    },
  },
  argTypes: {
    dot: { control: "boolean", description: "Show the bare unread dot." },
    count: { control: "number", description: "Unread count; clamps to {max}+." },
  },
};

export const Playground = (args) => stage([h(NotificationBell, { label: "Notifications", ...args })]);
Playground.args = { dot: false, count: 0 };

export const States = {
  render: () =>
    stage([
      row("Idle / dot / count", [
        h(NotificationBell, { key: "idle", label: "Notifications" }),
        h(NotificationBell, { key: "dot", label: "Notifications", dot: true }),
        h(NotificationBell, { key: "count", label: "Notifications", count: 3 }),
        h(NotificationBell, { key: "many", label: "Notifications", count: 128 }),
      ]),
    ]),
  parameters: {
    docs: { description: { story: "Idle bell, unread dot, a count badge, and a clamped large count." } },
  },
};
