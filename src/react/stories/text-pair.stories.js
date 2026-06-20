import { TextPairFamily } from "./composa-component-stories.js";

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
