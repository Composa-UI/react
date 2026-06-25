import React from "react";
import { Notification } from "../story-runtime.js";
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

// ── Annotation stories ───────────────────────────────────────────────────────

// Anatomy — auto-discovers every element with a data-part attribute and brackets it.
// Nothing to author beyond the root target; the renderer derives the part labels.
export const Anatomy = {
  render: () =>
    stage([
      h(Notification, {
        icon: "componentSmall",
        message: "Short descriptive message",
        onAction: () => {},
        onDismiss: () => {},
      }),
    ]),
  decorators: [withAnnotations],
  parameters: {
    docs: { description: { story: "Auto-brackets every data-part in the Notification: content, message, separator, actions, action, dismiss." } },
    annotations: [{ type: "anatomy", target: ".composa-notification" }],
  },
};

// Color — surface background and text tokens. Values are derived by the renderer;
// only the semantic token name is authored (never the hex).
export const Color = {
  render: () =>
    stage([
      h(Notification, {
        icon: "componentSmall",
        message: "Short descriptive message",
        onAction: () => {},
      }),
    ]),
  decorators: [withAnnotations],
  parameters: {
    docs: { description: { story: "Surface (background), message text, and HUD shadow tokens. All hex values are derived." } },
    annotations: [
      { n: 1, type: "token", kind: "color", target: ".composa-notification", prop: "background", name: "color.bg.menu", side: "top" },
      { n: 2, type: "token", kind: "color", target: "[data-part=\"message\"]", prop: "color", name: "color.text.menu", side: "bottom" },
      { n: 3, type: "token", kind: "effect", target: ".composa-notification", name: "elevation.hud", side: "right" },
    ],
  },
};

// Typography — message uses body.medium; CTA label uses body.medium.strong.
// Values (size, weight, line-height) are derived.
export const Typography = {
  render: () =>
    stage([
      h(Notification, {
        icon: "componentSmall",
        message: "Short descriptive message",
        onAction: () => {},
      }),
    ]),
  decorators: [withAnnotations],
  parameters: {
    docs: { description: { story: "Message uses body.medium; CTA label uses body.medium.strong. All sizes are derived." } },
    annotations: [
      { n: 1, type: "token", kind: "typography", target: "[data-part=\"message\"]", anchor: "center" },
      { n: 2, type: "token", kind: "typography", target: "[data-part=\"action\"]", anchor: "center" },
    ],
  },
};

// Structural — composition axis: one-action vs two-action layout.
// Redlines on the container are derived; variant labels show which composition is active.
export const Structural = {
  render: () =>
    h(
      "div",
      {
        style: {
          display: "flex",
          flexDirection: "column",
          gap: 24,
          padding: 32,
          background: "var(--composa-color-bg-secondary, #f5f5f5)",
        },
      },
      h("div", { className: "s-single" },
        h(Notification, { icon: "componentSmall", message: "Short descriptive message", onAction: () => {} })
      ),
      h("div", { className: "s-two" },
        h(Notification, { icon: "componentSmall", message: "Short descriptive message", onAction: () => {}, onDismiss: () => {} })
      )
    ),
  decorators: [withAnnotations],
  parameters: {
    docs: { description: { story: "Composition axis: single-action bar (no separator between actions) vs two-action bar (Action + Dismiss stacked, split by a horizontal separator). Width and height redlines are derived." } },
    annotations: [
      { target: ".s-single .composa-notification", type: "variant", value: "One action", marker: "caret", side: "left" },
      { target: ".s-two .composa-notification", type: "variant", value: "Two actions", marker: "caret", side: "left" },
      { n: 1, type: "redline", target: ".composa-notification", dimension: "width" },
      { n: 2, type: "redline", target: ".composa-notification", dimension: "height" },
    ],
  },
};

// Accessibility — Notification is a live region (role="status", aria-live="polite") that
// does NOT steal focus. The user Tabs to Action / Dismiss voluntarily (see docs for the
// deliberate divergence from Carbon's alertdialog / focus-trap model).
export const Accessibility = {
  render: () =>
    stage([
      h(Notification, {
        icon: "componentSmall",
        message: "Short descriptive message",
        onAction: () => {},
        onDismiss: () => {},
      }),
    ]),
  decorators: [withAnnotations],
  parameters: {
    docs: { description: { story: "Live region + two focusable CTAs. Focus is not stolen when the notification appears — this is an explicit product decision documented in the Accessibility tab." } },
    annotations: [
      {
        n: 1,
        target: ".composa-notification",
        type: "landmark",
        element: "<div>",
        role: "status",
        marker: "lasso",
        side: "top",
      },
      {
        n: 2,
        target: "[data-part=\"action\"]",
        type: "button",
        element: "<button>",
        role: "button",
        marker: "bracket",
        side: "bottom",
        keyboard: [
          { keys: "Tab", result: "moves focus to Action CTA" },
          { keys: "Space / Enter", result: "activates Action" },
        ],
        tier: { priority: "mandatory", difficulty: "easy" },
      },
      {
        n: 3,
        target: "[data-part=\"dismiss\"]",
        type: "button",
        element: "<button>",
        role: "button",
        marker: "bracket",
        side: "bottom",
        keyboard: [
          { keys: "Tab", result: "moves focus to Dismiss CTA" },
          { keys: "Space / Enter", result: "activates Dismiss" },
        ],
        tier: { priority: "mandatory", difficulty: "easy" },
      },
    ],
  },
};
