import { ListCellFamily } from "./composa-component-stories.js";

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
