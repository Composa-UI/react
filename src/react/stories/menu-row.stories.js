import React from "react";
import { MenuRow } from "../story-runtime.js";
import { MenuRowFamily } from "./composa-component-stories.js";
import { withAnnotations } from "./_annotations.js";

export default {
  title: "Composa UI/Components/Base/MenuRow",
  parameters: {
    docs: {
      description: {
        component:
          "MenuRow is the row primitive inside a Menu surface. It renders a `button` with an optional leading slot, a required label, and an optional trailing slot. The `toolbar` type is the selectable row with a reserved checkmark slot plus a leading icon slot; use it for icon-labeled choices such as stroke sides.",
      },
    },
  },
};

export const Playground = MenuRowFamily;

const sideRows = [
  { label: "All", icon: "strokeAlignAll", selected: true },
  { label: "Top", icon: "strokeAlignTop" },
  { label: "Bottom", icon: "strokeAlignBottom" },
  { label: "Left", icon: "strokeAlignLeft" },
  { label: "Right", icon: "strokeAlignRight" },
];

export const ToolbarSideChoices = {
  name: "Toolbar Side Choices",
  render: () =>
    React.createElement(
      "div",
      { className: "storybook-composa-shell" },
      React.createElement(
        "div",
        { className: "composa-menu", role: "menu", "aria-label": "Stroke sides" },
        ...sideRows.map((row) =>
          React.createElement(MenuRow, {
            key: row.label,
            type: "toolbar",
            label: row.label,
            lead: row.icon,
            selected: Boolean(row.selected),
            role: "menuitemradio",
          }),
        ),
      ),
    ),
  parameters: {
    docs: {
      description: {
        story:
          "Shows toolbar rows with a reserved checkmark slot and a separate leading icon slot.",
      },
    },
  },
};

// Anatomy — auto-discovers data-part elements inside the row. Anatomy facet (always required).
export const Anatomy = {
  render: () =>
    React.createElement(
      "div",
      { className: "composa-menu", role: "menu", "aria-label": "Anatomy" },
      React.createElement(MenuRow, { type: "simple", label: "Row label", trail: "shortcut", role: "menuitem" })
    ),
  decorators: [withAnnotations],
  parameters: { annotations: [{ type: "anatomy", target: ".composa-menu-row" }] },
};

// Color — row foreground and trailing secondary foreground tokens. Color facet. Derived live.
export const Color = {
  render: () =>
    React.createElement(
      "div",
      { className: "composa-menu", role: "menu", "aria-label": "Color tokens" },
      React.createElement(MenuRow, { type: "simple", label: "Row label", trail: "shortcut", role: "menuitem" })
    ),
  decorators: [withAnnotations],
  parameters: {
    annotations: [
      { n: 1, target: ".composa-menu-row", marker: "pin", side: "left", type: "token", kind: "color", prop: "color" },
      { n: 2, target: ".composa-menu-trailing", marker: "pin", side: "right", type: "token", kind: "color", prop: "color" },
    ],
  },
};

// States — hover and disabled states. State axis is live: bg shifts on hover, fg dims on disabled.
// is-hover simulates the :hover token binding without a live mouse event.
export const States = {
  render: () =>
    React.createElement(
      "div",
      { className: "composa-menu", role: "menu", "aria-label": "Row states" },
      React.createElement(
        "button",
        { className: "composa-menu-row", role: "menuitem", type: "button" },
        React.createElement("span", { className: "composa-menu-leading" }),
        React.createElement("span", { className: "composa-menu-label" }, "Default"),
        React.createElement("span", { className: "composa-menu-trailing" })
      ),
      React.createElement(
        "button",
        { className: "composa-menu-row is-hover", role: "menuitem", type: "button" },
        React.createElement("span", { className: "composa-menu-leading" }),
        React.createElement("span", { className: "composa-menu-label" }, "Hovered"),
        React.createElement("span", { className: "composa-menu-trailing" })
      ),
      React.createElement(
        "button",
        { className: "composa-menu-row is-disabled", role: "menuitem", type: "button" },
        React.createElement("span", { className: "composa-menu-leading" }),
        React.createElement("span", { className: "composa-menu-label" }, "Disabled"),
        React.createElement("span", { className: "composa-menu-trailing" })
      )
    ),
  decorators: [withAnnotations],
  parameters: {
    annotations: [
      { n: 1, target: ".composa-menu-row.is-hover", marker: "pin", side: "left", type: "token", kind: "color", prop: "background" },
      { n: 2, target: ".composa-menu-row.is-disabled", marker: "pin", side: "left", type: "token", kind: "color", prop: "color" },
    ],
  },
};

// Spacing — row height and leading/trailing slot width redlines. Layout facet. All derived live.
export const Spacing = {
  render: () =>
    React.createElement(
      "div",
      { className: "composa-menu", role: "menu", "aria-label": "Spacing" },
      React.createElement(MenuRow, { type: "simple", label: "Row label", trail: "shortcut", role: "menuitem" })
    ),
  decorators: [withAnnotations],
  parameters: {
    annotations: [
      { n: 1, target: ".composa-menu-row", type: "redline", dimension: "height" },
      { n: 2, target: ".composa-menu-leading", type: "redline", dimension: "width" },
      { n: 3, target: ".composa-menu-trailing", type: "redline", dimension: "width" },
    ],
  },
};

// Accessibility — each row is a <button> with role=menuitem (or menuitemcheckbox/radio for
// checkmark/toggle variants). The accessible name comes from the visible label text.
export const Accessibility = {
  render: () =>
    React.createElement(
      "div",
      { className: "composa-menu", role: "menu", "aria-label": "Accessibility" },
      React.createElement(MenuRow, { type: "simple", label: "Row label", role: "menuitem" })
    ),
  decorators: [withAnnotations],
  parameters: {
    annotations: [
      {
        n: 1,
        target: ".composa-menu-row",
        marker: "pin",
        side: "top",
        type: "button",
        element: "<button>",
        role: "menuitem",
        accessibleName: "the visible label text",
        keyboard: [{ keys: "Enter / Space", result: "activates the row" }],
        states: [
          { state: "selected", aria: "aria-checked (for menuitemcheckbox / menuitemradio variants)" },
          { state: "disabled", aria: "the disabled attribute" },
        ],
        tier: { priority: "mandatory", difficulty: "easy" },
      },
    ],
  },
};
