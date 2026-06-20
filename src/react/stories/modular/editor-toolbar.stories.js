import React from "react";
import { fn, within, userEvent } from "storybook/test";
import { EditorToolbar, OverlayHost } from "../../story-runtime.js";

// The toolbar's tool-picker menus render through OverlayPortal, so every story is
// wrapped in an OverlayHost stage that gives the floating menus room below the
// caret (overflow-friendly per the overlay acceptance criteria).
const Stage = ({ children, minHeight = 220 }) =>
  React.createElement(
    OverlayHost,
    {
      style: {
        position: "relative",
        minHeight,
        minWidth: 360,
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        padding: "24px",
        background: "var(--composa-color-fs-canvas-default-fill, #f5f5f5)",
        borderRadius: "12px",
        overflow: "visible",
      },
    },
    children
  );

export default {
  title: "Composa UI/Components/Modules/Editor/EditorToolbar",
  component: EditorToolbar,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "EditorToolbar is the floating canvas creation toolbar. It is purely presentational and controlled: it reflects the active tool and emits onToolChange, owning no canvas engine, selection, or document model. It drops into EditorShell's canvasToolbar slot. Mirroring Figma 86-5602, it has four groups left to right: Move (Move / Hand, a SplitButton), Frame (a single 32px Grid 3x3 icon button), Shape (Rectangle / Circle, a SplitButton), and Text (a single icon button). Multi-tool groups are a 32px primary icon action plus a 16px caret that opens a tool-picker menu of MenuRow type=\"toolbar\" radio rows through OverlayPortal; single-tool groups have no caret. While a group's menu is open, that group suppresses its tooltip so a tooltip and the menu never show at once. Carets, menus, and tooltips are not hand-rolled — they reuse SplitButton, IconButton, MenuRow, and the overlay system.",
      },
    },
  },
  args: {
    defaultActiveTool: "move",
    label: "Editor tools",
    onToolChange: fn(),
  },
  argTypes: {
    activeTool: {
      control: "select",
      options: ["move", "hand", "frame", "rectangle", "circle", "text"],
      description: "Controlled active tool id.",
    },
    defaultActiveTool: {
      control: "select",
      options: ["move", "hand", "frame", "rectangle", "circle", "text"],
      description: "Uncontrolled initial active tool id.",
      table: { defaultValue: { summary: "move" } },
    },
    label: {
      control: "text",
      description: "Accessible name for the toolbar region.",
      table: { defaultValue: { summary: "Editor tools" } },
    },
    onToolChange: { action: "tool-change", description: "Fires when a tool is activated." },
  },
  render: (args) => React.createElement(Stage, null, React.createElement(EditorToolbar, args)),
};

// Default: Move active. Shows all four groups — the two SplitButton groups (Move,
// Shape) and the two single-tool icon buttons (Frame = Grid 3x3, Text).
export const Default = {
  parameters: {
    docs: { description: { story: "Default state: Move is the active tool, so the Move group's action half is brand-blue. The Frame (Grid 3x3) and Text groups render as caret-less single icon buttons per Figma." } },
  },
};

// One representative active-tool state on a single-tool group, to show the brand
// fill on the caret-less Frame button.
export const FrameActive = {
  args: { activeTool: "frame" },
  parameters: {
    docs: { description: { story: "Frame tool active: the single-tool Frame group (Grid 3x3 glyph) carries the brand fill. Single-tool groups have no caret." } },
  },
};

// One menu-open state, exercising the tooltip-suppression fix: while the caret
// menu is open, the group's action/caret tooltip must NOT also show.
export const ShapeMenuOpen = {
  args: { activeTool: "rectangle" },
  parameters: {
    docs: { description: { story: "The Shape group caret opens a tool-picker menu with Rectangle and Circle radio rows. While the menu is open, the group suppresses its tooltip — a tooltip and the menu never co-show." } },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const caret = await canvas.findByRole("button", { name: "Shape tools" });
    await userEvent.click(caret);
  },
};
