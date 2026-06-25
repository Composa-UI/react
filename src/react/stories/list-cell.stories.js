import React from "react";
import { ListCellFamily } from "./composa-component-stories.js";
import { ListCell } from "../story-runtime.js";
import { withAnnotations } from "./_annotations.js";

export default {
  title: "Composa UI/Components/Base/ListCell",
  parameters: {
    docs: {
      description: {
        component:
          "ListCell is the shared horizontal row primitive under panel rows, property rows, layer rows, and section headers. It arranges an optional leading slot, a required content slot, and an optional trailing slot at a fixed row height. It carries layout, not text styling, so the content you pass decides what the row reads as. Set `level` from the surface (3 for menu/list rows, 2 for dialog rows, 1 for headers) and use `Header` rather than raw slots when the row is a section header.",
      },
    },
  },
};

export const Playground = ListCellFamily;

// Anatomy — the row's slots carry data-part (leading, content; trailing is a
// HeaderActions component, left undecorated). Presentational layout: no role of its own.
export const Anatomy = {
  render: () =>
    React.createElement(ListCell, {
      leading: React.createElement("span", { style: { width: 16, height: 16, borderRadius: 4, background: "var(--composa-color-bg-tertiary)", display: "inline-block" } }),
      content: "Frame 1",
    }),
  decorators: [withAnnotations],
  parameters: { annotations: [{ type: "anatomy", target: ".composa-list-cell" }] },
};

// Layout — fixed row height redline (the primitive carries layout, not text styling). Derived live.
export const Layout = {
  render: () =>
    React.createElement(ListCell, {
      leading: React.createElement("span", { style: { width: 16, height: 16, borderRadius: 4, background: "var(--composa-color-bg-tertiary)", display: "inline-block" } }),
      content: "Frame 1",
    }),
  decorators: [withAnnotations],
  parameters: { annotations: [{ n: 1, target: ".composa-list-cell", type: "redline", dimension: "height" }] },
};
