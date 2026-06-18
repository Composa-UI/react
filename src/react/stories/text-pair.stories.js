import { TextPairFamily } from "./composa-component-stories.js";

export default {
  title: "Composa UI/Base Components/TextPair",
  parameters: {
    docs: {
      description: {
        component:
          "TextPair is the compact stacked-copy primitive: a title with an optional secondary description below it. It is the text-only sibling of VerticalCell — reach for TextPair when a vertical group is just two lines of copy (a label over a caption, a name over a role), and for VerticalCell when the stack contains interactive controls. Both `title` and `description` are node slots, so they accept any content, not just strings.",
      },
    },
  },
};

export const Playground = TextPairFamily;
