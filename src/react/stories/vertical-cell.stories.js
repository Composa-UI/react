import { ListCellContentFamily } from "./composa-component-stories.js";

export default {
  title: "Composa UI/Components/Base/VerticalCell",
  parameters: {
    docs: {
      description: {
        component:
          "VerticalCell is the vertical content-stack primitive. It stacks its children in a column with a configurable gap and cross-axis alignment, and is the vertical counterpart to ListCell's horizontal row. Use it inside a ListCell content slot (or anywhere) when a row's content is a stacked group rather than a single line: a label over an input, a title over a description, or a small interactive stack. Pass `gap` and `align` to tune the layout; it carries layout, not text styling.",
      },
    },
  },
};

export const Playground = ListCellContentFamily;
