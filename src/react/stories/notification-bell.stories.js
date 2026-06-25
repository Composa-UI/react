import React from "react";
import { NotificationBell } from "../story-runtime.js";
import { withAnnotations } from "./_annotations.js";

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

// Anatomy — auto-brackets every data-part element on the NotificationBell root.
export const Anatomy = {
  render: () => h(NotificationBell, { label: "Notifications", count: 3 }),
  decorators: [withAnnotations],
  parameters: {
    annotations: [{ type: "anatomy", target: ".composa-notification-bell" }],
  },
};

// Accessibility — the bell icon button must carry an accessible name; the Badge is
// presentational (pointer-events: none), so the unread count needs surfacing in the label.
export const Accessibility = {
  render: () => h(NotificationBell, { label: "Notifications", count: 3 }),
  decorators: [withAnnotations],
  parameters: {
    annotations: [
      {
        n: 1,
        type: "button",
        target: ".composa-notification-bell .composa-icon-button",
        element: "<button>",
        role: "button",
        accessibleName: "the `label` prop (aria-label) — include unread count for screen readers, e.g. \"Notifications, 3 unread\"",
        keyboard: [{ keys: "Space / Enter", result: "opens notifications" }],
        tier: { priority: "mandatory", difficulty: "easy" },
      },
      {
        n: 2,
        type: "note",
        target: ".composa-badge-overlay",
        marker: "pin",
        side: "top",
        text: "Badge is presentational (pointer-events: none). Surface unread count in the button aria-label.",
      },
    ],
  },
};
