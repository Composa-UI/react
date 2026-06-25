import React from "react";
import { TextPairFamily } from "./composa-component-stories.js";
import { TextPair } from "../story-runtime.js";
import { withAnnotations } from "./_annotations.js";

export default {
  title: "Composa UI/Components/Base/TextPair",
  parameters: {
    docs: {
      description: {
        component:
          "TextPair is the compact stacked-copy primitive, modeled as three slots: `content` (the primary line, body-large), `body` (supporting detail, body-medium), and `metadata` (the quietest line, body-small). The three slots map 1:1 onto the three Label/body typography sizes. `metadataPlacement` (\"top\" | \"bottom\", default \"bottom\") moves the metadata slot above or below the body. Every slot is a node slot — pass a string to get the default styled element, or pass a Label/ReactNode to render it as-is. It is the text-only sibling of VerticalCell — reach for TextPair when a vertical group is just lines of copy, and for VerticalCell when the stack contains interactive controls. `title`/`description` remain as backward-compatible aliases for `content`/`body`.",
      },
    },
  },
};

export const Playground = TextPairFamily;

// Anatomy — the three text slots carry data-part (content, body, metadata).
// Presentational primitive: no interactive a11y role.
export const Anatomy = {
  render: () => React.createElement(TextPair, { content: "Layer name", body: "Supporting description text", metadata: "Edited 2h ago" }),
  decorators: [withAnnotations],
  parameters: { annotations: [{ type: "anatomy", target: ".composa-text-pair" }] },
};

// Typography — the three slots map 1:1 onto the body type scale; each token derived live.
// This is the primitive's primary facet.
export const Typography = {
  render: () => React.createElement(TextPair, { content: "Layer name", body: "Supporting description text", metadata: "Edited 2h ago" }),
  decorators: [withAnnotations],
  parameters: {
    annotations: [
      { n: 1, target: '.composa-text-pair [data-part="content"]', marker: "pin", side: "right", type: "token", kind: "typography", anchor: "center" },
      { n: 2, target: '.composa-text-pair [data-part="body"]', marker: "pin", side: "right", type: "token", kind: "typography", anchor: "center" },
      { n: 3, target: '.composa-text-pair [data-part="metadata"]', marker: "pin", side: "right", type: "token", kind: "typography", anchor: "center" },
    ],
  },
};
