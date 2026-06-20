import { DialogFamily, DialogFooterFamily, DialogHeaderFamily, DialogRowFamily, StructuredDialogFamily } from "./composa-component-stories.js";

export default {
  title: "Composa UI/Components/Base/Overlays/Dialog",
  parameters: {
    docs: {
      description: {
        component:
          "Dialog is a modal window with a header, a body, and a footer of actions. Use it for a self-contained, blocking task such as renaming a layer, creating a project, or confirming a delete. Pass `title`, `description`, and the two button labels for a one-shot composer, or drop the sub-components into `children` for richer layouts. The component does not trap focus, manage a backdrop, or handle Escape, so wire focus management and dismissal at the call site.",
      },
    },
  },
};

export const Playground = DialogFamily;
export const Header = DialogHeaderFamily;
export const Footer = DialogFooterFamily;
export const Row = DialogRowFamily;
export const Structured = StructuredDialogFamily;
