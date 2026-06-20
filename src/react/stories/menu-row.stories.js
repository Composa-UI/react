import React from "react";
import { MenuRow } from "../story-runtime.js";
import { MenuRowFamily } from "./composa-component-stories.js";

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
