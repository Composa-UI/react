import { MenuHeadingFamily, MenuRows } from "./composa-component-stories.js";

export default {
  title: "Composa UI/Components/Base/Menu",
  parameters: {
    docs: {
      description: {
        component:
          "Menu is the floating command surface in Composa UI. Use it for a list of commands triggered from a button, a right-click, or a kebab control. It renders on a dark surface and composes its rows from MenuRow, mixing command, heading, divider, and footer rows freely. In production pass `items` (or compose MenuRow children); the `variant` prop only selects a built-in demo row set when `items` is omitted.",
      },
    },
  },
};

export const Playground = MenuRows;
export const Heading = MenuHeadingFamily;
