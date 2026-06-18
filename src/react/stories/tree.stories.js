import { TreeFamily } from "./composa-component-stories.js";

export default {
  title: "Composa UI/Base Components/Tree",
  parameters: {
    docs: {
      description: {
        component:
          "Tree is the layer-list primitive (the canvas layers panel). It takes a nested `items` array and renders indented `treeitem` rows — top-level items sit at depth 0 (e.g. pages), children indent under them. Each row shows a disclosure chevron when it has children (click to expand/collapse), a kind glyph (frame / group / text / component / instance / image — or a custom `icon` slot), and the layer name. Selection and expand/collapse are uncontrolled by default and controllable via `selectedId`/`onSelect` and each item's `expanded`. Component and instance rows take the purple component accent.",
      },
    },
  },
};

export const Playground = TreeFamily;
