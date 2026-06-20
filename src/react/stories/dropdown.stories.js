import { DropdownFamily } from "./composa-component-stories.js";

export default {
  title: "Composa UI/Components/Base/Dropdown",
  // The MDX page (dropdown.mdx) owns the Docs tab.
  tags: ["!autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Dropdown is a closed select trigger with value, optional leading icon, and chevron slots. Use `options` for simple value menus; compose Menu separately only for richer grouped or searchable surfaces. It is styled as an input, not a button: a white surface with a 1px border that stays white on interaction rather than filling.",
      },
    },
  },
};

export const Playground = DropdownFamily;
