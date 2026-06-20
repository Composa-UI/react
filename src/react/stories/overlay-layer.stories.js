import React from "react";
import { Button, MenuRow, OverlayLayer } from "../story-runtime.js";

export default {
  title: "Composa UI/Components/Base/Overlays/OverlayLayer",
  parameters: {
    docs: {
      description: {
        component:
          "OverlayLayer is the shared placement wrapper for transient surfaces that are anchored to a trigger. It is the migration target for tooltip, menu, dropdown, and inspector-dialog placement so sections do not own one-off z-index or positioning rules.",
      },
    },
  },
};

const menuRows = [
  React.createElement(MenuRow, { key: "one", type: "simple", label: "Zoom to 100%" }),
  React.createElement(MenuRow, { key: "two", type: "simple", label: "Zoom to 200%" }),
];

export const BelowTrigger = {
  args: {
    placement: "below-trigger",
    align: "start",
  },
  argTypes: {
    placement: {
      control: "select",
      options: ["below-trigger", "left-of-inspector", "inspector-dialog", "tooltip"],
      table: { defaultValue: { summary: "below-trigger" } },
    },
    align: {
      control: "select",
      options: ["start", "center", "end"],
      table: { defaultValue: { summary: "start" } },
    },
  },
  render: (args) =>
    React.createElement(
      "div",
      {
        "data-testid": "overlay-layer-panel",
        style: {
          position: "relative",
          width: 180,
          minHeight: 160,
          padding: 24,
        },
      },
      [
        React.createElement(Button, { key: "trigger", label: "Open menu", variant: "secondary", size: "small" }),
        React.createElement(
          OverlayLayer,
          { key: "overlay", ...args },
          React.createElement(
            "div",
            {
              className: "composa-menu",
              role: "menu",
              "aria-label": "OverlayLayer demo menu",
            },
            menuRows
          )
        ),
      ]
    ),
};

export const LeftOfInspector = {
  render: () =>
    React.createElement(
      "div",
      {
        style: {
          position: "relative",
          width: 240,
          minHeight: 220,
          marginLeft: 260,
          padding: 24,
          border: "1px solid var(--composa-color-border)",
          background: "var(--composa-color-bg)",
        },
      },
      [
        React.createElement(Button, { key: "trigger", label: "Inspector action", variant: "secondary", size: "small" }),
        React.createElement(
          OverlayLayer,
          { key: "overlay", placement: "left-of-inspector", align: "end" },
          React.createElement(
            "div",
            {
              className: "composa-export-settings-dialog",
              role: "dialog",
              "aria-label": "OverlayLayer inspector dialog demo",
            },
            [
              React.createElement("div", { key: "header", className: "composa-export-settings-header" }, [
                React.createElement("h4", { key: "title", className: "composa-export-settings-title" }, "Export"),
              ]),
              React.createElement("div", { key: "row", className: "composa-export-settings-row" }, [
                React.createElement("span", { key: "label", className: "composa-export-settings-label" }, "Color profile"),
                React.createElement("button", { key: "value", type: "button", className: "composa-export-settings-value" }, "sRGB"),
              ]),
            ]
          )
        ),
      ]
    ),
};
