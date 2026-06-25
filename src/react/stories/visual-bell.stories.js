import React from "react";
import { VisualBell } from "../story-runtime.js";
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

// Anatomy — auto-brackets every data-part element on the VisualBell root.
export const Anatomy = {
  render: () =>
    h(VisualBell, {
      icon: "comment",
      message: "Default messaging bell",
      actions: [{ label: "Action", onClick: () => {} }, { label: "Action", onClick: () => {} }],
      onDismiss: () => {},
    }),
  decorators: [withAnnotations],
  parameters: {
    annotations: [{ type: "anatomy", target: ".composa-visual-bell" }],
  },
};

// Color — semantic token annotations for default and danger surface + text.
// Hex values are derived by the renderer at runtime; only intent is authored here.
export const Color = {
  render: () =>
    h(
      "div",
      { style: { display: "flex", flexDirection: "column", gap: 24, padding: 32 } },
      h("div", { className: "vb-default" },
        h(VisualBell, {
          icon: "comment",
          message: "Default messaging bell",
          actions: [{ label: "Action", onClick: () => {} }],
          onDismiss: () => {},
        })
      ),
      h("div", { className: "vb-danger" },
        h(VisualBell, {
          tone: "danger",
          message: "Danger messaging bell",
          actions: [{ label: "Action", onClick: () => {} }],
          onDismiss: () => {},
        })
      )
    ),
  decorators: [withAnnotations],
  parameters: {
    annotations: [
      { n: 1, type: "token", kind: "color", target: ".vb-default .composa-visual-bell", prop: "background", name: "color.bg", side: "top" },
      { n: 2, type: "token", kind: "color", target: ".vb-default .composa-visual-bell-message", prop: "color", name: "color.text", side: "bottom" },
      { n: 3, type: "token", kind: "color", target: ".vb-default .composa-visual-bell-count", prop: "color", name: "color.text.secondary", side: "bottom" },
      { n: 4, type: "token", kind: "color", target: ".vb-danger .composa-visual-bell", prop: "background", name: "color.bg.danger", side: "top" },
      { n: 5, type: "token", kind: "color", target: ".vb-danger .composa-visual-bell-message", prop: "color", name: "color.text.ondanger", side: "bottom" },
    ],
  },
};

// States — variant labels for the two tone values: default vs danger.
export const States = {
  render: () =>
    h(
      "div",
      { style: { display: "grid", gridTemplateColumns: "max-content", gap: 24, padding: "64px 64px 40px 128px" } },
      h("div", { className: "vb-st-default" },
        h(VisualBell, { icon: "comment", message: "Default messaging bell", actions: [{ label: "Action", onClick: () => {} }], onDismiss: () => {} })
      ),
      h("div", { className: "vb-st-danger" },
        h(VisualBell, { tone: "danger", message: "Danger messaging bell", actions: [{ label: "Action", onClick: () => {} }], onDismiss: () => {} })
      )
    ),
  decorators: [withAnnotations],
  parameters: {
    annotations: [
      { target: ".vb-st-default .composa-visual-bell", type: "variant", marker: "caret", side: "left", value: "Default" },
      { target: ".vb-st-danger .composa-visual-bell", type: "variant", marker: "caret", side: "left", value: "Danger" },
    ],
  },
};

// Accessibility — the bell renders as a live region and does not steal focus.
// Action and Close are keyboard-reachable when present.
export const Accessibility = {
  render: () =>
    h(VisualBell, {
      icon: "comment",
      message: "Default messaging bell",
      actions: [{ label: "Action", onClick: () => {} }],
      onDismiss: () => {},
    }),
  decorators: [withAnnotations],
  parameters: {
    annotations: [
      {
        n: 1,
        type: "note",
        target: ".composa-visual-bell",
        marker: "lasso",
        side: "top",
        text: "Live region: role=status (routine bells) or role=alert (danger). Announced without stealing focus.",
      },
      {
        n: 2,
        type: "button",
        target: ".composa-visual-bell-action",
        element: "<button>",
        role: "button",
        keyboard: [{ keys: "Space / Enter", result: "activates the action" }],
        tier: { priority: "mandatory", difficulty: "easy" },
      },
      {
        n: 3,
        type: "button",
        target: ".composa-visual-bell-dismiss",
        element: "<button>",
        role: "button",
        keyboard: [{ keys: "Space / Enter", result: "dismisses the bell" }],
        tier: { priority: "mandatory", difficulty: "easy" },
      },
    ],
  },
};
