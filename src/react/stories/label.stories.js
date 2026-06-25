import React from "react";
import { LabelFamily } from "./composa-component-stories.js";
import { Label } from "../story-runtime.js";
import { withAnnotations } from "./_annotations.js";

export default {
  title: "Composa UI/Components/Base/Label",
  parameters: {
    docs: {
      description: {
        component:
          "Label is a hierarchical text label for the small text that names a group rather than carries the main content: a section heading, a property name, or a layer name. The `level` prop is a real font hierarchy that pairs 1:1 with ListCell's `level`, matching the ListCell title type at each level (level 1 -> body-large, levels 2/3 -> body-medium). The `weight` prop overrides the default font-weight, which is strong at every level to match the ListCell title type (pass regular for a quieter label). Color defaults to secondary text and is contextual: light vs dark is handled by tokens, not a prop, so the same Label on a dark menu surface adopts the menu's light text. Pass the text through `label`, and pass a heading tag through `as` when the label is a real heading.",
      },
    },
  },
};

export const Playground = LabelFamily;

// Label is a single text primitive (no parts), so it's annotated by what it IS:
// a typography token, and a heading when rendered as one.

// Typography — derives the type token + size/line-height from the rendered label.
export const Typography = {
  render: () => React.createElement(Label, { label: "Section title", hierarchy: 1 }),
  decorators: [withAnnotations],
  parameters: { annotations: [{ n: 1, target: ".composa-label", marker: "pin", side: "top", type: "token", kind: "typography", name: "label.level-1" }] },
};

// Heading (a11y) — when `as` is a heading tag, the heading type applies (badge = level).
export const Heading = {
  render: () => React.createElement(Label, { label: "Section title", as: "h2", hierarchy: 1 }),
  decorators: [withAnnotations],
  parameters: { annotations: [{ n: 1, target: ".composa-label", marker: "pin", side: "top", type: "heading", level: "h2" }] },
};
